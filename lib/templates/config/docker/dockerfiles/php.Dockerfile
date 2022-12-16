FROM php:8.2-cli-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app/

CMD [ "php", './index.php' ]
