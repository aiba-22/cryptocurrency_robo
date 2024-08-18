FROM node:17.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 3000

CMD ["npx", "nodemon", "src/app.js"]
