#!/bin/bash

echo "🔧 Activating Sakwood Integration Plugin..."

# Check if WordPress container is running
if ! docker ps | grep -q "sak_wp"; then
    echo "❌ WordPress container is not running!"
    echo "Please start it first with: docker-compose up -d"
    exit 1
fi

# Activate plugin using WP-CLI (install if needed)
echo "📦 Installing WP-CLI if not present..."
docker exec sak_wp sh -c "
    if ! command -v wp &> /dev/null; then
        curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
        chmod +x wp-cli.phar
        mv wp-cli.phar /usr/local/bin/wp
    fi
"

echo "✅ Activating Sakwood Integration plugin..."
docker exec sak_wp sh -c "cd /var/www/html && wp plugin activate sakwood-integration --allow-root 2>&1"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Plugin activated successfully!"
    echo ""
    echo "📊 CRM database tables created."
    echo ""
    echo "🌐 Access WordPress Admin: http://localhost:8006/wp-admin"
    echo ""
    echo "📋 Plugin Features Enabled:"
    echo "   • CRM Dashboard"
    echo "   • Customer Management"
    echo "   • Interaction Logging"
    echo "   • Task Management"
    echo "   • PromptPay Payment Verification"
    echo "   • Hero Slides Custom Post Type"
    echo "   • Promotional Popup Settings"
    echo ""
else
    echo "❌ Activation failed. Please activate manually via WordPress Admin."
fi
