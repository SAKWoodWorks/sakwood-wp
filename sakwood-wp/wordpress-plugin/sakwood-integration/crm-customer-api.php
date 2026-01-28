<?php
/**
 * CRM Customer REST API
 *
 * Customer-facing API for viewing their CRM profile
 * Maps WordPress users to CRM customers via wp_user_id field
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Customer_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get customer profile by user_id
        register_rest_route('sakwood/v1', '/customer/crm/profile', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_customer_profile'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // Get customer statistics
        register_rest_route('sakwood/v1', '/customer/crm/stats', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_customer_stats'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // Update customer profile (limited fields)
        register_rest_route('sakwood/v1', '/customer/crm/profile', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_customer_profile'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));
    }

    /**
     * Get customer profile by WordPress user ID
     */
    public function get_customer_profile($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';

        // Get customer by wp_user_id
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        // If no customer record exists, create one from user data
        if (!$customer) {
            $user = get_userdata($user_id);

            if (!$user) {
                return new WP_Error('user_not_found', __('User not found', 'sakwood'), array('status' => 404));
            }

            // Create customer record
            $wpdb->insert(
                $table_customers,
                array(
                    'wp_user_id' => $user_id,
                    'first_name' => $user->first_name ?: '',
                    'last_name' => $user->last_name ?: '',
                    'email' => $user->user_email,
                    'phone' => get_user_meta($user_id, 'billing_phone', true) ?: '',
                    'company' => get_user_meta($user_id, 'billing_company', true) ?: '',
                    'customer_type' => 'retail',
                    'status' => 'active',
                ),
                array('%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
            );

            $customer = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT * FROM $table_customers WHERE wp_user_id = %d",
                    $user_id
                ),
                ARRAY_A
            );
        }

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        // Format response
        return rest_ensure_response(array(
            'id' => (int) $customer['id'],
            'wpUserId' => (int) $customer['wp_user_id'],
            'firstName' => $customer['first_name'],
            'lastName' => $customer['last_name'],
            'email' => $customer['email'],
            'phone' => $customer['phone'],
            'lineId' => $customer['line_id'],
            'company' => $customer['company'],
            'taxId' => $customer['tax_id'],
            'customerType' => $customer['customer_type'],
            'source' => $customer['source'],
            'status' => $customer['status'],
            'totalOrders' => (int) $customer['total_orders'],
            'totalSpent' => (float) $customer['total_spent'],
            'lastOrderDate' => $customer['last_order_date'],
            'createdAt' => $customer['created_at'],
            'updatedAt' => $customer['updated_at'],
        ));
    }

    /**
     * Get customer statistics
     */
    public function get_customer_stats($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $table_interactions = $wpdb->prefix . 'sakwood_interactions';
        $table_tasks = $wpdb->prefix . 'sakwood_tasks';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Get interaction counts
        $total_interactions = (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM $table_interactions WHERE customer_id = %d",
                $customer_id
            )
        );

        $recent_interactions = (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM $table_interactions WHERE customer_id = %d AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)",
                $customer_id
            )
        );

        // Get task counts
        $pending_tasks = (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM $table_tasks WHERE customer_id = %d AND status = 'pending'",
                $customer_id
            )
        );

        $completed_tasks = (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM $table_tasks WHERE customer_id = %d AND status = 'completed'",
                $customer_id
            )
        );

        return rest_ensure_response(array(
            'totalInteractions' => $total_interactions,
            'recentInteractions' => $recent_interactions,
            'pendingTasks' => $pending_tasks,
            'completedTasks' => $completed_tasks,
        ));
    }

    /**
     * Update customer profile (customer-facing fields only)
     */
    public function update_customer_profile($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Get request body
        $body = $request->get_json_params();

        // Only allow updating these fields (customer-facing)
        $allowed_fields = array(
            'phone',
            'line_id',
            'company',
        );

        $update_data = array();
        $update_format = array();

        foreach ($allowed_fields as $field) {
            if (isset($body[$field])) {
                $update_data[$field] = sanitize_text_field($body[$field]);
                $update_format[] = '%s';
            }
        }

        if (empty($update_data)) {
            return new WP_Error('no_data', __('No valid fields to update', 'sakwood'), array('status' => 400));
        }

        // Add updated timestamp
        $update_data['updated_at'] = current_time('mysql');
        $update_format[] = '%s';

        // Update customer
        $result = $wpdb->update(
            $table_customers,
            $update_data,
            array('id' => $customer_id),
            $update_format,
            array('%d')
        );

        if ($result === false) {
            return new WP_Error('update_failed', __('Failed to update profile', 'sakwood'), array('status' => 500));
        }

        return rest_ensure_response(array(
            'success' => true,
            'message' => __('Profile updated successfully', 'sakwood'),
        ));
    }
}

// Initialize
new Sakwood_CRM_Customer_API();
