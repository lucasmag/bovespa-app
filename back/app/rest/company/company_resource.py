import app.rest.company.company_service as service
from sanic import response, Blueprint


company = Blueprint('company', url_prefix='/empresas')


@company.route("/top-10", methods=['GET'])
async def get_top_10_companies(request):
    resp, stts = await service.get_top_10_companies(request)
    return response.json(resp, status=stts)


@company.route("/<company_symbol>/cotacao", methods=['GET'])
async def get_company_stock(request, company_symbol):
    resp, stts = await service.get_company_stock(request, company_symbol)
    return response.json(resp, status=stts, ensure_ascii=False)

