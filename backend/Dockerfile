# Usar uma imagem Node.js oficial
FROM node:20

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Instalar dependências nativas necessárias para compilar bcrypt
# RUN apt-get update && apt-get install -y python3 g++ make

# Copiar os arquivos do backend para o container
COPY package.json package-lock.json yarn.lock ./

# Instalar as dependências do projeto
# RUN yarn install
# Instala as dependências dentro do container
# Instalar as dependências sem bcrypt
RUN yarn install 

# Remover bcrypt e reinstalar corretamente dentro do container
# RUN yarn remove bcrypt && yarn add bcrypt

# Copiar o arquivo .env, caso você esteja usando variáveis de ambiente do Prisma
COPY .env .env

# RUN npm run prisma:generate
COPY . .

# Gera os tipos do Prisma
RUN yarn prisma:generate


RUN yarn prisma:deploy

RUN yarn build
# Expor a porta do NestJS
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["yarn", "start:prod"]
