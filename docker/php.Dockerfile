FROM php:8.4-apache

COPY docker/virtualhost.conf /etc/apache2/sites-enabled/000-default.conf

RUN a2enmod rewrite

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && sync

RUN install-php-extensions intl
RUN install-php-extensions xdebug
RUN install-php-extensions pdo_pgsql

COPY docker/php.ini /usr/local/etc/php/php.ini
RUN chmod ugo+r /usr/local/etc/php/php.ini

COPY docker/xdebug-enable /usr/bin/xdebug-enable
COPY docker/xdebug-disable /usr/bin/xdebug-disable
RUN  chmod +x /usr/bin/xdebug-enable
RUN  chmod +x /usr/bin/xdebug-disable
RUN xdebug-disable

RUN apt update
RUN apt install -y wget
RUN wget https://getcomposer.org/download/2.8.8/composer.phar
RUN mv composer.phar /usr/bin/composer
RUN chmod +x /usr/bin/composer

RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

RUN apt install -y git

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip

RUN apt install -y npm
