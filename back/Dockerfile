FROM python:3.7
# Copia todos o arquivos para a pasta /usr/src/app
COPY . /usr/src/app
# Define /usr/src/app como diretório padrão
WORKDIR /usr/src/app
RUN pip install -r requirements.txt
CMD python run.py
