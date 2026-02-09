<?php
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Dashboard_Stats_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('sakwood/v1', '/dashboard/stats', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_stats'),
            'permission_callback' => function() {
                return current_user_can('edit_posts');
            },
        ));
    }

    public function get_stats($request) {
        global $wpdb;

        $customers_table = $wpdb->prefix . 'sakwood_customers';
        $tasks_table = $wpdb->prefix . 'sakwood_tasks';
        $interactions_table = $wpdb->prefix . 'sakwood_interactions';

        // Get order stats from WooCommerce
        $today_orders = wc_get_orders(array(
            'limit' => -1,
            'date_created' => date('Y-m-d'),
            'return' => 'ids',
        ));

        // Get task stats
        $pending_tasks = $wpdb->get_var(
            "SELECT COUNT(*) FROM $tasks_table WHERE status = 'pending'"
        );

        // Get customer stats
        $total_customers = $wpdb->get_var(
            "SELECT COUNT(*) FROM $customers_table"
        );

        return array(
            'orders' => array(
                'today' => count($today_orders),
                'pending' => count(wc_get_orders(array(
                    'status' => 'pending',
                    'return' => 'ids',
                    'limit' => -1,
                ))),
            ),
            'tasks' => array(
                'pending' => intval($pending_tasks),
            ),
            'customers' => array(
                'total' => intval($total_customers),
            ),
            'applications' => array(
                'pending' => Sakwood_Wholesale_Database::get_count_by_status('pending'),
            ),
        );
    }
}

new Sakwood_Dashboard_Stats_API();
