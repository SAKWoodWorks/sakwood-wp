<?php
/**
 * Product Language Meta Fields
 *
 * Adds meta fields for English translations of products
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_Language {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('add_meta_boxes', array($this, 'add_language_meta_box'));
        add_action('save_post_product', array($this, 'save_language_meta_box'), 10, 2);
        // Display language indicator on product list
        add_filter('manage_product_posts_columns', array($this, 'add_language_column'));
        add_action('manage_product_posts_custom_column', array($this, 'display_language_column'), 10, 2);
    }

    /**
     * Add language meta box to product edit page
     */
    public function add_language_meta_box() {
        add_meta_box(
            'product_language_fields',
            __('English Translation', 'sakwood-integration'),
            array($this, 'render_language_meta_box'),
            'product',
            'normal',
            'high'
        );
    }

    /**
     * Render language meta box content
     */
    public function render_language_meta_box($post) {
        wp_nonce_field('product_language_nonce', 'product_language_nonce');

        // Get existing English translations
        $title_en = get_post_meta($post->ID, '_product_title_en', true);
        $description_en = get_post_meta($post->ID, '_product_description_en', true);
        $short_description_en = get_post_meta($post->ID, '_product_short_description_en', true);

        ?>
        <div class="product-language-meta-box">
            <p class="description">
                <?php _e('Enter the English translation for this product below. The Thai content is entered in the main product fields above.', 'sakwood-integration'); ?>
            </p>

            <table class="form-table">
                <tr>
                    <th><label for="_product_title_en"><?php _e('Product Name (English)', 'sakwood-integration'); ?></label></th>
                    <td>
                        <input
                            type="text"
                            id="_product_title_en"
                            name="_product_title_en"
                            value="<?php echo esc_attr($title_en); ?>"
                            class="large-text"
                        />
                    </td>
                </tr>
                <tr>
                    <th><label for="_product_short_description_en"><?php _e('Short Description (English)', 'sakwood-integration'); ?></label></th>
                    <td>
                        <textarea
                            id="_product_short_description_en"
                            name="_product_short_description_en"
                            rows="5"
                            class="large-text"
                        ><?php echo esc_textarea($short_description_en); ?></textarea>
                    </td>
                </tr>
                <tr>
                    <th><label for="_product_description_en"><?php _e('Full Description (English)', 'sakwood-integration'); ?></label></th>
                    <td>
                        <?php
                        wp_editor(
                            $description_en,
                            '_product_description_en',
                            array(
                                'textarea_name' => '_product_description_en',
                                'media_buttons' => false,
                                'textarea_rows' => 10,
                                'teeny' => true
                            )
                        );
                        ?>
                    </td>
                </tr>
            </table>
        </div>
        <?php
    }

    /**
     * Save language meta box
     */
    public function save_language_meta_box($post_id, $post) {
        // Check nonce
        if (!isset($_POST['product_language_nonce']) ||
            !wp_verify_nonce($_POST['product_language_nonce'], 'product_language_nonce')) {
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

        // Save English translations
        $fields = array(
            '_product_title_en',
            '_product_description_en',
            '_product_short_description_en'
        );

        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, $field, wp_kses_post($_POST[$field]));
            }
        }
    }

    /**
     * Add language column to products list
     */
    public function add_language_column($columns) {
        $columns['product_language'] = __('Languages', 'sakwood-integration');
        return $columns;
    }

    /**
     * Display language column content
     */
    public function display_language_column($column, $post_id) {
        if ($column === 'product_language') {
            $has_th = get_post($post_id)->post_title;
            $has_en = get_post_meta($post_id, '_product_title_en', true);

            $languages = array();
            if ($has_th) $languages[] = '<span style="color:#2271b1">🇹🇭 TH</span>';
            if ($has_en) $languages[] = '<span style="color:#2271b1">🇬🇧 EN</span>';

            if (!empty($languages)) {
                echo implode(' | ', $languages);
            } else {
                echo '<em>' . __('No languages', 'sakwood-integration') . '</em>';
            }
        }
    }
}

// Initialize
new Sakwood_Product_Language();
