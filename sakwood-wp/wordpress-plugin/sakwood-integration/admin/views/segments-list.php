<?php
/**
 * Admin View: Segments List
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Initialize database
Sakwood_Segment_Database::init();

// Get segments
$segments = Sakwood_Segment_Database::get_segments(array(
    'status' => 'all',
    'limit' => 100,
));

// Get statistics
$total_segments = count($segments);
$active_segments = count(array_filter($segments, fn($s) => $s['is_active']));
$total_members = array_sum(array_column($segments, 'customer_count'));
$total_revenue = array_sum(array_column($segments, 'total_revenue'));
?>

<div class="wrap sakwood-segments-page">
    <h1 class="wp-heading-inline">
        <?php _e('Customer Segments', 'sakwood-integration'); ?>
    </h1>
    
    <a href="<?php echo admin_url('admin.php?page=sakwood-segment-new'); ?>" class="page-title-action">
        <?php _e('Add New Segment', 'sakwood-integration'); ?>
    </a>

    <hr class="wp-header-end">

    <!-- Statistics Cards -->
    <div class="sakwood-stats-grid">
        <div class="sakwood-stat-card">
            <div class="stat-icon" style="background: #3B82F6;">
                <span class="dashicons dashicons-groups"></span>
            </div>
            <div class="stat-content">
                <div class="stat-value"><?php echo number_format_i18n($total_segments); ?></div>
                <div class="stat-label"><?php _e('Total Segments', 'sakwood-integration'); ?></div>
            </div>
        </div>

        <div class="sakwood-stat-card">
            <div class="stat-icon" style="background: #10B981;">
                <span class="dashicons dashicons-yes-alt"></span>
            </div>
            <div class="stat-content">
                <div class="stat-value"><?php echo number_format_i18n($active_segments); ?></div>
                <div class="stat-label"><?php _e('Active Segments', 'sakwood-integration'); ?></div>
            </div>
        </div>

        <div class="sakwood-stat-card">
            <div class="stat-icon" style="background: #8B5CF6;">
                <span class="dashicons dashicons-admin-users"></span>
            </div>
            <div class="stat-content">
                <div class="stat-value"><?php echo number_format_i18n($total_members); ?></div>
                <div class="stat-label"><?php _e('Customers Segmented', 'sakwood-integration'); ?></div>
            </div>
        </div>

        <div class="sakwood-stat-card">
            <div class="stat-icon" style="background: #F59E0B;">
                <span class="dashicons dashicons-money-alt"></span>
            </div>
            <div class="stat-content">
                <div class="stat-value"><?php echo number_format_i18n($total_revenue, 2); ?> ฿</div>
                <div class="stat-label"><?php _e('Total Revenue', 'sakwood-integration'); ?></div>
            </div>
        </div>
    </div>

    <!-- Segments Table -->
    <div class="sakwood-table-container">
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('Name', 'sakwood-integration'); ?></th>
                    <th><?php _e('Type', 'sakwood-integration'); ?></th>
                    <th><?php _e('Status', 'sakwood-integration'); ?></th>
                    <th><?php _e('Members', 'sakwood-integration'); ?></th>
                    <th><?php _e('Revenue', 'sakwood-integration'); ?></th>
                    <th><?php _e('Created', 'sakwood-integration'); ?></th>
                    <th><?php _e('Actions', 'sakwood-integration'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($segments)) : ?>
                    <tr>
                        <td colspan="7" class="text-center">
                            <?php _e('No segments found. Create your first segment!', 'sakwood-integration'); ?>
                        </td>
                    </tr>
                <?php else : ?>
                    <?php foreach ($segments as $segment) : ?>
                        <tr>
                            <td>
                                <span class="segment-color-dot" style="background: <?php echo esc_attr($segment['color']); ?>;"></span>
                                <strong><?php echo esc_html($segment['name']); ?></strong>
                                <?php if ($segment['description']) : ?>
                                    <br><small class="description"><?php echo esc_html($segment['description']); ?></small>
                                <?php endif; ?>
                            </td>
                            <td>
                                <span class="segment-type-badge <?php echo esc_attr($segment['type']); ?>">
                                    <?php echo $segment['type'] === 'dynamic' ? '🔄 ' : '📌 '; ?>
                                    <?php echo $segment['type'] === 'dynamic' ? __('Dynamic', 'sakwood-integration') : __('Manual', 'sakwood-integration'); ?>
                                </span>
                            </td>
                            <td>
                                <?php if ($segment['is_active']) : ?>
                                    <span class="status-badge active">
                                        <span class="dashicons dashicons-yes"></span>
                                        <?php _e('Active', 'sakwood-integration'); ?>
                                    </span>
                                <?php else : ?>
                                    <span class="status-badge inactive">
                                        <span class="dashicons dashicons-no"></span>
                                        <?php _e('Inactive', 'sakwood-integration'); ?>
                                    </span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <strong><?php echo number_format_i18n($segment['customer_count']); ?></strong>
                                <?php _e('customers', 'sakwood-integration'); ?>
                            </td>
                            <td>
                                <strong><?php echo number_format_i18n($segment['total_revenue'], 2); ?> ฿</strong>
                            </td>
                            <td>
                                <?php echo date_i18n(get_option('date_format'), strtotime($segment['created_at'])); ?>
                            </td>
                            <td class="actions">
                                <a href="<?php echo admin_url('admin.php?page=sakwood-segment-edit&segment_id=' . $segment['id']); ?>" class="button button-small">
                                    <span class="dashicons dashicons-edit"></span>
                                    <?php _e('Edit', 'sakwood-integration'); ?>
                                </a>
                                
                                <a href="<?php echo admin_url('admin.php?page=sakwood-segment-members&segment_id=' . $segment['id']); ?>" class="button button-small">
                                    <span class="dashicons dashicons-admin-users"></span>
                                    <?php _e('Members', 'sakwood-integration'); ?>
                                </a>
                                
                                <?php if ($segment['type'] === 'dynamic') : ?>
                                    <button type="button" class="button button-small evaluate-segment" data-segment-id="<?php echo $segment['id']; ?>">
                                        <span class="dashicons dashicons-update"></span>
                                        <?php _e('Evaluate', 'sakwood-integration'); ?>
                                    </button>
                                <?php endif; ?>
                                
                                <button type="button" class="button button-small delete-segment" data-segment-id="<?php echo $segment['id']; ?>">
                                    <span class="dashicons dashicons-trash"></span>
                                    <?php _e('Delete', 'sakwood-integration'); ?>
                                </button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- Quick Start Guide -->
    <?php if (empty($segments)) : ?>
        <div class="sakwood-quick-start">
            <h2><?php _e('Getting Started with Customer Segmentation', 'sakwood-integration'); ?></h2>
            
            <div class="sakwood-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3><?php _e('Create Your First Segment', 'sakwood-integration'); ?></h3>
                        <p><?php _e('Choose between manual segments (add customers manually) or dynamic segments (automatic based on rules).', 'sakwood-integration'); ?></p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3><?php _e('Define Rules (Dynamic Only)', 'sakwood-integration'); ?></h3>
                        <p><?php _e('Set up rules based on purchase history, demographics, or engagement to automatically segment customers.', 'sakwood-integration'); ?></p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3><?php _e('Use Segments for Marketing', 'sakwood-integration'); ?></h3>
                        <p><?php _e('Target specific customer groups with personalized offers, emails, and promotions.', 'sakwood-integration'); ?></p>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

<style>
.sakwood-segments-page {
    max-width: 1400px;
}

.sakwood-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.sakwood-stat-card {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
}

.stat-value {
    font-size: 28px;
    font-weight: 600;
    color: #1d2327;
}

.stat-label {
    color: #646970;
    font-size: 14px;
}

.sakwood-table-container {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
}

.segment-color-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

.segment-type-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    background: #f0f0f1;
}

.segment-type-badge.dynamic {
    background: #e0e7ff;
    color: #4338ca;
}

.segment-type-badge.manual {
    background: #fef3c7;
    color: #92400e;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
}

.status-badge.active {
    background: #d1fae5;
    color: #065f46;
}

.status-badge.inactive {
    background: #fee2e2;
    color: #991b1b;
}

.actions {
    white-space: nowrap;
}

.actions .button {
    margin: 2px;
}

.sakwood-quick-start {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    padding: 30px;
    margin-top: 30px;
}

.sakwood-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    margin-top: 25px;
}

.step {
    display: flex;
    gap: 15px;
}

.step-number {
    width: 40px;
    height: 40px;
    background: #3B82F6;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
}

.step-content h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
}

.step-content p {
    margin: 0;
    color: #646970;
    font-size: 14px;
}
</style>

<script>
jQuery(document).ready(function($) {
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

    // Delete segment
    $('.delete-segment').on('click', function() {
        if (!confirm(sakwoodSegmentAdmin.strings.confirmDelete)) {
            return;
        }

        const $btn = $(this);
        const segmentId = $btn.data('segment-id');
        
        $.ajax({
            url: sakwoodSegmentAdmin.apiUrl + '/segments/' + segmentId,
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
});
</script>
