<?php
/**
 * Fix Quick Edit for Sale Prices in WooCommerce
 *
 * This fixes the issue where Quick Edit doesn't properly save sale prices
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Quick_Edit_Fix {

    public function __construct() {
        // Add custom columns to products list
        add_filter('manage_edit-product_columns', array($this, 'add_product_columns'));
        add_action('manage_product_posts_custom_column', array($this, 'display_product_columns'), 10, 2);

        // Add custom quick edit fields
        add_action('woocommerce_product_quick_edit_end', array($this, 'add_quick_edit_fields'));
        add_action('woocommerce_product_quick_edit_save', array($this, 'save_quick_edit_fields'));

        // Enqueue scripts for quick edit
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }

    /**
     * Add custom columns to products list
     */
    public function add_product_columns($columns) {
        // Add price column after product name
        $new_columns = array();
        foreach ($columns as $key => $value) {
            $new_columns[$key] = $value;
            if ($key === 'thumb') {
                $new_columns['price'] = __('Price', 'woocommerce');
            }
        }
        return $new_columns;
    }

    /**
     * Display custom column data
     */
    public function display_product_columns($column, $postid) {
        if ($column === 'price') {
            $product = wc_get_product($postid);
            if ($product) {
                $price = $product->get_price();
                $regular_price = $product->get_regular_price();
                $sale_price = $product->get_sale_price();

                if ($sale_price) {
                    echo '<del>' . wc_price($regular_price) . '</del><br>';
                    echo '<ins>' . wc_price($sale_price) . '</ins>';
                } else {
                    echo wc_price($price);
                }
            }
        }
    }

    /**
     * Add custom fields to Quick Edit
     */
    public function add_quick_edit_fields() {
        global $post;

        $product = wc_get_product($post->ID);

        if (!$product) {
            return;
        }

        // Get current prices
        $regular_price = $product->get_regular_price();
        $sale_price = $product->get_sale_price();

        ?>
        <div class="inline-edit-col" style="width: 100%;">
            <label class="alignleft">
                <span class="title"><?php _e('Regular Price', 'woocommerce'); ?></span>
                <span class="input-text-wrap">
                    <input type="text" name="_regular_price" class="ptitle" value="<?php echo esc_attr($regular_price); ?>" />
                </span>
            </label>

            <label class="alignleft">
                <span class="title"><?php _e('Sale Price', 'woocommerce'); ?></span>
                <span class="input-text-wrap">
                    <input type="text" name="_sale_price" class="ptitle" value="<?php echo esc_attr($sale_price); ?>" />
                </span>
            </label>

            <input type="hidden" name="woocommerce_quick_edit_nonce" value="<?php echo wp_create_nonce('woocommerce_quick_edit_nonce'); ?>" />
        </div>
        <?php
    }

    /**
     * Save custom Quick Edit fields
     */
    public function save_quick_edit_fields($product) {
        // Verify nonce
        if (!isset($_POST['woocommerce_quick_edit_nonce']) ||
            !wp_verify_nonce($_POST['woocommerce_quick_edit_nonce'], 'woocommerce_quick_edit_nonce')) {
            return;
        }

        // Save regular price
        if (isset($_POST['_regular_price'])) {
            $regular_price = wc_clean(wp_unslash($_POST['_regular_price']));
            $product->set_regular_price($regular_price);
        }

        // Save sale price
        if (isset($_POST['_sale_price'])) {
            $sale_price = wc_clean(wp_unslash($_POST['_sale_price']));
            $product->set_sale_price($sale_price);
        }

        // Trigger price recalculation
        $product->set_price($product->get_price());

        // Clear product transients
        wc_delete_product_transients($product->get_id());

        // Clear all WooCommerce caches
        if (function_exists('wc_delete_product_transients')) {
            wc_delete_product_transients($product->get_id());
        }

        // Force clear object cache
        wp_cache_delete($product->get_id(), 'products');
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        // Only load on edit.php screen
        if ('edit.php' !== $hook) {
            return;
        }

        // Get current post type
        $post_type = isset($_GET['post_type']) ? $_GET['post_type'] : '';

        // Only load for products
        if ('product' !== $post_type) {
            return;
        }

        ?>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Make sure our custom inline edit fields work with WooCommerce
            $( '#the-list' ).on('click', 'a.editinline', function() {
                // Repopulate our custom fields when opening inline edit
                var post_id = $(this).closest('tr').attr('id');

                // Get current prices via AJAX
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'sakwood_get_product_prices',
                        post_id: post_id.replace('post-', ''),
                        security: '<?php echo wp_create_nonce('sakwood_get_prices'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            $('input[name="_regular_price"]').val(response.data.regular_price || '');
                            $('input[name="_sale_price"]').val(response.data.sale_price || '');
                        }
                    }
                });
            });
        });
        </script>
        <?php
    }
}

// Initialize
new Sakwood_Quick_Edit_Fix();

// AJAX handler to get product prices
add_action('wp_ajax_sakwood_get_product_prices', function() {
    check_ajax_referer('sakwood_get_prices', 'security');

    $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;

    if (!$post_id) {
        wp_send_json_error();
    }

    $product = wc_get_product($post_id);

    if (!$product) {
        wp_send_json_error();
    }

    wp_send_json_success(array(
        'regular_price' => $product->get_regular_price(),
        'sale_price' => $product->get_sale_price()
    ));
});
