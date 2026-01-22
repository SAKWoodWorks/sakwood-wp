<?php
/**
 * Blog Language GraphQL Filter
 * Adds language filtering to WPGraphQL for posts
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register language field and filter for posts
 * Note: LanguageEnum is registered in language-enum.php
 */
add_action('graphql_register_types', function() {

    // Add language field to Post type
    register_graphql_field('Post', 'language', [
        'type' => 'LanguageEnum',
        'description' => __('The language of this post', 'sakwood-integration'),
        'resolve' => function($post) {
            $language = get_post_meta($post->ID, 'post_language', true);
            return $language ? $language : 'th'; // Default to English
        },
    ]);

    // Add language parameter to posts where argument
    register_graphql_field('RootQueryToPostConnectionWhereArgs', 'language', [
        'type' => 'LanguageEnum',
        'description' => __('Filter posts by language', 'sakwood-integration'),
    ]);

});

/**
 * Filter posts by language in GraphQL query
 */
add_filter('graphql_post_object_connection_query_args', function($query_args, $source, $args, $context, $info) {

    // Check if language filter is set
    if (isset($args['where']['language'])) {
        $language = $args['where']['language'];

        // Add meta query to filter by language
        $query_args['meta_query'] = array(
            array(
                'key' => 'post_language',
                'value' => $language,
                'compare' => '='
            )
        );
    }

    return $query_args;
}, 10, 5);

/**
 * Add default language ordering
 * Posts are ordered by date, but grouped by language preference
 */
add_filter('graphql_post_object_connection_query_args', function($query_args, $source, $args, $context, $info) {

    // If no language filter is specified, prioritize posts in the current locale
    if (!isset($args['where']['language'])) {
        // You can add default language behavior here if needed
        // For now, we'll return all posts when no language is specified
    }

    return $query_args;
}, 10, 5);

/**
 * Set default language for existing posts without language set
 * This is called on plugin activation
 */
function sakwood_set_default_language_for_posts() {
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'meta_query' => array(
            array(
                'key' => 'post_language',
                'compare' => 'NOT EXISTS'
            )
        )
    );

    $posts = get_posts($args);

    foreach ($posts as $post) {
        // Default to English for existing posts
        update_post_meta($post->ID, 'post_language', 'th');
    }
}

/**
 * Admin notice for posts without language set
 */
add_action('admin_notices', function() {
    if (!current_user_can('edit_posts')) {
        return;
    }

    $posts_without_language = get_posts(array(
        'post_type' => 'post',
        'posts_per_page' => 1,
        'meta_query' => array(
            array(
                'key' => 'post_language',
                'compare' => 'NOT EXISTS'
            )
        )
    ));

    if (!empty($posts_without_language)) {
        $count = count($posts_without_language);
        $url = admin_url('edit.php?post_type=post');

        echo '<div class="notice notice-warning is-dismissible">';
        echo '<p>';
        printf(
            __('<strong>Sakwood Blog Language:</strong> You have posts without a language set. <a href="%s">View posts</a>', 'sakwood-integration'),
            esc_url($url)
        );
        echo '</p>';
        echo '</div>';
    }
});
