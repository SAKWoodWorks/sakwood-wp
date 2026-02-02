#!/bin/bash

echo "Installing JWT Auth WordPress Plugin..."

# Download JWT Auth plugin
curl -O https://downloads.wordpress.org/plugin/jwt-authentication.530421.zip

# Copy to WordPress container
docker cp jwt-authentication.530421.zip sak_wp:/var/www/html/wp-content/plugins/

# Install and activate
docker exec sak_wp wp plugin install jwt-authentication --activate --allow-root

# Clean up
rm jwt-authentication.530421.zip
docker exec sak_wp rm /var/www/html/wp-content/plugins/jwt-authentication.530421.zip

echo "JWT Auth plugin installed successfully!"
echo "Test endpoint: curl -X POST http://localhost:8006/wp-json/jwt-auth/v1/token -d 'username=YOUR_USER&password=YOUR_PASS'"
