<?php
/**
 * CRM Tasks Management Template
 * Displays all tasks with filters, search, and quick actions
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Get current page and pagination parameters
$page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
$per_page = 20;
$offset = ($page - 1) * $per_page;

// Get filters
$status = isset($_GET['status']) ? sanitize_text_field($_GET['status']) : '';
$priority = isset($_GET['priority']) ? sanitize_text_field($_GET['priority']) : '';
$task_type = isset($_GET['task_type']) ? sanitize_text_field($_GET['task_type']) : '';
$assigned_to = isset($_GET['assigned_to']) ? sanitize_text_field($_GET['assigned_to']) : '';
$search = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';

// Build query args for fetching tasks
$args = [
    'status' => $status,
    'priority' => $priority,
    'task_type' => $task_type,
    'assigned_to' => $assigned_to,
    'search' => $search,
    'offset' => $offset,
    'limit' => $per_page,
];

// Fetch tasks using the CRM class
if (class_exists('Sakwood_CRM_Task')) {
    $tasks_result = Sakwood_CRM_Task::get_tasks($args);
    $tasks = $tasks_result['success'] ? $tasks_result['data'] : [];
    $total = Sakwood_CRM_Task::get_total_count($args);
} else {
    $tasks = [];
    $total = 0;
}

// Build URL for filters
$base_url = admin_url('admin.php?page=sakwood-crm-tasks');
?>

<div class="wrap sakwood-crm-tasks">
    <h1 class="wp-heading-inline"><?php _e('Tasks', 'sakwood'); ?></h1>

    <a href="#" class="page-title-action crm-add-task-btn">
        <?php _e('Add New Task', 'sakwood'); ?>
    </a>

    <hr class="wp-header-end">

    <!-- Filters -->
    <div class="crm-filters" style="margin: 20px 0; padding: 15px; background: #fff; border: 1px solid #ccd0d4; border-radius: 4px;">
        <form method="get" action="<?php echo esc_url($base_url); ?>">
            <input type="hidden" name="page" value="sakwood-crm-tasks">

            <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: end;">
                <!-- Search -->
                <div style="flex: 1; min-width: 200px;">
                    <label for="crm-search" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Search', 'sakwood'); ?>
                    </label>
                    <input type="text"
                           name="s"
                           id="crm-search"
                           value="<?php echo esc_attr($search); ?>"
                           placeholder="<?php _e('Search by title or customer name...', 'sakwood'); ?>"
                           style="width: 100%; max-width: 300px; padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                </div>

                <!-- Status Filter -->
                <div>
                    <label for="crm-status-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Status', 'sakwood'); ?>
                    </label>
                    <select name="status" id="crm-status-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value=""><?php _e('All Status', 'sakwood'); ?></option>
                        <option value="pending" <?php selected($status, 'pending'); ?>><?php _e('Pending', 'sakwood'); ?></option>
                        <option value="in_progress" <?php selected($status, 'in_progress'); ?>><?php _e('In Progress', 'sakwood'); ?></option>
                        <option value="completed" <?php selected($status, 'completed'); ?>><?php _e('Completed', 'sakwood'); ?></option>
                    </select>
                </div>

                <!-- Priority Filter -->
                <div>
                    <label for="crm-priority-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Priority', 'sakwood'); ?>
                    </label>
                    <select name="priority" id="crm-priority-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value=""><?php _e('All Priorities', 'sakwood'); ?></option>
                        <option value="low" <?php selected($priority, 'low'); ?>><?php _e('Low', 'sakwood'); ?></option>
                        <option value="medium" <?php selected($priority, 'medium'); ?>><?php _e('Medium', 'sakwood'); ?></option>
                        <option value="high" <?php selected($priority, 'high'); ?>><?php _e('High', 'sakwood'); ?></option>
                        <option value="urgent" <?php selected($priority, 'urgent'); ?>><?php _e('Urgent', 'sakwood'); ?></option>
                    </select>
                </div>

                <!-- Task Type Filter -->
                <div>
                    <label for="crm-type-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Task Type', 'sakwood'); ?>
                    </label>
                    <select name="task_type" id="crm-type-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value=""><?php _e('All Types', 'sakwood'); ?></option>
                        <option value="follow_up" <?php selected($task_type, 'follow_up'); ?>><?php _e('Follow Up', 'sakwood'); ?></option>
                        <option value="payment_reminder" <?php selected($task_type, 'payment_reminder'); ?>><?php _e('Payment Reminder', 'sakwood'); ?></option>
                        <option value="order_followup" <?php selected($task_type, 'order_followup'); ?>><?php _e('Order Follow-up', 'sakwood'); ?></option>
                        <option value="quote_request" <?php selected($task_type, 'quote_request'); ?>><?php _e('Quote Request', 'sakwood'); ?></option>
                        <option value="support" <?php selected($task_type, 'support'); ?>><?php _e('Support', 'sakwood'); ?></option>
                        <option value="other" <?php selected($task_type, 'other'); ?>><?php _e('Other', 'sakwood'); ?></option>
                    </select>
                </div>

                <!-- Assigned To Filter -->
                <div>
                    <label for="crm-assigned-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Assigned To', 'sakwood'); ?>
                    </label>
                    <input type="text"
                           name="assigned_to"
                           id="crm-assigned-filter"
                           value="<?php echo esc_attr($assigned_to); ?>"
                           placeholder="<?php _e('Enter name...', 'sakwood'); ?>"
                           style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                </div>

                <!-- Filter Button -->
                <div>
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">&nbsp;</label>
                    <button type="submit" class="button" style="padding: 8px 16px;">
                        <?php _e('Filter', 'sakwood'); ?>
                    </button>
                    <a href="<?php echo esc_url($base_url); ?>" class="button" style="padding: 8px 16px; margin-left: 5px;">
                        <?php _e('Reset', 'sakwood'); ?>
                    </a>
                </div>
            </div>
        </form>
    </div>

    <!-- Tasks Table -->
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th scope="col" style="width: 5%;"></th>
                <th scope="col" style="width: 30%;"><?php _e('Task', 'sakwood'); ?></th>
                <th scope="col" style="width: 15%;"><?php _e('Customer', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Type', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Priority', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Due Date', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Status', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Actions', 'sakwood'); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($tasks)): ?>
                <tr>
                    <td colspan="8">
                        <?php _e('No tasks found.', 'sakwood'); ?>
                    </td>
                </tr>
            <?php else: ?>
                <?php foreach ($tasks as $task): ?>
                    <?php
                    $is_overdue = $task->due_date && strtotime($task->due_date) < time() && $task->status !== 'completed';
                    ?>
                    <tr class="<?php echo $is_overdue ? 'crm-task-overdue' : ''; ?>"
                        style="<?php echo $is_overdue ? 'background: #fff6f6 !important; border-left: 4px solid #d63638;' : ''; ?>">
                        <td>
                            <?php if ($task->status === 'completed'): ?>
                                <span style="color: #00a32a; font-size: 18px;">✓</span>
                            <?php elseif ($is_overdue): ?>
                                <span style="color: #d63638; font-size: 18px;">⚠</span>
                            <?php else: ?>
                                <span style="color: #646970; font-size: 18px;">○</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <strong>
                                <a href="#" class="crm-view-task-link" data-task-id="<?php echo esc_attr($task->id); ?>">
                                    <?php echo esc_html($task->title); ?>
                                </a>
                            </strong>
                            <?php if ($task->description): ?>
                                <p style="margin: 5px 0 0 0; font-size: 12px; color: #646970;">
                                    <?php echo esc_html(substr($task->description, 0, 80)); ?>
                                    <?php echo strlen($task->description) > 80 ? '...' : ''; ?>
                                </p>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if (isset($task->customer_name)): ?>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $task->customer_id)); ?>">
                                    <?php echo esc_html($task->customer_name); ?>
                                </a>
                            <?php else: ?>
                                <span style="color: #646970;">—</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php
                            $type_labels = [
                                'follow_up' => __('Follow Up', 'sakwood'),
                                'payment_reminder' => __('Payment Reminder', 'sakwood'),
                                'order_followup' => __('Order Follow-up', 'sakwood'),
                                'quote_request' => __('Quote Request', 'sakwood'),
                                'support' => __('Support', 'sakwood'),
                                'other' => __('Other', 'sakwood'),
                            ];
                            echo esc_html($type_labels[$task->task_type] ?? ucfirst($task->task_type));
                            ?>
                        </td>
                        <td>
                            <span class="crm-priority-badge crm-priority-<?php echo esc_attr($task->priority); ?>"
                                  style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;
                                  <?php
                                  $priority_colors = [
                                      'low' => 'background: #f0f0f1; color: #1d2327;',
                                      'medium' => 'background: #dbe5ff; color: #1855b3;',
                                      'high' => 'background: #fcf3e5; color: #d47b0a;',
                                      'urgent' => 'background: #fcaba0; color: #8a2487;',
                                  ];
                                  echo $priority_colors[$task->priority] ?? $priority_colors['medium'];
                                  ?>">
                                <?php echo ucfirst(esc_html($task->priority)); ?>
                            </span>
                        </td>
                        <td>
                            <?php if ($task->due_date): ?>
                                <span style="<?php echo $is_overdue ? 'color: #d63638; font-weight: 600;' : ''; ?>">
                                    <?php echo date_i18n(get_option('date_format'), strtotime($task->due_date)); ?>
                                </span>
                            <?php else: ?>
                                <span style="color: #646970;">—</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <span class="crm-status-badge crm-status-<?php echo esc_attr($task->status); ?>"
                                  style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;
                                  <?php
                                  $status_colors = [
                                      'pending' => 'background: #fcf3e5; color: #d47b0a;',
                                      'in_progress' => 'background: #dbe5ff; color: #1855b3;',
                                      'completed' => 'background: #d7edc9; color: #1c5c1f;',
                                  ];
                                  echo $status_colors[$task->status] ?? $status_colors['pending'];
                                  ?>">
                                <?php
                                $status_labels = [
                                    'pending' => __('Pending', 'sakwood'),
                                    'in_progress' => __('In Progress', 'sakwood'),
                                    'completed' => __('Completed', 'sakwood'),
                                ];
                                echo $status_labels[$task->status] ?? ucfirst($task->status);
                                ?>
                            </span>
                        </td>
                        <td>
                            <div class="row-actions">
                                <?php if ($task->status !== 'completed'): ?>
                                    <a href="#" class="crm-complete-task-action" data-task-id="<?php echo esc_attr($task->id); ?>">
                                        <?php _e('Complete', 'sakwood'); ?>
                                    </a>
                                    <span class="divider">|</span>
                                    <a href="#" class="crm-start-task-action" data-task-id="<?php echo esc_attr($task->id); ?>">
                                        <?php _e('Start', 'sakwood'); ?>
                                    </a>
                                    <span class="divider">|</span>
                                <?php else: ?>
                                    <a href="#" class="crm-reopen-task-action" data-task-id="<?php echo esc_attr($task->id); ?>">
                                        <?php _e('Reopen', 'sakwood'); ?>
                                    </a>
                                    <span class="divider">|</span>
                                <?php endif; ?>
                                <a href="#" class="crm-edit-task-action" data-task-id="<?php echo esc_attr($task->id); ?>">
                                    <?php _e('Edit', 'sakwood'); ?>
                                </a>
                                <span class="divider">|</span>
                                <a href="#" class="crm-delete-task-action" data-task-id="<?php echo esc_attr($task->id); ?>" style="color: #d63638;">
                                    <?php _e('Delete', 'sakwood'); ?>
                                </a>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>

    <!-- Pagination -->
    <?php if ($total > $per_page): ?>
        <div class="tablenav bottom">
            <div class="tablenav-pages">
                <?php
                $total_pages = ceil($total / $per_page);
                $current_url = admin_url('admin.php?page=sakwood-crm-tasks');

                // Preserve filters
                $query_args = ['paged' => $page];
                if ($status) $query_args['status'] = $status;
                if ($priority) $query_args['priority'] = $priority;
                if ($task_type) $query_args['task_type'] = $task_type;
                if ($assigned_to) $query_args['assigned_to'] = $assigned_to;
                if ($search) $query_args['s'] = $search;

                if ($page > 1) {
                    $query_args['paged'] = $page - 1;
                    echo '<a class="button" href="' . esc_url(add_query_arg($query_args, $current_url)) . '">&laquo;</a>';
                }

                for ($i = 1; $i <= $total_pages; $i++) {
                    if ($i == $page) {
                        echo '<span class="paging-input">' . $i . '</span>';
                    } else {
                        $query_args['paged'] = $i;
                        echo '<a class="button" href="' . esc_url(add_query_arg($query_args, $current_url)) . '">' . $i . '</a>';
                    }
                }

                if ($page < $total_pages) {
                    $query_args['paged'] = $page + 1;
                    echo '<a class="button" href="' . esc_url(add_query_arg($query_args, $current_url)) . '">&raquo;</a>';
                }
                ?>
            </div>
            <div class="displaying-num">
                <?php
                printf(
                    _n('%s task', '%s tasks', $total, 'sakwood'),
                    number_format_i18n($total)
                );
                ?>
            </div>
        </div>
    <?php endif; ?>

    <!-- Task Summary -->
    <?php if (!empty($tasks)): ?>
        <div style="margin-top: 20px; padding: 15px; background: #f0f6fc; border: 1px solid #c3c4c7; border-radius: 4px;">
            <?php
            $pending_count = count(array_filter($tasks, fn($t) => $t->status === 'pending'));
            $in_progress_count = count(array_filter($tasks, fn($t) => $t->status === 'in_progress'));
            $overdue_count = count(array_filter($tasks, fn($t) =>
                $t->due_date && strtotime($t->due_date) < time() && $t->status !== 'completed'
            ));
            ?>
            <strong><?php _e('Task Summary:', 'sakwood'); ?></strong>
            <?php printf(__('%d pending', 'sakwood'), $pending_count); ?> |
            <?php printf(__('%d in progress', 'sakwood'), $in_progress_count); ?> |
            <span style="color: <?php echo $overdue_count > 0 ? '#d63638' : '#1d2327'; ?>;">
                <?php printf(__('%d overdue', 'sakwood'), $overdue_count); ?>
            </span>
        </div>
    <?php endif; ?>
</div>

<!-- Add/Edit Task Modal -->
<div id="crm-task-modal" class="crm-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 100000; align-items: center; justify-content: center;">
    <div class="crm-modal-content" style="background: #fff; padding: 20px; border-radius: 8px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <h2 id="crm-task-modal-title" style="margin-top: 0;"><?php _e('Add Task', 'sakwood'); ?></h2>
        <form id="crm-task-form" style="margin-top: 15px;">
            <input type="hidden" name="task_id" id="crm-task-id" value="">
            <input type="hidden" name="action" value="sakwood_crm_save_task">

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Customer', 'sakwood'); ?>
                </label>
                <select name="customer_id" id="crm-task-customer-id" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
                    <option value=""><?php _e('Select a customer (optional)', 'sakwood'); ?></option>
                    <?php
                    // Fetch customers for dropdown
                    if (class_exists('Sakwood_CRM_Customer')) {
                        $customers_list = Sakwood_CRM_Customer::get_customers(['limit' => 100]);
                        if ($customers_list['success']) {
                            foreach ($customers_list['data'] as $cust) {
                                echo '<option value="' . esc_attr($cust->id) . '">' . esc_html($cust->first_name . ' ' . $cust->last_name . ' (' . $cust->email . ')') . '</option>';
                            }
                        }
                    }
                    ?>
                </select>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Task Title', 'sakwood'); ?> <span class="required">*</span>
                </label>
                <input type="text" name="title" id="crm-task-title" required style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Description', 'sakwood'); ?>
                </label>
                <textarea name="description" id="crm-task-description" rows="3" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;"></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Priority', 'sakwood'); ?>
                    </label>
                    <select name="priority" id="crm-task-priority" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value="low"><?php _e('Low', 'sakwood'); ?></option>
                        <option value="medium" selected><?php _e('Medium', 'sakwood'); ?></option>
                        <option value="high"><?php _e('High', 'sakwood'); ?></option>
                        <option value="urgent"><?php _e('Urgent', 'sakwood'); ?></option>
                    </select>
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Due Date', 'sakwood'); ?>
                    </label>
                    <input type="date" name="due_date" id="crm-task-due-date" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Task Type', 'sakwood'); ?>
                    </label>
                    <select name="task_type" id="crm-task-type" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value="other"><?php _e('Other', 'sakwood'); ?></option>
                        <option value="follow_up"><?php _e('Follow Up', 'sakwood'); ?></option>
                        <option value="payment_reminder"><?php _e('Payment Reminder', 'sakwood'); ?></option>
                        <option value="order_followup"><?php _e('Order Follow-up', 'sakwood'); ?></option>
                        <option value="quote_request"><?php _e('Quote Request', 'sakwood'); ?></option>
                        <option value="support"><?php _e('Support', 'sakwood'); ?></option>
                    </select>
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Assigned To', 'sakwood'); ?>
                    </label>
                    <input type="text" name="assigned_to" id="crm-task-assigned-to" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;" placeholder="<?php _e('Enter name or leave blank', 'sakwood'); ?>">
                </div>
            </div>

            <div style="text-align: right;">
                <button type="button" class="button" onclick="closeModal('crm-task-modal')" style="margin-right: 10px;">
                    <?php _e('Cancel', 'sakwood'); ?>
                </button>
                <button type="submit" class="button button-primary">
                    <?php _e('Save Task', 'sakwood'); ?>
                </button>
            </div>
        </form>
    </div>
</div>

<style>
.crm-task-overdue { animation: pulse 2s infinite; }
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.9; }
}
.crm-modal.active { display: flex !important; }
</style>

<script>
// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
document.querySelectorAll('.crm-modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Add Task button
document.querySelector('.crm-add-task-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('crm-task-modal-title').textContent = '<?php _e('Add Task', 'sakwood'); ?>';
    document.getElementById('crm-task-form').reset();
    document.getElementById('crm-task-id').value = '';
    openModal('crm-task-modal');
});

// Edit Task action
document.querySelectorAll('.crm-edit-task-action').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var taskId = this.getAttribute('data-task-id');
        // TODO: Load task data via AJAX and populate form
        document.getElementById('crm-task-modal-title').textContent = '<?php _e('Edit Task', 'sakwood'); ?>';
        document.getElementById('crm-task-id').value = taskId;
        openModal('crm-task-modal');
    });
});

// Complete Task action
document.querySelectorAll('.crm-complete-task-action').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('<?php _e('Are you sure you want to mark this task as complete?', 'sakwood'); ?>')) {
            var taskId = this.getAttribute('data-task-id');
            // TODO: Implement AJAX to complete task
            alert('Complete task: ' + taskId);
        }
    });
});

// Reopen Task action
document.querySelectorAll('.crm-reopen-task-action').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('<?php _e('Are you sure you want to reopen this task?', 'sakwood'); ?>')) {
            var taskId = this.getAttribute('data-task-id');
            // TODO: Implement AJAX to reopen task
            alert('Reopen task: ' + taskId);
        }
    });
});

// Delete Task action
document.querySelectorAll('.crm-delete-task-action').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('<?php _e('Are you sure you want to delete this task? This cannot be undone.', 'sakwood'); ?>')) {
            var taskId = this.getAttribute('data-task-id');
            // TODO: Implement AJAX to delete task
            alert('Delete task: ' + taskId);
        }
    });
});
</script>
