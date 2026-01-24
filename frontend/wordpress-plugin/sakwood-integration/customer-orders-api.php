<?php
/**
 * Customer Orders REST API
 *
 * REST API endpoints for fetching customer orders
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Customer_Orders_API {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get customer orders
        register_rest_route('sakwood/v1', '/customer/orders', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_customer_orders'),
            'permission_callback' => 'is_user_logged_in',
        ));

        // Get single order details
        register_rest_route('sakwood/v1', '/customer/orders/(?P<order_id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_order_details'),
            'permission_callback' => 'is_user_logged_in',
        ));
    }

    /**
     * Get customer orders
     */
    public function get_customer_orders($request) {
        $user_id = get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        // Get pagination parameters
        $page = isset($request['page']) ? max(1, intval($request['page'])) : 1;
        $per_page = isset($request['per_page']) ? max(1, min(100, intval($request['per_page']))) : 10;
        $status = isset($request['status']) ? sanitize_text_field($request['status']) : '';

        // Build args for getting orders
        $args = array(
            'customer_id' => $user_id,
            'limit' => $per_page,
            'page' => $page,
            'type' => 'shop_order',
        );

        // Filter by status if provided
        if (!empty($status)) {
            $args['status'] = $status;
        }

        // Get orders using WooCommerce function
        $orders = wc_get_orders($args);

        if (empty($orders)) {
            return array(
                'orders' => array(),
                'total' => 0,
                'page' => $page,
                'per_page' => $per_page,
            );
        }

        // Format orders for response
        $formatted_orders = array();
        foreach ($orders as $order) {
            $formatted_orders[] = $this->format_order_for_response($order);
        }

        // Get total count
        $args['limit'] = -1;
        $args['page'] = 1;
        $all_orders = wc_get_orders($args);
        $total = count($all_orders);

        return array(
            'orders' => $formatted_orders,
            'total' => $total,
            'page' => $page,
            'per_page' => $per_page,
            'total_pages' => ceil($total / $per_page),
        );
    }

    /**
     * Get order details
     */
    public function get_order_details($request) {
        $user_id = get_current_user_id();
        $order_id = intval($request['order_id']);

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        // Get order
        $order = wc_get_order($order_id);

        if (!$order) {
            return new WP_Error('order_not_found', 'Order not found', array('status' => 404));
        }

        // Verify order belongs to current user
        if ($order->get_customer_id() !== $user_id) {
            return new WP_Error('forbidden', 'You do not have permission to view this order', array('status' => 403));
        }

        return $this->format_order_details_for_response($order);
    }

    /**
     * Format order for list response
     */
    private function format_order_for_response($order) {
        return array(
            'id' => $order->get_id(),
            'order_key' => $order->get_order_key(),
            'status' => $order->get_status(),
            'date_created' => $order->get_date_created()->date('Y-m-d H:i:s'),
            'date_created_gmt' => $order->get_date_created()->date('Y-m-d H:i:s'),
            'currency' => $order->get_currency(),
            'total' => $order->get_total(),
            'total_formatted' => html_entity_decode($order->get_formatted_order_total()),
            'payment_method' => $order->get_payment_method(),
            'payment_method_title' => $order->get_payment_method_title(),
            'payment_status' => $this->get_payment_status($order),
            'shipping_total' => $order->get_shipping_total(),
            'shipping_total_formatted' => html_entity_decode(wc_price($order->get_shipping_total(), array('currency' => $order->get_currency()))),
            'discount_total' => $order->get_discount_total(),
            'discount_total_formatted' => html_entity_decode(wc_price($order->get_discount_total(), array('currency' => $order->get_currency()))),
            'items_count' => count($order->get_items()),
        );
    }

    /**
     * Format order details for full response
     */
    private function format_order_details_for_response($order) {
        $items = array();
        foreach ($order->get_items() as $item_id => $item) {
            $product = $item->get_product();

            $items[] = array(
                'id' => $item_id,
                'name' => $item->get_name(),
                'quantity' => $item->get_quantity(),
                'subtotal' => $item->get_subtotal(),
                'subtotal_formatted' => html_entity_decode($order->get_formatted_line_subtotal($item)),
                'total' => $item->get_total(),
                'total_formatted' => html_entity_decode($order->get_formatted_line_subtotal($item)),
                'product_id' => $item->get_product_id(),
                'variation_id' => $item->get_variation_id(),
                'product' => $product ? array(
                    'id' => $product->get_id(),
                    'name' => $product->get_name(),
                    'slug' => $product->get_slug(),
                    'image' => wp_get_attachment_image_url($product->get_image_id(), 'thumbnail'),
                ) : null,
            );
        }

        return array(
            'id' => $order->get_id(),
            'order_key' => $order->get_order_key(),
            'status' => $order->get_status(),
            'date_created' => $order->get_date_created()->date('Y-m-d H:i:s'),
            'date_created_gmt' => $order->get_date_created()->date('Y-m-d H:i:s'),
            'date_modified' => $order->get_date_modified()->date('Y-m-d H:i:s'),
            'currency' => $order->get_currency(),
            'total' => $order->get_total(),
            'total_formatted' => html_entity_decode($order->get_formatted_order_total()),
            'subtotal' => $order->get_subtotal(),
            'subtotal_formatted' => html_entity_decode(wc_price($order->get_subtotal(), array('currency' => $order->get_currency()))),
            'payment_method' => $order->get_payment_method(),
            'payment_method_title' => $order->get_payment_method_title(),
            'payment_status' => $this->get_payment_status($order),
            'shipping_total' => $order->get_shipping_total(),
            'shipping_total_formatted' => html_entity_decode(wc_price($order->get_shipping_total(), array('currency' => $order->get_currency()))),
            'discount_total' => $order->get_discount_total(),
            'discount_total_formatted' => html_entity_decode(wc_price($order->get_discount_total(), array('currency' => $order->get_currency()))),
            'customer_note' => $order->get_customer_note(),
            'items' => $items,
            'billing' => array(
                'first_name' => $order->get_billing_first_name(),
                'last_name' => $order->get_billing_last_name(),
                'company' => $order->get_billing_company(),
                'address_1' => $order->get_billing_address_1(),
                'address_2' => $order->get_billing_address_2(),
                'city' => $order->get_billing_city(),
                'state' => $order->get_billing_state(),
                'postcode' => $order->get_billing_postcode(),
                'country' => $order->get_billing_country(),
                'email' => $order->get_billing_email(),
                'phone' => $order->get_billing_phone(),
            ),
            'shipping' => array(
                'first_name' => $order->get_shipping_first_name(),
                'last_name' => $order->get_shipping_last_name(),
                'company' => $order->get_shipping_company(),
                'address_1' => $order->get_shipping_address_1(),
                'address_2' => $order->get_shipping_address_2(),
                'city' => $order->get_shipping_city(),
                'state' => $order->get_shipping_state(),
                'postcode' => $order->get_shipping_postcode(),
                'country' => $order->get_shipping_country(),
            ),
            'shipping_lines' => $this->format_shipping_lines($order),
        );
    }

    /**
     * Get payment status
     */
    private function get_payment_status($order) {
        if ($order->is_paid()) {
            return 'paid';
        } elseif ($order->get_status() === 'pending') {
            return 'pending';
        } else {
            return 'unpaid';
        }
    }

    /**
     * Format shipping lines
     */
    private function format_shipping_lines($order) {
        $lines = array();
        foreach ($order->get_shipping_methods() as $method) {
            $lines[] = array(
                'id' => $method->get_id(),
                'method_id' => $method->get_method_id(),
                'instance_id' => $method->get_instance_id(),
                'title' => $method->get_title(),
                'total' => $method->get_total(),
                'total_formatted' => html_entity_decode(wc_price($method->get_total(), array('currency' => $order->get_currency()))),
            );
        }
        return $lines;
    }
}

// Initialize API
new Sakwood_Customer_Orders_API();
