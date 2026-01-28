<?php
/**
 * CRM Task Management
 *
 * Handles follow-up tasks and reminders
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Task {

    /**
     * Create a new task
     */
    public static function create($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';

        $insert_data = array(
            'customer_id' => intval($data['customer_id']),
            'title' => sanitize_text_field($data['title']),
            'description' => isset($data['description']) ? sanitize_textarea_field($data['description']) : null,
            'task_type' => isset($data['task_type']) ? sanitize_text_field($data['task_type']) : 'follow_up',
            'priority' => isset($data['priority']) ? sanitize_text_field($data['priority']) : 'medium',
            'status' => isset($data['status']) ? sanitize_text_field($data['status']) : 'pending',
            'due_date' => isset($data['due_date']) ? sanitize_text_field($data['due_date']) : null,
            'assigned_to' => isset($data['assigned_to']) ? intval($data['assigned_to']) : get_current_user_id(),
        );

        $result = $wpdb->insert($table, $insert_data);

        if ($result) {
            $task_id = $wpdb->insert_id;

            // Schedule reminder if due date is set
            if (!empty($insert_data['due_date'])) {
                self::schedule_reminder($task_id, $insert_data['due_date']);
            }

            do_action('sakwood_crm_task_created', $task_id, $insert_data);
            return $task_id;
        }

        return false;
    }

    /**
     * Get task by ID
     */
    public static function get($task_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE id = %d",
            $task_id
        ));
    }

    /**
     * Get tasks by customer
     */
    public static function get_by_customer($customer_id, $status = '') {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';

        $where = array('customer_id = %d');
        $values = array($customer_id);

        if (!empty($status)) {
            $where[] = 'status = %s';
            $values[] = $status;
        }

        $where_clause = implode(' AND ', $where);

        return $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table WHERE $where_clause ORDER BY priority ASC, due_date ASC",
            $values
        ));
    }

    /**
     * Get tasks by assigned user
     */
    public static function get_by_assigned($user_id, $status = '') {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';
        $customers_table = $wpdb->prefix . 'sakwood_customers';

        $where = array('assigned_to = %d');
        $values = array($user_id);

        if (!empty($status)) {
            $where[] = 'status = %s';
            $values[] = $status;
        }

        $where_clause = implode(' AND ', $where);

        return $wpdb->get_results($wpdb->prepare(
            "SELECT t.*, c.first_name, c.last_name, c.email
            FROM $table t
            INNER JOIN $customers_table c ON t.customer_id = c.id
            WHERE $where_clause
            ORDER BY t.priority ASC, t.due_date ASC",
            $values
        ));
    }

    /**
     * Get upcoming/due tasks
     */
    public static function get_upcoming($limit = 10) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';
        $customers_table = $wpdb->prefix . 'sakwood_customers';

        return $wpdb->get_results($wpdb->prepare(
            "SELECT t.*, c.first_name, c.last_name, c.email
            FROM $table t
            INNER JOIN $customers_table c ON t.customer_id = c.id
            WHERE t.status IN ('pending', 'in_progress')
            ORDER BY t.priority ASC, t.due_date ASC
            LIMIT %d",
            $limit
        ));
    }

    /**
     * Get overdue tasks
     */
    public static function get_overdue() {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';
        $customers_table = $wpdb->prefix . 'sakwood_customers';

        return $wpdb->get_results(
            "SELECT t.*, c.first_name, c.last_name, c.email
            FROM $table t
            INNER JOIN $customers_table c ON t.customer_id = c.id
            WHERE t.status IN ('pending', 'in_progress')
            AND t.due_date < NOW()
            ORDER BY t.due_date ASC"
        );
    }

    /**
     * Update task
     */
    public static function update($task_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';

        $update_data = array();

        $allowed_fields = array('title', 'description', 'task_type', 'priority', 'status', 'due_date', 'assigned_to');

        foreach ($allowed_fields as $field) {
            if (isset($data[$field])) {
                if (in_array($field, array('title', 'description'))) {
                    $update_data[$field] = sanitize_text_field($data[$field]);
                } else {
                    $update_data[$field] = sanitize_text_field($data[$field]);
                }
            }
        }

        // Set completed_at when status changes to completed
        if (isset($data['status']) && $data['status'] === 'completed') {
            $update_data['completed_at'] = current_time('mysql');
        }

        if (empty($update_data)) {
            return false;
        }

        $result = $wpdb->update(
            $table,
            $update_data,
            array('id' => $task_id),
            array('%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s'),
            array('%d')
        );

        if ($result !== false) {
            do_action('sakwood_crm_task_updated', $task_id, $update_data);
        }

        return $result;
    }

    /**
     * Complete task
     */
    public static function complete($task_id) {
        return self::update($task_id, array(
            'status' => 'completed',
            'completed_at' => current_time('mysql'),
        ));
    }

    /**
     * Delete task
     */
    public static function delete($task_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_tasks';

        // Clear scheduled reminder
        wp_clear_scheduled_hook('sakwood_crm_task_reminder', array($task_id));

        do_action('sakwood_crm_task_deleted', $task_id);

        return $wpdb->delete($table, array('id' => $task_id), array('%d'));
    }

    /**
     * Schedule task reminder
     */
    private static function schedule_reminder($task_id, $due_date) {
        $due_timestamp = strtotime($due_date);
        $now = current_time('timestamp');

        // Schedule reminder 1 day before due date
        $reminder_time = $due_timestamp - DAY_IN_SECONDS;

        if ($reminder_time > $now) {
            wp_schedule_single_event($reminder_time, 'sakwood_crm_task_reminder', array($task_id));
        }
    }

    /**
     * Send task reminder
     */
    public static function send_reminder($task_id) {
        $task = self::get($task_id);

        if (!$task || $task->status === 'completed') {
            return;
        }

        $customer = Sakwood_CRM_Customer::get($task->customer_id);

        if (!$customer) {
            return;
        }

        $assigned_user = get_userdata($task->assigned_to);

        if (!$assigned_user) {
            return;
        }

        $subject = "Task Reminder: {$task->title}";
        $message = "Hi {$assigned_user->first_name},\n\n";
        $message .= "This is a reminder about a task assigned to you:\n\n";
        $message .= "Task: {$task->title}\n";
        $message .= "Customer: {$customer->first_name} {$customer->last_name}\n";
        $message .= "Due Date: " . (!empty($task->due_date) ? date('F j, Y g:i A', strtotime($task->due_date)) : 'No due date') . "\n";
        $message .= "Priority: {$task->priority}\n\n";

        if (!empty($task->description)) {
            $message .= "Description:\n{$task->description}\n\n";
        }

        $message .= "Please log in to WordPress to view and complete this task.\n\n";
        $message .= admin_url('admin.php?page=sakwood-crm-tasks');

        wp_mail($assigned_user->user_email, $subject, $message);
    }
}

/**
 * Handle scheduled task reminders
 */
add_action('sakwood_crm_task_reminder', array('Sakwood_CRM_Task', 'send_reminder'));

/**
 * Auto-create follow-up task for new orders
 */
add_action('woocommerce_new_order', function($order_id) {
    $order = wc_get_order($order_id);

    if (!$order) {
        return;
    }

    $customer = Sakwood_CRM_Customer::get_or_create_from_order($order_id);

    if (!$customer) {
        return;
    }

    // Create follow-up task for 3 days after order
    $due_date = date('Y-m-d H:i:s', strtotime('+3 days'));

    Sakwood_CRM_Task::create(array(
        'customer_id' => $customer->id,
        'title' => 'Follow up on Order #' . $order_id,
        'description' => 'Check if customer received their order and is satisfied. Ask for feedback or review.',
        'task_type' => 'follow_up',
        'priority' => 'medium',
        'due_date' => $due_date,
    ));
});

/**
 * Auto-create payment reminder task for pending payments
 */
add_action('woocommerce_order_status_pending', function($order_id) {
    $order = wc_get_order($order_id);

    if (!$order || $order->get_payment_method() !== 'promptpay') {
        return;
    }

    $customer = Sakwood_CRM_Customer::get_or_create_from_order($order_id);

    if (!$customer) {
        return;
    }

    // Check if task already exists
    $existing_tasks = Sakwood_CRM_Task::get_by_customer($customer->id, 'pending');
    $already_exists = false;

    foreach ($existing_tasks as $task) {
        if (strpos($task->title, 'Payment Reminder') !== false) {
            $already_exists = true;
            break;
        }
    }

    if (!$already_exists) {
        // Create payment reminder task for 1 day later
        $due_date = date('Y-m-d H:i:s', strtotime('+1 day'));

        Sakwood_CRM_Task::create(array(
            'customer_id' => $customer->id,
            'title' => 'Payment Reminder - Order #' . $order_id,
            'description' => 'Contact customer to remind about pending PromptPay payment. Amount: ฿' . number_format($order->get_total(), 2),
            'task_type' => 'payment_reminder',
            'priority' => 'high',
            'due_date' => $due_date,
        ));
    }
});
