<?php
/**
 * Block Admin Access for Customer Roles
 *
 * Prevents customers (retail, wholesale, dealers) from accessing WordPress admin area.
 * Users with these roles will be redirected to the homepage if they try to access /wp-admin/.
 *
 * Security: This prevents unauthorized access to the WordPress backend.
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Block_Admin_Access {

    /**
     * Roles that should be blocked from wp-admin
     */
    private static $blocked_roles = array(
        'customer',           // Retail customers
        'subscriber',         // Subscribers (same as customers)
        'wholesale_customer', // Wholesale customers
        'wholesale_customer_plus', // Enhanced wholesale customers
        'dealer_silver',      // Silver dealers
        'dealer_gold',        // Gold dealers
        'dealer_platinum',    // Platinum dealers
    );

    /**
     * Constructor
     */
    public function __construct() {
        // Block admin access on init
        add_action('admin_init', array($this, 'block_admin_access'));
        // Hide admin bar for blocked roles
        add_action('after_setup_theme', array($this, 'hide_admin_bar'));
    }

    /**
     * Block access to wp-admin for customer roles
     *
     * Redirects to homepage if user tries to access admin area
     * Allows AJAX requests and specific admin pages needed for functionality
     */
    public function block_admin_access() {
        // Check if user is logged in
        if (!is_user_logged_in()) {
            return;
        }

        // Get current user
        $current_user = wp_get_current_user();

        // Check if user has a blocked role
        $is_blocked = false;
        foreach (self::$blocked_roles as $role) {
            if (in_array($role, $current_user->roles)) {
                $is_blocked = true;
                break;
            }
        }

        // If not blocked, allow access
        if (!$is_blocked) {
            return;
        }

        // Allow AJAX requests (needed for some functionality)
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return;
        }

        // Allow admin-post.php and admin-ajax.php
        if (in_array($GLOBALS['pagenow'], array('admin-ajax.php', 'admin-post.php'))) {
            return;
        }

        // Allow specific admin pages if needed
        // For example, allow profile page if you want customers to edit their profile
        // $allowed_pages = array('profile.php');
        // if (isset($_GET['page']) && in_array($_GET['page'], $allowed_pages)) {
        //     return;
        // }

        // Redirect to homepage
        $redirect_url = home_url();
        wp_redirect($redirect_url);
        exit;
    }

    /**
     * Hide admin bar for customer roles
     *
     * Prevents the WordPress admin bar from showing on the frontend
     * for users with blocked roles
     */
    public function hide_admin_bar() {
        // Check if user is logged in
        if (!is_user_logged_in()) {
            return;
        }

        // Get current user
        $current_user = wp_get_current_user();

        // Check if user has a blocked role
        foreach (self::$blocked_roles as $role) {
            if (in_array($role, $current_user->roles)) {
                // Hide admin bar
                show_admin_bar(false);
                return;
            }
        }
    }

    /**
     * Add custom message when redirecting
     *
     * Optional: You can add a query param to show a message on the frontend
     */
    public static function get_redirect_url($message = '') {
        $url = home_url();
        if (!empty($message)) {
            $url = add_query_arg(array('admin_blocked' => '1', 'message' => urlencode($message)), $url);
        }
        return $url;
    }
}

// Initialize the blocking
new Sakwood_Block_Admin_Access();
