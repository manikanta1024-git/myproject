FROM node:18

WORKDIR /app

# First copy package files
COPY package*.json ./
RUN npm install

# Then copy source code (VERY IMPORTANT)
COPY index.js .

CMD ["node","index.js"]
