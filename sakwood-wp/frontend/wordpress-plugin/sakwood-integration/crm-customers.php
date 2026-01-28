<?php
/**
 * CRM Customer Management
 *
 * Handles customer CRUD operations and syncing with WooCommerce
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Customer {

    /**
     * Get customer by ID
     */
    public static function get($customer_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE id = %d",
            $customer_id
        ));
    }

    /**
     * Get customer by email
     */
    public static function get_by_email($email) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE email = %s",
            $email
        ));
    }

    /**
     * Get or create customer from WooCommerce order
     */
    public static function get_or_create_from_order($order_id) {
        $order = wc_get_order($order_id);

        if (!$order) {
            return new WP_Error('invalid_order', 'Order not found');
        }

        $email = $order->get_billing_email();
        $customer = self::get_by_email($email);

        // If customer exists, update their data
        if ($customer) {
            self::update_from_order($customer->id, $order_id);
            return $customer;
        }

        // Create new customer
        $customer_id = self::create(array(
            'wp_user_id' => $order->get_customer_id(),
            'woocommerce_customer_id' => $order->get_customer_id(),
            'first_name' => $order->get_billing_first_name(),
            'last_name' => $order->get_billing_last_name(),
            'email' => $email,
            'phone' => $order->get_billing_phone(),
            'company' => $order->get_billing_company(),
            'source' => 'woocommerce',
        ));

        if ($customer_id) {
            // Update initial order stats
            self::update_from_order($customer_id, $order_id);
            return self::get($customer_id);
        }

        return false;
    }

    /**
     * Create a new customer
     */
    public static function create($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';

        $insert_data = array(
            'wp_user_id' => isset($data['wp_user_id']) ? $data['wp_user_id'] : null,
            'woocommerce_customer_id' => isset($data['woocommerce_customer_id']) ? $data['woocommerce_customer_id'] : null,
            'first_name' => sanitize_text_field($data['first_name']),
            'last_name' => sanitize_text_field($data['last_name']),
            'email' => sanitize_email($data['email']),
            'phone' => isset($data['phone']) ? sanitize_text_field($data['phone']) : null,
            'line_id' => isset($data['line_id']) ? sanitize_text_field($data['line_id']) : null,
            'company' => isset($data['company']) ? sanitize_text_field($data['company']) : null,
            'tax_id' => isset($data['tax_id']) ? sanitize_text_field($data['tax_id']) : null,
            'customer_type' => isset($data['customer_type']) ? sanitize_text_field($data['customer_type']) : 'retail',
            'source' => isset($data['source']) ? sanitize_text_field($data['source']) : null,
            'status' => isset($data['status']) ? sanitize_text_field($data['status']) : 'active',
        );

        $result = $wpdb->insert($table, $insert_data);

        if ($result) {
            do_action('sakwood_crm_customer_created', $wpdb->insert_id, $insert_data);
            return $wpdb->insert_id;
        }

        return false;
    }

    /**
     * Update customer from order
     */
    public static function update_from_order($customer_id, $order_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';

        $order = wc_get_order($order_id);

        if (!$order) {
            return false;
        }

        // Get order count and total spent
        $customer_id_wp = $order->get_customer_id();

        if ($customer_id_wp) {
            $customer_wc = new WC_Customer($customer_id_wp);
            $total_orders = $customer_wc->get_order_count();
            $total_spent = $customer_wc->get_total_spent();
            $last_order = $customer_wc->get_last_order();
            $last_order_date = $last_order ? $last_order->get_date_created()->date('Y-m-d H:i:s') : null;
        } else {
            // Customer is guest, calculate from orders with same email
            $email = $order->get_billing_email();
            $orders = wc_get_orders(array(
                'billing_email' => $email,
                'limit' => -1,
            ));

            $total_orders = count($orders);
            $total_spent = array_sum(array_map(function($o) { return $o->get_total(); }, $orders));
            $last_order_date = $order->get_date_created()->date('Y-m-d H:i:s');
        }

        return $wpdb->update(
            $table,
            array(
                'total_orders' => $total_orders,
                'total_spent' => $total_spent,
                'last_order_date' => $last_order_date,
            ),
            array('id' => $customer_id),
            array('%d', '%f', '%s'),
            array('%d')
        );
    }

    /**
     * Update customer
     */
    public static function update($customer_id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';

        $update_data = array();

        $allowed_fields = array(
            'first_name', 'last_name', 'email', 'phone', 'line_id',
            'company', 'tax_id', 'customer_type', 'source', 'status'
        );

        foreach ($allowed_fields as $field) {
            if (isset($data[$field])) {
                $update_data[$field] = sanitize_text_field($data[$field]);
            }
        }

        if (empty($update_data)) {
            return false;
        }

        $result = $wpdb->update(
            $table,
            $update_data,
            array('id' => $customer_id),
            array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'),
            array('%d')
        );

        if ($result !== false) {
            do_action('sakwood_crm_customer_updated', $customer_id, $update_data);
        }

        return $result;
    }

    /**
     * Delete customer
     */
    public static function delete($customer_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';

        do_action('sakwood_crm_customer_deleted', $customer_id);

        return $wpdb->delete($table, array('id' => $customer_id), array('%d'));
    }

    /**
     * Get all customers with filters
     */
    public static function get_all($args = array()) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';

        $defaults = array(
            'limit' => 20,
            'offset' => 0,
            'customer_type' => '',
            'status' => '',
            'search' => '',
            'orderby' => 'created_at',
            'order' => 'DESC',
        );

        $args = wp_parse_args($args, $defaults);

        $where = array('1=1');
        $values = array();

        if (!empty($args['customer_type'])) {
            $where[] = 'customer_type = %s';
            $values[] = $args['customer_type'];
        }

        if (!empty($args['status'])) {
            $where[] = 'status = %s';
            $values[] = $args['status'];
        }

        if (!empty($args['search'])) {
            $where[] = '(first_name LIKE %s OR last_name LIKE %s OR email LIKE %s OR phone LIKE %s OR company LIKE %s)';
            $search = '%' . $args['search'] . '%';
            $values = array_merge($values, array($search, $search, $search, $search, $search));
        }

        $where_clause = implode(' AND ', $where);

        // Get total count
        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $table WHERE $where_clause",
            $values
        ));

        // Get customers
        $orderby = in_array($args['orderby'], array('id', 'created_at', 'updated_at', 'total_spent', 'last_order_date')) ? $args['orderby'] : 'created_at';
        $order = in_array($args['order'], array('ASC', 'DESC')) ? $args['order'] : 'DESC';

        $customers = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table WHERE $where_clause ORDER BY $orderby $order LIMIT %d OFFSET %d",
            array_merge($values, array($args['limit'], $args['offset']))
        ));

        return array(
            'customers' => $customers,
            'total' => (int) $count,
            'pages' => ceil($count / $args['limit']),
        );
    }

    /**
     * Get customer statistics
     */
    public static function get_stats($customer_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_customers';
        $interactions_table = $wpdb->prefix . 'sakwood_interactions';
        $tasks_table = $wpdb->prefix . 'sakwood_tasks';

        $customer = self::get($customer_id);

        if (!$customer) {
            return null;
        }

        // Get interaction count
        $interaction_count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $interactions_table WHERE customer_id = %d",
            $customer_id
        ));

        // Get pending tasks
        $pending_tasks = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $tasks_table WHERE customer_id = %d AND status = 'pending'",
            $customer_id
        ));

        // Get average order value
        $avg_order_value = $customer->total_orders > 0
            ? $customer->total_spent / $customer->total_orders
            : 0;

        return array(
            'customer' => $customer,
            'interaction_count' => (int) $interaction_count,
            'pending_tasks' => (int) $pending_tasks,
            'avg_order_value' => (float) $avg_order_value,
        );
    }

    /**
     * Get customer's order history
     */
    public static function get_orders($customer_id, $limit = 10) {
        $customer = self::get($customer_id);

        if (!$customer) {
            return array();
        }

        $args = array(
            'limit' => $limit,
            'orderby' => 'date',
            'order' => 'DESC',
        );

        if ($customer->wp_user_id) {
            $args['customer_id'] = $customer->wp_user_id;
        } else {
            $args['billing_email'] = $customer->email;
        }

        return wc_get_orders($args);
    }

    /**
     * Auto-categorize customer based on spending
     */
    public static function auto_categorize($customer_id) {
        $customer = self::get($customer_id);

        if (!$customer) {
            return false;
        }

        $new_type = 'retail';

        // VIP: More than 5 orders OR spent over 50,000 THB
        if ($customer->total_orders >= 5 || $customer->total_spent >= 50000) {
            $new_type = 'vip';
        }
        // Wholesale: Spent over 10,000 THB in single order or company name exists
        elseif ($customer->total_spent >= 10000 || !empty($customer->company)) {
            $new_type = 'wholesale';
        }

        if ($new_type !== $customer->customer_type) {
            return self::update($customer_id, array('customer_type' => $new_type));
        }

        return false;
    }
}

/**
 * Hook into WooCommerce order creation to sync with CRM
 */
add_action('woocommerce_new_order', function($order_id) {
    Sakwood_CRM_Customer::get_or_create_from_order($order_id);
});

/**
 * Hook into WooCommerce order completion to update stats and categorize
 */
add_action('woocommerce_order_status_completed', function($order_id) {
    $customer = Sakwood_CRM_Customer::get_or_create_from_order($order_id);

    if ($customer && $customer->id) {
        Sakwood_CRM_Customer::auto_categorize($customer->id);
    }
});
