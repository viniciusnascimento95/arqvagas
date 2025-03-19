# Usar uma imagem Node.js oficial
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package.json package-lock.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar o restante do código para o container
COPY . .

# Construir a aplicação
RUN yarn build

# Expor a porta do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["yarn", "start"]
