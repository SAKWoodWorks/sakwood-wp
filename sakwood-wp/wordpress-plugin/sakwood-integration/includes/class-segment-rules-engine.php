<?php
/**
 * Customer Segmentation Rules Engine
 * 
 * Evaluates customer data against segmentation rules
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Segment_Rules_Engine {

    /**
     * Available rule types
     */
    private static $rule_types = array(
        'purchase' => array(
            'label' => 'Purchase History',
            'rules' => array(
                'total_spent' => 'Total Spent',
                'order_count' => 'Number of Orders',
                'avg_order_value' => 'Average Order Value',
                'last_purchase_date' => 'Last Purchase Date',
                'first_purchase_date' => 'First Purchase Date',
                'products_purchased' => 'Products Purchased',
                'categories_purchased' => 'Categories Purchased',
            ),
        ),
        'demographic' => array(
            'label' => 'Demographics',
            'rules' => array(
                'location' => 'Location (Province)',
                'user_role' => 'User Role',
                'registration_date' => 'Registration Date',
            ),
        ),
        'engagement' => array(
            'label' => 'Engagement',
            'rules' => array(
                'last_login' => 'Last Login',
                'newsletter_subscribed' => 'Newsletter Subscription',
                'account_age' => 'Account Age',
            ),
        ),
    );

    /**
     * Get available rule types
     * 
     * @return array Rule types configuration
     */
    public static function get_rule_types() {
        return self::$rule_types;
    }

    /**
     * Evaluate rules against a single customer
     * 
     * @param int $customer_id Customer ID
     * @param array $rules Segmentation rules
     * @return bool True if customer matches all rules
     */
    public static function evaluate_customer($customer_id, $rules) {
        if (empty($rules) || !is_array($rules)) {
            return false;
        }

        $customer = get_userdata($customer_id);
        if (!$customer) {
            return false;
        }

        // Check each rule group (AND logic between groups)
        foreach ($rules as $rule_group) {
            if (!self::evaluate_rule_group($customer_id, $customer, $rule_group)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Evaluate a rule group
     * 
     * @param int $customer_id Customer ID
     * @param WP_User $customer Customer object
     * @param array $rule_group Rule group with match type and rules
     * @return bool True if customer matches this group
     */
    private static function evaluate_rule_group($customer_id, $customer, $rule_group) {
        if (empty($rule_group['rules']) || !is_array($rule_group['rules'])) {
            return true;
        }

        $match_type = isset($rule_group['match']) ? $rule_group['match'] : 'all';
        $results = array();

        // Evaluate each rule in the group
        foreach ($rule_group['rules'] as $rule) {
            $results[] = self::evaluate_single_rule($customer_id, $customer, $rule);
        }

        // Apply match logic
        if ($match_type === 'any') {
            return in_array(true, $results, true);
        } else {
            // Default: match all
            return !in_array(false, $results, true);
        }
    }

    /**
     * Evaluate a single rule
     * 
     * @param int $customer_id Customer ID
     * @param WP_User $customer Customer object
     * @param array $rule Rule definition
     * @return bool True if customer matches this rule
     */
    private static function evaluate_single_rule($customer_id, $customer, $rule) {
        $rule_type = isset($rule['type']) ? $rule['type'] : '';
        $operator = isset($rule['operator']) ? $rule['operator'] : '=';
        $value = isset($rule['value']) ? $rule['value'] : null;

        switch ($rule_type) {
            // Purchase Rules
            case 'total_spent':
                return self::evaluate_total_spent($customer_id, $operator, $value);

            case 'order_count':
                return self::evaluate_order_count($customer_id, $operator, $value);

            case 'avg_order_value':
                return self::evaluate_avg_order_value($customer_id, $operator, $value);

            case 'last_purchase_date':
                return self::evaluate_last_purchase_date($customer_id, $operator, $value);

            case 'first_purchase_date':
                return self::evaluate_first_purchase_date($customer_id, $operator, $value);

            case 'products_purchased':
                return self::evaluate_products_purchased($customer_id, $operator, $value);

            case 'categories_purchased':
                return self::evaluate_categories_purchased($customer_id, $operator, $value);

            // Demographic Rules
            case 'location':
                return self::evaluate_location($customer_id, $operator, $value);

            case 'user_role':
                return self::evaluate_user_role($customer, $operator, $value);

            case 'registration_date':
                return self::evaluate_registration_date($customer, $operator, $value);

            // Engagement Rules
            case 'last_login':
                return self::evaluate_last_login($customer_id, $operator, $value);

            case 'newsletter_subscribed':
                return self::evaluate_newsletter_subscription($customer_id, $operator, $value);

            case 'account_age':
                return self::evaluate_account_age($customer, $operator, $value);

            default:
                return false;
        }
    }

    /**
     * Evaluate total spent rule
     */
    private static function evaluate_total_spent($customer_id, $operator, $value) {
        $total_spent = self::get_customer_total_spent($customer_id);
        return self::compare_values($total_spent, $operator, (float) $value);
    }

    /**
     * Evaluate order count rule
     */
    private static function evaluate_order_count($customer_id, $operator, $value) {
        $order_count = self::get_customer_order_count($customer_id);
        return self::compare_values($order_count, $operator, (int) $value);
    }

    /**
     * Evaluate average order value rule
     */
    private static function evaluate_avg_order_value($customer_id, $operator, $value) {
        $avg_value = self::get_customer_avg_order_value($customer_id);
        return self::compare_values($avg_value, $operator, (float) $value);
    }

    /**
     * Evaluate last purchase date rule
     */
    private static function evaluate_last_purchase_date($customer_id, $operator, $value) {
        $last_purchase = self::get_customer_last_purchase_date($customer_id);
        
        if (!$last_purchase) {
            return $operator === 'no_value';
        }

        $value_timestamp = strtotime($value);
        $last_purchase_timestamp = strtotime($last_purchase);

        switch ($operator) {
            case 'before':
                return $last_purchase_timestamp < $value_timestamp;
            case 'after':
                return $last_purchase_timestamp > $value_timestamp;
            case 'within':
                // Value is number of days
                $days_ago = time() - ((int) $value * DAY_IN_SECONDS);
                return $last_purchase_timestamp >= $days_ago;
            case 'not_within':
                $days_ago = time() - ((int) $value * DAY_IN_SECONDS);
                return $last_purchase_timestamp < $days_ago;
            default:
                return false;
        }
    }

    /**
     * Evaluate first purchase date rule
     */
    private static function evaluate_first_purchase_date($customer_id, $operator, $value) {
        $first_purchase = self::get_customer_first_purchase_date($customer_id);
        
        if (!$first_purchase) {
            return $operator === 'no_value';
        }

        $value_timestamp = strtotime($value);
        $first_purchase_timestamp = strtotime($first_purchase);

        switch ($operator) {
            case 'before':
                return $first_purchase_timestamp < $value_timestamp;
            case 'after':
                return $first_purchase_timestamp > $value_timestamp;
            default:
                return false;
        }
    }

    /**
     * Evaluate products purchased rule
     */
    private static function evaluate_products_purchased($customer_id, $operator, $value) {
        $products = self::get_customer_purchased_products($customer_id);
        
        if (empty($products)) {
            return false;
        }

        $value = is_array($value) ? $value : array($value);

        switch ($operator) {
            case 'in':
                // Customer purchased any of the specified products
                return !empty(array_intersect($products, $value));
            case 'not_in':
                // Customer hasn't purchased any of the specified products
                return empty(array_intersect($products, $value));
            case 'all':
                // Customer purchased all specified products
                return empty(array_diff($value, $products));
            default:
                return false;
        }
    }

    /**
     * Evaluate categories purchased rule
     */
    private static function evaluate_categories_purchased($customer_id, $operator, $value) {
        $categories = self::get_customer_purchased_categories($customer_id);
        
        if (empty($categories)) {
            return false;
        }

        $value = is_array($value) ? $value : array($value);

        switch ($operator) {
            case 'in':
                return !empty(array_intersect($categories, $value));
            case 'not_in':
                return empty(array_intersect($categories, $value));
            case 'all':
                return empty(array_diff($value, $categories));
            default:
                return false;
        }
    }

    /**
     * Evaluate location rule
     */
    private static function evaluate_location($customer_id, $operator, $value) {
        // Get customer's billing/shipping province from WooCommerce
        $billing_province = get_user_meta($customer_id, 'billing_province', true);
        $shipping_province = get_user_meta($customer_id, 'shipping_province', true);

        $customer_provinces = array_filter(array($billing_province, $shipping_province));
        
        if (empty($customer_provinces)) {
            return false;
        }

        $value = is_array($value) ? $value : array($value);

        switch ($operator) {
            case 'in':
                return !empty(array_intersect($customer_provinces, $value));
            case 'not_in':
                return empty(array_intersect($customer_provinces, $value));
            default:
                return false;
        }
    }

    /**
     * Evaluate user role rule
     */
    private static function evaluate_user_role($customer, $operator, $value) {
        $customer_role = reset($customer->roles);
        $value = is_array($value) ? $value : array($value);

        switch ($operator) {
            case '=':
                return in_array($customer_role, $value, true);
            case '!=':
                return !in_array($customer_role, $value, true);
            default:
                return false;
        }
    }

    /**
     * Evaluate registration date rule
     */
    private static function evaluate_registration_date($customer, $operator, $value) {
        $registration_date = $customer->user_registered;
        $value_timestamp = strtotime($value);
        $registration_timestamp = strtotime($registration_date);

        switch ($operator) {
            case 'before':
                return $registration_timestamp < $value_timestamp;
            case 'after':
                return $registration_timestamp > $value_timestamp;
            default:
                return false;
        }
    }

    /**
     * Evaluate last login rule
     */
    private static function evaluate_last_login($customer_id, $operator, $value) {
        $last_login = get_user_meta($customer_id, 'last_login', true);
        
        if (!$last_login) {
            return $operator === 'no_value';
        }

        $value_timestamp = strtotime($value);
        $last_login_timestamp = strtotime($last_login);

        switch ($operator) {
            case 'before':
                return $last_login_timestamp < $value_timestamp;
            case 'after':
                return $last_login_timestamp > $value_timestamp;
            case 'within':
                $days_ago = time() - ((int) $value * DAY_IN_SECONDS);
                return $last_login_timestamp >= $days_ago;
            case 'not_within':
                $days_ago = time() - ((int) $value * DAY_IN_SECONDS);
                return $last_login_timestamp < $days_ago;
            default:
                return false;
        }
    }

    /**
     * Evaluate newsletter subscription rule
     */
    private static function evaluate_newsletter_subscription($customer_id, $operator, $value) {
        $subscribed = get_user_meta($customer_id, 'newsletter_subscribed', true);
        $is_subscribed = $subscribed === 'yes' || $subscribed === '1' || $subscribed === 1;

        switch ($operator) {
            case '=':
                return $is_subscribed == $value;
            case '!=':
                return $is_subscribed != $value;
            default:
                return false;
        }
    }

    /**
     * Evaluate account age rule
     */
    private static function evaluate_account_age($customer, $operator, $value) {
        $registration_timestamp = strtotime($customer->user_registered);
        $current_timestamp = time();
        $age_in_days = ($current_timestamp - $registration_timestamp) / DAY_IN_SECONDS;

        return self::compare_values($age_in_days, $operator, (int) $value);
    }

    /**
     * Compare values using operator
     */
    private static function compare_values($actual, $operator, $expected) {
        switch ($operator) {
            case '=':
            case '==':
                return $actual == $expected;
            case '!=':
                return $actual != $expected;
            case '>':
            case 'gt':
                return $actual > $expected;
            case '>=':
            case 'gte':
                return $actual >= $expected;
            case '<':
            case 'lt':
                return $actual < $expected;
            case '<=':
            case 'lte':
                return $actual <= $expected;
            case 'contains':
                return is_string($actual) && strpos($actual, $expected) !== false;
            case 'not_contains':
                return is_string($actual) && strpos($actual, $expected) === false;
            default:
                return false;
        }
    }

    // Helper Methods for Customer Data

    /**
     * Get customer's total spent
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
     * Get customer's order count
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

    /**
     * Get customer's average order value
     */
    private static function get_customer_avg_order_value($customer_id) {
        $total_spent = self::get_customer_total_spent($customer_id);
        $order_count = self::get_customer_order_count($customer_id);

        if ($order_count === 0) {
            return 0;
        }

        return $total_spent / $order_count;
    }

    /**
     * Get customer's last purchase date
     */
    private static function get_customer_last_purchase_date($customer_id) {
        global $wpdb;
        
        $date = $wpdb->get_var($wpdb->prepare(
            "SELECT p.post_date 
             FROM {$wpdb->posts} p
             WHERE p.post_type = 'shop_order'
             AND p.post_status IN ('wc-completed', 'wc-processing')
             AND p.post_author = %d
             ORDER BY p.post_date DESC
             LIMIT 1",
            $customer_id
        ));

        return $date;
    }

    /**
     * Get customer's first purchase date
     */
    private static function get_customer_first_purchase_date($customer_id) {
        global $wpdb;
        
        $date = $wpdb->get_var($wpdb->prepare(
            "SELECT p.post_date 
             FROM {$wpdb->posts} p
             WHERE p.post_type = 'shop_order'
             AND p.post_status IN ('wc-completed', 'wc-processing')
             AND p.post_author = %d
             ORDER BY p.post_date ASC
             LIMIT 1",
            $customer_id
        ));

        return $date;
    }

    /**
     * Get customer's purchased product IDs
     */
    private static function get_customer_purchased_products($customer_id) {
        global $wpdb;
        
        $products = $wpdb->get_col($wpdb->prepare(
            "SELECT DISTINCT oi.meta_value 
             FROM {$wpdb->posts} p
             INNER JOIN {$wpdb->prefix}woocommerce_order_items oi 
                 ON oi.order_id = p.ID
             INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta oim 
                 ON oim.order_item_id = oi.order_item_id
             WHERE p.post_type = 'shop_order'
             AND p.post_status IN ('wc-completed', 'wc-processing')
             AND p.post_author = %d
             AND oi.order_item_type = 'line_item'
             AND oim.meta_key = '_product_id'",
            $customer_id
        ));

        return array_map('intval', $products);
    }

    /**
     * Get customer's purchased category IDs
     */
    private static function get_customer_purchased_categories($customer_id) {
        global $wpdb;
        
        $product_ids = self::get_customer_purchased_products($customer_id);
        
        if (empty($product_ids)) {
            return array();
        }

        $categories = $wpdb->get_col(sprintf(
            "SELECT DISTINCT tt.term_id 
             FROM {$wpdb->term_taxonomy} tt
             INNER JOIN {$wpdb->term_relationships} tr ON tr.term_taxonomy_id = tt.term_taxonomy_id
             WHERE tt.taxonomy = 'product_cat'
             AND tr.object_id IN (%s)",
            implode(',', array_map('intval', $product_ids))
        ));

        return array_map('intval', $categories);
    }

    /**
     * Get all customers matching rules
     * 
     * @param array $rules Segmentation rules
     * @return array List of matching customer IDs
     */
    public static function get_matching_customers($rules) {
        global $wpdb;
        
        // Get all customers (users with customer-like roles)
        $customer_roles = array('customer', 'wholesale_customer', 'dealer');
        
        $customers = get_users(array(
            'role__in' => $customer_roles,
            'fields' => 'ID',
        ));

        $matching_customers = array();

        foreach ($customers as $customer_id) {
            if (self::evaluate_customer($customer_id, $rules)) {
                $matching_customers[] = $customer_id;
            }
        }

        return $matching_customers;
    }
}
