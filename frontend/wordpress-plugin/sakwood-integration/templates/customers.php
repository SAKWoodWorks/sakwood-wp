<?php
/**
 * CRM Customers Template
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap sakwood-crm-wrap">
    <h1>CRM Customers</h1>

    <?php if (isset($_GET['customer_id'])): ?>
        <!-- View Single Customer -->
        <?php
        $customer_id = intval($_GET['customer_id']);
        $customer = Sakwood_CRM_Customer::get($customer_id);
        $stats = Sakwood_CRM_Customer::get_stats($customer_id);
        $orders = Sakwood_CRM_Customer::get_orders($customer_id);
        $interactions = Sakwood_CRM_Interaction::get_by_customer($customer_id);
        $tasks = Sakwood_CRM_Task::get_by_customer($customer_id);
        ?>

        <?php if ($customer): ?>
            <div class="sakwood-crm-customer-header">
                <h2><?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?></h2>
                <span class="sakwood-crm-badge sakwood-crm-badge-<?php echo esc_attr($customer->customer_type); ?>">
                    <?php echo esc_html(ucfirst($customer->customer_type)); ?>
                </span>
            </div>

            <div class="sakwood-crm-grid-2">
                <!-- Customer Details -->
                <div class="sakwood-crm-card">
                    <h3>Contact Information</h3>
                    <table class="form-table">
                        <tr>
                            <th>Email</th>
                            <td><?php echo esc_html($customer->email); ?></td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td><?php echo esc_html($customer->phone ?: '-'); ?></td>
                        </tr>
                        <tr>
                            <th>LINE ID</th>
                            <td><?php echo esc_html($customer->line_id ?: '-'); ?></td>
                        </tr>
                        <tr>
                            <th>Company</th>
                            <td><?php echo esc_html($customer->company ?: '-'); ?></td>
                        </tr>
                        <tr>
                            <th>Tax ID</th>
                            <td><?php echo esc_html($customer->tax_id ?: '-'); ?></td>
                        </tr>
                        <tr>
                            <th>Source</th>
                            <td><?php echo esc_html(ucfirst($customer->source ?: '-')); ?></td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td><?php echo esc_html(ucfirst($customer->status)); ?></td>
                        </tr>
                    </table>
                </div>

                <!-- Statistics -->
                <div class="sakwood-crm-card">
                    <h3>Statistics</h3>
                    <?php if ($stats): ?>
                        <div class="sakwood-crm-stats-grid">
                            <div class="sakwood-crm-stat-item">
                                <div class="sakwood-crm-stat-label">Total Orders</div>
                                <div class="sakwood-crm-stat-number"><?php echo number_format($stats['customer']->total_orders); ?></div>
                            </div>
                            <div class="sakwood-crm-stat-item">
                                <div class="sakwood-crm-stat-label">Total Spent</div>
                                <div class="sakwood-crm-stat-number">฿<?php echo number_format($stats['customer']->total_spent, 2); ?></div>
                            </div>
                            <div class="sakwood-crm-stat-item">
                                <div class="sakwood-crm-stat-label">Avg Order Value</div>
                                <div class="sakwood-crm-stat-number">฿<?php echo number_format($stats['avg_order_value'], 2); ?></div>
                            </div>
                            <div class="sakwood-crm-stat-item">
                                <div class="sakwood-crm-stat-label">Interactions</div>
                                <div class="sakwood-crm-stat-number"><?php echo number_format($stats['interaction_count']); ?></div>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Order History -->
            <div class="sakwood-crm-card">
                <h3>Order History</h3>
                <?php if (!empty($orders)): ?>
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($orders as $order): ?>
                                <tr>
                                    <td>#<?php echo $order->get_order_number(); ?></td>
                                    <td><?php echo $order->get_date_created()->date('Y-m-d H:i'); ?></td>
                                    <td>฿<?php echo number_format($order->get_total(), 2); ?></td>
                                    <td><?php echo esc_html(ucfirst($order->get_status())); ?></td>
                                    <td>
                                        <a href="<?php echo $order->get_edit_order_url(); ?>" class="button">View</a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p>No orders found.</p>
                <?php endif; ?>
            </div>

            <!-- Interactions -->
            <div class="sakwood-crm-card">
                <h3>Interactions</h3>
                <?php if (!empty($interactions)): ?>
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Subject</th>
                                <th>Direction</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($interactions as $interaction): ?>
                                <tr>
                                    <td><?php echo esc_html(ucfirst($interaction->interaction_type)); ?></td>
                                    <td><?php echo esc_html($interaction->subject ?: '-'); ?></td>
                                    <td><?php echo esc_html(ucfirst($interaction->direction)); ?></td>
                                    <td><?php echo human_time_diff(strtotime($interaction->created_at), current_time('timestamp')) . ' ago'; ?></td>
                                    <td>
                                        <button class="button" onclick="alert('View details: <?php echo esc_js($interaction->message); ?>')">View</button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p>No interactions logged.</p>
                <?php endif; ?>
            </div>

            <!-- Tasks -->
            <div class="sakwood-crm-card">
                <h3>Tasks</h3>
                <?php if (!empty($tasks)): ?>
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($tasks as $task): ?>
                                <tr>
                                    <td><?php echo esc_html($task->title); ?></td>
                                    <td><?php echo esc_html(ucfirst($task->task_type)); ?></td>
                                    <td><?php echo esc_html(ucfirst($task->priority)); ?></td>
                                    <td><?php echo esc_html(ucfirst($task->status)); ?></td>
                                    <td><?php echo $task->due_date ? date('Y-m-d', strtotime($task->due_date)) : '-'; ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p>No tasks found.</p>
                <?php endif; ?>
            </div>

            <p>
                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers'); ?>" class="button">← Back to Customers</a>
            </p>
        <?php else: ?>
            <p>Customer not found.</p>
        <?php endif; ?>

    <?php else: ?>
        <!-- Customer List -->
        <?php include_once dirname(__FILE__) . '/partials/customer-list.php'; ?>
    <?php endif; ?>
</div>

<style>
.sakwood-crm-customer-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.sakwood-crm-stat-item {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
}

.sakwood-crm-stat-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
}

.sakwood-crm-stat-number {
    font-size: 24px;
    font-weight: bold;
    color: #2271b1;
}
</style>
