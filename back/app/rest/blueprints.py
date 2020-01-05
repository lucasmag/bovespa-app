from sanic import Blueprint
from app.rest.company.company_resource import company
from app.rest.bovespa.bovespa_resource import bovespa

api = Blueprint.group(company, bovespa, url_prefix='/api')
