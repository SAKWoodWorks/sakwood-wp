<?php
/**
 * Wholesale REST API
 *
 * REST API endpoints for wholesale applications
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Wholesale_API {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
        add_action('wp_ajax_get_wholesale_application_details', array($this, 'ajax_get_application_details'));
        add_action('wp_ajax_update_wholesale_application', array($this, 'ajax_update_application'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        register_rest_route('sakwood/v1', '/wholesale/apply', array(
            'methods' => 'POST',
            'callback' => array($this, 'submit_application'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('sakwood/v1', '/wholesale/status', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_status'),
            'permission_callback' => 'is_user_logged_in',
        ));

        register_rest_route('sakwood/v1', '/products/(?P<id>\d+)/wholesale-pricing', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_wholesale_pricing'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Submit wholesale application
     */
    public function submit_application($request) {
        $params = $request->get_params();

        // Validate required fields
        if (empty($params['companyName']) || empty($params['taxId']) || empty($params['businessType'])) {
            return new WP_Error('missing_fields', 'Missing required fields', array('status' => 400));
        }

        // Get user from JWT token or session
        $user_id = $this->get_user_from_request();
        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        // Validate Tax ID (13 digits for Thailand)
        $tax_id = preg_replace('/\D/', '', $params['taxId']);
        if (strlen($tax_id) !== 13) {
            return new WP_Error('invalid_tax_id', 'Tax ID must be 13 digits', array('status' => 400));
        }

        // Check if user already has a pending application
        $existing = Sakwood_Wholesale_Database::get_applications_by_user($user_id);
        if (!empty($existing)) {
            $last_app = $existing[0];
            if ($last_app->status === 'pending' || $last_app->status === 'approved' || $last_app->status === 'active') {
                return new WP_Error('application_exists', 'You already have a ' . $last_app->status . ' application', array('status' => 400));
            }
        }

        // Prepare data
        $data = array(
            'user_id' => $user_id,
            'company_name' => sanitize_text_field($params['companyName']),
            'tax_id' => $tax_id,
            'business_type' => sanitize_text_field($params['businessType']),
            'business_address' => sanitize_textarea_field($params['businessAddress']),
            'business_city' => sanitize_text_field($params['businessCity']),
            'business_province' => sanitize_text_field($params['businessProvince']),
            'business_postal_code' => sanitize_text_field($params['businessPostalCode']),
            'business_phone' => sanitize_text_field($params['businessPhone']),
            'estimated_volume' => sanitize_text_field($params['estimatedMonthlyVolume']),
            'references' => isset($params['references']) ? sanitize_textarea_field($params['references']) : '',
        );

        // Insert application
        $application_id = Sakwood_Wholesale_Database::insert_application($data);

        if ($application_id) {
            // Get application details
            $application = Sakwood_Wholesale_Database::get_application($application_id);

            // Update user meta
            Sakwood_Wholesale_Database::update_user_wholesale_meta($user_id, $application);

            // Send notification email to admin
            $this->send_admin_notification($application, $user_id);

            return array(
                'success' => true,
                'application_id' => $application_id,
                'status' => 'pending',
                'message' => 'Application submitted successfully. Please wait 2-3 business days for review.',
                'user' => array(
                    'wholesaleStatus' => 'pending',
                    'businessName' => $data['company_name'],
                    'taxId' => $tax_id,
                )
            );
        }

        return new WP_Error('server_error', 'Failed to submit application', array('status' => 500));
    }

    /**
     * Get wholesale application status
     */
    public function get_status($request) {
        $user_id = get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        $applications = Sakwood_Wholesale_Database::get_applications_by_user($user_id);

        if (empty($applications)) {
            return array(
                'status' => null,
                'has_applied' => false,
            );
        }

        $application = $applications[0];

        return array(
            'status' => $application->status,
            'application_id' => $application->application_id,
            'submitted_date' => $application->submitted_date,
            'reviewed_date' => $application->reviewed_date,
            'business_name' => $application->company_name,
            'credit_limit' => (float) $application->credit_limit,
            'admin_notes' => $application->admin_notes,
            'has_applied' => true,
        );
    }

    /**
     * Get wholesale pricing for a product
     */
    public function get_wholesale_pricing($request) {
        $product_id = $request['id'];
        $user_id = get_current_user_id();

        if (!$user_id) {
            return array(
                'is_wholesale' => false,
                'wholesale_price' => null,
            );
        }

        // Check if user is wholesale customer
        $wholesale_status = get_user_meta($user_id, 'wholesale_status', true);

        if ($wholesale_status !== 'active' && $wholesale_status !== 'approved') {
            return array(
                'is_wholesale' => false,
                'wholesale_price' => null,
            );
        }

        // Get product
        $product = wc_get_product($product_id);
        if (!$product) {
            return new WP_Error('product_not_found', 'Product not found', array('status' => 404));
        }

        $retail_price = $product->get_price();
        $wholesale_price = $retail_price * 0.85; // 15% discount

        return array(
            'is_wholesale' => true,
            'retail_price' => (string) $retail_price,
            'wholesale_price' => (string) $wholesale_price,
            'savings_percentage' => 15,
            'minimum_order_quantity' => 50,
        );
    }

    /**
     * AJAX: Get application details (for admin modal)
     */
    public function ajax_get_application_details() {
        check_ajax_referer('sakwood-ajax-nonce', 'nonce');

        // Use 'edit_posts' capability (Editors, Admins, Shop Managers)
        if (!current_user_can('edit_posts')) {
            wp_send_json_error('Permission denied');
        }

        $application_id = sanitize_text_field($_POST['application_id']);
        $application = Sakwood_Wholesale_Database::get_application($application_id);

        if (!$application) {
            wp_send_json_error('Application not found');
        }

        wp_send_json_success(array(
            'application_id' => $application->application_id,
            'company_name' => $application->company_name,
            'tax_id' => $application->tax_id,
            'business_type' => $application->business_type,
            'business_address' => $application->business_address,
            'business_city' => $application->business_city,
            'business_province' => $application->business_province,
            'business_postal_code' => $application->business_postal_code,
            'business_phone' => $application->business_phone,
            'estimated_volume' => $application->estimated_volume,
            'references' => $application->references,
            'status' => $application->status,
            'status_label' => Sakwood_Wholesale_Admin::get_status_label($application->status),
            'credit_limit' => $application->credit_limit,
            'admin_notes' => $application->admin_notes,
            'submitted_date' => date('F j, Y', strtotime($application->submitted_date)),
        ));
    }

    /**
     * AJAX: Update application (for admin)
     */
    public function ajax_update_application() {
        check_ajax_referer('sakwood-ajax-nonce', 'nonce');

        // Use 'edit_posts' capability (Editors, Admins, Shop Managers)
        if (!current_user_can('edit_posts')) {
            wp_send_json_error('Permission denied');
        }

        $application_id = sanitize_text_field($_POST['application_id']);
        $application = Sakwood_Wholesale_Database::get_application($application_id);

        if (!$application) {
            wp_send_json_error('Application not found');
        }

        $status = isset($_POST['status']) ? sanitize_text_field($_POST['status']) : null;
        $credit_limit = isset($_POST['credit_limit']) ? floatval($_POST['credit_limit']) : 0;
        $admin_notes = isset($_POST['admin_notes']) ? sanitize_textarea_field($_POST['admin_notes']) : '';

        if ($status) {
            Sakwood_Wholesale_Database::update_status($application_id, $status, $credit_limit, $admin_notes);

            // Update user meta
            $updated_app = Sakwood_Wholesale_Database::get_application($application_id);
            Sakwood_Wholesale_Database::update_user_wholesale_meta($application->user_id, $updated_app);

            // Send email notification
            $admin = new Sakwood_Wholesale_Admin();
            $admin->send_status_email($updated_app, $status);
        } elseif (!empty($admin_notes)) {
            Sakwood_Wholesale_Database::update_status($application_id, $application->status, 0, $admin_notes);
        }

        wp_send_json_success(array(
            'message' => 'Application updated successfully',
        ));
    }

    /**
     * Get user from request (JWT or session)
     */
    private function get_user_from_request() {
        // Try to get user from JWT token
        $headers = getallheaders();
        $auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';

        if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            $token = $matches[1];

            // Validate JWT token (requires JWT Auth plugin)
            // This is a simplified version - you should use the JWT Auth plugin's validation
            $user = $this->validate_jwt_token($token);
            if ($user) {
                return $user->ID;
            }
        }

        // Fallback to current logged-in user
        $user_id = get_current_user_id();
        if ($user_id) {
            return $user_id;
        }

        return false;
    }

    /**
     * Validate JWT token (simplified)
     */
    private function validate_jwt_token($token) {
        // This should be replaced with proper JWT validation
        // For now, check if user is logged in via cookie
        return wp_get_current_user();
    }

    /**
     * Send admin notification email
     */
    private function send_admin_notification($application, $user_id) {
        $user = get_userdata($user_id);
        $admin_email = get_option('admin_email');

        $subject = 'New Wholesale Application: ' . $application->company_name;
        $message = "A new wholesale application has been submitted.\n\n";
        $message .= "Application ID: " . $application->application_id . "\n";
        $message .= "Company: " . $application->company_name . "\n";
        $message .= "Business Type: " . ucfirst($application->business_type) . "\n";
        $message .= "Estimated Volume: " . $application->estimated_volume . "\n";
        $message .= "Submitted: " . $application->submitted_date . "\n\n";
        $message .= "Review the application in WordPress admin:\n";
        $message .= admin_url('admin.php?page=sakwood-wholesale');

        $headers = array('Content-Type: text/plain; charset=UTF-8');

        wp_mail($admin_email, $subject, $message, $headers);
    }
}

// Initialize API
new Sakwood_Wholesale_API();
