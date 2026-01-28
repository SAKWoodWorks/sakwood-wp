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

        include dirname(__FILE__) . '/templates/dashboard.php';
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

        include dirname(__FILE__) . '/templates/customers.php';
    }

    /**
     * Customer details page
     */
    public function customer_details_page() {
        $customer_id = isset($_GET['customer_id']) ? intval($_GET['customer_id']) : 0;

        if (!$customer_id) {
            wp_die('Invalid customer ID');
        }

        $customer = Sakwood_CRM_Customer::get($customer_id);
        $stats = Sakwood_CRM_Customer::get_stats($customer_id);
        $orders = Sakwood_CRM_Customer::get_orders($customer_id);
        $interactions = Sakwood_CRM_Interaction::get_by_customer($customer_id);
        $tasks = Sakwood_CRM_Task::get_by_customer($customer_id);

        include dirname(__FILE__) . '/templates/customer-details.php';
    }

    /**
     * Tasks page
     */
    public function tasks_page() {
        $user_id = get_current_user_id();
        $tasks = Sakwood_CRM_Task::get_by_assigned($user_id);
        $overdue_tasks = Sakwood_CRM_Task::get_overdue();

        include dirname(__FILE__) . '/templates/tasks.php';
    }

    /**
     * Interactions page
     */
    public function interactions_page() {
        $recent_interactions = Sakwood_CRM_Interaction::get_recent(50);

        include dirname(__FILE__) . '/templates/interactions.php';
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

        include dirname(__FILE__) . '/templates/reports.php';
    }
}

// Initialize CRM Admin
new Sakwood_CRM_Admin();

/**
 * AJAX: Save customer interaction
 */
add_action('wp_ajax_sakwood_crm_save_interaction', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $interaction_id = isset($_POST['interaction_id']) ? intval($_POST['interaction_id']) : 0;
    $customer_id = isset($_POST['customer_id']) ? intval($_POST['customer_id']) : 0;
    $interaction_type = isset($_POST['interaction_type']) ? sanitize_text_field($_POST['interaction_type']) : '';
    $subject = isset($_POST['subject']) ? sanitize_text_field($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field($_POST['message']) : '';
    $direction = isset($_POST['direction']) ? sanitize_text_field($_POST['direction']) : 'outbound';

    if (!$customer_id || empty($interaction_type) || empty($subject)) {
        wp_send_json_error(array('message' => 'Missing required fields'));
    }

    $data = array(
        'customer_id' => $customer_id,
        'interaction_type' => $interaction_type,
        'subject' => $subject,
        'message' => $message,
        'direction' => $direction,
    );

    if ($interaction_id) {
        // Update existing interaction
        $result = Sakwood_CRM_Interaction::update($interaction_id, $data);
    } else {
        // Create new interaction
        $result = Sakwood_CRM_Interaction::create($data);
    }

    if ($result) {
        wp_send_json_success(array('message' => 'Interaction saved successfully', 'interaction_id' => $result));
    } else {
        wp_send_json_error(array('message' => 'Failed to save interaction'));
    }
});

/**
 * AJAX: Save task
 */
add_action('wp_ajax_sakwood_crm_save_task', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $task_id = isset($_POST['task_id']) ? intval($_POST['task_id']) : 0;
    $customer_id = isset($_POST['customer_id']) ? intval($_POST['customer_id']) : 0;
    $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
    $description = isset($_POST['description']) ? sanitize_textarea_field($_POST['description']) : '';
    $task_type = isset($_POST['task_type']) ? sanitize_text_field($_POST['task_type']) : 'other';
    $priority = isset($_POST['priority']) ? sanitize_text_field($_POST['priority']) : 'medium';
    $due_date = isset($_POST['due_date']) ? sanitize_text_field($_POST['due_date']) : '';
    $assigned_to = isset($_POST['assigned_to']) ? sanitize_text_field($_POST['assigned_to']) : '';

    if (empty($title)) {
        wp_send_json_error(array('message' => 'Missing required field: title'));
    }

    $data = array(
        'customer_id' => $customer_id ?: null,
        'title' => $title,
        'description' => $description,
        'task_type' => $task_type,
        'priority' => $priority,
        'assigned_to' => $assigned_to,
    );

    if (!empty($due_date)) {
        $data['due_date'] = date('Y-m-d H:i:s', strtotime($due_date));
    }

    if ($task_id) {
        // Update existing task
        $result = Sakwood_CRM_Task::update($task_id, $data);
    } else {
        // Create new task
        $result = Sakwood_CRM_Task::create($data);
    }

    if ($result) {
        wp_send_json_success(array('message' => 'Task saved successfully', 'task_id' => $result));
    } else {
        wp_send_json_error(array('message' => 'Failed to save task'));
    }
});

/**
 * AJAX: Complete task
 */
add_action('wp_ajax_sakwood_crm_complete_task', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $task_id = isset($_POST['task_id']) ? intval($_POST['task_id']) : 0;

    if (!$task_id) {
        wp_send_json_error(array('message' => 'Invalid task ID'));
    }

    $result = Sakwood_CRM_Task::update($task_id, array('status' => 'completed'));

    if ($result) {
        wp_send_json_success(array('message' => 'Task completed successfully'));
    } else {
        wp_send_json_error(array('message' => 'Failed to complete task'));
    }
});

/**
 * AJAX: Reopen task
 */
add_action('wp_ajax_sakwood_crm_reopen_task', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $task_id = isset($_POST['task_id']) ? intval($_POST['task_id']) : 0;

    if (!$task_id) {
        wp_send_json_error(array('message' => 'Invalid task ID'));
    }

    $result = Sakwood_CRM_Task::update($task_id, array('status' => 'pending'));

    if ($result) {
        wp_send_json_success(array('message' => 'Task reopened successfully'));
    } else {
        wp_send_json_error(array('message' => 'Failed to reopen task'));
    }
});

/**
 * AJAX: Delete task
 */
add_action('wp_ajax_sakwood_crm_delete_task', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $task_id = isset($_POST['task_id']) ? intval($_POST['task_id']) : 0;

    if (!$task_id) {
        wp_send_json_error(array('message' => 'Invalid task ID'));
    }

    $result = Sakwood_CRM_Task::delete($task_id);

    if ($result) {
        wp_send_json_success(array('message' => 'Task deleted successfully'));
    } else {
        wp_send_json_error(array('message' => 'Failed to delete task'));
    }
});

/**
 * AJAX: Delete interaction
 */
add_action('wp_ajax_sakwood_crm_delete_interaction', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $interaction_id = isset($_POST['interaction_id']) ? intval($_POST['interaction_id']) : 0;

    if (!$interaction_id) {
        wp_send_json_error(array('message' => 'Invalid interaction ID'));
    }

    $result = Sakwood_CRM_Interaction::delete($interaction_id);

    if ($result) {
        wp_send_json_success(array('message' => 'Interaction deleted successfully'));
    } else {
        wp_send_json_error(array('message' => 'Failed to delete interaction'));
    }
});

/**
 * AJAX: Get interaction for viewing
 */
add_action('wp_ajax_sakwood_crm_get_interaction', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $interaction_id = isset($_POST['interaction_id']) ? intval($_POST['interaction_id']) : 0;

    if (!$interaction_id) {
        wp_send_json_error(array('message' => 'Invalid interaction ID'));
    }

    $result = Sakwood_CRM_Interaction::get($interaction_id);

    if ($result && $result['success']) {
        $interaction = $result['data'];
        wp_send_json_success(array(
            'id' => $interaction->id,
            'interaction_type' => $interaction->interaction_type,
            'subject' => $interaction->subject,
            'message' => $interaction->message,
            'direction' => $interaction->direction,
            'created_at' => $interaction->created_at,
            'created_by_name' => $interaction->created_by_name,
        ));
    } else {
        wp_send_json_error(array('message' => 'Interaction not found'));
    }
});

/**
 * AJAX: Get task for editing
 */
add_action('wp_ajax_sakwood_crm_get_task', function() {
    check_ajax_referer('sakwood_crm_nonce', 'nonce');

    if (!current_user_can('manage_woocommerce')) {
        wp_send_json_error(array('message' => 'Permission denied'));
    }

    $task_id = isset($_POST['task_id']) ? intval($_POST['task_id']) : 0;

    if (!$task_id) {
        wp_send_json_error(array('message' => 'Invalid task ID'));
    }

    $result = Sakwood_CRM_Task::get($task_id);

    if ($result && $result['success']) {
        $task = $result['data'];
        wp_send_json_success(array(
            'id' => $task->id,
            'customer_id' => $task->customer_id,
            'title' => $task->title,
            'description' => $task->description,
            'task_type' => $task->task_type,
            'priority' => $task->priority,
            'due_date' => $task->due_date,
            'assigned_to' => $task->assigned_to,
        ));
    } else {
        wp_send_json_error(array('message' => 'Task not found'));
    }
});

/**
 * AJAX: Export interactions to CSV
 */
add_action('wp_ajax_sakwood_crm_export_interactions', function() {
    if (!current_user_can('manage_woocommerce')) {
        wp_die('Permission denied');
    }

    // Get filters from URL parameters
    $interaction_type = isset($_GET['interaction_type']) ? sanitize_text_field($_GET['interaction_type']) : '';
    $direction = isset($_GET['direction']) ? sanitize_text_field($_GET['direction']) : '';
    $date_from = isset($_GET['date_from']) ? sanitize_text_field($_GET['date_from']) : '';
    $date_to = isset($_GET['date_to']) ? sanitize_text_field($_GET['date_to']) : '';
    $customer_id = isset($_GET['customer_id']) ? intval($_GET['customer_id']) : '';

    $args = array(
        'interaction_type' => $interaction_type,
        'direction' => $direction,
        'date_from' => $date_from,
        'date_to' => $date_to,
        'customer_id' => $customer_id,
        'limit' => 10000,
    );

    $result = Sakwood_CRM_Interaction::get_interactions($args);

    if (!$result['success']) {
        wp_die('No interactions to export');
    }

    $interactions = $result['data'];

    // Set headers for CSV download
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="interactions-export-' . date('Y-m-d') . '.csv"');

    // Open output stream
    $output = fopen('php://output', 'w');

    // Add CSV headers
    fputcsv($output, array(
        'ID',
        'Date',
        'Customer',
        'Type',
        'Direction',
        'Subject',
        'Message',
        'Created By',
    ));

    // Add data rows
    foreach ($interactions as $interaction) {
        fputcsv($output, array(
            $interaction->id,
            $interaction->created_at,
            isset($interaction->customer_name) ? $interaction->customer_name : '',
            $interaction->interaction_type,
            $interaction->direction,
            $interaction->subject,
            $interaction->message,
            $interaction->created_by_name,
        ));
    }

    fclose($output);
    exit;
});
