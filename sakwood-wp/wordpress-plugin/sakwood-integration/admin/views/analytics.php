<?php
/**
 * Admin View: Analytics
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Initialize database
Sakwood_Segment_Database::init();

// Get all segments
$segments = Sakwood_Segment_Database::get_segments(array(
    'status' => 'active',
    'limit' => 100,
));

// Calculate totals
$total_customers = array_sum(array_column($segments, 'customer_count'));
$total_revenue = array_sum(array_column($segments, 'total_revenue'));
$avg_revenue_per_customer = $total_customers > 0 ? ($total_revenue / $total_customers) : 0;
?>

<div class="wrap sakwood-analytics-page">
    <h1 class="wp-heading-inline">
        <?php _e('Customer Segmentation Analytics', 'sakwood-integration'); ?>
    </h1>

    <button type="button" class="button button-primary" style="float:right;" onclick="exportAnalytics()">
        <span class="dashicons dashicons-download"></span>
        <?php _e('Export Report', 'sakwood-integration'); ?>
    </button>

    <hr class="wp-header-end">

    <!-- Overview Stats -->
    <div class="sakwood-stats-grid">
        <div class="sakwood-stat-card">
            <div class="stat-icon" style="background: #3B82F6;">
                <span class="dashicons dashicons-groups"></span>
            </div>
            <div class="stat-content">
                <div class="stat-value"><?php echo count($segments); ?></div>
                <div class="stat-label"><?php _e('Active Segments', 'sakwood-integration'); ?></div>
            </div>
        </div>

        <div class="sakwood-stat-card">
            <div class="stat-icon" style="background: #10B981;">
                <span class="dashicons dashicons-admin-users"></span>
            </div>
            <div class="stat-content">
                <div class="stat-value"><?php echo number_format_i18n($total_customers); ?></div>
                <div class="stat-label"><?php _e('Total Segmented Customers', 'sakwood-integration'); ?></div>
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

        <div class="sakwood-stat-card">
            <div class="stat-icon" style="background: #8B5CF6;">
                <span class="dashicons dashicons-chart-line"></span>
            </div>
            <div class="stat-content">
                <div class="stat-value"><?php echo number_format_i18n($avg_revenue_per_customer, 2); ?> ฿</div>
                <div class="stat-label"><?php _e('Avg Revenue/Customer', 'sakwood-integration'); ?></div>
            </div>
        </div>
    </div>

    <!-- Segment Performance Chart -->
    <div class="sakwood-chart-container">
        <h2><?php _e('Segment Performance', 'sakwood-integration'); ?></h2>
        
        <div class="sakwood-bar-chart">
            <?php 
            // Sort by revenue
            usort($segments, function($a, $b) {
                return $b['total_revenue'] - $a['total_revenue'];
            });
            
            $max_revenue = max(array_column($segments, 'total_revenue'));
            ?>
            
            <?php foreach ($segments as $segment) : ?>
                <?php 
                $bar_width = $max_revenue > 0 ? ($segment['total_revenue'] / $max_revenue * 100) : 0;
                $percentage = $total_revenue > 0 ? ($segment['total_revenue'] / $total_revenue * 100) : 0;
                ?>
                <div class="bar-row">
                    <div class="bar-label">
                        <span class="segment-color-dot" style="background: <?php echo esc_attr($segment['color']); ?>;"></span>
                        <strong><?php echo esc_html($segment['name']); ?></strong>
                        <small><?php echo number_format_i18n($segment['customer_count']); ?> <?php _e('customers', 'sakwood-integration'); ?></small>
                    </div>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: <?php echo $bar_width; ?>%; background: <?php echo esc_attr($segment['color']); ?>;">
                            <span class="bar-value"><?php echo number_format_i18n($segment['total_revenue'], 0); ?> ฿</span>
                        </div>
                    </div>
                    <div class="bar-percentage">
                        <strong><?php echo number_format_i18n($percentage, 1); ?>%</strong>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Segment Details Table -->
    <div class="sakwood-table-container">
        <h2><?php _e('Detailed Metrics', 'sakwood-integration'); ?></h2>
        
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('Segment', 'sakwood-integration'); ?></th>
                    <th><?php _e('Customers', 'sakwood-integration'); ?></th>
                    <th><?php _e('Revenue', 'sakwood-integration'); ?></th>
                    <th><?php _e('% of Total', 'sakwood-integration'); ?></th>
                    <th><?php _e('Avg/Customer', 'sakwood-integration'); ?></th>
                    <th><?php _e('Type', 'sakwood-integration'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($segments as $segment) : ?>
                    <?php 
                    $revenue_percentage = $total_revenue > 0 ? ($segment['total_revenue'] / $total_revenue * 100) : 0;
                    $avg_per_customer = $segment['customer_count'] > 0 ? ($segment['total_revenue'] / $segment['customer_count']) : 0;
                    ?>
                    <tr>
                        <td>
                            <span class="segment-color-dot" style="background: <?php echo esc_attr($segment['color']); ?>;"></span>
                            <strong><?php echo esc_html($segment['name']); ?></strong>
                        </td>
                        <td>
                            <?php echo number_format_i18n($segment['customer_count']); ?>
                        </td>
                        <td>
                            <strong><?php echo number_format_i18n($segment['total_revenue'], 2); ?> ฿</strong>
                        </td>
                        <td>
                            <?php echo number_format_i18n($revenue_percentage, 1); ?>%
                        </td>
                        <td>
                            <?php echo number_format_i18n($avg_per_customer, 2); ?> ฿
                        </td>
                        <td>
                            <span class="segment-type-badge <?php echo esc_attr($segment['type']); ?>">
                                <?php echo $segment['type'] === 'dynamic' ? '🔄' : '📌'; ?>
                                <?php echo ucfirst($segment['type']); ?>
                            </span>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<style>
.sakwood-analytics-page {
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

.sakwood-chart-container {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
}

.sakwood-chart-container h2 {
    margin-top: 0;
    margin-bottom: 20px;
}

.sakwood-bar-chart {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.bar-row {
    display: grid;
    grid-template-columns: 250px 1fr 100px;
    gap: 15px;
    align-items: center;
}

.bar-label {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.bar-label small {
    color: #646970;
    font-size: 13px;
}

.bar-container {
    background: #f0f0f1;
    border-radius: 4px;
    height: 32px;
    overflow: hidden;
}

.bar-fill {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    transition: width 0.3s ease;
    min-width: 50px;
}

.bar-value {
    color: white;
    font-size: 12px;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.bar-percentage {
    text-align: right;
}

.sakwood-table-container {
    background: #fff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
}

.sakwood-table-container h2 {
    padding: 20px;
    margin: 0;
    border-bottom: 1px solid #c3c4c7;
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

@media (max-width: 782px) {
    .bar-row {
        grid-template-columns: 1fr;
        gap: 10px;
    }
    
    .bar-container {
        height: 24px;
    }
}
</style>

<script>
function exportAnalytics() {
    const data = [
        ['Segment', 'Customers', 'Revenue', 'Percentage', 'Avg per Customer', 'Type'],
        <?php foreach ($segments as $segment) : ?>
            [
                '<?php echo esc_js($segment['name']); ?>',
                <?php echo $segment['customer_count']; ?>,
                <?php echo $segment['total_revenue']; ?>,
                '<?php echo number_format_i18n($total_revenue > 0 ? ($segment['total_revenue'] / $total_revenue * 100) : 0, 1); ?>%',
                <?php echo $segment['customer_count'] > 0 ? ($segment['total_revenue'] / $segment['customer_count']) : 0; ?>,
                '<?php echo ucfirst($segment['type']); ?>'
            ],
        <?php endforeach; ?>
    ];

    let csv = '';
    data.forEach(row => {
        csv += row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'segment-analytics-' + new Date().toISOString().split('T')[0] + '.csv';
    link.click();
}
</script>
