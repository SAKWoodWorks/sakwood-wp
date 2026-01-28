<?php
/**
 * PromptPay Payment Verification Admin
 *
 * Adds admin interface for manually verifying PromptPay payments
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add custom order status for PromptPay pending verification
 */
add_action('init', 'sakwood_register_promptpay_order_status');
function sakwood_register_promptpay_order_status() {
    register_post_status('wc-promptpay-pending', array(
        'label'                     => 'PromptPay Pending',
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop('PromptPay Pending <span class="count">(%s)</span>', 'PromptPay Pending <span class="count">(%s)</span>'),
    ));
}

/**
 * Add custom status to order status dropdown
 */
add_filter('wc_order_statuses', 'sakwood_add_promptpay_order_status');
function sakwood_add_promptpay_order_status($order_statuses) {
    $order_statuses['wc-promptpay-pending'] = 'PromptPay Pending';
    return $order_statuses;
}

/**
 * Add custom meta box for PromptPay verification
 */
add_action('add_meta_boxes_shop_order', 'sakwood_add_promptpay_verification_meta_box');
function sakwood_add_promptpay_verification_meta_box($post) {
    add_meta_box(
        'sakwood_promptpay_verification',
        'PromptPay Payment Verification',
        'sakwood_promptpay_verification_meta_box_callback',
        'shop_order',
        'side',
        'high'
    );
}

/**
 * Meta box callback function
 */
function sakwood_promptpay_verification_meta_box_callback($post) {
    $order = wc_get_order($post->ID);
    $payment_method = $order->get_payment_method();

    // Only show for PromptPay orders
    if ($payment_method !== 'promptpay') {
        echo '<p>This order did not use PromptPay payment method.</p>';
        return;
    }

    // Get verification data
    $qr_image = get_post_meta($post->ID, '_promptpay_qr_image', true);
    $amount = $order->get_total();
    $customer_phone = $order->get_billing_phone();
    $customer_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();

    // Get merchant ID from settings
    $merchant_id = get_option('sakwood_promptpay_merchant_id', '0225559000467');

    ?>
    <div class="sakwood-promptpay-verification">
        <div class="promptpay-info" style="background: #f5f5f5; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
            <h4 style="margin: 0 0 8px 0; color: #A31F34;">Payment Details</h4>
            <p style="margin: 4px 0;"><strong>Amount:</strong> ฿<?php echo number_format($amount, 2); ?></p>
            <p style="margin: 4px 0;"><strong>Customer:</strong> <?php echo esc_html($customer_name); ?></p>
            <p style="margin: 4px 0;"><strong>Phone:</strong> <?php echo esc_html($customer_phone); ?></p>
            <p style="margin: 4px 0;"><strong>Merchant ID:</strong> <code><?php echo esc_html($merchant_id); ?></code></p>
        </div>

        <div class="verification-actions">
            <button type="button" class="button button-primary button-large" style="width: 100%; margin-bottom: 8px;"
                onclick="sakwoodVerifyPromptPayPayment(<?php echo $post->ID; ?>)">
                ✓ Verify Payment Received
            </button>

            <button type="button" class="button button-secondary" style="width: 100%;"
                onclick="sakwoodSendPaymentReminder(<?php echo $post->ID; ?>)">
                Send Payment Reminder
            </button>
        </div>

        <div id="verification-result" style="margin-top: 12px; display: none;"></div>

        <script>
        function sakwoodVerifyPromptPayPayment(orderId) {
            if (!confirm('Confirm that payment has been received via PromptPay?')) {
                return;
            }

            var resultDiv = document.getElementById('verification-result');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<p style="color: #0073aa;">Verifying...</p>';

            jQuery.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_verify_promptpay_payment',
                    order_id: orderId,
                    nonce: '<?php echo wp_create_nonce('sakwood_verify_promptpay'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        resultDiv.innerHTML = '<p style="color: green;">✓ Payment verified! Order status updated.</p>';
                        setTimeout(function() {
                            location.reload();
                        }, 1500);
                    } else {
                        resultDiv.innerHTML = '<p style="color: red;">Error: ' + response.data + '</p>';
                    }
                },
                error: function() {
                    resultDiv.innerHTML = '<p style="color: red;">Error verifying payment. Please try again.</p>';
                }
            });
        }

        function sakwoodSendPaymentReminder(orderId) {
            if (!confirm('Send payment reminder to customer?')) {
                return;
            }

            var resultDiv = document.getElementById('verification-result');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<p style="color: #0073aa;">Sending reminder...</p>';

            jQuery.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_send_payment_reminder',
                    order_id: orderId,
                    nonce: '<?php echo wp_create_nonce('sakwood_payment_reminder'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        resultDiv.innerHTML = '<p style="color: green;">✓ Reminder sent!</p>';
                    } else {
                        resultDiv.innerHTML = '<p style="color: red;">Error: ' + response.data + '</p>';
                    }
                },
                error: function() {
                    resultDiv.innerHTML = '<p style="color: red;">Error sending reminder. Please try again.</p>';
                }
            });
        }
        </script>
    </div>
    <?php
}

/**
 * AJAX handler for verifying PromptPay payment
 */
add_action('wp_ajax_sakwood_verify_promptpay_payment', 'sakwood_ajax_verify_promptpay_payment');
function sakwood_ajax_verify_promptpay_payment() {
    // Verify nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'sakwood_verify_promptpay')) {
        wp_send_json_error('Invalid security token');
    }

    // Check permissions
    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error('Permission denied');
    }

    $order_id = isset($_POST['order_id']) ? intval($_POST['order_id']) : 0;

    if (!$order_id) {
        wp_send_json_error('Invalid order ID');
    }

    $order = wc_get_order($order_id);

    if (!$order) {
        wp_send_json_error('Order not found');
    }

    // Update order status to processing
    $order->update_status('processing', 'PromptPay payment verified by admin');

    // Add order note
    $order->add_order_note('PromptPay payment verified and confirmed by admin.', true);

    wp_send_json_success('Payment verified successfully');
}

/**
 * AJAX handler for sending payment reminder
 */
add_action('wp_ajax_sakwood_send_payment_reminder', 'sakwood_ajax_send_payment_reminder');
function sakwood_ajax_send_payment_reminder() {
    // Verify nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'sakwood_payment_reminder')) {
        wp_send_json_error('Invalid security token');
    }

    // Check permissions
    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error('Permission denied');
    }

    $order_id = isset($_POST['order_id']) ? intval($_POST['order_id']) : 0;

    if (!$order_id) {
        wp_send_json_error('Invalid order ID');
    }

    $order = wc_get_order($order_id);

    if (!$order) {
        wp_send_json_error('Order not found');
    }

    // Get email
    $email = $order->get_billing_email();

    // Get order details
    $order_number = $order->get_order_number();
    $amount = $order->get_total();
    $payment_link = $order->get_checkout_payment_url();

    // Send email
    $subject = 'Payment Reminder for Order #' . $order_number;
    $message = "Dear Customer,\n\n";
    $message .= "This is a friendly reminder that we are still waiting for your PromptPay payment for Order #" . $order_number . ".\n\n";
    $message .= "Amount Due: ฿" . number_format($amount, 2) . "\n\n";
    $message .= "To complete your payment, please scan the QR code shown on your order page or click the link below:\n";
    $message .= $payment_link . "\n\n";
    $message .= "If you have already paid, please ignore this message. Your payment may take 1-2 business days to process.\n\n";
    $message .= "Thank you for your business!\n\n";
    $message .= "Sakwood Team";

    $sent = wp_mail($email, $subject, $message);

    if ($sent) {
        $order->add_order_note('Payment reminder sent to customer.', false);
        wp_send_json_success('Reminder sent successfully');
    } else {
        wp_send_json_error('Failed to send reminder email');
    }
}

/**
 * Add PromptPay settings page
 */
add_action('admin_menu', 'sakwood_add_promptpay_settings_page');
function sakwood_add_promptpay_settings_page() {
    add_submenu_page(
        'woocommerce',
        'PromptPay Settings',
        'PromptPay Settings',
        'manage_woocommerce',
        'sakwood-promptpay-settings',
        'sakwood_promptpay_settings_page_callback'
    );
}

/**
 * Settings page callback
 */
function sakwood_promptpay_settings_page_callback() {
    ?>
    <div class="wrap">
        <h1>PromptPay Payment Settings</h1>

        <form method="post" action="options.php">
            <?php
            settings_fields('sakwood_promptpay_settings');
            do_settings_sections('sakwood_promptpay_settings');
            ?>

            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="sakwood_promptpay_merchant_id">Merchant ID (Phone or Tax ID)</label>
                    </th>
                    <td>
                        <input type="text"
                               id="sakwood_promptpay_merchant_id"
                               name="sakwood_promptpay_merchant_id"
                               value="<?php echo esc_attr(get_option('sakwood_promptpay_merchant_id', '0225559000467')); ?>"
                               class="regular-text"
                               placeholder="0812345678 or 13-digit Tax ID">
                        <p class="description">Enter your PromptPay phone number (10 digits) or Tax ID (13 digits)</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="sakwood_promptpay_auto_verify">Auto-verify payments</label>
                    </th>
                    <td>
                        <input type="checkbox"
                               id="sakwood_promptpay_auto_verify"
                               name="sakwood_promptpay_auto_verify"
                               value="1"
                               <?php checked(get_option('sakwood_promptpay_auto_verify', 0), 1); ?>>
                        <p class="description">Automatically mark PromptPay orders as "Processing" when created (not recommended)</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="sakwood_promptpay_pending_status">Use pending status</label>
                    </th>
                    <td>
                        <input type="checkbox"
                               id="sakwood_promptpay_pending_status"
                               name="sakwood_promptpay_pending_status"
                               value="1"
                               <?php checked(get_option('sakwood_promptpay_pending_status', 1), 1); ?>>
                        <p class="description">Set new PromptPay orders to "PromptPay Pending" status instead of "On Hold"</p>
                    </td>
                </tr>
            </table>

            <?php submit_button(); ?>
        </form>

        <hr>

        <h2>Webhook Configuration (Optional)</h2>
        <p>To enable automatic payment verification from your bank, configure webhooks in WooCommerce:</p>

        <ol>
            <li>Go to <strong>WooCommerce → Settings → Advanced → Webhooks</strong></li>
            <li>Click <strong>Add Webhook</strong></li>
            <li>Name: <strong>PromptPay Payment Update</strong></li>
            <li>Topic: <strong>Order Updated</strong></li>
            <li>Delivery URL: <code><?php echo home_url('/wp-json/sakwood/v1/webhook/order'); ?></code></li>
            <li>Version: <strong>WP API v3</strong></li>
            <li>Secret: Enter a secret key and save it for verification</li>
        </ol>

        <p class="description">
            <strong>Note:</strong> Webhooks require integration with your bank's API or a payment gateway provider.
            For most merchants, manual verification through the admin interface is recommended.
        </p>
    </div>
    <?php
}

/**
 * Register settings
 */
add_action('admin_init', 'sakwood_register_promptpay_settings');
function sakwood_register_promptpay_settings() {
    register_setting('sakwood_promptpay_settings', 'sakwood_promptpay_merchant_id');
    register_setting('sakwood_promptpay_settings', 'sakwood_promptpay_auto_verify');
    register_setting('sakwood_promptpay_settings', 'sakwood_promptpay_pending_status');
}
