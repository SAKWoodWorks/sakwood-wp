<?php
/**
 * Customer Segmentation REST API
 * 
 * REST API endpoints for managing customer segments
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Segments_API {

    /**
     * Namespace
     */
    const NAMESPACE = 'sakwood/v1';

    /**
     * Initialize API
     */
    public static function init() {
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public static function register_routes() {
        // List all segments
        register_rest_route(self::NAMESPACE, '/segments', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_segments'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'type' => array(
                        'description' => 'Filter by segment type',
                        'type' => 'string',
                        'enum' => array('all', 'manual', 'dynamic'),
                        'default' => 'all',
                    ),
                    'status' => array(
                        'description' => 'Filter by status',
                        'type' => 'string',
                        'enum' => array('all', 'active', 'inactive'),
                        'default' => 'active',
                    ),
                    'per_page' => array(
                        'description' => 'Number of results per page',
                        'type' => 'integer',
                        'default' => 20,
                    ),
                    'page' => array(
                        'description' => 'Page number',
                        'type' => 'integer',
                        'default' => 1,
                    ),
                ),
            ),
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array(__CLASS__, 'create_segment'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => self::get_segment_args(),
            ),
        ));

        // Get single segment
        register_rest_route(self::NAMESPACE, '/segments/(?P<id>\d+)', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_segment'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Segment ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                ),
            ),
            array(
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => array(__CLASS__, 'update_segment'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => self::get_segment_args(false),
            ),
            array(
                'methods' => WP_REST_Server::DELETABLE,
                'callback' => array(__CLASS__, 'delete_segment'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Segment ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                ),
            ),
        ));

        // Get segment members
        register_rest_route(self::NAMESPACE, '/segments/(?P<id>\d+)/members', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_segment_members'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Segment ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                    'per_page' => array(
                        'description' => 'Number of results per page',
                        'type' => 'integer',
                        'default' => 50,
                    ),
                    'page' => array(
                        'description' => 'Page number',
                        'type' => 'integer',
                        'default' => 1,
                    ),
                ),
            ),
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array(__CLASS__, 'add_segment_member'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Segment ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                    'customer_id' => array(
                        'description' => 'Customer ID to add',
                        'type' => 'integer',
                        'required' => true,
                    ),
                ),
            ),
        ));

        // Remove member from segment
        register_rest_route(self::NAMESPACE, '/segments/(?P<id>\d+)/members/(?P<customer_id>\d+)', array(
            array(
                'methods' => WP_REST_Server::DELETABLE,
                'callback' => array(__CLASS__, 'remove_segment_member'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Segment ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                    'customer_id' => array(
                        'description' => 'Customer ID to remove',
                        'type' => 'integer',
                        'required' => true,
                    ),
                ),
            ),
        ));

        // Evaluate segment rules
        register_rest_route(self::NAMESPACE, '/segments/(?P<id>\d+)/evaluate', array(
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array(__CLASS__, 'evaluate_segment'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Segment ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                ),
            ),
        ));

        // Get customer's segments
        register_rest_route(self::NAMESPACE, '/customers/(?P<id>\d+)/segments', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_customer_segments'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Customer ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                ),
            ),
        ));

        // Get activity log
        register_rest_route(self::NAMESPACE, '/segments/activity', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_activity_log'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'segment_id' => array(
                        'description' => 'Filter by segment ID',
                        'type' => 'integer',
                    ),
                    'customer_id' => array(
                        'description' => 'Filter by customer ID',
                        'type' => 'integer',
                    ),
                    'per_page' => array(
                        'description' => 'Number of results per page',
                        'type' => 'integer',
                        'default' => 50,
                    ),
                    'page' => array(
                        'description' => 'Page number',
                        'type' => 'integer',
                        'default' => 1,
                    ),
                ),
            ),
        ));

        // Get segment analytics
        register_rest_route(self::NAMESPACE, '/segments/analytics/overview', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_analytics_overview'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        // Get segment-specific analytics
        register_rest_route(self::NAMESPACE, '/segments/(?P<id>\d+)/analytics', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_segment_analytics'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
                'args' => array(
                    'id' => array(
                        'description' => 'Segment ID',
                        'type' => 'integer',
                        'required' => true,
                    ),
                ),
            ),
        ));

        // Get available rule types
        register_rest_route(self::NAMESPACE, '/segments/rules', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array(__CLASS__, 'get_rule_types'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));
    }

    /**
     * Get segment arguments for REST API
     * 
     * @param bool $required Whether ID is required
     * @return array Arguments
     */
    private static function get_segment_args($required = true) {
        return array(
            'name' => array(
                'description' => 'Segment name',
                'type' => 'string',
                'required' => $required,
            ),
            'description' => array(
                'description' => 'Segment description',
                'type' => 'string',
            ),
            'type' => array(
                'description' => 'Segment type',
                'type' => 'string',
                'enum' => array('manual', 'dynamic'),
                'default' => 'dynamic',
            ),
            'rules' => array(
                'description' => 'Segmentation rules (for dynamic segments)',
                'type' => 'object',
            ),
            'color' => array(
                'description' => 'Color for UI display',
                'type' => 'string',
                'pattern' => '^#[0-9A-Fa-f]{6}$',
                'default' => '#3B82F6',
            ),
            'is_active' => array(
                'description' => 'Whether segment is active',
                'type' => 'boolean',
                'default' => true,
            ),
        );
    }

    /**
     * Get all segments
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_segments($request) {
        Sakwood_Segment_Database::init();

        $params = $request->get_params();
        
        $args = array(
            'type' => $params['type'],
            'status' => $params['status'],
            'limit' => $params['per_page'],
            'offset' => ($params['page'] - 1) * $params['per_page'],
        );

        $segments = Sakwood_Segment_Database::get_segments($args);

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $segments,
            'total' => count($segments),
        ), 200);
    }

    /**
     * Get single segment
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_segment($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');
        $segment = Sakwood_Segment_Database::get_segment($segment_id);

        if (!$segment) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'Segment not found',
            ), 404);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $segment,
        ), 200);
    }

    /**
     * Create segment
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function create_segment($request) {
        Sakwood_Segment_Database::init();

        $params = $request->get_json_params() ?? $request->get_params();

        $segment_id = Sakwood_Segment_Database::create_segment($params);

        if (is_wp_error($segment_id)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => $segment_id->get_error_message(),
            ), 400);
        }

        $segment = Sakwood_Segment_Database::get_segment($segment_id);

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Segment created successfully',
            'data' => $segment,
        ), 201);
    }

    /**
     * Update segment
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function update_segment($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');
        $params = $request->get_json_params() ?? $request->get_params();

        $result = Sakwood_Segment_Database::update_segment($segment_id, $params);

        if (is_wp_error($result)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => $result->get_error_message(),
            ), 400);
        }

        $segment = Sakwood_Segment_Database::get_segment($segment_id);

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Segment updated successfully',
            'data' => $segment,
        ), 200);
    }

    /**
     * Delete segment
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function delete_segment($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');
        $result = Sakwood_Segment_Database::delete_segment($segment_id);

        if (is_wp_error($result)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => $result->get_error_message(),
            ), 400);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Segment deleted successfully',
        ), 200);
    }

    /**
     * Get segment members
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_segment_members($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');
        $params = $request->get_params();

        $members = Sakwood_Segment_Database::get_members($segment_id, array(
            'limit' => $params['per_page'],
            'offset' => ($params['page'] - 1) * $params['per_page'],
        ));

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $members,
            'total' => count($members),
        ), 200);
    }

    /**
     * Add member to segment
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function add_segment_member($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');
        $customer_id = $request->get_param('customer_id');

        $result = Sakwood_Segment_Database::add_member($segment_id, $customer_id, 'manual');

        if (is_wp_error($result)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => $result->get_error_message(),
            ), 400);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Customer added to segment successfully',
        ), 200);
    }

    /**
     * Remove member from segment
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function remove_segment_member($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');
        $customer_id = $request->get_param('customer_id');

        $result = Sakwood_Segment_Database::remove_member($segment_id, $customer_id);

        if (is_wp_error($result)) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => $result->get_error_message(),
            ), 400);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Customer removed from segment successfully',
        ), 200);
    }

    /**
     * Evaluate segment rules
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function evaluate_segment($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');

        $result = Sakwood_Segment_Assignment::evaluate_and_assign($segment_id);

        if (!$result['success']) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => $result['message'],
            ), 400);
        }

        return new WP_REST_Response(array(
            'success' => true,
            'message' => $result['message'],
            'data' => $result,
        ), 200);
    }

    /**
     * Get customer's segments
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_customer_segments($request) {
        Sakwood_Segment_Database::init();

        $customer_id = $request->get_param('id');
        $segments = Sakwood_Segment_Database::get_customer_segments($customer_id);

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $segments,
        ), 200);
    }

    /**
     * Get activity log
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_activity_log($request) {
        Sakwood_Segment_Database::init();

        $params = $request->get_params();

        $log = Sakwood_Segment_Database::get_activity_log(array(
            'segment_id' => $params['segment_id'] ?? 0,
            'customer_id' => $params['customer_id'] ?? 0,
            'limit' => $params['per_page'],
            'offset' => ($params['page'] - 1) * $params['per_page'],
        ));

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $log,
            'total' => count($log),
        ), 200);
    }

    /**
     * Get analytics overview
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_analytics_overview($request) {
        Sakwood_Segment_Database::init();

        $segments = Sakwood_Segment_Database::get_segments(array(
            'status' => 'active',
            'limit' => 100,
        ));

        $total_customers = 0;
        $total_revenue = 0;
        $segment_stats = array();

        foreach ($segments as $segment) {
            $total_customers += $segment['customer_count'];
            $total_revenue += $segment['total_revenue'];
            
            $segment_stats[] = array(
                'id' => $segment['id'],
                'name' => $segment['name'],
                'type' => $segment['type'],
                'customer_count' => $segment['customer_count'],
                'total_revenue' => $segment['total_revenue'],
                'color' => $segment['color'],
            );
        }

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'total_segments' => count($segments),
                'total_customers_segmented' => $total_customers,
                'total_revenue_segmented' => $total_revenue,
                'segments' => $segment_stats,
            ),
        ), 200);
    }

    /**
     * Get segment-specific analytics
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_segment_analytics($request) {
        Sakwood_Segment_Database::init();

        $segment_id = $request->get_param('id');
        $segment = Sakwood_Segment_Database::get_segment($segment_id);

        if (!$segment) {
            return new WP_REST_Response(array(
                'success' => false,
                'message' => 'Segment not found',
            ), 404);
        }

        // Get detailed analytics
        global $wpdb;
        
        // Get average order value for segment
        $member_ids = wp_list_pluck(Sakwood_Segment_Database::get_members($segment_id, array('limit' => 10000)), 'customer_id');
        
        if (empty($member_ids)) {
            return new WP_REST_Response(array(
                'success' => true,
                'data' => array(
                    'segment' => $segment,
                    'metrics' => array(
                        'customer_count' => 0,
                        'total_revenue' => 0,
                        'avg_order_value' => 0,
                        'total_orders' => 0,
                    ),
                ),
            ), 200);
        }

        $member_ids_str = implode(',', array_map('intval', $member_ids));

        $total_orders = $wpdb->get_var("
            SELECT COUNT(*) 
            FROM {$wpdb->posts} p
            WHERE p.post_type = 'shop_order'
            AND p.post_status IN ('wc-completed', 'wc-processing')
            AND p.post_author IN ({$member_ids_str})
        ");

        $total_revenue = $wpdb->get_var("
            SELECT SUM(pm.meta_value) 
            FROM {$wpdb->posts} p
            INNER JOIN {$wpdb->postmeta} pm ON pm.post_id = p.ID
            WHERE p.post_type = 'shop_order'
            AND p.post_status IN ('wc-completed', 'wc-processing')
            AND p.post_author IN ({$member_ids_str})
            AND pm.meta_key = '_order_total'
        ");

        $avg_order_value = $total_orders > 0 ? ($total_revenue / $total_orders) : 0;

        return new WP_REST_Response(array(
            'success' => true,
            'data' => array(
                'segment' => $segment,
                'metrics' => array(
                    'customer_count' => $segment['customer_count'],
                    'total_revenue' => (float) $total_revenue,
                    'avg_order_value' => (float) $avg_order_value,
                    'total_orders' => (int) $total_orders,
                    'revenue_per_customer' => $segment['customer_count'] > 0 ? ($total_revenue / $segment['customer_count']) : 0,
                ),
            ),
        ), 200);
    }

    /**
     * Get available rule types
     * 
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response Response
     */
    public static function get_rule_types($request) {
        $rule_types = Sakwood_Segment_Rules_Engine::get_rule_types();

        return new WP_REST_Response(array(
            'success' => true,
            'data' => $rule_types,
        ), 200);
    }

    /**
     * Check admin permission
     * 
     * @return bool True if user has admin permission
     */
    public static function check_admin_permission() {
        return current_user_can('manage_woocommerce') || current_user_can('administrator');
    }
}
