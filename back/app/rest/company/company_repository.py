from datetime import datetime
from time import mktime


def insert_company(company):
    return '''insert into public.company (position, company_name, symbol, region, global_position)
            values ('{}', '{}', '{}', '{}', '{}')'''.format(company['position'],
                                                            company['company_name'],
                                                            company['symbol'],
                                                            company['region'],
                                                            company['global_position'])


def get_companies():
    return "select * from public.company"


def get_company_stock(company_symbol):
    return "select * from public.company_stock where symbol = {}".format(company_symbol)


def persist_stock(company):
    return '''insert into public.company_stock values ('{}', '{}', '{}', '{}', '{}', '{}' )'''.format(
        company['01. symbol'], float(company['03. high']), float(company['04. low']), float(company['05. price']),
        company['10. change percent'], (company['07. latest trading day']))
