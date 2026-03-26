<?php
/**
 * Customer Segmentation Module
 * 
 * Main module file for customer segmentation functionality
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main module class
 */
class Sakwood_Customer_Segmentation {

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
     * Load module dependencies
     */
    private function load_dependencies() {
        require_once SAKWOOD_PLUGIN_DIR . 'includes/class-segment-database.php';
        require_once SAKWOOD_PLUGIN_DIR . 'includes/class-segment-rules-engine.php';
        require_once SAKWOOD_PLUGIN_DIR . 'includes/class-segment-assignment.php';
        require_once SAKWOOD_PLUGIN_DIR . 'api/class-segments-api.php';
        require_once SAKWOOD_PLUGIN_DIR . 'admin/class-segment-admin.php';
    }

    /**
     * Initialize WordPress hooks
     */
    private function init_hooks() {
        // Initialize database tables on plugin activation
        register_activation_hook(SAKWOOD_PLUGIN_DIR . '../sakwood-integration.php', array(__CLASS__, 'activate'));

        // Initialize components
        add_action('init', array(__CLASS__, 'init'), 1);

        // Add admin menu
        add_action('admin_menu', array(__CLASS__, 'add_admin_menu'), 30);

        // Enqueue admin scripts and styles
        add_action('admin_enqueue_scripts', array(__CLASS__, 'enqueue_admin_assets'));

        // Add dashboard widget
        add_action('wp_dashboard_setup', array(__CLASS__, 'add_dashboard_widget'));

        // Cleanup on deactivation
        register_deactivation_hook(SAKWOOD_PLUGIN_DIR . '../sakwood-integration.php', array(__CLASS__, 'deactivate'));
    }

    /**
     * Initialize module components
     */
    public static function init() {
        // Initialize database
        Sakwood_Segment_Database::init();

        // Initialize API
        Sakwood_Segments_API::init();

        // Initialize assignment hooks
        Sakwood_Segment_Assignment::init();

        // Initialize admin
        Sakwood_Segment_Admin::init();
    }

    /**
     * Activation hook
     * Create database tables
     */
    public static function activate() {
        Sakwood_Segment_Database::create_tables();
        
        // Schedule daily evaluation
        if (!wp_next_scheduled('sakwood_daily_segment_evaluation')) {
            wp_schedule_event(time(), 'daily', 'sakwood_daily_segment_evaluation');
        }

        // Set default options
        add_option('sakwood_segment_version', '1.0.0');

        // Create default segments
        self::create_default_segments();

        flush_rewrite_rules();
    }

    /**
     * Deactivation hook
     */
    public static function deactivate() {
        // Clear scheduled events
        Sakwood_Segment_Assignment::clear_schedules();

        flush_rewrite_rules();
    }

    /**
     * Create default segments
     */
    private static function create_default_segments() {
        // VIP Customers - High spenders
        Sakwood_Segment_Database::create_segment(array(
            'name' => 'VIP Customers',
            'description' => 'High-value customers with total spending over 50,000 THB',
            'type' => 'dynamic',
            'color' => '#8B5CF6',
            'rules' => array(
                array(
                    'match' => 'all',
                    'rules' => array(
                        array(
                            'type' => 'total_spent',
                            'operator' => '>=',
                            'value' => 50000,
                        ),
                    ),
                ),
            ),
            'is_active' => 1,
        ));

        // Wholesale Customers
        Sakwood_Segment_Database::create_segment(array(
            'name' => 'Wholesale Customers',
            'description' => 'Customers with wholesale role',
            'type' => 'dynamic',
            'color' => '#3B82F6',
            'rules' => array(
                array(
                    'match' => 'all',
                    'rules' => array(
                        array(
                            'type' => 'user_role',
                            'operator' => '=',
                            'value' => array('wholesale_customer'),
                        ),
                    ),
                ),
            ),
            'is_active' => 1,
        ));

        // Recent Customers - Purchased in last 30 days
        Sakwood_Segment_Database::create_segment(array(
            'name' => 'Recent Customers',
            'description' => 'Customers who purchased in the last 30 days',
            'type' => 'dynamic',
            'color' => '#10B981',
            'rules' => array(
                array(
                    'match' => 'all',
                    'rules' => array(
                        array(
                            'type' => 'last_purchase_date',
                            'operator' => 'within',
                            'value' => 30,
                        ),
                    ),
                ),
            ),
            'is_active' => 1,
        ));

        // At Risk Customers - No purchase in 90 days
        Sakwood_Segment_Database::create_segment(array(
            'name' => 'At Risk Customers',
            'description' => 'Customers who haven\'t purchased in 90+ days',
            'type' => 'dynamic',
            'color' => '#F59E0B',
            'rules' => array(
                array(
                    'match' => 'all',
                    'rules' => array(
                        array(
                            'type' => 'last_purchase_date',
                            'operator' => 'not_within',
                            'value' => 90,
                        ),
                    ),
                ),
            ),
            'is_active' => 1,
        ));

        // New Customers - Registered in last 14 days
        Sakwood_Segment_Database::create_segment(array(
            'name' => 'New Customers',
            'description' => 'Customers who registered in the last 14 days',
            'type' => 'dynamic',
            'color' => '#06B6D4',
            'rules' => array(
                array(
                    'match' => 'all',
                    'rules' => array(
                        array(
                            'type' => 'account_age',
                            'operator' => '<=',
                            'value' => 14,
                        ),
                    ),
                ),
            ),
            'is_active' => 1,
        ));
    }

    /**
     * Add admin menu
     */
    public static function add_admin_menu() {
        // Main menu
        add_menu_page(
            __('Customer Segments', 'sakwood-integration'),
            __('Segments', 'sakwood-integration'),
            'manage_woocommerce',
            'sakwood-segments',
            array(__CLASS__, 'render_segments_page'),
            'dashicons-groups',
            56
        );

        // All Segments submenu
        add_submenu_page(
            'sakwood-segments',
            __('All Segments', 'sakwood-integration'),
            __('All Segments', 'sakwood-integration'),
            'manage_woocommerce',
            'sakwood-segments',
            array(__CLASS__, 'render_segments_page')
        );

        // Add New Segment submenu
        add_submenu_page(
            'sakwood-segments',
            __('Add New Segment', 'sakwood-integration'),
            __('Add New Segment', 'sakwood-integration'),
            'manage_woocommerce',
            'sakwood-segment-new',
            array(__CLASS__, 'render_new_segment_page')
        );

        // Activity Log submenu
        add_submenu_page(
            'sakwood-segments',
            __('Activity Log', 'sakwood-integration'),
            __('Activity Log', 'sakwood-integration'),
            'manage_woocommerce',
            'sakwood-segments-activity',
            array(__CLASS__, 'render_activity_page')
        );

        // Analytics submenu
        add_submenu_page(
            'sakwood-segments',
            __('Analytics', 'sakwood-integration'),
            __('Analytics', 'sakwood-integration'),
            'manage_woocommerce',
            'sakwood-segments-analytics',
            array(__CLASS__, 'render_analytics_page')
        );
    }

    /**
     * Render segments list page
     */
    public static function render_segments_page() {
        include SAKWOOD_PLUGIN_DIR . 'admin/views/segments-list.php';
    }

    /**
     * Render new segment page
     */
    public static function render_new_segment_page() {
        include SAKWOOD_PLUGIN_DIR . 'admin/views/segment-form.php';
    }

    /**
     * Render activity log page
     */
    public static function render_activity_page() {
        include SAKWOOD_PLUGIN_DIR . 'admin/views/activity-log.php';
    }

    /**
     * Render analytics page
     */
    public static function render_analytics_page() {
        include SAKWOOD_PLUGIN_DIR . 'admin/views/analytics.php';
    }

    /**
     * Enqueue admin assets
     * 
     * @param string $hook Current admin page hook
     */
    public static function enqueue_admin_assets($hook) {
        // Only load on our pages
        if (strpos($hook, 'sakwood-segments') === false) {
            return;
        }

        // Enqueue WordPress color picker
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_script('wp-color-picker');

        // Enqueue custom styles
        wp_enqueue_style(
            'sakwood-segment-admin',
            SAKWOOD_PLUGIN_URL . 'admin/assets/css/segment-admin.css',
            array(),
            SAKWOOD_VERSION
        );

        // Enqueue custom scripts
        wp_enqueue_script(
            'sakwood-segment-admin',
            SAKWOOD_PLUGIN_URL . 'admin/assets/js/segment-admin.js',
            array('jquery', 'wp-color-picker'),
            SAKWOOD_VERSION,
            true
        );

        // Localize script with API data
        wp_localize_script('sakwood-segment-admin', 'sakwoodSegmentAdmin', array(
            'apiUrl' => rest_url('sakwood/v1'),
            'nonce' => wp_create_nonce('wp_rest'),
            'strings' => array(
                'confirmDelete' => __('Are you sure you want to delete this segment?', 'sakwood-integration'),
                'saving' => __('Saving...', 'sakwood-integration'),
                'saved' => __('Saved successfully!', 'sakwood-integration'),
                'error' => __('Error saving data', 'sakwood-integration'),
                'loading' => __('Loading...', 'sakwood-integration'),
                'noMembers' => __('No members in this segment', 'sakwood-integration'),
                'evaluate' => __('Evaluate Rules', 'sakwood-integration'),
                'evaluating' => __('Evaluating...', 'sakwood-integration'),
            ),
            'ruleTypes' => Sakwood_Segment_Rules_Engine::get_rule_types(),
        ));
    }

    /**
     * Add dashboard widget
     */
    public static function add_dashboard_widget() {
        wp_add_dashboard_widget(
            'sakwood_segments_widget',
            __('Customer Segments Overview', 'sakwood-integration'),
            array(__CLASS__, 'render_dashboard_widget')
        );
    }

    /**
     * Render dashboard widget
     */
    public static function render_dashboard_widget() {
        Sakwood_Segment_Database::init();
        
        $segments = Sakwood_Segment_Database::get_segments(array(
            'status' => 'active',
            'limit' => 5,
        ));

        include SAKWOOD_PLUGIN_DIR . 'admin/views/dashboard-widget.php';
    }

    /**
     * Get module info
     * 
     * @return array Module information
     */
    public static function get_module_info() {
        return array(
            'name' => 'Customer Segmentation',
            'version' => '1.0.0',
            'description' => 'Advanced customer segmentation for targeted marketing',
            'author' => 'Sakwood',
        );
    }
}

// Initialize the module
function sakwood_customer_segmentation_init() {
    return Sakwood_Customer_Segmentation::get_instance();
}

// Start the module
sakwood_customer_segmentation_init();
