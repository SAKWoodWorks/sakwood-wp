<?php
/**
 * Register Product Dimension Fields
 *
 * Registers custom meta fields for WooCommerce products in WordPress and GraphQL
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_Dimensions {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'register_meta_fields'));
        add_action('rest_api_init', array($this, 'register_rest_fields'));
        add_filter('graphql_register_types', array($this, 'register_graphql_fields'));
    }

    /**
     * Register Meta Fields
     */
    public function register_meta_fields() {
        $dimension_fields = array(
            '_product_width' => 'Width (mm)',
            '_product_length' => 'Length (mm)',
            '_product_thickness' => 'Thickness (mm)',
            '_product_volume' => 'Volume (m³)',
        );

        foreach ($dimension_fields as $key => $label) {
            register_post_meta('product', $key, array(
                'type'              => 'string',
                'description'       => $label,
                'single'            => true,
                'show_in_rest'      => true,
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback'     => function() {
                    return current_user_can('edit_posts');
                },
            ));

            // Also register for product variations
            register_post_meta('product_variation', $key, array(
                'type'              => 'string',
                'description'       => $label,
                'single'            => true,
                'show_in_rest'      => true,
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback'     => function() {
                    return current_user_can('edit_posts');
                },
            ));
        }
    }

    /**
     * Register REST API Fields
     */
    public function register_rest_fields() {
        $fields = array(
            'product_width' => '_product_width',
            'product_length' => '_product_length',
            'product_thickness' => '_product_thickness',
            'product_volume' => '_product_volume',
        );

        foreach ($fields as $rest_key => $meta_key) {
            register_rest_field('product', $rest_key, array(
                'get_callback' => function($post) use ($meta_key) {
                    return get_post_meta($post['id'], $meta_key, true);
                },
                'update_callback' => function($value, $post) use ($meta_key) {
                    update_post_meta($post->ID, $meta_key, $value);
                },
            ));
        }
    }

    /**
     * Register GraphQL Fields
     */
    public function register_graphql_fields($type_registry) {
        // Register on Product interface (affects all product types)
        $dimension_fields = array(
            'width' => '_product_width',
            'length' => '_product_length',
            'thickness' => '_product_thickness',
            'volume' => '_product_volume',
        );

        foreach ($dimension_fields as $field_name => $meta_key) {
            register_graphql_field('Product', $field_name, array(
                'type'        => 'String',
                'description' => ucfirst($field_name) . ' of the product',
                'resolve'     => function($product) use ($meta_key) {
                    return get_post_meta($product->ID, $meta_key, true);
                },
            ));

            // Also register for SimpleProduct specifically
            register_graphql_field('SimpleProduct', $field_name, array(
                'type'        => 'String',
                'description' => ucfirst($field_name) . ' of the simple product',
                'resolve'     => function($product) use ($meta_key) {
                    return get_post_meta($product->ID, $meta_key, true);
                },
            ));

            // Also register for VariableProduct
            register_graphql_field('VariableProduct', $field_name, array(
                'type'        => 'String',
                'description' => ucfirst($field_name) . ' of the variable product',
                'resolve'     => function($product) use ($meta_key) {
                    return get_post_meta($product->ID, $meta_key, true);
                },
            ));
        }
    }
}

// Initialize
new Sakwood_Product_Dimensions();
