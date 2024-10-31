FROM node:20.12.1

WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install -g npm@latest && \
    npm cache clean --force && \
    npm install

# Copiar el resto de la aplicación
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]