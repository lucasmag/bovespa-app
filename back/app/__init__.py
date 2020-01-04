from sanic import Blueprint
from app.rest.company_resource import company

api = Blueprint.group(company, url_prefix='/api')
