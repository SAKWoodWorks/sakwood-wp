<?php
/**
 * Customer Segmentation Assignment Handler
 * 
 * Handles automatic customer assignment to segments based on rules
 * and scheduled re-evaluation
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Segment_Assignment {

    /**
     * Initialize hooks
     */
    public static function init() {
        // Schedule daily evaluation
        add_action('sakwood_daily_segment_evaluation', array(__CLASS__, 'evaluate_all_dynamic_segments'));

        // Hook into WooCommerce order completion
        add_action('woocommerce_order_status_completed', array(__CLASS__, 'on_order_completed'), 10, 2);
        add_action('woocommerce_order_status_cancelled', array(__CLASS__, 'on_order_status_changed'), 10, 2);
        add_action('woocommerce_order_status_refunded', array(__CLASS__, 'on_order_status_changed'), 10, 2);

        // Hook into user registration
        add_action('user_register', array(__CLASS__, 'on_user_registered'));

        // Hook into user meta updates
        add_action('updated_user_meta', array(__CLASS__, 'on_user_meta_updated'), 10, 4);

        // Schedule cron job if not exists
        if (!wp_next_scheduled('sakwood_daily_segment_evaluation')) {
            wp_schedule_event(time(), 'daily', 'sakwood_daily_segment_evaluation');
        }
    }

    /**
     * Evaluate and assign customers to a specific segment
     * 
     * @param int $segment_id Segment ID
     * @return array Result with counts
     */
    public static function evaluate_and_assign($segment_id) {
        Sakwood_Segment_Database::init();
        
        $segment = Sakwood_Segment_Database::get_segment($segment_id);
        
        if (!$segment || $segment['type'] !== 'dynamic' || empty($segment['rules'])) {
            return array(
                'success' => false,
                'message' => 'Invalid segment or no rules defined',
                'added' => 0,
                'removed' => 0,
            );
        }

        // Get customers matching the rules
        $matching_customers = Sakwood_Segment_Rules_Engine::get_matching_customers($segment['rules']);

        // Get current members
        $current_members = Sakwood_Segment_Database::get_members($segment_id, array('limit' => 10000));
        $current_member_ids = wp_list_pluck($current_members, 'customer_id');

        // Find customers to add (in matching but not in current)
        $to_add = array_diff($matching_customers, $current_member_ids);

        // Find customers to remove (in current but not in matching)
        $to_remove = array_diff($current_member_ids, $matching_customers);

        $added_count = 0;
        $removed_count = 0;

        // Add new members
        foreach ($to_add as $customer_id) {
            $result = Sakwood_Segment_Database::add_member($segment_id, $customer_id, 'system');
            if (!is_wp_error($result)) {
                $added_count++;
            }
        }

        // Remove members who no longer match
        foreach ($to_remove as $customer_id) {
            $result = Sakwood_Segment_Database::remove_member($segment_id, $customer_id);
            if (!is_wp_error($result)) {
                $removed_count++;
            }
        }

        return array(
            'success' => true,
            'message' => sprintf('Added %d customers, removed %d customers', $added_count, $removed_count),
            'added' => $added_count,
            'removed' => $removed_count,
            'total_members' => count($matching_customers),
        );
    }

    /**
     * Evaluate all dynamic segments
     */
    public static function evaluate_all_dynamic_segments() {
        Sakwood_Segment_Database::init();
        
        $segments = Sakwood_Segment_Database::get_dynamic_segments();
        $results = array();

        foreach ($segments as $segment) {
            $result = self::evaluate_and_assign($segment['id']);
            $results[] = array(
                'segment_id' => $segment['id'],
                'segment_name' => $segment['name'],
                'result' => $result,
            );

            // Log to error log for monitoring
            error_log(sprintf(
                '[Sakwood Segments] Segment "%s" (ID: %d): %s',
                $segment['name'],
                $segment['id'],
                $result['message']
            ));
        }

        return $results;
    }

    /**
     * Triggered when an order is completed
     * 
     * @param int $order_id Order ID
     * @param WC_Order $order Order object
     */
    public static function on_order_completed($order_id, $order = null) {
        if (!$order) {
            $order = wc_get_order($order_id);
        }

        if (!$order) {
            return;
        }

        $customer_id = $order->get_customer_id();
        if (!$customer_id) {
            return;
        }

        // Re-evaluate dynamic segments for this customer
        self::reevaluate_customer_segments($customer_id);
    }

    /**
     * Triggered when an order status changes
     * 
     * @param int $order_id Order ID
     * @param WC_Order $order Order object
     */
    public static function on_order_status_changed($order_id, $order = null) {
        if (!$order) {
            $order = wc_get_order($order_id);
        }

        if (!$order) {
            return;
        }

        $customer_id = $order->get_customer_id();
        if (!$customer_id) {
            return;
        }

        // Re-evaluate dynamic segments for this customer
        self::reevaluate_customer_segments($customer_id);
    }

    /**
     * Triggered when a user registers
     * 
     * @param int $user_id User ID
     */
    public static function on_user_registered($user_id) {
        $user = get_userdata($user_id);
        
        // Only process customers
        if ($user && in_array($user->roles[0] ?? '', array('customer', 'wholesale_customer', 'dealer'))) {
            self::reevaluate_customer_segments($user_id);
        }
    }

    /**
     * Triggered when user meta is updated
     * 
     * @param int $meta_id Meta ID
     * @param int $object_id Object ID (user ID)
     * @param string $meta_key Meta key
     * @param mixed $_meta_value Meta value
     */
    public static function on_user_meta_updated($meta_id, $object_id, $meta_key, $_meta_value) {
        // Only re-evaluate if relevant meta changed
        $relevant_keys = array(
            'billing_province',
            'shipping_province',
            'newsletter_subscribed',
            'last_login',
        );

        if (in_array($meta_key, $relevant_keys)) {
            self::reevaluate_customer_segments($object_id);
        }
    }

    /**
     * Re-evaluate all dynamic segments for a specific customer
     * 
     * @param int $customer_id Customer ID
     */
    public static function reevaluate_customer_segments($customer_id) {
        Sakwood_Segment_Database::init();
        
        $dynamic_segments = Sakwood_Segment_Database::get_dynamic_segments();

        foreach ($dynamic_segments as $segment) {
            if (empty($segment['rules'])) {
                continue;
            }

            // Check if customer matches the rules
            $matches = Sakwood_Segment_Rules_Engine::evaluate_customer($customer_id, $segment['rules']);

            // Check current membership
            $current_members = Sakwood_Segment_Database::get_members($segment['id'], array(
                'limit' => 1,
                'status' => 'active',
            ));
            
            $is_member = false;
            foreach ($current_members as $member) {
                if ($member['customer_id'] == $customer_id) {
                    $is_member = true;
                    break;
                }
            }

            // Add or remove based on match
            if ($matches && !$is_member) {
                Sakwood_Segment_Database::add_member($segment['id'], $customer_id, 'system');
            } elseif (!$matches && $is_member) {
                Sakwood_Segment_Database::remove_member($segment['id'], $customer_id);
            }
        }
    }

    /**
     * Manually assign customer to segment
     * 
     * @param int $segment_id Segment ID
     * @param int $customer_id Customer ID
     * @return bool|WP_Error Result
     */
    public static function manual_assign($segment_id, $customer_id) {
        Sakwood_Segment_Database::init();
        
        $segment = Sakwood_Segment_Database::get_segment($segment_id);
        
        if (!$segment) {
            return new WP_Error('not_found', 'Segment not found');
        }

        // For dynamic segments, warn but allow manual override
        if ($segment['type'] === 'dynamic') {
            error_log(sprintf(
                '[Sakwood Segments] Manual assignment to dynamic segment "%s" (ID: %d). Customer may be auto-removed on next evaluation.',
                $segment['name'],
                $segment['id']
            ));
        }

        return Sakwood_Segment_Database::add_member($segment_id, $customer_id, 'manual');
    }

    /**
     * Manually remove customer from segment
     * 
     * @param int $segment_id Segment ID
     * @param int $customer_id Customer ID
     * @return bool|WP_Error Result
     */
    public static function manual_remove($segment_id, $customer_id) {
        Sakwood_Segment_Database::init();
        
        $segment = Sakwood_Segment_Database::get_segment($segment_id);
        
        if (!$segment) {
            return new WP_Error('not_found', 'Segment not found');
        }

        // For dynamic segments, prevent manual removal (should be handled by rules)
        if ($segment['type'] === 'dynamic') {
            return new WP_Error(
                'invalid_operation',
                'Cannot manually remove customer from dynamic segment. Update the segment rules instead.'
            );
        }

        return Sakwood_Segment_Database::remove_member($segment_id, $customer_id);
    }

    /**
     * Clear scheduled cron jobs
     */
    public static function clear_schedules() {
        $timestamp = wp_next_scheduled('sakwood_daily_segment_evaluation');
        if ($timestamp) {
            wp_unschedule_event($timestamp, 'sakwood_daily_segment_evaluation');
        }
    }

    /**
     * Deactivation hook
     */
    public static function deactivate() {
        self::clear_schedules();
    }
}
