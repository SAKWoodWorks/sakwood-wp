<?php
/**
 * CRM Interactions Template
 */

if (!defined('ABSPATH')) {
    exit;
}

// Get interaction statistics
$stats_30_days = Sakwood_CRM_Interaction::get_stats(30);
?>

<div class="wrap sakwood-crm-wrap">
    <h1>CRM Interactions</h1>

    <!-- Statistics Cards -->
    <div class="sakwood-crm-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">📞</div>
            <div class="sakwood-crm-stat-content">
                <h3>Calls</h3>
                <div class="sakwood-crm-stat-value"><?php echo isset($stats_30_days['call_outbound']) ? $stats_30_days['call_outbound'] : 0; ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">✉️</div>
            <div class="sakwood-crm-stat-content">
                <h3>Emails</h3>
                <div class="sakwood-crm-stat-value"><?php echo isset($stats_30_days['email_outbound']) ? $stats_30_days['email_outbound'] : 0; ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">💬</div>
            <div class="sakwood-crm-stat-content">
                <h3>LINE</h3>
                <div class="sakwood-crm-stat-value"><?php echo isset($stats_30_days['line_outbound']) ? $stats_30_days['line_outbound'] : 0; ?></div>
            </div>
        </div>

        <div class="sakwood-crm-stat-card">
            <div class="sakwood-crm-stat-icon">📝</div>
            <div class="sakwood-crm-stat-content">
                <h3>Notes</h3>
                <div class="sakwood-crm-stat-value"><?php echo isset($stats_30_days['note_outbound']) ? $stats_30_days['note_outbound'] : 0; ?></div>
            </div>
        </div>
    </div>

    <!-- All Interactions -->
    <div class="sakwood-crm-card">
        <h2>All Interactions (Last 50)</h2>

        <?php if (!empty($recent_interactions)): ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Customer</th>
                        <th>Subject</th>
                        <th>Direction</th>
                        <th>Duration</th>
                        <th>Created By</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recent_interactions as $interaction): ?>
                        <?php
                        $created_by_user = get_userdata($interaction->created_by);
                        $created_by_name = $created_by_user ? $created_by_user->display_name : 'System';
                        ?>
                        <tr>
                            <td>
                                <span class="sakwood-crm-interaction-icon">
                                    <?php
                                    $icons = array(
                                        'call' => '📞',
                                        'email' => '✉️',
                                        'line' => '💬',
                                        'visit' => '🏠',
                                        'note' => '📝',
                                    );
                                    echo isset($icons[$interaction->interaction_type]) ? $icons[$interaction->interaction_type] : '📌';
                                    ?>
                                </span>
                                <?php echo esc_html(ucfirst($interaction->interaction_type)); ?>
                            </td>
                            <td>
                                <a href="<?php echo admin_url('admin.php?page=sakwood-crm-customers&customer_id=' . $interaction->customer_id); ?>">
                                    <?php echo esc_html($interaction->first_name . ' ' . $interaction->last_name); ?>
                                </a>
                            </td>
                            <td><?php echo esc_html($interaction->subject ?: '-'); ?></td>
                            <td>
                                <span class="sakwood-crm-direction sakwood-crm-direction-<?php echo esc_attr($interaction->direction); ?>">
                                    <?php echo esc_html(ucfirst($interaction->direction)); ?>
                                </span>
                            </td>
                            <td>
                                <?php if ($interaction->duration): ?>
                                    <?php echo intval($interaction->duration); ?> min
                                <?php else: ?>
                                    -
                                <?php endif; ?>
                            </td>
                            <td><?php echo esc_html($created_by_name); ?></td>
                            <td>
                                <?php echo human_time_diff(strtotime($interaction->created_at), current_time('timestamp')) . ' ago'; ?>
                                <br><small><?php echo date('Y-m-d H:i', strtotime($interaction->created_at)); ?></small>
                            </td>
                            <td>
                                <button class="button button-small" onclick='viewInteraction(<?php echo json_encode($interaction); ?>)'>View</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>No interactions logged yet.</p>
        <?php endif; ?>
    </div>
</div>

<script>
function viewInteraction(interaction) {
    alert(
        'Type: ' + interaction.interaction_type + '\n' +
        'Subject: ' + (interaction.subject || 'N/A') + '\n' +
        'Message: ' + (interaction.message || 'N/A')
    );
}
</script>

<style>
.sakwood-crm-interaction-icon {
    font-size: 18px;
    margin-right: 5px;
}

.sakwood-crm-direction {
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: bold;
}

.sakwood-crm-direction-inbound {
    background: #e7f3ff;
    color: #0073aa;
}

.sakwood-crm-direction-outbound {
    background: #fff3e7;
    color: #d63638;
}
</style>
