API_KEY = 'JD3SCYOQC63YYZQG'

#host = locahost | database
DATABASE_URL = "postgres://{user}:{password}@{host}:{port}/{database}".format(
        user='bovespaapp', password='bovespaapp', host='0.0.0.0',
        port=5432, database='bovespaapp')

BOVESPA_SYMBOL = "^BVSP"

