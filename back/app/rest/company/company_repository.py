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
