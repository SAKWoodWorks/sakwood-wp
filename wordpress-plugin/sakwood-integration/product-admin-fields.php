<?php
/**
 * Product Admin Fields
 *
 * Adds custom fields to WooCommerce product admin screen
 * - Product Dimensions (Width, Length, Thickness, Volume)
 * - Product Language
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_Admin_Fields {

    /**
     * Constructor
     */
    public function __construct() {
        // Add dimensions meta box to product admin
        add_action('add_meta_boxes', array($this, 'add_dimensions_meta_box'));
        add_action('save_post_product', array($this, 'save_dimensions_meta_box'), 10, 2);
    }

    /**
     * Add dimensions meta box
     */
    public function add_dimensions_meta_box() {
        add_meta_box(
            'product_dimensions_fields',
            __('Product Dimensions', 'sakwood-integration'),
            array($this, 'render_dimensions_meta_box'),
            'product',
            'side',
            'default'
        );
    }

    /**
     * Render dimensions meta box
     */
    public function render_dimensions_meta_box($post) {
        wp_nonce_field('product_dimensions_nonce', 'product_dimensions_nonce');

        $thickness = get_post_meta($post->ID, '_product_thickness', true);
        $width = get_post_meta($post->ID, '_product_width', true);
        $length = get_post_meta($post->ID, '_product_length', true);

        ?>
        <div class="product-dimensions-meta-box">
            <p>
                <label for="_product_thickness"><?php _e('Thickness (cm)', 'sakwood-integration'); ?></label>
                <input
                    type="text"
                    id="_product_thickness"
                    name="_product_thickness"
                    value="<?php echo esc_attr($thickness); ?>"
                    class="large-text"
                    style="width: 100%;"
                />
            </p>
            <p>
                <label for="_product_width"><?php _e('Width (cm)', 'sakwood-integration'); ?></label>
                <input
                    type="text"
                    id="_product_width"
                    name="_product_width"
                    value="<?php echo esc_attr($width); ?>"
                    class="large-text"
                    style="width: 100%;"
                />
            </p>
            <p>
                <label for="_product_length"><?php _e('Length (m)', 'sakwood-integration'); ?></label>
                <input
                    type="text"
                    id="_product_length"
                    name="_product_length"
                    value="<?php echo esc_attr($length); ?>"
                    class="large-text"
                    style="width: 100%;"
                />
            </p>
            <p class="description">
                <?php _e('Enter the dimensions for this product. These will be displayed on the frontend.', 'sakwood-integration'); ?>
            </p>
        </div>
        <?php
    }

    /**
     * Save dimensions meta box
     */
    public function save_dimensions_meta_box($post_id, $post) {
        // Check nonce
        if (!isset($_POST['product_dimensions_nonce']) ||
            !wp_verify_nonce($_POST['product_dimensions_nonce'], 'product_dimensions_nonce')) {
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

        // Save dimension fields
        $fields = array('_product_thickness', '_product_width', '_product_length');

        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                $value = sanitize_text_field($_POST[$field]);
                update_post_meta($post_id, $field, $value);
            }
        }
    }
}

// Initialize
new Sakwood_Product_Admin_Fields();
