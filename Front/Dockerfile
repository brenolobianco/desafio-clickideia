# Estágio de compilação
FROM node:14-alpine as build

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . ./

# Compilar o aplicativo
RUN npm start

# Estágio de produção
FROM nginx:alpine

# Copiar o build do aplicativo para o servidor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Configurar as rotas para o React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
