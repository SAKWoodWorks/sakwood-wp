<?php
/**
 * Popup Settings API
 *
 * REST API endpoint for promotional popup settings
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Popup_Settings {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('rest_api_init', array($this, 'add_cors_headers'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }

    /**
     * Enqueue admin scripts for media uploader
     */
    public function enqueue_admin_scripts($hook) {
        // Only load on our settings page
        if ('settings_page_sakwood-popup-settings' !== $hook) {
            return;
        }

        wp_enqueue_media();
        wp_enqueue_script('jquery');
    }

    /**
     * Add CORS headers to REST API responses
     */
    public function add_cors_headers() {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function($value) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            return $value;
        });
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        register_rest_route('sakwood/v1', '/popup', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_popup_settings'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('sakwood/v1', '/popup', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_popup_settings'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ));
    }

    /**
     * Get popup settings
     */
    public function get_popup_settings() {
        $defaults = array(
            'enabled' => true,
            'title' => '🎉 Special Offer!',
            'subtitle' => 'Get exclusive discount on your first order',
            'discount_code' => 'SAKWOOD15',
            'discount_description' => 'Use this code at checkout:',
            'cta_text' => 'Start Shopping Now',
            'cta_link' => '/shop',
            'image_url' => '',
            'delay' => 3,
        );

        $settings = get_option('sakwood_popup_settings', array());
        $settings = wp_parse_args($settings, $defaults);

        return rest_ensure_response($settings);
    }

    /**
     * Update popup settings
     */
    public function update_popup_settings($request) {
        $params = $request->get_params();

        $settings = array(
            'enabled' => isset($params['enabled']) ? rest_sanitize_boolean($params['enabled']) : false,
            'title' => sanitize_text_field($params['title']),
            'subtitle' => sanitize_text_field($params['subtitle']),
            'discount_code' => sanitize_text_field($params['discount_code']),
            'discount_description' => sanitize_text_field($params['discount_description']),
            'cta_text' => sanitize_text_field($params['cta_text']),
            'cta_link' => esc_url_raw($params['cta_link']),
            'image_url' => esc_url_raw($params['image_url']),
            'delay' => intval($params['delay']),
        );

        update_option('sakwood_popup_settings', $settings);

        return rest_ensure_response($settings);
    }

    /**
     * Add settings page
     */
    public function add_settings_page() {
        add_options_page(
            'Popup Settings',
            'Popup',
            'manage_options',
            'sakwood-popup-settings',
            array($this, 'settings_page')
        );
    }

    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('sakwood_popup', 'sakwood_popup_settings', array(
            'type' => 'array',
            'sanitize_callback' => array($this, 'sanitize_settings'),
        ));
    }

    /**
     * Sanitize settings
     */
    public function sanitize_settings($input) {
        $sanitized = array();

        $sanitized['enabled'] = isset($input['enabled']) ? (bool) $input['enabled'] : false;
        $sanitized['title'] = sanitize_text_field($input['title']);
        $sanitized['subtitle'] = sanitize_text_field($input['subtitle']);
        $sanitized['discount_code'] = sanitize_text_field($input['discount_code']);
        $sanitized['discount_description'] = sanitize_text_field($input['discount_description']);
        $sanitized['cta_text'] = sanitize_text_field($input['cta_text']);
        $sanitized['cta_link'] = esc_url_raw($input['cta_link']);
        $sanitized['image_url'] = esc_url_raw($input['image_url']);
        $sanitized['delay'] = absint($input['delay']);

        return $sanitized;
    }

    /**
     * Settings page HTML
     */
    public function settings_page() {
        $settings = get_option('sakwood_popup_settings', array());
        $settings = wp_parse_args($settings, array(
            'enabled' => false,
            'title' => '',
            'subtitle' => '',
            'discount_code' => '',
            'discount_description' => '',
            'cta_text' => '',
            'cta_link' => '',
            'image_url' => '',
            'delay' => 3,
        ));

        if (isset($_POST['sakwood_popup_settings'])) {
            check_admin_referer('sakwood_popup_options');
            $sanitized = $this->sanitize_settings($_POST['sakwood_popup_settings']);
            update_option('sakwood_popup_settings', $sanitized);
            $settings = $sanitized;
            echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
        }

        ?>
        <div class="wrap">
            <h1>Promotional Popup Settings</h1>

            <form method="post" action="">
                <?php wp_nonce_field('sakwood_popup_options'); ?>

                <table class="form-table">
                    <tr>
                        <th scope="row">Enable Popup</th>
                        <td>
                            <label>
                                <input type="checkbox" name="sakwood_popup_settings[enabled]" value="1" <?php checked($settings['enabled']); ?> />
                                Show promotional popup on site
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Title</th>
                        <td>
                            <input type="text" name="sakwood_popup_settings[title]" value="<?php echo esc_attr($settings['title']); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Subtitle</th>
                        <td>
                            <textarea name="sakwood_popup_settings[subtitle]" rows="2" class="large-text"><?php echo esc_textarea($settings['subtitle']); ?></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Discount Code</th>
                        <td>
                            <input type="text" name="sakwood_popup_settings[discount_code]" value="<?php echo esc_attr($settings['discount_code']); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Discount Description</th>
                        <td>
                            <input type="text" name="sakwood_popup_settings[discount_description]" value="<?php echo esc_attr($settings['discount_description']); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Button Text</th>
                        <td>
                            <input type="text" name="sakwood_popup_settings[cta_text]" value="<?php echo esc_attr($settings['cta_text']); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Button Link</th>
                        <td>
                            <input type="text" name="sakwood_popup_settings[cta_link]" value="<?php echo esc_attr($settings['cta_link']); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Popup Image</th>
                        <td>
                            <div class="popup-image-uploader">
                                <input type="hidden" name="sakwood_popup_settings[image_url]" id="popup_image_url" value="<?php echo esc_attr($settings['image_url']); ?>" />
                                <div id="popup_image_preview" style="margin: 10px 0;">
                                    <?php if (!empty($settings['image_url'])): ?>
                                        <img src="<?php echo esc_url($settings['image_url']); ?>" style="max-width: 300px; height: auto; border: 1px solid #ddd; padding: 5px; background: #f9f9f9;" />
                                    <?php endif; ?>
                                </div>
                                <button type="button" class="button upload-popup-image-button">Upload Image</button>
                                <button type="button" class="button remove-popup-image-button" style="margin-left: 10px; <?php echo empty($settings['image_url']) ? 'display: none;' : ''; ?>">Remove Image</button>
                                <p class="description">Upload an image for the popup background. Recommended size: 1200x600px</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Delay (seconds)</th>
                        <td>
                            <input type="number" name="sakwood_popup_settings[delay]" value="<?php echo esc_attr($settings['delay']); ?>" min="0" max="60" />
                            <p class="description">How long to wait before showing popup</p>
                        </td>
                    </tr>
                </table>

                <?php submit_button('Save Settings'); ?>
            </form>
        </div>

        <script type="text/javascript">
            jQuery(document).ready(function($) {
                // Media uploader for popup image
                $('.upload-popup-image-button').click(function(e) {
                    e.preventDefault();

                    var imageUploader = wp.media({
                        title: 'Select Popup Image',
                        button: {
                            text: 'Use This Image'
                        },
                        multiple: false
                    }).on('select', function() {
                        var attachment = imageUploader.state().get('selection').first().toJSON();
                        $('#popup_image_url').val(attachment.url);
                        $('#popup_image_preview').html('<img src="' + attachment.url + '" style="max-width: 300px; height: auto; border: 1px solid #ddd; padding: 5px; background: #f9f9f9;" />');
                        $('.remove-popup-image-button').show();
                    }).open();
                });

                // Remove image
                $('.remove-popup-image-button').click(function(e) {
                    e.preventDefault();
                    $('#popup_image_url').val('');
                    $('#popup_image_preview').html('');
                    $(this).hide();
                });
            });
        </script>
        <?php
    }
}

// Initialize popup settings
new Sakwood_Popup_Settings();
