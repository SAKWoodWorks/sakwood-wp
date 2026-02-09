<?php
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Dashboard_Activity_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('sakwood/v1', '/dashboard/activity', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_activity'),
            'permission_callback' => function() {
                return current_user_can('edit_posts');
            },
        ));
    }

    public function get_activity($request) {
        global $wpdb;

        $activities = array();

        // Get recent orders
        $recent_orders = wc_get_orders(array(
            'limit' => 5,
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        foreach ($recent_orders as $order) {
            $activities[] = array(
                'id' => 'order-' . $order->get_id(),
                'type' => 'order',
                'message' => sprintf(
                    'New order #%s from %s - %s',
                    $order->get_id(),
                    $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
                    $order->get_total()
                ),
                'time' => human_time_diff(strtotime($order->get_date_created()), current_time('timestamp')) . ' ago',
                'link' => $order->get_edit_order_url(),
            );
        }

        // Get recent wholesale applications
        $apps = Sakwood_Wholesale_Database::get_all_applications('', 5, 0);
        foreach ($apps as $app) {
            $activities[] = array(
                'id' => 'wholesale-' . $app->id,
                'type' => 'wholesale',
                'message' => sprintf(
                    'Wholesale application from %s',
                    $app->business_name
                ),
                'time' => human_time_diff(strtotime($app->created_at), current_time('timestamp')) . ' ago',
                'link' => admin_url('admin.php?page=sakwood-wholesale'),
            );
        }

        // Sort by time
        usort($activities, function($a, $b) {
            return strtotime($b['time']) - strtotime($a['time']);
        });

        return array_slice($activities, 0, 10);
    }
}

new Sakwood_Dashboard_Activity_API();
