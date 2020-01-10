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
Creating nginx    ... done
Creating sanic  ... done
```
- Observação: a instalação de tudo pode demorar alguns minutos.

- Após a instalação a aplicação poderá ser acessada pelo endereço **http://localhost:4200**

- observação: certifique-se de que não exista nenhum processo rodando em alguma das portas: **4200,5432,5000**

- Você pode fazer a verificação seguindo os seguintes passos:

    - Passo 1: Rode o seguinte código, informando uma das portas, por exemplo:

    ```bash
    $ sudo lsof -i :4200
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

### Ambiente ###

O docker-compose é o orquestrador de _containers_ do Docker, ou seja, ele é o responsável pela criação de _containers_ de modo automatizado, a partir de configurações prévias, com o objetivo de se possuir uma infraestrutura que possa ser commitada e versionada.

As configurações deste ambiente estão presentes no arquivo `./docker-compose.yml` e elas são responsáveis por gerar o ambiente de desenvolvimento para uma máquina com S.O. Linux.

Os _containers_ gerados são:

```text
 - postgres
 - sanic
 - nginx
```
