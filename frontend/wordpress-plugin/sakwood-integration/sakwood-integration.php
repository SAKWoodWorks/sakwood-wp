<?php
/**
 * Plugin Name: Sakwood Integration
 * Plugin URI: https://sakwood.com
 * Description: Custom integration for Sakwood - handles orders, quotes, and custom post types
 * Version: 1.0.0
 * Author: Sakwood
 * Text Domain: sakwood
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SAKWOOD_VERSION', '1.0.0');
define('SAKWOOD_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SAKWOOD_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main Plugin Class
 */
class Sakwood_Integration {

    public function __construct() {
        // Initialize hooks
        add_action('init', array($this, 'register_custom_post_types'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }

    /**
     * Register Custom Post Types
     */
    public function register_custom_post_types() {
        // Register Quotes Post Type
        register_post_type('sakwood_quote', array(
            'labels' => array(
                'name' => __('Quotes', 'sakwood'),
                'singular_name' => __('Quote', 'sakwood'),
                'menu_name' => __('Quotes', 'sakwood'),
                'add_new' => __('Add New', 'sakwood'),
                'add_new_item' => __('Add New Quote', 'sakwood'),
                'edit_item' => __('Edit Quote', 'sakwood'),
                'new_item' => __('New Quote', 'sakwood'),
                'view_item' => __('View Quote', 'sakwood'),
                'search_items' => __('Search Quotes', 'sakwood'),
                'not_found' => __('No quotes found', 'sakwood'),
                'not_found_in_trash' => __('No quotes found in trash', 'sakwood'),
            ),
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 20,
            'menu_icon' => 'dashicons-format-aside',
            'supports' => array('title', 'editor'),
            'has_archive' => true,
            'rewrite' => array('slug' => 'quotes'),
            'show_in_rest' => true,
        ));

        // Register Orders Post Type
        register_post_type('sakwood_order', array(
            'labels' => array(
                'name' => __('Orders', 'sakwood'),
                'singular_name' => __('Order', 'sakwood'),
                'menu_name' => __('Orders', 'sakwood'),
                'add_new' => __('Add New', 'sakwood'),
                'add_new_item' => __('Add New Order', 'sakwood'),
                'edit_item' => __('Edit Order', 'sakwood'),
                'new_item' => __('New Order', 'sakwood'),
                'view_item' => __('View Order', 'sakwood'),
                'search_items' => __('Search Orders', 'sakwood'),
                'not_found' => __('No orders found', 'sakwood'),
                'not_found_in_trash' => __('No orders found in trash', 'sakwood'),
            ),
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 21,
            'menu_icon' => 'dashicons-cart',
            'supports' => array('title', 'editor'),
            'has_archive' => true,
            'rewrite' => array('slug' => 'orders'),
            'show_in_rest' => true,
        ));
    }

    /**
     * Register REST API Routes
     */
    public function register_rest_routes() {
        // Quote submission endpoint
        register_rest_route('sakwood/v1', '/quotes', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_quote_submission'),
            'permission_callback' => '__return_true',
        ));

        // Quote listing endpoint
        register_rest_route('sakwood/v1', '/quotes', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_quotes'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ));

        // Order submission endpoint
        register_rest_route('sakwood/v1', '/orders', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_order_submission'),
            'permission_callback' => '__return_true',
        ));

        // Order listing endpoint
        register_rest_route('sakwood/v1', '/orders', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_orders'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ));
    }

    /**
     * Handle Quote Submission
     */
    public function handle_quote_submission($request) {
        $params = $request->get_json_params();

        // Validate required fields
        if (empty($params['customer']['firstName']) || empty($params['customer']['lastName']) || 
            empty($params['customer']['email']) || empty($params['customer']['phone'])) {
            return new WP_Error('missing_fields', 'Please fill in all required fields', array('status' => 400));
        }

        // Create quote post
        $quote_id = wp_insert_post(array(
            'post_title' => sprintf('Quote %s', $params['id'] ?? uniqid()),
            'post_type' => 'sakwood_quote',
            'post_status' => 'publish',
            'post_content' => wp_json_encode($params),
        ));

        if (is_wp_error($quote_id)) {
            return $quote_id;
        }

        // Store quote data as post meta
        update_post_meta($quote_id, '_quote_id', $params['id'] ?? '');
        update_post_meta($quote_id, '_quote_date', $params['date'] ?? '');
        update_post_meta($quote_id, '_quote_status', $params['status'] ?? 'pending');
        update_post_meta($quote_id, '_customer_data', $params['customer'] ?? array());
        update_post_meta($quote_id, '_project_data', $params['project'] ?? array());
        update_post_meta($quote_id, '_products_data', $params['products'] ?? array());
        update_post_meta($quote_id, '_additional_notes', $params['additionalNotes'] ?? '');

        return new WP_REST_Response(array(
            'success' => true,
            'quote_id' => $quote_id,
            'message' => 'Quote submitted successfully',
        ), 201);
    }

    /**
     * Get Quotes
     */
    public function get_quotes($request) {
        $args = array(
            'post_type' => 'sakwood_quote',
            'posts_per_page' => -1,
            'orderby' => 'date',
            'order' => 'DESC',
        );

        $quotes = get_posts($args);
        $data = array();

        foreach ($quotes as $quote) {
            $data[] = array(
                'id' => $quote->ID,
                'title' => $quote->post_title,
                'date' => $quote->post_date,
                'quote_id' => get_post_meta($quote->ID, '_quote_id', true),
                'quote_date' => get_post_meta($quote->ID, '_quote_date', true),
                'status' => get_post_meta($quote->ID, '_quote_status', true),
                'customer' => get_post_meta($quote->ID, '_customer_data', true),
                'project' => get_post_meta($quote->ID, '_project_data', true),
                'products' => get_post_meta($quote->ID, '_products_data', true),
                'notes' => get_post_meta($quote->ID, '_additional_notes', true),
            );
        }

        return new WP_REST_Response($data, 200);
    }

    /**
     * Handle Order Submission
     */
    public function handle_order_submission($request) {
        $params = $request->get_json_params();

        // Validate required fields
        if (empty($params['customer']) || empty($params['products'])) {
            return new WP_Error('missing_fields', 'Please fill in all required fields', array('status' => 400));
        }

        // Create order post
        $order_id = wp_insert_post(array(
            'post_title' => sprintf('Order %s', $params['id'] ?? uniqid()),
            'post_type' => 'sakwood_order',
            'post_status' => 'publish',
            'post_content' => wp_json_encode($params),
        ));

        if (is_wp_error($order_id)) {
            return $order_id;
        }

        // Store order data as post meta
        update_post_meta($order_id, '_order_id', $params['id'] ?? '');
        update_post_meta($order_id, '_order_date', $params['date'] ?? '');
        update_post_meta($order_id, '_order_status', $params['status'] ?? 'pending');
        update_post_meta($order_id, '_customer_data', $params['customer'] ?? array());
        update_post_meta($order_id, '_shipping_data', $params['shipping'] ?? array());
        update_post_meta($order_id, '_products_data', $params['products'] ?? array());
        update_post_meta($order_id, '_payment_method', $params['paymentMethod'] ?? '');
        update_post_meta($order_id, '_total_amount', $params['totalAmount'] ?? 0);

        return new WP_REST_Response(array(
            'success' => true,
            'order_id' => $order_id,
            'message' => 'Order submitted successfully',
        ), 201);
    }

    /**
     * Get Orders
     */
    public function get_orders($request) {
        $args = array(
            'post_type' => 'sakwood_order',
            'posts_per_page' => -1,
            'orderby' => 'date',
            'order' => 'DESC',
        );

        $orders = get_posts($args);
        $data = array();

        foreach ($orders as $order) {
            $data[] = array(
                'id' => $order->ID,
                'title' => $order->post_title,
                'date' => $order->post_date,
                'order_id' => get_post_meta($order->ID, '_order_id', true),
                'order_date' => get_post_meta($order->ID, '_order_date', true),
                'status' => get_post_meta($order->ID, '_order_status', true),
                'customer' => get_post_meta($order->ID, '_customer_data', true),
                'shipping' => get_post_meta($order->ID, '_shipping_data', true),
                'products' => get_post_meta($order->ID, '_products_data', true),
                'payment_method' => get_post_meta($order->ID, '_payment_method', true),
                'total_amount' => get_post_meta($order->ID, '_total_amount', true),
            );
        }

        return new WP_REST_Response($data, 200);
    }

    /**
     * Add Admin Menu
     */
    public function add_admin_menu() {
        // Quotes page
        add_menu_page(
            'Sakwood Quotes',
            'Sakwood Quotes',
            'manage_options',
            'sakwood-quotes',
            array($this, 'render_quotes_page'),
            'dashicons-format-aside',
            25
        );

        // Orders page
        add_submenu_page(
            'sakwood-quotes',
            'Sakwood Orders',
            'Sakwood Orders',
            'manage_options',
            'sakwood-orders',
            array($this, 'render_orders_page')
        );
    }

    /**
     * Render Quotes Page
     */
    public function render_quotes_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('Sakwood Quotes', 'sakwood'); ?></h1>
            <div id="sakwood-quotes-app"></div>
        </div>
        <?php
    }

    /**
     * Render Orders Page
     */
    public function render_orders_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('Sakwood Orders', 'sakwood'); ?></h1>
            <div id="sakwood-orders-app"></div>
        </div>
        <?php
    }

    /**
     * Enqueue Admin Scripts
     */
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'sakwood') === false) {
            return;
        }

        wp_enqueue_style(
            'sakwood-admin',
            SAKWOOD_PLUGIN_URL . 'admin/css/admin.css',
            array(),
            SAKWOOD_VERSION
        );

        wp_enqueue_script(
            'sakwood-admin',
            SAKWOOD_PLUGIN_URL . 'admin/js/admin.js',
            array('wp-api'),
            SAKWOOD_VERSION,
            true
        );

        wp_localize_script('sakwood-admin', 'sakwoodAdmin', array(
            'restUrl' => rest_url('sakwood/v1'),
            'nonce' => wp_create_nonce('wp_rest'),
        ));
    }
}

// Initialize the plugin
new Sakwood_Integration();
