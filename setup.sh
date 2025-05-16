#!/bin/bash

# Start Docker containers
docker compose up -d

# Wait a few seconds for containers to be ready
echo "Waiting for containers to be fully operational..."
until docker exec test-assignment-as-php-1 php -v >/dev/null 2>&1; do
    echo "Waiting for PHP container to be ready..."
    sleep 2
done

echo "Containers are ready! Proceeding with setup..."

# Install PHP dependencies
docker exec -it test-assignment-as-php-1 composer install

# Install and build React application
docker exec -it test-assignment-as-php-1 /bin/bash -c "cd assets/react-app && npm install"
docker exec -it test-assignment-as-php-1 /bin/bash -c "cd assets/react-app && npm run build"

# Check if schema exists and update/create accordingly
if docker exec -it test-assignment-as-php-1 php bin/console doctrine:schema:update --dump-sql | grep -q "Nothing to update"; then
    echo "Schema already exists, checking for updates..."
    docker exec -it test-assignment-as-php-1 php bin/console doctrine:schema:update --force
else
    echo "Creating database schema..."
    docker exec -it test-assignment-as-php-1 php bin/console doctrine:schema:create
fi

echo "Load fixtures..."
docker exec -it test-assignment-as-php-1 php bin/console doctrine:fixtures:load -n

echo "Setup completed successfully! You can access the application at http://localhost"
