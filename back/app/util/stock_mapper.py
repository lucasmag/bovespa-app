def adapt_response(response):
    return {
        'open': float(response['02. open']),
        'high': float(response['03. high']),
        'low': float(response['04. low']),
        'price': float(response['05. price']),
        'latest_trading_day': response['07. latest trading day'],
        'change': float(response['09. change']),
        'change_percent': float(response['10. change percent'].replace('%', ''))
    }
