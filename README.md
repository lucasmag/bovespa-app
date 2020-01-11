(Aplicação desenvolvida para participação do processo seletivo da empresa PontoTel)

## Sobre o desafio
O desafio consiste em criar uma aplicação que busque os dados da Bovespa e das 10 maiores empresas do Brasil, em tempo real, por meio das API's da [Alpha Vantage](https://www.alphavantage.co/) e mostre esses dados em uma página html.

---


## Rodando aplicação em ambiente Local Linux ##

### Instalando o Docker ###

- Instalar docker - https://docs.docker.com/install/linux/docker-ce/ubuntu/

- Os comandos `docker` devem ser rodados com sudo, para roda-los sem sudo, siga os seguintes passos:

    - Passo 1: Adicione o grupo `docker` se ele ainda não existir:

    
    ```bash
    $ sudo groupadd docker
    ```
  
    - Passo 2: Adicione o usuário conectado $USER ao grupo `docker`:
     
    ```bash
    $ sudo gpasswd -a $USER docker
    ```
  
    - Passo 3: Reinicie o `docker daemon`:
    
     ```bash
    $ sudo service docker restart 
    ```
  
    - Observação: Se você está no Ubuntu 14.04-15.10, use `docker.io` em vez de `docker`:
    
    ```bash
    $ sudo service docker.io restart
    ``` 

    - Passo 4: Mude o grupo para  `docker``:
    
     ```bash
    $ newgrp - docker
    ```
    
- Verificar instalação do Docker

```bash
$ docker -v
Docker version 19.03.5, build 633a0ea
```

- Instalar Docker Compose - https://docs.docker.com/compose/install/

-  Verificar instalação do Docker Compose

```bash
$ docker-compose -v
docker-compose version 1.24.1, build 4667896b
```

### Iniciando e Parando o Ambiente ###

- Na pasta raíz do projeto execute o comando:

```bash
$ docker-compose up -d
```

- Após criar a rede, os volumes, construir as imagens e rodar os scripts do entrypoint de cada _container_ , será apresentado no final do log estas informações:

```bash
[...]
Creating postgres ... done
Creating sanic    ... done
Creating nginx  ... done
```
- Observação: a instalação de tudo pode demorar alguns minutos.

- Após a instalação a aplicação poderá ser acessada pelo endereço **http://localhost:4200**

- observação: certifique-se de que não exista nenhum processo rodando em alguma das portas: **80,5432,8000**

- Você pode fazer a verificação seguindo os seguintes passos:

    - Passo 1: Rode o seguinte código, informando uma das portas, por exemplo:

    ```bash
    $ sudo lsof -i :80
    ```

    - A saída será nesse formato:

    ```bash
    COMMAND     PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
    docker-pr 14817 root    4u  IPv6 1776586      0t0  TCP *:postgresql (LISTEN)
    ```

    - Passo 2: Mate a aplicação utilizando o `PID` informado no comando anterior:
    
    ```bash
    $ sudo kill -9 14817
    ```

- Para parar a execução do ambiente, basta entrar na pasta raíz e executar o comando `docker-compose down`, esse é o resultado esperado:

```bash
$ docker-compose down
Stopping nginx  ... done
Stopping sanic    ... done
Stopping postgres ... done
```

### Banco de dados ###

- Durante a execução da aplicação voce pode ver o estado do banco de dados por meio do docker da seguinte maneira:
    
    - Passo 1: No terminal, rode o seguinte comando para entrar no container do docker:

    ```bash
    $ docker exec -it postgres bash
    ```

    - Passo 2: Dentro do container rode o seguinte comando para entrar na linha de comando do postgres:

    ```bash
    $ psql -U bovespaapp
    ```

    - Passo 3: Na linha de comando do postgres, digite o seguinte comando para listar as tabelas da aplicação:
    
    ```bash
    $ \dt
    ```
    - Passo 4: Ainda na linha de comando do postgres, selecione tudo da tabela desejada:
    
    ```bash
    $ select * from <nome-da-tabela>
    ```

    - Passo 5: Para sair digite `\q`
    

### Ambiente ###

O docker-compose é o orquestrador de _containers_ do Docker, ou seja, ele é o responsável pela criação de _containers_ de modo automatizado, a partir de configurações prévias, com o objetivo de se possuir uma infraestrutura que possa ser commitada e versionada.

As configurações deste ambiente estão presentes no arquivo `./docker-compose.yml` e elas são responsáveis por gerar o ambiente de desenvolvimento para uma máquina com S.O. Linux.

Os _containers_ gerados são:

```text
 - postgres
 - sanic
 - nginx
```


### Endpoints ###

- Recebe uma string indicando o intervalo de pontos do timeseries e retorna uma lista de tuplas sendo [timestamp, cotação]:

```text
/api/bovespa/historico/<timeInterval> 
```

- Retorna a cotação atual da Bovespa
```
/api/btextovespa/cotacao

- Recebe uma string que representa o código de uma empresa e retorna a cotação atual, salvando automaticamente no banco
```
```text
/api/empresas/<symbol>/cotacao
```

- Retorna a lista das 10 maiores empresas brasileiras salvas no banco de dados

```text
/api/empresas/ Recebe um JSON contendo a cotação de uma empresa e persiste essa informação no banco de dados
```

### Testes ###

- O arquivo de testes se encontra no diretório `/back/tests.py`

- Para executá-lo, digite o seguinte comando:

    ```bash
    $ pytests tests.py
    ```

- observação: Ao rodar os testes certifique-se de não utiliza a api alguns minutos antes de iniciar, pois o AlphaVantage limita as requisições. A frequência de chamada da API é de 5 chamadas por minuto e 500 chamadas por dia.

### Dependências ###

#### Python:

+ [Python 3.7](https://www.python.org/)
+ [Sanic](https://sanic.readthedocs.io/en/latest/index.html)
  - Framework web python assíncrono
+ [Schema](https://pypi.org/project/schema/)
  - Biblioteca para validação de dados
+ [Asyncpg](https://magicstack.github.io/asyncpg/current/index.html)
  - Biblioteca Python para interface com banco de dados postgreSQL
+ [Pytest](https://docs.pytest.org/en/latest/)
  - Framework para escrever testes em Python
+ [Requests](https://requests.readthedocs.io/pt_BR/latest/user/quickstart.html)
  - Biblioteca HTTP para Python

#### Angular:
+ [Angular 8](https://angular.io/)
+ [Angular-CLI](https://cli.angular.io/)
  - Ferramenta de linha de comando para gerenciamento de projetos Angular.
+ [NPM](https://www.npmjs.com/)
  - Gerenciador de pacotes NodeJs
+ [Angular Bootstrap](https://ng-bootstrap.github.io/#/home)
  - Biblioteca de layouts para Angular
+ [Highcharts](https://www.highcharts.com/blog/post/highcharts-and-angular-7/)
  - Componente para exibição de gráficos
+ [NGX-TOASTR](https://www.npmjs.com/package/ngx-toastr)
  - Biblioteca javascript para exibição de notificações
+ [NGINX](https://www.nginx.com/)
  - Servidor HTTP

#### Postgres:
+ [PostgreSQL 10](https://www.postgresql.org/)

---

- As informações de empresas foram retiradas do seguinte site:
```text
https://br.financas.yahoo.com/noticias/10-maiores-empresas-do-brasil-070045257.html
```


