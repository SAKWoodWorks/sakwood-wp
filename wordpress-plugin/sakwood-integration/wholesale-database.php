<?php
/**
 * Wholesale Database Management
 *
 * Creates and manages wholesale application database table
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Wholesale_Database {

    /**
     * Table name
     */
    private static $table_name = 'sakwood_wholesale_applications';

    /**
     * Create database table
     */
    public static function create_tables() {
        global $wpdb;
        $table_name = $wpdb->prefix . self::$table_name;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id bigint(20) UNSIGNED NOT NULL,
            application_id varchar(50) NOT NULL,
            company_name varchar(255) NOT NULL,
            tax_id varchar(20) NOT NULL,
            business_type varchar(50) NOT NULL,
            business_address text NOT NULL,
            business_city varchar(100) NOT NULL,
            business_province varchar(100) NOT NULL,
            business_postal_code varchar(10) NOT NULL,
            business_phone varchar(20) NOT NULL,
            estimated_volume varchar(20) NOT NULL,
            trade_references text,
            status varchar(20) DEFAULT 'pending',
            credit_limit decimal(10,2) DEFAULT 0,
            admin_notes text,
            submitted_date datetime DEFAULT CURRENT_TIMESTAMP,
            reviewed_date datetime DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY application_id (application_id),
            KEY user_id (user_id),
            KEY status (status),
            KEY submitted_date (submitted_date)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Get table name
     */
    public static function get_table_name() {
        global $wpdb;
        return $wpdb->prefix . self::$table_name;
    }

    /**
     * Insert application
     */
    public static function insert_application($data) {
        global $wpdb;
        $table_name = self::get_table_name();

        $application_id = 'WSL-' . time() . '-' . rand(1000, 9999);

        $wpdb->insert(
            $table_name,
            array(
                'user_id' => $data['user_id'],
                'application_id' => $application_id,
                'company_name' => $data['company_name'],
                'tax_id' => $data['tax_id'],
                'business_type' => $data['business_type'],
                'business_address' => $data['business_address'],
                'business_city' => $data['business_city'],
                'business_province' => $data['business_province'],
                'business_postal_code' => $data['business_postal_code'],
                'business_phone' => $data['business_phone'],
                'estimated_volume' => $data['estimated_volume'],
                'trade_references' => isset($data['references']) ? $data['references'] : '',
                'status' => 'pending',
            ),
            array('%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
        );

        return $application_id;
    }

    /**
     * Get application by ID
     */
    public static function get_application($application_id) {
        global $wpdb;
        $table_name = self::get_table_name();

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE application_id = %s",
                $application_id
            )
        );
    }

    /**
     * Get applications by user ID
     */
    public static function get_applications_by_user($user_id) {
        global $wpdb;
        $table_name = self::get_table_name();

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE user_id = %d ORDER BY submitted_date DESC",
                $user_id
            )
        );
    }

    /**
     * Get all applications with optional status filter
     */
    public static function get_all_applications($status = '', $limit = 20, $offset = 0) {
        global $wpdb;
        $table_name = self::get_table_name();

        if (!empty($status)) {
            return $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT * FROM $table_name WHERE status = %s ORDER BY submitted_date DESC LIMIT %d OFFSET %d",
                    $status,
                    $limit,
                    $offset
                )
            );
        }

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_name ORDER BY submitted_date DESC LIMIT %d OFFSET %d",
                $limit,
                $offset
            )
        );
    }

    /**
     * Get application count by status
     */
    public static function get_count_by_status($status = '') {
        global $wpdb;
        $table_name = self::get_table_name();

        if (!empty($status)) {
            return $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT COUNT(*) FROM $table_name WHERE status = %s",
                    $status
                )
            );
        }

        return $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    }

    /**
     * Update application status
     */
    public static function update_status($application_id, $status, $credit_limit = 0, $admin_notes = '') {
        global $wpdb;
        $table_name = self::get_table_name();

        $data = array(
            'status' => $status,
            'reviewed_date' => current_time('mysql'),
        );

        if ($credit_limit > 0) {
            $data['credit_limit'] = $credit_limit;
        }

        if (!empty($admin_notes)) {
            $data['admin_notes'] = $admin_notes;
        }

        return $wpdb->update(
            $table_name,
            $data,
            array('application_id' => $application_id),
            array('%s', '%s', '%f', '%s'),
            array('%s')
        );
    }

    /**
     * Delete application
     */
    public static function delete_application($application_id) {
        global $wpdb;
        $table_name = self::get_table_name();

        return $wpdb->delete(
            $table_name,
            array('application_id' => $application_id),
            array('%s')
        );
    }

    /**
     * Update user wholesale meta
     */
    public static function update_user_wholesale_meta($user_id, $application) {
        // Update user meta with wholesale information
        update_user_meta($user_id, 'wholesale_status', $application->status);
        update_user_meta($user_id, 'wholesale_business_name', $application->company_name);
        update_user_meta($user_id, 'wholesale_tax_id', $application->tax_id);
        update_user_meta($user_id, 'wholesale_credit_limit', $application->credit_limit);
        update_user_meta($user_id, 'wholesale_application_id', $application->application_id);

        // Update user role if approved
        if ($application->status === 'active' || $application->status === 'approved') {
            $user = new WP_User($user_id);
            $user->add_role('wholesale_customer');

            // Add wholesale capability
            if (!in_array('wholesale_customer', $user->roles)) {
                $user->add_role('wholesale_customer');
            }
        }
    }
}
