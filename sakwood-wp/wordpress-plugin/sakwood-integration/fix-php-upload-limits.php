<?php
/**
 * One-Click PHP Upload Fix
 *
 * Adds an admin notice with a "Fix Upload Limits" button
 * Click to automatically increase PHP upload limits
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_PHP_Upload_Fix {

    public function __construct() {
        add_action('admin_notices', array($this, 'show_fix_notice'));
        add_action('wp_ajax_sakwood_fix_upload_limits', array($this, 'ajax_fix_limits'));
    }

    /**
     * Show admin notice on bulk import page
     */
    public function show_fix_notice() {
        // Only show on bulk import page
        if (!isset($_GET['page']) || $_GET['page'] !== 'sakwood-bulk-import') {
            return;
        }

        // Check if limits are already OK
        $upload_max = $this->return_bytes(ini_get('upload_max_filesize'));
        $needs_fix = $upload_max < 50 * 1024 * 1024; // Less than 50MB

        if (!$needs_fix) {
            return;
        }

        ?>
        <div class="notice notice-warning is-dismissible" style="padding:15px;">
            <h3>⚠️ Upload Limits Too Low</h3>
            <p><strong>Current PHP upload limit:</strong> <?php echo ini_get('upload_max_filesize'); ?></p>
            <p>ZIP file uploads will fail. Click the button below to automatically fix this:</p>
            <button type="button" id="fix-upload-limits-btn" class="button button-primary">
                🔧 Fix Upload Limits Now
            </button>
            <span id="fix-status" style="margin-left:10px;"></span>
        </div>

        <script>
        jQuery(document).ready(function($) {
            $('#fix-upload-limits-btn').on('click', function() {
                var $btn = $(this);
                var $status = $('#fix-status');

                $btn.prop('disabled', true).text('Fixing...');
                $status.text('Please wait...');

                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'sakwood_fix_upload_limits',
                        nonce: '<?php echo wp_create_nonce('sakwood_fix_upload_limits'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            $status.html('<span style="color:green;">✓ Fixed! Reloading page...</span>');
                            setTimeout(function() {
                                location.reload();
                            }, 2000);
                        } else {
                            $status.html('<span style="color:red;">✗ Failed: ' + response.data.message + '</span>');
                            $btn.prop('disabled', false).text('Retry');
                        }
                    },
                    error: function() {
                        $status.html('<span style="color:red;">✗ Server error. Try manual fix.</span>');
                        $btn.prop('disabled', false).text('Retry');
                    }
                });
            });
        });
        </script>
        <?php
    }

    /**
     * AJAX: Fix upload limits
     */
    public function ajax_fix_limits() {
        check_ajax_referer('sakwood_fix_upload_limits', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied'));
        }

        // Try to increase limits via wp-config.php
        $wp_config = ABSPATH . 'wp-config.php';
        $marker = "/* That's all, stop editing!";

        if (!is_writable($wp_config)) {
            wp_send_json_error(array(
                'message' => 'wp-config.php is not writable. Please add these lines manually:<br><code>@ini_set(\'upload_max_filesize\', \'100M\');</code><br><code>@ini_set(\'post_max_size\', \'100M\');</code>'
            ));
        }

        $config_content = file_get_contents($wp_config);

        // Check if already added
        if (strpos($config_content, 'upload_max_filesize') !== false) {
            wp_send_json_error(array('message' => 'Limits already configured in wp-config.php'));
        }

        // Find the marker and insert before it
        $new_settings = "
/** Sakwood: Increase upload limits for bulk import */
@ini_set( 'upload_max_filesize' , '100M' );
@ini_set( 'post_max_size' , '100M' );
@ini_set( 'memory_limit' , '256M' );
@ini_set( 'max_execution_time' , '300' );
";

        $config_content = str_replace(
            $marker,
            $new_settings . "\n" . $marker,
            $config_content
        );

        // Backup first
        copy($wp_config, $wp_config . '.backup.' . date('YmdHis'));

        // Write updated config
        file_put_contents($wp_config, $config_content);

        wp_send_json_success(array(
            'message' => 'Upload limits increased to 100M. Please refresh the page.'
        ));
    }

    /**
     * Convert shorthand to bytes
     */
    private function return_bytes($val) {
        $val = trim($val);
        $last = strtolower($val[strlen($val)-1]);
        $val = (int)$val;
        switch($last) {
            case 'g':
                $val *= 1024;
            case 'm':
                $val *= 1024;
            case 'k':
                $val *= 1024;
        }
        return $val;
    }
}

// Initialize
new Sakwood_PHP_Upload_Fix();
