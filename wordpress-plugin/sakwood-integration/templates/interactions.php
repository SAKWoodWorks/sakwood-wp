<?php
/**
 * CRM Interactions Log Template
 * Displays all interactions with filters, search, and export
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Get current page and pagination parameters
$page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
$per_page = 25;
$offset = ($page - 1) * $per_page;

// Get filters
$interaction_type = isset($_GET['interaction_type']) ? sanitize_text_field($_GET['interaction_type']) : '';
$direction = isset($_GET['direction']) ? sanitize_text_field($_GET['direction']) : '';
$date_from = isset($_GET['date_from']) ? sanitize_text_field($_GET['date_from']) : '';
$date_to = isset($_GET['date_to']) ? sanitize_text_field($_GET['date_to']) : '';
$customer_id = isset($_GET['customer_id']) ? intval($_GET['customer_id']) : '';
$search = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';

// Build query args for fetching interactions
$args = [
    'interaction_type' => $interaction_type,
    'direction' => $direction,
    'date_from' => $date_from,
    'date_to' => $date_to,
    'customer_id' => $customer_id,
    'search' => $search,
    'offset' => $offset,
    'limit' => $per_page,
];

// Fetch interactions using the CRM class
if (class_exists('Sakwood_CRM_Interaction')) {
    $interactions_result = Sakwood_CRM_Interaction::get_interactions($args);
    $interactions = $interactions_result['success'] ? $interactions_result['data'] : [];
    $total = Sakwood_CRM_Interaction::get_total_count($args);
} else {
    $interactions = [];
    $total = 0;
}

// Build URL for filters
$base_url = admin_url('admin.php?page=sakwood-crm-interactions');
?>

<div class="wrap sakwood-crm-interactions">
    <h1 class="wp-heading-inline"><?php _e('Interactions Log', 'sakwood'); ?></h1>

    <a href="#" class="page-title-action crm-add-interaction-btn">
        <?php _e('+ Add Interaction', 'sakwood'); ?>
    </a>

    <a href="#" class="page-title-action" id="crm-export-interactions" style="margin-left: 5px;">
        <?php _e('Export CSV', 'sakwood'); ?>
    </a>

    <hr class="wp-header-end">

    <!-- Filters -->
    <div class="crm-filters" style="margin: 20px 0; padding: 15px; background: #fff; border: 1px solid #ccd0d4; border-radius: 4px;">
        <form method="get" action="<?php echo esc_url($base_url); ?>">
            <input type="hidden" name="page" value="sakwood-crm-interactions">

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
                           placeholder="<?php _e('Search by subject or message...', 'sakwood'); ?>"
                           style="width: 100%; max-width: 300px; padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                </div>

                <!-- Customer Filter -->
                <div>
                    <label for="crm-customer-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Customer', 'sakwood'); ?>
                    </label>
                    <select name="customer_id" id="crm-customer-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px; min-width: 200px;">
                        <option value=""><?php _e('All Customers', 'sakwood'); ?></option>
                        <?php
                        // Fetch customers for dropdown
                        if (class_exists('Sakwood_CRM_Customer')) {
                            $customers_list = Sakwood_CRM_Customer::get_customers(['limit' => 100]);
                            if ($customers_list['success']) {
                                foreach ($customers_list['data'] as $cust) {
                                    $selected = $customer_id == $cust->id ? 'selected' : '';
                                    echo '<option value="' . esc_attr($cust->id) . '" ' . $selected . '>' . esc_html($cust->first_name . ' ' . $cust->last_name) . '</option>';
                                }
                            }
                        }
                        ?>
                    </select>
                </div>

                <!-- Interaction Type Filter -->
                <div>
                    <label for="crm-type-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Type', 'sakwood'); ?>
                    </label>
                    <select name="interaction_type" id="crm-type-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value=""><?php _e('All Types', 'sakwood'); ?></option>
                        <option value="call" <?php selected($interaction_type, 'call'); ?>><?php _e('Call', 'sakwood'); ?></option>
                        <option value="email" <?php selected($interaction_type, 'email'); ?>><?php _e('Email', 'sakwood'); ?></option>
                        <option value="line" <?php selected($interaction_type, 'line'); ?>><?php _e('LINE', 'sakwood'); ?></option>
                        <option value="visit" <?php selected($interaction_type, 'visit'); ?>><?php _e('Visit', 'sakwood'); ?></option>
                        <option value="note" <?php selected($interaction_type, 'note'); ?>><?php _e('Note', 'sakwood'); ?></option>
                    </select>
                </div>

                <!-- Direction Filter -->
                <div>
                    <label for="crm-direction-filter" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Direction', 'sakwood'); ?>
                    </label>
                    <select name="direction" id="crm-direction-filter" style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                        <option value=""><?php _e('All Directions', 'sakwood'); ?></option>
                        <option value="inbound" <?php selected($direction, 'inbound'); ?>><?php _e('Inbound', 'sakwood'); ?></option>
                        <option value="outbound" <?php selected($direction, 'outbound'); ?>><?php _e('Outbound', 'sakwood'); ?></option>
                    </select>
                </div>

                <!-- Date Range -->
                <div>
                    <label for="crm-date-from" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('From', 'sakwood'); ?>
                    </label>
                    <input type="date"
                           name="date_from"
                           id="crm-date-from"
                           value="<?php echo esc_attr($date_from); ?>"
                           style="padding: 8px 12px; border: 1px solid #8c8f94; border-radius: 4px;">
                </div>

                <div>
                    <label for="crm-date-to" style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('To', 'sakwood'); ?>
                    </label>
                    <input type="date"
                           name="date_to"
                           id="crm-date-to"
                           value="<?php echo esc_attr($date_to); ?>"
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

    <!-- Interactions Table -->
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th scope="col" style="width: 15%;"><?php _e('Date', 'sakwood'); ?></th>
                <th scope="col" style="width: 20%;"><?php _e('Customer', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Type', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Direction', 'sakwood'); ?></th>
                <th scope="col" style="width: 25%;"><?php _e('Subject', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Created By', 'sakwood'); ?></th>
                <th scope="col" style="width: 10%;"><?php _e('Actions', 'sakwood'); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($interactions)): ?>
                <tr>
                    <td colspan="7">
                        <?php _e('No interactions found.', 'sakwood'); ?>
                    </td>
                </tr>
            <?php else: ?>
                <?php foreach ($interactions as $interaction): ?>
                    <tr>
                        <td>
                            <div style="font-size: 13px;">
                                <?php echo date_i18n(get_option('date_format'), strtotime($interaction->created_at)); ?>
                            </div>
                            <div style="font-size: 11px; color: #646970;">
                                <?php echo date_i18n(get_option('time_format'), strtotime($interaction->created_at)); ?>
                            </div>
                        </td>
                        <td>
                            <?php if (isset($interaction->customer_name)): ?>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=sakwood-crm-customer&customer_id=' . $interaction->customer_id)); ?>">
                                    <?php echo esc_html($interaction->customer_name); ?>
                                </a>
                            <?php else: ?>
                                <span style="color: #646970;">—</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php
                            $icons = [
                                'call' => '📞',
                                'email' => '✉️',
                                'line' => '💬',
                                'visit' => '🏢',
                                'note' => '📝',
                            ];
                            ?>
                            <span style="font-size: 20px;">
                                <?php echo isset($icons[$interaction->interaction_type]) ? $icons[$interaction->interaction_type] : '📌'; ?>
                            </span>
                            <div style="font-size: 11px; color: #646970; margin-top: 3px;">
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
                            </div>
                        </td>
                        <td>
                            <span class="crm-direction-badge crm-direction-<?php echo esc_attr($interaction->direction); ?>"
                                  style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;
                                  <?php echo $interaction->direction === 'inbound' ? 'background: #d7edc9; color: #1c5c1f;' : 'background: #dbe5ff; color: #1855b3;'; ?>">
                                <?php echo $interaction->direction === 'inbound' ? __('In', 'sakwood') : __('Out', 'sakwood'); ?>
                            </span>
                        </td>
                        <td>
                            <strong><?php echo esc_html($interaction->subject); ?></strong>
                            <?php if ($interaction->message): ?>
                                <p style="margin: 5px 0 0 0; font-size: 12px; color: #646970;">
                                    <?php echo esc_html(substr($interaction->message, 0, 80)); ?>
                                    <?php echo strlen($interaction->message) > 80 ? '...' : ''; ?>
                                </p>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php echo esc_html($interaction->created_by_name); ?>
                        </td>
                        <td>
                            <div class="row-actions">
                                <a href="#" class="crm-view-interaction" data-interaction-id="<?php echo esc_attr($interaction->id); ?>">
                                    <?php _e('View', 'sakwood'); ?>
                                </a>
                                <span class="divider">|</span>
                                <a href="#" class="crm-edit-interaction" data-interaction-id="<?php echo esc_attr($interaction->id); ?>">
                                    <?php _e('Edit', 'sakwood'); ?>
                                </a>
                                <span class="divider">|</span>
                                <a href="#" class="crm-delete-interaction" data-interaction-id="<?php echo esc_attr($interaction->id); ?>" style="color: #d63638;">
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
                $current_url = admin_url('admin.php?page=sakwood-crm-interactions');

                // Preserve filters
                $query_args = [];
                if ($interaction_type) $query_args['interaction_type'] = $interaction_type;
                if ($direction) $query_args['direction'] = $direction;
                if ($date_from) $query_args['date_from'] = $date_from;
                if ($date_to) $query_args['date_to'] = $date_to;
                if ($customer_id) $query_args['customer_id'] = $customer_id;
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
                    _n('%s interaction', '%s interactions', $total, 'sakwood'),
                    number_format_i18n($total)
                );
                ?>
            </div>
        </div>
    <?php endif; ?>

    <!-- Interaction Summary -->
    <?php if (!empty($interactions)): ?>
        <div style="margin-top: 20px; padding: 15px; background: #f0f6fc; border: 1px solid #c3c4c7; border-radius: 4px;">
            <?php
            $call_count = count(array_filter($interactions, fn($i) => $i->interaction_type === 'call'));
            $email_count = count(array_filter($interactions, fn($i) => $i->interaction_type === 'email'));
            $line_count = count(array_filter($interactions, fn($i) => $i->interaction_type === 'line'));
            $inbound_count = count(array_filter($interactions, fn($i) => $i->direction === 'inbound'));
            $outbound_count = count(array_filter($interactions, fn($i) => $i->direction === 'outbound'));
            ?>
            <strong><?php _e('Interaction Summary:', 'sakwood'); ?></strong>
            📞 <?php echo $call_count; ?> |
            ✉️ <?php echo $email_count; ?> |
            💬 <?php echo $line_count; ?> |
            <?php _e('In:', 'sakwood'); ?> <?php echo $inbound_count; ?> |
            <?php _e('Out:', 'sakwood'); ?> <?php echo $outbound_count; ?>
        </div>
    <?php endif; ?>
</div>

<!-- Add/Edit Interaction Modal -->
<div id="crm-interaction-modal" class="crm-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 100000; align-items: center; justify-content: center;">
    <div class="crm-modal-content" style="background: #fff; padding: 20px; border-radius: 8px; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <h2 id="crm-interaction-modal-title" style="margin-top: 0;"><?php _e('Add Interaction', 'sakwood'); ?></h2>
        <form id="crm-interaction-form" style="margin-top: 15px;">
            <input type="hidden" name="interaction_id" id="crm-interaction-id" value="">
            <input type="hidden" name="action" value="sakwood_crm_save_interaction">

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Customer', 'sakwood'); ?> <span class="required">*</span>
                </label>
                <select name="customer_id" id="crm-interaction-customer-id" required style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
                    <option value=""><?php _e('Select a customer', 'sakwood'); ?></option>
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

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                        <?php _e('Interaction Type', 'sakwood'); ?> <span class="required">*</span>
                    </label>
                    <select name="interaction_type" id="crm-interaction-type" required style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
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
                        <?php _e('Direction', 'sakwood'); ?>
                    </label>
                    <div style="padding: 8px 0;">
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
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Subject', 'sakwood'); ?> <span class="required">*</span>
                </label>
                <input type="text" name="subject" id="crm-interaction-subject" required style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    <?php _e('Message', 'sakwood'); ?>
                </label>
                <textarea name="message" id="crm-interaction-message" rows="5" style="width: 100%; padding: 8px; border: 1px solid #8c8f94; border-radius: 4px;"></textarea>
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

<!-- View Interaction Modal -->
<div id="crm-view-interaction-modal" class="crm-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 100000; align-items: center; justify-content: center;">
    <div class="crm-modal-content" style="background: #fff; padding: 25px; border-radius: 8px; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto;">
        <div id="crm-view-interaction-content"></div>
        <div style="text-align: right; margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
            <button type="button" class="button button-primary" onclick="closeModal('crm-view-interaction-modal')">
                <?php _e('Close', 'sakwood'); ?>
            </button>
        </div>
    </div>
</div>

<style>
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

// Add Interaction button
document.querySelector('.crm-add-interaction-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('crm-interaction-modal-title').textContent = '<?php _e('Add Interaction', 'sakwood'); ?>';
    document.getElementById('crm-interaction-form').reset();
    document.getElementById('crm-interaction-id').value = '';
    openModal('crm-interaction-modal');
});

// View Interaction action
document.querySelectorAll('.crm-view-interaction').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var interactionId = this.getAttribute('data-interaction-id');
        // TODO: Load interaction details via AJAX and display
        document.getElementById('crm-view-interaction-content').innerHTML = '<p>Loading...</p>';
        openModal('crm-view-interaction-modal');
    });
});

// Edit Interaction action
document.querySelectorAll('.crm-edit-interaction').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var interactionId = this.getAttribute('data-interaction-id');
        // TODO: Load interaction data via AJAX and populate form
        document.getElementById('crm-interaction-modal-title').textContent = '<?php _e('Edit Interaction', 'sakwood'); ?>';
        document.getElementById('crm-interaction-id').value = interactionId;
        openModal('crm-interaction-modal');
    });
});

// Delete Interaction action
document.querySelectorAll('.crm-delete-interaction').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('<?php _e('Are you sure you want to delete this interaction? This cannot be undone.', 'sakwood'); ?>')) {
            var interactionId = this.getAttribute('data-interaction-id');
            // TODO: Implement AJAX to delete interaction
            alert('Delete interaction: ' + interactionId);
        }
    });
});

// Export CSV
document.getElementById('crm-export-interactions').addEventListener('click', function(e) {
    e.preventDefault();
    // TODO: Implement CSV export
    alert('CSV export will be implemented');
});
</script>
