<?php
/**
 * User Management REST API
 *
 * Provides REST endpoints for user operations
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_User_Management_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        // Register new user
        register_rest_route('sakwood/v1', '/user/register', array(
            'methods' => 'POST',
            'callback' => array($this, 'register_user'),
            'permission_callback' => '__return_true',
        ));

        // Get current user details
        register_rest_route('sakwood/v1', '/user/me', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_current_user'),
            'permission_callback' => 'is_user_logged_in',
        ));

        // Update user profile
        register_rest_route('sakwood/v1', '/user/profile', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_profile'),
            'permission_callback' => 'is_user_logged_in',
        ));

        // Get users by role (admin only)
        register_rest_route('sakwood/v1', '/users/by-role/(?P<role>[a-zA-Z0-9_-]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_users_by_role'),
            'permission_callback' => function() {
                return current_user_can('promote_users');
            },
        ));

        // Update user role (admin only)
        register_rest_route('sakwood/v1', '/user/(?P<id>\d+)/role', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_user_role'),
            'permission_callback' => function() {
                return current_user_can('promote_users');
            },
        ));
    }

    /**
     * Register new user
     */
    public function register_user($request) {
        $params = $request->get_params();

        // Validate required fields
        $required = array('username', 'email', 'password');
        foreach ($required as $field) {
            if (empty($params[$field])) {
                return new WP_Error(
                    'missing_field',
                    sprintf(__('Missing required field: %s', 'sakwood-integration'), $field),
                    array('status' => 400)
                );
            }
        }

        // Validate email
        if (!is_email($params['email'])) {
            return new WP_Error(
                'invalid_email',
                __('Invalid email address', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        // Check if username exists
        if (username_exists($params['username'])) {
            return new WP_Error(
                'username_exists',
                __('Username already exists', 'sakwood-integration'),
                array('status' => 409)
            );
        }

        // Check if email exists
        if (email_exists($params['email'])) {
            return new WP_Error(
                'email_exists',
                __('Email already registered', 'sakwood-integration'),
                array('status' => 409)
            );
        }

        // Validate password strength (minimum 8 characters)
        if (strlen($params['password']) < 8) {
            return new WP_Error(
                'password_too_short',
                __('Password must be at least 8 characters', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        // Prepare user data
        $user_data = array(
            'user_login' => sanitize_user($params['username']),
            'user_email' => sanitize_email($params['email']),
            'user_pass' => $params['password'],
            'first_name' => isset($params['first_name']) ? sanitize_text_field($params['first_name']) : '',
            'last_name' => isset($params['last_name']) ? sanitize_text_field($params['last_name']) : '',
            'role' => 'customer', // Default role
        );

        // Create user
        $user_id = wp_insert_user($user_data);

        if (is_wp_error($user_id)) {
            return new WP_Error(
                'registration_failed',
                $user_id->get_error_message(),
                array('status' => 500)
            );
        }

        // Get created user
        $user = get_userdata($user_id);

        // Send welcome email
        wp_new_user_notification($user_id, null, 'both');

        return array(
            'success' => true,
            'user_id' => $user_id,
            'user' => $this->format_user_data($user),
            'message' => __('Registration successful', 'sakwood-integration'),
        );
    }

    /**
     * Get current user details
     */
    public function get_current_user($request) {
        $user_id = get_current_user_id();
        $user = get_userdata($user_id);

        if (!$user) {
            return new WP_Error(
                'user_not_found',
                __('User not found', 'sakwood-integration'),
                array('status' => 404)
            );
        }

        return $this->format_user_data($user);
    }

    /**
     * Update user profile
     */
    public function update_profile($request) {
        $user_id = get_current_user_id();
        $params = $request->get_params();

        // Fields users can update themselves
        $allowed_fields = array(
            'first_name',
            'last_name',
            'display_name',
            'billing_phone',
            'billing_address_1',
            'billing_address_2',
            'billing_city',
            'billing_state',
            'billing_postcode',
            'billing_country',
        );

        $update_data = array('ID' => $user_id);

        foreach ($allowed_fields as $field) {
            if (isset($params[$field])) {
                $update_data[$field] = sanitize_text_field($params[$field]);
            }
        }

        // Handle email separately (requires verification)
        if (isset($params['email']) && $params['email'] !== wp_get_current_user()->user_email) {
            // Email change requires password verification
            if (empty($params['password'])) {
                return new WP_Error(
                    'password_required',
                    __('Password required to change email', 'sakwood-integration'),
                    array('status' => 400)
                );
            }

            // Verify password
            if (!wp_check_password($params['password'], wp_get_current_user()->user_pass, $user_id)) {
                return new WP_Error(
                    'incorrect_password',
                    __('Incorrect password', 'sakwood-integration'),
                    array('status' => 403)
                );
            }

            // Check if new email already exists
            if (email_exists($params['email'])) {
                return new WP_Error(
                    'email_exists',
                    __('Email already registered', 'sakwood-integration'),
                    array('status' => 409)
                );
            }

            $update_data['user_email'] = sanitize_email($params['email']);
        }

        $result = wp_update_user($update_data);

        if (is_wp_error($result)) {
            return new WP_Error(
                'update_failed',
                $result->get_error_message(),
                array('status' => 500)
            );
        }

        $user = get_userdata($user_id);

        return array(
            'success' => true,
            'user' => $this->format_user_data($user),
            'message' => __('Profile updated successfully', 'sakwood-integration'),
        );
    }

    /**
     * Get users by role
     */
    public function get_users_by_role($request) {
        $role = $request['role'];

        $users = get_users(array(
            'role' => $role,
            'number' => -1,
        ));

        $formatted_users = array();
        foreach ($users as $user) {
            $formatted_users[] = $this->format_user_data($user);
        }

        return array(
            'role' => $role,
            'count' => count($formatted_users),
            'users' => $formatted_users,
        );
    }

    /**
     * Update user role
     */
    public function update_user_role($request) {
        $user_id = intval($request['id']);
        $params = $request->get_params();
        $new_role = sanitize_text_field($params['role']);

        // Validate role exists
        $wp_roles = wp_roles();
        if (!isset($wp_roles->roles[$new_role])) {
            return new WP_Error(
                'invalid_role',
                __('Invalid role', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        // Security: Prevent non-admins from assigning admin roles
        if (!current_user_can('manage_options')) {
            $protected_roles = array('administrator', 'shop_manager_plus');
            if (in_array($new_role, $protected_roles)) {
                return new WP_Error(
                    'forbidden',
                    __('Cannot assign admin-level roles', 'sakwood-integration'),
                    array('status' => 403)
                );
            }
        }

        $user = new WP_User($user_id);
        $user->set_role($new_role);

        // Update wholesale meta if applicable
        if (in_array($new_role, array('wholesale_customer', 'wholesale_customer_plus'))) {
            if (class_exists('Sakwood_Wholesale_Database')) {
                $applications = Sakwood_Wholesale_Database::get_applications_by_user($user_id);
                if (!empty($applications)) {
                    // Update wholesale meta with application data
                    update_user_meta($user_id, 'wholesale_business_name', $applications[0]->business_name);
                    update_user_meta($user_id, 'wholesale_tax_id', $applications[0]->tax_id);
                    update_user_meta($user_id, 'wholesale_credit_limit', $applications[0]->credit_limit);
                }
            }
        }

        $updated_user = get_userdata($user_id);

        return array(
            'success' => true,
            'user' => $this->format_user_data($updated_user),
            'message' => sprintf(__('User role updated to %s', 'sakwood-integration'), $new_role),
        );
    }

    /**
     * Format user data for API response
     */
    private function format_user_data($user) {
        // Get wholesale status if applicable
        $wholesale_status = get_user_meta($user->ID, 'wholesale_status', true);
        $wholesale_business_name = get_user_meta($user->ID, 'wholesale_business_name', true);
        $wholesale_credit_limit = get_user_meta($user->ID, 'wholesale_credit_limit', true);

        // Map WordPress roles to frontend roles
        $role_map = array(
            'administrator' => 'admin',
            'shop_manager_plus' => 'ecommerce_admin',
            'wholesale_manager' => 'wholesale_manager',
            'editor' => 'content_editor',
            'wholesale_customer' => 'wholesale',
            'wholesale_customer_plus' => 'wholesale',
            'customer' => 'retail',
            'subscriber' => 'retail',
        );

        $frontend_role = 'retail';
        foreach ($user->roles as $wp_role) {
            if (isset($role_map[$wp_role])) {
                $frontend_role = $role_map[$wp_role];
                break;
            }
        }

        return array(
            'id' => $user->ID,
            'email' => $user->user_email,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'displayName' => $user->display_name,
            'role' => $frontend_role,
            'roles' => $user->roles, // All WP roles
            'wholesaleStatus' => $wholesale_status,
            'businessName' => $wholesale_business_name,
            'creditLimit' => (float) $wholesale_credit_limit,
            'capabilities' => array_keys($user->allcaps),
        );
    }
}

// Initialize
new Sakwood_User_Management_API();
