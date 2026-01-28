<?php
/**
 * CRM Tasks REST API
 *
 * Customer-facing API for viewing their tasks
 * Maps WordPress users to CRM customers via wp_user_id field
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Tasks_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get customer tasks
        register_rest_route('sakwood/v1', '/customer/crm/tasks', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_tasks'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
                'per_page' => array(
                    'default' => 20,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ),
                'status' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));

        // Get single task
        register_rest_route('sakwood/v1', '/customer/crm/tasks/(?P<id>[0-9]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_task'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
                'id' => array(
                    'required' => true,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // Get tasks summary
        register_rest_route('sakwood/v1', '/customer/crm/tasks-summary', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_tasks_summary'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));
    }

    /**
     * Get customer tasks with pagination
     */
    public function get_tasks($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();
        $per_page = intval($request['per_page']);
        $page = intval($request['page']);
        $status = isset($request['status']) ? sanitize_text_field($request['status']) : '';

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $table_tasks = $wpdb->prefix . 'sakwood_tasks';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Build query
        $offset = ($page - 1) * $per_page;

        $query = "SELECT * FROM $table_tasks WHERE customer_id = %d";
        $params = array($customer_id);

        // Filter by status
        if (!empty($status)) {
            $query .= " AND status = %s";
            $params[] = $status;
        }

        $query .= " ORDER BY created_at DESC LIMIT %d OFFSET %d";
        $params[] = $per_page;
        $params[] = $offset;

        $tasks = $wpdb->get_results($wpdb->prepare($query, ...$params), ARRAY_A);

        // Get total count
        $count_query = "SELECT COUNT(*) FROM $table_tasks WHERE customer_id = %d";
        $count_params = array($customer_id);

        if (!empty($status)) {
            $count_query .= " AND status = %s";
            $count_params[] = $status;
        }

        $total = (int) $wpdb->get_var($wpdb->prepare($count_query, ...$count_params));

        // Format tasks
        $formatted = array_map(function($task) {
            return array(
                'id' => (int) $task['id'],
                'title' => $task['title'],
                'description' => $task['description'],
                'type' => $task['task_type'],
                'priority' => $task['priority'],
                'status' => $task['status'],
                'dueDate' => $task['due_date'],
                'completedAt' => $task['completed_at'],
                'createdAt' => $task['created_at'],
                'updatedAt' => $task['updated_at'],
            );
        }, $tasks);

        return rest_ensure_response(array(
            'tasks' => $formatted,
            'pagination' => array(
                'total' => $total,
                'perPage' => $per_page,
                'currentPage' => $page,
                'totalPages' => ceil($total / $per_page),
            ),
        ));
    }

    /**
     * Get single task
     */
    public function get_task($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();
        $task_id = intval($request['id']);

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $table_tasks = $wpdb->prefix . 'sakwood_tasks';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Get task
        $task = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_tasks WHERE id = %d AND customer_id = %d",
                $task_id,
                $customer_id
            ),
            ARRAY_A
        );

        if (!$task) {
            return new WP_Error('task_not_found', __('Task not found', 'sakwood'), array('status' => 404));
        }

        return rest_ensure_response(array(
            'id' => (int) $task['id'],
            'title' => $task['title'],
            'description' => $task['description'],
            'type' => $task['task_type'],
            'priority' => $task['priority'],
            'status' => $task['status'],
            'dueDate' => $task['due_date'],
            'assignedTo' => $task['assigned_to'] ? (int) $task['assigned_to'] : null,
            'completedAt' => $task['completed_at'],
            'createdAt' => $task['created_at'],
            'updatedAt' => $task['updated_at'],
        ));
    }

    /**
     * Get tasks summary
     */
    public function get_tasks_summary($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $table_tasks = $wpdb->prefix . 'sakwood_tasks';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Get counts by status
        $statuses = array('pending', 'in_progress', 'completed', 'cancelled');
        $summary = array();

        foreach ($statuses as $status) {
            $count = (int) $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT COUNT(*) FROM $table_tasks WHERE customer_id = %d AND status = %s",
                    $customer_id,
                    $status
                )
            );
            $summary[$status] = $count;
        }

        // Get overdue tasks count
        $overdue = (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM $table_tasks WHERE customer_id = %d AND status NOT IN ('completed', 'cancelled') AND due_date < %s",
                $customer_id,
                current_time('mysql')
            )
        );

        // Get upcoming tasks (next 7 days)
        $upcoming = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT id, title, task_type, priority, due_date FROM $table_tasks WHERE customer_id = %d AND status NOT IN ('completed', 'cancelled') AND due_date >= %s AND due_date <= DATE_ADD(%s, INTERVAL 7 DAY) ORDER BY due_date ASC LIMIT 5",
                $customer_id,
                current_time('mysql'),
                current_time('mysql')
            ),
            ARRAY_A
        );

        $formatted_upcoming = array_map(function($task) {
            return array(
                'id' => (int) $task['id'],
                'title' => $task['title'],
                'type' => $task['task_type'],
                'priority' => $task['priority'],
                'dueDate' => $task['due_date'],
            );
        }, $upcoming);

        return rest_ensure_response(array(
            'summary' => $summary,
            'overdue' => $overdue,
            'upcoming' => $formatted_upcoming,
        ));
    }
}

// Initialize
new Sakwood_CRM_Tasks_API();
