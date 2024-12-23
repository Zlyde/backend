# elspark-backend/Dockerfile
# Använd en Node.js-bild
FROM node:18

# Sätt arbetskatalog
WORKDIR /app

# Kopiera package.json
COPY package*.json ./

# Installera beroenden
RUN npm install

# Kopiera all övrig kod
COPY . .

# Exponera port 5000
EXPOSE 5001

# Startkommando
CMD ["npm", "run", "devStart-api"]
