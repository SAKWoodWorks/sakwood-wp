<?php
/**
 * Register FAQ Custom Post Type
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_FAQ_CPT {

    public function __construct() {
        add_action('init', array($this, 'register_cpt'));
        add_action('init', array($this, 'register_taxonomy'));
        add_action('init', array($this, 'register_meta_fields'));
        add_action('rest_api_init', array($this, 'register_meta_fields_rest'));
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post_faq', array($this, 'save_meta_box'));
        add_post_type_support('faq', 'thumbnail');
        add_post_type_support('faq', 'title');
        add_post_type_support('faq', 'editor');
        add_post_type_support('faq', 'page-attributes');
    }

    /**
     * Register Custom Post Type
     */
    public function register_cpt() {
        $labels = array(
            'name'                  => __('FAQs', 'sakwood'),
            'singular_name'         => __('FAQ', 'sakwood'),
            'menu_name'             => __('FAQs', 'sakwood'),
            'add_new'               => __('Add New', 'sakwood'),
            'add_new_item'          => __('Add New FAQ', 'sakwood'),
            'edit_item'             => __('Edit FAQ', 'sakwood'),
            'new_item'              => __('New FAQ', 'sakwood'),
            'view_item'             => __('View FAQ', 'sakwood'),
            'search_items'          => __('Search FAQs', 'sakwood'),
            'not_found'             => __('No FAQs found', 'sakwood'),
            'not_found_in_trash'    => __('No FAQs found in Trash', 'sakwood'),
        );

        $args = array(
            'labels'                => $labels,
            'public'                => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 25,
            'menu_icon'             => 'dashicons-editor-help',
            'capability_type'       => 'post',
            'supports'              => array('title', 'editor', 'thumbnail', 'page-attributes'),
            'has_archive'           => false,
            'rewrite'               => array('slug' => 'faq'),
            'show_in_rest'          => true,
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'faq',
            'graphql_plural_name'   => 'faqs',
        );

        register_post_type('faq', $args);
    }

    /**
     * Register FAQ Category Taxonomy
     */
    public function register_taxonomy() {
        $labels = array(
            'name'              => __('FAQ Categories', 'sakwood'),
            'singular_name'     => __('FAQ Category', 'sakwood'),
            'search_items'      => __('Search Categories', 'sakwood'),
            'all_items'         => __('All Categories', 'sakwood'),
            'parent_item'       => __('Parent Category', 'sakwood'),
            'parent_item_colon' => __('Parent Category:', 'sakwood'),
            'edit_item'         => __('Edit Category', 'sakwood'),
            'update_item'       => __('Update Category', 'sakwood'),
            'add_new_item'      => __('Add New Category', 'sakwood'),
            'new_item_name'     => __('New Category Name', 'sakwood'),
            'menu_name'         => __('Categories', 'sakwood'),
        );

        $args = array(
            'labels'            => $labels,
            'hierarchical'      => true,
            'public'            => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_rest'      => true,
            'show_in_graphql'   => true,
            'rewrite'           => array('slug' => 'faq-category'),
        );

        register_taxonomy('faq_category', array('faq'), $args);
    }

    /**
     * Register Meta Fields
     */
    public function register_meta_fields() {
        // FAQ Order
        register_post_meta('faq', '_faq_order', array(
            'type'              => 'integer',
            'description'       => 'FAQ display order',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => 0,
            'sanitize_callback' => 'absint',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Featured FAQ
        register_post_meta('faq', '_faq_featured', array(
            'type'              => 'boolean',
            'description'       => 'Featured FAQ for homepage',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => false,
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Show on Homepage
        register_post_meta('faq', '_faq_display_on_homepage', array(
            'type'              => 'boolean',
            'description'       => 'Show on homepage',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => false,
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // English Title
        register_post_meta('faq', '_faq_title_en', array(
            'type'              => 'string',
            'description'       => 'FAQ title in English',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // English Content
        register_post_meta('faq', '_faq_content_en', array(
            'type'              => 'string',
            'description'       => 'FAQ answer in English',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'wp_kses_post',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));
    }

    /**
     * Register Meta Fields for REST API
     */
    public function register_meta_fields_rest() {
        register_rest_field('faq', 'faq_order', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_faq_order', true) ?: 0;
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_faq_order', absint($value));
            },
        ));

        register_rest_field('faq', 'faq_featured', array(
            'get_callback' => function($post) {
                return (bool) get_post_meta($post['id'], '_faq_featured', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_faq_featured', rest_sanitize_boolean($value));
            },
        ));

        register_rest_field('faq', 'faq_display_on_homepage', array(
            'get_callback' => function($post) {
                return (bool) get_post_meta($post['id'], '_faq_display_on_homepage', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_faq_display_on_homepage', rest_sanitize_boolean($value));
            },
        ));

        register_rest_field('faq', 'faq_title_en', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_faq_title_en', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_faq_title_en', sanitize_text_field($value));
            },
        ));

        register_rest_field('faq', 'faq_content_en', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_faq_content_en', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_faq_content_en', wp_kses_post($value));
            },
        ));
    }

    /**
     * Add Meta Box
     */
    public function add_meta_box() {
        add_meta_box(
            'faq_details',
            __('FAQ Details', 'sakwood'),
            array($this, 'render_meta_box'),
            'faq',
            'side',
            'default'
        );

        add_meta_box(
            'faq_english',
            __('English Translation', 'sakwood'),
            array($this, 'render_english_meta_box'),
            'faq',
            'normal',
            'default'
        );
    }

    /**
     * Render Details Meta Box
     */
    public function render_meta_box($post) {
        wp_nonce_field('faq_meta_box', 'faq_meta_box_nonce');

        $order = get_post_meta($post->ID, '_faq_order', true) ?: 0;
        $featured = get_post_meta($post->ID, '_faq_featured', true);
        $display_on_homepage = get_post_meta($post->ID, '_faq_display_on_homepage', true);

        ?>
        <div class="sakwood-faq-meta">
            <p>
                <label for="faq_order"><strong><?php _e('Order', 'sakwood'); ?></strong></label><br>
                <input type="number" id="faq_order" name="faq_order" value="<?php echo esc_attr($order); ?>" class="small-text" />
                <span class="description"><?php _e('Lower numbers appear first', 'sakwood'); ?></span>
            </p>
            <p>
                <label>
                    <input type="checkbox" name="faq_featured" value="1" <?php checked($featured, true); ?> />
                    <strong><?php _e('Featured FAQ', 'sakwood'); ?></strong>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" name="faq_display_on_homepage" value="1" <?php checked($display_on_homepage, true); ?> />
                    <strong><?php _e('Show on Homepage', 'sakwood'); ?></strong>
                </label>
            </p>
        </div>
        <?php
    }

    /**
     * Render English Meta Box
     */
    public function render_english_meta_box($post) {
        $title_en = get_post_meta($post->ID, '_faq_title_en', true);
        $content_en = get_post_meta($post->ID, '_faq_content_en', true);

        ?>
        <div class="sakwood-faq-english">
            <p>
                <label for="faq_title_en"><strong><?php _e('Question (English)', 'sakwood'); ?></strong></label><br>
                <input type="text" id="faq_title_en" name="faq_title_en" value="<?php echo esc_attr($title_en); ?>" class="large-text" />
                <span class="description"><?php _e('Leave empty to use Thai title', 'sakwood'); ?></span>
            </p>
            <p>
                <label for="faq_content_en"><strong><?php _e('Answer (English)', 'sakwood'); ?></strong></label><br>
                <?php
                $settings = array(
                    'textarea_name' => 'faq_content_en',
                    'media_buttons' => false,
                    'textarea_rows' => 10,
                    'teeny' => true,
                );
                wp_editor($content_en, 'faq_content_en', $settings);
                ?>
                <span class="description"><?php _e('Leave empty to use Thai content', 'sakwood'); ?></span>
            </p>
        </div>
        <?php
    }

    /**
     * Save Meta Box
     */
    public function save_meta_box($post_id) {
        // Check nonce
        if (!isset($_POST['faq_meta_box_nonce']) ||
            !wp_verify_nonce($_POST['faq_meta_box_nonce'], 'faq_meta_box')) {
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

        // Save FAQ order
        if (isset($_POST['faq_order'])) {
            update_post_meta($post_id, '_faq_order', absint($_POST['faq_order']));
        }

        // Save featured
        if (isset($_POST['faq_featured'])) {
            update_post_meta($post_id, '_faq_featured', true);
        } else {
            update_post_meta($post_id, '_faq_featured', false);
        }

        // Save display on homepage
        if (isset($_POST['faq_display_on_homepage'])) {
            update_post_meta($post_id, '_faq_display_on_homepage', true);
        } else {
            update_post_meta($post_id, '_faq_display_on_homepage', false);
        }

        // Save English title
        if (isset($_POST['faq_title_en'])) {
            update_post_meta($post_id, '_faq_title_en', sanitize_text_field($_POST['faq_title_en']));
        }

        // Save English content
        if (isset($_POST['faq_content_en'])) {
            update_post_meta($post_id, '_faq_content_en', wp_kses_post($_POST['faq_content_en']));
        }
    }
}

// Initialize
new Sakwood_FAQ_CPT();
