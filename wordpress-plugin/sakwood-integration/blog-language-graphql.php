<?php
/**
 * Blog Language GraphQL Filter
 * Adds language field to WPGraphQL for posts
 * Note: Blog posts now work like products - single post with TH/EN translations
 * Thai content in default fields, English in meta fields
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register language field for posts
 * Note: LanguageEnum is registered in language-enum.php
 */
add_action('graphql_register_types', function() {

    // Add language field to Post type
    register_graphql_field('Post', 'language', [
        'type' => 'LanguageEnum',
        'description' => __('The language of this post', 'sakwood-integration'),
        'resolve' => function($post) {
            $post_id = $post->ID;

            // Check if English translations exist
            $has_english_title = get_post_meta($post_id, '_post_title_en', true);
            $has_english_content = get_post_meta($post_id, '_post_content_en', true);

            // If both TH (default fields) and EN (meta fields) exist, return 'th' as primary
            // The 'language' field indicates the primary/default language of the post
            // Since Thai content is in default fields, 'th' is always the primary language
            return 'th';
        },
    ]);

    // Add language parameter to posts where argument
    // Note: This is for GraphQL compatibility, but actual language filtering
    // should be done via the REST API which properly handles the content
    register_graphql_field('RootQueryToPostConnectionWhereArgs', 'language', [
        'type' => 'LanguageEnum',
        'description' => __('Filter posts by language (Note: REST API recommended for blog posts)', 'sakwood-integration'),
    ]);

});

/**
 * Filter posts by language in GraphQL query
 * Note: Since posts now contain both TH and EN content, we don't filter by language
 * The REST API is the recommended way to fetch blog posts with language-specific content
 */
/*
add_filter('graphql_post_object_connection_query_args', function($query_args, $source, $args, $context, $info) {

    // Check if language filter is set
    if (isset($args['where']['language'])) {
        $language = $args['where']['language'];

        // Add meta query to filter by language
        $query_args['meta_query'] = array(
            array(
                'key' => '_post_language',
                'value' => $language,
                'compare' => '='
            )
        );
    }

    return $query_args;
}, 10, 5);
*/
