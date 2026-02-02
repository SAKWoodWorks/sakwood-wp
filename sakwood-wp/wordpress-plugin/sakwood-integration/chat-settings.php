<?php
/**
 * Chat Settings Admin Panel
 *
 * WordPress admin panel for managing chat platform settings
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Chat_Settings {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));

        // Handle CORS preflight requests
        add_action('rest_api_init', function() {
            remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
            add_filter('rest_pre_serve_request', function($value) {
                header('Access-Control-Allow-Origin: *');
                header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
                header('Access-Control-Allow-Credentials: true');
                header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
                header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');
                return $value;
            });
        }, 15);
    }

    /**
     * Handle OPTIONS requests for CORS
     */
    public function handle_options_request() {
        status_header(200);
        exit();
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        if ('settings_page_sakwood-chat-settings' !== $hook) {
            return;
        }

        wp_enqueue_script('jquery');
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // OPTIONS route for CORS preflight
        register_rest_route('sakwood/v1', '/chat', array(
            'methods' => 'OPTIONS',
            'callback' => array($this, 'handle_options_request'),
            'permission_callback' => '__return_true',
        ));

        // GET route for fetching settings
        register_rest_route('sakwood/v1', '/chat', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_chat_settings'),
            'permission_callback' => '__return_true',
        ));

        // POST route for updating settings
        register_rest_route('sakwood/v1', '/chat', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_chat_settings'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ));
    }

    /**
     * Get chat settings
     */
    public function get_chat_settings() {
        $defaults = $this->get_default_settings();
        $saved = get_option('sakwood_chat_settings', array());
        $settings = wp_parse_args($saved, $defaults);

        // Ensure icons are included from defaults if missing in saved settings
        foreach ($settings['platforms'] as $platform_id => $platform_settings) {
            if (empty($platform_settings['icon']) && isset($defaults['platforms'][$platform_id]['icon'])) {
                $settings['platforms'][$platform_id]['icon'] = $defaults['platforms'][$platform_id]['icon'];
            }

            // Fix call button color from red to black
            if ($platform_id === 'call' && (empty($platform_settings['color']) || $platform_settings['color'] === 'red')) {
                $settings['platforms'][$platform_id]['color'] = 'black';
            }
        }

        return rest_ensure_response($settings);
    }

    /**
     * Update chat settings
     */
    public function update_chat_settings($request) {
        $settings = $request->get_json_params();

        // Validate settings
        $validated = $this->validate_settings($settings);

        // Save to database
        update_option('sakwood_chat_settings', $validated);

        return rest_ensure_response(array(
            'success' => true,
            'settings' => $validated
        ));
    }

    /**
     * Get default settings
     */
    private function get_default_settings() {
        return array(
            'platforms' => array(
                'line' => array(
                    'enabled' => true,
                    'url' => 'https://lin.ee/ucIAvEC',
                    'color' => 'green',
                    'icon' => '/line-logo.png',
                ),
                'telegram' => array(
                    'enabled' => false,
                    'url' => 'https://t.me/yourusername',
                    'color' => 'blue',
                    'icon' => '/telegram-logo.png',
                ),
                'messenger' => array(
                    'enabled' => false,
                    'url' => 'https://m.me/yourpage',
                    'color' => 'indigo',
                    'icon' => '/messenger-logo.png',
                ),
                'call' => array(
                    'enabled' => false,
                    'url' => 'tel:+6621234567',
                    'color' => 'black',
                    'icon' => '/call-logo.png',
                ),
            ),
            'show_tooltip' => true,
            'tooltip_delay' => 3,
            'pulse_duration' => 5,
        );
    }

    /**
     * Validate settings
     */
    private function validate_settings($settings) {
        $validated = array();

        // Validate platforms
        if (isset($settings['platforms']) && is_array($settings['platforms'])) {
            $validated['platforms'] = array();

            $defaults = $this->get_default_settings();

            foreach ($settings['platforms'] as $platform_id => $platform) {
                if (isset($defaults['platforms'][$platform_id])) {
                    $validated['platforms'][$platform_id] = array(
                        'enabled' => isset($platform['enabled']) ? rest_sanitize_boolean($platform['enabled']) : false,
                        'url' => isset($platform['url']) ? esc_url_raw($platform['url']) : '',
                        'color' => isset($platform['color']) ? sanitize_text_field($platform['color']) : 'green',
                        'icon' => isset($platform['icon']) ? sanitize_text_field($platform['icon']) : '',
                    );
                }
            }
        }

        // Validate show_tooltip
        $validated['show_tooltip'] = isset($settings['show_tooltip']) ? rest_sanitize_boolean($settings['show_tooltip']) : true;

        // Validate tooltip_delay
        $validated['tooltip_delay'] = isset($settings['tooltip_delay']) ? intval($settings['tooltip_delay']) : 3;
        $validated['tooltip_delay'] = max(1, min(10, $validated['tooltip_delay']));

        // Validate pulse_duration
        $validated['pulse_duration'] = isset($settings['pulse_duration']) ? intval($settings['pulse_duration']) : 5;
        $validated['pulse_duration'] = max(0, min(10, $validated['pulse_duration']));

        return $validated;
    }

    /**
     * Add settings page to WordPress admin
     */
    public function add_settings_page() {
        add_options_page(
            'Chat Settings',
            'Chat Settings',
            'manage_options',
            'sakwood-chat-settings',
            array($this, 'render_settings_page')
        );
    }

    /**
     * Register WordPress settings
     */
    public function register_settings() {
        register_setting('sakwood_chat', 'sakwood_chat_settings');
    }

    /**
     * Render settings page
     */
    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html('Chat Platform Settings'); ?></h1>

            <div id="sakwood-chat-admin">
                <div class="card">
                    <h2><?php echo esc_html('Chat Platforms'); ?></h2>
                    <p><?php echo esc_html('Configure which chat platforms to display on your website.'); ?></p>

                    <table class="form-table">
                        <tbody>
                            <?php
                            $settings = get_option('sakwood_chat_settings', $this->get_default_settings());
                            $platforms = array(
                                'line' => array('name' => 'LINE', 'icon' => '💬'),
                                'telegram' => array('name' => 'Telegram', 'icon' => '✈️'),
                                'messenger' => array('name' => 'Messenger', 'icon' => '💬'),
                                'call' => array('name' => 'Call', 'icon' => '📞'),
                            );

                            foreach ($platforms as $platform_id => $platform_info) {
                                $platform_settings = isset($settings['platforms'][$platform_id]) ? $settings['platforms'][$platform_id] : array('enabled' => false, 'url' => '');
                                ?>
                                <tr>
                                    <th scope="row">
                                        <?php echo esc_html($platform_info['icon'] . ' ' . $platform_info['name']); ?>
                                    </th>
                                    <td>
                                        <label>
                                            <input type="checkbox"
                                                   name="platforms[<?php echo esc_attr($platform_id); ?>][enabled]"
                                                   value="1"
                                                   <?php checked($platform_settings['enabled'] ?? false, true); ?>>
                                            <?php echo esc_html('Enable'); ?>
                                        </label>
                                        <br>
                                        <label>
                                            <?php echo esc_html('URL:'); ?>
                                            <input type="url"
                                                   name="platforms[<?php echo esc_attr($platform_id); ?>][url]"
                                                   value="<?php echo esc_attr($platform_settings['url'] ?? ''); ?>"
                                                   class="regular-text">
                                        </label>
                                    </td>
                                </tr>
                                <?php
                            }
                            ?>
                        </tbody>
                    </table>

                    <h3><?php echo esc_html('Quick Settings'); ?></h3>
                    <table class="form-table">
                        <tbody>
                            <tr>
                                <th scope="row"><?php echo esc_html('Show Tooltip'); ?></th>
                                <td>
                                    <label>
                                        <input type="checkbox"
                                               name="show_tooltip"
                                               value="1"
                                               <?php checked($settings['show_tooltip'] ?? true, true); ?>>
                                        <?php echo esc_html('Display helpful tooltip when chat buttons appear'); ?>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><?php echo esc_html('Tooltip Delay'); ?></th>
                                <td>
                                    <input type="number"
                                           name="tooltip_delay"
                                           value="<?php echo esc_attr($settings['tooltip_delay'] ?? 3); ?>"
                                           min="1"
                                           max="10">
                                    <?php echo esc_html('seconds (1-10)'); ?>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><?php echo esc_html('Pulse Duration'); ?></th>
                                <td>
                                    <input type="number"
                                           name="pulse_duration"
                                           value="<?php echo esc_attr($settings['pulse_duration'] ?? 5); ?>"
                                           min="0"
                                           max="10">
                                    <?php echo esc_html('seconds (0-10)'); ?>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="submit">
                        <button type="button" id="save-chat-settings" class="button button-primary">
                            <?php echo esc_html('Save Changes'); ?>
                        </button>
                        <span id="save-status" style="margin-left: 10px;"></span>
                    </p>
                </div>
            </div>
        </div>

        <style>
            #sakwood-chat-admin .card {
                background: #fff;
                border: 1px solid #ccd0d4;
                padding: 20px;
                margin-top: 20px;
                max-width: 800px;
            }
            #sakwood-chat-admin h2 {
                margin-top: 0;
            }
            #sakwood-chat-admin .success {
                color: #00a32a;
            }
        </style>

        <script>
        jQuery(document).ready(function($) {
            $('#save-chat-settings').on('click', function() {
                var settings = {
                    platforms: {},
                    show_tooltip: $('input[name="show_tooltip"]').is(':checked'),
                    tooltip_delay: parseInt($('input[name="tooltip_delay"]').val()) || 3,
                    pulse_duration: parseInt($('input[name="pulse_duration"]').val()) || 5
                };

                // Collect platform settings
                $('input[name^="platforms"]').each(function() {
                    var match = $(this).attr('name').match(/platforms\[([^\]]+)\]\[([^\]]+)\]/);
                    if (match) {
                        var platformId = match[1];
                        var field = match[2];

                        if (!settings.platforms[platformId]) {
                            settings.platforms[platformId] = {};
                        }

                        if (field === 'enabled') {
                            settings.platforms[platformId][field] = $(this).is(':checked');
                        } else {
                            settings.platforms[platformId][field] = $(this).val();
                        }
                    }
                });

                // Set default color for call button
                if (settings.platforms.call && !settings.platforms.call.color) {
                    settings.platforms.call.color = 'black';
                }

                // Save via REST API
                $.ajax({
                    url: '<?php echo esc_url(rest_url('sakwood/v1/chat')); ?>',
                    method: 'POST',
                    data: JSON.stringify(settings),
                    contentType: 'application/json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', '<?php echo wp_create_nonce('wp_rest'); ?>');
                    },
                    success: function(response) {
                        $('#save-status').html('<span class="success">✓ Settings saved!</span>');
                        setTimeout(function() {
                            $('#save-status').html('');
                        }, 2000);
                    },
                    error: function(xhr) {
                        $('#save-status').html('<span class="error">Error saving settings. Please try again.</span>');
                    }
                });
            });
        });
        </script>
        <?php
    }
}

// Initialize the chat settings
new Sakwood_Chat_Settings();
