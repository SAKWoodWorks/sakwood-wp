<?php
/**
 * Contact Form API
 * Handles contact form submissions
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Sakwood_Contact_Form_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Contact form submission endpoint
        register_rest_route('headless/v1', '/submit', array(
            'methods' => 'POST',
            'callback' => array($this, 'submit_contact_form'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Handle contact form submission
     *
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function submit_contact_form($request) {
        // Get parameters from request
        $params = $request->get_params();

        // Validate required fields
        if (empty($params['names']) || empty($params['email']) || empty($params['message'])) {
            return new WP_Error(
                'missing_fields',
                'Please fill in all required fields.',
                array('status' => 400)
            );
        }

        // Sanitize input
        $name = sanitize_text_field($params['names']);
        $email = sanitize_email($params['email']);
        $phone = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';
        $company = isset($params['company']) ? sanitize_text_field($params['company']) : '';
        $subject = isset($params['subject']) ? sanitize_text_field($params['subject']) : 'Contact Form Submission';
        $message = sanitize_textarea_field($params['message']);

        // Validate email
        if (!is_email($email)) {
            return new WP_Error(
                'invalid_email',
                'Please provide a valid email address.',
                array('status' => 400)
            );
        }

        // Create post for contact submission (optional - for record keeping)
        $post_data = array(
            'post_title'   => $subject,
            'post_content' => $message,
            'post_status'  => 'private',
            'post_type'    => 'contact_submission',
            'post_author'  => 1,
        );

        // Insert post if custom post type exists, otherwise skip
        if (post_type_exists('contact_submission')) {
            $post_id = wp_insert_post($post_data);

            if (!is_wp_error($post_id)) {
                // Add meta data
                update_post_meta($post_id, 'contact_name', $name);
                update_post_meta($post_id, 'contact_email', $email);
                update_post_meta($post_id, 'contact_phone', $phone);
                update_post_meta($post_id, 'contact_company', $company);
                update_post_meta($post_id, 'submission_date', current_time('mysql'));
            }
        }

        // Send email notification
        $to = get_option('admin_email');
        $subject = sprintf('[%s] %s', get_bloginfo('name'), $subject);

        $email_message = "You have received a new contact form submission:\n\n";
        $email_message .= "Name: $name\n";
        $email_message .= "Email: $email\n";
        if (!empty($phone)) {
            $email_message .= "Phone: $phone\n";
        }
        if (!empty($company)) {
            $email_message .= "Company: $company\n";
        }
        $email_message .= "\nMessage:\n$message\n";

        $headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            'From: ' . $name . ' <' . $email . '>',
            'Reply-To: ' . $email,
        );

        $email_sent = wp_mail($to, $subject, $email_message, $headers);

        // Return response
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Thank you for your message. We will get back to you soon.',
            'data' => array(
                'name' => $name,
                'email' => $email,
                'subject' => $subject,
                'email_sent' => $email_sent,
            ),
        ), 200);
    }
}

// Initialize the contact form API
new Sakwood_Contact_Form_API();
