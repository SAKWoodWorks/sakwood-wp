<?php
/**
 * Admin View: Activity Log
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Initialize database
Sakwood_Segment_Database::init();

// Get activity log
$log = Sakwood_Segment_Database::get_activity_log(array(
    'limit' => 200,
));
?>

<div class="wrap sakwood-activity-page">
    <h1 class="wp-heading-inline">
        <?php _e('Segment Activity Log', 'sakwood-integration'); ?>
    </h1>

    <hr class="wp-header-end">

    <div class="sakwood-table-container">
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('Time', 'sakwood-integration'); ?></th>
                    <th><?php _e('Segment', 'sakwood-integration'); ?></th>
                    <th><?php _e('Customer', 'sakwood-integration'); ?></th>
                    <th><?php _e('Action', 'sakwood-integration'); ?></th>
                    <th><?php _e('Reason', 'sakwood-integration'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($log)) : ?>
                    <tr>
                        <td colspan="5" class="text-center">
                            <?php _e('No activity recorded yet.', 'sakwood-integration'); ?>
                        </td>
                    </tr>
                <?php else : ?>
                    <?php foreach ($log as $entry) : ?>
                        <tr>
                            <td>
                                <?php echo date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($entry['logged_at'])); ?>
                            </td>
                            <td>
                                <?php echo esc_html($entry['segment_name'] ?? 'N/A'); ?>
                            </td>
                            <td>
                                <?php if (isset($entry['customer_name'])) : ?>
                                    <strong><?php echo esc_html($entry['customer_name']); ?></strong><br>
                                    <small><?php echo esc_html($entry['customer_email']); ?></small>
                                <?php else : ?>
                                    <?php _e('Customer deleted', 'sakwood-integration'); ?>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php
                                $action_badges = array(
                                    'added' => 'style="background: #d1fae5; color: #065f46;"',
                                    'removed' => 'style="background: #fee2e2; color: #991b1b;"',
                                    'updated' => 'style="background: #dbeafe; color: #1e40af;"',
                                );
                                $badge_style = $action_badges[$entry['action']] ?? '';
                                ?>
                                <span class="action-badge" <?php echo $badge_style; ?>>
                                    <?php echo esc_html(ucfirst($entry['action'])); ?>
                                </span>
                            </td>
                            <td>
                                <?php echo esc_html($entry['reason'] ?? '-'); ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<style>
.sakwood-activity-page {
    max-width: 1400px;
}

.sakwood-table-container {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
}

.action-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}
</style>
