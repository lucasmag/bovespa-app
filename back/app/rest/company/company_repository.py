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


def update_stock(company):
    return '''UPDATE public.company_stock set 
    symbol = '{}', high = '{}', low = '{}', price = '{}', change = '{}', change_percent = '{}', latest_trading_day = '{}'
    where symbol = '{}' '''.format(
        company['symbol'], company['high'], company['low'], company['price'], company['change'],
        company['change_percent'], company['latest_trading_day'], company['symbol'])


def persist_stock(company):
    return '''insert into public.company_stock values ('{}', '{}', '{}', '{}', '{}', '{}', '{}') '''.format(
        company['symbol'], company['high'], company['low'], company['price'], company['change'],
        company['change_percent'], company['latest_trading_day'])
