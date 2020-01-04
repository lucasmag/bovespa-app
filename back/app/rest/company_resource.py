from sanic import response, Blueprint
import app.rest.company_service as service


company = Blueprint('alpha', url_prefix='/empresas')


@company.route("/top-10", methods=['GET'])
async def get_top_10_companies(request):
    return response.json('uau', status=200)

