<?php
/**
 * CRM Database Setup
 *
 * Creates custom tables for customer relationship management
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_CRM_Database {

    /**
     * Initialize CRM database
     */
    public function __construct() {
        add_action('init', array($this, 'register_customer_post_type'));
        add_action('init', array($this, 'register_interaction_post_type'));
    }

    /**
     * Create custom database tables
     */
    public static function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        /**
         * Table: sakwood_customers
         * Stores extended customer information
         */
        $table_customers = $wpdb->prefix . 'sakwood_customers';
        $sql_customers = "CREATE TABLE $table_customers (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            wp_user_id bigint(20) UNSIGNED DEFAULT NULL,
            woocommerce_customer_id bigint(20) UNSIGNED DEFAULT NULL,
            first_name varchar(100) NOT NULL,
            last_name varchar(100) NOT NULL,
            email varchar(255) NOT NULL,
            phone varchar(20) DEFAULT NULL,
            line_id varchar(100) DEFAULT NULL,
            company varchar(255) DEFAULT NULL,
            tax_id varchar(20) DEFAULT NULL,
            customer_type enum('retail','wholesale','vip') DEFAULT 'retail',
            source varchar(50) DEFAULT NULL,
            status enum('active','inactive','blocked') DEFAULT 'active',
            total_orders int(11) DEFAULT 0,
            total_spent decimal(10,2) DEFAULT 0.00,
            last_order_date datetime DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY email (email),
            KEY wp_user_id (wp_user_id),
            KEY woocommerce_customer_id (woocommerce_customer_id),
            KEY customer_type (customer_type),
            KEY status (status)
        ) $charset_collate;";
        dbDelta($sql_customers);

        /**
         * Table: sakwood_interactions
         * Stores customer interactions (calls, emails, visits)
         */
        $table_interactions = $wpdb->prefix . 'sakwood_interactions';
        $sql_interactions = "CREATE TABLE $table_interactions (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            customer_id bigint(20) UNSIGNED NOT NULL,
            interaction_type enum('call','email','line','visit','note') NOT NULL,
            subject varchar(255) DEFAULT NULL,
            message text DEFAULT NULL,
            direction enum('inbound','outbound') DEFAULT 'outbound',
            duration int(11) DEFAULT NULL,
            created_by bigint(20) UNSIGNED DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY customer_id (customer_id),
            KEY interaction_type (interaction_type),
            KEY created_at (created_at)
        ) $charset_collate;";
        dbDelta($sql_interactions);

        /**
         * Table: sakwood_tasks
         * Stores follow-up tasks and reminders
         */
        $table_tasks = $wpdb->prefix . 'sakwood_tasks';
        $sql_tasks = "CREATE TABLE $table_tasks (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            customer_id bigint(20) UNSIGNED NOT NULL,
            title varchar(255) NOT NULL,
            description text DEFAULT NULL,
            task_type enum('follow_up','payment_reminder','quote','meeting','other') DEFAULT 'follow_up',
            priority enum('low','medium','high','urgent') DEFAULT 'medium',
            status enum('pending','in_progress','completed','cancelled') DEFAULT 'pending',
            due_date datetime DEFAULT NULL,
            assigned_to bigint(20) UNSIGNED DEFAULT NULL,
            completed_at datetime DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY customer_id (customer_id),
            KEY status (status),
            KEY due_date (due_date),
            KEY assigned_to (assigned_to)
        ) $charset_collate;";
        dbDelta($sql_tasks);

        /**
         * Table: sakwood_payments
         * Stores payment tracking information
         */
        $table_payments = $wpdb->prefix . 'sakwood_payments';
        $sql_payments = "CREATE TABLE $table_payments (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            customer_id bigint(20) UNSIGNED NOT NULL,
            order_id bigint(20) UNSIGNED DEFAULT NULL,
            payment_method varchar(50) NOT NULL,
            amount decimal(10,2) NOT NULL,
            status enum('pending','processing','completed','failed','refunded') DEFAULT 'pending',
            transaction_id varchar(255) DEFAULT NULL,
            paid_at datetime DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY customer_id (customer_id),
            KEY order_id (order_id),
            KEY status (status),
            KEY paid_at (paid_at)
        ) $charset_collate;";
        dbDelta($sql_payments);

        // Update database version
        update_option('sakwood_crm_db_version', '1.0.0');
    }

    /**
     * Register Customer Post Type
     * (Optional - for WordPress admin interface)
     */
    public function register_customer_post_type() {
        register_post_type('sakwood_customer', array(
            'label' => 'CRM Customers',
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'sakwood-crm',
            'supports' => array('title', 'editor'),
            'capability_type' => 'post',
        ));
    }

    /**
     * Register Interaction Post Type
     */
    public function register_interaction_post_type() {
        register_post_type('sakwood_interaction', array(
            'label' => 'CRM Interactions',
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'sakwood-crm',
            'supports' => array('title', 'editor'),
            'capability_type' => 'post',
        ));
    }
}

// Create tables on plugin activation
register_activation_hook(__FILE__, array('Sakwood_CRM_Database', 'create_tables'));
