<?php
/**
 * Sakwood Unified Dashboard
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Dashboard {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'add_dashboard_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
        add_filter('login_redirect', array($this, 'redirect_to_dashboard'), 10, 3);

        // Hide WordPress admin bar
        add_filter('show_admin_bar', '__return_false');

        // Hide all WordPress admin menus
        add_action('admin_head', array($this, 'hide_wp_menus'));
        add_action('admin_body_class', array($this, 'full_screen_class'));
    }

    public function add_dashboard_menu() {
        // Remove default dashboard
        remove_menu_page('index.php');

        // Add our dashboard as the main menu
        add_menu_page(
            'Sakwood Dashboard',
            'Dashboard',
            'edit_posts',
            'sakwood-dashboard',
            array($this, 'render_dashboard'),
            'dashicons-dashboard',
            1
        );

        // Add submenu items (placeholders for now)
        add_submenu_page(
            'sakwood-dashboard',
            'Overview',
            'Overview',
            'edit_posts',
            'sakwood-dashboard',
            array($this, 'render_dashboard')
        );
    }

    public function enqueue_assets($hook) {
        // Only load on our dashboard pages
        if (strpos($hook, 'sakwood-dashboard') === false) {
            return;
        }

        // Enqueue React app
        wp_enqueue_script(
            'sakwood-dashboard-app',
            plugins_url('dashboard/assets/js/build/dashboard.js', dirname(__FILE__)),
            array('wp-element'),
            '1.0.0',
            true
        );

        // Enqueue styles
        wp_enqueue_style(
            'sakwood-dashboard-style',
            plugins_url('dashboard/assets/css/dashboard.css', dirname(__FILE__)),
            array(),
            '1.0.0'
        );

        // Pass data to React
        wp_localize_script('sakwood-dashboard-app', 'sakwoodDashboard', array(
            'apiUrl' => rest_url('sakwood/v1/dashboard'),
            'nonce' => wp_create_nonce('wp_rest'),
            'user' => array(
                'id' => get_current_user_id(),
                'role' => wp_get_current_user()->roles[0] ?? '',
                'name' => wp_get_current_user()->display_name,
                'capabilities' => array(
                    'manage_options' => current_user_can('manage_options'),
                    'edit_posts' => current_user_can('edit_posts'),
                    'manage_woocommerce' => current_user_can('manage_woocommerce'),
                ),
            ),
        ));
    }

    public function render_dashboard() {
        ?>
        <div id="sakwood-dashboard-root"></div>
        <?php
    }

    public function redirect_to_dashboard($redirect_to, $request, $user) {
        // Redirect admins to our dashboard after login
        if (isset($user->roles) && is_array($user->roles)) {
            if (in_array('administrator', $user->roles) ||
                in_array('editor', $user->roles) ||
                in_array('shop_manager', $user->roles)) {
                return admin_url('admin.php?page=sakwood-dashboard');
            }
        }
        return $redirect_to;
    }

    /**
     * Hide WordPress admin menu and make dashboard full-screen
     */
    public function hide_wp_menus() {
        // Only hide on our dashboard page
        $screen = get_current_screen();
        if (strpos($screen->id, 'sakwood-dashboard') !== false) {
            ?>
            <style>
                /* Hide WordPress admin menu by default */
                body.sakwood-wp-menu-hidden #adminmenumain,
                body.sakwood-wp-menu-hidden #wpadminbar {
                    display: none !important;
                }

                /* Show WordPress menu when toggled */
                body.sakwood-wp-menu-visible #adminmenumain,
                body.sakwood-wp-menu-visible #wpadminbar {
                    display: block !important;
                }

                /* Enable scrolling for WordPress admin menu */
                body.sakwood-wp-menu-visible #adminmenumain {
                    overflow-y: auto !important;
                    max-height: 100vh !important;
                }

                body.sakwood-wp-menu-visible #adminmenuwrap {
                    overflow-y: auto !important;
                    max-height: calc(100vh - 32px) !important;
                }

                /* Make dashboard full screen */
                body.sakwood-wp-menu-hidden #wpbody {
                    margin-top: 0 !important;
                    margin-left: 0 !important;
                }

                /* Restore margins when menu is visible */
                body.sakwood-wp-menu-visible #wpbody {
                    margin-top: 32px !important;
                    margin-left: 160px !important;
                }

                /* Adjust our dashboard when WP menu is visible */
                body.sakwood-wp-menu-visible .sakwood-dashboard {
                    width: calc(100vw - 160px);
                    margin-left: 160px;
                    margin-top: 32px;
                    height: calc(100vh - 32px);
                }

                #wpbody-content {
                    padding-bottom: 0 !important;
                }

                /* Hide WordPress footer */
                #wpfooter {
                    display: none !important;
                }

                body {
                    overflow: hidden !important;
                }

                /* Hide screen options and help tabs */
                #screen-options-link-wrap,
                #contextual-help-link-wrap,
                #collapse-menu {
                    display: none !important;
                }
            </style>
            <script>
                // Initialize WP menu toggle state
                document.addEventListener('DOMContentLoaded', function() {
                    const wpMenuHidden = localStorage.getItem('sakwood_wp_menu_hidden') !== 'false';
                    if (wpMenuHidden) {
                        document.body.classList.add('sakwood-wp-menu-hidden');
                        document.body.classList.remove('sakwood-wp-menu-visible');
                    } else {
                        document.body.classList.add('sakwood-wp-menu-visible');
                        document.body.classList.remove('sakwood-wp-menu-hidden');
                    }

                    // Listen for toggle events from React
                    window.addEventListener('toggle-wp-menu', function(e) {
                        if (e.detail.show) {
                            document.body.classList.remove('sakwood-wp-menu-hidden');
                            document.body.classList.add('sakwood-wp-menu-visible');
                            localStorage.setItem('sakwood_wp_menu_hidden', 'false');
                        } else {
                            document.body.classList.add('sakwood-wp-menu-hidden');
                            document.body.classList.remove('sakwood-wp-menu-visible');
                            localStorage.setItem('sakwood_wp_menu_hidden', 'true');
                        }
                    });
                });
            </script>
            <?php
        }
    }

    /**
     * Add full-screen class to body
     */
    public function full_screen_class($classes) {
        $screen = get_current_screen();
        if (strpos($screen->id, 'sakwood-dashboard') !== false) {
            $classes .= ' sakwood-fullscreen';
        }
        return $classes;
    }
}

// Load API endpoints
require_once SAKWOOD_PLUGIN_DIR . 'dashboard/api/dashboard-stats.php';
require_once SAKWOOD_PLUGIN_DIR . 'dashboard/api/dashboard-activity.php';

// Initialize dashboard
function sakwood_dashboard_init() {
    return Sakwood_Dashboard::get_instance();
}
add_action('plugins_loaded', 'sakwood_dashboard_init');
