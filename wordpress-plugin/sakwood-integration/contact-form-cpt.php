<?php
/**
 * Contact Form Submissions - Custom Post Type
 * Stores contact form submissions in WordPress database
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Contact_Form_CPT {

    public function __construct() {
        add_action('init', array($this, 'register_post_type'));
        add_action('add_meta_boxes', array($this, 'add_meta_boxes'));
        add_filter('manage_contact_submission_posts_columns', array($this, 'set_custom_columns'));
        add_action('manage_contact_submission_posts_custom_column', array($this, 'custom_column_content'), 10, 2);
    }

    /**
     * Register Contact Submission Custom Post Type
     */
    public function register_post_type() {
        $labels = array(
            'name'                  => 'Contact Submissions',
            'singular_name'         => 'Contact Submission',
            'menu_name'             => 'Contact Messages',
            'add_new'               => 'Add New',
            'add_new_item'          => 'Add New Submission',
            'edit_item'             => 'Edit Submission',
            'new_item'              => 'New Submission',
            'view_item'             => 'View Submission',
            'search_items'          => 'Search Submissions',
            'not_found'             => 'No submissions found',
            'not_found_in_trash'    => 'No submissions found in Trash',
        );

        $args = array(
            'labels'              => $labels,
            'public'              => false,
            'publicly_queryable'  => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'query_var'           => true,
            'rewrite'             => false,
            'capability_type'     => 'post',
            'has_archive'         => false,
            'hierarchical'        => false,
            'menu_position'       => 25,
            'menu_icon'           => 'dashicons-email',
            'supports'            => array('title', 'editor'),
        );

        register_post_type('contact_submission', $args);
    }

    /**
     * Add Meta Boxes for Contact Details
     */
    public function add_meta_boxes() {
        add_meta_box(
            'contact_details',
            'Contact Information',
            array($this, 'render_meta_box'),
            'contact_submission',
            'normal',
            'high'
        );
    }

    /**
     * Render Meta Box Content
     */
    public function render_meta_box($post) {
        // Add nonce for security
        wp_nonce_field('contact_submission_meta_box', 'contact_submission_meta_box_nonce');

        // Get current values
        $name = get_post_meta($post->ID, 'contact_name', true);
        $email = get_post_meta($post->ID, 'contact_email', true);
        $phone = get_post_meta($post->ID, 'contact_phone', true);
        $company = get_post_meta($post->ID, 'contact_company', true);
        $submission_date = get_post_meta($post->ID, 'submission_date', true);

        echo '<div class="contact-details-meta">';
        echo '<p><strong>Name:</strong> ' . esc_html($name) . '</p>';
        echo '<p><strong>Email:</strong> <a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a></p>';

        if (!empty($phone)) {
            echo '<p><strong>Phone:</strong> <a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a></p>';
        }

        if (!empty($company)) {
            echo '<p><strong>Company:</strong> ' . esc_html($company) . '</p>';
        }

        if (!empty($submission_date)) {
            echo '<p><strong>Submitted:</strong> ' . esc_html($submission_date) . '</p>';
        }

        echo '</div>';
    }

    /**
     * Set Custom Columns for Admin Table
     */
    public function set_custom_columns($columns) {
        $new_columns = array();
        $new_columns['cb'] = $columns['cb'];
        $new_columns['title'] = 'Subject';
        $new_columns['name'] = 'Name';
        $new_columns['email'] = 'Email';
        $new_columns['phone'] = 'Phone';
        $new_columns['date'] = 'Date';

        return $new_columns;
    }

    /**
     * Display Custom Column Content
     */
    public function custom_column_content($column, $post_id) {
        switch ($column) {
            case 'name':
                echo esc_html(get_post_meta($post_id, 'contact_name', true));
                break;
            case 'email':
                $email = get_post_meta($post_id, 'contact_email', true);
                echo '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>';
                break;
            case 'phone':
                $phone = get_post_meta($post_id, 'contact_phone', true);
                if (!empty($phone)) {
                    echo esc_html($phone);
                }
                break;
        }
    }
}

// Initialize the CPT
new Sakwood_Contact_Form_CPT();
