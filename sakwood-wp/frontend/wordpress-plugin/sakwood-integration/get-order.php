<?php
/**
 * REST API endpoint for getting order details
 */

add_action('rest_api_init', function () {
    register_rest_route('sakwood/v1', '/get-order', [
        'methods' => 'POST',
        'callback' => 'sakwood_get_order',
        'permission_callback' => '__return_true',
    ]);
});

/**
 * Get WooCommerce order details
 */
function sakwood_get_order($request) {
    $params = $request->get_json_params();

    // Log the request
    error_log('Sakwood: Fetching order with params: ' . json_encode($params));

    // Validate required fields
    if (empty($params['order_id'])) {
        return new WP_Error(
            'missing_order_id',
            'Order ID is required',
            ['status' => 400]
        );
    }

    $order_id = intval($params['order_id']);

    // Get order using WooCommerce function
    $order = wc_get_order($order_id);

    if (!$order) {
        error_log('Sakwood: Order not found: ' . $order_id);
        return new WP_Error(
            'order_not_found',
            'Order not found',
            ['status' => 404]
        );
    }

    // Get order data
    $order_data = $order->get_data();

    // Get line items
    $line_items = [];
    foreach ($order->get_items() as $item_id => $item) {
        $product = $item->get_product();
        $item_name = $item->get_name();

        // If item name is empty, try to get it from the product
        if (empty($item_name) && $product) {
            $item_name = $product->get_name();
        }

        // If still empty, use a fallback
        if (empty($item_name)) {
            $item_name = 'Product #' . $item->get_product_id();
        }

        $line_items[] = [
            'id' => $item_id,
            'name' => $item_name,
            'quantity' => $item->get_quantity(),
            'subtotal' => $item->get_subtotal(),
            'total' => $item->get_total(),
            'product_id' => $item->get_product_id(),
            'image_url' => $product ? get_the_post_thumbnail_url($product->get_id(), 'thumbnail') : null,
        ];
    }

    // Get shipping lines
    $shipping_lines = [];
    foreach ($order->get_shipping_methods() as $shipping_method) {
        $shipping_lines[] = [
            'method_id' => $shipping_method->get_method_id(),
            'method_title' => $shipping_method->get_method_title(),
            'total' => $shipping_method->get_total(),
        ];
    }

    // Build response
    $response = [
        'success' => true,
        'id' => $order->get_id(),
        'order_key' => $order->get_order_key(),
        'status' => $order->get_status(),
        'status_label' => wc_get_order_status_name($order->get_status()),
        'currency' => $order->get_currency(),
        'total' => $order->get_total(),
        'subtotal' => $order->get_subtotal(),
        'shipping_total' => $order->get_shipping_total(),
        'date_created' => $order->get_date_created()->date('Y-m-d H:i:s'),
        'date_modified' => $order->get_date_modified()->date('Y-m-d H:i:s'),
        'payment_method' => $order->get_payment_method(),
        'payment_method_title' => $order->get_payment_method_title(),
        'payment_url' => $order->get_checkout_payment_url(),
        'billing' => [
            'first_name' => $order->get_billing_first_name(),
            'last_name' => $order->get_billing_last_name(),
            'email' => $order->get_billing_email(),
            'phone' => $order->get_billing_phone(),
            'address_1' => $order->get_billing_address_1(),
            'address_2' => $order->get_billing_address_2(),
            'city' => $order->get_billing_city(),
            'state' => $order->get_billing_state(),
            'postcode' => $order->get_billing_postcode(),
            'country' => $order->get_billing_country(),
        ],
        'shipping' => [
            'first_name' => $order->get_shipping_first_name(),
            'last_name' => $order->get_shipping_last_name(),
            'address_1' => $order->get_shipping_address_1(),
            'address_2' => $order->get_shipping_address_2(),
            'city' => $order->get_shipping_city(),
            'state' => $order->get_shipping_state(),
            'postcode' => $order->get_shipping_postcode(),
            'country' => $order->get_shipping_country(),
        ],
        'line_items' => $line_items,
        'shipping_lines' => $shipping_lines,
        'customer_note' => $order->get_customer_note(),
    ];

    error_log('Sakwood: Order fetched successfully: ' . $order_id);

    return $response;
}
