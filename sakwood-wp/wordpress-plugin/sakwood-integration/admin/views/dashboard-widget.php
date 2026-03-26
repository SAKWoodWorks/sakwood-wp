<?php
/**
 * Admin View: Dashboard Widget
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="sakwood-dashboard-widget">
    <?php if (empty($segments)) : ?>
        <p><?php _e('No segments created yet.', 'sakwood-integration'); ?></p>
        <p>
            <a href="<?php echo admin_url('admin.php?page=sakwood-segment-new'); ?>" class="button button-primary">
                <?php _e('Create First Segment', 'sakwood-integration'); ?>
            </a>
        </p>
    <?php else : ?>
        <ul style="margin: 0; padding: 0; list-style: none;">
            <?php foreach ($segments as $segment) : ?>
                <li style="padding: 10px 0; border-bottom: 1px solid #f0f0f1; last-child: border-bottom: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="display: inline-block; width: 12px; height: 12px; background: <?php echo esc_attr($segment['color']); ?>; border-radius: 50%;"></span>
                            <strong><?php echo esc_html($segment['name']); ?></strong>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 600;"><?php echo number_format_i18n($segment['customer_count']); ?> <?php _e('customers', 'sakwood-integration'); ?></div>
                            <div style="color: #646970; font-size: 12px;"><?php echo number_format_i18n($segment['total_revenue'], 0); ?> ฿</div>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
        
        <p style="margin-top: 15px; text-align: center;">
            <a href="<?php echo admin_url('admin.php?page=sakwood-segments'); ?>" class="button button-secondary" style="width: 100%;">
                <?php _e('View All Segments', 'sakwood-integration'); ?>
            </a>
        </p>
    <?php endif; ?>
</div>
