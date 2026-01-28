<?php
/**
 * REST API endpoint for popup settings
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register popup settings REST API endpoint
 */
add_action('rest_api_init', function () {
    register_rest_route('sakwood/v1', '/popup', array(
        'methods' => 'GET',
        'callback' => 'sakwood_get_popup_settings',
        'permission_callback' => '__return_true',
    ));
});

/**
 * Get popup settings
 */
function sakwood_get_popup_settings($request) {
    $image_id = get_option('sakwood_popup_image', 0);
    $image_url = '';

    if ($image_id) {
        $image_url = wp_get_attachment_image_url($image_id, 'full');
    }

    return array(
        'enabled' => (bool) get_option('sakwood_popup_enabled', true),
        'title' => get_option('sakwood_popup_title', 'Special Offer!'),
        'subtitle' => get_option('sakwood_popup_subtitle', 'Check out our latest promotions'),
        'cta_text' => get_option('sakwood_popup_cta_text', 'Learn More'),
        'cta_link' => get_option('sakwood_popup_cta_link', '/shop'),
        'image_url' => $image_url,
        'delay' => (int) get_option('sakwood_popup_delay', 5),
    );
}
