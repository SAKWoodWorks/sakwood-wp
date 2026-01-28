<?php
/**
 * Wholesale Plugin Test Script
 *
 * Run this to check if the wholesale plugin is working correctly
 *
 * Usage: Upload to wp-content/plugins/ and visit yoursite.com/wp-content/plugins/test-wholesale.php
 */

// Load WordPress
require_once('../../../wp-load.php');

?>
<!DOCTYPE html>
<html>
<head>
    <title>Wholesale Plugin Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .success { background: #d4edda; padding: 15px; border: 1px solid #c3e6cb; color: #155724; }
        .error { background: #f8d7da; padding: 15px; border: 1px solid #f5c6cb; color: #721c24; }
        .info { background: #d1ecf1; padding: 15px; border: 1px solid #bee5eb; color: #0c5460; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        th { background: #f4f4f4; }
    </style>
</head>
<body>
    <h1>🧪 Wholesale Plugin Test</h1>

    <?php
    // Check if plugin is active
    $active_plugins = get_option('active_plugins', array());
    $plugin_active = in_array('sakwood-integration/sakwood-integration.php', $active_plugins);

    if ($plugin_active): ?>
        <div class="success">✅ Plugin is ACTIVE</div>
    <?php else: ?>
        <div class="error">❌ Plugin is NOT active - Please activate it first!</div>
        <p><a href="<?php echo admin_url('plugins.php'); ?>">Go to Plugins Page</a></p>
        <?php exit;
    endif;

    // Check if class exists
    if (class_exists('Sakwood_Wholesale_Database')): ?>
        <div class="success">✅ Sakwood_Wholesale_Database class exists</div>
    <?php else: ?>
        <div class="error">❌ Sakwood_Wholesale_Database class NOT found</div>
    <?php endif;

    // Check if admin class exists
    if (class_exists('Sakwood_Wholesale_Admin')): ?>
        <div class="success">✅ Sakwood_Wholesale_Admin class exists</div>
    <?php else: ?>
        <div class="error">❌ Sakwood_Wholesale_Admin class NOT found</div>
    <?php endif;

    // Check if API class exists
    if (class_exists('Sakwood_Wholesale_API')): ?>
        <div class="success">✅ Sakwood_Wholesale_API class exists</div>
    <?php else: ?>
        <div class="error">❌ Sakwood_Wholesale_API class NOT found</div>
    <?php endif;

    // Check database table
    global $wpdb;
    $table_name = $wpdb->prefix . 'sakwood_wholesale_applications';
    $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'");

    if ($table_exists): ?>
        <div class="success">✅ Database table exists: <?php echo $table_name; ?></div>
    <?php else: ?>
        <div class="error">❌ Database table NOT found: <?php echo $table_name; ?></div>
        <p><strong>Try deactivating and reactivating the plugin to create the table.</strong></p>
    <?php endif;

    // Check wholesale role
    $role_exists = role_exists('wholesale_customer');
    if ($role_exists): ?>
        <div class="success">✅ Wholesale customer role exists</div>
    <?php else: ?>
        <div class="error">❌ Wholesale customer role NOT found</div>
    <?php endif;

    // Show menu URL
    $menu_url = admin_url('admin.php?page=sakwood-wholesale');
    ?>
    <div class="info">
        <h3>📍 Wholesale Admin Menu:</h3>
        <p><strong>Expected URL:</strong> <a href="<?php echo $menu_url; ?>" target="_blank"><?php echo $menu_url; ?></a></p>
        <p><strong>Look for:</strong> "Wholesale" in the admin sidebar (should have 👥 icon)</p>
    </div>

    <?php
    // If table exists, show some stats
    if ($table_exists):
        $count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
        $pending = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE status = 'pending'");
        $approved = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE status = 'approved' OR status = 'active'");
    ?>
        <h2>📊 Applications in Database</h2>
        <table>
            <tr>
                <th>Total</th>
                <th>Pending</th>
                <th>Approved/Active</th>
            </tr>
            <tr>
                <td><?php echo $count; ?></td>
                <td><?php echo $pending; ?></td>
                <td><?php echo $approved; ?></td>
            </tr>
        </table>

        <?php if ($count > 0): ?>
            <h3>Recent Applications:</h3>
            <table>
                <tr>
                    <th>Application ID</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
                <?php
                $apps = $wpdb->get_results("SELECT * FROM $table_name ORDER BY submitted_date DESC LIMIT 5");
                foreach ($apps as $app): ?>
                    <tr>
                        <td><?php echo esc_html($app->application_id); ?></td>
                        <td><?php echo esc_html($app->company_name); ?></td>
                        <td><?php echo esc_html($app->status); ?></td>
                        <td><?php echo $app->submitted_date; ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php endif; ?>
    <?php endif; ?>

    <div class="info">
        <h3>🔧 Troubleshooting Steps:</h3>
        <ol>
            <li><strong>Deactivate and Reactivate the plugin:</strong> Go to Plugins → Deactivate "Sakwood Integration" → Activate</li>
            <li><strong>Check for errors:</strong> Look at <code>wp-content/debug.log</code> for PHP errors</li>
            <li><strong>Clear cache:</strong> Clear any browser or server caching plugins</li>
            <li><strong>Check user permissions:</strong> Make sure you're logged in as Administrator</li>
        </ol>
    </div>

    <p>
        <a href="<?php echo admin_url(); ?>">← Back to WordPress Admin</a>
    </p>
</body>
</html>
