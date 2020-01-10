from run import app


# ---TESTE DA API DE EMPRESAS---

def test_should_get_top_10_companies_from_database():
    request, response = app.test_client.get("api/empresas/top-10")
    assert len(response.json) == 10 and response.status_code == 200


def test_should_not_get_top_10_companies():
    requ, resp = app.test_client.get("api/empresas/top10")
    assert resp.status_code == 404


def test_should_get_company_stock():
    requ, resp = app.test_client.get("api/empresas/OIBR-C/cotacao")
    assert resp.status_code == 201  # Recurso criado


def test_should_not_get_company_stock():
    requ, resp = app.test_client.get("api/empresas/XXXX/cotacao")
    assert resp.status_code == 406


# ---TESTE DA API DA BOVESPA---

def test_should_get_bovespa_stock():
    requ, resp = app.test_client.get("api/bovespa/cotacao")
    assert resp.status_code == 200


def test_should_get_bovespa_timeseries_stock_history():
    requ, resp = app.test_client.get("api/bovespa/historico/1min")
    assert resp.status_code == 200


def test_should_not_get_bovespa_timeseries_stock_history():
    requ, resp = app.test_client.get("api/bovespa/historico/XXXX")
    assert resp.status_code == 406
