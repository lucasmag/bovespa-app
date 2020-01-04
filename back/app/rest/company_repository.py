def insert_companies(company_position, company):
    return "insert into public.company (position, company_name, symbol, region, market_open, market_close)" \
           "values ('{}', '{}', '{}', '{}', '{}', '{}')".format(company_position,
                                                                company['2. name'],
                                                                company['1. symbol'],
                                                                company['4. region'],
                                                                company['5. marketOpen'],
                                                                company['6. marketClose'])
