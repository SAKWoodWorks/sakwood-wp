<?php
/**
 * Password Reset REST API
 *
 * REST API endpoints for password reset functionality
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Password_Reset_API {

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
        // Request password reset
        register_rest_route('sakwood/v1', '/password-reset/request', array(
            'methods' => 'POST',
            'callback' => array($this, 'request_reset'),
            'permission_callback' => '__return_true',
        ));

        // Confirm password reset
        register_rest_route('sakwood/v1', '/password-reset/confirm', array(
            'methods' => 'POST',
            'callback' => array($this, 'confirm_reset'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Request password reset
     */
    public function request_reset($request) {
        $email = sanitize_email($request->get_param('email'));

        if (empty($email)) {
            return new WP_Error('invalid_email', 'Please provide a valid email address', array('status' => 400));
        }

        // Check if user exists
        $user = get_user_by('email', $email);

        if (!$user) {
            // Still return success for security (don't reveal if email exists)
            return array(
                'success' => true,
                'message' => 'If an account exists with this email, a password reset link has been sent.',
            );
        }

        // Generate reset key
        $reset_key = get_password_reset_key($user);

        if (is_wp_error($reset_key)) {
            return new WP_Error('reset_failed', 'Could not generate reset key', array('status' => 500));
        }

        // Create reset token (valid for 1 hour)
        $token = wp_generate_password(32, false);
        $expiry = time() + (60 * 60); // 1 hour

        // Store token in user meta
        update_user_meta($user->ID, 'password_reset_token', $token);
        update_user_meta($user->ID, 'password_reset_expiry', $expiry);

        // Build reset URL
        $reset_url = add_query_arg(array(
            'token' => $token,
            'login' => rawurlencode($user->user_login),
        ), home_url('/th/password-reset'));

        // Send reset email
        $subject = 'Password Reset Request - SAK WoodWorks';
        $message = "Hello {$user->display_name},\n\n";
        $message .= "You requested a password reset for your account.\n\n";
        $message .= "Click the link below to reset your password:\n";
        $message .= $reset_url . "\n\n";
        $message .= "This link will expire in 1 hour.\n\n";
        $message .= "If you did not request this reset, please ignore this email.\n\n";
        $message .= "Best regards,\nSAK WoodWorks Team";

        $headers = array('Content-Type: text/plain; charset=UTF-8');

        $sent = wp_mail($user->user_email, $subject, $message, $headers);

        if (!$sent) {
            return new WP_Error('email_failed', 'Could not send reset email', array('status' => 500));
        }

        return array(
            'success' => true,
            'message' => 'If an account exists with this email, a password reset link has been sent.',
        );
    }

    /**
     * Confirm password reset
     */
    public function confirm_reset($request) {
        $token = sanitize_text_field($request->get_param('token'));
        $password = $request->get_param('password');
        $login = sanitize_text_field($request->get_param('login'));

        if (empty($token) || empty($password)) {
            return new WP_Error('missing_params', 'Token and password are required', array('status' => 400));
        }

        // Validate password strength
        if (strlen($password) < 8) {
            return new WP_Error('password_weak', 'Password must be at least 8 characters', array('status' => 400));
        }

        // Get user by login
        $user = get_user_by('login', $login);

        if (!$user) {
            return new WP_Error('invalid_user', 'Invalid user', array('status' => 404));
        }

        // Verify token
        $stored_token = get_user_meta($user->ID, 'password_reset_token', true);
        $token_expiry = get_user_meta($user->ID, 'password_reset_expiry', true);

        if ($stored_token !== $token) {
            return new WP_Error('invalid_token', 'Invalid reset token', array('status' => 400));
        }

        if (time() > intval($token_expiry)) {
            return new WP_Error('token_expired', 'Reset token has expired', array('status' => 400));
        }

        // Reset password
        reset_password($user, $password);

        // Clear reset token
        delete_user_meta($user->ID, 'password_reset_token');
        delete_user_meta($user->ID, 'password_reset_expiry');

        // Log the user in
        wp_set_current_user($user->ID);
        wp_set_auth_cookie($user->ID);

        return array(
            'success' => true,
            'message' => 'Password has been reset successfully',
        );
    }
}

// Initialize API
new Sakwood_Password_Reset_API();
