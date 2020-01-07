from alpha_vantage.timeseries import TimeSeries
from app.util.consts import BOVESPA_SYMBOL
from app.util import consts
from decimal import Decimal
from datetime import datetime
from time import mktime

from app.resources import validation

ts = TimeSeries(consts.API_KEY)


async def get_time_series(time_interval):
    is_valid = validation.validate_time_interval(time_interval)

    if is_valid:
        try:
            return format_time_series(
                ts.get_intraday(symbol=BOVESPA_SYMBOL, interval=time_interval, outputsize='full')), 200
        except ValueError:
            return '''Você atingiu o limite de requisições. A frequência de chamada da API é de 5 chamadas por minuto e 
            500 chamadas por dia''', 403
    else:
        return '''O intervalo de tempo fornecido não existe. Intervalos disponíveis: 1min, 5min, 15min, 30min, 60min. ''', 406


async def get_bovespa_stock():
    try:
        return ts.get_quote_endpoint(symbol=BOVESPA_SYMBOL)[0], 200
    except ValueError:
        return '''Você atingiu o limite de requisições. A frequência de chamada da API é de 5 chamadas por minuto e 500 chamadas por dia''', 403


def format_time_series(time_series):
    time_series_formatted = list(
        map(lambda kv: (
            int(1000 * mktime(datetime.strptime(kv[0], "%Y-%m-%d %H:%M:%S").timetuple())), round(Decimal(float(kv[1]['4. close'])), 2)),
            time_series[0].items()))
    time_series_formatted.reverse()
    return time_series_formatted
