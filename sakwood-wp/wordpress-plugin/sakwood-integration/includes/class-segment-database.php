<?php
/**
 * Customer Segmentation Database Handler
 * 
 * Manages database operations for customer segments
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Segment_Database {

    /**
     * Table names
     */
    private static $table_segments;
    private static $table_members;
    private static $table_log;

    /**
     * Initialize table names
     */
    public static function init() {
        global $wpdb;
        self::$table_segments = $wpdb->prefix . 'sakwood_segments';
        self::$table_members = $wpdb->prefix . 'sakwood_segment_members';
        self::$table_log = $wpdb->prefix . 'sakwood_segment_log';
    }

    /**
     * Create database tables
     */
    public static function create_tables() {
        global $wpdb;
        self::init();

        $charset_collate = $wpdb->get_charset_collate();

        // Segments table
        $sql_segments = "CREATE TABLE IF NOT EXISTS " . self::$table_segments . " (
            id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            type ENUM('manual', 'dynamic') NOT NULL DEFAULT 'dynamic',
            rules JSON,
            color VARCHAR(7) DEFAULT '#3B82F6',
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            customer_count INT(11) UNSIGNED NOT NULL DEFAULT 0,
            total_revenue DECIMAL(15,2) NOT NULL DEFAULT 0.00,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (id),
            KEY type (type),
            KEY is_active (is_active)
        ) $charset_collate;";

        // Segment members table
        $sql_members = "CREATE TABLE IF NOT EXISTS " . self::$table_members . " (
            id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
            segment_id INT(11) UNSIGNED NOT NULL,
            customer_id BIGINT(20) UNSIGNED NOT NULL,
            assigned_at DATETIME NOT NULL,
            assigned_by ENUM('system', 'manual') NOT NULL DEFAULT 'system',
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            PRIMARY KEY (id),
            UNIQUE KEY segment_customer (segment_id, customer_id),
            KEY customer_id (customer_id),
            KEY is_active (is_active),
            FOREIGN KEY (segment_id) REFERENCES " . self::$table_segments . "(id) ON DELETE CASCADE,
            FOREIGN KEY (customer_id) REFERENCES {$wpdb->users}(ID) ON DELETE CASCADE
        ) $charset_collate;";

        // Segment activity log table
        $sql_log = "CREATE TABLE IF NOT EXISTS " . self::$table_log . " (
            id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
            segment_id INT(11) UNSIGNED NOT NULL,
            customer_id BIGINT(20) UNSIGNED NOT NULL,
            action ENUM('added', 'removed', 'updated') NOT NULL,
            reason VARCHAR(255),
            logged_at DATETIME NOT NULL,
            PRIMARY KEY (id),
            KEY segment_id (segment_id),
            KEY customer_id (customer_id),
            KEY logged_at (logged_at),
            FOREIGN KEY (segment_id) REFERENCES " . self::$table_segments . "(id) ON DELETE CASCADE,
            FOREIGN KEY (customer_id) REFERENCES {$wpdb->users}(ID) ON DELETE CASCADE
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_segments);
        dbDelta($sql_members);
        dbDelta($sql_log);

        // Update version
        update_option('sakwood_segment_db_version', '1.0.0');
    }

    /**
     * Get all segments
     * 
     * @param array $args Query arguments
     * @return array List of segments
     */
    public static function get_segments($args = array()) {
        global $wpdb;
        self::init();

        $defaults = array(
            'type' => 'all',
            'status' => 'active',
            'orderby' => 'created_at',
            'order' => 'DESC',
            'limit' => 100,
            'offset' => 0,
        );

        $args = wp_parse_args($args, $defaults);

        $where = array('1=1');

        if ($args['type'] !== 'all') {
            $where[] = $wpdb->prepare('type = %s', $args['type']);
        }

        if ($args['status'] === 'active') {
            $where[] = 'is_active = 1';
        } elseif ($args['status'] === 'inactive') {
            $where[] = 'is_active = 0';
        }

        $where_clause = implode(' AND ', $where);
        $order_clause = sprintf('%s %s', $args['orderby'], $args['order']);
        $limit_clause = $wpdb->prepare('LIMIT %d OFFSET %d', $args['limit'], $args['offset']);

        $sql = "SELECT * FROM " . self::$table_segments . " 
                WHERE {$where_clause} 
                ORDER BY {$order_clause} 
                {$limit_clause}";

        $results = $wpdb->get_results($sql, ARRAY_A);

        if (!$results) {
            return array();
        }

        // Decode JSON rules
        foreach ($results as &$segment) {
            if ($segment['rules']) {
                $segment['rules'] = json_decode($segment['rules'], true);
            }
            // Update customer count and revenue
            $stats = self::get_segment_stats($segment['id']);
            $segment['customer_count'] = $stats['customer_count'];
            $segment['total_revenue'] = $stats['total_revenue'];
        }

        return $results;
    }

    /**
     * Get segment by ID
     * 
     * @param int $segment_id Segment ID
     * @return array|null Segment data or null if not found
     */
    public static function get_segment($segment_id) {
        global $wpdb;
        self::init();

        $segment = $wpdb->get_row(
            $wpdb->prepare('SELECT * FROM ' . self::$table_segments . ' WHERE id = %d', $segment_id),
            ARRAY_A
        );

        if (!$segment) {
            return null;
        }

        // Decode JSON rules
        if ($segment['rules']) {
            $segment['rules'] = json_decode($segment['rules'], true);
        }

        // Add stats
        $stats = self::get_segment_stats($segment_id);
        $segment['customer_count'] = $stats['customer_count'];
        $segment['total_revenue'] = $stats['total_revenue'];

        return $segment;
    }

    /**
     * Create new segment
     * 
     * @param array $data Segment data
     * @return int|WP_Error Segment ID or WP_Error on failure
     */
    public static function create_segment($data) {
        global $wpdb;
        self::init();

        // Validate required fields
        if (empty($data['name'])) {
            return new WP_Error('missing_name', __('Segment name is required.', 'sakwood-integration'));
        }

        if (empty($data['type']) || !in_array($data['type'], array('manual', 'dynamic'))) {
            return new WP_Error('invalid_type', __('Invalid segment type.', 'sakwood-integration'));
        }

        // Prepare data
        $segment_data = array(
            'name' => sanitize_text_field($data['name']),
            'description' => isset($data['description']) ? sanitize_textarea_field($data['description']) : '',
            'type' => $data['type'],
            'rules' => isset($data['rules']) && is_array($data['rules']) ? json_encode($data['rules']) : null,
            'color' => isset($data['color']) ? sanitize_hex_color($data['color']) : '#3B82F6',
            'is_active' => isset($data['is_active']) ? (int) $data['is_active'] : 1,
            'created_at' => current_time('mysql'),
            'updated_at' => current_time('mysql'),
        );

        $wpdb->insert(self::$table_segments, $segment_data);

        if ($wpdb->last_error) {
            return new WP_Error('db_error', $wpdb->last_error);
        }

        $segment_id = $wpdb->insert_id;

        // Log creation
        self::log_activity($segment_id, 0, 'added', 'Segment created');

        // If dynamic segment, evaluate rules immediately
        if ($data['type'] === 'dynamic' && !empty($data['rules'])) {
            Sakwood_Segment_Assignment::evaluate_and_assign($segment_id);
        }

        return $segment_id;
    }

    /**
     * Update segment
     * 
     * @param int $segment_id Segment ID
     * @param array $data Segment data
     * @return bool|WP_Error True on success, WP_Error on failure
     */
    public static function update_segment($segment_id, $data) {
        global $wpdb;
        self::init();

        // Check if segment exists
        $existing = self::get_segment($segment_id);
        if (!$existing) {
            return new WP_Error('not_found', __('Segment not found.', 'sakwood-integration'));
        }

        // Prepare update data
        $update_data = array(
            'updated_at' => current_time('mysql'),
        );

        if (isset($data['name'])) {
            $update_data['name'] = sanitize_text_field($data['name']);
        }

        if (isset($data['description'])) {
            $update_data['description'] = sanitize_textarea_field($data['description']);
        }

        if (isset($data['type'])) {
            $update_data['type'] = in_array($data['type'], array('manual', 'dynamic')) ? $data['type'] : $existing['type'];
        }

        if (isset($data['rules'])) {
            $update_data['rules'] = is_array($data['rules']) ? json_encode($data['rules']) : null;
        }

        if (isset($data['color'])) {
            $update_data['color'] = sanitize_hex_color($data['color']);
        }

        if (isset($data['is_active'])) {
            $update_data['is_active'] = (int) $data['is_active'];
        }

        $wpdb->update(
            self::$table_segments,
            $update_data,
            array('id' => $segment_id)
        );

        if ($wpdb->last_error) {
            return new WP_Error('db_error', $wpdb->last_error);
        }

        // Log update
        self::log_activity($segment_id, 0, 'updated', 'Segment updated');

        // If rules changed for dynamic segment, re-evaluate
        if ($existing['type'] === 'dynamic' && isset($data['rules'])) {
            Sakwood_Segment_Assignment::evaluate_and_assign($segment_id);
        }

        return true;
    }

    /**
     * Delete segment
     * 
     * @param int $segment_id Segment ID
     * @return bool|WP_Error True on success, WP_Error on failure
     */
    public static function delete_segment($segment_id) {
        global $wpdb;
        self::init();

        // Check if segment exists
        $segment = self::get_segment($segment_id);
        if (!$segment) {
            return new WP_Error('not_found', __('Segment not found.', 'sakwood-integration'));
        }

        // Delete segment (cascade will handle members and logs)
        $wpdb->delete(
            self::$table_segments,
            array('id' => $segment_id)
        );

        if ($wpdb->last_error) {
            return new WP_Error('db_error', $wpdb->last_error);
        }

        return true;
    }

    /**
     * Get segment statistics
     * 
     * @param int $segment_id Segment ID
     * @return array Statistics
     */
    public static function get_segment_stats($segment_id) {
        global $wpdb;
        self::init();

        // Get customer count
        $customer_count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(DISTINCT customer_id) FROM " . self::$table_members . " 
             WHERE segment_id = %d AND is_active = 1",
            $segment_id
        ));

        // Get total revenue from segment customers
        $total_revenue = $wpdb->get_var($wpdb->prepare(
            "SELECT SUM(pm.meta_value) 
             FROM " . self::$table_members . " sm
             INNER JOIN {$wpdb->prefix}woocommerce_order_items oi 
                 ON oi.order_id IN (
                     SELECT p.ID FROM {$wpdb->posts} p 
                     WHERE p.post_type = 'shop_order' 
                     AND p.post_status IN ('wc-completed', 'wc-processing')
                     AND p.post_author = sm.customer_id
                 )
             INNER JOIN {$wpdb->postmeta} pm 
                 ON pm.post_id = oi.order_id 
                 AND pm.meta_key = '_order_total'
             WHERE sm.segment_id = %d AND sm.is_active = 1",
            $segment_id
        ));

        return array(
            'customer_count' => (int) $customer_count,
            'total_revenue' => (float) ($total_revenue ?? 0),
        );
    }

    /**
     * Get segment members
     * 
     * @param int $segment_id Segment ID
     * @param array $args Query arguments
     * @return array List of members
     */
    public static function get_members($segment_id, $args = array()) {
        global $wpdb;
        self::init();

        $defaults = array(
            'status' => 'active',
            'limit' => 100,
            'offset' => 0,
        );

        $args = wp_parse_args($args, $defaults);

        $where = array($wpdb->prepare('segment_id = %d', $segment_id));

        if ($args['status'] === 'active') {
            $where[] = 'is_active = 1';
        }

        $where_clause = implode(' AND ', $where);
        $limit_clause = $wpdb->prepare('LIMIT %d OFFSET %d', $args['limit'], $args['offset']);

        $sql = "SELECT * FROM " . self::$table_members . " 
                WHERE {$where_clause} 
                ORDER BY assigned_at DESC 
                {$limit_clause}";

        $results = $wpdb->get_results($sql, ARRAY_A);

        if (!$results) {
            return array();
        }

        // Add customer details
        foreach ($results as &$member) {
            $customer = get_userdata($member['customer_id']);
            if ($customer) {
                $member['customer_email'] = $customer->user_email;
                $member['customer_name'] = $customer->display_name;
            }
        }

        return $results;
    }

    /**
     * Add customer to segment
     * 
     * @param int $segment_id Segment ID
     * @param int $customer_id Customer ID
     * @param string $assigned_by Assignment method ('system' or 'manual')
     * @return bool|WP_Error True on success, WP_Error on failure
     */
    public static function add_member($segment_id, $customer_id, $assigned_by = 'manual') {
        global $wpdb;
        self::init();

        // Check if segment exists
        $segment = self::get_segment($segment_id);
        if (!$segment) {
            return new WP_Error('not_found', __('Segment not found.', 'sakwood-integration'));
        }

        // Check if customer exists
        $customer = get_userdata($customer_id);
        if (!$customer) {
            return new WP_Error('invalid_customer', __('Customer not found.', 'sakwood-integration'));
        }

        // Check if already a member
        $exists = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM " . self::$table_members . " 
             WHERE segment_id = %d AND customer_id = %d",
            $segment_id,
            $customer_id
        ));

        if ($exists) {
            // Reactivate if was inactive
            $wpdb->update(
                self::$table_members,
                array(
                    'is_active' => 1,
                    'assigned_at' => current_time('mysql'),
                    'assigned_by' => $assigned_by,
                ),
                array('id' => $exists)
            );
            return true;
        }

        // Add new member
        $wpdb->insert(
            self::$table_members,
            array(
                'segment_id' => $segment_id,
                'customer_id' => $customer_id,
                'assigned_at' => current_time('mysql'),
                'assigned_by' => $assigned_by,
                'is_active' => 1,
            )
        );

        if ($wpdb->last_error) {
            return new WP_Error('db_error', $wpdb->last_error);
        }

        // Log activity
        self::log_activity($segment_id, $customer_id, 'added', 'Added to segment');

        return true;
    }

    /**
     * Remove customer from segment
     * 
     * @param int $segment_id Segment ID
     * @param int $customer_id Customer ID
     * @return bool|WP_Error True on success, WP_Error on failure
     */
    public static function remove_member($segment_id, $customer_id) {
        global $wpdb;
        self::init();

        // Check if member exists
        $member = $wpdb->get_row($wpdb->prepare(
            "SELECT id FROM " . self::$table_members . " 
             WHERE segment_id = %d AND customer_id = %d AND is_active = 1",
            $segment_id,
            $customer_id
        ), ARRAY_A);

        if (!$member) {
            return new WP_Error('not_found', __('Customer is not in this segment.', 'sakwood-integration'));
        }

        // Deactivate (don't delete for history)
        $wpdb->update(
            self::$table_members,
            array('is_active' => 0),
            array('id' => $member['id'])
        );

        if ($wpdb->last_error) {
            return new WP_Error('db_error', $wpdb->last_error);
        }

        // Log activity
        self::log_activity($segment_id, $customer_id, 'removed', 'Removed from segment');

        return true;
    }

    /**
     * Get customer's segments
     * 
     * @param int $customer_id Customer ID
     * @return array List of segments
     */
    public static function get_customer_segments($customer_id) {
        global $wpdb;
        self::init();

        $sql = $wpdb->prepare(
            "SELECT s.* FROM " . self::$table_segments . " s
             INNER JOIN " . self::$table_members . " m ON s.id = m.segment_id
             WHERE m.customer_id = %d AND m.is_active = 1 AND s.is_active = 1
             ORDER BY s.created_at DESC",
            $customer_id
        );

        $results = $wpdb->get_results($sql, ARRAY_A);

        if (!$results) {
            return array();
        }

        // Decode JSON rules
        foreach ($results as &$segment) {
            if ($segment['rules']) {
                $segment['rules'] = json_decode($segment['rules'], true);
            }
        }

        return $results;
    }

    /**
     * Log segment activity
     * 
     * @param int $segment_id Segment ID
     * @param int $customer_id Customer ID
     * @param string $action Action (added, removed, updated)
     * @param string $reason Reason for action
     * @return bool True on success
     */
    public static function log_activity($segment_id, $customer_id, $action, $reason = '') {
        global $wpdb;
        self::init();

        $wpdb->insert(
            self::$table_log,
            array(
                'segment_id' => $segment_id,
                'customer_id' => $customer_id,
                'action' => $action,
                'reason' => $reason,
                'logged_at' => current_time('mysql'),
            )
        );

        return true;
    }

    /**
     * Get activity log
     * 
     * @param array $args Query arguments
     * @return array List of log entries
     */
    public static function get_activity_log($args = array()) {
        global $wpdb;
        self::init();

        $defaults = array(
            'segment_id' => 0,
            'customer_id' => 0,
            'limit' => 100,
            'offset' => 0,
        );

        $args = wp_parse_args($args, $defaults);

        $where = array('1=1');

        if ($args['segment_id']) {
            $where[] = $wpdb->prepare('segment_id = %d', $args['segment_id']);
        }

        if ($args['customer_id']) {
            $where[] = $wpdb->prepare('customer_id = %d', $args['customer_id']);
        }

        $where_clause = implode(' AND ', $where);
        $limit_clause = $wpdb->prepare('LIMIT %d OFFSET %d', $args['limit'], $args['offset']);

        $sql = "SELECT * FROM " . self::$table_log . " 
                WHERE {$where_clause} 
                ORDER BY logged_at DESC 
                {$limit_clause}";

        $results = $wpdb->get_results($sql, ARRAY_A);

        if (!$results) {
            return array();
        }

        // Add segment and customer names
        foreach ($results as &$log) {
            $segment = self::get_segment($log['segment_id']);
            if ($segment) {
                $log['segment_name'] = $segment['name'];
            }

            $customer = get_userdata($log['customer_id']);
            if ($customer) {
                $log['customer_name'] = $customer->display_name;
                $log['customer_email'] = $customer->user_email;
            }
        }

        return $results;
    }

    /**
     * Get all dynamic segments
     * 
     * @return array List of dynamic segments
     */
    public static function get_dynamic_segments() {
        return self::get_segments(array('type' => 'dynamic', 'status' => 'active', 'limit' => 1000));
    }

    /**
     * Truncate all data (for testing)
     * 
     * @return bool True on success
     */
    public static function truncate() {
        global $wpdb;
        self::init();

        $wpdb->query("TRUNCATE TABLE " . self::$table_log);
        $wpdb->query("TRUNCATE TABLE " . self::$table_members);
        $wpdb->query("TRUNCATE TABLE " . self::$table_segments);

        return true;
    }
}
