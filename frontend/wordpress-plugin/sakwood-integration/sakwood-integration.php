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

        // Load Language Meta Boxes
        require_once SAKWOOD_PLUGIN_DIR . 'blog-language-meta-box.php';
        require_once SAKWOOD_PLUGIN_DIR . 'product-language-meta-box.php';

        // Load Product Dimensions
        require_once SAKWOOD_PLUGIN_DIR . 'product-dimensions-meta-box.php';
        require_once SAKWOOD_PLUGIN_DIR . 'product-dimensions-graphql.php';

        // Load GraphQL files
        require_once SAKWOOD_PLUGIN_DIR . 'language-enum.php';
        require_once SAKWOOD_PLUGIN_DIR . 'blog-language-graphql.php';
        // Product GraphQL filter temporarily disabled
        // require_once SAKWOOD_PLUGIN_DIR . 'product-language-graphql.php';

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

        // Load Popup Settings
        require_once SAKWOOD_PLUGIN_DIR . 'popup-settings.php';
        require_once SAKWOOD_PLUGIN_DIR . 'popup-api.php';

        // Load REST API endpoints
        require_once SAKWOOD_PLUGIN_DIR . 'rest-api.php';
        require_once SAKWOOD_PLUGIN_DIR . 'blog-rest-api.php';
        require_once SAKWOOD_PLUGIN_DIR . 'product-rest-api.php';
        require_once SAKWOOD_PLUGIN_DIR . 'create-order.php';
        require_once SAKWOOD_PLUGIN_DIR . 'get-order.php';

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

    // Add wholesale customer role
    add_role(
        'wholesale_customer',
        'Wholesale Customer',
        array(
            'read' => true,
            'edit_posts' => false,
            'delete_posts' => false,
        )
    );

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
