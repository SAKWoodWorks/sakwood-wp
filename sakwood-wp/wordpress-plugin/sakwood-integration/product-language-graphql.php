<?php
/**
 * Product Language GraphQL Filter for WooCommerce
 * Adds language filtering to WPGraphQL for WooCommerce products
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register language field and filter for products
 * Note: LanguageEnum is registered in language-enum.php
 */
add_action('graphql_register_types', function() {

    // Add language field to Product (register on the base Product type)
    register_graphql_field('Product', 'language', [
        'type' => 'LanguageEnum',
        'description' => __('The language of this product', 'sakwood-integration'),
        'resolve' => function($product) {
            $product_id = $product->ID;
            $language = get_post_meta($product_id, '_product_language', true);
            return $language ? $language : 'th'; // Default to Thai for products
        },
    ]);

    // Add language parameter to products where argument
    // WooCommerce uses union types, so we need to register for both
    $where_types = ['RootQueryToProductConnectionWhereArgs', 'RootQueryToProductUnionConnectionWhereArgs'];
    foreach ($where_types as $type) {
        register_graphql_field($type, 'language', [
            'type' => 'LanguageEnum',
            'description' => __('Filter products by language', 'sakwood-integration'),
        ]);
    }
});

/**
 * Filter products by language in GraphQL query
 * Note: This filter is commented out due to compatibility issues with WPGraphQL WooCommerce
 * The language field is still available on individual products
 */
/*
add_filter('graphql_product_connection_query_args', function($query_args, $source, $args, $context, $info) {

    // Check if language filter is set
    if (isset($args['where']['language'])) {
        $language = $args['where']['language'];

        // Add meta query to filter by language
        // Make sure we don't overwrite existing meta queries
        if (!isset($query_args['meta_query'])) {
            $query_args['meta_query'] = array();
        }

        // Ensure meta_query is an array
        if (!is_array($query_args['meta_query'])) {
            $query_args['meta_query'] = array();
        }

        // Add our language filter
        $query_args['meta_query'][] = array(
            'key' => 'product_language',
            'value' => $language,
            'compare' => '='
        );
    }

    return $query_args;
}, 10, 5);
*/

/**
 * Add default language for existing products without language set
 * This is called on plugin activation
 */
function sakwood_set_default_language_for_products() {
    $args = array(
        'post_type' => 'product',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'meta_query' => array(
            array(
                'key' => 'product_language',
                'compare' => 'NOT EXISTS'
            )
        )
    );

    $products = get_posts($args);

    foreach ($products as $product) {
        // Default to Thai for existing products
        update_post_meta($product->ID, 'product_language', 'th');
    }
}

/**
 * Admin notice for products without language set
 */
add_action('admin_notices', function() {
    // Only show on product edit screens
    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'product') {
        return;
    }

    if (!current_user_can('edit_products')) {
        return;
    }

    $products_without_language = get_posts(array(
        'post_type' => 'product',
        'posts_per_page' => 1,
        'meta_query' => array(
            array(
                'key' => 'product_language',
                'compare' => 'NOT EXISTS'
            )
        )
    ));

    if (!empty($products_without_language)) {
        $count = count(get_posts(array(
            'post_type' => 'product',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'product_language',
                    'compare' => 'NOT EXISTS'
                )
            )
        )));

        $url = admin_url('edit.php?post_type=product');

        echo '<div class="notice notice-warning is-dismissible">';
        echo '<p>';
        printf(
            __('<strong>Sakwood Product Language:</strong> You have %d products without a language set. <a href="%s">View products</a>', 'sakwood-integration'),
            esc_html($count),
            esc_url($url)
        );
        echo '</p>';
        echo '</div>';
    }
});
