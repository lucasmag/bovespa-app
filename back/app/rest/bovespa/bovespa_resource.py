import app.rest.bovespa.bovespa_service as service
from sanic import response, Blueprint


bovespa = Blueprint('bovespa', url_prefix='/bovespa')


@bovespa.route("/historico/<time_interval>", methods=['GET'])
async def get_time_series(request, time_interval):
    resp, code = await service.get_time_series(time_interval)
    return response.json(resp, status=code, ensure_ascii=False)


