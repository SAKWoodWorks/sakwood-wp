<?php
/**
 * Product Price Types
 * Adds support for multiple price types per product (piece, meter, sqm, cubic foot, etc.)
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_Price_Types {

    public function __construct() {
        add_action('add_meta_boxes', array($this, 'add_price_types_meta_box'));
        add_action('save_post_product', array($this, 'save_price_types'), 10, 2);
        add_action('rest_api_init', array($this, 'add_rest_api_fields'));
        add_filter('sakwood_product_api_format', array($this, 'format_product_prices'), 10, 2);
    }

    /**
     * Add meta box for price types
     */
    public function add_price_types_meta_box() {
        add_meta_box(
            'sakwood_product_price_types',
            __('Price Types', 'sakwood-integration'),
            array($this, 'render_price_types_meta_box'),
            'product',
            'normal',
            'high'
        );
    }

    /**
     * Render meta box content
     */
    public function render_price_types_meta_box($post) {
        wp_nonce_field('sakwood_price_types_nonce', 'sakwood_price_types_nonce');

        // Get current price types
        $price_types = get_post_meta($post->ID, '_product_price_types', true);
        if (empty($price_types)) {
            $price_types = array('piece');
        }

        // Get all prices
        $prices = array();
        $all_types = $this->get_price_type_definitions();

        foreach ($all_types as $type_key => $type_data) {
            $meta_key = "_product_price_{$type_key}";
            $prices[$type_key] = get_post_meta($post->ID, $meta_key, true);
        }

        echo '<div class="sakwood-price-types">';
        echo '<p class="description">' . __('Select which price types to enable for this product. At least one type is required.', 'sakwood-integration') . '</p>';

        // Price type checkboxes
        echo '<div class="price-types-checkboxes" style="margin-bottom: 20px;">';
        echo '<strong>' . __('Enable Price Types:', 'sakwood-integration') . '</strong><br><br>';

        foreach ($all_types as $type_key => $type_data) {
            $checked = in_array($type_key, $price_types) ? 'checked="checked"' : '';
            echo '<label style="display: inline-block; margin-right: 20px; margin-bottom: 10px;">';
            echo '<input type="checkbox" name="product_price_types[]" value="' . esc_attr($type_key) . '" ' . $checked . ' /> ';
            echo esc_html($type_data['label']);
            echo '</label>';
        }

        echo '</div>';

        // Price input fields
        echo '<div class="price-types-inputs">';
        echo '<strong>' . __('Prices:', 'sakwood-integration') . '</strong><br><br>';
        echo '<table class="wp-list-table widefat fixed striped" style="width: 100%;">';
        echo '<thead><tr>';
        echo '<th style="width: 30%;">' . __('Price Type', 'sakwood-integration') . '</th>';
        echo '<th style="width: 70%;">' . __('Amount (฿)', 'sakwood-integration') . '</th>';
        echo '</tr></thead>';
        echo '<tbody>';

        foreach ($all_types as $type_key => $type_data) {
            $value = isset($prices[$type_key]) ? esc_attr($prices[$type_key]) : '';
            $row_style = in_array($type_key, $price_types) ? '' : 'style="display: none;"';
            $row_class = 'price-type-row price-type-row-' . $type_key;

            echo '<tr class="' . $row_class . '" ' . $row_style . ' data-price-type="' . esc_attr($type_key) . '">';
            echo '<td><strong>' . esc_html($type_data['label']) . '</strong></td>';
            echo '<td>';
            echo '<input type="text" ';
            echo 'name="product_price_' . esc_attr($type_key) . '" ';
            echo 'id="product_price_' . esc_attr($type_key) . '" ';
            echo 'value="' . $value . '" ';
            echo 'class="regular-text" ';
            echo 'placeholder="' . esc_attr($type_data['placeholder']) . '" ';
            echo '/>';
            echo '</td>';
            echo '</tr>';
        }

        echo '</tbody></table>';
        echo '</div>';

        echo '</div>';

        // JavaScript for showing/hiding price rows
        ?>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            function updatePriceRows() {
                $('input[name="product_price_types[]"]').change(function() {
                    var type = $(this).val();
                    var row = $('.price-type-row-' + type);

                    if ($(this).is(':checked')) {
                        row.show();
                    } else {
                        row.hide();
                    }
                });
            }

            // Initialize on page load
            updatePriceRows();
        });
        </script>
        <?php
    }

    /**
     * Get price type definitions
     */
    private function get_price_type_definitions() {
        return array(
            'piece' => array(
                'label' => __('Price per Piece', 'sakwood-integration'),
                'placeholder' => __('e.g., 1200', 'sakwood-integration'),
            ),
            'meter' => array(
                'label' => __('Price per Linear Meter', 'sakwood-integration'),
                'placeholder' => __('e.g., 500', 'sakwood-integration'),
            ),
            'sqm' => array(
                'label' => __('Price per Square Meter', 'sakwood-integration'),
                'placeholder' => __('e.g., 800', 'sakwood-integration'),
            ),
            'cubic_foot' => array(
                'label' => __('Price per Cubic Foot', 'sakwood-integration'),
                'placeholder' => __('e.g., 2500', 'sakwood-integration'),
            ),
            'cubic_meter' => array(
                'label' => __('Price per Cubic Meter', 'sakwood-integration'),
                'placeholder' => __('e.g., 3500', 'sakwood-integration'),
            ),
            'board_foot' => array(
                'label' => __('Price per Board Foot', 'sakwood-integration'),
                'placeholder' => __('e.g., 180', 'sakwood-integration'),
            ),
        );
    }

    /**
     * Save price types
     */
    public function save_price_types($post_id, $post) {
        // Verify nonce
        if (!isset($_POST['sakwood_price_types_nonce']) ||
            !wp_verify_nonce($_POST['sakwood_price_types_nonce'], 'sakwood_price_types_nonce')) {
            return;
        }

        // Check user permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Don't save on revisions
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        // Save enabled price types
        if (isset($_POST['product_price_types']) && is_array($_POST['product_price_types'])) {
            $price_types = array_map('sanitize_text_field', $_POST['product_price_types']);

            // Validate: at least one price type required
            if (!empty($price_types)) {
                update_post_meta($post_id, '_product_price_types', $price_types);
            }
        }

        // Save prices for each type
        $all_types = array('piece', 'meter', 'sqm', 'cubic_foot', 'cubic_meter', 'board_foot');

        foreach ($all_types as $type) {
            $field_name = 'product_price_' . $type;

            if (isset($_POST[$field_name])) {
                $price = sanitize_text_field($_POST[$field_name]);
                $meta_key = "_product_price_{$type}";
                update_post_meta($post_id, $meta_key, $price);
            }
        }
    }

    /**
     * Add fields to REST API response
     */
    public function add_rest_api_fields() {
        register_rest_field('product', 'priceTypes', array(
            'get_callback' => array($this, 'get_price_types_rest'),
            'update_callback' => null,
            'schema' => array(
                'type' => 'array',
                'items' => array(
                    'type' => 'string',
                ),
                'description' => 'List of enabled price types',
            ),
        ));

        register_rest_field('product', 'prices', array(
            'get_callback' => array($this, 'get_prices_rest'),
            'update_callback' => null,
            'schema' => array(
                'type' => 'object',
                'description' => 'Map of price types to amounts',
            ),
        ));
    }

    /**
     * Get price types for REST API
     */
    public function get_price_types_rest($product) {
        $price_types = get_post_meta($product->ID, '_product_price_types', true);
        return $price_types ? $price_types : array('piece');
    }

    /**
     * Get prices for REST API
     */
    public function get_prices_rest($product) {
        $price_types = get_post_meta($product->ID, '_product_price_types', true);
        $price_types = $price_types ? $price_types : array('piece');

        $prices = array();
        foreach ($price_types as $type) {
            $meta_key = "_product_price_{$type}";
            $price = get_post_meta($product->ID, $meta_key, true);
            if ($price) {
                $prices[$type] = $price;
            }
        }

        return $prices;
    }

    /**
     * Format product prices for API response
     */
    public function format_product_prices($formatted_product, $product) {
        // Get product ID - handle both WC_Product and array formats
        $product_id = is_object($product) && method_exists($product, 'get_id') ? $product->get_id() : $product->ID;

        $price_types = get_post_meta($product_id, '_product_price_types', true);
        if (empty($price_types)) {
            $price_types = array('piece');
        }

        $prices = array();
        foreach ($price_types as $type) {
            $meta_key = "_product_price_{$type}";
            $price = get_post_meta($product_id, $meta_key, true);
            if ($price) {
                $prices[$type] = $price;
            }
        }

        // Use price per piece as default for backward compatibility
        $default_price = isset($prices['piece']) ? $prices['piece'] : $formatted_product['price'];

        $formatted_product['price'] = $default_price;
        $formatted_product['priceTypes'] = $price_types;
        $formatted_product['prices'] = $prices;

        return $formatted_product;
    }
}

// Initialize the price types system
new Sakwood_Product_Price_Types();
