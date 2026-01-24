<?php
/**
 * Plugin Name: Sakwood Product Bulk Import
 * Plugin URI: https://sakwood.com
 * Description: Bulk import products from CSV with images
 * Version: 1.0.0
 * Author: Sakwood
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main Bulk Import Class
 */
class Sakwood_Product_Bulk_Import {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('admin_menu', array($this, 'add_import_page'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_ajax_sakwood_upload_images_zip', array($this, 'ajax_upload_zip'));
        add_action('wp_ajax_sakwood_import_single_product', array($this, 'ajax_import_single_product'));
        add_action('wp_ajax_sakwood_preview_import', array($this, 'ajax_preview_import'));
        add_action('wp_ajax_sakwood_process_import', array($this, 'ajax_process_import'));
    }

    /**
     * Add import page to WordPress admin
     */
    public function add_import_page() {
        // Add as a top-level menu (since WooCommerce is not installed)
        add_menu_page(
            'Bulk Import Products',
            'Bulk Import',
            'manage_options',
            'sakwood-bulk-import',
            array($this, 'render_import_page'),
            'dashicons-upload',
            30
        );
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        // Check if we're on the bulk import page
        if ('toplevel_page_sakwood-bulk-import' !== $hook) {
            return;
        }

        wp_enqueue_style('sakwood-bulk-import', SAKWOOD_PLUGIN_URL . 'assets/css/bulk-import.css', array(), SAKWOOD_VERSION);
        wp_enqueue_script('sakwood-bulk-import', SAKWOOD_PLUGIN_URL . 'assets/js/bulk-import.js', array('jquery'), SAKWOOD_VERSION, true);

        wp_localize_script('sakwood-bulk-import', 'sakwoodBulkImport', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sakwood_bulk_import'),
            'strings' => array(
                'processing' => __('Processing...', 'sakwood-integration'),
                'success' => __('Import completed successfully!', 'sakwood-integration'),
                'error' => __('Import failed. Please check the error log.', 'sakwood-integration'),
            )
        ));
    }

    /**
     * Render import page
     */
    public function render_import_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('Bulk Import Products', 'sakwood-integration'); ?></h1>

            <div class="sakwood-bulk-import-container">
                <!-- Step 1: Upload Files -->
                <div class="sakwood-import-step" id="step-upload">
                    <h2><?php _e('Step 1: Upload Files', 'sakwood-integration'); ?></h2>

                    <div class="sakwood-upload-section">
                        <div class="sakwood-upload-box">
                            <h3><?php _e('CSV File', 'sakwood-integration'); ?></h3>
                            <input type="file" id="csv-file" accept=".csv" />
                            <p class="description"><?php _e('Upload your products CSV file', 'sakwood-integration'); ?></p>
                        </div>

                        <div class="sakwood-upload-box">
                            <h3><?php _e('Images ZIP File', 'sakwood-integration'); ?></h3>
                            <input type="file" id="zip-file" accept=".zip" />
                            <p class="description"><?php _e('Upload ZIP file containing all product images', 'sakwood-integration'); ?></p>
                        </div>
                    </div>

                    <button type="button" id="preview-btn" class="button button-primary button-large">
                        <?php _e('Preview Import', 'sakwood-integration'); ?>
                    </button>

                    <div id="upload-error" class="notice notice-error" style="display:none;"></div>
                </div>

                <!-- Step 2: Preview -->
                <div class="sakwood-import-step" id="step-preview" style="display:none;">
                    <h2><?php _e('Step 2: Preview Import', 'sakwood-integration'); ?></h2>

                    <div id="preview-summary" class="sakwood-preview-summary"></div>

                    <div id="preview-table-container">
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th><?php _e('Row', 'sakwood-integration'); ?></th>
                                    <th><?php _e('Product Name (TH)', 'sakwood-integration'); ?></th>
                                    <th><?php _e('Product Name (EN)', 'sakwood-integration'); ?></th>
                                    <th><?php _e('Price', 'sakwood-integration'); ?></th>
                                    <th><?php _e('Dimensions', 'sakwood-integration'); ?></th>
                                    <th><?php _e('Status', 'sakwood-integration'); ?></th>
                                </tr>
                            </thead>
                            <tbody id="preview-tbody"></tbody>
                        </table>
                    </div>

                    <div class="sakwood-import-actions">
                        <button type="button" id="back-btn" class="button">
                            <?php _e('← Back', 'sakwood-integration'); ?>
                        </button>
                        <button type="button" id="import-btn" class="button button-primary button-large">
                            <?php _e('Start Import', 'sakwood-integration'); ?>
                        </button>
                    </div>
                </div>

                <!-- Step 3: Import Progress -->
                <div class="sakwood-import-step" id="step-progress" style="display:none;">
                    <h2><?php _e('Step 3: Importing Products', 'sakwood-integration'); ?></h2>

                    <div class="sakwood-progress-container">
                        <div class="sakwood-progress-bar">
                            <div id="progress-fill" class="sakwood-progress-fill"></div>
                        </div>
                        <p id="progress-status"><?php _e('Preparing import...', 'sakwood-integration'); ?></p>
                    </div>

                    <div id="import-results" style="display:none;">
                        <h3><?php _e('Import Results', 'sakwood-integration'); ?></h3>
                        <div id="import-summary"></div>
                        <div id="import-errors"></div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .sakwood-bulk-import-container {
                max-width: 1200px;
                margin: 20px 0;
            }
            .sakwood-import-step {
                background: #fff;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-bottom: 20px;
            }
            .sakwood-upload-section {
                display: flex;
                gap: 20px;
                margin: 20px 0;
            }
            .sakwood-upload-box {
                flex: 1;
                padding: 20px;
                border: 2px dashed #ccc;
                border-radius: 4px;
                text-align: center;
            }
            .sakwood-upload-box h3 {
                margin-top: 0;
            }
            .sakwood-upload-box input[type="file"] {
                margin: 10px 0;
            }
            .sakwood-preview-summary {
                background: #f0f0f0;
                padding: 15px;
                border-radius: 4px;
                margin: 15px 0;
            }
            .sakwood-preview-summary.success {
                background: #d4edda;
                border-left: 4px solid #28a745;
            }
            .sakwood-preview-summary.warning {
                background: #fff3cd;
                border-left: 4px solid #ffc107;
            }
            .sakwood-progress-container {
                margin: 30px 0;
            }
            .sakwood-progress-bar {
                width: 100%;
                height: 30px;
                background: #f0f0f0;
                border-radius: 15px;
                overflow: hidden;
            }
            .sakwood-progress-fill {
                height: 100%;
                background: #2271b1;
                width: 0%;
                transition: width 0.3s ease;
            }
            .sakwood-import-actions {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
            }
            #preview-table-container {
                max-height: 400px;
                overflow-y: auto;
                margin: 15px 0;
            }
            .status-valid {
                color: #28a745;
                font-weight: bold;
            }
            .status-invalid {
                color: #dc3545;
                font-weight: bold;
            }
        </style>

        <script>
        jQuery(document).ready(function($) {
            let csvData = [];
            let imageMapping = {};

            // Preview button click
            $('#preview-btn').on('click', function() {
                const csvFile = $('#csv-file')[0].files[0];
                const zipFile = $('#zip-file')[0].files[0];

                if (!csvFile) {
                    $('#upload-error').text('<?php _e('Please select a CSV file', 'sakwood-integration'); ?>').show();
                    return;
                }

                $('#upload-error').hide();

                // Read and preview CSV
                const reader = new FileReader();
                reader.onload = function(e) {
                    const csvText = e.target.result;
                    csvData = parseCSV(csvText);

                    if (csvData.length === 0) {
                        $('#upload-error').text('<?php _e('CSV file is empty or invalid', 'sakwood-integration'); ?>').show();
                        return;
                    }

                    // Upload ZIP if provided
                    if (zipFile) {
                        uploadZip(zipFile);
                    } else {
                        showPreview(csvData, {});
                    }
                };
                reader.readAsText(csvFile);
            });

            // Parse CSV
            function parseCSV(text) {
                const lines = text.split('\n');
                const headers = parseCSVLine(lines[0]);
                const data = [];

                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim() === '') continue;

                    const values = parseCSVLine(lines[i]);
                    const row = {};

                    headers.forEach((header, index) => {
                        row[header] = values[index] || '';
                    });

                    data.push(row);
                }

                return data;
            }

            // Parse CSV line (handle quoted fields)
            function parseCSVLine(line) {
                const result = [];
                let current = '';
                let inQuotes = false;

                for (let i = 0; i < line.length; i++) {
                    const char = line[i];

                    if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === ',' && !inQuotes) {
                        result.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }

                result.push(current.trim());

                return result;
            }

            // Upload ZIP file
            function uploadZip(file) {
                const formData = new FormData();
                formData.append('action', 'sakwood_upload_images_zip');
                formData.append('zip_file', file);
                formData.append('nonce', sakwoodBulkImport.nonce);

                $.ajax({
                    url: sakwoodBulkImport.ajaxUrl,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        if (response.success) {
                            imageMapping = response.data.image_mapping;
                            showPreview(csvData, imageMapping);
                        } else {
                            $('#upload-error').text(response.data.message || '<?php _e('Failed to upload ZIP file', 'sakwood-integration'); ?>').show();
                        }
                    },
                    error: function() {
                        $('#upload-error').text('<?php _e('Error uploading ZIP file', 'sakwood-integration'); ?>').show();
                    }
                });
            }

            // Show preview
            function showPreview(data, images) {
                const validCount = data.filter(row => validateRow(row).valid).length;
                const invalidCount = data.length - validCount;
                const imageCount = Object.keys(images).length;

                let summaryClass = invalidCount > 0 ? 'warning' : 'success';
                let summaryHtml = `
                    <strong><?php _e('Found', 'sakwood-integration'); ?>:</strong> ${data.length} <?php _e('products', 'sakwood-integration'); ?><br>
                    <strong><?php _e('Valid', 'sakwood-integration'); ?>:</strong> ${validCount}<br>
                    <strong><?php _e('Invalid', 'sakwood-integration'); ?>:</strong> ${invalidCount}<br>
                    <strong><?php _e('Images', 'sakwood-integration'); ?>:</strong> ${imageCount}
                `;

                $('#preview-summary').addClass(summaryClass).html(summaryHtml);

                // Populate preview table
                let tbodyHtml = '';
                data.forEach((row, index) => {
                    const validation = validateRow(row);
                    const statusClass = validation.valid ? 'status-valid' : 'status-invalid';
                    const statusText = validation.valid ? '<?php _e('Valid', 'sakwood-integration'); ?>' : validation.error;

                    tbodyHtml += `
                        <tr>
                            <td>${index + 2}</td>
                            <td>${row.product_name_th || '-'}</td>
                            <td>${row.product_name_en || '-'}</td>
                            <td>${row.price || '-'}</td>
                            <td>${row.width || '-'} x ${row.length || '-'} x ${row.thickness || '-'}</td>
                            <td class="${statusClass}">${statusText}</td>
                        </tr>
                    `;
                });

                $('#preview-tbody').html(tbodyHtml);

                // Show preview step
                $('#step-upload').hide();
                $('#step-preview').show();
            }

            // Validate row
            function validateRow(row) {
                const required = ['product_name_th', 'product_name_en', 'description_th', 'description_en', 'price', 'width', 'length', 'thickness', 'category'];

                for (let field of required) {
                    if (!row[field] || row[field].trim() === '') {
                        return { valid: false, error: `Missing: ${field}` };
                    }
                }

                const price = parseFloat(row.price);
                if (isNaN(price) || price <= 0) {
                    return { valid: false, error: 'Invalid price' };
                }

                return { valid: true };
            }

            // Back button
            $('#back-btn').on('click', function() {
                $('#step-preview').hide();
                $('#step-upload').show();
            });

            // Import button
            $('#import-btn').on('click', function() {
                const validData = csvData.filter(row => validateRow(row).valid);

                if (validData.length === 0) {
                    alert('<?php _e('No valid products to import', 'sakwood-integration'); ?>');
                    return;
                }

                $('#step-preview').hide();
                $('#step-progress').show();

                processImport(validData, imageMapping);
            });

            // Process import
            function processImport(data, images) {
                let imported = 0;
                let failed = 0;
                const errors = [];

                function processNext() {
                    if (imported + failed >= data.length) {
                        showResults(imported, failed, errors);
                        return;
                    }

                    const index = imported + failed;
                    const row = data[index];
                    const progress = Math.round((index / data.length) * 100);

                    $('#progress-fill').css('width', progress + '%');
                    $('#progress-status').text(`${sakwoodBulkImport.strings.processing} ${index + 1}/${data.length}`);

                    // Send to server
                    $.ajax({
                        url: sakwoodBulkImport.ajaxUrl,
                        type: 'POST',
                        data: {
                            action: 'sakwood_import_single_product',
                            nonce: sakwoodBulkImport.nonce,
                            product: row,
                            images: images
                        },
                        success: function(response) {
                            if (response.success) {
                                imported++;
                            } else {
                                failed++;
                                errors.push({
                                    row: index + 1,
                                    name: row.product_name_th,
                                    error: response.data.message || 'Unknown error'
                                });
                            }
                            processNext();
                        },
                        error: function() {
                            failed++;
                            errors.push({
                                row: index + 1,
                                name: row.product_name_th,
                                error: 'Server error'
                            });
                            processNext();
                        }
                    });
                }

                processNext();
            }

            // Show results
            function showResults(imported, failed, errors) {
                $('#progress-fill').css('width', '100%');
                $('#progress-status').text(sakwoodBulkImport.strings.success);

                $('#import-results').show();
                $('#import-summary').html(`
                    <p><strong><?php _e('Imported', 'sakwood-integration'); ?>:</strong> ${imported}</p>
                    <p><strong><?php _e('Failed', 'sakwood-integration'); ?>:</strong> ${failed}</p>
                `);

                if (errors.length > 0) {
                    let errorHtml = '<h4><?php _e('Errors', 'sakwood-integration'); ?></h4><ul>';
                    errors.forEach(err => {
                        errorHtml += `<li><strong>Row ${err.row} (${err.name}):</strong> ${err.error}</li>`;
                    });
                    errorHtml += '</ul>';
                    $('#import-errors').html(errorHtml);
                }
            }
        });
        </script>
        <?php
    }

    /**
     * AJAX: Upload ZIP file
     */
    public function ajax_upload_zip() {
        check_ajax_referer('sakwood_bulk_import', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => __('Permission denied', 'sakwood-integration')));
        }

        if (empty($_FILES['zip_file'])) {
            wp_send_json_error(array('message' => __('No file uploaded', 'sakwood-integration')));
        }

        $file = $_FILES['zip_file'];

        // Validate ZIP
        if ($file['type'] !== 'application/zip' && $file['type'] !== 'application/x-zip-compressed') {
            wp_send_json_error(array('message' => __('Invalid file type. Please upload a ZIP file.', 'sakwood-integration')));
        }

        // Create temp directory
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/temp-import/';

        if (!file_exists($temp_dir)) {
            wp_mkdir_p($temp_dir);
        }

        // Extract ZIP
        $zip = new ZipArchive;
        $zip_file = $file['tmp_name'];

        if ($zip->open($zip_file) === TRUE) {
            // Extract to temp directory
            if ($zip->extractTo($temp_dir) === TRUE) {
                $zip->close();

                // Process images - search recursively in subdirectories
                $image_mapping = array();
                $this->scan_directory_for_images($temp_dir, $image_mapping);

                // Clean up temp directory (after processing)
                $this->cleanup_temp_directory($temp_dir);

                wp_send_json_success(array('image_mapping' => $image_mapping));
            } else {
                $zip->close();
                wp_send_json_error(array('message' => __('Failed to extract ZIP file', 'sakwood-integration')));
            }
        } else {
            wp_send_json_error(array('message' => __('Failed to open ZIP file', 'sakwood-integration')));
        }
    }

    /**
     * AJAX: Import single product
     */
    public function ajax_import_single_product() {
        check_ajax_referer('sakwood_bulk_import', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => __('Permission denied', 'sakwood-integration')));
        }

        // FormData sends data already decoded as arrays
        $product_data = isset($_POST['product']) ? $_POST['product'] : array();

        // Handle images mapping - may be JSON string or array
        if (isset($_POST['images'])) {
            $images = $_POST['images'];
            if (is_string($images)) {
                $image_mapping = json_decode(stripslashes($images), true);
            } else {
                $image_mapping = $images;
            }
        } else {
            $image_mapping = array();
        }

        if (empty($product_data)) {
            wp_send_json_error(array('message' => __('No product data', 'sakwood-integration')));
        }

        // Create product
        $product_id = $this->create_product($product_data, $image_mapping);

        if (is_wp_error($product_id)) {
            wp_send_json_error(array('message' => $product_id->get_error_message()));
        }

        wp_send_json_success(array('product_id' => $product_id));
    }

    /**
     * Check if file is image
     */
    private function is_image($file_path) {
        $ext = strtolower(pathinfo($file_path, PATHINFO_EXTENSION));
        return in_array($ext, array('jpg', 'jpeg', 'png', 'webp', 'gif'));
    }

    /**
     * Upload image to media library
     */
    private function upload_image_to_media_library($file_path, $filename) {
        // Check if file exists
        if (!file_exists($file_path)) {
            error_log("Sakwood Import: File not found: $file_path");
            return false;
        }

        // Get file info
        $file_info = wp_check_filetype($filename);
        if (!$file_info['ext']) {
            error_log("Sakwood Import: Invalid file type: $filename");
            return false;
        }

        // Read file content
        $file_content = file_get_contents($file_path);
        if ($file_content === false) {
            error_log("Sakwood Import: Cannot read file: $file_path");
            return false;
        }

        // Upload using WordPress media_handle_sideload
        $upload = wp_upload_bits($filename, null, $file_content);

        if (is_wp_error($upload)) {
            error_log("Sakwood Import: wp_upload_bits failed: " . $upload->get_error_message());
            return false;
        }

        // Create attachment
        $attachment = array(
            'post_mime_type' => $upload['type'],
            'post_title' => sanitize_file_name($filename),
            'post_content' => '',
            'post_status' => 'inherit',
            'guid' => $upload['url']
        );

        // Insert attachment
        $attach_id = wp_insert_attachment($attachment, $upload['file']);

        if (is_wp_error($attach_id)) {
            error_log("Sakwood Import: wp_insert_attachment failed: " . $attach_id->get_error_message());
            // Clean up uploaded file
            @unlink($upload['file']);
            return false;
        }

        // Generate metadata and thumbnails
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
        wp_update_attachment_metadata($attach_id, $attach_data);

        return $attach_id;
    }

    /**
     * Scan directory recursively for images
     */
    private function scan_directory_for_images($dir, &$image_mapping) {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($iterator as $file) {
            if ($file->isFile()) {
                $file_path = $file->getPathname();
                $filename = $file->getFilename();

                // Skip hidden files
                if (strpos($filename, '.') === 0) {
                    continue;
                }

                // Check if image
                if ($this->is_image($file_path)) {
                    $attachment_id = $this->upload_image_to_media_library($file_path, $filename);
                    if ($attachment_id && !is_wp_error($attachment_id)) {
                        // Store with just filename (not full path) for easier matching
                        $image_mapping[$filename] = $attachment_id;
                    }
                }
            }
        }
    }

    /**
     * Clean up temp directory recursively
     */
    private function cleanup_temp_directory($dir) {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir),
            RecursiveIteratorIterator::CHILD_FIRST
        );

        foreach ($iterator as $file) {
            if ($file->isFile()) {
                @unlink($file->getPathname());
            } elseif ($file->isDir()) {
                @rmdir($file->getPathname());
            }
        }

        // Finally remove the temp directory itself
        @rmdir($dir);
    }

    /**
     * Create product from CSV row
     */
    private function create_product($data, $image_mapping) {
        // Create or get category
        $category_id = $this->get_or_create_category($data['category']);

        // Prepare product data
        $product_data = array(
            'post_title'   => sanitize_text_field($data['product_name_th']),
            'post_content' => wp_kses_post($data['description_th']),
            'post_excerpt' => sanitize_text_field($data['short_desc_th'] ?? ''),
            'post_status'  => 'publish',
            'post_type'    => 'product',
        );

        // Create product
        $product_id = wp_insert_post($product_data);

        if (is_wp_error($product_id)) {
            return $product_id;
        }

        // Set product type
        wp_set_object_terms($product_id, 'simple', 'product_type');

        // Set price
        update_post_meta($product_id, '_price', $data['price']);
        update_post_meta($product_id, '_regular_price', $data['regular_price'] ?? $data['price']);
        if (isset($data['regular_price']) && $data['regular_price'] != $data['price']) {
            update_post_meta($product_id, '_sale_price', $data['price']);
        }

        // Set stock status
        $stock_status = isset($data['stock_status']) ? $data['stock_status'] : 'instock';
        update_post_meta($product_id, '_stock_status', $stock_status);
        update_post_meta($product_id, '_manage_stock', 'no');

        // Set SKU
        if (!empty($data['sku'])) {
            update_post_meta($product_id, '_sku', sanitize_text_field($data['sku']));
        }

        // Set dimensions
        update_post_meta($product_id, '_product_width', sanitize_text_field($data['width']));
        update_post_meta($product_id, '_product_length', sanitize_text_field($data['length']));
        update_post_meta($product_id, '_product_thickness', sanitize_text_field($data['thickness']));

        // Calculate volume
        $volume = ($data['width'] / 1000) * ($data['length']) * ($data['thickness'] / 1000);
        update_post_meta($product_id, '_product_volume', round($volume, 4));

        // Set English translations
        update_post_meta($product_id, '_product_title_en', sanitize_text_field($data['product_name_en']));
        update_post_meta($product_id, '_product_description_en', wp_kses_post($data['description_en']));
        update_post_meta($product_id, '_product_short_description_en', sanitize_text_field($data['short_desc_en'] ?? ''));

        // Set category
        if ($category_id) {
            wp_set_object_terms($product_id, $category_id, 'product_cat');
        }

        // Set tags
        if (!empty($data['tags'])) {
            $tags = explode(',', $data['tags']);
            $tag_ids = array();
            foreach ($tags as $tag) {
                $tag_id = $this->get_or_create_tag(trim($tag));
                if ($tag_id) {
                    $tag_ids[] = $tag_id;
                }
            }
            if (!empty($tag_ids)) {
                wp_set_object_terms($product_id, $tag_ids, 'product_tag');
            }
        }

        // Attach images
        $this->attach_product_images($product_id, $data, $image_mapping);

        return $product_id;
    }

    /**
     * Get or create category
     */
    private function get_or_create_category($slug) {
        $slug = sanitize_title($slug);

        $term = get_term_by('slug', $slug, 'product_cat');

        if ($term) {
            return $term->term_id;
        }

        // Create category
        $result = wp_insert_term(
            ucfirst($slug), // Use slug as name for now
            'product_cat',
            array('slug' => $slug)
        );

        if (is_wp_error($result)) {
            return 0;
        }

        return $result['term_id'];
    }

    /**
     * Get or create tag
     */
    private function get_or_create_tag($name) {
        if (empty($name)) {
            return 0;
        }

        $slug = sanitize_title($name);
        $term = get_term_by('slug', $slug, 'product_tag');

        if ($term) {
            return $term->term_id;
        }

        // Create tag
        $result = wp_insert_term(
            $name,
            'product_tag',
            array('slug' => $slug)
        );

        if (is_wp_error($result)) {
            return 0;
        }

        return $result['term_id'];
    }

    /**
     * Attach product images
     */
    private function attach_product_images($product_id, $data, $image_mapping) {
        // Main image
        if (!empty($data['image_file_names'])) {
            $main_image = $data['image_file_names'];
            if (isset($image_mapping[$main_image])) {
                set_post_thumbnail($product_id, $image_mapping[$main_image]);
            }
        }

        // Gallery images
        if (!empty($data['gallery_file_names'])) {
            $gallery_images = explode('||', $data['gallery_file_names']);
            $gallery_ids = array();

            foreach ($gallery_images as $image) {
                $image = trim($image);
                if (isset($image_mapping[$image])) {
                    $gallery_ids[] = $image_mapping[$image];
                }
            }

            if (!empty($gallery_ids)) {
                update_post_meta($product_id, '_product_image_gallery', implode(',', $gallery_ids));
            }
        }
    }
}

// Initialize bulk import
new Sakwood_Product_Bulk_Import();