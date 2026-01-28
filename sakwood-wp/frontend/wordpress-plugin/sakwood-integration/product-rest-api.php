<?php
/**
 * Product REST API with Language
 * Returns products with language metadata
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register REST API endpoint for products with language
 */
add_action('rest_api_init', function () {
    register_rest_route('sakwood/v1', '/products', [
        'methods' => 'GET',
        'callback' => 'sakwood_get_products_with_language',
        'permission_callback' => '__return_true',
    ]);
});

/**
 * Get products with language metadata
 */
function sakwood_get_products_with_language($request) {
    $language = $request->get_param('language');
    $per_page = $request->get_param('per_page') ?: 20;

    $args = [
        'post_type' => 'product',
        'posts_per_page' => $per_page,
        'post_status' => 'publish',
    ];

    // Filter by language if specified
    if ($language) {
        $args['meta_query'] = [
            [
                'key' => 'product_language',
                'value' => $language,
                'compare' => '=',
            ],
        ];
    }

    $products = get_posts($args);
    $result = [];

    foreach ($products as $product) {
        $product_id = $product->ID;
        $wc_product = wc_get_product($product_id);

        if (!$wc_product) {
            continue;
        }

        $image_id = $wc_product->get_image_id();
        $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'full') : null;

        // Get product dimensions (thickness in cm, width in cm, length in m)
        $thickness = get_post_meta($product_id, '_product_thickness', true);
        $width = get_post_meta($product_id, '_product_width', true);
        $length = get_post_meta($product_id, '_product_length', true);

        // Convert to proper types
        $thickness_val = $thickness !== '' ? floatval($thickness) : null;
        $width_val = $width !== '' ? floatval($width) : null;
        $length_val = $length !== '' ? floatval($length) : null;

        // Calculate volume
        $volume = null;
        if ($thickness_val && $width_val && $length_val) {
            // Convert to meters and calculate volume: (thickness/100) × (width/100) × length
            $thickness_m = $thickness_val / 100;
            $width_m = $width_val / 100;
            $length_m = $length_val;
            $volume = $thickness_m * $width_m * $length_m;
        }

        $result[] = [
            'id' => $product->ID,
            'databaseId' => $product->ID,
            'name' => $wc_product->get_name(),
            'slug' => $wc_product->get_slug(),
            'language' => get_post_meta($product_id, 'product_language', true) ?: 'th',
            'price' => $wc_product->get_price(),
            'regularPrice' => $wc_product->get_regular_price(),
            'image' => $image_url ? ['sourceUrl' => $image_url] : null,
            'type' => $wc_product->get_type(),
            'width' => $width_val,
            'length' => $length_val,
            'thickness' => $thickness_val,
            'volume' => $volume,
        ];
    }

    return rest_ensure_response($result);
}
