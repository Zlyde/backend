# elspark-backend/Dockerfile
# Använd en Node.js-bild
FROM node:18

# Sätt arbetskatalog
WORKDIR /app

# Kopiera package.json och installera beroenden
COPY package*.json ./
RUN npm install

# Kopiera all övrig kod
COPY . .

# Exponera port 5000
EXPOSE 5000

# Startkommando, skriv ut "Hello World" till terminalen
CMD ["node", "-e", "console.log('Hello World from Backend');"]
