FROM php:8.1-apache

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y curl git unzip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html

RUN composer install --no-dev

EXPOSE 80

CMD ["apache2-foreground"]
