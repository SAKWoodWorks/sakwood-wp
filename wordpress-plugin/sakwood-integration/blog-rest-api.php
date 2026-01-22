<?php
/**
 * Blog REST API
 *
 * Custom REST API endpoints for blog posts with language support
 * Thai content from default fields, English from meta fields
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Blog_REST_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Sanitize slug without removing Thai characters
     */
    public function sanitize_slug_preserve_thai($slug) {
        // Just URL decode and return - no sanitization to preserve Thai characters
        return urldecode($slug);
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get all posts with language filter
        register_rest_route('sakwood/v1', '/posts', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_posts'),
            'permission_callback' => '__return_true',
            'args' => array(
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'per_page' => array(
                    'default' => 10,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // Get single post by slug with language filter
        register_rest_route('sakwood/v1', '/posts/(?P<slug>[^/]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_post_by_slug'),
            'permission_callback' => '__return_true',
            'args' => array(
                'slug' => array(
                    'required' => true,
                    'sanitize_callback' => array($this, 'sanitize_slug_preserve_thai'),
                ),
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));
    }

    /**
     * Get posts with language filtering
     * Returns all posts with content based on requested language
     */
    public function get_posts($request) {
        $language = $request->get_param('language');
        $per_page = $request->get_param('per_page');
        $page = $request->get_param('page');

        // Get posts via WordPress (no language filtering - we'll handle content in format_post)
        $args = array(
            'post_type' => 'post',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'paged' => $page,
        );

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_posts = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_posts[] = $this->format_post($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_posts);
    }

    /**
     * Get single post by slug with language filtering
     */
    public function get_post_by_slug($request) {
        $slug = $request->get_param('slug');
        $language = $request->get_param('language');

        // Get post by slug
        $posts = get_posts(array(
            'name' => $slug,
            'post_type' => 'post',
            'post_status' => 'publish',
            'numberposts' => 1,
        ));

        if (empty($posts)) {
            return new WP_Error('post_not_found', __('Post not found', 'sakwood-integration'), array('status' => 404));
        }

        $post = $posts[0];

        // Return the post with appropriate language content
        return rest_ensure_response($this->format_post($post, $language));
    }

    /**
     * Format post data for API response based on language
     */
    private function format_post($post, $language = 'th') {
        // Get language-specific content
        if ($language === 'en') {
            // Try to get English content from meta fields
            $title = get_post_meta($post->ID, '_post_title_en', true);
            $content = get_post_meta($post->ID, '_post_content_en', true);
            $excerpt = get_post_meta($post->ID, '_post_excerpt_en', true);

            // Fall back to Thai content if English translation is missing
            if (empty($title)) {
                $title = get_the_title($post->ID);
            }
            if (empty($content)) {
                $content = apply_filters('the_content', $post->post_content);
            } else {
                $content = apply_filters('the_content', $content);
            }
            if (empty($excerpt)) {
                $excerpt = get_the_excerpt($post->ID);
            }
        } else {
            // Use Thai content from default WordPress fields
            $title = get_the_title($post->ID);
            $content = apply_filters('the_content', $post->post_content);
            $excerpt = get_the_excerpt($post->ID);
        }

        // Get featured image
        $featured_image = null;
        if (has_post_thumbnail($post->ID)) {
            $featured_image_id = get_post_thumbnail_id($post->ID);
            $featured_image = array(
                'sourceUrl' => wp_get_attachment_image_url($featured_image_id, 'full'),
                'altText' => get_post_meta($featured_image_id, '_wp_attachment_image_alt', true),
                'caption' => wp_get_attachment_caption($featured_image_id),
            );
        }

        // Get author
        $author = get_the_author_meta('display_name', $post->post_author);

        // Get categories
        $categories = get_the_category($post->ID);
        $category_nodes = array_map(function($cat) {
            return array(
                'name' => $cat->name,
                'slug' => $cat->slug,
            );
        }, $categories);

        // Get tags
        $tags = get_the_tags($post->ID);
        $tag_nodes = array();
        if ($tags) {
            $tag_nodes = array_map(function($tag) {
                return array(
                    'name' => $tag->name,
                    'slug' => $tag->slug,
                );
            }, $tags);
        }

        return array(
            'id' => $post->ID,
            'databaseId' => $post->ID,
            'title' => $title,
            'slug' => $post->post_name,
            'content' => $content,
            'excerpt' => $excerpt,
            'date' => get_the_date('c', $post->ID),
            'featuredImage' => $featured_image ? array('node' => $featured_image) : null,
            'author' => array(
                'node' => array(
                    'name' => $author,
                )
            ),
            'categories' => array(
                'nodes' => $category_nodes,
            ),
            'tags' => array(
                'nodes' => $tag_nodes,
            ),
        );
    }
}

// Initialize
new Sakwood_Blog_REST_API();
