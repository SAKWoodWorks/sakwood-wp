<?php
/**
 * Customer List Partial
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<!-- Filters -->
<div class="sakwood-crm-filters">
    <form method="get">
        <input type="hidden" name="page" value="sakwood-crm-customers">

        <select name="customer_type">
            <option value="">All Types</option>
            <option value="retail" <?php selected(isset($_GET['customer_type']) && $_GET['customer_type'] === 'retail'); ?>>Retail</option>
            <option value="wholesale" <?php selected(isset($_GET['customer_type']) && $_GET['customer_type'] === 'wholesale'); ?>>Wholesale</option>
            <option value="vip" <?php selected(isset($_GET['customer_type']) && $_GET['customer_type'] === 'vip'); ?>>VIP</option>
        </select>

        <select name="status">
            <option value="">All Statuses</option>
            <option value="active" <?php selected(isset($_GET['status']) && $_GET['status'] === 'active'); ?>>Active</option>
            <option value="inactive" <?php selected(isset($_GET['status']) && $_GET['status'] === 'inactive'); ?>>Inactive</option>
            <option value="blocked" <?php selected(isset($_GET['status']) && $_GET['status'] === 'blocked'); ?>>Blocked</option>
        </select>

        <input type="text" name="s" placeholder="Search customers..." value="<?php echo isset($_GET['s']) ? esc_attr($_GET['s']) : ''; ?>">

        <button type="submit" class="button">Filter</button>
        <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers'); ?>" class="button">Reset</a>
    </form>
</div>

<!-- Customer Table -->
<?php if (!empty($result['customers'])): ?>
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Type</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($result['customers'] as $customer): ?>
                <tr>
                    <td>
                        <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers&customer_id=' . $customer->id); ?>">
                            <strong><?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?></strong>
                        </a>
                    </td>
                    <td><?php echo esc_html($customer->email); ?></td>
                    <td><?php echo esc_html($customer->phone ?: '-'); ?></td>
                    <td><?php echo esc_html($customer->company ?: '-'); ?></td>
                    <td>
                        <span class="sakwood-crm-badge sakwood-crm-badge-<?php echo esc_attr($customer->customer_type); ?>">
                            <?php echo esc_html(ucfirst($customer->customer_type)); ?>
                        </span>
                    </td>
                    <td><?php echo number_format($customer->total_orders); ?></td>
                    <td>฿<?php echo number_format($customer->total_spent, 2); ?></td>
                    <td>
                        <?php if ($customer->last_order_date): ?>
                            <?php echo human_time_diff(strtotime($customer->last_order_date), current_time('timestamp')) . ' ago'; ?>
                        <?php else: ?>
                            -
                        <?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Pagination -->
    <?php if ($result['pages'] > 1): ?>
        <div class="sakwood-crm-pagination">
            <?php
            $current_page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
            $base_url = admin_url('admin.php?page=sakwood-crm-customers');

            if ($current_page > 1): ?>
                <a href="<?php echo add_query_arg('paged', $current_page - 1, $base_url); ?>" class="button">← Previous</a>
            <?php endif; ?>

            <span class="sakwood-crm-page-info">
                Page <?php echo $current_page; ?> of <?php echo $result['pages']; ?>
            </span>

            <?php if ($current_page < $result['pages']): ?>
                <a href="<?php echo add_query_arg('paged', $current_page + 1, $base_url); ?>" class="button">Next →</a>
            <?php endif; ?>
        </div>
    <?php endif; ?>

<?php else: ?>
    <p>No customers found.</p>
<?php endif; ?>

<style>
.sakwood-crm-filters {
    background: #fff;
    border: 1px solid #ccc;
    padding: 15px;
    margin: 20px 0;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.sakwood-crm-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.sakwood-crm-page-info {
    font-weight: bold;
}
</style>
