<?php
/**
 * Customer Profile REST API
 *
 * REST API endpoints for customer profile management
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Customer_Profile_API {

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
        // Get customer profile
        register_rest_route('sakwood/v1', '/customer/profile', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_profile'),
            'permission_callback' => 'is_user_logged_in',
        ));

        // Update customer profile
        register_rest_route('sakwood/v1', '/customer/profile', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_profile'),
            'permission_callback' => 'is_user_logged_in',
        ));
    }

    /**
     * Get customer profile
     */
    public function get_profile($request) {
        $user_id = get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        $user = get_userdata($user_id);

        if (!$user) {
            return new WP_Error('user_not_found', 'User not found', array('status' => 404));
        }

        // Get CRM profile data if available
        $crm_profile = $this->get_crm_profile($user_id);

        // Build profile response
        $profile = array(
            'id' => $user_id,
            'firstName' => get_user_meta($user_id, 'first_name', true) ?: $user->first_name,
            'lastName' => get_user_meta($user_id, 'last_name', true) ?: $user->last_name,
            'email' => $user->user_email,
            'displayName' => $user->display_name,
            'phone' => get_user_meta($user_id, 'billing_phone', true),
            'company' => get_user_meta($user_id, 'billing_company', true),
            'taxId' => get_user_meta($user_id, 'tax_id', true),
            'lineId' => get_user_meta($user_id, 'line_id', true),
            'role' => $this->get_user_role($user_id),
            'wholesaleStatus' => get_user_meta($user_id, 'wholesale_status', true),
            'isDealer' => (bool) get_user_meta($user_id, 'is_dealer', true),
            'dealerInfo' => $this->get_dealer_info($user_id),
            'crmProfile' => $crm_profile,
        );

        return $profile;
    }

    /**
     * Update customer profile
     */
    public function update_profile($request) {
        $user_id = get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        $params = $request->get_json_params();

        // Update basic profile fields
        if (isset($params['firstName'])) {
            update_user_meta($user_id, 'first_name', sanitize_text_field($params['firstName']));
            wp_update_user(array(
                'ID' => $user_id,
                'first_name' => sanitize_text_field($params['firstName']),
            ));
        }

        if (isset($params['lastName'])) {
            update_user_meta($user_id, 'last_name', sanitize_text_field($params['lastName']));
            wp_update_user(array(
                'ID' => $user_id,
                'last_name' => sanitize_text_field($params['lastName']),
            ));
        }

        if (isset($params['displayName'])) {
            wp_update_user(array(
                'ID' => $user_id,
                'display_name' => sanitize_text_field($params['displayName']),
            ));
        }

        // Update contact information
        if (isset($params['phone'])) {
            update_user_meta($user_id, 'billing_phone', sanitize_text_field($params['phone']));
        }

        if (isset($params['company'])) {
            update_user_meta($user_id, 'billing_company', sanitize_text_field($params['company']));
        }

        // Update LINE ID (only if user is allowed to change it)
        if (isset($params['lineId']) && !get_user_meta($user_id, 'line_id_locked', true)) {
            update_user_meta($user_id, 'line_id', sanitize_text_field($params['lineId']));
        }

        // Tax ID cannot be changed via this endpoint - must contact support
        // This is intentional for security reasons

        // Get updated profile
        return $this->get_profile($request);
    }

    /**
     * Get user role (retail/wholesale)
     */
    private function get_user_role($user_id) {
        $user = get_userdata($user_id);
        if (in_array('wholesale', $user->roles)) {
            return 'wholesale';
        }
        return 'retail';
    }

    /**
     * Get dealer information
     */
    private function get_dealer_info($user_id) {
        if (!get_user_meta($user_id, 'is_dealer', true)) {
            return null;
        }

        $tier_id = get_user_meta($user_id, 'dealer_tier_id', true);
        $tier_name = get_user_meta($user_id, 'dealer_tier_name', true);

        return array(
            'tierId' => $tier_id,
            'tierName' => $tier_name,
            'discountPercentage' => get_user_meta($user_id, 'dealer_discount', true),
            'status' => get_user_meta($user_id, 'dealer_status', true),
            'expiryDate' => get_user_meta($user_id, 'dealer_expiry', true),
            'territories' => get_user_meta($user_id, 'dealer_territories', true),
        );
    }

    /**
     * Get CRM profile data
     */
    private function get_crm_profile($user_id) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'sakwood_crm_customers';
        $customer = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE user_id = %d",
            $user_id
        ));

        if (!$customer) {
            return null;
        }

        return array(
            'customerType' => $customer->customer_type,
            'totalOrders' => intval($customer->total_orders),
            'totalSpent' => floatval($customer->total_spent),
            'avgOrderValue' => floatval($customer->avg_order_value),
            'memberSince' => $customer->created_at,
            'lastOrderDate' => $customer->last_order_date,
            'creditLimit' => floatval($customer->credit_limit),
            'remainingCredit' => floatval($customer->remaining_credit),
        );
    }
}

// Initialize API
new Sakwood_Customer_Profile_API();
