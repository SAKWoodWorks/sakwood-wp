<?php
/**
 * Blog Language Meta Box
 * Adds language selection to post editor
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Blog_Language_Meta_Box {

    public function __construct() {
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post', array($this, 'save_meta_box'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
    }

    /**
     * Add meta box to post editor
     */
    public function add_meta_box() {
        add_meta_box(
            'sakwood_post_language',
            __('Post Language', 'sakwood-integration'),
            array($this, 'render_meta_box'),
            'post',
            'side',
            'default'
        );
    }

    /**
     * Render meta box content
     */
    public function render_meta_box($post) {
        wp_nonce_field('sakwood_post_language_nonce', 'sakwood_post_language_nonce');

        $current_language = get_post_meta($post->ID, 'post_language', true);
        if (empty($current_language)) {
            $current_language = 'th'; // Default to English
        }

        $languages = array(
            'en' => array(
                'label' => __('English', 'sakwood-integration'),
                'flag' => '🇬🇧'
            ),
            'th' => array(
                'label' => __('Thai', 'sakwood-integration'),
                'flag' => '🇹🇭'
            )
        );
        ?>

        <div class="sakwood-language-selector">
            <?php foreach ($languages as $lang_code => $lang_data): ?>
                <label class="sakwood-language-option <?php echo $current_language === $lang_code ? 'active' : ''; ?>">
                    <input type="radio"
                           name="post_language"
                           value="<?php echo esc_attr($lang_code); ?>"
                           <?php checked($current_language, $lang_code); ?>
                    />
                    <span class="language-flag"><?php echo esc_html($lang_data['flag']); ?></span>
                    <span class="language-label"><?php echo esc_html($lang_data['label']); ?></span>
                </label>
            <?php endforeach; ?>
        </div>

        <p class="description">
            <?php _e('Select the language for this post. It will only be shown on the corresponding language version of the site.', 'sakwood-integration'); ?>
        </p>

        <style>
            .sakwood-language-selector {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .sakwood-language-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                border: 2px solid #ddd;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .sakwood-language-option:hover {
                border-color: #2271b1;
                background-color: #f0f6fc;
            }

            .sakwood-language-option.active {
                border-color: #2271b1;
                background-color: #e7f3ff;
            }

            .sakwood-language-option input[type="radio"] {
                margin: 0;
            }

            .language-flag {
                font-size: 24px;
                line-height: 1;
            }

            .language-label {
                font-weight: 500;
            }

            .sakwood-language-selector + .description {
                margin-top: 12px;
                font-style: italic;
                color: #646970;
            }
        </style>

        <script>
            jQuery(document).ready(function($) {
                $('.sakwood-language-option').on('click', function() {
                    $('.sakwood-language-option').removeClass('active');
                    $(this).addClass('active');
                    $(this).find('input[type="radio"]').prop('checked', true);
                });
            });
        </script>
        <?php
    }

    /**
     * Save meta box data
     */
    public function save_meta_box($post_id) {
        // Check nonce
        if (!isset($_POST['sakwood_post_language_nonce']) ||
            !wp_verify_nonce($_POST['sakwood_post_language_nonce'], 'sakwood_post_language_nonce')) {
            return;
        }

        // Check autosave
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        // Check permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Save language
        if (isset($_POST['post_language'])) {
            $language = sanitize_text_field($_POST['post_language']);
            // Only allow 'en' or 'th'
            if (in_array($language, array('en', 'th'))) {
                update_post_meta($post_id, 'post_language', $language);
            }
        }
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_scripts($hook) {
        // Only load on post edit screen
        if ('post.php' !== $hook && 'post-new.php' !== $hook) {
            return;
        }

        // jQuery is already available in WordPress admin
    }
}

// Initialize
new Sakwood_Blog_Language_Meta_Box();
