<?php
/**
 * Register Knowledge Base Taxonomy
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Knowledge_Base_Taxonomy {

    public function __construct() {
        add_action('init', array($this, 'register_taxonomy'));
    }

    /**
     * Register Knowledge Base Category Taxonomy
     */
    public function register_taxonomy() {
        $labels = array(
            'name'              => __('KB Categories', 'sakwood'),
            'singular_name'     => __('KB Category', 'sakwood'),
            'search_items'      => __('Search Categories', 'sakwood'),
            'all_items'         => __('All Categories', 'sakwood'),
            'parent_item'       => __('Parent Category', 'sakwood'),
            'parent_item_colon' => __('Parent Category:', 'sakwood'),
            'edit_item'         => __('Edit Category', 'sakwood'),
            'update_item'       => __('Update Category', 'sakwood'),
            'add_new_item'      => __('Add New Category', 'sakwood'),
            'new_item_name'     => __('New Category Name', 'sakwood'),
            'menu_name'         => __('Categories', 'sakwood'),
        );

        $args = array(
            'labels'            => $labels,
            'hierarchical'      => true,
            'public'            => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_rest'      => true,
            'show_in_graphql'   => true,
            'rewrite'           => array('slug' => 'knowledge-category'),
        );

        register_taxonomy('kb_category', array('knowledge_base'), $args);
    }
}

// Initialize
new Sakwood_Knowledge_Base_Taxonomy();
