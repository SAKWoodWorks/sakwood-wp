<?php
/**
 * Must Use Plugin: Disable WPGraphQL Language Field
 *
 * This file should be placed in wp-content/mu-plugins/ to load before all other plugins
 */

// Completely disable WPGraphQL language module
add_filter('graphql_should_load_language_plugin', '__return_false', -1);

// Prevent language filters from being added
add_action('graphql_register_types', function() {
    // Remove all language-related filters
    remove_all_filters('graphql_post_object_connection_query_args');
    remove_all_filters('graphql_term_object_connection_query_args');
}, 0);

// Also disable language enum registration
add_filter('graphql_registerEnumTypes', function($enum_types) {
    unset($enum_types['LanguageEnum']);
    return $enum_types;
}, 999);

// And remove language fields from all types at registration
add_filter('graphql_Post_fields', function($fields, $type_name) {
    unset($fields['language']);
    unset($fields['locale']);
    return $fields;
}, 999, 2);

add_filter('graphql_Product_fields', function($fields, $type_name) {
    unset($fields['language']);
    unset($fields['locale']);
    return $fields;
}, 999, 2);
