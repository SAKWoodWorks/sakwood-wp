<?php
/**
 * Password Management REST API
 *
 * Handles password changes and resets
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Password_Management_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        // Change password
        register_rest_route('sakwood/v1', '/user/password', array(
            'methods' => 'POST',
            'callback' => array($this, 'change_password'),
            'permission_callback' => 'is_user_logged_in',
        ));

        // Request password reset
        register_rest_route('sakwood/v1', '/user/password/reset', array(
            'methods' => 'POST',
            'callback' => array($this, 'request_password_reset'),
            'permission_callback' => '__return_true',
        ));

        // Confirm password reset
        register_rest_route('sakwood/v1', '/user/password/reset/confirm', array(
            'methods' => 'POST',
            'callback' => array($this, 'confirm_password_reset'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Change user password
     */
    public function change_password($request) {
        $user_id = get_current_user_id();
        $params = $request->get_params();

        // Validate required fields
        if (empty($params['current_password']) || empty($params['new_password'])) {
            return new WP_Error(
                'missing_fields',
                __('Current and new passwords are required', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        $user = get_userdata($user_id);

        // Verify current password
        if (!wp_check_password($params['current_password'], $user->user_pass, $user_id)) {
            return new WP_Error(
                'incorrect_password',
                __('Current password is incorrect', 'sakwood-integration'),
                array('status' => 403)
            );
        }

        // Validate new password strength
        $validation = $this->validate_password_strength($params['new_password']);
        if (!$validation['valid']) {
            return new WP_Error(
                'password_weak',
                $validation['message'],
                array('status' => 400)
            );
        }

        // Check if new password is same as current
        if ($params['current_password'] === $params['new_password']) {
            return new WP_Error(
                'same_password',
                __('New password must be different from current password', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        // Change password
        wp_set_password($params['new_password'], $user_id);

        // Send password change notification
        wp_password_change_notification($user);

        // Destroy all sessions except current (force re-login on other devices)
        $manager = WP_Session_Tokens::get_instance($user_id);
        $manager->destroy_others(wp_get_session_token());

        return array(
            'success' => true,
            'message' => __('Password changed successfully. Please login again on other devices.', 'sakwood-integration'),
        );
    }

    /**
     * Request password reset
     */
    public function request_password_reset($request) {
        $params = $request->get_params();

        if (empty($params['email'])) {
            return new WP_Error(
                'missing_email',
                __('Email is required', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        $email = sanitize_email($params['email']);
        $user = get_user_by('email', $email);

        // Always return success (to prevent email enumeration)
        // But only send email if user exists
        if ($user) {
            // Generate password reset key
            $key = get_password_reset_key($user);

            if (!is_wp_error($key)) {
                // Create reset link
                $reset_url = add_query_arg(array(
                    'action' => 'rp',
                    'key' => $key,
                    'login' => rawurlencode($user->user_login),
                ), home_url('/login/reset-password'));

                // Send reset email
                $message = sprintf(__('Someone requested a password reset for the following account:', 'sakwood-integration')) . "\r\n\r\n";
                $message .= home_url('/') . "\r\n\r\n";
                $message .= sprintf(__('Username: %s', 'sakwood-integration'), $user->user_login) . "\r\n\r\n";
                $message .= __('If this was a mistake, ignore this email and nothing will happen.', 'sakwood-integration') . "\r\n\r\n";
                $message .= __('To reset your password, visit the following address:', 'sakwood-integration') . "\r\n\r\n";
                $message .= '<' . $reset_url . '>' . "\r\n";

                $subject = sprintf(__('[%s] Password Reset', 'sakwood-integration'), get_option('blogname'));

                $headers = array('Content-Type: text/plain; charset=UTF-8');
                wp_mail($user->user_email, $subject, $message, $headers);
            }
        }

        return array(
            'success' => true,
            'message' => __('If the email exists, a password reset link has been sent.', 'sakwood-integration'),
        );
    }

    /**
     * Confirm password reset
     */
    public function confirm_password_reset($request) {
        $params = $request->get_params();

        if (empty($params['key']) || empty($params['login']) || empty($params['password'])) {
            return new WP_Error(
                'missing_fields',
                __('Key, login, and password are required', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        $user = check_password_reset_key($params['key'], $params['login']);

        if (is_wp_error($user)) {
            return new WP_Error(
                'invalid_key',
                __('Invalid or expired reset key', 'sakwood-integration'),
                array('status' => 400)
            );
        }

        // Validate new password strength
        $validation = $this->validate_password_strength($params['password']);
        if (!$validation['valid']) {
            return new WP_Error(
                'password_weak',
                $validation['message'],
                array('status' => 400)
            );
        }

        // Reset password
        reset_password($user, $params['password']);

        return array(
            'success' => true,
            'message' => __('Password reset successfully. Please login with your new password.', 'sakwood-integration'),
        );
    }

    /**
     * Validate password strength
     */
    private function validate_password_strength($password) {
        // Minimum length
        if (strlen($password) < 8) {
            return array(
                'valid' => false,
                'message' => __('Password must be at least 8 characters long', 'sakwood-integration'),
            );
        }

        // Require at least one letter and one number
        if (!preg_match('/[A-Za-z]/', $password) || !preg_match('/[0-9]/', $password)) {
            return array(
                'valid' => false,
                'message' => __('Password must contain at least one letter and one number', 'sakwood-integration'),
            );
        }

        // Check for common passwords
        $common_passwords = array('password123', '12345678', 'qwerty123', 'abc12345');
        if (in_array(strtolower($password), $common_passwords)) {
            return array(
                'valid' => false,
                'message' => __('This password is too common. Please choose a stronger password.', 'sakwood-integration'),
            );
        }

        return array('valid' => true);
    }
}

// Initialize
new Sakwood_Password_Management_API();
