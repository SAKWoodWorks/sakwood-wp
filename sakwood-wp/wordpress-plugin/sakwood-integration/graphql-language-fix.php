<?php
/**
 * Fix for GraphQL LanguageEnum error
 *
 * Disables WPGraphQL language module since we're not using it
 * and LanguageEnum type is not properly registered.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Disable WPGraphQL language support completely
add_filter('graphql_enable_language_field', '__return_false');
add_filter('graphqlLanguage_supported', '__return_false');
add_filter('graphql_wp_config_language', '__return_false');

// Run at very early priority to remove language before types are registered
add_action('init', function() {
    // Remove language filters from WPGraphQL
    remove_all_filters('graphql_post_object_connection_query_args');
    remove_all_filters('graphql_term_object_connection_query_args');
}, 5);

// Remove language field from type definitions
add_action('graphql_register_types', function($type_registry) {

    // Get all registered types
    $types = $type_registry->get_types();

    foreach ($types as $type_name => $type_config) {
        // Only process post types
        if (in_array($type_name, ['Post', 'Page', 'Product', 'ProductVariation', 'ShopOrder', 'Attachment'])) {
            // Unregister the language field
            $type_registry->unregister_field('RootQuery', $type_name, 'language');
            $type_registry->unregister_field($type_name, $type_name, 'language');
        }
    }
}, 99);
