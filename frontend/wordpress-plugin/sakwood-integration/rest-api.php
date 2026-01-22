<?php
add_action('rest_api_init', function () {
    register_rest_route('sakwood/v1', '/register', [
        'methods' => 'POST',
        'callback' => 'sakwood_handle_user_registration',
        'permission_callback' => '__return_true',
    ]);
});

function sakwood_handle_user_registration($request) {
    $params = $request->get_json_params();
    
    $username = sanitize_text_field($params['username'] ?? '');
    $email = sanitize_email($params['email'] ?? '');
    $password = $params['password'] ?? '';
    $first_name = sanitize_text_field($params['first_name'] ?? '');
    $last_name = sanitize_text_field($params['last_name'] ?? '');
    
    if (empty($username) || empty($email) || empty($password)) {
        return new WP_Error('missing_fields', 'Username, email, and password are required', ['status' => 400]);
    }
    
    if (username_exists($username)) {
        return new WP_Error('username_exists', 'Username already exists', ['status' => 400]);
    }
    
    if (email_exists($email)) {
        return new WP_Error('email_exists', 'Email already exists', ['status' => 400]);
    }
    
    if (strlen($password) < 6) {
        return new WP_Error('password_too_short', 'Password must be at least 6 characters', ['status' => 400]);
    }
    
    $user_id = wp_create_user($username, $password, $email);
    
    if (is_wp_error($user_id)) {
        return $user_id;
    }
    
    if (!empty($first_name)) {
        update_user_meta($user_id, 'first_name', $first_name);
        wp_update_user(['ID' => $user_id, 'display_name' => $first_name . ' ' . $last_name]);
    }
    
    if (!empty($last_name)) {
        update_user_meta($user_id, 'last_name', $last_name);
    }
    
    $user = get_user_by('id', $user_id);
    
    return [
        'success' => true,
        'user_id' => $user_id,
        'username' => $user->user_login,
        'email' => $user->user_email,
        'first_name' => get_user_meta($user_id, 'first_name', true),
        'last_name' => get_user_meta($user_id, 'last_name', true),
        'name' => $user->display_name,
    ];
}
