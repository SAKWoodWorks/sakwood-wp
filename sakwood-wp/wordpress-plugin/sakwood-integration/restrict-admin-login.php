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
    private $allowed_domain = 'sakww.com';

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
        // Don't block if already an error (wrong password, etc.)
        if (is_wp_error($user)) {
            return $user;
        }

        // Check if logging in with email
        if (is_email($username)) {
            $domain = substr(strrchr($username, "@"), 1);

            if ($domain !== $this->allowed_domain) {
                return new WP_Error(
                    'invalid_email_domain',
                    sprintf(
                        '<strong>Error:</strong> Only company email addresses (@%s) are allowed to access this admin area.',
                        esc_html($this->allowed_domain)
                    )
                );
            }
        } else {
            // If logging in with username, get the user's email
            $user_obj = get_user_by('login', $username);

            if ($user_obj && !empty($user_obj->user_email)) {
                $domain = substr(strrchr($user_obj->user_email, "@"), 1);

                if ($domain !== $this->allowed_domain) {
                    return new WP_Error(
                        'invalid_email_domain',
                        sprintf(
                            '<strong>Error:</strong> Your account email must be from @%s to access this admin area. Please contact your administrator.',
                            esc_html($this->allowed_domain)
                        )
                    );
                }
            }
        }

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
