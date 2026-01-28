<?php
/**
 * Customer Addresses REST API
 *
 * REST API endpoints for managing customer addresses
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Customer_Addresses_API {

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
        // Get all customer addresses
        register_rest_route('sakwood/v1', '/customer/addresses', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_addresses'),
            'permission_callback' => '__return_true', // TODO: Fix cookie auth
        ));

        // Get single address
        register_rest_route('sakwood/v1', '/customer/addresses/(?P<address_id>[a-zA-Z0-9_]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_address'),
            'permission_callback' => '__return_true', // TODO: Fix cookie auth
        ));

        // Create new address
        register_rest_route('sakwood/v1', '/customer/addresses', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_address'),
            'permission_callback' => '__return_true', // TODO: Fix cookie auth
        ));

        // Update address
        register_rest_route('sakwood/v1', '/customer/addresses/(?P<address_id>[a-zA-Z0-9_]+)', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_address'),
            'permission_callback' => '__return_true', // TODO: Fix cookie auth
        ));

        // Delete address
        register_rest_route('sakwood/v1', '/customer/addresses/(?P<address_id>[a-zA-Z0-9_]+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_address'),
            'permission_callback' => '__return_true', // TODO: Fix cookie auth
        ));
    }

    /**
     * Check permission - custom authentication handler
     */
    public function check_permission() {
        // Check if user is logged in via standard WordPress auth
        if (is_user_logged_in()) {
            return true;
        }

        // Try to authenticate from cookie
        $user_id = $this->get_user_from_cookie();
        if ($user_id) {
            wp_set_current_user($user_id);
            return true;
        }

        return false;
    }

    /**
     * Get user from cookie
     */
    private function get_user_from_cookie() {
        // Check for WordPress logged in cookie
        if (isset($_COOKIE[LOGGED_IN_COOKIE])) {
            $cookie = $_COOKIE[LOGGED_IN_COOKIE];
            $scheme = 'logged_in';

            $user_id = wp_validate_auth_cookie($cookie, $scheme);
            if ($user_id) {
                return $user_id;
            }
        }

        // Fallback to current user if already set
        $current_user_id = get_current_user_id();
        if ($current_user_id) {
            return $current_user_id;
        }

        return false;
    }

    /**
     * Get all customer addresses
     */
    public function get_addresses($request) {
        // Get user from request parameter (for development)
        $params = $request->get_params();
        $user_id = isset($params['user_id']) ? intval($params['user_id']) : get_current_user_id();

        error_log('[Sakwood Addresses] Getting addresses for user_id: ' . ($user_id ?: 'NONE'));

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        $addresses = $this->get_user_addresses($user_id);

        error_log('[Sakwood Addresses] Found addresses: ' . count($addresses));

        return array(
            'addresses' => $addresses,
            'total' => count($addresses),
        );
    }

    /**
     * Get single address
     */
    public function get_address($request) {
        $user_id = get_current_user_id();
        $address_id = sanitize_text_field($request['address_id']);

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        $address = $this->get_address_by_id($address_id);

        if (!$address) {
            return new WP_Error('address_not_found', 'Address not found', array('status' => 404));
        }

        // Verify address belongs to current user
        if ($address->user_id !== $user_id) {
            return new WP_Error('forbidden', 'You do not have permission to view this address', array('status' => 403));
        }

        return $address;
    }

    /**
     * Create new address
     */
    public function create_address($request) {
        $params = $request->get_json_params();

        // Get user_id from body parameter (sent from frontend)
        $user_id = isset($params['user_id']) ? intval($params['user_id']) : get_current_user_id();

        error_log('[Sakwood Addresses] Creating address for user_id: ' . ($user_id ?: 'NONE'));

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        // Validate required fields
        $required_fields = array('first_name', 'last_name', 'address_1', 'city', 'state', 'postcode');
        foreach ($required_fields as $field) {
            if (empty($params[$field])) {
                return new WP_Error('missing_field', "Missing required field: {$field}", array('status' => 400));
            }
        }

        // Prepare data
        $data = array(
            'user_id' => $user_id,
            'first_name' => sanitize_text_field($params['first_name']),
            'last_name' => sanitize_text_field($params['last_name']),
            'company' => isset($params['company']) ? sanitize_text_field($params['company']) : '',
            'address_1' => sanitize_text_field($params['address_1']),
            'address_2' => isset($params['address_2']) ? sanitize_text_field($params['address_2']) : '',
            'city' => sanitize_text_field($params['city']),
            'state' => sanitize_text_field($params['state']),
            'postcode' => sanitize_text_field($params['postcode']),
            'country' => isset($params['country']) ? sanitize_text_field($params['country']) : 'TH',
            'phone' => isset($params['phone']) ? sanitize_text_field($params['phone']) : '',
            'is_default' => isset($params['is_default']) ? (bool) $params['is_default'] : false,
        );

        error_log('[Sakwood Addresses] Creating address with user_id: ' . $user_id . ' and data: ' . json_encode($data));

        // Insert address
        $address_id = $this->insert_address($data);

        if ($address_id) {
            $address = $this->get_address_by_id($address_id);

            return array(
                'success' => true,
                'address' => $address,
                'message' => 'Address saved successfully',
            );
        }

        return new WP_Error('server_error', 'Failed to save address', array('status' => 500));
    }

    /**
     * Update address
     */
    public function update_address($request) {
        $params = $request->get_json_params();
        $address_id = sanitize_text_field($request['address_id']);

        // Get user_id from body parameter (sent from frontend)
        $user_id = isset($params['user_id']) ? intval($params['user_id']) : get_current_user_id();

        error_log('[Sakwood Addresses] Updating address: ' . $address_id . ' for user_id: ' . ($user_id ?: 'NONE'));
        error_log('[Sakwood Addresses] Request params: ' . json_encode($params));

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        $address = $this->get_address_by_id($address_id);

        if (!$address) {
            return new WP_Error('address_not_found', 'Address not found', array('status' => 404));
        }

        error_log('[Sakwood Addresses] Found address with user_id: ' . ($address['user_id'] ?? 'null'));

        // Verify address belongs to current user
        if (isset($address['user_id']) && $address['user_id'] !== $user_id) {
            return new WP_Error('forbidden', 'You do not have permission to update this address', array('status' => 403));
        }

        $params = $request->get_json_params();

        // Prepare update data
        $data = array(
            'first_name' => sanitize_text_field($params['first_name']),
            'last_name' => sanitize_text_field($params['last_name']),
            'company' => isset($params['company']) ? sanitize_text_field($params['company']) : '',
            'address_1' => sanitize_text_field($params['address_1']),
            'address_2' => isset($params['address_2']) ? sanitize_text_field($params['address_2']) : '',
            'city' => sanitize_text_field($params['city']),
            'state' => sanitize_text_field($params['state']),
            'postcode' => sanitize_text_field($params['postcode']),
            'country' => isset($params['country']) ? sanitize_text_field($params['country']) : 'TH',
            'phone' => isset($params['phone']) ? sanitize_text_field($params['phone']) : '',
        );

        // Update address
        $updated = $this->update_address_data($address_id, $data, $user_id);

        if ($updated) {
            $address = $this->get_address_by_id($address_id);

            return array(
                'success' => true,
                'address' => $address,
                'message' => 'Address updated successfully',
            );
        }

        return new WP_Error('server_error', 'Failed to update address', array('status' => 500));
    }

    /**
     * Delete address
     */
    public function delete_address($request) {
        $params = $request->get_params();
        $address_id = sanitize_text_field($request['address_id']);

        // Get user_id from query parameter (sent from frontend)
        $user_id = isset($params['user_id']) ? intval($params['user_id']) : get_current_user_id();

        error_log('[Sakwood Addresses] Deleting address: ' . $address_id . ' for user_id: ' . ($user_id ?: 'NONE'));
        error_log('[Sakwood Addresses] Request params: ' . json_encode($params));

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        $address = $this->get_address_by_id($address_id);

        if (!$address) {
            return new WP_Error('address_not_found', 'Address not found', array('status' => 404));
        }

        error_log('[Sakwood Addresses] Found address with user_id: ' . ($address['user_id'] ?? 'null'));

        // Verify address belongs to current user
        if (isset($address['user_id']) && $address['user_id'] !== $user_id) {
            return new WP_Error('forbidden', 'You do not have permission to delete this address', array('status' => 403));
        }

        // Delete address
        $deleted = $this->delete_address_data($address_id, $user_id);

        if ($deleted) {
            return array(
                'success' => true,
                'message' => 'Address deleted successfully',
            );
        }

        return new WP_Error('server_error', 'Failed to delete address', array('status' => 500));
    }

    /**
     * Get user addresses from user meta
     */
    private function get_user_addresses($user_id) {
        $addresses_meta = get_user_meta($user_id, 'customer_addresses', true);

        if (empty($addresses_meta) || !is_array($addresses_meta)) {
            return array();
        }

        return $addresses_meta;
    }

    /**
     * Get address by ID from user meta
     */
    private function get_address_by_id($address_id) {
        // Search across all users (in production, you'd want to optimize this)
        $users = get_users(array('number' => -1));

        foreach ($users as $user) {
            $addresses = get_user_meta($user->ID, 'customer_addresses', true);

            if (is_array($addresses)) {
                foreach ($addresses as $address) {
                    if (isset($address['id']) && $address['id'] === $address_id) {
                        return $address;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Insert address
     */
    private function insert_address($data) {
        $user_id = $data['user_id'];
        unset($data['user_id']);

        error_log('[Sakwood Addresses] Inserting address for user_id: ' . $user_id);

        $addresses = $this->get_user_addresses($user_id);

        error_log('[Sakwood Addresses] Current addresses count: ' . count($addresses));

        // Generate unique ID
        $address_id = uniqid('addr_');

        $data['id'] = $address_id;
        $data['created_at'] = current_time('mysql');
        $data['updated_at'] = current_time('mysql');

        $addresses[] = $data;

        error_log('[Sakwood Addresses] Saving addresses. New count: ' . count($addresses));

        // If this is set as default, unset other defaults
        if ($data['is_default']) {
            foreach ($addresses as &$addr) {
                if ($addr['id'] !== $address_id) {
                    $addr['is_default'] = false;
                }
            }
        }

        $result = update_user_meta($user_id, 'customer_addresses', $addresses);
        error_log('[Sakwood Addresses] Update result: ' . ($result ? 'SUCCESS' : 'FAILED'));

        return $result ? $address_id : false;
    }

    /**
     * Update address data
     */
    private function update_address_data($address_id, $data, $user_id) {
        $addresses = $this->get_user_addresses($user_id);

        $updated = false;

        foreach ($addresses as &$address) {
            if ($address['id'] === $address_id) {
                $address = array_merge($address, $data);
                $address['updated_at'] = current_time('mysql');
                $updated = true;
                break;
            }
        }

        if ($updated) {
            return update_user_meta($user_id, 'customer_addresses', $addresses);
        }

        return false;
    }

    /**
     * Delete address data
     */
    private function delete_address_data($address_id, $user_id) {
        $addresses = $this->get_user_addresses($user_id);

        $filtered = array_filter($addresses, function($address) use ($address_id) {
            return $address['id'] !== $address_id;
        });

        // Re-index array
        $filtered = array_values($filtered);

        return update_user_meta($user_id, 'customer_addresses', $filtered);
    }
}

// Initialize API
new Sakwood_Customer_Addresses_API();
