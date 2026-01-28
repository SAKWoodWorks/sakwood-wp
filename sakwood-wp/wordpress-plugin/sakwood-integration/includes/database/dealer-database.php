<?php
/**
 * Dealer Database Schema
 *
 * Creates and manages dealer-related database tables
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Sakwood_Dealer_Database {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('admin_init', array($this, 'check_database_tables'));
    }

    /**
     * Check and create database tables if they don't exist
     */
    public function check_database_tables() {
        if (get_option('sakwood_dealer_db_version') !== '1.0') {
            $this->create_tables();
            update_option('sakwood_dealer_db_version', '1.0');
        }
    }

    /**
     * Create all dealer-related tables
     */
    private function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // Table 1: Dealer Tiers Configuration
        $table_tiers = $wpdb->prefix . 'sakwood_dealer_tiers';
        $sql_tiers = "CREATE TABLE $table_tiers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tier_name VARCHAR(50) NOT NULL UNIQUE,
            discount_percentage DECIMAL(5,2) NOT NULL,
            min_order_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
            min_order_quantity INT NOT NULL DEFAULT 50,
            credit_multiplier DECIMAL(3,2) NOT NULL DEFAULT 1.5,
            territory_required BOOLEAN NOT NULL DEFAULT TRUE,
            benefits TEXT,
            requirements TEXT,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) $charset_collate;";
        dbDelta($sql_tiers);

        // Table 2: Dealer Applications
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';
        $sql_applications = "CREATE TABLE $table_applications (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            user_id BIGINT NOT NULL,
            application_id VARCHAR(50) NOT NULL UNIQUE,
            current_wholesale_status VARCHAR(20) DEFAULT 'active',
            requested_tier_id INT NOT NULL,
            business_registration VARCHAR(255),
            storage_facility TEXT,
            delivery_vehicles TEXT,
            sales_capacity INT,
            dealer_experience TEXT,
            requested_territories TEXT,
            trade_references TEXT,
            business_references TEXT,
            status VARCHAR(20) DEFAULT 'pending',
            assigned_territories TEXT,
            admin_notes TEXT,
            submitted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            reviewed_date DATETIME,
            FOREIGN KEY (user_id) REFERENCES {$wpdb->users}(ID) ON DELETE CASCADE,
            FOREIGN KEY (requested_tier_id) REFERENCES {$wpdb->prefix}sakwood_dealer_tiers(id)
        ) $charset_collate;";
        dbDelta($sql_applications);

        // Table 3: Dealer Territories
        $table_territories = $wpdb->prefix . 'sakwood_dealer_territories';
        $sql_territories = "CREATE TABLE $table_territories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            dealer_id BIGINT NOT NULL,
            user_id BIGINT NOT NULL,
            province VARCHAR(100) NOT NULL,
            district VARCHAR(100),
            is_exclusive BOOLEAN NOT NULL DEFAULT FALSE,
            assigned_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            expiry_date DATETIME,
            FOREIGN KEY (user_id) REFERENCES {$wpdb->users}(ID) ON DELETE CASCADE,
            UNIQUE KEY unique_dealer_territory (dealer_id, province)
        ) $charset_collate;";
        dbDelta($sql_territories);

        // Table 4: Dealer Orders Tracking
        $table_orders = $wpdb->prefix . 'sakwood_dealer_orders';
        $sql_orders = "CREATE TABLE $table_orders (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            user_id BIGINT NOT NULL,
            order_id BIGINT NOT NULL,
            dealer_tier_id INT NOT NULL,
            order_total DECIMAL(10,2),
            discount_amount DECIMAL(10,2),
            discount_percentage DECIMAL(5,2),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES {$wpdb->users}(ID) ON DELETE CASCADE,
            FOREIGN KEY (order_id) REFERENCES {$wpdb->posts}(ID) ON DELETE CASCADE,
            FOREIGN KEY (dealer_tier_id) REFERENCES {$wpdb->prefix}sakwood_dealer_tiers(id)
        ) $charset_collate;";
        dbDelta($sql_orders);

        // Extend wholesale applications table to support dealer tier
        $this->extend_wholesale_table();

        // Insert default dealer tiers
        $this->insert_default_tiers();
    }

    /**
     * Extend wholesale applications table with dealer fields
     */
    private function extend_wholesale_table() {
        global $wpdb;
        $table_wholesale = $wpdb->prefix . 'sakwood_wholesale_applications';

        // Check if table exists
        $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_wholesale'");

        if ($table_exists) {
            // Add dealer_tier_id column if it doesn't exist
            $column_exists = $wpdb->get_var(
                "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = DATABASE()
                AND TABLE_NAME = '$table_wholesale'
                AND COLUMN_NAME = 'dealer_tier_id'"
            );

            if (!$column_exists) {
                $wpdb->query(
                    "ALTER TABLE $table_wholesale
                    ADD COLUMN dealer_tier_id INT NULL,
                    ADD COLUMN is_dealer BOOLEAN DEFAULT FALSE,
                    ADD COLUMN dealer_territories TEXT NULL,
                    ADD FOREIGN KEY (dealer_tier_id) REFERENCES {$wpdb->prefix}sakwood_dealer_tiers(id)"
                );
            }
        }
    }

    /**
     * Insert default dealer tiers
     */
    private function insert_default_tiers() {
        global $wpdb;
        $table_tiers = $wpdb->prefix . 'sakwood_dealer_tiers';

        // Check if tiers already exist
        $existing = $wpdb->get_var("SELECT COUNT(*) FROM $table_tiers");

        if ($existing == 0) {
            // Silver Tier
            $wpdb->insert(
                $table_tiers,
                array(
                    'tier_name' => 'silver',
                    'discount_percentage' => 20.00,
                    'min_order_amount' => 50000,
                    'min_order_quantity' => 50,
                    'credit_multiplier' => 1.5,
                    'territory_required' => true,
                    'benefits' => json_encode(array(
                        '20% discount on all products',
                        'Minimum order: 50,000 THB',
                        'Territory assignment available',
                        'Credit limit: 1.5x standard wholesale',
                        'Standard support'
                    )),
                    'requirements' => json_encode(array(
                        'Active wholesale customer',
                        'Minimum 1 year in business',
                        'Storage facility proof',
                        '2 trade references'
                    )),
                    'is_active' => true
                )
            );

            // Gold Tier
            $wpdb->insert(
                $table_tiers,
                array(
                    'tier_name' => 'gold',
                    'discount_percentage' => 25.00,
                    'min_order_amount' => 100000,
                    'min_order_quantity' => 100,
                    'credit_multiplier' => 2.0,
                    'territory_required' => true,
                    'benefits' => json_encode(array(
                        '25% discount on all products',
                        'Minimum order: 100,000 THB',
                        'Exclusive territory options',
                        'Credit limit: 2x standard wholesale',
                        'Priority support',
                        'Marketing materials'
                    )),
                    'requirements' => json_encode(array(
                        'Active wholesale customer for 6+ months',
                        'Minimum 2 years in business',
                        'Storage facility >100 sqm',
                        '5+ trade references',
                        'Monthly sales capacity 100k+ THB'
                    )),
                    'is_active' => true
                )
            );

            // Platinum Tier
            $wpdb->insert(
                $table_tiers,
                array(
                    'tier_name' => 'platinum',
                    'discount_percentage' => 30.00,
                    'min_order_amount' => 200000,
                    'min_order_quantity' => 200,
                    'credit_multiplier' => 3.0,
                    'territory_required' => true,
                    'benefits' => json_encode(array(
                        '30% discount on all products',
                        'Minimum order: 200,000 THB',
                        'Multiple exclusive territories',
                        'Credit limit: 3x standard wholesale',
                        'Dedicated account manager',
                        'Full marketing support',
                        'Product training',
                        'Lead generation support'
                    )),
                    'requirements' => json_encode(array(
                        'Active wholesale customer for 12+ months',
                        'Minimum 3 years in business',
                        'Large storage facility >200 sqm',
                        '10+ trade references',
                        'Monthly sales capacity 500k+ THB',
                        'Delivery fleet documentation',
                        'Strong industry reputation'
                    )),
                    'is_active' => true
                )
            );
        }
    }

    /**
     * Get dealer tier by ID
     */
    public static function get_dealer_tier($tier_id) {
        global $wpdb;
        $table_tiers = $wpdb->prefix . 'sakwood_dealer_tiers';

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_tiers WHERE id = %d",
                $tier_id
            ),
            ARRAY_A
        );
    }

    /**
     * Get dealer tier by name
     */
    public static function get_dealer_tier_by_name($tier_name) {
        global $wpdb;
        $table_tiers = $wpdb->prefix . 'sakwood_dealer_tiers';

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_tiers WHERE tier_name = %s",
                $tier_name
            ),
            ARRAY_A
        );
    }

    /**
     * Get all active dealer tiers
     */
    public static function get_all_dealer_tiers() {
        global $wpdb;
        $table_tiers = $wpdb->prefix . 'sakwood_dealer_tiers';

        return $wpdb->get_results(
            "SELECT * FROM $table_tiers WHERE is_active = 1 ORDER BY discount_percentage ASC",
            ARRAY_A
        );
    }

    /**
     * Get dealer application by ID
     */
    public static function get_dealer_application($application_id) {
        global $wpdb;
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_applications WHERE application_id = %s",
                $application_id
            ),
            ARRAY_A
        );
    }

    /**
     * Get dealer applications by user ID
     */
    public static function get_user_dealer_applications($user_id) {
        global $wpdb;
        $table_applications = $wpdb->prefix . 'sakwood_dealer_applications';

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_applications WHERE user_id = %d ORDER BY submitted_date DESC",
                $user_id
            ),
            ARRAY_A
        );
    }

    /**
     * Get dealer territories by user ID
     */
    public static function get_dealer_territories($user_id) {
        global $wpdb;
        $table_territories = $wpdb->prefix . 'sakwood_dealer_territories';

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_territories WHERE user_id = %d AND (expiry_date IS NULL OR expiry_date > NOW())",
                $user_id
            ),
            ARRAY_A
        );
    }

    /**
     * Check if territory is available for assignment
     */
    public static function is_territory_available($province, $exclude_dealer_id = null) {
        global $wpdb;
        $table_territories = $wpdb->prefix . 'sakwood_dealer_territories';

        // Sanitize input
        $province = sanitize_text_field($province);
        $exclude_dealer_id = $exclude_dealer_id ? intval($exclude_dealer_id) : null;

        if ($exclude_dealer_id) {
            $count = $wpdb->get_var($wpdb->prepare(
                "SELECT COUNT(*) FROM $table_territories
                 WHERE province = %s
                 AND is_exclusive = 1
                 AND (expiry_date IS NULL OR expiry_date > NOW())
                 AND dealer_id != %d",
                $province,
                $exclude_dealer_id
            ));
        } else {
            $count = $wpdb->get_var($wpdb->prepare(
                "SELECT COUNT(*) FROM $table_territories
                 WHERE province = %s
                 AND is_exclusive = 1
                 AND (expiry_date IS NULL OR expiry_date > NOW())",
                $province
            ));
        }

        return intval($count) === 0;
    }

    /**
     * Get dealer orders by user ID
     */
    public static function get_dealer_orders($user_id, $limit = 20) {
        global $wpdb;
        $table_orders = $wpdb->prefix . 'sakwood_dealer_orders';

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_orders WHERE user_id = %d ORDER BY created_at DESC LIMIT %d",
                $user_id,
                $limit
            ),
            ARRAY_A
        );
    }
}

// Initialize the dealer database
new Sakwood_Dealer_Database();
