#!/bin/bash
# Fix PHP upload limits for WordPress bulk import on DigitalOcean droplet
# Run this script on your droplet: ssh root@wp.sakww.com 'bash -s' < fix-upload-limits.sh

echo "=== Sakwood Bulk Import - Fix Upload Limits ==="
echo ""

# Path to WordPress
WP_PATH="/var/www/html"

# Backup wp-config.php
echo "1. Backing up wp-config.php..."
cp $WP_PATH/wp-config.php $WP_PATH/wp-config.php.backup.$(date +%Y%m%d_%H%M%S)
echo "   ✓ Backup created"
echo ""

# Check if upload limits already configured
if grep -q "upload_max_filesize" $WP_PATH/wp-config.php; then
    echo "   Upload limits already configured in wp-config.php"
    echo "   Removing old settings..."
    sed -i '/upload_max_filesize/d' $WP_PATH/wp-config.php
    sed -i '/post_max_size/d' $WP_PATH/wp-config.php
    sed -i '/memory_limit/d' $WP_PATH/wp-config.php
    sed -i '/max_execution_time/d' $WP_PATH/wp-config.php
fi

# Find the line with "/* That's all, stop editing! */" and insert before it
echo "2. Adding PHP upload limit settings to wp-config.php..."
sed -i '/\* That'\''s all, stop editing! \*\//i\
@ini_set( "upload_max_size" , "100M" );\
@ini_set( "post_max_size" , "100M" );\
@ini_set( "memory_limit" , "256M" );\
@ini_set( "max_execution_time" , "300" );\
@ini_set( "max_input_time" , "300" );\
' $WP_PATH/wp-config.php

echo "   ✓ Settings added"
echo ""

# Restart PHP-FPM to apply changes
echo "3. Restarting PHP-FPM..."
if command -v php8.1-fpm &> /dev/null; then
    systemctl restart php8.1-fpm
    echo "   ✓ Restarted php8.1-fpm"
elif command -v php8.2-fpm &> /dev/null; then
    systemctl restart php8.2-fpm
    echo "   ✓ Restarted php8.2-fpm"
elif command -v php8.3-fpm &> /dev/null; then
    systemctl restart php8.3-fpm
    echo "   ✓ Restarted php8.3-fpm"
else
    echo "   ! Could not detect PHP-FPM version"
    echo "   ! Please restart PHP manually: systemctl restart php8.x-fpm"
fi

echo ""
echo "=== Configuration Complete ==="
echo ""
echo "Current PHP settings:"
php -r "echo '  upload_max_filesize: ' . ini_get('upload_max_filesize') . PHP_EOL;"
php -r "echo '  post_max_size: ' . ini_get('post_max_size') . PHP_EOL;"
php -r "echo '  memory_limit: ' . ini_get('memory_limit') . PHP_EOL;"
php -r "echo '  max_execution_time: ' . ini_get('max_execution_time') . PHP_EOL;"
echo ""
echo "Check if ZipArchive is installed:"
php -r "echo class_exists('ZipArchive') ? '  ✓ ZipArchive installed' : '  ❌ ZipArchive NOT installed - run: apt install php-zip';" . PHP_EOL;"
echo ""
echo "If ZipArchive is not installed, run:"
echo "  apt update && apt install -y php-zip"
echo "  systemctl restart php8.x-fpm"
echo ""
