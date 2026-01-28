<?php
/**
 * CRM Customers List Template
 * Displays all customers with search, filters, and pagination
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
$customer_type = isset($_GET['customer_type']) ? sanitize_text_field($_GET['customer_type']) : '';
$search = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
$status = isset($_GET['status']) ? sanitize_text_field($_GET['status']) : '';

// Build query args for fetching customers
$args = [
    'type' => $customer_type,
    'search' => $search,
    'status' => $status,
    'offset' => $offset,
    'limit' => $per_page,
];

// Fetch customers using the CRM class
if (class_exists('Sakwood_CRM_Customer')) {
    $customers_result = Sakwood_CRM_Customer::get_customers($args);
    $customers = $customers_result['success'] ? $customers_result['data'] : [];
    $total = Sakwood_CRM_Customer::get_total_count($args);
} else {
    $customers = [];
    $total = 0;
}

// Build URL for filters
$base_url = admin_url('admin.php?page=sakwood-crm-customers');
?>

<div class="wrap sakwood-crm-customers">
    <h1 class="wp-heading-inline"><?php _e('Customers', 'sakwood'); ?></h1>

    <a href="<?php echo esc_url($base_url); ?>&action=add" class="page-title-action">
        <?php _e('Add New Customer', 'sakwood'); ?>
    </a>

    <hr class="wp-header-end">

    <!-- Filters -->
    <div class="crm-filters" style="margin: 20px 0; padding: 15px; background: #fff; border: 1px solid #ccd0d4; border-radius: 4px;">
        <form method="get" action="<?php echo esc_url($base_url); ?>">
            <input type="hidden" name="page" value="sakwood-crm-customers">

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
                           placeholder="<?php _e('Search by name, email, or company...', 'sakwood'); ?>"
                           style="width: 100%; max-width: 300px; padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                </div>

                <!-- Customer Type Filter -->
                <div>
                    <label for="crm-type-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Customer Type', 'sakwood'); ?>
                    </label>
                    <select name="customer_type" id="crm-type-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value=""><?php _e('All Types', 'sakwood'); ?></option>
                        <option value="retail" <?php selected($customer_type, 'retail'); ?>><?php _e('Retail', 'sakwood'); ?></option>
                        <option value="wholesale" <?php selected($customer_type, 'wholesale'); ?>><?php _e('Wholesale', 'sakwood'); ?></option>
                        <option value="vip" <?php selected($customer_type, 'vip'); ?>><?php _e('VIP', 'sakwood'); ?></option>
                    </select>
                </div>

                <!-- Status Filter -->
                <div>
                    <label for="crm-status-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Status', 'sakwood'); ?>
                    </label>
                    <select name="status" id="crm-status-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value=""><?php _e('All Status', 'sakwood'); ?></option>
                        <option value="active" <?php selected($status, 'active'); ?>><?php _e('Active', 'sakwood'); ?></option>
                        <option value="inactive" <?php selected($status, 'inactive'); ?>><?php _e('Inactive', 'sakwood'); ?></option>
                    </select>
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

    <!-- Customers Table -->
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th scope="col" style="width: 20%;"><?php _e('Name', 'sakwood'); ?></th>
                <th scope="col" style="width: 20%;"><?php _e('Email', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Type', 'sakwood'); ?></th>
                <th scope="col" style="width: 15%;"><?php _e('Phone', 'sakwood'); ?></th>
                <th scope="col" style="width: 15%;"><?php _e('Company', 'sakwood'); ?></th>
                <th scope="col" style="width: 5%; text-align: center;"><?php _e('Orders', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%; text-align: right;"><?php _e('Spent', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Actions', 'sakwood'); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($customers)): ?>
                <tr>
                    <td colspan="8">
                        <?php _e('No customers found.', 'sakwood'); ?>
                    </td>
                </tr>
            <?php else: ?>
                <?php foreach ($customers as $customer): ?>
                    <tr>
                        <td>
                            <strong>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $customer->id)); ?>">
                                    <?php echo esc_html($customer->first_name . ' ' . $customer->last_name); ?>
                                </a>
                            </strong>
                        </td>
                        <td>
                            <a href="mailto:<?php echo esc_attr($customer->email); ?>">
                                <?php echo esc_html($customer->email); ?>
                            </a>
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
                        <td><?php echo esc_html($customer->phone ?? '-'); ?></td>
                        <td><?php echo esc_html($customer->company ?? '-'); ?></td>
                        <td style="text-align: center;"><?php echo intval($customer->total_orders ?? 0); ?></td>
                        <td style="text-align: right;">
                            <?php echo isset($customer->total_spent) ? number_format(floatval($customer->total_spent), 2) . ' ฿' : '-'; ?>
                        </td>
                        <td>
                            <div class="row-actions">
                                <a href="<?php echo esc_url(admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $customer->id)); ?>">
                                    <?php _e('View Details', 'sakwood'); ?>
                                </a>
                                <span class="divider">|</span>
                                <a href="#" class="crm-add-interaction" data-customer-id="<?php echo esc_attr($customer->id); ?>">
                                    <?php _e('Add Note', 'sakwood'); ?>
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
                $current_url = admin_url('admin.php?page=sakwood-crm-customers');

                if ($page > 1) {
                    echo '<a class="button" href="' . esc_url(add_query_arg('paged', $page - 1, $current_url)) . '">&laquo;</a>';
                }

                for ($i = 1; $i <= $total_pages; $i++) {
                    if ($i == $page) {
                        echo '<span class="paging-input">' . $i . '</span>';
                    } else {
                        echo '<a class="button" href="' . esc_url(add_query_arg('paged', $i, $current_url)) . '">' . $i . '</a>';
                    }
                }

                if ($page < $total_pages) {
                    echo '<a class="button" href="' . esc_url(add_query_arg('paged', $page + 1, $current_url)) . '">&raquo;</a>';
                }
                ?>
            </div>
        </div>
    <?php endif; ?>
</div>

<!-- Add Interaction Modal -->
<div id="crm-interaction-modal" class="crm-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 100000; align-items: center; justify-content: center;">
    <div class="crm-modal-content" style="background: #fff; padding: 20px; border-radius: 8px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <h2 style="margin-top: 0;"><?php _e('Add Interaction', 'sakwood'); ?></h2>
        <form id="crm-interaction-form" style="margin-top: 15px;">
            <input type="hidden" name="customer_id" id="crm-interaction-customer-id" value="">

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

<style>
.crm-badge-retail { background: #f0f0f1; color: #1d2327; }
.crm-badge-wholesale { background: #dbe5ff; color: #1855b3; }
.crm-badge-vip { background: #f6eced; color: #8a2487; }
.crm-modal.active { display: flex !important; }
</style>

<script>
// Open modal for adding interaction
document.querySelectorAll('.crm-add-interaction').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var customerId = this.getAttribute('data-customer-id');
        document.getElementById('crm-interaction-customer-id').value = customerId;
        document.getElementById('crm-interaction-modal').classList.add('active');
    });
});

// Close modal function
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
</script>
