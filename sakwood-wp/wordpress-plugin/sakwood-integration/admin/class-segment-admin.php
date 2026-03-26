<?php
/**
 * Customer Segmentation Admin Handler
 * 
 * Handles admin UI and functionality
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Segment_Admin {

    /**
     * Initialize admin hooks
     */
    public static function init() {
        // Add action buttons on segments list
        add_filter('plugin_action_links_' . plugin_basename(SAKWOOD_PLUGIN_DIR . '../sakwood-integration.php'), array(__CLASS__, 'add_action_links'));

        // Handle AJAX requests
        add_action('wp_ajax_sakwood_segment_evaluate', array(__CLASS__, 'ajax_evaluate_segment'));
        add_action('wp_ajax_sakwood_segment_export', array(__CLASS__, 'ajax_export_members'));
    }

    /**
     * Add action links to plugin page
     * 
     * @param array $links Existing action links
     * @return array Modified action links
     */
    public static function add_action_links($links) {
        $custom_links = array(
            '<a href="' . admin_url('admin.php?page=sakwood-segments') . '">' . __('Segments', 'sakwood-integration') . '</a>',
            '<a href="' . admin_url('admin.php?page=sakwood-segments-analytics') . '">' . __('Analytics', 'sakwood-integration') . '</a>',
        );

        return array_merge($custom_links, $links);
    }

    /**
     * AJAX: Evaluate segment rules
     */
    public static function ajax_evaluate_segment() {
        check_ajax_referer('sakwood-segment-nonce', 'nonce');

        if (!current_user_can('manage_woocommerce')) {
            wp_send_json_error(array('message' => __('Permission denied', 'sakwood-integration')));
        }

        $segment_id = isset($_POST['segment_id']) ? intval($_POST['segment_id']) : 0;

        if (!$segment_id) {
            wp_send_json_error(array('message' => __('Invalid segment ID', 'sakwood-integration')));
        }

        $result = Sakwood_Segment_Assignment::evaluate_and_assign($segment_id);

        if ($result['success']) {
            wp_send_json_success($result);
        } else {
            wp_send_json_error(array('message' => $result['message']));
        }
    }

    /**
     * AJAX: Export segment members
     */
    public static function ajax_export_members() {
        check_ajax_referer('sakwood-segment-nonce', 'nonce');

        if (!current_user_can('manage_woocommerce')) {
            wp_send_json_error(array('message' => __('Permission denied', 'sakwood-integration')));
        }

        $segment_id = isset($_GET['segment_id']) ? intval($_GET['segment_id']) : 0;

        if (!$segment_id) {
            wp_send_json_error(array('message' => __('Invalid segment ID', 'sakwood-integration')));
        }

        self::export_members_csv($segment_id);
    }

    /**
     * Export segment members to CSV
     * 
     * @param int $segment_id Segment ID
     */
    private static function export_members_csv($segment_id) {
        Sakwood_Segment_Database::init();
        
        $segment = Sakwood_Segment_Database::get_segment($segment_id);
        
        if (!$segment) {
            wp_die(__('Invalid segment', 'sakwood-integration'));
        }

        $members = Sakwood_Segment_Database::get_members($segment_id, array('limit' => 10000));

        // Set headers for CSV download
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . sanitize_file_name($segment['name'] . '-members.csv') . '"');

        $output = fopen('php://output', 'w');

        // Add BOM for UTF-8
        fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

        // Header row
        fputcsv($output, array(
            __('Customer ID', 'sakwood-integration'),
            __('Name', 'sakwood-integration'),
            __('Email', 'sakwood-integration'),
            __('Assigned Date', 'sakwood-integration'),
            __('Assigned By', 'sakwood-integration'),
            __('Total Spent', 'sakwood-integration'),
            __('Order Count', 'sakwood-integration'),
        ));

        // Data rows
        foreach ($members as $member) {
            $customer = get_userdata($member['customer_id']);
            
            if ($customer) {
                $total_spent = self::get_customer_total_spent($member['customer_id']);
                $order_count = self::get_customer_order_count($member['customer_id']);

                fputcsv($output, array(
                    $member['customer_id'],
                    $customer->display_name,
                    $customer->user_email,
                    $member['assigned_at'],
                    $member['assigned_by'],
                    number_format($total_spent, 2),
                    $order_count,
                ));
            }
        }

        fclose($output);
        exit;
    }

    /**
     * Get customer total spent
     * 
     * @param int $customer_id Customer ID
     * @return float Total spent
     */
    private static function get_customer_total_spent($customer_id) {
        global $wpdb;
        
        $total = $wpdb->get_var($wpdb->prepare(
            "SELECT SUM(pm.meta_value) 
             FROM {$wpdb->posts} p
             INNER JOIN {$wpdb->postmeta} pm ON pm.post_id = p.ID
             WHERE p.post_type = 'shop_order'
             AND p.post_status IN ('wc-completed', 'wc-processing')
             AND p.post_author = %d
             AND pm.meta_key = '_order_total'",
            $customer_id
        ));

        return (float) ($total ?? 0);
    }

    /**
     * Get customer order count
     * 
     * @param int $customer_id Customer ID
     * @return int Order count
     */
    private static function get_customer_order_count($customer_id) {
        global $wpdb;
        
        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) 
             FROM {$wpdb->posts} p
             WHERE p.post_type = 'shop_order'
             AND p.post_status IN ('wc-completed', 'wc-processing', 'wc-pending', 'wc-on-hold')
             AND p.post_author = %d",
            $customer_id
        ));

        return (int) $count;
    }
}
