from app.resources.db.persistence.companies import companies
from schema import Schema, And

symbols: list = []
for company in companies:
    symbols.append(company['symbol'])

check_time_interval = Schema(And(str, lambda x: x in ('1min', '5min', '15min', '30min', '60min')))
check_company_symbol = Schema(And(str, lambda x: x in symbols))


def validate_time_interval(time_interval):
    return check_time_interval.is_valid(time_interval)


def validate_company_symbol(symbol):
    return check_company_symbol.is_valid(symbol)
