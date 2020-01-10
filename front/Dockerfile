FROM node:12.13.0-slim as node
# Define como /app o diretório padrão
WORKDIR /app
# Copia o packege.json para dentro do diretório padrão
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

# Estagio 2 - Responsavel por expor a aplicação
FROM nginx:1.13
COPY --from=node /app/dist/bovespa-app-front /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
