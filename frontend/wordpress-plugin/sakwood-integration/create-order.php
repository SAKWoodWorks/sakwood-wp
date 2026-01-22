<?php
/**
 * REST API endpoint for creating orders
 */

add_action('rest_api_init', function () {
    register_rest_route('sakwood/v1', '/create-order', [
        'methods' => 'POST',
        'callback' => 'sakwood_create_order',
        'permission_callback' => '__return_true',
    ]);
});

/**
 * Create WooCommerce order
 */
function sakwood_create_order($request) {
    $params = $request->get_json_params();
    
    // Log the request
    error_log('Sakwood: Creating order with params: ' . json_encode($params));
    
    // Validate required fields
    if (empty($params['billing']['email']) || empty($params['billing']['first_name'])) {
        return new WP_Error(
            'missing_fields',
            'Missing required fields',
            ['status' => 400]
        );
    }
    
    // Create order using WooCommerce function
    $order = wc_create_order([
        'status' => apply_filters('woocommerce_default_order_status', 'pending'),
        'customer_id' => 0, // Guest order
    ]);
    
    if (is_wp_error($order)) {
        error_log('Sakwood: Error creating order: ' . $order->get_error_message());
        return $order;
    }
    
    // Set billing address
    $order->set_billing_first_name($params['billing']['first_name']);
    $order->set_billing_last_name($params['billing']['last_name']);
    $order->set_billing_email($params['billing']['email']);
    $order->set_billing_phone($params['billing']['phone']);
    $order->set_billing_address_1($params['billing']['address_1']);
    $order->set_billing_city($params['billing']['city']);
    $order->set_billing_state($params['billing']['state']);
    $order->set_billing_postcode($params['billing']['postcode']);
    
    // Set shipping address
    $order->set_shipping_first_name($params['shipping']['first_name']);
    $order->set_shipping_last_name($params['shipping']['last_name']);
    $order->set_shipping_address_1($params['shipping']['address_1']);
    $order->set_shipping_city($params['shipping']['city']);
    $order->set_shipping_state($params['shipping']['state']);
    $order->set_shipping_postcode($params['shipping']['postcode']);
    
    // Set payment method
    $order->set_payment_method($params['payment_method']);
    $order->set_payment_method_title($params['payment_method_title']);
    
    // Add line items
    if (!empty($params['line_items'])) {
        foreach ($params['line_items'] as $item) {
            $product_id = intval($item['product_id']);
            $quantity = intval($item['quantity']);

            // Get the product to ensure it exists
            $product = wc_get_product($product_id);

            if (!$product) {
                error_log('Sakwood: Product not found: ' . $product_id);
                continue; // Skip this item if product doesn't exist
            }

            // Add product to order - WooCommerce will automatically fetch name and other data
            $order->add_product($product, $quantity);

            error_log('Sakwood: Added product to order: ' . $product->get_name() . ' (ID: ' . $product_id . ')');
        }
    }
    
    // Add shipping line
    if (!empty($params['shipping_lines'])) {
        foreach ($params['shipping_lines'] as $shipping_line) {
            $rate = new WC_Shipping_Rate($shipping_line['method_id'], $shipping_line['method_title'], $shipping_line['total']);
            $order->add_shipping($rate);
        }
    }
    
    // Set customer note
    if (!empty($params['customer_note'])) {
        $order->set_customer_note($params['customer_note']);
    }
    
    // Calculate totals
    $order->calculate_totals();
    
    // Save order
    $order->save();
    
    error_log('Sakwood: Order created successfully: ' . $order->get_id());
    
    return [
        'success' => true,
        'id' => $order->get_id(),
        'order_key' => $order->get_order_key(),
        'status' => $order->get_status(),
    ];
}
