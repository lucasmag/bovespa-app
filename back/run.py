from app.rest.company import company_service
from asyncpg import create_pool, connect
from app.rest.blueprints import api
from sanic_cors import CORS
from app.util import consts
from sanic import Sanic


app = Sanic(__name__)
app.blueprint(api)
CORS(app)


@app.listener('before_server_start')
async def register_db(application, loop):
    # Create a database connection pool
    app.config['pool'] = await create_pool(
        dsn=consts.DATABASE_URL,
        min_size=10,
        max_size=10,
        max_queries=50000,
        max_inactive_connection_lifetime=300,
        loop=loop)

    conn = await connect(consts.DATABASE_URL)
    with open("app/resources/db/migration/schema.sql", "r") as sql:
        await conn.execute(sql.read())

    await company_service.persist_companies(conn)


@app.listener('after_server_stop')
async def close_connection(app, loop):
    pool = app.config['pool']
    async with pool.acquire() as conn:
        await conn.close()


def get_app():
    return app


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

