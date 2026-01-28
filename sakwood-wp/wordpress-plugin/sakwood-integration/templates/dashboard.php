<?php
/**
 * CRM Dashboard Template
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap sakwood-crm-wrap">
    <h1>CRM Dashboard</h1>

    <div class="sakwood-crm-stats-grid">
        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">👥</div>
            <div class="sakwood-crm-stat-content">
                <h3>Total Customers</h3>
                <div class="sakwood-crm-stat-value"><?php echo number_format($total_customers); ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">⭐</div>
            <div class="sakwood-crm-stat-content">
                <h3>VIP Customers</h3>
                <div class="sakwood-crm-stat-value"><?php echo number_format($total_vip); ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">🏢</div>
            <div class="sakwood-crm-stat-content">
                <h3>Wholesale</h3>
                <div class="sakwood-crm-stat-value"><?php echo number_format($total_wholesale); ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card <?php echo $overdue_tasks > 0 ? 'sakwood-crm-stat-warning' : ''; ?>">
            <div class="sakwood-crm-stat-icon">✓</div>
            <div class="sakwood-crm-stat-content">
                <h3>Pending Tasks</h3>
                <div class="sakwood-crm-stat-value"><?php echo number_format($pending_tasks); ?></div>
                <?php if ($overdue_tasks > 0): ?>
                    <div class="sakwood-crm-stat-sub"><?php echo number_format($overdue_tasks); ?> overdue</div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <div class="sakwood-crm-grid-2">
        <!-- Recent Customers -->
        <div class="sakwood-crm-card">
            <h2>Recent Customers</h2>
            <?php if (!empty($recent_customers)): ?>
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($recent_customers as $customer): ?>
                            <tr>
                                <td>
                                    <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $customer->id); ?>">
                                        <?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?>
                                    </a>
                                </td>
                                <td><?php echo esc_html($customer->email); ?></td>
                                <td>
                                    <span class="sakwood-crm-badge sakwood-crm-badge-<?php echo esc_attr($customer->customer_type); ?>">
                                        <?php echo esc_html(ucfirst($customer->customer_type)); ?>
                                    </span>
                                </td>
                                <td><?php echo number_format($customer->total_orders); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No customers yet.</p>
            <?php endif; ?>
            <p class="sakwood-crm-view-all">
                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers'); ?>">View All Customers →</a>
            </p>
        </div>

        <!-- Upcoming Tasks -->
        <div class="sakwood-crm-card">
            <h2>Upcoming Tasks</h2>
            <?php if (!empty($upcoming_tasks)): ?>
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Customer</th>
                            <th>Due</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($upcoming_tasks as $task): ?>
                            <tr class="<?php echo strtotime($task->due_date) < time() ? 'sakwood-crm-overdue' : ''; ?>">
                                <td><?php echo esc_html($task->title); ?></td>
                                <td>
                                    <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $task->customer_id); ?>">
                                        <?php echo esc_html($task->first_name . ' ' . $task->last_name); ?>
                                    </a>
                                </td>
                                <td>
                                    <?php
                                    $due_time = strtotime($task->due_date);
                                    $is_overdue = $due_time < time();
                                    ?>
                                    <?php if ($is_overdue): ?>
                                        <span class="sakwood-crm-overdue-text">
                                            <?php echo human_time_diff($due_time) . ' overdue'; ?>
                                        </span>
                                    <?php else: ?>
                                        <?php echo human_time_diff($due_time) . ' from now'; ?>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <span class="sakwood-crm-priority sakwood-crm-priority-<?php echo esc_attr($task->priority); ?>">
                                        <?php echo esc_html(ucfirst($task->priority)); ?>
                                    </span>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No upcoming tasks.</p>
            <?php endif; ?>
            <p class="sakwood-crm-view-all">
                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-tasks'); ?>">View All Tasks →</a>
            </p>
        </div>
    </div>

    <!-- Recent Interactions -->
    <div class="sakwood-crm-card">
        <h2>Recent Interactions</h2>
        <?php if (!empty($recent_interactions)): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Customer</th>
                        <th>Subject</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recent_interactions as $interaction): ?>
                        <tr>
                            <td>
                                <span class="sakwood-crm-interaction-icon">
                                    <?php
                                    $icons = array(
                                        'call' => '📞',
                                        'email' => '✉️',
                                        'line' => '💬',
                                        'visit' => '🏠',
                                        'note' => '📝',
                                    );
                                    echo isset($icons[$interaction->interaction_type]) ? $icons[$interaction->interaction_type] : '📌';
                                    ?>
                                </span>
                                <?php echo esc_html(ucfirst($interaction->interaction_type)); ?>
                            </td>
                            <td>
                                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $interaction->customer_id); ?>">
                                    <?php echo esc_html($interaction->first_name . ' ' . $interaction->last_name); ?>
                                </a>
                            </td>
                            <td><?php echo esc_html($interaction->subject ?: 'No subject'); ?></td>
                            <td><?php echo human_time_diff(strtotime($interaction->created_at), current_time('timestamp')) . ' ago'; ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>No interactions logged yet.</p>
        <?php endif; ?>
        <p class="sakwood-crm-view-all">
            <a href="<?php echo admin_url('admin.php?page=sakwood-crm-interactions'); ?>">View All Interactions →</a>
        </p>
    </div>
</div>

<style>
.sakwood-crm-wrap {
    margin: 20px;
}

.sakwood-crm-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.sakwood-crm-stat-card {
    background: #fff;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 15px;
}

.sakwood-crm-stat-icon {
    font-size: 32px;
}

.sakwood-crm-stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #2271b1;
}

.sakwood-crm-stat-sub {
    font-size: 12px;
    color: #d63638;
}

.sakwood-crm-stat-warning {
    border-color: #d63638;
    background: #fff6f6;
}

.sakwood-crm-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.sakwood-crm-card {
    background: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 4px;
}

.sakwood-crm-card h2 {
    margin-top: 0;
}

.sakwood-crm-badge {
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
}

.sakwood-crm-badge-retail {
    background: #e7f3ff;
    color: #0073aa;
}

.sakwood-crm-badge-wholesale {
    background: #fff3e7;
    color: #d63638;
}

.sakwood-crm-badge-vip {
    background: #f3e7ff;
    color: #6b28c9;
}

.sakwood-crm-overdue {
    background: #fff6f6;
}

.sakwood-crm-overdue-text {
    color: #d63638;
    font-weight: bold;
}

.sakwood-crm-priority {
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: bold;
}

.sakwood-crm-priority-urgent {
    background: #ffe7e7;
    color: #d63638;
}

.sakwood-crm-priority-high {
    background: #fff3e7;
    color: #ff6b28;
}

.sakwood-crm-priority-medium {
    background: #fffde7;
    color: #d63638;
}

.sakwood-crm-priority-low {
    background: #e7f3ff;
    color: #0073aa;
}

.sakwood-crm-interaction-icon {
    margin-right: 5px;
}

.sakwood-crm-view-all {
    margin-top: 10px;
    font-weight: bold;
}

.sakwood-crm-view-all a {
    text-decoration: none;
}
</style>
