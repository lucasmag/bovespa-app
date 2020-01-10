import app.rest.bovespa.bovespa_service as service
from sanic import response, Blueprint

# Roteamento para recursos relacionados a bovespa
bovespa = Blueprint('bovespa', url_prefix='/bovespa')


@bovespa.route("/historico/<time_interval>", methods=['GET'])
async def get_time_series(request, time_interval):
    resp, code = await service.get_time_series(time_interval)
    return response.json(resp, status=code, ensure_ascii=False)


@bovespa.route("/cotacao", methods=['GET'])
async def get_bovespa_stock(request):
    resp, code = await service.get_bovespa_stock()
    print(resp)
    return response.json(resp, status=code, ensure_ascii=False)


