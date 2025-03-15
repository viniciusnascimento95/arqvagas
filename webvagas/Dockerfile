# Usar uma imagem Node.js oficial
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do frontend para o container
COPY package.json package-lock.json ./
# RUN npm install
# RUN npm run generate
# RUN npm install --legacy-peer-deps
RUN npm install --force


# Copiar o restante do código
COPY . .

# Construir a aplicação
RUN npm run dev

# Expor a porta do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
