<?php
/**
 * Restrict WordPress admin login to @sakww.com email addresses only
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Login_Restriction {

    private static $instance = null;
    private $allowed_domains = array('sakww.com', 'sakwood.com'); // Add more domains: array('sakww.com', 'sakwood.com', 'another-domain.com')

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Filter authentication to check email domain
        add_filter('authenticate', array($this, 'restrict_login_by_email_domain'), 30, 3);

        // Add error message styling
        add_action('login_head', array($this, 'add_error_styles'));
    }

    /**
     * Restrict login to @sakww.com email addresses only
     */
    public function restrict_login_by_email_domain($user, $username, $password) {
        // Check email domain FIRST, before other authentication
        $allowed = false;
        $email_to_check = '';

        // Determine email to check
        if (is_email($username)) {
            // Logging in with email address
            $email_to_check = $username;
        } else {
            // Logging in with username - get user's email
            $user_obj = get_user_by('login', $username);
            if ($user_obj && !empty($user_obj->user_email)) {
                $email_to_check = $user_obj->user_email;
            }
        }

        // Check if email domain is allowed
        if (!empty($email_to_check)) {
            $domain = substr(strrchr($email_to_check, "@"), 1);

            if (in_array($domain, $this->allowed_domains)) {
                $allowed = true;
            }
        }

        // If domain is NOT allowed, block immediately
        if (!$allowed && !empty($email_to_check)) {
            return new WP_Error(
                'invalid_email_domain',
                '<strong>Error:</strong> Only company email addresses are allowed to access this admin area.'
            );
        }

        // Domain is allowed (or no email found), proceed with normal authentication
        // Return the user result (might be WP_Error for wrong password, etc.)
        return $user;
    }

    /**
     * Add custom styling for error messages
     */
    public function add_error_styles() {
        ?>
        <style>
            #login_error {
                border-left: 4px solid #d63638 !important;
                padding: 12px !important;
                margin: 0 0 20px !important;
            }
        </style>
        <?php
    }
}

// Initialize login restriction
function sakwood_login_restriction_init() {
    return Sakwood_Login_Restriction::get_instance();
}
add_action('plugins_loaded', 'sakwood_login_restriction_init');
