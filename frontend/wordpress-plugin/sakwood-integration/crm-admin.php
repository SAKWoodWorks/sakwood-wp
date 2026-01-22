<?php
/**
 * CRM Admin Dashboard
 *
 * WordPress admin interface for customer relationship management
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Admin {

    /**
     * Initialize admin interface
     */
    public function __construct() {
        add_action('admin_menu', array($this, 'add_menu_pages'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
    }

    /**
     * Add CRM menu pages
     */
    public function add_menu_pages() {
        // Main CRM Dashboard
        add_menu_page(
            'CRM Dashboard',
            'CRM',
            'manage_woocommerce',
            'sakwood-crm',
            array($this, 'dashboard_page'),
            'dashicons-groups',
            30
        );

        // Customers
        add_submenu_page(
            'sakwood-crm',
            'Customers',
            'Customers',
            'manage_woocommerce',
            'sakwood-crm-customers',
            array($this, 'customers_page')
        );

        // Customer Details (hidden menu)
        add_submenu_page(
            null,
            'Customer Details',
            'Customer Details',
            'manage_woocommerce',
            'sakwood-crm-customer',
            array($this, 'customer_details_page')
        );

        // Tasks
        add_submenu_page(
            'sakwood-crm',
            'Tasks',
            'Tasks',
            'manage_woocommerce',
            'sakwood-crm-tasks',
            array($this, 'tasks_page')
        );

        // Interactions
        add_submenu_page(
            'sakwood-crm',
            'Interactions',
            'Interactions',
            'manage_woocommerce',
            'sakwood-crm-interactions',
            array($this, 'interactions_page')
        );

        // Reports
        add_submenu_page(
            'sakwood-crm',
            'Reports',
            'Reports',
            'manage_woocommerce',
            'sakwood-crm-reports',
            array($this, 'reports_page')
        );
    }

    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_scripts($hook) {
        // Only load on CRM pages
        if (strpos($hook, 'sakwood-crm') === false) {
            return;
        }

        wp_enqueue_style('sakwood-crm-admin', plugins_url('assets/css/crm-admin.css', __FILE__), array(), '1.0.0');
        wp_enqueue_script('sakwood-crm-admin', plugins_url('assets/js/crm-admin.js', __FILE__), array('jquery'), '1.0.0', true);

        wp_localize_script('sakwood-crm-admin', 'sakwoodCRM', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sakwood_crm_nonce'),
        ));
    }

    /**
     * Dashboard page
     */
    public function dashboard_page() {
        global $wpdb;

        $customers_table = $wpdb->prefix . 'sakwood_customers';
        $interactions_table = $wpdb->prefix . 'sakwood_interactions';
        $tasks_table = $wpdb->prefix . 'sakwood_tasks';

        // Get statistics
        $total_customers = $wpdb->get_var("SELECT COUNT(*) FROM $customers_table");
        $total_vip = $wpdb->get_var("SELECT COUNT(*) FROM $customers_table WHERE customer_type = 'vip'");
        $total_wholesale = $wpdb->get_var("SELECT COUNT(*) FROM $customers_table WHERE customer_type = 'wholesale'");
        $pending_tasks = $wpdb->get_var("SELECT COUNT(*) FROM $tasks_table WHERE status = 'pending'");
        $overdue_tasks = $wpdb->get_var("SELECT COUNT(*) FROM $tasks_table WHERE status = 'pending' AND due_date < NOW()");

        // Get recent customers
        $recent_customers = $wpdb->get_results(
            "SELECT * FROM $customers_table ORDER BY created_at DESC LIMIT 5"
        );

        // Get upcoming tasks
        $upcoming_tasks = Sakwood_CRM_Task::get_upcoming(5);

        // Get recent interactions
        $recent_interactions = Sakwood_CRM_Interaction::get_recent(5);

        include plugin_dir_path(__FILE__) . 'templates/dashboard.php';
    }

    /**
     * Customers page
     */
    public function customers_page() {
        $page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
        $per_page = 20;
        $offset = ($page - 1) * $per_page;

        $filters = array(
            'limit' => $per_page,
            'offset' => $offset,
        );

        if (!empty($_GET['customer_type'])) {
            $filters['customer_type'] = sanitize_text_field($_GET['customer_type']);
        }

        if (!empty($_GET['status'])) {
            $filters['status'] = sanitize_text_field($_GET['status']);
        }

        if (!empty($_GET['s'])) {
            $filters['search'] = sanitize_text_field($_GET['s']);
        }

        $result = Sakwood_CRM_Customer::get_all($filters);

        // Ensure result has all required keys
        if (!isset($result['customers'])) {
            $result['customers'] = array();
        }
        if (!isset($result['total'])) {
            $result['total'] = 0;
        }
        if (!isset($result['pages'])) {
            $result['pages'] = 1;
        }

        include plugin_dir_path(__FILE__) . 'templates/customers.php';
    }

    /**
     * Tasks page
     */
    public function tasks_page() {
        $user_id = get_current_user_id();
        $tasks = Sakwood_CRM_Task::get_by_assigned($user_id);
        $overdue_tasks = Sakwood_CRM_Task::get_overdue();

        include plugin_dir_path(__FILE__) . 'templates/tasks.php';
    }

    /**
     * Interactions page
     */
    public function interactions_page() {
        $recent_interactions = Sakwood_CRM_Interaction::get_recent(50);

        include plugin_dir_path(__FILE__) . 'templates/interactions.php';
    }

    /**
     * Reports page
     */
    public function reports_page() {
        global $wpdb;

        $customers_table = $wpdb->prefix . 'sakwood_customers';
        $interactions_table = $wpdb->prefix . 'sakwood_interactions';

        // Customer type distribution
        $type_distribution = $wpdb->get_results(
            "SELECT customer_type, COUNT(*) as count FROM $customers_table GROUP BY customer_type"
        );

        // Top customers by spending
        $top_customers = $wpdb->get_results(
            "SELECT * FROM $customers_table ORDER BY total_spent DESC LIMIT 10"
        );

        // New customers this month
        $new_this_month = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $customers_table WHERE created_at >= %s",
            date('Y-m-01')
        ));

        // Total revenue
        $total_revenue = $wpdb->get_var("SELECT SUM(total_spent) FROM $customers_table");

        // Average order value
        $avg_order_value = $wpdb->get_var(
            "SELECT AVG(total_spent / GREATEST(total_orders, 1)) FROM $customers_table WHERE total_orders > 0"
        );

        // Interaction stats
        $interaction_stats = Sakwood_CRM_Interaction::get_stats(30);

        include plugin_dir_path(__FILE__) . 'templates/reports.php';
    }
}

// Initialize CRM Admin
new Sakwood_CRM_Admin();

/**
 * AJAX: Save customer interaction
 */
add_action('wp_ajax_sakwood_save_interaction', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error('Permission denied');
    }

    $customer_id = isset($_POST['customer_id']) ? intval($_POST['customer_id']) : 0;
    $interaction_type = isset($_POST['interaction_type']) ? sanitize_text_field($_POST['interaction_type']) : '';
    $subject = isset($_POST['subject']) ? sanitize_text_field($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field($_POST['message']) : '';
    $direction = isset($_POST['direction']) ? sanitize_text_field($_POST['direction']) : 'outbound';

    if (!$customer_id || empty($interaction_type)) {
        wp_send_json_error('Missing required fields');
    }

    $interaction_id = Sakwood_CRM_Interaction::create(array(
        'customer_id' => $customer_id,
        'interaction_type' => $interaction_type,
        'subject' => $subject,
        'message' => $message,
        'direction' => $direction,
    ));

    if ($interaction_id) {
        wp_send_json_success(array('interaction_id' => $interaction_id));
    } else {
        wp_send_json_error('Failed to save interaction');
    }
});

/**
 * AJAX: Save task
 */
add_action('wp_ajax_sakwood_save_task', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error('Permission denied');
    }

    $customer_id = isset($_POST['customer_id']) ? intval($_POST['customer_id']) : 0;
    $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
    $description = isset($_POST['description']) ? sanitize_textarea_field($_POST['description']) : '';
    $task_type = isset($_POST['task_type']) ? sanitize_text_field($_POST['task_type']) : 'follow_up';
    $priority = isset($_POST['priority']) ? sanitize_text_field($_POST['priority']) : 'medium';
    $due_date = isset($_POST['due_date']) ? sanitize_text_field($_POST['due_date']) : '';

    if (!$customer_id || empty($title)) {
        wp_send_json_error('Missing required fields');
    }

    $task_id = Sakwood_CRM_Task::create(array(
        'customer_id' => $customer_id,
        'title' => $title,
        'description' => $description,
        'task_type' => $task_type,
        'priority' => $priority,
        'due_date' => !empty($due_date) ? date('Y-m-d H:i:s', strtotime($due_date)) : null,
    ));

    if ($task_id) {
        wp_send_json_success(array('task_id' => $task_id));
    } else {
        wp_send_json_error('Failed to create task');
    }
});

/**
 * AJAX: Complete task
 */
add_action('wp_ajax_sakwood_complete_task', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error('Permission denied');
    }

    $task_id = isset($_POST['task_id']) ? intval($_POST['task_id']) : 0;

    if (!$task_id) {
        wp_send_json_error('Invalid task ID');
    }

    $result = Sakwood_CRM_Task::complete($task_id);

    if ($result !== false) {
        wp_send_json_success('Task completed');
    } else {
        wp_send_json_error('Failed to complete task');
    }
});

/**
 * AJAX: Update customer
 */
add_action('wp_ajax_sakwood_update_customer', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error('Permission denied');
    }

    $customer_id = isset($_POST['customer_id']) ? intval($_POST['customer_id']) : 0;
    $field = isset($_POST['field']) ? sanitize_text_field($_POST['field']) : '';
    $value = isset($_POST['value']) ? sanitize_text_field($_POST['value']) : '';

    if (!$customer_id || empty($field)) {
        wp_send_json_error('Missing required fields');
    }

    $result = Sakwood_CRM_Customer::update($customer_id, array($field => $value));

    if ($result !== false) {
        wp_send_json_success('Customer updated');
    } else {
        wp_send_json_error('Failed to update customer');
    }
});
