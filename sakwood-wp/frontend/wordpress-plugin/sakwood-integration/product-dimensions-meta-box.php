<?php
/**
 * Product Dimensions Meta Box
 * Adds dimension fields (width, length, thickness) to WooCommerce products
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add meta box for product dimensions
 */
function sakwood_add_product_dimensions_meta_box() {
    add_meta_box(
        'sakwood_product_dimensions',
        __('Product Dimensions', 'sakwood'),
        'sakwood_product_dimensions_meta_box_callback',
        'product',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'sakwood_add_product_dimensions_meta_box');

/**
 * Meta box callback function
 */
function sakwood_product_dimensions_meta_box_callback($post) {
    wp_nonce_field('sakwood_product_dimensions_nonce', 'sakwood_product_dimensions_nonce');

    $thickness = get_post_meta($post->ID, '_product_thickness', true);
    $width = get_post_meta($post->ID, '_product_width', true);
    $length = get_post_meta($post->ID, '_product_length', true);

    ?>
    <div class="sakwood-dimensions-fields">
        <p>
            <label for="_product_thickness" style="display: block; font-weight: bold; margin-bottom: 5px;">
                <?php _e('Thickness (cm)', 'sakwood'); ?>
            </label>
            <input type="number"
                   id="_product_thickness"
                   name="_product_thickness"
                   value="<?php echo esc_attr($thickness); ?>"
                   step="0.1"
                   min="0"
                   style="width: 100%;"
                   placeholder="e.g., 1.2" />
        </p>

        <p>
            <label for="_product_width" style="display: block; font-weight: bold; margin-bottom: 5px;">
                <?php _e('Width (cm)', 'sakwood'); ?>
            </label>
            <input type="number"
                   id="_product_width"
                   name="_product_width"
                   value="<?php echo esc_attr($width); ?>"
                   step="0.1"
                   min="0"
                   style="width: 100%;"
                   placeholder="e.g., 12" />
        </p>

        <p>
            <label for="_product_length" style="display: block; font-weight: bold; margin-bottom: 5px;">
                <?php _e('Length (m)', 'sakwood'); ?>
            </label>
            <input type="number"
                   id="_product_length"
                   name="_product_length"
                   value="<?php echo esc_attr($length); ?>"
                   step="0.01"
                   min="0"
                   style="width: 100%;"
                   placeholder="e.g., 2.4" />
        </p>

        <p class="description">
            <?php _e('Thickness in cm, Width in cm, Length in m. These will be used for the room calculator.', 'sakwood'); ?>
        </p>
    </div>

    <style>
        .sakwood-dimensions-fields p {
            margin-bottom: 15px;
        }
        .sakwood-dimensions-fields label {
            font-size: 13px;
        }
    </style>
    <?php
}

/**
 * Save product dimensions meta
 */
function sakwood_save_product_dimensions_meta($post_id) {
    // Check if our nonce is set
    if (!isset($_POST['sakwood_product_dimensions_nonce'])) {
        return $post_id;
    }

    // Verify nonce
    if (!wp_verify_nonce($_POST['sakwood_product_dimensions_nonce'], 'sakwood_product_dimensions_nonce')) {
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

    // Save thickness
    if (isset($_POST['_product_thickness'])) {
        $thickness = floatval($_POST['_product_thickness']);
        update_post_meta($post_id, '_product_thickness', $thickness);
    }

    // Save width
    if (isset($_POST['_product_width'])) {
        $width = floatval($_POST['_product_width']);
        update_post_meta($post_id, '_product_width', $width);
    }

    // Save length
    if (isset($_POST['_product_length'])) {
        $length = floatval($_POST['_product_length']);
        update_post_meta($post_id, '_product_length', $length);
    }

    return $post_id;
}
add_action('save_post_product', 'sakwood_save_product_dimensions_meta');
