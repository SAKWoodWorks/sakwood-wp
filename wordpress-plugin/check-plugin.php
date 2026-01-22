<?php
/**
 * Quick check if wholesale admin is loaded
 * Upload to: wp-content/plugins/check-plugin.php
 * Visit: http://localhost:8006/wp-content/plugins/check-plugin.php
 */

require_once('../../../wp-load.php');

echo "<h1>Plugin Check</h1>";

// Check if plugin is active
$active = get_option('active_plugins');
echo "<h2>Active Plugins:</h2>";
echo "<pre>" . print_r($active, true) . "</pre>";

// Check if class exists
echo "<h2>Class Check:</h2>";
echo "Sakwood_Wholesale_Admin: " . (class_exists('Sakwood_Wholesale_Admin') ? '✅ YES' : '❌ NO') . "<br>";
echo "Sakwood_Wholesale_API: " . (class_exists('Sakwood_Wholesale_API') ? '✅ YES' : '❌ NO') . "<br>";
echo "Sakwood_Wholesale_Database: " . (class_exists('Sakwood_Wholesale_Database') ? '✅ YES' : '❌ NO') . "<br>";

// Check current user
$current_user = wp_get_current_user();
echo "<h2>Current User:</h2>";
echo "User: " . $current_user->user_login . "<br>";
echo "Email: " . $current_user->user_email . "<br>";
echo "Roles: " . implode(', ', $current_user->roles) . "<br>";
echo "Can manage_options: " . (current_user_can('manage_options') ? 'YES' : 'NO') . "<br>";
echo "Can edit_posts: " . (current_user_can('edit_posts') ? 'YES' : 'NO') . "<br>";

// Check menu
global $menu, $submenu;
echo "<h2>Admin Menu:</h2>";
echo "<pre>";
foreach ($menu as $key => $item) {
    if (strpos($item[0], 'Wholesale') !== false || strpos($item[3], 'sakwood') !== false) {
        echo "Found: " . $item[0] . " - " . $item[2] . "\n";
    }
}
echo "</pre>";

// Check if menu hook was registered
echo "<h2>Menu Hooks:</h2>";
$hooks = array(
    'admin_menu' => has_action('admin_menu'),
    'admin_init' => has_action('admin_init'),
);
echo "<pre>" . print_r($hooks, true) . "</pre>";

echo "<p><a href='" . admin_url() . "'>Go to Admin</a></p>";
