from alpha_vantage.timeseries import TimeSeries
from app.util.consts import BOVESPA_SYMBOL
from app.util import consts
from app.resources import validation


ts = TimeSeries(consts.API_KEY)


async def get_time_series(time_interval):
    is_valid = validation.validate_time_interval(time_interval)

    if is_valid:
        try:
            return ts.get_intraday(symbol=BOVESPA_SYMBOL, interval=time_interval), 200
        except ValueError:
            return '''Você atingiu o limite de requisições. A frequência de chamada da API é de 5 chamadas por minuto e 
            500 chamadas por dia''', 403
    else:
        return '''O intervalo de tempo fornecido não existe. Intervalos disponíveis: 1min, 5min, 15min, 30min, 60min. ''', 406
