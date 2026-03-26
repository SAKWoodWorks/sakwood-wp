<?php
/**
 * Admin View: Segment Members
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Initialize database
Sakwood_Segment_Database::init();

// Get segment ID
$segment_id = isset($_GET['segment_id']) ? intval($_GET['segment_id']) : 0;
$segment = $segment_id ? Sakwood_Segment_Database::get_segment($segment_id) : null;

if (!$segment) {
    wp_die(__('Invalid segment', 'sakwood-integration'));
}

// Get members
$members = Sakwood_Segment_Database::get_members($segment_id, array(
    'limit' => 200,
));

// Get all customers for manual addition
$customers = get_users(array(
    'role__in' => array('customer', 'wholesale_customer', 'dealer'),
    'orderby' => 'display_name',
    'order' => 'ASC',
));
?>

<div class="wrap sakwood-members-page">
    <h1 class="wp-heading-inline">
        <?php echo esc_html($segment['name']); ?> - <?php _e('Members', 'sakwood-integration'); ?>
    </h1>
    
    <a href="<?php echo admin_url('admin.php?page=sakwood-segments'); ?>" class="page-title-action">
        <?php _e('Back to Segments', 'sakwood-integration'); ?>
    </a>

    <hr class="wp-header-end">

    <!-- Segment Info -->
    <div class="sakwood-segment-info">
        <div class="info-row">
            <strong><?php _e('Type:', 'sakwood-integration'); ?></strong>
            <span><?php echo ucfirst($segment['type']); ?></span>
        </div>
        <div class="info-row">
            <strong><?php _e('Total Members:', 'sakwood-integration'); ?></strong>
            <span><?php echo number_format_i18n($segment['customer_count']); ?></span>
        </div>
        <div class="info-row">
            <strong><?php _e('Total Revenue:', 'sakwood-integration'); ?></strong>
            <span><?php echo number_format_i18n($segment['total_revenue'], 2); ?> ฿</span>
        </div>
        
        <?php if ($segment['type'] === 'dynamic') : ?>
            <button type="button" class="button button-primary evaluate-segment" data-segment-id="<?php echo $segment_id; ?>">
                <span class="dashicons dashicons-update"></span>
                <?php _e('Re-evaluate Rules', 'sakwood-integration'); ?>
            </button>
        <?php endif; ?>
        
        <button type="button" class="button" onclick="exportMembers()">
            <span class="dashicons dashicons-download"></span>
            <?php _e('Export CSV', 'sakwood-integration'); ?>
        </button>
    </div>

    <!-- Add Member (Manual Segments Only) -->
    <?php if ($segment['type'] === 'manual') : ?>
    <div class="postbox" style="margin-top: 20px;">
        <h2 class="hndle"><span><?php _e('Add Member', 'sakwood-integration'); ?></span></h2>
        <div class="inside">
            <select id="add-member-customer" class="regular-text">
                <option value=""><?php _e('Select a customer...', 'sakwood-integration'); ?></option>
                <?php foreach ($customers as $customer) : ?>
                    <option value="<?php echo $customer->ID; ?>">
                        <?php echo esc_html($customer->display_name . ' (' . $customer->user_email . ')'); ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <button type="button" id="add-member-btn" class="button button-secondary" style="margin-left: 10px;">
                <?php _e('Add to Segment', 'sakwood-integration'); ?>
            </button>
        </div>
    </div>
    <?php endif; ?>

    <!-- Members Table -->
    <div class="sakwood-table-container">
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('Customer', 'sakwood-integration'); ?></th>
                    <th><?php _e('Email', 'sakwood-integration'); ?></th>
                    <th><?php _e('Assigned Date', 'sakwood-integration'); ?></th>
                    <th><?php _e('Assigned By', 'sakwood-integration'); ?></th>
                    <th><?php _e('Actions', 'sakwood-integration'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($members)) : ?>
                    <tr>
                        <td colspan="5" class="text-center">
                            <?php _e('No members in this segment yet.', 'sakwood-integration'); ?>
                        </td>
                    </tr>
                <?php else : ?>
                    <?php foreach ($members as $member) : ?>
                        <tr>
                            <td>
                                <strong><?php echo esc_html($member['customer_name'] ?? 'N/A'); ?></strong>
                            </td>
                            <td>
                                <?php echo esc_html($member['customer_email'] ?? 'N/A'); ?>
                            </td>
                            <td>
                                <?php echo date_i18n(get_option('date_format'), strtotime($member['assigned_at'])); ?>
                            </td>
                            <td>
                                <span class="assigned-by-badge <?php echo esc_attr($member['assigned_by']); ?>">
                                    <?php echo ucfirst($member['assigned_by']); ?>
                                </span>
                            </td>
                            <td>
                                <?php if ($segment['type'] === 'manual') : ?>
                                    <button type="button" class="button button-small remove-member" 
                                            data-segment-id="<?php echo $segment_id; ?>" 
                                            data-customer-id="<?php echo $member['customer_id']; ?>">
                                        <span class="dashicons dashicons-no"></span>
                                        <?php _e('Remove', 'sakwood-integration'); ?>
                                    </button>
                                <?php else : ?>
                                    <span class="description"><?php _e('Auto-managed', 'sakwood-integration'); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<style>
.sakwood-members-page {
    max-width: 1400px;
}

.sakwood-segment-info {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap;
}

.info-row {
    display: flex;
    gap: 10px;
}

.info-row strong {
    min-width: 120px;
}

.assigned-by-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    background: #f0f0f1;
}

.assigned-by-badge.manual {
    background: #dbeafe;
    color: #1e40af;
}

.assigned-by-badge.system {
    background: #e0e7ff;
    color: #4338ca;
}

.sakwood-table-container {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
}
</style>

<script>
jQuery(document).ready(function($) {
    // Add member
    $('#add-member-btn').on('click', function() {
        const customerId = $('#add-member-customer').val();
        
        if (!customerId) {
            alert('<?php _e('Please select a customer', 'sakwood-integration'); ?>');
            return;
        }

        const $btn = $(this);
        $btn.prop('disabled', true).text(sakwoodSegmentAdmin.strings.saving);

        $.ajax({
            url: sakwoodSegmentAdmin.apiUrl + '/segments/<?php echo $segment_id; ?>/members',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'X-WP-Nonce': sakwoodSegmentAdmin.nonce
            },
            data: JSON.stringify({
                customer_id: customerId
            }),
            success: function(response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                    $btn.prop('disabled', false).text('<?php _e('Add to Segment', 'sakwood-integration'); ?>');
                }
            },
            error: function() {
                alert(sakwoodSegmentAdmin.strings.error);
                $btn.prop('disabled', false).text('<?php _e('Add to Segment', 'sakwood-integration'); ?>');
            }
        });
    });

    // Remove member
    $('.remove-member').on('click', function() {
        if (!confirm('<?php _e('Are you sure you want to remove this customer from the segment?', 'sakwood-integration'); ?>')) {
            return;
        }

        const $btn = $(this);
        const segmentId = $btn.data('segment-id');
        const customerId = $btn.data('customer-id');

        $.ajax({
            url: sakwoodSegmentAdmin.apiUrl + '/segments/' + segmentId + '/members/' + customerId,
            type: 'DELETE',
            headers: {
                'X-WP-Nonce': sakwoodSegmentAdmin.nonce
            },
            success: function(response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                }
            },
            error: function() {
                alert(sakwoodSegmentAdmin.strings.error);
            }
        });
    });

    // Evaluate segment
    $('.evaluate-segment').on('click', function() {
        const $btn = $(this);
        const segmentId = $btn.data('segment-id');
        
        $btn.prop('disabled', true).find('.dashicons').addClass('spin');
        
        $.ajax({
            url: sakwoodSegmentAdmin.apiUrl + '/segments/' + segmentId + '/evaluate',
            type: 'POST',
            headers: {
                'X-WP-Nonce': sakwoodSegmentAdmin.nonce
            },
            success: function(response) {
                if (response.success) {
                    alert(response.data.message);
                    location.reload();
                } else {
                    alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                }
            },
            error: function() {
                alert(sakwoodSegmentAdmin.strings.error);
            },
            complete: function() {
                $btn.prop('disabled', false).find('.dashicons').removeClass('spin');
            }
        });
    });
});

function exportMembers() {
    window.location.href = ajaxurl + '?action=sakwood_segment_export&segment_id=<?php echo $segment_id; ?>&_wpnonce=' + '<?php echo wp_create_nonce('sakwood-segment-nonce'); ?>';
}
</script>
