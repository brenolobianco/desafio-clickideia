#!/bin/bash

set -e

composer install --optimize-autoloader --no-dev


php artisan db:create


php artisan migrate --force


php artisan db:seed --force


apache2-foreground
