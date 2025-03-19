# Usar uma imagem Node.js oficial
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do backend para o container
COPY package.json package-lock.json yarn.lock ./
# RUN npm install
# RUN npm run generate
# RUN npm install --legacy-peer-deps
RUN yarn install 

RUN npm install next -g

# Copiar o restante do código
COPY . .

# Construir a aplicação
RUN yarn build

# Expor a porta do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "prod"]
