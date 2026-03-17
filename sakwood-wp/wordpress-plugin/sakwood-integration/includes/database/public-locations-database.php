<?php
/**
 * Public Locations Database
 *
 * Creates and manages public distributor/branch location tables
 * (Does not require user accounts - for showing branches, dealers, retail partners)
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Sakwood_Public_Locations_Database {

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
        if (get_option('sakwood_public_locations_db_version') !== '1.0') {
            $this->create_tables();
            update_option('sakwood_public_locations_db_version', '1.0');
        }
    }

    /**
     * Create public locations table
     */
    private function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // Table: Public Distributor/Branch Locations
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';
        $sql_locations = "CREATE TABLE $table_locations (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            suite_shop VARCHAR(255),
            province VARCHAR(100) NOT NULL,
            district VARCHAR(100),
            postal_code VARCHAR(10),
            phone VARCHAR(50),
            website VARCHAR(255),
            business_hours TEXT,
            email VARCHAR(255),
            image_url VARCHAR(500),
            latitude DECIMAL(10, 8) NOT NULL,
            longitude DECIMAL(11, 8) NOT NULL,
            category VARCHAR(50) NOT NULL,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_category (category),
            INDEX idx_province (province),
            INDEX idx_is_active (is_active)
        ) $charset_collate;";
        dbDelta($sql_locations);
    }

    /**
     * Get all public locations
     */
    public static function get_all_public_locations($category = null, $province = null) {
        global $wpdb;
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';

        $where = array('is_active = 1');
        $params = array();

        if ($category) {
            $where[] = 'category = %s';
            $params[] = $category;
        }

        if ($province) {
            $where[] = 'province = %s';
            $params[] = $province;
        }

        $where_clause = implode(' AND ', $where);

        if (!empty($params)) {
            $locations = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT * FROM $table_locations WHERE $where_clause ORDER BY name ASC",
                    ...$params
                ),
                ARRAY_A
            );
        } else {
            $locations = $wpdb->get_results(
                "SELECT * FROM $table_locations WHERE $where_clause ORDER BY name ASC",
                ARRAY_A
            );
        }

        return $locations;
    }

    /**
     * Insert or update public location
     */
    public static function save_public_location($location_data) {
        global $wpdb;
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';

        // Check if location already exists by name and coordinates
        $existing = $wpdb->get_row($wpdb->prepare(
            "SELECT id FROM $table_locations WHERE name = %s AND latitude = %f AND longitude = %f",
            $location_data['name'],
            floatval($location_data['latitude']),
            floatval($location_data['longitude'])
        ), ARRAY_A);

        $data = array(
            'name' => sanitize_text_field($location_data['name']),
            'address' => sanitize_textarea_field($location_data['address']),
            'suite_shop' => isset($location_data['suite_shop']) ? sanitize_text_field($location_data['suite_shop']) : null,
            'province' => sanitize_text_field($location_data['province']),
            'district' => isset($location_data['district']) ? sanitize_text_field($location_data['district']) : null,
            'postal_code' => isset($location_data['postal_code']) ? sanitize_text_field($location_data['postal_code']) : null,
            'phone' => sanitize_text_field($location_data['phone']),
            'website' => isset($location_data['website']) ? esc_url_raw($location_data['website']) : null,
            'business_hours' => isset($location_data['business_hours']) ? sanitize_textarea_field($location_data['business_hours']) : null,
            'email' => isset($location_data['email']) ? sanitize_email($location_data['email']) : null,
            'image_url' => isset($location_data['image_url']) ? esc_url_raw($location_data['image_url']) : null,
            'latitude' => floatval($location_data['latitude']),
            'longitude' => floatval($location_data['longitude']),
            'category' => sanitize_text_field($location_data['category']),
            'is_active' => isset($location_data['is_active']) ? boolval($location_data['is_active']) : true,
        );

        if ($existing) {
            $result = $wpdb->update(
                $table_locations,
                $data,
                array('id' => $existing['id']),
                array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%f', '%f', '%s', '%d'),
                array('%d')
            );
        } else {
            $result = $wpdb->insert(
                $table_locations,
                $data,
                array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%f', '%f', '%s', '%d')
            );
        }

        return $result !== false;
    }

    /**
     * Delete all public locations (useful for re-import)
     */
    public static function delete_all_public_locations() {
        global $wpdb;
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';
        return $wpdb->query("TRUNCATE TABLE $table_locations");
    }

    /**
     * Get location categories
     */
    public static function get_categories() {
        global $wpdb;
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';

        $categories = $wpdb->get_col(
            "SELECT DISTINCT category FROM $table_locations WHERE is_active = 1 ORDER BY category ASC"
        );

        return $categories;
    }

    /**
     * Get provinces
     */
    public static function get_provinces() {
        global $wpdb;
        $table_locations = $wpdb->prefix . 'sakwood_public_locations';

        $provinces = $wpdb->get_col(
            "SELECT DISTINCT province FROM $table_locations WHERE is_active = 1 ORDER BY province ASC"
        );

        return $provinces;
    }
}

// Initialize the public locations database
new Sakwood_Public_Locations_Database();
