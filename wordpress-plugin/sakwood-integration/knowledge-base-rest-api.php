<?php
/**
 * Knowledge Base REST API
 *
 * Custom REST API endpoints for knowledge base with language support
 * Thai content from default fields, English from meta fields
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Knowledge_Base_REST_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Sanitize slug without removing Thai characters
     */
    public function sanitize_slug_preserve_thai($slug) {
        return urldecode($slug);
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get all articles with language filter
        register_rest_route('sakwood/v1', '/knowledge', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_articles'),
            'permission_callback' => '__return_true',
            'args' => array(
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'category' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'difficulty' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'featured_only' => array(
                    'required' => false,
                    'sanitize_callback' => 'rest_sanitize_boolean',
                ),
                'per_page' => array(
                    'default' => 20,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // Get single article by slug with language filter
        register_rest_route('sakwood/v1', '/knowledge/(?P<slug>[^/]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_article_by_slug'),
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

        // Get knowledge base categories
        register_rest_route('sakwood/v1', '/knowledge-categories', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_categories'),
            'permission_callback' => '__return_true',
        ));

        // Search articles
        register_rest_route('sakwood/v1', '/knowledge/search', array(
            'methods' => 'GET',
            'callback' => array($this, 'search_articles'),
            'permission_callback' => '__return_true',
            'args' => array(
                'q' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'category' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));

        // Get featured articles
        register_rest_route('sakwood/v1', '/knowledge/featured', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_featured_articles'),
            'permission_callback' => '__return_true',
            'args' => array(
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'per_page' => array(
                    'default' => 5,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));
    }

    /**
     * Get articles with language filtering
     */
    public function get_articles($request) {
        $language = $request->get_param('language');
        $category = $request->get_param('category');
        $difficulty = $request->get_param('difficulty');
        $featured_only = $request->get_param('featured_only');
        $per_page = $request->get_param('per_page');
        $page = $request->get_param('page');

        // Build query args
        $args = array(
            'post_type' => 'knowledge_base',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'orderby' => 'meta_value_num',
            'meta_key' => '_kb_order',
            'order' => 'ASC',
        );

        // Build meta query
        $meta_query = array('relation' => 'AND');

        // Filter by featured only
        if ($featured_only) {
            $meta_query[] = array(
                'key' => '_kb_is_featured',
                'value' => '1',
                'compare' => '=',
            );
        }

        // Filter by difficulty
        if (!empty($difficulty)) {
            $meta_query[] = array(
                'key' => '_kb_difficulty',
                'value' => $difficulty,
                'compare' => '=',
            );
        }

        if (count($meta_query) > 1) {
            $args['meta_query'] = $meta_query;
        }

        // Filter by category
        if (!empty($category)) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'kb_category',
                    'field' => 'slug',
                    'terms' => $category,
                ),
            );
        }

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_articles = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_articles[] = $this->format_article($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_articles);
    }

    /**
     * Get single article by slug with language filtering
     */
    public function get_article_by_slug($request) {
        $slug = $request->get_param('slug');
        $language = $request->get_param('language');

        // Get article by slug
        $posts = get_posts(array(
            'name' => $slug,
            'post_type' => 'knowledge_base',
            'post_status' => 'publish',
            'numberposts' => 1,
        ));

        if (empty($posts)) {
            return new WP_Error('article_not_found', __('Article not found', 'sakwood'), array('status' => 404));
        }

        $post = $posts[0];

        // Increment view count
        $view_count = get_post_meta($post->ID, '_kb_views_count', true) ?: 0;
        update_post_meta($post->ID, '_kb_views_count', $view_count + 1);

        // Return the article with appropriate language content
        return rest_ensure_response($this->format_article($post, $language, true));
    }

    /**
     * Get knowledge base categories
     */
    public function get_categories($request) {
        $categories = get_terms(array(
            'taxonomy' => 'kb_category',
            'hide_empty' => false,
            'orderby' => 'name',
            'order' => 'ASC',
        ));

        if (is_wp_error($categories)) {
            return rest_ensure_response(array());
        }

        $formatted_categories = array_map(function($cat) {
            return array(
                'id' => $cat->term_id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'count' => $cat->count,
                'parent' => $cat->parent,
            );
        }, $categories);

        return rest_ensure_response($formatted_categories);
    }

    /**
     * Search articles
     */
    public function search_articles($request) {
        $query = $request->get_param('q');
        $language = $request->get_param('language');
        $category = $request->get_param('category');

        // Build query args
        $args = array(
            'post_type' => 'knowledge_base',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            's' => $query,
            'orderby' => 'meta_value_num',
            'meta_key' => '_kb_order',
            'order' => 'ASC',
        );

        // Filter by category
        if (!empty($category)) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'kb_category',
                    'field' => 'slug',
                    'terms' => $category,
                ),
            );
        }

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_articles = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_articles[] = $this->format_article($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_articles);
    }

    /**
     * Get featured articles
     */
    public function get_featured_articles($request) {
        $language = $request->get_param('language');
        $per_page = $request->get_param('per_page');

        $args = array(
            'post_type' => 'knowledge_base',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'meta_query' => array(
                array(
                    'key' => '_kb_is_featured',
                    'value' => '1',
                    'compare' => '=',
                ),
            ),
            'orderby' => 'meta_value_num',
            'meta_key' => '_kb_order',
            'order' => 'ASC',
        );

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_articles = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_articles[] = $this->format_article($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_articles);
    }

    /**
     * Format article data for API response based on language
     */
    private function format_article($post, $language = 'th', $full_content = false) {
        // Get language-specific content
        if ($language === 'en') {
            // Try to get English content from meta fields
            $title = get_post_meta($post->ID, '_kb_title_en', true);
            $content = get_post_meta($post->ID, '_kb_content_en', true);
            $excerpt = get_post_meta($post->ID, '_kb_excerpt_en', true);

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
            );
        }

        // Get category
        $category = null;
        $categories = get_the_terms($post->ID, 'kb_category');
        if ($categories && !is_wp_error($categories)) {
            $category = array(
                'id' => $categories[0]->term_id,
                'name' => $categories[0]->name,
                'slug' => $categories[0]->slug,
            );
        }

        // Get author
        $author = get_the_author_meta('display_name', $post->post_author);

        // Get meta fields
        $order = get_post_meta($post->ID, '_kb_order', true) ?: 0;
        $difficulty = get_post_meta($post->ID, '_kb_difficulty', true) ?: 'beginner';
        $last_updated = get_post_meta($post->ID, '_kb_last_updated', true);
        $related_ids = get_post_meta($post->ID, '_kb_related_articles', true);
        $views_count = get_post_meta($post->ID, '_kb_views_count', true) ?: 0;
        $is_featured = (bool) get_post_meta($post->ID, '_kb_is_featured', true);

        // Parse related articles
        $related_articles = array();
        if ($related_ids) {
            $ids = array_map('intval', explode(',', $related_ids));
            $related_posts = get_posts(array(
                'post_type' => 'knowledge_base',
                'post__in' => $ids,
                'posts_per_page' => -1,
            ));

            foreach ($related_posts as $related_post) {
                $related_articles[] = array(
                    'id' => $related_post->ID,
                    'title' => get_the_title($related_post->ID),
                    'slug' => $related_post->post_name,
                );
            }
        }

        return array(
            'id' => $post->ID,
            'databaseId' => $post->ID,
            'title' => $title,
            'slug' => $post->post_name,
            'content' => $content,
            'excerpt' => $excerpt,
            'date' => get_the_date('c', $post->ID),
            'lastUpdated' => $last_updated,
            'featuredImage' => $featured_image ? array('node' => $featured_image) : null,
            'author' => array(
                'node' => array(
                    'name' => $author,
                )
            ),
            'category' => $category,
            'order' => (int) $order,
            'difficulty' => $difficulty,
            'viewsCount' => (int) $views_count,
            'isFeatured' => $is_featured,
            'relatedArticles' => $related_articles,
            'language' => $language,
        );
    }
}

// Initialize
new Sakwood_Knowledge_Base_REST_API();
