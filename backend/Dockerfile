# Usar uma imagem Node.js oficial
FROM node:16

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do backend para o container
COPY package.json package-lock.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o arquivo .env, caso você esteja usando variáveis de ambiente do Prisma
COPY .env .env

RUN npm run prisma:init
# Rodar o comando para gerar o Prisma Client
RUN npm run migrate
RUN npm run prisma:generate


# Copiar o restante do código
COPY . .

# Expor a porta do NestJS
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
