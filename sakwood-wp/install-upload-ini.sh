#!/bin/bash
# Install upload.ini for Sakwood bulk import
# Usage: ssh root@wp.sakww.com 'bash -s' < install-upload-ini.sh

echo "=== Sakwood - Installing upload.ini ==="
echo ""

# Detect PHP version
PHP_VERSION=""
if [ -f "/usr/bin/php8.1" ]; then
    PHP_VERSION="8.1"
elif [ -f "/usr/bin/php8.2" ]; then
    PHP_VERSION="8.2"
elif [ -f "/usr/bin/php8.3" ]; then
    PHP_VERSION="8.3"
elif [ -f "/usr/bin/php8.0" ]; then
    PHP_VERSION="8.0"
else
    PHP_VERSION="8.1"  # Default fallback
fi

echo "Detected PHP version: $PHP_VERSION"
echo ""

# PHP-FPM conf.d directory
CONF_DIR="/etc/php/$PHP_VERSION/fpm/conf.d"

# Check if directory exists
if [ ! -d "$CONF_DIR" ]; then
    echo "❌ PHP-FPM conf directory not found: $CONF_DIR"
    echo "   Trying mods-available directory..."
    CONF_DIR="/etc/php/$PHP_VERSION/mods-available"
fi

if [ ! -d "$CONF_DIR" ]; then
    echo "❌ Cannot find PHP configuration directory"
    echo "   Please manually check: /etc/php/8.x/fpm/conf.d/"
    exit 1
fi

echo "Using configuration directory: $CONF_DIR"
echo ""

# Create upload.ini file
echo "Creating upload.ini..."
cat > "$CONF_DIR/upload.ini" << 'EOF'
; Sakwood Custom PHP Configuration
; Increased limits for bulk import with ZIP files

upload_max_filesize = 100M
post_max_size = 100M
memory_limit = 256M
max_execution_time = 300
max_input_time = 300
max_input_vars = 5000

; Enable larger file uploads
file_uploads = On

; Increase timeouts for large operations
default_socket_timeout = 300
EOF

echo "✓ Created: $CONF_DIR/upload.ini"
echo ""

# Set proper permissions
chmod 644 "$CONF_DIR/upload.ini"
echo "✓ Set permissions: 644"
echo ""

# Restart PHP-FPM
echo "Restarting PHP-FPM..."
if systemctl restart "php$PHP_VERSION-fpm" 2>/dev/null; then
    echo "✓ Restarted php$PHP_VERSION-fpm"
else
    echo "⚠ Could not restart php$PHP_VERSION-fpm"
    echo "  Please run manually: systemctl restart php$PHP_VERSION-fpm"
fi

echo ""
echo "=== Installation Complete ==="
echo ""
echo "Current PHP settings:"
php -r "echo '  upload_max_filesize: ' . ini_get('upload_max_filesize') . PHP_EOL;"
php -r "echo '  post_max_size: ' . ini_get('post_max_size') . PHP_EOL;"
php -r "echo '  memory_limit: ' . ini_get('memory_limit') . PHP_EOL;"
php -r "echo '  max_execution_time: ' . ini_get('max_execution_time') . ' seconds' . PHP_EOL;"
echo ""

# Check if ZipArchive is available
echo "Checking required PHP extensions:"
php -r "echo class_exists('ZipArchive') ? '  ✓ ZipArchive installed' : '  ❌ ZipArchive NOT installed - run: apt install -y php-zip';" . PHP_EOL;"
php -r "echo function_exists('finfo_open') ? '  ✓ fileinfo installed' : '  ❌ fileinfo NOT installed';" . PHP_EOL;"
echo ""

# Test if settings are loaded
echo "Verifying upload.ini is loaded..."
if php --ini | grep -q "upload.ini"; then
    echo "✓ upload.ini is loaded in PHP configuration"
else
    echo "⚠ upload.ini may not be loaded. Check with: php --ini"
fi

echo ""
echo "=== Next Steps ==="
echo "1. Test bulk import at: https://sakwood.com/wp-admin/admin.php?page=sakwood-bulk-import"
echo "2. If still having issues, check PHP error log: tail -f /var/log/php8.x-fpm.log"
echo ""
