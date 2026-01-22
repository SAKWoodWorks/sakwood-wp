<?php
/**
 * CRM Interaction Management
 *
 * Handles logging and tracking customer interactions
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Interaction {

    /**
     * Log a new interaction
     */
    public static function create($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_interactions';

        $insert_data = array(
            'customer_id' => intval($data['customer_id']),
            'interaction_type' => sanitize_text_field($data['interaction_type']),
            'subject' => isset($data['subject']) ? sanitize_text_field($data['subject']) : null,
            'message' => isset($data['message']) ? sanitize_textarea_field($data['message']) : null,
            'direction' => isset($data['direction']) ? sanitize_text_field($data['direction']) : 'outbound',
            'duration' => isset($data['duration']) ? intval($data['duration']) : null,
            'created_by' => get_current_user_id(),
        );

        $result = $wpdb->insert($table, $insert_data);

        if ($result) {
            $interaction_id = $wpdb->insert_id;
            do_action('sakwood_crm_interaction_created', $interaction_id, $insert_data);
            return $interaction_id;
        }

        return false;
    }

    /**
     * Get interaction by ID
     */
    public static function get($interaction_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_interactions';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE id = %d",
            $interaction_id
        ));
    }

    /**
     * Get customer interactions
     */
    public static function get_by_customer($customer_id, $limit = 50, $interaction_type = '') {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_interactions';

        $where = array('customer_id = %d');
        $values = array($customer_id);

        if (!empty($interaction_type)) {
            $where[] = 'interaction_type = %s';
            $values[] = $interaction_type;
        }

        $where_clause = implode(' AND ', $where);

        return $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table WHERE $where_clause ORDER BY created_at DESC LIMIT %d",
            array_merge($values, array($limit))
        ));
    }

    /**
     * Log a call
     */
    public static function log_call($customer_id, $subject, $message = '', $direction = 'outbound', $duration = null) {
        return self::create(array(
            'customer_id' => $customer_id,
            'interaction_type' => 'call',
            'subject' => $subject,
            'message' => $message,
            'direction' => $direction,
            'duration' => $duration,
        ));
    }

    /**
     * Log an email
     */
    public static function log_email($customer_id, $subject, $message, $direction = 'outbound') {
        return self::create(array(
            'customer_id' => $customer_id,
            'interaction_type' => 'email',
            'subject' => $subject,
            'message' => $message,
            'direction' => $direction,
        ));
    }

    /**
     * Log a LINE message
     */
    public static function log_line($customer_id, $message, $direction = 'outbound') {
        return self::create(array(
            'customer_id' => $customer_id,
            'interaction_type' => 'line',
            'subject' => 'LINE Message',
            'message' => $message,
            'direction' => $direction,
        ));
    }

    /**
     * Log a visit
     */
    public static function log_visit($customer_id, $notes = '') {
        return self::create(array(
            'customer_id' => $customer_id,
            'interaction_type' => 'visit',
            'subject' => 'Customer Visit',
            'message' => $notes,
            'direction' => 'inbound',
        ));
    }

    /**
     * Add a note
     */
    public static function add_note($customer_id, $message) {
        return self::create(array(
            'customer_id' => $customer_id,
            'interaction_type' => 'note',
            'subject' => 'Internal Note',
            'message' => $message,
            'direction' => 'outbound',
        ));
    }

    /**
     * Delete interaction
     */
    public static function delete($interaction_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_interactions';

        do_action('sakwood_crm_interaction_deleted', $interaction_id);

        return $wpdb->delete($table, array('id' => $interaction_id), array('%d'));
    }

    /**
     * Get recent interactions across all customers
     */
    public static function get_recent($limit = 20) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_interactions';
        $customers_table = $wpdb->prefix . 'sakwood_customers';

        return $wpdb->get_results($wpdb->prepare(
            "SELECT i.*, c.first_name, c.last_name, c.email
            FROM $table i
            INNER JOIN $customers_table c ON i.customer_id = c.id
            ORDER BY i.created_at DESC
            LIMIT %d",
            $limit
        ));
    }

    /**
     * Get interaction statistics
     */
    public static function get_stats($days = 30) {
        global $wpdb;
        $table = $wpdb->prefix . 'sakwood_interactions';

        $date_threshold = date('Y-m-d H:i:s', strtotime("-{$days} days"));

        // Get counts by type
        $stats = $wpdb->get_results($wpdb->prepare(
            "SELECT
                interaction_type,
                direction,
                COUNT(*) as count
            FROM $table
            WHERE created_at >= %s
            GROUP BY interaction_type, direction",
            $date_threshold
        ));

        $formatted = array();
        foreach ($stats as $stat) {
            $key = $stat->interaction_type . '_' . $stat->direction;
            $formatted[$key] = (int) $stat->count;
        }

        return $formatted;
    }
}

/**
 * Hook into WooCommerce emails to log them
 */
add_action('woocommerce_email_before_send', function($email) {
    if (is_a($email, 'WC_Email')) {
        $recipient = $email->get_recipient();

        // Find customer by email
        $customer = Sakwood_CRM_Customer::get_by_email($recipient);

        if ($customer) {
            $subject = $email->get_subject();
            $message = $email->get_content();

            Sakwood_CRM_Interaction::log_email($customer->id, $subject, $message, 'outbound');
        }
    }
});
