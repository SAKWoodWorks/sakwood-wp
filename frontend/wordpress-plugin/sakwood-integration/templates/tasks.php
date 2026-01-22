<?php
/**
 * CRM Tasks Template
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap sakwood-crm-wrap">
    <h1>CRM Tasks</h1>

    <!-- Stats Cards -->
    <div class="sakwood-crm-stats-grid">
        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">📋</div>
            <div class="sakwood-crm-stat-content">
                <h3>Your Tasks</h3>
                <div class="sakwood-crm-stat-value"><?php echo count($tasks); ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card <?php echo count($overdue_tasks) > 0 ? 'sakwood-crm-stat-warning' : ''; ?>">
            <div class="sakwood-crm-stat-icon">⚠️</div>
            <div class="sakwood-crm-stat-content">
                <h3>Overdue</h3>
                <div class="sakwood-crm-stat-value"><?php echo count($overdue_tasks); ?></div>
            </div>
        </div>
    </div>

    <!-- Overdue Tasks -->
    <?php if (!empty($overdue_tasks)): ?>
        <div class="sakwood-crm-card sakwood-crm-overdue-section">
            <h2>⚠️ Overdue Tasks</h2>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Customer</th>
                        <th>Type</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($overdue_tasks as $task): ?>
                        <tr class="sakwood-crm-overdue">
                            <td><strong><?php echo esc_html($task->title); ?></strong></td>
                            <td>
                                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers&customer_id=' . $task->customer_id); ?>">
                                    <?php echo esc_html($task->first_name . ' ' . $task->last_name); ?>
                                </a>
                            </td>
                            <td><?php echo esc_html(ucfirst($task->task_type)); ?></td>
                            <td>
                                <?php
                                $due_time = strtotime($task->due_date);
                                echo esc_html(date('M j, Y', $due_time));
                                ?>
                            </td>
                            <td>
                                <span class="sakwood-crm-priority sakwood-crm-priority-<?php echo esc_attr($task->priority); ?>">
                                    <?php echo esc_html(ucfirst($task->priority)); ?>
                                </span>
                            </td>
                            <td>
                                <button class="button button-small" onclick="completeTask(<?php echo $task->id; ?>)">Complete</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>

    <!-- Your Tasks -->
    <div class="sakwood-crm-card">
        <h2>Your Tasks</h2>

        <?php if (!empty($tasks)): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Customer</th>
                        <th>Type</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($tasks as $task): ?>
                        <?php
                        $is_overdue = $task->due_date && strtotime($task->due_date) < time();
                        ?>
                        <tr class="<?php echo $is_overdue ? 'sakwood-crm-overdue' : ''; ?>">
                            <td>
                                <strong><?php echo esc_html($task->title); ?></strong>
                                <?php if ($task->description): ?>
                                    <br><small><?php echo esc_html(substr($task->description, 0, 100)); ?>...</small>
                                <?php endif; ?>
                            </td>
                            <td>
                                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers&customer_id=' . $task->customer_id); ?>">
                                    <?php echo esc_html($task->first_name . ' ' . $task->last_name); ?>
                                </a>
                            </td>
                            <td><?php echo esc_html(ucfirst($task->task_type)); ?></td>
                            <td>
                                <span class="sakwood-crm-priority sakwood-crm-priority-<?php echo esc_attr($task->priority); ?>">
                                    <?php echo esc_html(ucfirst($task->priority)); ?>
                                </span>
                            </td>
                            <td><?php echo esc_html(ucfirst($task->status)); ?></td>
                            <td>
                                <?php if ($task->due_date): ?>
                                    <?php echo esc_html(date('M j, Y g:i A', strtotime($task->due_date))); ?>
                                <?php else: ?>
                                    -
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php if ($task->status !== 'completed'): ?>
                                    <button class="button button-small" onclick="completeTask(<?php echo $task->id; ?>)">Complete</button>
                                <?php else: ?>
                                    <span class="sakwood-crm-completed">✓ Completed</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>No tasks assigned to you.</p>
        <?php endif; ?>
    </div>
</div>

<script>
function completeTask(taskId) {
    if (!confirm('Mark this task as completed?')) return;

    jQuery.ajax({
        url: ajaxurl,
        type: 'POST',
        data: {
            action: 'sakwood_complete_task',
            task_id: taskId,
            nonce: sakwoodCRM.nonce
        },
        success: function(response) {
            if (response.success) {
                location.reload();
            } else {
                alert('Error: ' + (response.data || 'Unknown error'));
            }
        },
        error: function() {
            alert('Failed to complete task');
        }
    });
}
</script>

<style>
.sakwood-crm-overdue-section {
    border-color: #d63638;
    background: #fff6f6;
}

.sakwood-crm-completed {
    color: green;
    font-weight: bold;
}
</style>
