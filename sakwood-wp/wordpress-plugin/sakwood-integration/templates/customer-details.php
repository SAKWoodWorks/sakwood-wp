<?php
/**
 * CRM Customer Details Template
 * Displays comprehensive customer profile with interactions, tasks, and orders
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Get customer ID from URL
$customer_id = isset($_GET['customer_id']) ? intval($_GET['customer_id']) : 0;

if (!$customer_id) {
    wp_die(__('Customer ID is required.', 'sakwood'));
}

// Fetch customer data
if (class_exists('Sakwood_CRM_Customer')) {
    $customer_result = Sakwood_CRM_Customer::get_customer($customer_id);

    if (!$customer_result['success']) {
        wp_die(__('Customer not found.', 'sakwood'));
    }

    $customer = $customer_result['data'];
} else {
    wp_die(__('CRM Customer class not found.', 'sakwood'));
}

// Fetch interactions
$interactions = [];
if (class_exists('Sakwood_CRM_Interaction')) {
    $interactions_result = Sakwood_CRM_Interaction::get_interactions([
        'customer_id' => $customer_id,
        'limit' => 20,
    ]);
    $interactions = $interactions_result['success'] ? $interactions_result['data'] : [];
}

// Fetch tasks
$tasks = [];
if (class_exists('Sakwood_CRM_Task')) {
    $tasks_result = Sakwood_CRM_Task::get_tasks([
        'customer_id' => $customer_id,
        'limit' => 20,
    ]);
    $tasks = $tasks_result['success'] ? $tasks_result['data'] : [];
}

// Get active tab
$active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'overview';

$base_url = admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $customer_id);
?>

<div class="wrap sakwood-customer-details">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
            <h1 style="margin: 0;">
                <?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?>
            </h1>
            <?php if ($customer->company): ?>
                <p style="margin: 5px 0 0 0; color: #646970;">
                    <?php echo esc_html($customer->company); ?>
                </p>
            <?php endif; ?>
        </div>
        <div>
            <a href="<?php echo esc_url(admin_url('admin.php?page=sakwood-crm-customers')); ?>" class="button">
                <?php _e('← Back to Customers', 'sakwood'); ?>
            </a>
            <a href="mailto:<?php echo esc_attr($customer->email); ?>" class="button button-primary" style="margin-left: 5px;">
                <?php _e('Send Email', 'sakwood'); ?>
            </a>
        </div>
    </div>

    <hr class="wp-header-end">

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-top: 20px;">
        <!-- Left Column: Main Content -->
        <div>
            <!-- Customer Info Card -->
            <div class="crm-card" style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px; margin-bottom: 20px;">
                <h2 style="margin-top: 0;"><?php _e('Customer Information', 'sakwood'); ?></h2>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <!-- Basic Info -->
                    <div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Full Name', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0; font-size: 14px;">
                                <?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?>
                            </p>
                        </div>

                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Email', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0; font-size: 14px;">
                                <a href="mailto:<?php echo esc_attr($customer->email); ?>">
                                    <?php echo esc_html($customer->email); ?>
                                </a>
                            </p>
                        </div>

                        <?php if ($customer->phone): ?>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Phone', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0; font-size: 14px;">
                                <a href="tel:<?php echo esc_attr($customer->phone); ?>">
                                    <?php echo esc_html($customer->phone); ?>
                                </a>
                            </p>
                        </div>
                        <?php endif; ?>

                        <?php if ($customer->line_id): ?>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('LINE ID', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0; font-size: 14px;">
                                <?php echo esc_html($customer->line_id); ?>
                            </p>
                        </div>
                        <?php endif; ?>
                    </div>

                    <!-- Business Info -->
                    <div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Customer Type', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0;">
                                <span class="crm-badge crm-badge-<?php echo esc_attr($customer->customer_type); ?>"
                                      style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;
                                      <?php echo $customer->customer_type === 'vip' ? 'background: #f6eced; color: #8a2487;' :
                                            ($customer->customer_type === 'wholesale' ? 'background: #dbe5ff; color: #1855b3;' :
                                            'background: #f0f0f1; color: #1d2327;'); ?>">
                                    <?php echo ucfirst(esc_html($customer->customer_type)); ?>
                                </span>
                            </p>
                        </div>

                        <?php if ($customer->company): ?>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Company', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0; font-size: 14px;">
                                <?php echo esc_html($customer->company); ?>
                            </p>
                        </div>
                        <?php endif; ?>

                        <?php if ($customer->tax_id): ?>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Tax ID', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0; font-size: 14px; font-family: monospace;">
                                <?php echo esc_html($customer->tax_id); ?>
                            </p>
                        </div>
                        <?php endif; ?>

                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Status', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0;">
                                <span class="crm-status-badge crm-status-<?php echo esc_attr($customer->status); ?>"
                                      style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;
                                      <?php echo $customer->status === 'active' ? 'background: #d7edc9; color: #1c5c1f;' : 'background: #f6eded; color: #8a2487;'; ?>">
                                    <?php echo ucfirst(esc_html($customer->status)); ?>
                                </span>
                            </p>
                        </div>

                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: #646970; font-size: 13px;">
                                <?php _e('Member Since', 'sakwood'); ?>
                            </label>
                            <p style="margin: 0; font-size: 14px;">
                                <?php echo date_i18n(get_option('date_format'), strtotime($customer->created_at)); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="crm-tabs-nav" style="background: #fff; padding: 0 20px; border: 1px solid #c3c4c7; border-bottom: none; border-radius: 4px 4px 0 0;">
                <nav class="nav-tab-wrapper">
                    <a href="<?php echo esc_url(add_query_arg('tab', 'overview', $base_url)); ?>"
                       class="nav-tab <?php echo $active_tab === 'overview' ? 'nav-tab-active' : ''; ?>">
                        <?php _e('Overview', 'sakwood'); ?>
                    </a>
                    <a href="<?php echo esc_url(add_query_arg('tab', 'interactions', $base_url)); ?>"
                       class="nav-tab <?php echo $active_tab === 'interactions' ? 'nav-tab-active' : ''; ?>">
                        <?php _e('Interactions', 'sakwood'); ?>
                        <span class="count" style="background: #d63638; color: #fff; padding: 2px 8px; border-radius: 10px; font-size: 11px; margin-left: 5px;">
                            <?php echo count($interactions); ?>
                        </span>
                    </a>
                    <a href="<?php echo esc_url(add_query_arg('tab', 'tasks', $base_url)); ?>"
                       class="nav-tab <?php echo $active_tab === 'tasks' ? 'nav-tab-active' : ''; ?>">
                        <?php _e('Tasks', 'sakwood'); ?>
                        <span class="count" style="background: #d63638; color: #fff; padding: 2px 8px; border-radius: 10px; font-size: 11px; margin-left: 5px;">
                            <?php echo count($tasks); ?>
                        </span>
                    </a>
                    <a href="<?php echo esc_url(add_query_arg('tab', 'orders', $base_url)); ?>"
                       class="nav-tab <?php echo $active_tab === 'orders' ? 'nav-tab-active' : ''; ?>">
                        <?php _e('Orders', 'sakwood'); ?>
                    </a>
                </nav>
            </div>

            <!-- Tab Content -->
            <div class="crm-tab-content" style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 0 0 4px 4px;">
                <?php if ($active_tab === 'overview'): ?>
                    <!-- Overview Tab -->
                    <h2 style="margin-top: 0;"><?php _e('Recent Activity', 'sakwood'); ?></h2>

                    <?php if (!empty($interactions)): ?>
                        <div class="crm-timeline">
                            <?php foreach (array_slice($interactions, 0, 5) as $interaction): ?>
                                <div style="padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
                                    <div style="display: flex; justify-content: space-between;">
                                        <div>
                                            <strong style="color: #1d2327;">
                                                <?php
                                                $icons = [
                                                    'call' => '📞',
                                                    'email' => '✉️',
                                                    'line' => '💬',
                                                    'visit' => '🏢',
                                                    'note' => '📝',
                                                ];
                                                echo isset($icons[$interaction->interaction_type]) ? $icons[$interaction->interaction_type] : '📌';
                                                ?>
                                                <?php echo esc_html($interaction->subject); ?>
                                            </strong>
                                            <p style="margin: 5px 0 0 0; color: #646970; font-size: 13px;">
                                                <?php echo esc_html(substr($interaction->message, 0, 150)); ?>
                                                <?php echo strlen($interaction->message) > 150 ? '...' : ''; ?>
                                            </p>
                                        </div>
                                        <div style="text-align: right; min-width: 150px;">
                                            <div style="font-size: 12px; color: #646970;">
                                                <?php echo date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($interaction->created_at)); ?>
                                            </div>
                                            <div style="font-size: 11px; color: #646970; margin-top: 3px;">
                                                <?php echo esc_html($interaction->created_by_name); ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <p><?php _e('No recent activity.', 'sakwood'); ?></p>
                    <?php endif; ?>

                <?php elseif ($active_tab === 'interactions'): ?>
                    <!-- Interactions Tab -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h2 style="margin: 0;"><?php _e('Interaction History', 'sakwood'); ?></h2>
                        <button type="button" class="button button-primary crm-add-interaction-btn" data-customer-id="<?php echo esc_attr($customer_id); ?>">
                            <?php _e('+ Add Interaction', 'sakwood'); ?>
                        </button>
                    </div>

                    <?php if (!empty($interactions)): ?>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th scope="col" style="width: 20%;"><?php _e('Date', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 15%;"><?php _e('Type', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 35%;"><?php _e('Subject', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 15%;"><?php _e('Created By', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 15%;"><?php _e('Actions', 'sakwood'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($interactions as $interaction): ?>
                                    <tr>
                                        <td>
                                            <?php echo date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($interaction->created_at)); ?>
                                        </td>
                                        <td>
                                            <?php
                                            $type_labels = [
                                                'call' => __('Call', 'sakwood'),
                                                'email' => __('Email', 'sakwood'),
                                                'line' => __('LINE', 'sakwood'),
                                                'visit' => __('Visit', 'sakwood'),
                                                'note' => __('Note', 'sakwood'),
                                            ];
                                            echo esc_html($type_labels[$interaction->interaction_type] ?? ucfirst($interaction->interaction_type));
                                            ?>
                                        </td>
                                        <td>
                                            <strong><?php echo esc_html($interaction->subject); ?></strong>
                                            <?php if ($interaction->message): ?>
                                                <p style="margin: 5px 0 0 0; font-size: 12px; color: #646970;">
                                                    <?php echo esc_html(substr($interaction->message, 0, 100)); ?>
                                                    <?php echo strlen($interaction->message) > 100 ? '...' : ''; ?>
                                                </p>
                                            <?php endif; ?>
                                        </td>
                                        <td><?php echo esc_html($interaction->created_by_name); ?></td>
                                        <td>
                                            <a href="#" class="crm-view-interaction" data-interaction-id="<?php echo esc_attr($interaction->id); ?>">
                                                <?php _e('View', 'sakwood'); ?>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php else: ?>
                        <p><?php _e('No interactions recorded.', 'sakwood'); ?></p>
                    <?php endif; ?>

                <?php elseif ($active_tab === 'tasks'): ?>
                    <!-- Tasks Tab -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h2 style="margin: 0;"><?php _e('Tasks', 'sakwood'); ?></h2>
                        <button type="button" class="button button-primary crm-add-task-btn" data-customer-id="<?php echo esc_attr($customer_id); ?>">
                            <?php _e('+ Add Task', 'sakwood'); ?>
                        </button>
                    </div>

                    <?php if (!empty($tasks)): ?>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th scope="col" style="width: 5%;"></th>
                                    <th scope="col" style="width: 35%;"><?php _e('Task', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 15%;"><?php _e('Priority', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 15%;"><?php _e('Due Date', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 15%;"><?php _e('Status', 'sakwood'); ?></th>
                                    <th scope="col" style="width: 15%;"><?php _e('Actions', 'sakwood'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($tasks as $task): ?>
                                    <tr class="<?php
                                    $is_overdue = $task->due_date && strtotime($task->due_date) < time() && $task->status !== 'completed';
                                    echo $is_overdue ? 'crm-task-overdue' : '';
                                    ?>" style="<?php echo $is_overdue ? 'background: #fff6f6 !important; border-left: 4px solid #d63638;' : ''; ?>">
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
                                            <strong><?php echo esc_html($task->title); ?></strong>
                                            <?php if ($task->description): ?>
                                                <p style="margin: 5px 0 0 0; font-size: 12px; color: #646970;">
                                                    <?php echo esc_html(substr($task->description, 0, 100)); ?>
                                                    <?php echo strlen($task->description) > 100 ? '...' : ''; ?>
                                                </p>
                                            <?php endif; ?>
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
                                                  <?php echo $task->status === 'completed' ? 'background: #d7edc9; color: #1c5c1f;' : 'background: #fcf3e5; color: #d47b0a;'; ?>">
                                                <?php echo $task->status === 'completed' ? __('Completed', 'sakwood') : __('Pending', 'sakwood'); ?>
                                            </span>
                                        </td>
                                        <td>
                                            <?php if ($task->status !== 'completed'): ?>
                                                <a href="#" class="crm-complete-task" data-task-id="<?php echo esc_attr($task->id); ?>">
                                                    <?php _e('Complete', 'sakwood'); ?>
                                                </a>
                                                <span class="divider">|</span>
                                            <?php endif; ?>
                                            <a href="#" class="crm-edit-task" data-task-id="<?php echo esc_attr($task->id); ?>">
                                                <?php _e('Edit', 'sakwood'); ?>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php else: ?>
                        <p><?php _e('No tasks found.', 'sakwood'); ?></p>
                    <?php endif; ?>

                <?php elseif ($active_tab === 'orders'): ?>
                    <!-- Orders Tab -->
                    <h2 style="margin-top: 0;"><?php _e('Order History', 'sakwood'); ?></h2>
                    <p><?php _e('Order history integration with WooCommerce coming soon.', 'sakwood'); ?></p>

                    <?php if (isset($customer->total_orders) && $customer->total_orders > 0): ?>
                        <div style="padding: 20px; background: #f0f0f1; border-radius: 4px; text-align: center;">
                            <p style="margin: 0; font-size: 14px;">
                                <?php
                                printf(
                                    __('This customer has placed %d orders totaling %s', 'sakwood'),
                                    intval($customer->total_orders),
                                    isset($customer->total_spent) ? number_format(floatval($customer->total_spent), 2) . ' ฿' : '0 ฿'
                                );
                                ?>
                            </p>
                        </div>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        </div>

        <!-- Right Column: Statistics -->
        <div>
            <!-- Statistics Cards -->
            <div class="crm-stats" style="display: grid; gap: 15px;">
                <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; color: #646970; font-weight: 600;">
                        <?php _e('Total Orders', 'sakwood'); ?>
                    </h3>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #1d2327;">
                        <?php echo intval($customer->total_orders ?? 0); ?>
                    </p>
                </div>

                <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; color: #646970; font-weight: 600;">
                        <?php _e('Total Spent', 'sakwood'); ?>
                    </h3>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #1d2327;">
                        <?php echo isset($customer->total_spent) ? number_format(floatval($customer->total_spent), 0) . ' ฿' : '0 ฿'; ?>
                    </p>
                </div>

                <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; color: #646970; font-weight: 600;">
                        <?php _e('Avg Order Value', 'sakwood'); ?>
                    </h3>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #1d2327;">
                        <?php
                        $avg_order = isset($customer->total_spent) && isset($customer->total_orders) && $customer->total_orders > 0
                            ? floatval($customer->total_spent) / intval($customer->total_orders)
                            : 0;
                        echo number_format($avg_order, 0) . ' ฿';
                        ?>
                    </p>
                </div>

                <?php if (isset($customer->last_order_date)): ?>
                <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; color: #646970; font-weight: 600;">
                        <?php _e('Last Order', 'sakwood'); ?>
                    </h3>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1d2327;">
                        <?php echo date_i18n(get_option('date_format'), strtotime($customer->last_order_date)); ?>
                    </p>
                </div>
                <?php endif; ?>

                <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; color: #646970; font-weight: 600;">
                        <?php _e('Total Interactions', 'sakwood'); ?>
                    </h3>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #1d2327;">
                        <?php echo count($interactions); ?>
                    </p>
                </div>

                <div style="background: #fff; padding: 20px; border: 1px solid #c3c4c7; border-radius: 4px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; color: #646970; font-weight: 600;">
                        <?php _e('Pending Tasks', 'sakwood'); ?>
                    </h3>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: <?php echo count(array_filter($tasks, fn($t) => $t->status !== 'completed')) > 0 ? '#d63638' : '#1d2327'; ?>;">
                        <?php echo count(array_filter($tasks, fn($t) => $t->status !== 'completed')); ?>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Add Interaction Modal (reused from customers.php) -->
<div id="crm-interaction-modal" class="crm-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 100000; align-items: center; justify-content: center;">
    <div class="crm-modal-content" style="background: #fff; padding: 20px; border-radius: 8px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <h2 style="margin-top: 0;"><?php _e('Add Interaction', 'sakwood'); ?></h2>
        <form id="crm-interaction-form" style="margin-top: 15px;">
            <input type="hidden" name="customer_id" id="crm-interaction-customer-id" value="">
            <input type="hidden" name="action" value="sakwood_crm_add_interaction">

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Interaction Type', 'sakwood'); ?> <span class="required">*</span>
                </label>
                <select name="interaction_type" required style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
                    <option value=""><?php _e('Select type...', 'sakwood'); ?></option>
                    <option value="call"><?php _e('Call', 'sakwood'); ?></option>
                    <option value="email"><?php _e('Email', 'sakwood'); ?></option>
                    <option value="line"><?php _e('LINE', 'sakwood'); ?></option>
                    <option value="visit"><?php _e('Visit', 'sakwood'); ?></option>
                    <option value="note"><?php _e('Note', 'sakwood'); ?></option>
                </select>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Subject', 'sakwood'); ?> <span class="required">*</span>
                </label>
                <input type="text" name="subject" required style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Message', 'sakwood'); ?>
                </label>
                <textarea name="message" rows="4" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;"></textarea>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Direction', 'sakwood'); ?>
                </label>
                <div>
                    <label style="margin-right: 15px;">
                        <input type="radio" name="direction" value="inbound" checked>
                        <?php _e('Inbound', 'sakwood'); ?>
                    </label>
                    <label>
                        <input type="radio" name="direction" value="outbound">
                        <?php _e('Outbound', 'sakwood'); ?>
                    </label>
                </div>
            </div>

            <div style="text-align: right;">
                <button type="button" class="button" onclick="closeModal('crm-interaction-modal')" style="margin-right: 10px;">
                    <?php _e('Cancel', 'sakwood'); ?>
                </button>
                <button type="submit" class="button button-primary">
                    <?php _e('Save Interaction', 'sakwood'); ?>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Add Task Modal -->
<div id="crm-task-modal" class="crm-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 100000; align-items: center; justify-content: center;">
    <div class="crm-modal-content" style="background: #fff; padding: 20px; border-radius: 8px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <h2 style="margin-top: 0;"><?php _e('Add Task', 'sakwood'); ?></h2>
        <form id="crm-task-form" style="margin-top: 15px;">
            <input type="hidden" name="customer_id" id="crm-task-customer-id" value="">
            <input type="hidden" name="action" value="sakwood_crm_add_task">

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Task Title', 'sakwood'); ?> <span class="required">*</span>
                </label>
                <input type="text" name="title" required style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Description', 'sakwood'); ?>
                </label>
                <textarea name="description" rows="3" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;"></textarea>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Priority', 'sakwood'); ?>
                </label>
                <select name="priority" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
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
                <input type="date" name="due_date" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Assigned To', 'sakwood'); ?>
                </label>
                <input type="text" name="assigned_to" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;" placeholder="<?php _e('Enter name or leave blank', 'sakwood'); ?>">
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
.crm-modal.active { display: flex !important; }
.crm-task-overdue { animation: pulse 2s infinite; }
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.9; }
}
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

// Add Interaction button
document.querySelectorAll('.crm-add-interaction-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        var customerId = this.getAttribute('data-customer-id');
        document.getElementById('crm-interaction-customer-id').value = customerId;
        openModal('crm-interaction-modal');
    });
});

// Add Task button
document.querySelectorAll('.crm-add-task-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        var customerId = this.getAttribute('data-customer-id');
        document.getElementById('crm-task-customer-id').value = customerId;
        openModal('crm-task-modal');
    });
});

// Complete Task action
document.querySelectorAll('.crm-complete-task').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('<?php _e('Are you sure you want to mark this task as complete?', 'sakwood'); ?>')) {
            var taskId = this.getAttribute('data-task-id');
            // TODO: Implement AJAX to complete task
            alert('Task completion will be implemented with AJAX');
        }
    });
});
</script>
