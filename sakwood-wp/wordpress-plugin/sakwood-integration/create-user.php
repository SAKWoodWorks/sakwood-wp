<?php
/**
 * One-time script to create a test user
 * Run this by visiting: /wp-admin/admin.php?page=create_test_user
 */

if (!defined('ABSPATH')) {
    exit;
}

// Prevent direct access
if (!defined('WP_ADMIN')) {
    // Allow running via URL for testing
    add_action('admin_init', function() {
        if (isset($_GET['create_test_user']) && current_user_can('manage_options')) {
            $username = 'testuser';
            $password = 'test123';
            $email = 'test@sakwood.com';

            // Check if user exists
            if (username_exists($username)) {
                wp_die('User already exists');
            }

            // Create user
            $user_id = wp_create_user($username, $password, $email);

            if (is_wp_error($user_id)) {
                wp_die('Error creating user: ' . $user_id->get_error_message());
            }

            // Update user meta
            wp_update_user(array(
                'ID' => $user_id,
                'first_name' => 'Test',
                'last_name' => 'User',
            ));

            wp_die('User created successfully! Username: testuser, Password: test123');
        }
    });
}
