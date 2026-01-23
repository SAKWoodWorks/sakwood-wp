<?php
/**
 * CRM Interactions REST API
 *
 * Customer-facing API for viewing their interaction history
 * Maps WordPress users to CRM customers via wp_user_id field
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Interactions_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get customer interactions
        register_rest_route('sakwood/v1', '/customer/crm/interactions', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_interactions'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
                'per_page' => array(
                    'default' => 20,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ),
                'type' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));

        // Get single interaction
        register_rest_route('sakwood/v1', '/customer/crm/interactions/(?P<id>[0-9]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_interaction'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
                'id' => array(
                    'required' => true,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // Get interaction summary
        register_rest_route('sakwood/v1', '/customer/crm/interactions-summary', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_interactions_summary'),
            'permission_callback' => '__return_true',
            'args' => array(
                'user_id' => array(
                    'required' => false,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));
    }

    /**
     * Get customer interactions with pagination
     */
    public function get_interactions($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();
        $per_page = intval($request['per_page']);
        $page = intval($request['page']);
        $type = isset($request['type']) ? sanitize_text_field($request['type']) : '';

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $table_interactions = $wpdb->prefix . 'sakwood_interactions';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Build query
        $offset = ($page - 1) * $per_page;

        $query = "SELECT * FROM $table_interactions WHERE customer_id = %d";
        $params = array($customer_id);

        // Filter by type
        if (!empty($type)) {
            $query .= " AND interaction_type = %s";
            $params[] = $type;
        }

        $query .= " ORDER BY created_at DESC LIMIT %d OFFSET %d";
        $params[] = $per_page;
        $params[] = $offset;

        $interactions = $wpdb->get_results($wpdb->prepare($query, ...$params), ARRAY_A);

        // Get total count
        $count_query = "SELECT COUNT(*) FROM $table_interactions WHERE customer_id = %d";
        $count_params = array($customer_id);

        if (!empty($type)) {
            $count_query .= " AND interaction_type = %s";
            $count_params[] = $type;
        }

        $total = (int) $wpdb->get_var($wpdb->prepare($count_query, ...$count_params));

        // Format interactions
        $formatted = array_map(function($interaction) {
            return array(
                'id' => (int) $interaction['id'],
                'type' => $interaction['interaction_type'],
                'subject' => $interaction['subject'],
                'message' => $interaction['message'],
                'direction' => $interaction['direction'],
                'duration' => $interaction['duration'] ? (int) $interaction['duration'] : null,
                'createdAt' => $interaction['created_at'],
            );
        }, $interactions);

        return rest_ensure_response(array(
            'interactions' => $formatted,
            'pagination' => array(
                'total' => $total,
                'perPage' => $per_page,
                'currentPage' => $page,
                'totalPages' => ceil($total / $per_page),
            ),
        ));
    }

    /**
     * Get single interaction
     */
    public function get_interaction($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();
        $interaction_id = intval($request['id']);

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $table_interactions = $wpdb->prefix . 'sakwood_interactions';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Get interaction
        $interaction = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_interactions WHERE id = %d AND customer_id = %d",
                $interaction_id,
                $customer_id
            ),
            ARRAY_A
        );

        if (!$interaction) {
            return new WP_Error('interaction_not_found', __('Interaction not found', 'sakwood'), array('status' => 404));
        }

        return rest_ensure_response(array(
            'id' => (int) $interaction['id'],
            'type' => $interaction['interaction_type'],
            'subject' => $interaction['subject'],
            'message' => $interaction['message'],
            'direction' => $interaction['direction'],
            'duration' => $interaction['duration'] ? (int) $interaction['duration'] : null,
            'createdBy' => $interaction['created_by'] ? (int) $interaction['created_by'] : null,
            'createdAt' => $interaction['created_at'],
        ));
    }

    /**
     * Get interactions summary
     */
    public function get_interactions_summary($request) {
        global $wpdb;

        $user_id = isset($request['user_id']) ? intval($request['user_id']) : get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', __('User not authenticated', 'sakwood'), array('status' => 401));
        }

        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $table_interactions = $wpdb->prefix . 'sakwood_interactions';

        // Get customer
        $customer = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id FROM $table_customers WHERE wp_user_id = %d",
                $user_id
            ),
            ARRAY_A
        );

        if (!$customer) {
            return new WP_Error('customer_not_found', __('Customer profile not found', 'sakwood'), array('status' => 404));
        }

        $customer_id = (int) $customer['id'];

        // Get counts by type
        $types = array('call', 'email', 'line', 'visit', 'note');
        $summary = array();

        foreach ($types as $type) {
            $count = (int) $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT COUNT(*) FROM $table_interactions WHERE customer_id = %d AND interaction_type = %s",
                    $customer_id,
                    $type
                )
            );
            $summary[$type] = $count;
        }

        // Get recent interactions (last 5)
        $recent = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT id, interaction_type, subject, created_at FROM $table_interactions WHERE customer_id = %d ORDER BY created_at DESC LIMIT 5",
                $customer_id
            ),
            ARRAY_A
        );

        $formatted_recent = array_map(function($interaction) {
            return array(
                'id' => (int) $interaction['id'],
                'type' => $interaction['interaction_type'],
                'subject' => $interaction['subject'],
                'createdAt' => $interaction['created_at'],
            );
        }, $recent);

        return rest_ensure_response(array(
            'summary' => $summary,
            'recent' => $formatted_recent,
        ));
    }
}

// Initialize
new Sakwood_CRM_Interactions_API();
