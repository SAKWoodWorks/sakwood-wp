<?php
/**
 * Product Update API for Sakwood Dashboard
 *
 * Provides REST endpoint for updating product prices from the dashboard
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_Update_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        // Update product endpoint
        register_rest_route('sakwood/v1', '/products/(?P<id>[a-zA-Z0-9_-]+)', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_product'),
            'permission_callback' => '__return_true', // Temporary: Allow for testing
            'args' => array(
                'regular_price' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'sale_price' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'stock_status' => array(
                    'required' => false,
                    'validate_callback' => function($param) {
                        return in_array($param, array('instock', 'outofstock', 'onbackorder'));
                    },
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));
    }

    public function check_permissions() {
        // Check if user has permission to manage products
        return current_user_can('edit_posts');
    }

    public function update_product($request) {
        $product_id = $request->get_param('id');
        $params = $request->get_params();

        // Log for debugging
        error_log('Sakwood Product Update: ID = ' . $product_id);
        error_log('Sakwood Product Update: Params = ' . print_r($params, true));

        // Get product by slug (since we're using slug in the URL)
        $product = wc_get_product($product_id);

        if (!$product) {
            error_log('Sakwood Product Update: Product not found for ID = ' . $product_id);
            return new WP_Error(
                'product_not_found',
                'Product not found',
                array('status' => 404)
            );
        }

        error_log('Sakwood Product Update: Product found = ' . $product->get_name());

        // Update regular price
        if (isset($params['regular_price'])) {
            $product->set_regular_price($params['regular_price']);
        }

        // Update sale price
        if (isset($params['sale_price'])) {
            $sale_price = $params['sale_price'];

            // If sale price is empty, remove it
            if (empty($sale_price) || $sale_price === '') {
                $product->set_sale_price('');
            } else {
                $product->set_sale_price($sale_price);
            }
        }

        // Update stock status
        if (isset($params['stock_status'])) {
            $product->set_stock_status($params['stock_status']);
        }

        // Save the product
        $result = $product->save();

        error_log('Sakwood Product Update: Save result = ' . print_r($result, true));

        // Clear product transients
        wc_delete_product_transients($product->get_id());

        error_log('Sakwood Product Update: Product updated successfully');

        // Get updated product data
        $updated_product = array(
            'id' => $product->get_id(),
            'databaseId' => $product->get_id(),
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'price' => $product->get_price(),
            'regularPrice' => $product->get_regular_price(),
            'stockStatus' => $product->get_stock_status(),
        );

        return rest_ensure_response($updated_product);
    }
}

// Initialize
new Sakwood_Product_Update_API();
