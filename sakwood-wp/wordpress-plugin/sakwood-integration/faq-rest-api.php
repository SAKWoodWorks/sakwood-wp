<?php
/**
 * FAQ REST API
 *
 * Custom REST API endpoints for FAQ items with language support
 * Thai content from default fields, English from meta fields
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_FAQ_REST_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get all FAQs with language filter
        register_rest_route('sakwood/v1', '/faqs', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_faqs'),
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
                'per_page' => array(
                    'default' => 50,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ),
                'featured_only' => array(
                    'required' => false,
                    'sanitize_callback' => 'rest_sanitize_boolean',
                ),
            ),
        ));

        // Get single FAQ by slug with language filter
        register_rest_route('sakwood/v1', '/faqs/(?P<slug>[^/]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_faq_by_slug'),
            'permission_callback' => '__return_true',
            'args' => array(
                'slug' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));

        // Get FAQ categories
        register_rest_route('sakwood/v1', '/faq-categories', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_faq_categories'),
            'permission_callback' => '__return_true',
            'args' => array(
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));

        // Search FAQs
        register_rest_route('sakwood/v1', '/faqs/search', array(
            'methods' => 'GET',
            'callback' => array($this, 'search_faqs'),
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
    }

    /**
     * Get FAQs with language filtering
     */
    public function get_faqs($request) {
        $language = $request->get_param('language');
        $category = $request->get_param('category');
        $per_page = $request->get_param('per_page');
        $page = $request->get_param('page');
        $featured_only = $request->get_param('featured_only');

        // Build query args
        $args = array(
            'post_type' => 'faq',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'orderby' => 'menu_order',
            'order' => 'ASC',
        );

        // Filter by category
        if (!empty($category)) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'faq_category',
                    'field' => 'slug',
                    'terms' => $category,
                ),
            );
        }

        // Filter by featured only
        if ($featured_only) {
            $args['meta_query'] = array(
                array(
                    'key' => '_faq_featured',
                    'value' => '1',
                    'compare' => '=',
                ),
            );
        }

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_faqs = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_faqs[] = $this->format_faq($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_faqs);
    }

    /**
     * Get single FAQ by slug with language filtering
     */
    public function get_faq_by_slug($request) {
        $slug = $request->get_param('slug');
        $language = $request->get_param('language');

        // Get FAQ by slug
        $posts = get_posts(array(
            'name' => $slug,
            'post_type' => 'faq',
            'post_status' => 'publish',
            'numberposts' => 1,
        ));

        if (empty($posts)) {
            return new WP_Error('faq_not_found', __('FAQ not found', 'sakwood'), array('status' => 404));
        }

        $post = $posts[0];

        // Return the FAQ with appropriate language content
        return rest_ensure_response($this->format_faq($post, $language));
    }

    /**
     * Get FAQ categories
     */
    public function get_faq_categories($request) {
        $language = $request->get_param('language');

        // Get all FAQ categories
        $categories = get_terms(array(
            'taxonomy' => 'faq_category',
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
     * Search FAQs
     */
    public function search_faqs($request) {
        $query = $request->get_param('q');
        $language = $request->get_param('language');
        $category = $request->get_param('category');

        // Build query args
        $args = array(
            'post_type' => 'faq',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            's' => $query,
            'orderby' => 'menu_order',
            'order' => 'ASC',
        );

        // Filter by category
        if (!empty($category)) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'faq_category',
                    'field' => 'slug',
                    'terms' => $category,
                ),
            );
        }

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_faqs = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_faqs[] = $this->format_faq($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_faqs);
    }

    /**
     * Format FAQ data for API response based on language
     */
    private function format_faq($post, $language = 'th') {
        // Get language-specific content
        if ($language === 'en') {
            // Try to get English content from meta fields
            $title = get_post_meta($post->ID, '_faq_title_en', true);
            $content = get_post_meta($post->ID, '_faq_content_en', true);

            // Fall back to Thai content if English translation is missing
            if (empty($title)) {
                $title = get_the_title($post->ID);
            }
            if (empty($content)) {
                $content = apply_filters('the_content', $post->post_content);
            } else {
                $content = apply_filters('the_content', $content);
            }
        } else {
            // Use Thai content from default WordPress fields
            $title = get_the_title($post->ID);
            $content = apply_filters('the_content', $post->post_content);
        }

        // Get FAQ category
        $category = null;
        $categories = get_the_terms($post->ID, 'faq_category');
        if ($categories && !is_wp_error($categories)) {
            $category = array(
                'id' => $categories[0]->term_id,
                'name' => $categories[0]->name,
                'slug' => $categories[0]->slug,
            );
        }

        // Get meta fields
        $order = get_post_meta($post->ID, '_faq_order', true) ?: 0;
        $featured = (bool) get_post_meta($post->ID, '_faq_featured', true);
        $display_on_homepage = (bool) get_post_meta($post->ID, '_faq_display_on_homepage', true);

        return array(
            'id' => $post->ID,
            'question' => $title,
            'answer' => $content,
            'category' => $category,
            'order' => $order,
            'featured' => $featured,
            'displayOnHomepage' => $display_on_homepage,
            'language' => $language,
        );
    }
}

// Initialize
new Sakwood_FAQ_REST_API();
