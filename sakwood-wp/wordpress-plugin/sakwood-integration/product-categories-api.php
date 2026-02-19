<?php
/**
 * Product Categories API
 *
 * Provides category list for the frontend
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_Categories_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('sakwood/v1', '/categories', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_categories'),
            'permission_callback' => '__return_true',
        ));
    }

    public function get_categories($request) {
        $language = $request->get_param('language');

        $categories = get_terms(array(
            'taxonomy' => 'product_cat',
            'hide_empty' => false,
            'orderby' => 'name',
            'order' => 'ASC',
            'exclude' => array(15), // Exclude "Uncategorized"
        ));

        $result = array();

        foreach ($categories as $category) {
            // Get English name from term_meta if available
            $name_en = get_term_meta($category->term_id, 'category_name_en', true);
            $name_th = $category->name;

            // Use English name if language parameter is 'en' and English translation exists
            $display_name = ($language === 'en' && !empty($name_en)) ? $name_en : $name_th;

            $result[] = array(
                'id' => $category->term_id,
                'name' => $display_name,
                'slug' => $category->slug,
                'count' => $category->count,
                'name_th' => $name_th,
                'name_en' => $name_en,
            );
        }

        return $result;
    }
}

// Initialize the categories API
new Sakwood_Product_Categories_API();
