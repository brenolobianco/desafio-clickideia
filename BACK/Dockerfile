
FROM php:latest


WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    unzip \
    zip

RUN docker-php-ext-install \
    pdo_mysql \
    zip


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www/html


RUN composer install --optimize-autoloader --no-dev

RUN php artisan key:generate


RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage


RUN apt-get update && apt-get install -y phpmyadmin 

EXPOSE 5000

CMD php artisan serve --host=0.0.0.0 --port=5000
