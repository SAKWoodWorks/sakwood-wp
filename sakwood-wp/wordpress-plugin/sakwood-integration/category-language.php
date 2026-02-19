<?php
/**
 * Category Language Meta Fields
 *
 * Adds meta fields for English translations of product categories
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Category_Language {

    /**
     * Constructor
     */
    public function __construct() {
        // Add language fields to category add/edit forms
        add_action('product_cat_add_form_fields', array($this, 'add_category_language_fields'));
        add_action('product_cat_edit_form_fields', array($this, 'edit_category_language_fields'));

        // Save category language fields
        add_action('created_product_cat', array($this, 'save_category_language_fields'));
        add_action('edited_product_cat', array($this, 'save_category_language_fields'));

        // Add language column to categories list
        add_filter('manage_edit-product_cat_columns', array($this, 'add_language_column'));
        add_filter('manage_product_cat_custom_column', array($this, 'display_language_column'), 10, 3);
    }

    /**
     * Add language fields to category add form
     */
    public function add_category_language_fields() {
        ?>
        <div class="form-field">
            <label for="category_name_en"><?php _e('Category Name (English)', 'sakwood-integration'); ?></label>
            <input
                type="text"
                name="category_name_en"
                id="category_name_en"
                class="regular-text"
            />
            <p class="description">
                <?php _e('Enter the English name for this category. The Thai name is entered in the "Name" field above.', 'sakwood-integration'); ?>
            </p>
        </div>
        <?php
    }

    /**
     * Add language fields to category edit form
     */
    public function edit_category_language_fields($term) {
        $name_en = get_term_meta($term->term_id, 'category_name_en', true);
        ?>
        <tr class="form-field">
            <th scope="row">
                <label for="category_name_en"><?php _e('Category Name (English)', 'sakwood-integration'); ?></label>
            </th>
            <td>
                <input
                    type="text"
                    name="category_name_en"
                    id="category_name_en"
                    value="<?php echo esc_attr($name_en); ?>"
                    class="regular-text"
                />
                <p class="description">
                    <?php _e('Enter the English name for this category. The Thai name is in the "Name" field above.', 'sakwood-integration'); ?>
                </p>
            </td>
        </tr>
        <?php
    }

    /**
     * Save category language fields
     */
    public function save_category_language_fields($term_id) {
        // Check nonce
        if (!isset($_POST['_wpnonce_add_term']) &&
            !isset($_POST['_wpnonce'])) {
            return;
        }

        // Save English name
        if (isset($_POST['category_name_en'])) {
            $name_en = sanitize_text_field($_POST['category_name_en']);
            update_term_meta($term_id, 'category_name_en', $name_en);
        }
    }

    /**
     * Add language column to categories list
     */
    public function add_language_column($columns) {
        $columns['category_language'] = __('Languages', 'sakwood-integration');
        return $columns;
    }

    /**
     * Display language column content
     */
    public function display_language_column($content, $column_name, $term_id) {
        if ($column_name === 'category_language') {
            $term = get_term($term_id, 'product_cat');
            $has_th = $term && !empty($term->name);
            $has_en = get_term_meta($term_id, 'category_name_en', true);

            $languages = array();
            if ($has_th) $languages[] = '<span style="color:#2271b1">🇹🇭 TH</span>';
            if ($has_en) $languages[] = '<span style="color:#2271b1">🇬🇧 EN</span>';

            if (!empty($languages)) {
                echo implode(' | ', $languages);
            } else {
                echo '<em>' . __('No languages', 'sakwood-integration') . '</em>';
            }
        }
        return $content;
    }
}

// Initialize
new Sakwood_Category_Language();
