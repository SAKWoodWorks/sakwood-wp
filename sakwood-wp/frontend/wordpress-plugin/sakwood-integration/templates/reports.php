<?php
/**
 * CRM Reports Template
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap sakwood-crm-wrap">
    <h1>CRM Reports</h1>

    <!-- Key Metrics -->
    <div class="sakwood-crm-stats-grid">
        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">👥</div>
            <div class="sakwood-crm-stat-content">
                <h3>Total Customers</h3>
                <div class="sakwood-crm-stat-value"><?php echo isset($total_customers) ? number_format($total_customers) : '0'; ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">📈</div>
            <div class="sakwood-crm-stat-content">
                <h3>New This Month</h3>
                <div class="sakwood-crm-stat-value"><?php echo isset($new_this_month) ? number_format($new_this_month) : '0'; ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">💰</div>
            <div class="sakwood-crm-stat-content">
                <h3>Total Revenue</h3>
                <div class="sakwood-crm-stat-value">฿<?php echo isset($total_revenue) ? number_format($total_revenue, 0) : '0'; ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">📊</div>
            <div class="sakwood-crm-stat-content">
                <h3>Avg Order Value</h3>
                <div class="sakwood-crm-stat-value">฿<?php echo isset($avg_order_value) ? number_format($avg_order_value, 0) : '0'; ?></div>
            </div>
        </div>
    </div>

    <div class="sakwood-crm-grid-2">
        <!-- Customer Type Distribution -->
        <div class="sakwood-crm-card">
            <h2>Customer Distribution</h2>
            <?php if (!empty($type_distribution)): ?>
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th>Customer Type</th>
                            <th>Count</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $total = isset($total_customers) ? $total_customers : 1;
                        foreach ($type_distribution as $type):
                        ?>
                            <tr>
                                <td>
                                    <span class="sakwood-crm-badge sakwood-crm-badge-<?php echo esc_attr($type->customer_type); ?>">
                                        <?php echo esc_html(ucfirst($type->customer_type)); ?>
                                    </span>
                                </td>
                                <td><?php echo number_format($type->count); ?></td>
                                <td><?php echo round(($type->count / $total) * 100, 1); ?>%</td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No data available.</p>
            <?php endif; ?>
        </div>

        <!-- Interaction Stats (Last 30 Days) -->
        <div class="sakwood-crm-card">
            <h2>Interactions (Last 30 Days)</h2>
            <?php if (!empty($interaction_stats)): ?>
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Direction</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($interaction_stats as $key => $count): ?>
                            <?php
                            list($type, $direction) = explode('_', $key);
                            ?>
                            <tr>
                                <td><?php echo esc_html(ucfirst($type)); ?></td>
                                <td><?php echo esc_html(ucfirst($direction)); ?></td>
                                <td><?php echo number_format($count); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No interactions logged in the last 30 days.</p>
            <?php endif; ?>
        </div>
    </div>

    <!-- Top Customers -->
    <div class="sakwood-crm-card">
        <h2>Top Customers by Revenue</h2>
        <?php if (!empty($top_customers)): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Orders</th>
                        <th>Total Spent</th>
                        <th>Avg Order</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $rank = 1;
                    foreach ($top_customers as $customer):
                        $avg_order = $customer->total_orders > 0
                            ? $customer->total_spent / $customer->total_orders
                            : 0;
                    ?>
                        <tr>
                            <td><strong>#<?php echo $rank++; ?></strong></td>
                            <td>
                                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers&customer_id=' . $customer->id); ?>">
                                    <strong><?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?></strong>
                                </a>
                            </td>
                            <td><?php echo esc_html($customer->email); ?></td>
                            <td><?php echo number_format($customer->total_orders); ?></td>
                            <td><strong>฿<?php echo number_format($customer->total_spent, 2); ?></strong></td>
                            <td>฿<?php echo number_format($avg_order, 2); ?></td>
                            <td>
                                <span class="sakwood-crm-badge sakwood-crm-badge-<?php echo esc_attr($customer->customer_type); ?>">
                                    <?php echo esc_html(ucfirst($customer->customer_type)); ?>
                                </span>
                            </td>
                            <td>
                                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers&customer_id=' . $customer->id); ?>" class="button button-small">View</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>No customer data available.</p>
        <?php endif; ?>
    </div>

    <!-- Export Options -->
    <div class="sakwood-crm-card">
        <h2>Export Data</h2>
        <p>Export customer data for external analysis:</p>
        <div class="sakwood-crm-export-buttons">
            <button class="button" onclick="alert('Export functionality coming soon!')">Export All Customers (CSV)</button>
            <button class="button" onclick="alert('Export functionality coming soon!')">Export Interactions (CSV)</button>
            <button class="button" onclick="alert('Export functionality coming soon!')">Export Tasks (CSV)</button>
        </div>
    </div>
</div>

<style>
.sakwood-crm-export-buttons {
    display: flex;
    gap: 10px;
}
</style>
