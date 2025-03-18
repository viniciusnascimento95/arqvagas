# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho para o contêiner
WORKDIR /app

# Copie o arquivo package.json e yarn.lock para o contêiner
COPY package.json yarn.lock ./

# Instale as dependências com yarn
RUN yarn install

# Copie o restante dos arquivos para o contêiner
COPY . .

# Baixar e instalar o script wait-for-it
RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it

# Gere os arquivos de migração do Prisma
# RUN yarn prisma:generate

# RUN yarn prisma:deploy

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3333

# Defina o comando padrão para rodar o aplicativo, usando o wait-for-it
# CMD ["./wait-for-it", "db:5432", "--", "yarn", "start:prod"]
CMD ["-wait", "tcp://db:5432", "-timeout", "60s", "yarn", "start:dev"]
