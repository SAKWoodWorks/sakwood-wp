<?php
/**
 * Plugin Name: Sakwood Integration
 * Plugin URI: https://sakwood.com
 * Description: Integration plugin for Sakwood Next.js frontend - adds custom post types, REST API endpoints, and admin functionality
 * Version: 1.0.0
 * Author: Sakwood
 * Author URI: https://sakwood.com
 * Text Domain: sakwood-integration
 * Requires at least: 5.8
 * Requires PHP: 7.4
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SAKWOOD_VERSION', '1.0.0');
define('SAKWOOD_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SAKWOOD_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main plugin class
 */
class Sakwood_Integration {

    /**
     * Singleton instance
     */
    private static $instance = null;

    /**
     * Get singleton instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->load_dependencies();
        $this->init_hooks();
    }

    /**
     * Load plugin dependencies
     */
    private function load_dependencies() {
        // Load Hero Slides CPT
        require_once SAKWOOD_PLUGIN_DIR . 'hero-slides-cpt.php';

        // Load PromptPay Admin
        require_once SAKWOOD_PLUGIN_DIR . 'promptpay-admin.php';

        // Load CRM components
        require_once SAKWOOD_PLUGIN_DIR . 'crm-database.php';
        require_once SAKWOOD_PLUGIN_DIR . 'crm-customers.php';
        require_once SAKWOOD_PLUGIN_DIR . 'crm-interactions.php';
        require_once SAKWOOD_PLUGIN_DIR . 'crm-tasks.php';
        require_once SAKWOOD_PLUGIN_DIR . 'crm-admin.php';

        // Load Wholesale components
        require_once SAKWOOD_PLUGIN_DIR . 'wholesale-database.php';
        require_once SAKWOOD_PLUGIN_DIR . 'wholesale-admin.php';
        require_once SAKWOOD_PLUGIN_DIR . 'wholesale-api.php';

        // Load Dealer components
        require_once SAKWOOD_PLUGIN_DIR . 'includes/database/dealer-database.php';
        require_once SAKWOOD_PLUGIN_DIR . 'dealer-api.php';

        // Load Popup Settings
        require_once SAKWOOD_PLUGIN_DIR . 'popup-settings.php';

        // Load Chat Settings
        require_once SAKWOOD_PLUGIN_DIR . 'chat-settings.php';

        // Load Contact Form API
        require_once SAKWOOD_PLUGIN_DIR . 'contact-form-api.php';

        // Load Contact Form CPT
        require_once SAKWOOD_PLUGIN_DIR . 'contact-form-cpt.php';

        // Load Product Dimensions
        require_once SAKWOOD_PLUGIN_DIR . 'product-dimensions.php';

        // Load Product Admin Fields
        require_once SAKWOOD_PLUGIN_DIR . 'product-admin-fields.php';

        // Load Product Language Meta Fields (NEW SYSTEM - 1 product with 2 languages)
        require_once SAKWOOD_PLUGIN_DIR . 'product-language.php';

        // Load Blog Language Translation (adds English translation meta fields and language column)
        require_once SAKWOOD_PLUGIN_DIR . 'blog-language-translation.php';

        // Load Blog Language Meta Box
        require_once SAKWOOD_PLUGIN_DIR . 'blog-language-meta-box.php';

        // Load Blog Language GraphQL
        require_once SAKWOOD_PLUGIN_DIR . 'blog-language-graphql.php';

        // Load Blog REST API
        require_once SAKWOOD_PLUGIN_DIR . 'blog-rest-api.php';

        // Load Product API
        require_once SAKWOOD_PLUGIN_DIR . 'product-api.php';

        // Load Product Price Types
        require_once SAKWOOD_PLUGIN_DIR . 'product-price-types.php';

        // Load Product Bulk Import
        require_once SAKWOOD_PLUGIN_DIR . 'product-bulk-import.php';

        // Load Customer Orders API (DEV MODE - No authentication for testing)
        require_once SAKWOOD_PLUGIN_DIR . 'customer-orders-api-dev.php';
        // Production version (requires JWT auth):
        // require_once SAKWOOD_PLUGIN_DIR . 'customer-orders-api.php';

        // Load Customer Addresses API
        require_once SAKWOOD_PLUGIN_DIR . 'customer-addresses-api.php';

        // Load Customer Profile API
        require_once SAKWOOD_PLUGIN_DIR . 'customer-profile-api.php';

        // Load Password Reset API
        require_once SAKWOOD_PLUGIN_DIR . 'password-reset-api.php';

        // Load User Roles and Management
        require_once SAKWOOD_PLUGIN_DIR . 'user-roles.php';
        require_once SAKWOOD_PLUGIN_DIR . 'user-management.php';
        require_once SAKWOOD_PLUGIN_DIR . 'password-management.php';

        // Load Admin Access Blocking (Security - prevents customers from accessing wp-admin)
        require_once SAKWOOD_PLUGIN_DIR . 'block-admin-access.php';

        // Load Login Restriction (Security - only allows @sakww.com emails)
        require_once SAKWOOD_PLUGIN_DIR . 'restrict-admin-login.php';

        // Load FAQ System
        require_once SAKWOOD_PLUGIN_DIR . 'faq-cpt.php';
        require_once SAKWOOD_PLUGIN_DIR . 'faq-rest-api.php';

        // Load Video Gallery
        require_once SAKWOOD_PLUGIN_DIR . 'video-gallery-cpt.php';
        require_once SAKWOOD_PLUGIN_DIR . 'video-gallery-api.php';

        // Load Knowledge Base
        require_once SAKWOOD_PLUGIN_DIR . 'knowledge-base-cpt.php';
        require_once SAKWOOD_PLUGIN_DIR . 'knowledge-base-taxonomy.php';
        require_once SAKWOOD_PLUGIN_DIR . 'knowledge-base-rest-api.php';

        // Load CRM Customer-Facing APIs
        require_once SAKWOOD_PLUGIN_DIR . 'crm-customer-api.php';
        require_once SAKWOOD_PLUGIN_DIR . 'crm-interactions-api.php';
        require_once SAKWOOD_PLUGIN_DIR . 'crm-tasks-api.php';

        // Load Demo Data Generator
        require_once SAKWOOD_PLUGIN_DIR . 'demo-data.php';

        // Load Menu REST API
        require_once SAKWOOD_PLUGIN_DIR . 'menu-rest-api.php';

        // Load Unified Dashboard
        require_once SAKWOOD_PLUGIN_DIR . 'dashboard/sakwood-dashboard.php';

        // Initialize CRM database
        $crm_db = new Sakwood_CRM_Database();

        // Initialize Wholesale database
        Sakwood_Wholesale_Database::create_tables();
    }

    /**
     * Initialize WordPress hooks
     */
    private function init_hooks() {
        add_action('plugins_loaded', array($this, 'load_textdomain'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('after_setup_theme', array($this, 'register_menu_locations'));
    }

    /**
     * Register menu locations for multilingual support
     */
    public function register_menu_locations() {
        register_nav_menus(array(
            'PRIMARY_TH' => __('Primary Menu Thai', 'sakwood-integration'),
            'PRIMARY_EN' => __('Primary Menu English', 'sakwood-integration'),
        ));
    }

    /**
     * Load plugin text domain
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'sakwood-integration',
            false,
            dirname(plugin_basename(__FILE__)) . '/languages'
        );
    }

    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        wp_enqueue_style(
            'sakwood-integration',
            SAKWOOD_PLUGIN_URL . 'assets/css/sakwood-integration.css',
            array(),
            SAKWOOD_VERSION
        );

        wp_enqueue_script(
            'sakwood-integration',
            SAKWOOD_PLUGIN_URL . 'assets/js/sakwood-integration.js',
            array('jquery'),
            SAKWOOD_VERSION,
            true
        );

        wp_localize_script('sakwood-integration', 'sakwoodData', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sakwood-ajax-nonce'),
        ));
    }
}

/**
 * Initialize the plugin
 */
function sakwood_integration_init() {
    return Sakwood_Integration::get_instance();
}

// Start the plugin
sakwood_integration_init();

/**
 * Activation hook
 */
register_activation_hook(__FILE__, 'sakwood_integration_activate');
function sakwood_integration_activate() {
    // Flush rewrite rules after activation
    flush_rewrite_rules();

    // Create CRM database tables
    Sakwood_CRM_Database::create_tables();

    // Create Wholesale database tables
    Sakwood_Wholesale_Database::create_tables();

    // Dealer database tables are created automatically via admin_init hook
    // Trigger dealer database creation
    $dealer_db = new Sakwood_Dealer_Database();

    // Register all custom user roles
    Sakwood_User_Roles::register_roles();

    // Set default options
    add_option('sakwood_promptpay_merchant_id', '0225559000467');
    add_option('sakwood_promptpay_auto_verify', 0);
    add_option('sakwood_promptpay_pending_status', 1);
}

/**
 * Deactivation hook
 */
register_deactivation_hook(__FILE__, 'sakwood_integration_deactivate');
function sakwood_integration_deactivate() {
    // Flush rewrite rules after deactivation
    flush_rewrite_rules();
}
