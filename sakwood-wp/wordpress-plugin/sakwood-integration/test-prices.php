<?php
/**
 * Test script to add price types to products
 * Run this once to add test price data
 */

// Load WordPress
require_once('/var/www/html/wp-load.php');

echo "Adding test price types to products...\n";

// Get all products
$args = array(
    'status' => 'publish',
    'limit' => -1,
);

$products = wc_get_products($args);

$count = 0;
foreach ($products as $product) {
    $product_id = $product->get_id();

    // Get current price
    $base_price = $product->get_price();

    if (!$base_price) {
        continue;
    }

    // Convert to number
    $base_price_num = floatval($base_price);

    // Set multiple price types
    update_post_meta($product_id, '_product_price_types', array('piece', 'meter', 'sqm'));

    // Set prices for each type
    update_post_meta($product_id, '_product_price_piece', $base_price);
    update_post_meta($product_id, '_product_price_meter', round($base_price_num * 0.5));  // Half price per meter
    update_post_meta($product_id, '_product_price_sqm', round($base_price_num * 1.5));   // 1.5x per square meter

    $count++;
    echo "Updated product ID {$product_id}: {$product->get_name()}\n";
    echo "  - Price per piece: {$base_price}\n";
    echo "  - Price per meter: " . round($base_price_num * 0.5) . "\n";
    echo "  - Price per sqm: " . round($base_price_num * 1.5) . "\n\n";
}

echo "\nDone! Updated {$count} products with test price data.\n";
echo "You should now see 3 price columns on the price list page.\n";
