<?php
/**
 * Public Locations API
 *
 * Provides REST API endpoints for public distributor/branch locations
 * Includes CSV import functionality
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Sakwood_Public_Locations_API {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {

        // Get all public locations (public endpoint)
        register_rest_route('sakwood/v1', '/public-locations', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_public_locations'),
            'permission_callback' => '__return_true',
        ));

        // Get location categories (public endpoint)
        register_rest_route('sakwood/v1', '/public-locations/categories', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_location_categories'),
            'permission_callback' => '__return_true',
        ));

        // Get location provinces (public endpoint)
        register_rest_route('sakwood/v1', '/public-locations/provinces', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_location_provinces'),
            'permission_callback' => '__return_true',
        ));

        // ========== ADMIN ENDPOINTS ==========

        // Test endpoint (admin only)
        register_rest_route('sakwood/v1', '/admin/public-locations/test', array(
            'methods' => 'GET',
            'callback' => array($this, 'test_import'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Import CSV (admin only)
        register_rest_route('sakwood/v1', '/admin/public-locations/import', array(
            'methods' => 'POST',
            'callback' => array($this, 'import_csv'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Delete all locations (admin only)
        register_rest_route('sakwood/v1', '/admin/public-locations/delete-all', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_all_locations'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Get all locations (admin only - with edit/delete controls)
        register_rest_route('sakwood/v1', '/admin/public-locations', array(
            'methods' => 'GET',
            'callback' => array($this, 'admin_get_all_locations'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Delete single location (admin only)
        register_rest_route('sakwood/v1', '/admin/public-locations/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'admin_delete_location'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));
    }

    /**
     * Check admin permission
     */
    public function check_admin_permission() {
        if (!current_user_can('manage_options')) {
            return new WP_Error('not_authorized', 'Admin access required', array('status' => 403));
        }
        return true;
    }

    /**
     * Test endpoint for debugging
     */
    public function test_import($request) {
        $test_data = array(
            'status' => 'OK',
            'php_version' => phpversion(),
            'memory_limit' => ini_get('memory_limit'),
            'max_execution_time' => ini_get('max_execution_time'),
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'database_table' => $this->check_table_exists(),
        );

        return rest_ensure_response($test_data);
    }

    /**
     * Check if database table exists
     */
    private function check_table_exists() {
        global $wpdb;
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';

        $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_locations'");

        if ($table_exists) {
            $count = $wpdb->get_var("SELECT COUNT(*) FROM $table_locations");
            return array('exists' => true, 'count' => $count);
        } else {
            return array('exists' => false, 'error' => 'Table does not exist');
        }
    }

    /**
     * Get all public locations
     */
    public function get_public_locations($request) {
        $category = $request->get_param('category');
        $province = $request->get_param('province');

        $locations = Sakwood_Public_Locations_Database::get_all_public_locations($category, $province);

        return rest_ensure_response($locations);
    }

    /**
     * Get location categories
     */
    public function get_location_categories($request) {
        $categories = Sakwood_Public_Locations_Database::get_categories();
        return rest_ensure_response($categories);
    }

    /**
     * Get location provinces
     */
    public function get_location_provinces($request) {
        $provinces = Sakwood_Public_Locations_Database::get_provinces();
        return rest_ensure_response($provinces);
    }

    /**
     * Import CSV file
     */
    public function import_csv($request) {
        // Enable error logging
        error_log('SAKWOOD: Import CSV started');

        try {
            // Check if file was uploaded
            if (!isset($_FILES['csv_file'])) {
                error_log('SAKWOOD: No file uploaded');
                return new WP_Error('no_file', 'No file uploaded', array('status' => 400));
            }

            $file = $_FILES['csv_file'];
            error_log('SAKWOOD: File info - ' . print_r($file, true));

            // Validate file type
            $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if ($file_ext !== 'csv') {
                error_log('SAKWOOD: Invalid file type: ' . $file_ext);
                return new WP_Error('invalid_file', 'File must be a CSV', array('status' => 400));
            }

            // Check for errors
            if ($file['error'] !== UPLOAD_ERR_OK) {
                error_log('SAKWOOD: Upload error code: ' . $file['error']);
                return new WP_Error('upload_error', 'File upload error: ' . $file['error'], array('status' => 500));
            }

            // Check file size (max 5MB)
            if ($file['size'] > 5 * 1024 * 1024) {
                error_log('SAKWOOD: File too large: ' . $file['size']);
                return new WP_Error('file_too_large', 'File size must be less than 5MB', array('status' => 400));
            }

            // Increase PHP limits for large files
            @set_time_limit(300); // 5 minutes
            @ini_set('memory_limit', '256M');

            error_log('SAKWOOD: Starting CSV parse');
            // Read CSV file
            $csv_data = $this->parse_csv($file['tmp_name']);
            error_log('SAKWOOD: CSV parsed, rows: ' . count($csv_data));

            if (empty($csv_data)) {
                error_log('SAKWOOD: CSV data is empty');
                return new WP_Error('empty_file', 'CSV file is empty or invalid', array('status' => 400));
            }

            // Clear existing locations if requested
            $clear_first = $request->get_param('clear_first') === 'true';
            if ($clear_first) {
                error_log('SAKWOOD: Clearing existing locations');
                Sakwood_Public_Locations_Database::delete_all_public_locations();
            }

            // Import locations
            $imported = 0;
            $errors = array();
            $batch_size = 50; // Process in batches to avoid memory issues

            error_log('SAKWOOD: Starting import of ' . count($csv_data) . ' rows');

            foreach ($csv_data as $index => $row) {
                $result = $this->import_location($row);

                if ($result === true) {
                    $imported++;
                } else {
                    $error_msg = "Row " . ($index + 2) . ": " . $result;
                    $errors[] = $error_msg;
                    error_log('SAKWOOD: Import error - ' . $error_msg);
                }

                // Clear cache every batch
                if (($index + 1) % $batch_size === 0) {
                    error_log("SAKWOOD: Processed $index rows");
                }
            }

            error_log("SAKWOOD: Import complete - imported: $imported, errors: " . count($errors));

            return rest_ensure_response(array(
                'success' => true,
                'imported' => $imported,
                'total' => count($csv_data),
                'errors' => $errors
            ));

        } catch (Exception $e) {
            error_log('SAKWOOD: Exception during import: ' . $e->getMessage());
            return new WP_Error('import_exception', 'Import error: ' . $e->getMessage(), array('status' => 500));
        }
    }

    /**
     * Parse CSV file
     */
    private function parse_csv($file_path) {
        $csv_data = array();

        error_log('SAKWOOD: Parsing CSV file: ' . $file_path);

        if (!file_exists($file_path)) {
            error_log('SAKWOOD: File does not exist: ' . $file_path);
            return $csv_data;
        }

        $handle = fopen($file_path, 'r');
        if ($handle === false) {
            error_log('SAKWOOD: Cannot open file');
            return $csv_data;
        }

        try {
            // Read header row
            $headers = fgetcsv($handle, 0, ',');

            if ($headers === false || empty($headers)) {
                error_log('SAKWOOD: Cannot read headers');
                fclose($handle);
                return $csv_data;
            }

            // Clean headers (remove BOM, trim whitespace)
            $headers = array_map(function($header) {
                $header = trim($header);
                // Remove UTF-8 BOM if present
                $header = preg_replace('/^\xEF\xBB\xBF/', '', $header);
                return $header;
            }, $headers);

            error_log('SAKWOOD: Headers: ' . implode(', ', $headers));

            // Read data rows
            $row_number = 1;
            while (($row = fgetcsv($handle, 0, ',')) !== false) {
                $row_number++;

                // Skip empty rows
                if (empty(array_filter($row))) {
                    continue;
                }

                // Ensure row has same number of columns as headers
                if (count($row) !== count($headers)) {
                    error_log("SAKWOOD: Row $row_number has " . count($row) . " columns, expected " . count($headers));
                    // Try to pad or trim the row
                    if (count($row) < count($headers)) {
                        $row = array_pad($row, count($headers), '');
                    } else {
                        $row = array_slice($row, 0, count($headers));
                    }
                }

                $csv_data[] = array_combine($headers, $row);
            }

            error_log('SAKWOOD: Parsed ' . count($csv_data) . ' data rows');

        } catch (Exception $e) {
            error_log('SAKWOOD: CSV parsing error: ' . $e->getMessage());
        } finally {
            fclose($handle);
        }

        return $csv_data;
    }

    /**
     * Import a single location from CSV row
     */
    private function import_location($row) {
        try {
            // Validate required fields
            if (empty($row['Name']) || empty($row['Address']) || empty($row['Latitude']) || empty($row['Longitude']) || empty($row['Category'])) {
                return 'Missing required fields (Name, Address, Latitude, Longitude, Category)';
            }

            // Validate coordinates
            $lat = floatval($row['Latitude']);
            $lng = floatval($row['Longitude']);

            if ($lat < -90 || $lat > 90 || $lng < -180 || $lng > 180) {
                return 'Invalid coordinates: lat=' . $lat . ', lng=' . $lng;
            }

            // Extract province from address (or try to detect it)
            $province = $this->extract_province($row['Address']);

            // Build location data with proper sanitization
            $location_data = array(
                'name' => sanitize_text_field($row['Name']),
                'address' => sanitize_textarea_field($row['Address']),
                'suite_shop' => isset($row['Suite/Shop']) ? sanitize_text_field($row['Suite/Shop']) : '',
                'province' => sanitize_text_field($province),
                'district' => '',
                'postal_code' => '',
                'phone' => isset($row['Telephone']) ? sanitize_text_field($row['Telephone']) : '',
                'website' => isset($row['Website']) ? esc_url_raw($row['Website']) : '',
                'business_hours' => isset($row['Hours or Desc.']) ? sanitize_textarea_field($row['Hours or Desc.']) : '',
                'email' => isset($row['Email']) ? sanitize_email($row['Email']) : '',
                'image_url' => isset($row['Image Url']) ? esc_url_raw($row['Image Url']) : '',
                'latitude' => $lat,
                'longitude' => $lng,
                'category' => sanitize_text_field($row['Category']),
                'is_active' => true,
            );

            // Save location
            $result = Sakwood_Public_Locations_Database::save_public_location($location_data);

            if ($result) {
                return true;
            } else {
                return 'Database save failed';
            }
        } catch (Exception $e) {
            return 'Import error: ' . $e->getMessage();
        }
    }

    /**
     * Extract province from address
     */
    private function extract_province($address) {
        // List of Thai provinces to search for
        $provinces = array(
            'กรุงเทพมหานคร', 'สมุทรปราการ', 'นนทบุรี', 'ปทุมธานี', 'พระนครศรีอยุธยา',
            'อ่างทอง', 'ลพบุรี', 'สิงห์บุรี', 'ชัยนาท', 'สระบุรี', 'ชลบุรี', 'ระยอง',
            'จันทบุรี', 'ตราด', 'ฉะเชิงเทรา', 'ปราจีนบุรี', 'นครนายก', 'สระแก้ว',
            'นครราชสีมา', 'บุรีรัมย์', 'สุรินทร์', 'ศรีสะเกษ', 'อุบลราชธานี',
            'ยโสธร', 'ชัยภูมิ', 'อำนาจเจริญ', 'บึงกาฬ', 'หนองบัวลำภู', 'ขอนแก่น',
            'อุดรธานี', 'เลย', 'หนองคาย', 'มหาสารคาม', 'ร้อยเอ็ต', 'กาฬสินธุ์',
            'สกลนคร', 'นครพนม', 'มุกดาหาร', 'เชียงใหม่', 'ลำปาง', 'ลำพูน', 'แพร่',
            'น่าน', 'พะเยา', 'เชียงราย', 'แม่ฮ่องสอน', 'ประจวบคีรีขันธ์', 'กาญจนบุรี',
            'ราชบุรี', 'เพชรบุรี', 'นครปฐม', 'สุพรรณบุรี', 'สุโขทัย', 'พิจิตร',
            'พิษณุโลก', 'กำแพงเพชร', 'ตาก', 'เพชรบูรณ์', 'นครสวรรค์', 'อุทัยธานี',
            'นครศรีธรรมราช', 'กระบี่', 'พังงา', 'ภูเก็ต', 'สุราษฎร์ธานี', 'ระนอง',
            'ชุมพร', 'สงขลา', 'สตูล', 'ตรัง', 'พัทลุง', 'ปัตตานี', 'ยะลา', 'นราธิวาสราชนคร'
        );

        // Search for province in address
        foreach ($provinces as $province) {
            if (strpos($address, $province) !== false) {
                return $province;
            }
        }

        // If not found, try to extract from end of address
        $parts = explode('จ.', $address);
        if (count($parts) > 1) {
            return trim($parts[count($parts) - 1]);
        }

        return 'กรุงเทพมหานคร'; // Default
    }

    /**
     * Delete all locations
     */
    public function delete_all_locations($request) {
        $result = Sakwood_Public_Locations_Database::delete_all_public_locations();

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'All locations deleted successfully'
        ));
    }

    /**
     * Get all locations (admin)
     */
    public function admin_get_all_locations($request) {
        $locations = Sakwood_Public_Locations_Database::get_all_public_locations();
        return rest_ensure_response($locations);
    }

    /**
     * Delete single location (admin)
     */
    public function admin_delete_location($request) {
        $id = intval($request['id']);

        global $wpdb;
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';

        $result = $wpdb->delete(
            $table_locations,
            array('id' => $id),
            array('%d')
        );

        if ($result === false) {
            return new WP_Error('delete_failed', 'Failed to delete location', array('status' => 500));
        }

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Location deleted successfully'
        ));
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_submenu_page(
            'woocommerce', // Parent menu
            'Public Locations',
            'Public Locations',
            'manage_options',
            'sakwood-public-locations',
            array($this, 'render_admin_page')
        );
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'sakwood-woocommerce_page_sakwood-public-locations') {
            return;
        }

        wp_enqueue_script('sakwood-public-locations', SAKWOOD_PLUGIN_URL . 'assets/js/public-locations-admin.js', array('jquery'), SAKWOOD_VERSION, true);
    }

    /**
     * Render admin page
     */
    public function render_admin_page() {
        ?>
        <div class="wrap">
            <h1>Public Locations Management</h1>
            <p>Import and manage public distributor, branch, and retail partner locations.</p>

            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>Import from CSV</h2>
                <p>Upload a CSV file with location data. The file should have these columns:</p>
                <ul>
                    <li><code>Name</code> - Location name (required)</li>
                    <li><code>Address</code> - Full address (required)</li>
                    <li><code>Suite/Shop</code> - Suite or shop number (optional)</li>
                    <li><code>Telephone</code> - Phone number (optional)</li>
                    <li><code>Website</code> - Website URL (optional)</li>
                    <li><code>Hours or Desc.</code> - Business hours or description (optional)</li>
                    <li><code>Email</code> - Email address (optional)</li>
                    <li><code>Image Url</code> - Image URL (optional)</li>
                    <li><code>Latitude</code> - Latitude coordinate (required)</li>
                    <li><code>Longitude</code> - Longitude coordinate (required)</li>
                    <li><code>Category</code> - Category/Branches/Dealers/etc (required)</li>
                </ul>

                <form id="sakwood-import-form" enctype="multipart/form-data">
                    <table class="form-table">
                        <tr>
                            <th><label for="csv_file">CSV File</label></th>
                            <td><input type="file" name="csv_file" id="csv_file" accept=".csv" required></td>
                        </tr>
                        <tr>
                            <th><label for="clear_first">Clear Existing</label></th>
                            <td>
                                <label>
                                    <input type="checkbox" name="clear_first" id="clear_first" value="true">
                                    Delete all existing locations before importing
                                </label>
                            </td>
                        </tr>
                    </table>
                    <p class="submit">
                        <button type="submit" class="button button-primary">Import Locations</button>
                    </p>
                </form>

                <div id="sakwood-import-result" style="margin-top: 20px;"></div>
            </div>

            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>Current Locations</h2>
                <p><button id="sakwood-refresh-locations" class="button">Refresh List</button></p>
                <div id="sakwood-locations-list"></div>
            </div>
        </div>

        <style>
            #sakwood-locations-list table {
                width: 100%;
                border-collapse: collapse;
            }
            #sakwood-locations-list th,
            #sakwood-locations-list td {
                padding: 8px;
                border: 1px solid #ddd;
                text-align: left;
            }
            #sakwood-locations-list th {
                background-color: #f9f9f9;
            }
            .sakwood-import-success {
                padding: 10px;
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
                border-radius: 4px;
            }
            .sakwood-import-error {
                padding: 10px;
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
                border-radius: 4px;
            }
        </style>

        <script>
        jQuery(document).ready(function($) {
            // Handle form submission
            $('#sakwood-import-form').on('submit', function(e) {
                e.preventDefault();

                var formData = new FormData(this);
                var clearFirst = $('#clear_first').is(':checked') ? 'true' : 'false';

                $('#sakwood-import-result').html('<p>Importing...</p>');

                $.ajax({
                    url: '<?php echo rest_url('sakwood/v1/admin/public-locations/import?clear_first=' + clearFirst); ?>',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        var html = '<div class="sakwood-import-success">';
                        html += '<strong>Import Complete!</strong><br>';
                        html += 'Imported: ' + response.imported + ' / ' + response.total + ' locations<br>';

                        if (response.errors.length > 0) {
                            html += '<br><strong>Errors:</strong><ul>';
                            response.errors.forEach(function(error) {
                                html += '<li>' + error + '</li>';
                            });
                            html += '</ul>';
                        }

                        html += '</div>';
                        $('#sakwood-import-result').html(html);

                        // Refresh locations list
                        loadLocations();
                    },
                    error: function(xhr) {
                        var response = xhr.responseJSON;
                        var html = '<div class="sakwood-import-error">';
                        html += '<strong>Import Failed:</strong> ' + (response.message || response.code || 'Unknown error');
                        html += '</div>';
                        $('#sakwood-import-result').html(html);
                    }
                });
            });

            // Load locations
            function loadLocations() {
                $('#sakwood-locations-list').html('<p>Loading...</p>');

                $.ajax({
                    url: '<?php echo rest_url('sakwood/v1/admin/public-locations'); ?>',
                    type: 'GET',
                    success: function(locations) {
                        if (locations.length === 0) {
                            $('#sakwood-locations-list').html('<p>No locations found.</p>');
                            return;
                        }

                        var html = '<table>';
                        html += '<thead><tr><th>Name</th><th>Category</th><th>Province</th><th>Phone</th><th>Actions</th></tr></thead>';
                        html += '<tbody>';

                        locations.forEach(function(loc) {
                            html += '<tr>';
                            html += '<td>' + loc.name + '</td>';
                            html += '<td>' + loc.category + '</td>';
                            html += '<td>' + loc.province + '</td>';
                            html += '<td>' + loc.phone + '</td>';
                            html += '<td><button class="button button-small sakwood-delete-location" data-id="' + loc.id + '">Delete</button></td>';
                            html += '</tr>';
                        });

                        html += '</tbody></table>';
                        $('#sakwood-locations-list').html(html);
                    },
                    error: function() {
                        $('#sakwood-locations-list').html('<p>Error loading locations.</p>');
                    }
                });
            }

            // Refresh button
            $('#sakwood-refresh-locations').on('click', function() {
                loadLocations();
            });

            // Delete location
            $(document).on('click', '.sakwood-delete-location', function() {
                if (!confirm('Are you sure you want to delete this location?')) {
                    return;
                }

                var id = $(this).data('id');
                var button = $(this);

                $.ajax({
                    url: '<?php echo rest_url('sakwood/v1/admin/public-locations/'); ?>' + id,
                    type: 'DELETE',
                    success: function(response) {
                        button.closest('tr').fadeOut(300, function() {
                            $(this).remove();
                        });
                    },
                    error: function() {
                        alert('Error deleting location');
                    }
                });
            });

            // Load locations on page load
            loadLocations();
        });
        </script>
        <?php
    }
}

// Initialize the Public Locations API
new Sakwood_Public_Locations_API();
