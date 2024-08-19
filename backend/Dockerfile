FROM node:17.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npx", "nodemon", "--exec", "npm start & node src/batch.js"]
