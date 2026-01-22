<?php
/**
 * Blog Language Translation Meta Fields
 *
 * Adds meta fields for English translations of blog posts
 * Thai content is stored in default WordPress fields, English in meta fields
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Blog_Language_Translation {

    /**
     * Constructor
     */
    public function __construct() {
        // Display language indicator on post list
        add_filter('manage_post_posts_columns', array($this, 'add_language_column'));
        add_action('manage_post_posts_custom_column', array($this, 'display_language_column'), 10, 2);
    }

    /**
     * Add language column to posts list
     */
    public function add_language_column($columns) {
        $columns['post_language'] = __('Languages', 'sakwood-integration');
        return $columns;
    }

    /**
     * Display language column content
     */
    public function display_language_column($column, $post_id) {
        if ($column === 'post_language') {
            $post = get_post($post_id);
            $has_th = !empty($post->post_title);
            $has_en = get_post_meta($post_id, '_post_title_en', true);

            $languages = array();
            if ($has_th) $languages[] = '<span style="color:#2271b1">🇹🇭 TH</span>';
            if ($has_en) $languages[] = '<span style="color:#2271b1">🇬🇧 EN</span>';

            if (!empty($languages)) {
                echo implode(' | ', $languages);
            } else {
                echo '<em>' . __('No languages', 'sakwood-integration') . '</em>';
            }
        }
    }
}

// Initialize
new Sakwood_Blog_Language_Translation();
