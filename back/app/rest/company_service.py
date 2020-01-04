from app.enum.company_enum import CompanySymbolEnum as symbol_of
from app.rest import company_repository as repository
from alpha_vantage.timeseries import TimeSeries
from app.util import config
import json


ts = TimeSeries(config.get_api_key())


def pool(request):
    return request.app.config['pool']


async def make_request(request, func):
    async with pool(request).acquire() as conn:
        resp = await conn.fetch(func)
        return json.dumps(resp)


async def get_company_data(company_symbol):
    return ts.get_symbol_search(keywords=company_symbol)[0][0]


async def persist_companies(conn):
    await conn.fetch(repository.insert_companies(3, await get_company_data(symbol_of.BANCO_DO_BRADESCO.value)))

