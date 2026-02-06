#!/bin/bash
# Database Backup Script for Sakwood E-commerce Site
# This script backs up the MySQL database and retains the last 7 days of backups

set -e

# Configuration
BACKUP_DIR="/var/www/sakwood/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/wordpress_backup_$DATE.sql"
COMPRESSED_BACKUP="$BACKUP_FILE.gz"
RETENTION_DAYS=7

# Load environment variables
if [ -f /var/www/sakwood/.env ]; then
    export $(cat /var/www/sakwood/.env | grep -v '^#' | xargs)
else
    echo "❌ Error: .env file not found!"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "======================================"
echo "Database Backup - Sakwood"
echo "======================================"
echo "Time: $(date)"
echo "Backup directory: $BACKUP_DIR"
echo ""

# Dump database
echo "[1/4] Dumping database..."
docker exec sak_db mysqldump -u root -p"${MYSQL_ROOT_PASSWORD}" wordpress > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Database dump successful"
else
    echo "❌ Database dump failed"
    exit 1
fi

# Compress backup
echo "[2/4] Compressing backup..."
gzip "$BACKUP_FILE"

if [ -f "$COMPRESSED_BACKUP" ]; then
    BACKUP_SIZE=$(du -h "$COMPRESSED_BACKUP" | cut -f1)
    echo "✅ Backup compressed: $COMPRESSED_BACKUP ($BACKUP_SIZE)"
else
    echo "❌ Compression failed"
    exit 1
fi

# Remove old backups
echo "[3/4] Removing backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -name "wordpress_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
DELETED_COUNT=$(find "$BACKUP_DIR" -name "wordpress_backup_*.sql.gz" | wc -l)
echo "✅ Retained $DELETED_COUNT backup(s)"

# List current backups
echo "[4/4] Current backups:"
ls -lh "$BACKUP_DIR" | grep "wordpress_backup_" | tail -5

# Log completion
echo ""
echo "======================================"
echo "✅ Backup completed successfully!"
echo "======================================"
echo "File: $COMPRESSED_BACKUP"
echo "Size: $BACKUP_SIZE"
echo "Next backup: $(date -d '+1 day' '+%Y-%m-%d %H:%M:%S')"
echo ""

# Optional: Upload to cloud storage (uncomment and configure)
# echo "Uploading to cloud storage..."
# s3cmd put "$COMPRESSED_BACKUP" s3://sakwood-backups/
