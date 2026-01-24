<?php
/**
 * CRM Reports & Analytics Template
 * Displays comprehensive CRM metrics and charts
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Get date range
$date_range = isset($_GET['date_range']) ? sanitize_text_field($_GET['date_range']) : '30';
$custom_from = isset($_GET['custom_from']) ? sanitize_text_field($_GET['custom_from']) : '';
$custom_to = isset($_GET['custom_to']) ? sanitize_text_field($_GET['custom_to']) : '';

// Calculate date range
$to_date = current_time('Y-m-d');
$from_date = '';

switch ($date_range) {
    case '7':
        $from_date = date('Y-m-d', strtotime('-7 days', current_time('timestamp')));
        break;
    case '30':
        $from_date = date('Y-m-d', strtotime('-30 days', current_time('timestamp')));
        break;
    case '90':
        $from_date = date('Y-m-d', strtotime('-90 days', current_time('timestamp')));
        break;
    case 'custom':
        $from_date = $custom_from ?: date('Y-m-d', strtotime('-30 days', current_time('timestamp')));
        $to_date = $custom_to ?: current_time('Y-m-d');
        break;
    default:
        $from_date = date('Y-m-d', strtotime('-30 days', current_time('timestamp')));
}

// Fetch analytics data using CRM classes
$stats = [
    'total_customers' => 0,
    'new_customers' => 0,
    'total_revenue' => 0,
    'avg_order_value' => 0,
    'total_interactions' => 0,
    'completed_tasks' => 0,
    'pending_tasks' => 0,
    'overdue_tasks' => 0,
    'customer_types' => [
        'retail' => 0,
        'wholesale' => 0,
        'vip' => 0,
    ],
];

// Fetch customer stats
if (class_exists('Sakwood_CRM_Customer')) {
    $all_customers = Sakwood_CRM_Customer::get_customers(['limit' => 10000]);
    if ($all_customers['success']) {
        $stats['total_customers'] = count($all_customers['data']);

        // Count by type
        foreach ($all_customers['data'] as $customer) {
            if (isset($stats['customer_types'][$customer->customer_type])) {
                $stats['customer_types'][$customer->customer_type]++;
            }

            // Count new customers in date range
            if (strtotime($customer->created_at) >= strtotime($from_date)) {
                $stats['new_customers']++;
            }
        }

        // Calculate revenue stats
        $total_revenue = 0;
        $total_orders = 0;
        foreach ($all_customers['data'] as $customer) {
            if (isset($customer->total_spent)) {
                $total_revenue += floatval($customer->total_spent);
            }
            if (isset($customer->total_orders)) {
                $total_orders += intval($customer->total_orders);
            }
        }
        $stats['total_revenue'] = $total_revenue;
        $stats['avg_order_value'] = $total_orders > 0 ? $total_revenue / $total_orders : 0;
    }
}

// Fetch interaction stats
if (class_exists('Sakwood_CRM_Interaction')) {
    $interactions_args = [
        'date_from' => $from_date,
        'date_to' => $to_date,
        'limit' => 10000,
    ];
    $interactions_result = Sakwood_CRM_Interaction::get_interactions($interactions_args);
    if ($interactions_result['success']) {
        $stats['total_interactions'] = count($interactions_result['data']);
    }
}

// Fetch task stats
if (class_exists('Sakwood_CRM_Task')) {
    $all_tasks = Sakwood_CRM_Task::get_tasks(['limit' => 10000]);
    if ($all_tasks['success']) {
        foreach ($all_tasks['data'] as $task) {
            if ($task->status === 'completed') {
                $stats['completed_tasks']++;
            } else {
                $stats['pending_tasks']++;
                // Check if overdue
                if ($task->due_date && strtotime($task->due_date) < current_time('timestamp')) {
                    $stats['overdue_tasks']++;
                }
            }
        }
    }
}

$base_url = admin_url('admin.php?page=sakwood-crm-reports');
?>

<div class="wrap sakwood-crm-reports">
    <h1><?php _e('CRM Reports & Analytics', 'sakwood'); ?></h1>

    <hr class="wp-header-end">

    <!-- Date Range Filter -->
    <div class="crm-date-filter" style="margin: 20px 0; padding: 15px; background: #fff; border: 1px solid #ccd0d4; border-radius: 4px;">
        <form method="get" action="<?php echo esc_url($base_url); ?>">
            <input type="hidden" name="page" value="sakwood-crm-reports">

            <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: end;">
                <div>
                    <label for="crm-date-range" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Date Range', 'sakwood'); ?>
                    </label>
                    <select name="date_range" id="crm-date-range" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;" onchange="toggleCustomDateRange()">
                        <option value="7" <?php selected($date_range, '7'); ?>><?php _e('Last 7 Days', 'sakwood'); ?></option>
                        <option value="30" <?php selected($date_range, '30'); ?>><?php _e('Last 30 Days', 'sakwood'); ?></option>
                        <option value="90" <?php selected($date_range, '90'); ?>><?php _e('Last 90 Days', 'sakwood'); ?></option>
                        <option value="custom" <?php selected($date_range, 'custom'); ?>><?php _e('Custom', 'sakwood'); ?></option>
                    </select>
                </div>

                <div id="crm-custom-date-container" style="display: <?php echo $date_range === 'custom' ? 'flex' : 'none'; ?>; gap: 10px;">
                    <div>
                        <label for="custom_from" style="display: block; margin-bottom: 5px; font-weight: 600;">
                            <?php _e('From', 'sakwood'); ?>
                        </label>
                        <input type="date"
                               name="custom_from"
                               id="custom_from"
                               value="<?php echo esc_attr($custom_from); ?>"
                               style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                    </div>
                    <div>
                        <label for="custom_to" style="display: block; margin-bottom: 5px; font-weight: 600;">
                            <?php _e('To', 'sakwood'); ?>
                        </label>
                        <input type="date"
                               name="custom_to"
                               id="custom_to"
                               value="<?php echo esc_attr($custom_to); ?>"
                               style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                    </div>
                </div>

                <div>
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">&nbsp;</label>
                    <button type="submit" class="button" style="padding: 8px 16px;">
                        <?php _e('Apply', 'sakwood'); ?>
                    </button>
                    <a href="<?php echo esc_url($base_url); ?>" class="button" style="padding: 8px 16px; margin-left: 5px;">
                        <?php _e('Reset', 'sakwood'); ?>
                    </a>
                </div>
            </div>
        </form>
    </div>

    <!-- Customer Metrics -->
    <div style="margin-bottom: 30px;">
        <h2 style="margin-bottom: 15px;"><?php _e('Customer Metrics', 'sakwood'); ?></h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #2271b1;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Total Customers', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['total_customers']); ?>
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #00a32a;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('New This Month', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['new_customers']); ?>
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #dba617;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Retail', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['customer_types']['retail']); ?>
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #1855b3;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Wholesale', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['customer_types']['wholesale']); ?>
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #8a2487;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('VIP', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['customer_types']['vip']); ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Sales Metrics -->
    <div style="margin-bottom: 30px;">
        <h2 style="margin-bottom: 15px;"><?php _e('Sales Metrics', 'sakwood'); ?></h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #00a32a;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Total Revenue', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format($stats['total_revenue'], 0); ?> ฿
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #2271b1;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Avg Order Value', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format($stats['avg_order_value'], 0); ?> ฿
                </div>
            </div>
        </div>
    </div>

    <!-- Activity Metrics -->
    <div style="margin-bottom: 30px;">
        <h2 style="margin-bottom: 15px;"><?php _e('Activity Metrics', 'sakwood'); ?></h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #1855b3;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Interactions', 'sakwood'); ?>
                </div>
                <div style="font-size: 13px; color: #646970; margin-bottom: 3px;">
                    <?php printf(__('Since %s', 'sakwood'), date_i18n(get_option('date_format'), strtotime($from_date))); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['total_interactions']); ?>
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #00a32a;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Completed Tasks', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['completed_tasks']); ?>
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #d47b0a;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Pending Tasks', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #1d2327;">
                    <?php echo number_format_i18n($stats['pending_tasks']); ?>
                </div>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; border-left: 4px solid #d63638;">
                <div style="font-size: 13px; color: #646970; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">
                    <?php _e('Overdue Tasks', 'sakwood'); ?>
                </div>
                <div style="font-size: 32px; font-weight: 700; color: #d63638;">
                    <?php echo number_format_i18n($stats['overdue_tasks']); ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Charts Section -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px;">
        <!-- Customer Type Distribution Chart -->
        <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
            <h3 style="margin-top: 0;"><?php _e('Customer Type Distribution', 'sakwood'); ?></h3>
            <canvas id="customerTypeChart" style="max-height: 300px;"></canvas>
        </div>

        <!-- Task Status Chart -->
        <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
            <h3 style="margin-top: 0;"><?php _e('Task Status Overview', 'sakwood'); ?></h3>
            <canvas id="taskStatusChart" style="max-height: 300px;"></canvas>
        </div>
    </div>

    <!-- Top Customers Table -->
    <div style="margin-top: 30px;">
        <h2 style="margin-bottom: 15px;"><?php _e('Top Customers by Revenue', 'sakwood'); ?></h2>
        <div style="background: #fff; border: 1px solid #c3c4c7; border-radius: 4px; overflow: hidden;">
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th scope="col" style="width: 5%;">#</th>
                        <th scope="col" style="width: 40%;"><?php _e('Customer', 'sakwood'); ?></th>
                        <th scope="col" style="width: 15%;"><?php _e('Type', 'sakwood'); ?></th>
                        <th scope="col" style="width: 15%;"><?php _e('Orders', 'sakwood'); ?></th>
                        <th scope="col" style="width: 25%;"><?php _e('Total Spent', 'sakwood'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Get top customers
                    $top_customers = [];
                    if (class_exists('Sakwood_CRM_Customer')) {
                        $customers_result = Sakwood_CRM_Customer::get_customers(['limit' => 10000, 'orderby' => 'total_spent', 'order' => 'DESC']);
                        if ($customers_result['success']) {
                            $top_customers = array_slice($customers_result['data'], 0, 10);
                        }
                    }

                    if (empty($top_customers)):
                    ?>
                        <tr>
                            <td colspan="5">
                                <?php _e('No customers found.', 'sakwood'); ?>
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($top_customers as $index => $customer): ?>
                            <tr>
                                <td><strong><?php echo $index + 1; ?></strong></td>
                                <td>
                                    <a href="<?php echo esc_url(admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $customer->id)); ?>">
                                        <?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?>
                                    </a>
                                    <?php if ($customer->email): ?>
                                        <p style="margin: 3px 0 0 0; font-size: 12px; color: #646970;">
                                            <?php echo esc_html($customer->email); ?>
                                        </p>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <span class="crm-badge crm-badge-<?php echo esc_attr($customer->customer_type); ?>"
                                          style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;
                                          <?php echo $customer->customer_type === 'vip' ? 'background: #f6eced; color: #8a2487;' :
                                                ($customer->customer_type === 'wholesale' ? 'background: #dbe5ff; color: #1855b3;' :
                                                'background: #f0f0f1; color: #1d2327;'); ?>">
                                        <?php echo ucfirst(esc_html($customer->customer_type)); ?>
                                    </span>
                                </td>
                                <td><?php echo intval($customer->total_orders ?? 0); ?></td>
                                <td>
                                    <strong style="color: #00a32a;">
                                        <?php echo isset($customer->total_spent) ? number_format(floatval($customer->total_spent), 0) . ' ฿' : '0 ฿'; ?>
                                    </strong>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Chart.js Library -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<script>
// Toggle custom date range visibility
function toggleCustomDateRange() {
    const dateRange = document.getElementById('crm-date-range').value;
    const customContainer = document.getElementById('crm-custom-date-container');
    customContainer.style.display = dateRange === 'custom' ? 'flex' : 'none';
}

// Customer Type Distribution Chart
const customerTypeCtx = document.getElementById('customerTypeChart');
if (customerTypeCtx) {
    new Chart(customerTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['<?php _e('Retail', 'sakwood'); ?>', '<?php _e('Wholesale', 'sakwood'); ?>', '<?php _e('VIP', 'sakwood'); ?>'],
            datasets: [{
                data: [<?php echo $stats['customer_types']['retail']; ?>, <?php echo $stats['customer_types']['wholesale']; ?>, <?php echo $stats['customer_types']['vip']; ?>],
                backgroundColor: ['#f0f0f1', '#dbe5ff', '#f6eced'],
                borderColor: ['#1d2327', '#1855b3', '#8a2487'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Task Status Chart
const taskStatusCtx = document.getElementById('taskStatusChart');
if (taskStatusCtx) {
    new Chart(taskStatusCtx, {
        type: 'bar',
        data: {
            labels: ['<?php _e('Completed', 'sakwood'); ?>', '<?php _e('Pending', 'sakwood'); ?>', '<?php _e('Overdue', 'sakwood'); ?>'],
            datasets: [{
                label: '<?php _e('Tasks', 'sakwood'); ?>',
                data: [<?php echo $stats['completed_tasks']; ?>, <?php echo $stats['pending_tasks']; ?>, <?php echo $stats['overdue_tasks']; ?>],
                backgroundColor: ['#d7edc9', '#fcf3e5', '#fcaba0'],
                borderColor: ['#1c5c1f', '#d47b0a', '#8a2487'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}
</script>
