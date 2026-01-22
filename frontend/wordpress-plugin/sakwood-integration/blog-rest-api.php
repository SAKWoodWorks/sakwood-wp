<?php
/**
 * Blog REST API for Thai language support
 * Handles Thai slugs correctly
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('sakwood/v1', '/blog/post/(?P<slug>[a-zA-Z0-9-\u0E00-\u0E7F]+)', [
        'methods' => 'GET',
        'callback' => 'sakwood_get_blog_post_by_slug',
        'permission_callback' => '__return_true',
    ]);
});

function sakwood_get_blog_post_by_slug($request) {
    $slug = $request->get_param('slug');

    // Query post by slug
    $posts = get_posts([
        'name' => $slug,
        'post_type' => 'post',
        'post_status' => 'publish',
        'numberposts' => 1,
    ]);

    if (empty($posts)) {
        return new WP_Error('post_not_found', 'Post not found', ['status' => 404]);
    }

    $post = $posts[0];

    // Get featured image
    $featured_image = null;
    if (has_post_thumbnail($post->ID)) {
        $featured_image_id = get_post_thumbnail_id($post->ID);
        $featured_image = [
            'sourceUrl' => wp_get_attachment_image_url($featured_image_id, 'full'),
            'altText' => get_post_meta($featured_image_id, '_wp_attachment_image_alt', true),
            'caption' => wp_get_attachment_caption($featured_image_id),
        ];
    }

    // Get author
    $author = get_the_author_meta('display_name', $post->post_author);

    // Get categories
    $categories = get_the_category($post->ID);
    $category_nodes = array_map(function($cat) {
        return [
            'name' => $cat->name,
            'slug' => $cat->slug,
        ];
    }, $categories);

    // Get tags
    $tags = get_the_tags($post->ID);
    $tag_nodes = [];
    if ($tags) {
        $tag_nodes = array_map(function($tag) {
            return [
                'name' => $tag->name,
                'slug' => $tag->slug,
            ];
        }, $tags);
    }

    return [
        'id' => $post->ID,
        'title' => get_the_title($post->ID),
        'slug' => $post->post_name,
        'content' => apply_filters('the_content', get_post_field('post_content', $post->ID)),
        'excerpt' => get_the_excerpt($post->ID),
        'date' => get_the_date('c', $post->ID),
        'featuredImage' => $featured_image ? ['node' => $featured_image] : null,
        'author' => [
            'node' => [
                'name' => $author,
            ]
        ],
        'categories' => [
            'nodes' => $category_nodes,
        ],
        'tags' => [
            'nodes' => $tag_nodes,
        ],
    ];
}
