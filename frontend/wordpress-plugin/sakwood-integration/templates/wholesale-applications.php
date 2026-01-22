<?php
/**
 * Wholesale Applications List Template
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php echo esc_html($status ? ucfirst($status) . ' ' : ''); ?>Wholesale Applications</h1>

    <?php if (empty($status)): ?>
        <div class="sakwood-status-cards" style="margin: 20px 0;">
            <div class="status-card" style="display: inline-block; margin-right: 15px; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 4px; min-width: 150px;">
                <h3 style="margin: 0 0 5px 0; color: #f0ad4e;">⏳ Pending</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold;"><?php echo $pending_count; ?></p>
            </div>
            <div class="status-card" style="display: inline-block; margin-right: 15px; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 4px; min-width: 150px;">
                <h3 style="margin: 0 0 5px 0; color: #5cb85c;">✓ Approved</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold;"><?php echo $approved_count; ?></p>
            </div>
            <div class="status-card" style="display: inline-block; margin-right: 15px; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 4px; min-width: 150px;">
                <h3 style="margin: 0 0 5px 0; color: #5cb85c;">● Active</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold;"><?php echo $active_count; ?></p>
            </div>
            <div class="status-card" style="display: inline-block; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 4px; min-width: 150px;">
                <h3 style="margin: 0 0 5px 0; color: #d9534f;">✗ Rejected</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold;"><?php echo $rejected_count; ?></p>
            </div>
        </div>
    <?php endif; ?>

    <form method="post">
        <?php wp_nonce_field('bulk_wholesale_applications'); ?>

        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th scope="col" class="manage-column column-cb check-column">
                        <input type="checkbox" id="cb-select-all-1">
                    </th>
                    <th scope="col">Application ID</th>
                    <th scope="col">Company</th>
                    <th scope="col">Business Type</th>
                    <th scope="col">Estimated Volume</th>
                    <th scope="col">Status</th>
                    <th scope="col">Submitted</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($applications)): ?>
                    <tr>
                        <td colspan="8">
                            <?php echo $status ? 'No ' . esc_html($status) . ' applications found.' : 'No applications found.'; ?>
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($applications as $app): ?>
                        <?php $user = get_userdata($app->user_id); ?>
                        <tr>
                            <th scope="row" class="check-column">
                                <input type="checkbox" name="application_ids[]" value="<?php echo esc_attr($app->id); ?>">
                            </th>
                            <td>
                                <strong><?php echo esc_html($app->application_id); ?></strong><br>
                                <small><?php echo esc_html($user ? $user->user_email : ''); ?></small>
                            </td>
                            <td>
                                <strong><?php echo esc_html($app->company_name); ?></strong><br>
                                <small>Tax ID: <?php echo esc_html($app->tax_id); ?></small><br>
                                <small><?php echo esc_html($app->business_city); ?>, <?php echo esc_html($app->business_province); ?></small>
                            </td>
                            <td><?php echo esc_html(ucfirst($app->business_type)); ?></td>
                            <td><?php echo esc_html($app->estimated_volume); ?></td>
                            <td><?php echo Sakwood_Wholesale_Admin::get_status_label($app->status); ?></td>
                            <td><?php echo date('M j, Y', strtotime($app->submitted_date)); ?></td>
                            <td>
                                <button type="button" class="button view-application" data-app-id="<?php echo esc_attr($app->application_id); ?>">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>

        <?php if (!empty($applications)): ?>
            <div class="tablenav bottom">
                <div class="alignleft actions bulkactions">
                    <select name="action" id="bulk-action-selector-bottom">
                        <option value="-1">Bulk Actions</option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                    </select>
                    <input type="submit" name="filter_action" class="button" value="Apply">
                </div>

                <?php if ($total_pages > 1): ?>
                    <div class="tablenav-pages">
                        <span class="displaying-num"><?php echo $total_count; ?> applications</span>
                        <span class="pagination-links">
                            <?php
                            $base_url = admin_url('admin.php?page=sakwood-wholesale' . ($status ? '&status=' . $status : ''));
                            for ($i = 1; $i <= $total_pages; $i++):
                                $active = $i === $page ? ' class="pagination-link active"' : ' class="pagination-link"';
                            ?>
                                <a class="pagination-links" href="<?php echo esc_url(add_query_arg('paged', $i, $base_url)); ?>"<?php echo $active; ?>>
                                    <?php echo $i; ?>
                                </a>
                            <?php endfor; ?>
                        </span>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </form>
</div>

<!-- Application Details Modal -->
<div id="application-modal" style="display: none;">
    <div class="modal-backdrop" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100000;"></div>
    <div class="modal-content" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; z-index: 100001; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
        <span class="close-modal" style="position: absolute; top: 15px; right: 20px; font-size: 24px; cursor: pointer;">&times;</span>
        <div id="modal-body"></div>
    </div>
</div>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100000;
}

.modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    z-index: 100001;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
</style>

<script>
jQuery(document).ready(function($) {
    // View application details
    $('.view-application').on('click', function() {
        var appId = $(this).data('app-id');
        var $modal = $('#application-modal');
        var $body = $('#modal-body');

        $body.html('<p>Loading...</p>');
        $modal.show();

        // AJAX to get application details
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'get_wholesale_application_details',
                application_id: appId,
                nonce: sakwoodData.nonce
            },
            success: function(response) {
                if (response.success) {
                    var app = response.data;
                    var html = `
                        <h2>Application Details</h2>
                        <table class="form-table">
                            <tr><th>Application ID:</th><td>${app.application_id}</td></tr>
                            <tr><th>Company Name:</th><td>${app.company_name}</td></tr>
                            <tr><th>Tax ID:</th><td>${app.tax_id}</td></tr>
                            <tr><th>Business Type:</th><td>${app.business_type}</td></tr>
                            <tr><th>Address:</th><td>${app.business_address}<br>${app.business_city}, ${app.business_province} ${app.business_postal_code}</td></tr>
                            <tr><th>Phone:</th><td>${app.business_phone}</td></tr>
                            <tr><th>Estimated Volume:</th><td>${app.estimated_volume}</td></tr>
                            <tr><th>Status:</th><td>${app.status_label}</td></tr>
                            <tr><th>Credit Limit:</th><td>฿${parseFloat(app.credit_limit).toLocaleString('th-TH')}</td></tr>
                            <tr><th>Submitted:</th><td>${app.submitted_date}</td></tr>
                        </table>

                        <h3>Actions</h3>
                        <div class="action-buttons" style="margin: 15px 0;">
                            <button class="button button-primary approve-btn" data-app-id="${app.application_id}">Approve</button>
                            <button class="button button-secondary reject-btn" data-app-id="${app.application_id}">Reject</button>
                        </div>

                        <h3>Admin Notes</h3>
                        <textarea id="admin-notes" rows="4" style="width: 100%;">${app.admin_notes || ''}</textarea>
                        <br><br>
                        <button class="button button-primary save-notes-btn" data-app-id="${app.application_id}">Save Notes</button>
                    `;
                    $body.html(html);
                } else {
                    $body.html('<p>Error loading application details.</p>');
                }
            }
        });
    });

    // Close modal
    $('.close-modal, .modal-backdrop').on('click', function() {
        $('#application-modal').hide();
    });

    // Approve application
    $(document).on('click', '.approve-btn', function() {
        var appId = $(this).data('app-id');
        var creditLimit = prompt('Enter credit limit (THB):', '50000');
        var notes = $('#admin-notes').val();

        if (creditLimit !== null) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'update_wholesale_application',
                    application_id: appId,
                    status: 'approved',
                    credit_limit: creditLimit,
                    admin_notes: notes,
                    nonce: sakwoodData.nonce
                },
                success: function(response) {
                    if (response.success) {
                        alert('Application approved!');
                        location.reload();
                    } else {
                        alert('Error: ' + response.data);
                    }
                }
            });
        }
    });

    // Reject application
    $(document).on('click', '.reject-btn', function() {
        if (confirm('Are you sure you want to reject this application?')) {
            var appId = $(this).data('app-id');
            var notes = $('#admin-notes').val();

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'update_wholesale_application',
                    application_id: appId,
                    status: 'rejected',
                    admin_notes: notes,
                    nonce: sakwoodData.nonce
                },
                success: function(response) {
                    if (response.success) {
                        alert('Application rejected.');
                        location.reload();
                    } else {
                        alert('Error: ' + response.data);
                    }
                }
            });
        }
    });

    // Save notes
    $(document).on('click', '.save-notes-btn', function() {
        var appId = $(this).data('app-id');
        var notes = $('#admin-notes').val();

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'update_wholesale_application',
                application_id: appId,
                admin_notes: notes,
                nonce: sakwoodData.nonce
            },
            success: function(response) {
                if (response.success) {
                    alert('Notes saved.');
                } else {
                    alert('Error: ' + response.data);
                }
            }
        });
    });
});
</script>
