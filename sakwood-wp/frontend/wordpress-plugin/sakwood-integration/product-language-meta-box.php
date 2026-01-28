<?php
/**
 * Product Language Meta Box for WooCommerce
 * Adds language selection to WooCommerce product editor
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_Language_Meta_Box {

    public function __construct() {
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post_product', array($this, 'save_meta_box'));
    }

    /**
     * Add meta box to product editor
     */
    public function add_meta_box() {
        add_meta_box(
            'sakwood_product_language',
            __('Product Language', 'sakwood-integration'),
            array($this, 'render_meta_box'),
            'product',
            'side',
            'default'
        );
    }

    /**
     * Render meta box content
     */
    public function render_meta_box($post) {
        wp_nonce_field('sakwood_product_language_nonce', 'sakwood_product_language_nonce');

        $current_language = get_post_meta($post->ID, 'product_language', true);
        if (empty($current_language)) {
            $current_language = 'th'; // Default to Thai for products
        }

        $languages = array(
            'th' => array(
                'label' => __('Thai', 'sakwood-integration'),
                'flag' => '🇹🇭'
            ),
            'en' => array(
                'label' => __('English', 'sakwood-integration'),
                'flag' => '🇬🇧'
            )
        );
        ?>

        <div class="sakwood-product-language-selector">
            <p class="description" style="margin-bottom: 12px;">
                <?php _e('Select the language for this product. It will only be shown on the corresponding language version of the site.', 'sakwood-integration'); ?>
            </p>

            <?php foreach ($languages as $lang_code => $lang_data): ?>
                <label class="sakwood-language-option <?php echo $current_language === $lang_code ? 'active' : ''; ?>">
                    <input type="radio"
                           name="product_language"
                           value="<?php echo esc_attr($lang_code); ?>"
                           <?php checked($current_language, $lang_code); ?>
                    />
                    <span class="language-flag"><?php echo esc_html($lang_data['flag']); ?></span>
                    <span class="language-label"><?php echo esc_html($lang_data['label']); ?></span>
                </label>
            <?php endforeach; ?>

            <div class="sakwood-language-info" style="margin-top: 12px; padding: 8px; background: #f0f6fc; border-left: 3px solid #2271b1;">
                <p style="margin: 0; font-size: 12px; color: #446488;">
                    <strong><?php _e('Note:', 'sakwood-integration'); ?></strong>
                    <?php _e('Product prices and inventory are shared across languages. Only names, descriptions, and attributes are language-specific.', 'sakwood-integration'); ?>
                </p>
            </div>
        </div>

        <style>
            .sakwood-product-language-selector {
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
        if (!isset($_POST['sakwood_product_language_nonce'])) {
            return $post_id;
        }

        if (!wp_verify_nonce($_POST['sakwood_product_language_nonce'], 'sakwood_product_language_nonce')) {
            return $post_id;
        }

        // Check autosave
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return $post_id;
        }

        // Check permissions
        if (!current_user_can('edit_post', $post_id)) {
            return $post_id;
        }

        // Save language
        if (isset($_POST['product_language'])) {
            $language = sanitize_text_field($_POST['product_language']);
            // Only allow 'en' or 'th'
            if (in_array($language, array('en', 'th'))) {
                update_post_meta($post_id, 'product_language', $language);
            }
        }

        return $post_id;
    }
}

// Initialize
new Sakwood_Product_Language_Meta_Box();
