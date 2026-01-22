#!/bin/bash

echo "🗄️  Setting up Sakwood CRM database tables..."

# Check if WordPress container is running
if ! docker ps | grep -q "sak_wp"; then
    echo "❌ WordPress container is not running!"
    exit 1
fi

# Create a PHP script to create CRM tables
docker exec sak_wp sh -c "cat > /tmp/setup-crm.php << 'PHPEOF'
<?php
// WordPress bootstrap
require_once('/var/www/html/wp-load.php');

// Include CRM database class
require_once(ABSPATH . 'wp-content/plugins/sakwood-integration/crm-database.php');

// Create tables
echo \"Creating CRM database tables...\\n\";
try {
    Sakwood_CRM_Database::create_tables();
    echo \"✅ CRM tables created successfully!\\n\\n\";

    // Verify tables were created
    global \$wpdb;
    \$tables = array(
        'customers' => \$wpdb->prefix . 'sakwood_customers',
        'interactions' => \$wpdb->prefix . 'sakwood_interactions',
        'tasks' => \$wpdb->prefix . 'sakwood_tasks',
        'payments' => \$wpdb->prefix . 'sakwood_payments',
    );

    echo \"Verifying tables:\\n\";
    foreach (\$tables as \$name => \$table) {
        \$exists = \$wpdb->get_var(\"SHOW TABLES LIKE '\$table'\");
        if (\$exists) {
            echo \"  ✅ \$name: \$table\\n\";
        } else {
            echo \"  ❌ \$name: NOT CREATED\\n\";
        }
    }

} catch (Exception \$e) {
    echo \"❌ Error: \" . \$e->getMessage() . \"\\n\";
    exit(1);
}
PHPEOF

php /tmp/setup-crm.php
"
