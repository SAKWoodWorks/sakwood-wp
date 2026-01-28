<?php
/**
 * Product Dimensions GraphQL
 * Exposes product dimensions to WPGraphQL API
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register product dimensions in GraphQL
 */
function sakwood_register_product_dimensions_graphql() {
    // Register thickness field (cm)
    register_graphql_field('Product', 'thickness', [
        'type'        => 'Float',
        'description' => __('Product thickness in centimeters', 'sakwood'),
        'resolve'     => function ($source) {
            $thickness = get_post_meta($source->ID, '_product_thickness', true);
            return $thickness ? floatval($thickness) : null;
        },
    ]);

    // Register width field (cm)
    register_graphql_field('Product', 'width', [
        'type'        => 'Float',
        'description' => __('Product width in centimeters', 'sakwood'),
        'resolve'     => function ($source) {
            $width = get_post_meta($source->ID, '_product_width', true);
            return $width ? floatval($width) : null;
        },
    ]);

    // Register length field (m)
    register_graphql_field('Product', 'length', [
        'type'        => 'Float',
        'description' => __('Product length in meters', 'sakwood'),
        'resolve'     => function ($source) {
            $length = get_post_meta($source->ID, '_product_length', true);
            return $length ? floatval($length) : null;
        },
    ]);

    // Register volume field (calculated in cubic meters)
    register_graphql_field('Product', 'volume', [
        'type'        => 'Float',
        'description' => __('Product volume in cubic meters (thickness × width × length)', 'sakwood'),
        'resolve'     => function ($source) {
            $thickness = get_post_meta($source->ID, '_product_thickness', true);
            $width = get_post_meta($source->ID, '_product_width', true);
            $length = get_post_meta($source->ID, '_product_length', true);

            if ($thickness && $width && $length) {
                // Convert cm to m: (thickness/100) × (width/100) × length
                $thickness_m = floatval($thickness) / 100;
                $width_m = floatval($width) / 100;
                $length_m = floatval($length);
                return $thickness_m * $width_m * $length_m;
            }
            return null;
        },
    ]);
}
add_action('graphql_register_types', 'sakwood_register_product_dimensions_graphql');
