<?php
/**
 * User Roles Management
 *
 * Defines custom WordPress roles and capabilities for Sakwood
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_User_Roles {

    /**
     * Constructor
     */
    public function __construct() {
        // Register custom capabilities mapping
        add_filter('user_has_cap', array($this, 'add_wholesale_capabilities'), 10, 3);
    }

    /**
     * Register all custom roles
     * Called from plugin activation hook
     */
    public static function register_roles() {
        // Role 1: E-commerce Admin (Shop Manager Plus)
        // Can manage WooCommerce but NOT WordPress settings
        add_role(
            'shop_manager_plus',
            __('E-commerce Admin', 'sakwood-integration'),
            self::get_shop_manager_plus_caps()
        );

        // Role 2: Wholesale Manager
        // Can approve applications and manage wholesale customers
        add_role(
            'wholesale_manager',
            __('Wholesale Manager', 'sakwood-integration'),
            self::get_wholesale_manager_caps()
        );

        // Role 3: Enhanced Wholesale Customer
        // B2B customer with self-service features
        add_role(
            'wholesale_customer_plus',
            __('Wholesale Customer Plus', 'sakwood-integration'),
            self::get_wholesale_customer_plus_caps()
        );

        // Update existing wholesale_customer role with enhanced capabilities
        $role = get_role('wholesale_customer');
        if ($role) {
            $caps = self::get_wholesale_customer_plus_caps();
            foreach ($caps as $cap => $grant) {
                $role->add_cap($cap);
            }
        }
    }

    /**
     * Get capabilities for Shop Manager Plus (E-commerce Admin)
     */
    private static function get_shop_manager_plus_caps() {
        return array(
            // Core
            'read' => true,

            // WooCommerce management
            'manage_woocommerce' => true,
            'view_woocommerce_reports' => true,
            'manage_product_terms' => true,
            'edit_products' => true,
            'read_product' => true,
            'delete_products' => true,
            'edit_shop_orders' => true,
            'read_shop_orders' => true,
            'delete_shop_orders' => true,
            'publish_shop_orders' => true,
            'edit_shop_coupon' => true,
            'read_shop_coupon' => true,
            'delete_shop_coupon' => true,
            'edit_shop_discounts' => true,
            'manage_woocommerce_tax' => true,
            'manage_woocommerce_settings' => true,

            // Product categories/tags
            'manage_product_categories' => true,
            'manage_product_tags' => true,

            // Read-only access to users (can view, not edit)
            'list_users' => true,
            'read' => true,

            // Upload media for products
            'upload_files' => true,
            'edit_files' => true,
        );
    }

    /**
     * Get capabilities for Wholesale Manager
     */
    private static function get_wholesale_manager_caps() {
        return array(
            // Core
            'read' => true,

            // Wholesale custom capabilities
            'edit_wholesale_applications' => true,
            'approve_wholesale_applications' => true,
            'manage_wholesale_credits' => true,
            'view_wholesale_reports' => true,

            // Read-only WooCommerce
            'read_product' => true,
            'read_shop_orders' => true,

            // List users only (for viewing wholesale customers)
            'list_users' => true,

            // Upload files (for application documents)
            'upload_files' => true,
        );
    }

    /**
     * Get capabilities for Enhanced Wholesale Customer
     */
    private static function get_wholesale_customer_plus_caps() {
        return array(
            // Core
            'read' => true,

            // E-commerce
            'read_product' => true,
            'read_shop_order' => true,
            'publish_shop_orders' => true,

            // Wholesale custom capabilities
            'view_wholesale_pricing' => true,
            'apply_for_credit' => true,
            'view_own_credit_status' => true,
            'download_invoices' => true,

            // Self-service
            'edit_own_profile' => true,
            'change_own_password' => true,
        );
    }

    /**
     * Add wholesale capabilities dynamically
     * Maps custom capabilities to user roles
     */
    public function add_wholesale_capabilities($allcaps, $cap, $args) {
        $user_id = isset($args[1]) ? $args[1] : 0;
        $user = get_userdata($user_id);

        if (!$user) {
            return $allcaps;
        }

        // Wholesale Manager capabilities
        if (in_array('wholesale_manager', $user->roles)) {
            $wholesale_manager_caps = array(
                'edit_wholesale_applications',
                'approve_wholesale_applications',
                'manage_wholesale_credits',
                'view_wholesale_reports',
                'read_product',
                'read_shop_orders',
            );

            foreach ($wholesale_manager_caps as $wholesale_cap) {
                if (in_array($wholesale_cap, $cap)) {
                    $allcaps[$wholesale_cap] = true;
                }
            }
        }

        // Wholesale Customer capabilities
        if (in_array('wholesale_customer', $user->roles) ||
            in_array('wholesale_customer_plus', $user->roles)) {
            $customer_caps = array(
                'view_wholesale_pricing',
                'apply_for_credit',
                'view_own_credit_status',
                'download_invoices',
            );

            foreach ($customer_caps as $customer_cap) {
                if (in_array($customer_cap, $cap)) {
                    $allcaps[$customer_cap] = true;
                }
            }
        }

        return $allcaps;
    }
}

// Initialize
new Sakwood_User_Roles();
