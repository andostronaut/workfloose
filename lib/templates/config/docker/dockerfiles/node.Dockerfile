FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# uncomment this if you .env in your app
# COPY .env .env

EXPOSE 8080
CMD [ "npm", "run", "start" ]

