from app.rest.company import company_repository as repository
from app.resources.db.persistence.companies import companies
from asyncpg.exceptions import UniqueViolationError
from alpha_vantage.timeseries import TimeSeries
from app.resources import validation
from app.util import consts
from datetime import datetime
from time import mktime


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
    is_valid = validation.validate_company_symbol(company_symbol)

    if is_valid:
        try:
            async with request.app.config['pool'].acquire() as conn:
                company_stock = await conn.fetch(repository.get_company_stock(company_symbol))

            if(len(company_stock)) == 0:
                company_stock = ts.get_quote_endpoint(symbol=company_symbol)[0]
                async with request.app.config['pool'].acquire() as conn:
                    company_stock = await conn.fetch(repository.persist_stock(company_stock))
                return company_stock, 201

            return company_stock, 200

        except ValueError:
            return '''Você atingiu o limite de requisições. A frequência de chamada da API é de 5 chamadas por minuto e 
            500 chamadas por dia''', 403

    else:
        return '''O símbolo fornecido não pertence a nenhuma empresa cadastrada.''', 406
