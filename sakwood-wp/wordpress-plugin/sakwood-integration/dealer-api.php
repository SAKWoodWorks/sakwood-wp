<?php
/**
 * Dealer REST API
 *
 * Provides REST API endpoints for dealer management
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Sakwood_Dealer_API {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {

        // Submit dealer application
        register_rest_route('sakwood/v1', '/dealer/apply', array(
            'methods' => 'POST',
            'callback' => array($this, 'submit_dealer_application'),
            'permission_callback' => array($this, 'check_wholesale_permission'),
        ));

        // Check application status (public)
        register_rest_route('sakwood/v1', '/dealer/status/(?P<application_id>[a-zA-Z0-9-]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_application_status'),
            'permission_callback' => '__return_true',
        ));

        // Get current user's dealer info
        register_rest_route('sakwood/v1', '/dealer/info', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_dealer_info'),
            'permission_callback' => 'is_user_logged_in',
        ));

        // Get dealer pricing
        register_rest_route('sakwood/v1', '/dealer/pricing', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_dealer_pricing'),
            'permission_callback' => array($this, 'check_dealer_permission'),
        ));

        // Get dealer territories
        register_rest_route('sakwood/v1', '/dealer/territories', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_dealer_territories'),
            'permission_callback' => array($this, 'check_dealer_permission'),
        ));

        // Get dealer order history
        register_rest_route('sakwood/v1', '/dealer/orders', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_dealer_orders'),
            'permission_callback' => array($this, 'check_dealer_permission'),
        ));

        // ========== ADMIN ENDPOINTS ==========

        // Get all dealer applications (admin)
        register_rest_route('sakwood/v1', '/dealer/applications', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_all_applications'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Get application details (admin)
        register_rest_route('sakwood/v1', '/dealer/applications/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_application_details'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Approve dealer application (admin)
        register_rest_route('sakwood/v1', '/dealer/applications/(?P<id>\d+)/approve', array(
            'methods' => 'POST',
            'callback' => array($this, 'approve_application'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Reject dealer application (admin)
        register_rest_route('sakwood/v1', '/dealer/applications/(?P<id>\d+)/reject', array(
            'methods' => 'POST',
            'callback' => array($this, 'reject_application'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Update dealer tier (admin)
        register_rest_route('sakwood/v1', '/dealer/(?P<user_id>\d+)/tier', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_dealer_tier'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Get all active dealers (admin)
        register_rest_route('sakwood/v1', '/dealer/active', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_active_dealers'),
            'permission_callback' => array($this, 'check_admin_permission'),
        ));

        // Get all dealer tiers (admin/public)
        register_rest_route('sakwood/v1', '/dealer/tiers', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_dealer_tiers'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Check if user is logged in
     */
    public function check_wholesale_permission() {
        if (!is_user_logged_in()) {
            return new WP_Error('not_logged_in', 'Authentication required', array('status' => 401));
        }

        $user_id = get_current_user_id();
        $wholesale_status = get_user_meta($user_id, 'wholesale_status', true);

        if ($wholesale_status !== 'active') {
            return new WP_Error('not_wholesale', 'Must be active wholesale customer', array('status' => 403));
        }

        // Check if already a dealer
        $dealer_status = get_user_meta($user_id, 'dealer_status', true);
        if ($dealer_status === 'active') {
            return new WP_Error('already_dealer', 'Already a dealer', array('status' => 403));
        }

        return true;
    }

    /**
     * Check dealer permission
     */
    public function check_dealer_permission() {
        if (!is_user_logged_in()) {
            return new WP_Error('not_logged_in', 'Authentication required', array('status' => 401));
        }

        $user_id = get_current_user_id();
        $dealer_status = get_user_meta($user_id, 'dealer_status', true);

        if ($dealer_status !== 'active') {
            return new WP_Error('not_dealer', 'Must be active dealer', array('status' => 403));
        }

        return true;
    }

    /**
     * Check admin permission
     */
    public function check_admin_permission() {
        if (!current_user_can('manage_options') && !current_user_can('wholesale_manager')) {
            return new WP_Error('not_authorized', 'Admin access required', array('status' => 403));
        }
        return true;
    }

    /**
     * Submit dealer application
     */
    public function submit_dealer_application($request) {
        $user_id = get_current_user_id();
        $params = $request->get_json_params();

        // Validate required fields
        $required_fields = array('requestedTier', 'storageFacility', 'deliveryVehicles', 'salesCapacity', 'dealerExperience', 'requestedTerritories');
        foreach ($required_fields as $field) {
            if (empty($params[$field])) {
                return new WP_Error('missing_field', "Missing required field: $field", array('status' => 400));
            }
        }

        // Validate requested tier
        global $wpdb;
        $table_tiers = $wpdb->prefix . 'sakwood_dealer_tiers';
        $tier = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_tiers WHERE id = %d",
            intval($params['requestedTier'])
        ));

        if (!$tier) {
            return new WP_Error('invalid_tier', 'Invalid dealer tier', array('status' => 400));
        }

        // Get wholesale info
        $wholesale_status = get_user_meta($user_id, 'wholesale_status', true);
        $wholesale_data = get_user_meta($user_id, 'wholesale_data', true);

        // Generate application ID
        $application_id = 'DLR-' . strtoupper(uniqid());

        // Insert application
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';

        // Sanitize all inputs
        $business_registration = isset($params['businessRegistration']) ? sanitize_text_field($params['businessRegistration']) : '';
        $storage_facility = sanitize_textarea_field($params['storageFacility']);
        $delivery_vehicles = sanitize_textarea_field($params['deliveryVehicles']);
        $dealer_experience = sanitize_textarea_field($params['dealerExperience']);

        // Parse sales capacity (handles "10k", "500k", "1m" formats)
        $sales_capacity = $this->parse_sales_capacity($params['salesCapacity']);

        // Sanitize territories array
        $requested_territories = isset($params['requestedTerritories']) && is_array($params['requestedTerritories'])
            ? array_map('sanitize_text_field', $params['requestedTerritories'])
            : array();

        // Sanitize trade references if provided
        $trade_references = '';
        if (isset($params['tradeReferences']) && is_array($params['tradeReferences'])) {
            $sanitized_trade_refs = array_map(function($ref) {
                return array(
                    'company' => sanitize_text_field($ref['company']),
                    'contact' => sanitize_text_field($ref['contact']),
                    'relationship' => sanitize_text_field($ref['relationship'])
                );
            }, $params['tradeReferences']);
            $trade_references = json_encode($sanitized_trade_refs);
        }

        // Sanitize business references if provided
        $business_references = '';
        if (isset($params['businessReferences']) && is_array($params['businessReferences'])) {
            $sanitized_bus_refs = array_map(function($ref) {
                return array(
                    'company' => sanitize_text_field($ref['company']),
                    'contact' => sanitize_text_field($ref['contact']),
                    'accountValue' => sanitize_text_field($ref['accountValue'])
                );
            }, $params['businessReferences']);
            $business_references = json_encode($sanitized_bus_refs);
        }

        $result = $wpdb->insert(
            $table_applications,
            array(
                'user_id' => $user_id,
                'application_id' => $application_id,
                'current_wholesale_status' => $wholesale_status,
                'requested_tier_id' => $tier->id,
                'business_registration' => $business_registration,
                'storage_facility' => $storage_facility,
                'delivery_vehicles' => $delivery_vehicles,
                'sales_capacity' => $sales_capacity,
                'dealer_experience' => $dealer_experience,
                'requested_territories' => json_encode($requested_territories),
                'trade_references' => $trade_references,
                'business_references' => $business_references,
                'status' => 'pending',
                'submitted_date' => current_time('mysql')
            ),
            array('%d', '%s', '%s', '%d', '%s', '%s', '%s', '%f', '%s', '%s', '%s', '%s', '%s', '%s')
        );

        if ($result === false) {
            return new WP_Error('db_error', 'Failed to save application', array('status' => 500));
        }

        // Send notification email to admin
        $this->send_admin_notification($user_id, $application_id, $tier);

        return rest_ensure_response(array(
            'success' => true,
            'applicationId' => $application_id,
            'message' => 'Application submitted successfully'
        ));
    }

    /**
     * Get application status
     */
    public function get_application_status($request) {
        $application_id = sanitize_text_field($request['application_id']);

        $application = Sakwood_Dealer_Database::get_dealer_application($application_id);

        if (!$application) {
            return new WP_Error('not_found', 'Application not found', array('status' => 404));
        }

        // Get tier info
        $tier = Sakwood_Dealer_Database::get_dealer_tier($application['requested_tier_id']);

        // Get user info
        $user = get_userdata($application['user_id']);

        return rest_ensure_response(array(
            'applicationId' => $application['application_id'],
            'status' => $application['status'],
            'requestedTier' => $tier ? $tier['tier_name'] : '',
            'businessName' => get_user_meta($application['user_id'], 'wholesale_company', true),
            'submittedDate' => $application['submitted_date'],
            'reviewedDate' => $application['reviewed_date'],
            'adminNotes' => $application['admin_notes'],
            'assignedTerritories' => $application['assigned_territories'] ? json_decode($application['assigned_territories'], true) : array()
        ));
    }

    /**
     * Get current user's dealer info
     */
    public function get_dealer_info($request) {
        $user_id = get_current_user_id();

        $dealer_tier_id = get_user_meta($user_id, 'dealer_tier_id', true);
        $dealer_status = get_user_meta($user_id, 'dealer_status', true);

        if (!$dealer_tier_id || $dealer_status !== 'active') {
            return new WP_Error('not_dealer', 'User is not a dealer', array('status' => 403));
        }

        $tier = Sakwood_Dealer_Database::get_dealer_tier($dealer_tier_id);
        $territories = Sakwood_Dealer_Database::get_dealer_territories($user_id);

        return rest_ensure_response(array(
            'tierId' => $dealer_tier_id,
            'tierName' => $tier['tier_name'],
            'discountPercentage' => floatval($tier['discount_percentage']),
            'minOrderAmount' => floatval($tier['min_order_amount']),
            'minOrderQuantity' => intval($tier['min_order_quantity']),
            'territories' => $territories,
            'status' => $dealer_status
        ));
    }

    /**
     * Get dealer pricing for products
     */
    public function get_dealer_pricing($request) {
        $user_id = get_current_user_id();
        $dealer_tier_id = get_user_meta($user_id, 'dealer_tier_id', true);

        if (!$dealer_tier_id) {
            return new WP_Error('not_dealer', 'User is not a dealer', array('status' => 403));
        }

        $tier = Sakwood_Dealer_Database::get_dealer_tier($dealer_tier_id);
        $product_ids = $request->get_param('product_ids');

        if (!$product_ids) {
            return new WP_Error('missing_param', 'product_ids parameter required', array('status' => 400));
        }

        $pricing_data = array();
        foreach ($product_ids as $product_id) {
            $product = wc_get_product(intval($product_id));
            if ($product) {
                $retail_price = floatval($product->get_price());
                $discount_multiplier = 1 - ($tier['discount_percentage'] / 100);
                $dealer_price = $retail_price * $discount_multiplier;

                $pricing_data[] = array(
                    'productId' => intval($product_id),
                    'retailPrice' => $retail_price,
                    'dealerPrice' => round($dealer_price, 2),
                    'discountPercentage' => floatval($tier['discount_percentage']),
                    'tier' => $tier['tier_name']
                );
            }
        }

        return rest_ensure_response($pricing_data);
    }

    /**
     * Get dealer territories
     */
    public function get_dealer_territories($request) {
        $user_id = get_current_user_id();
        $territories = Sakwood_Dealer_Database::get_dealer_territories($user_id);

        return rest_ensure_response($territories);
    }

    /**
     * Get dealer order history
     */
    public function get_dealer_orders($request) {
        $user_id = get_current_user_id();
        $limit = intval($request->get_param('limit')) ?: 20;

        $orders = Sakwood_Dealer_Database::get_dealer_orders($user_id, $limit);

        return rest_ensure_response($orders);
    }

    /**
     * Get all dealer applications (admin)
     */
    public function get_all_applications($request) {
        global $wpdb;
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';

        $status = $request->get_param('status');
        $tier = $request->get_param('tier');
        $page = intval($request->get_param('page')) ?: 1;
        $per_page = 20;
        $offset = ($page - 1) * $per_page;

        $where = array('1=1');
        $params = array();

        if ($status) {
            $where[] = 'status = %s';
            $params[] = $status;
        }

        if ($tier) {
            $where[] = 'requested_tier_id = %d';
            $params[] = intval($tier);
        }

        $where_clause = implode(' AND ', $where);

        // Get total count
        $total = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $table_applications WHERE $where_clause",
            ...$params
        ));

        // Get applications
        // Merge params with LIMIT and OFFSET values
        $query_params = array_merge($params, array($per_page, $offset));
        $applications = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_applications WHERE $where_clause ORDER BY submitted_date DESC LIMIT %d OFFSET %d",
            ...$query_params
        ), ARRAY_A);

        // Enrich with user and tier data
        foreach ($applications as &$app) {
            $user = get_userdata($app['user_id']);
            $app['user_email'] = $user ? $user->user_email : '';
            $app['user_login'] = $user ? $user->user_login : '';
            $app['company_name'] = get_user_meta($app['user_id'], 'wholesale_company', true);

            $tier = Sakwood_Dealer_Database::get_dealer_tier($app['requested_tier_id']);
            $app['tier_name'] = $tier ? $tier['tier_name'] : '';
        }

        return rest_ensure_response(array(
            'applications' => $applications,
            'total' => intval($total),
            'pages' => ceil($total / $per_page),
            'currentPage' => $page
        ));
    }

    /**
     * Get application details (admin)
     */
    public function get_application_details($request) {
        $id = intval($request['id']);

        global $wpdb;
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';

        $application = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_applications WHERE id = %d",
            $id
        ), ARRAY_A);

        if (!$application) {
            return new WP_Error('not_found', 'Application not found', array('status' => 404));
        }

        // Enrich with user data
        $user = get_userdata($application['user_id']);
        $application['user_email'] = $user->user_email;
        $application['user_login'] = $user->user_login;
        $application['wholesale_company'] = get_user_meta($application['user_id'], 'wholesale_company', true);
        $application['wholesale_tax_id'] = get_user_meta($application['user_id'], 'wholesale_tax_id', true);
        $application['wholesale_address'] = get_user_meta($application['user_id'], 'wholesale_address', true);

        // Get tier info
        $tier = Sakwood_Dealer_Database::get_dealer_tier($application['requested_tier_id']);
        $application['tier_info'] = $tier;

        // Get wholesale order history
        $application['wholesale_orders'] = wc_get_orders(array(
            'customer_id' => $application['user_id'],
            'limit' => 10
        ));

        return rest_ensure_response($application);
    }

    /**
     * Parse sales capacity string to numeric value (handles "10k", "500k", "1m" formats)
     */
    private function parse_sales_capacity($capacity) {
        if (is_numeric($capacity)) {
            return floatval($capacity);
        }

        $lower = strtolower(trim($capacity));
        if (strpos($lower, 'k') !== false) {
            return floatval(str_replace('k', '', $lower)) * 1000;
        } else if (strpos($lower, 'm') !== false) {
            return floatval(str_replace('m', '', $lower)) * 1000000;
        }
        return floatval($capacity);
    }

    /**
     * Approve dealer application (admin)
     */
    public function approve_application($request) {
        $id = intval($request['id']);
        $params = $request->get_json_params();

        global $wpdb;
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';

        $application = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_applications WHERE id = %d",
            $id
        ), ARRAY_A);

        if (!$application) {
            return new WP_Error('not_found', 'Application not found', array('status' => 404));
        }

        $tier_id = isset($params['tierId']) ? intval($params['tierId']) : $application['requested_tier_id'];
        $territories = isset($params['territories']) ? $params['territories'] : array();
        $notes = isset($params['notes']) ? sanitize_textarea_field($params['notes']) : '';

        // Get tier info to calculate default credit limit
        $tier = Sakwood_Dealer_Database::get_dealer_tier($tier_id);
        $base_credit_limit = 100000; // Default base credit limit of 100,000 THB

        // Calculate credit limit based on tier multiplier if not explicitly provided
        if (isset($params['creditLimit'])) {
            $credit_limit = floatval($params['creditLimit']);
        } else {
            $credit_multiplier = isset($tier['credit_multiplier']) ? floatval($tier['credit_multiplier']) : 1.5;
            $credit_limit = $base_credit_limit * $credit_multiplier;
        }

        // Update application
        $wpdb->update(
            $table_applications,
            array(
                'status' => 'approved',
                'assigned_territories' => json_encode($territories),
                'admin_notes' => $notes,
                'reviewed_date' => current_time('mysql')
            ),
            array('id' => $id)
        );

        // Update user meta
        $user_id = $application['user_id'];
        update_user_meta($user_id, 'dealer_tier_id', $tier_id);
        update_user_meta($user_id, 'dealer_status', 'active');
        update_user_meta($user_id, 'dealer_territories', json_encode($territories));
        update_user_meta($user_id, 'dealer_assigned_date', current_time('mysql'));
        update_user_meta($user_id, 'dealer_credit_limit', $credit_limit);

        // Update user role
        $tier = Sakwood_Dealer_Database::get_dealer_tier($tier_id);
        $user = new WP_User($user_id);
        $user->set_role('dealer_' . $tier['tier_name']);

        // Assign territories
        if (!empty($territories)) {
            $table_territories = $wpdb->prefix . 'sakwood_dealer_territories';
            foreach ($territories as $province) {
                $wpdb->insert(
                    $table_territories,
                    array(
                        'dealer_id' => $user_id,
                        'user_id' => $user_id,
                        'province' => $province,
                        'is_exclusive' => false
                    )
                );
            }
        }

        // Send approval email
        $this->send_approval_email($user_id, $application['application_id'], $tier, $territories);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Application approved successfully'
        ));
    }

    /**
     * Reject dealer application (admin)
     */
    public function reject_application($request) {
        $id = intval($request['id']);
        $params = $request->get_json_params();
        $reason = isset($params['reason']) ? sanitize_textarea_field($params['reason']) : 'Not specified';

        global $wpdb;
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';

        $application = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_applications WHERE id = %d",
            $id
        ), ARRAY_A);

        if (!$application) {
            return new WP_Error('not_found', 'Application not found', array('status' => 404));
        }

        // Update application
        $wpdb->update(
            $table_applications,
            array(
                'status' => 'rejected',
                'admin_notes' => $reason,
                'reviewed_date' => current_time('mysql')
            ),
            array('id' => $id)
        );

        // Send rejection email
        $this->send_rejection_email($application['user_id'], $reason);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Application rejected'
        ));
    }

    /**
     * Update dealer tier (admin)
     */
    public function update_dealer_tier($request) {
        $user_id = intval($request['user_id']);
        $params = $request->get_json_params();

        $tier_id = intval($params['tierId']);

        // Verify tier exists
        $tier = Sakwood_Dealer_Database::get_dealer_tier($tier_id);
        if (!$tier) {
            return new WP_Error('invalid_tier', 'Invalid tier', array('status' => 400));
        }

        // Update user meta
        update_user_meta($user_id, 'dealer_tier_id', $tier_id);

        // Update user role
        $user = new WP_User($user_id);
        $user->set_role('dealer_' . $tier['tier_name']);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Dealer tier updated'
        ));
    }

    /**
     * Get all active dealers (admin)
     */
    public function get_active_dealers($request) {
        global $wpdb;
        $usermeta_table = $wpdb->usermeta;

        $dealers = $wpdb->get_results($wpdb->prepare(
            "SELECT user_id, meta_value as dealer_info
            FROM $usermeta_table
            WHERE meta_key = 'dealer_status'
            AND meta_value = 'active'"
        ), ARRAY_A);

        $dealer_data = array();
        foreach ($dealers as $dealer) {
            $user = get_userdata($dealer['user_id']);
            $tier_id = get_user_meta($dealer['user_id'], 'dealer_tier_id', true);
            $tier = Sakwood_Dealer_Database::get_dealer_tier($tier_id);
            $territories = Sakwood_Dealer_Database::get_dealer_territories($dealer['user_id']);

            $dealer_data[] = array(
                'userId' => $dealer['user_id'],
                'email' => $user->user_email,
                'login' => $user->user_login,
                'company' => get_user_meta($dealer['user_id'], 'wholesale_company', true),
                'tierId' => $tier_id,
                'tierName' => $tier ? $tier['tier_name'] : '',
                'territories' => $territories
            );
        }

        return rest_ensure_response($dealer_data);
    }

    /**
     * Get all dealer tiers
     */
    public function get_dealer_tiers($request) {
        $tiers = Sakwood_Dealer_Database::get_all_dealer_tiers();

        return rest_ensure_response($tiers);
    }

    /**
     * Send admin notification email
     */
    private function send_admin_notification($user_id, $application_id, $tier) {
        $user = get_userdata($user_id);
        $admin_email = get_option('admin_email');
        $company_name = get_user_meta($user_id, 'wholesale_company', true);

        $subject = 'New Dealer Application: ' . $company_name;
        $message = "A new dealer application has been submitted.\n\n";
        $message .= "Application ID: $application_id\n";
        $message .= "Company: $company_name\n";
        $message .= "Email: " . $user->user_email . "\n";
        $message .= "Requested Tier: " . $tier->tier_name . "\n\n";
        $message .= "Review the application in WordPress admin.";

        wp_mail($admin_email, $subject, $message);
    }

    /**
     * Send approval email
     */
    private function send_approval_email($user_id, $application_id, $tier, $territories) {
        $user = get_userdata($user_id);
        $user_email = $user->user_email;

        $subject = 'Congratulations! Your Dealer Application Has Been Approved';
        $message = "Dear " . $user->user_login . ",\n\n";
        $message .= "Congratulations! Your dealer application ($application_id) has been approved.\n\n";
        $message .= "Your Dealer Tier: " . strtoupper($tier['tier_name']) . "\n";
        $message .= "Discount: " . $tier['discount_percentage'] . "%\n";
        $message .= "Minimum Order: " . number_format($tier['min_order_amount']) . " THB\n\n";

        if (!empty($territories)) {
            $message .= "Assigned Territories: " . implode(', ', $territories) . "\n\n";
        }

        $message .= "You can now access dealer pricing and benefits.\n\n";
        $message .= "Thank you for being a valued partner!";

        wp_mail($user_email, $subject, $message);
    }

    /**
     * Send rejection email
     */
    private function send_rejection_email($user_id, $reason) {
        $user = get_userdata($user_id);
        $user_email = $user->user_email;

        $subject = 'Your Dealer Application Status';
        $message = "Dear " . $user->user_login . ",\n\n";
        $message .= "Thank you for your interest in becoming a dealer.\n\n";
        $message .= "After careful review, we are unable to approve your application at this time.\n\n";
        $message .= "Reason: " . $reason . "\n\n";
        $message .= "You may reapply after 90 days.\n\n";
        $message .= "We appreciate your understanding.";

        wp_mail($user_email, $subject, $message);
    }
}

// Initialize the Dealer API
new Sakwood_Dealer_API();
