from app.rest import company_repository as repository
from asyncpg.exceptions import UniqueViolationError
from app.util.companies_constants import companies
from alpha_vantage.timeseries import TimeSeries
from app.util import config
import json


ts = TimeSeries(config.get_api_key())


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
    return ts.get_quote_endpoint(symbol=company_symbol)[0], 200

