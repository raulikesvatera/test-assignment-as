# Test Assignment

## Prerequisites
- Git
- Docker
- Docker Compose

## Quick Setup
```console
git clone git@github.com:raulikesvatera/test-assignment-as.git
cd test-assignment-as
chmod +x setup.sh
./setup.sh
```

Once setup is complete, the application will be available at: http://localhost/


## Troubleshooting
if setup.sh fails then these commands can be run one by one:

```console
docker compose up -d
docker exec -it test-assignment-as-php-1 composer install
docker exec -it test-assignment-as-php-1 /bin/bash -c "cd assets/react-app && npm install"
docker exec -it test-assignment-as-php-1 /bin/bash -c "cd assets/react-app && npm run build"
docker exec -it test-assignment-as-php-1 php bin/console doctrine:schema:create
docker exec -it test-assignment-as-php-1 php bin/console doctrine:fixtures:load -n
```
