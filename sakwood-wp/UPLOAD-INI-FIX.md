# Sakwood Bulk Import - Upload Limits Fix

This fixes the "Error uploading ZIP file" issue when using the bulk import feature on DigitalOcean droplets.

## Problem

The default PHP configuration has very low upload limits:
- `upload_max_filesize` = 2M (too small for ZIP files)
- `post_max_size` = 8M (too small)
- ZipArchive extension might not be installed

## Solution

Use the `upload.ini` file to configure PHP with proper limits.

## Quick Fix (Recommended)

Run the installation script from your local machine:

```bash
ssh root@wp.sakww.com 'bash -s' < install-upload-ini.sh
```

This will:
- Detect PHP version on the droplet
- Create `upload.ini` in the correct directory
- Set all PHP limits to proper values
- Restart PHP-FPM automatically
- Verify installation

## Manual Installation

### Step 1: SSH to Droplet

```bash
ssh root@wp.sakww.com
```

### Step 2: Copy upload.ini to Server

Option A - Copy from local:
```bash
scp upload.ini root@wp.sakww.com:/tmp/
```

Option B - Create directly on server:
```bash
cat > /etc/php/8.1/fpm/conf.d/upload.ini << 'EOF'
upload_max_filesize = 100M
post_max_size = 100M
memory_limit = 256M
max_execution_time = 300
max_input_time = 300
max_input_vars = 5000
file_uploads = On
default_socket_timeout = 300
EOF
```

### Step 3: Set Permissions

```bash
chmod 644 /etc/php/8.1/fpm/conf.d/upload.ini
```

### Step 4: Install ZipArchive (if missing)

```bash
apt update
apt install -y php-zip
```

### Step 5: Restart PHP-FPM

```bash
# For PHP 8.1
systemctl restart php8.1-fpm

# For PHP 8.2
systemctl restart php8.2-fpm

# For PHP 8.3
systemctl restart php8.3-fpm
```

## Verify Installation

### Check PHP Settings

```bash
php -r "echo ini_get('upload_max_filesize');"
```

Should output: `100M`

### Check if ZipArchive is Installed

```bash
php -r "echo class_exists('ZipArchive') ? 'ZipArchive: OK' : 'ZipArchive: MISSING';"
```

Should output: `ZipArchive: OK`

### Test Bulk Import

Go to: **https://sakwood.com/wp-admin/admin.php?page=sakwood-bulk-import**

Try uploading a ZIP file with product images.

## Alternative: wp-config.php Method

If you prefer not to use upload.ini, add these lines to `/var/www/html/wp-config.php` (before the stop editing line):

```php
@ini_set( 'upload_max_filesize' , '100M' );
@ini_set( 'post_max_size' , '100M' );
@ini_set( 'memory_limit' , '256M' );
@ini_set( 'max_execution_time' , '300' );
```

Then restart PHP-FPM.

## Troubleshooting

### "Upload limit still 2M after changes"

Clear browser cache and restart PHP-FPM:
```bash
systemctl restart php8.x-fpm
```

Check if upload.ini is in the right place:
```bash
php --ini | grep upload.ini
```

### "ZipArchive class not found"

Install the extension:
```bash
apt update && apt install -y php-zip
systemctl restart php8.x-fpm
```

### Check PHP Error Logs

```bash
tail -f /var/log/php8.1-fpm.log
# or
tail -f /var/log/php8.2-fpm.log
```

## Configuration Details

The `upload.ini` file sets these PHP directives:

| Directive | Value | Description |
|-----------|-------|-------------|
| `upload_max_filesize` | 100M | Maximum file upload size |
| `post_max_size` | 100M | Maximum POST data size |
| `memory_limit` | 256M | Memory limit per script |
| `max_execution_time` | 300 | Maximum script execution time (seconds) |
| `max_input_time` | 300 | Maximum input parsing time (seconds) |
| `max_input_vars` | 5000 | Maximum input variables |
| `file_uploads` | On | Enable file uploads |
| `default_socket_timeout` | 300 | Socket timeout (seconds) |

These settings allow uploading large ZIP files (up to 100MB) containing product images during bulk import.
