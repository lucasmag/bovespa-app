from app.rest.company import company_repository as repository
from app.resources.db.persistence.companies import companies
from asyncpg.exceptions import UniqueViolationError
from alpha_vantage.timeseries import TimeSeries
from app.util import stock_mapper as mapper
from app.resources import validation
from app.util import consts


ts = TimeSeries(consts.API_KEY)


async def persist_companies(conn):
    try:
        for company in companies:
            await conn.fetch(repository.insert_company(company))

    except UniqueViolationError:
        print('Empresas já inseridas!')


async def get_top_10_companies(request):
    async with request.app.config['pool'].acquire() as conn:
        result: list = []
        for company in await conn.fetch(repository.get_companies()):
            result.append(dict(company))
        return result, 200


async def get_company_stock(request, company_symbol):
    # Verifica se simbolo enviado pela URI é válido
    if validation.validate_company_symbol(company_symbol):
        try:
            new_stock = mapper.adapt_response(ts.get_quote_endpoint(symbol=company_symbol)[0])
        except ValueError:
            return '''Você atingiu o limite de requisições. A frequência de chamada da API é de 5 chamadas por minuto e 500 chamadas por dia''', 403

        new_stock['symbol'] = company_symbol
        try:  #tenta persistir dados da empresa no banco
            async with request.app.config['pool'].acquire() as conn:
                await conn.fetch(repository.persist_stock(new_stock))
                return new_stock, 200
        except UniqueViolationError:  #caso já existam, atualiza os dados
            async with request.app.config['pool'].acquire() as conn:
                await conn.fetch(repository.update_stock(new_stock))
                return new_stock, 201
        except Exception as e:
            return 'erro: {}'.format(e), 500

    else:
        return '''O símbolo fornecido não pertence a nenhuma empresa cadastrada.''', 406
