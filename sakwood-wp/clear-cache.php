<?php
/**
 * Clear all WordPress/WooCommerce/WPGraphQL caches
 * Upload this to your WordPress root and visit /clear-cache.php
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    require_once dirname(__FILE__) . '/wp-load.php';
}

// Check if user is admin
if (!current_user_can('manage_options')) {
    wp_die('Access denied. Please login as admin.');
}

echo "<h2>Clearing All Caches...</h2>";

// 1. Clear WordPress transients
echo "<p>1. Clearing WordPress transients...</p>";
global $wpdb;
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_%'");
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_%'");
echo "<strong>✓ Done</strong><br>";

// 2. Clear WooCommerce product transients
echo "<p>2. Clearing WooCommerce product transients...</p>";
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE 'wc_product_%'");
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE 'wc_category_%'");
echo "<strong>✓ Done</strong><br>";

// 3. Clear WPGraphQL cache
echo "<p>3. Clearing WPGraphQL cache...</p>";
delete_transient('wpgraphql_query_cache');
delete_transient('wpgraphql_schema');
echo "<strong>✓ Done</strong><br>";

// 4. Clear object cache
echo "<p>4. Clearing object cache...</p>";
if (function_exists('wp_cache_flush')) {
    wp_cache_flush();
    echo "<strong>✓ Done</strong><br>";
} else {
    echo "Object cache not available<br>";
}

// 5. Clear WooCommerce cache
echo "<p>5. Clearing WooCommerce cache...</p>";
if (class_exists('WooCommerce')) {
    $woocommerce = WooCommerce::instance();
    if (method_exists($woocommerce, 'clear_product_transients')) {
        $woocommerce->clear_product_transients();
        echo "<strong>✓ Done</strong><br>";
    }
}

// 6. Force regenerate product lookup tables
echo "<p>6. Regenerating product lookup tables...</p>";
if (function_exists('wc_delete_product_transients')) {
    $product_ids = get_posts(array(
        'post_type' => 'product',
        'fields' => 'ids',
        'posts_per_page' => -1,
    ));

    foreach ($product_ids as $product_id) {
        wc_delete_product_transients($product_id);
    }
    echo "<strong>✓ Done (cleared " . count($product_ids) . " products)</strong><br>";
}

echo "<h3>All caches cleared! <a href='" . home_url() . "'>View Site</a></h3>";
echo "<p><strong>Note:</strong> This file should be deleted after use for security.</p>";

// Optionally delete this file automatically
// unlink(__FILE__);
