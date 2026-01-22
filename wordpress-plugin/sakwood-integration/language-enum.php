<?php
/**
 * Shared Language Enum for WPGraphQL
 * This file registers the LanguageEnum type once for both posts and products
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register LanguageEnum type
 */
add_action('graphql_register_types', function() {
    register_graphql_enum_type('LanguageEnum', [
        'description' => __('Language codes for content', 'sakwood-integration'),
        'values' => [
            'en' => [
                'value' => 'en',
                'description' => __('English', 'sakwood-integration'),
            ],
            'th' => [
                'value' => 'th',
                'description' => __('Thai', 'sakwood-integration'),
            ],
        ],
    ]);
});
