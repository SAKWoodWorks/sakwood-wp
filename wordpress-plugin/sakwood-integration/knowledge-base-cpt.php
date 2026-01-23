<?php
/**
 * Register Knowledge Base Custom Post Type
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Knowledge_Base_CPT {

    public function __construct() {
        add_action('init', array($this, 'register_cpt'));
        add_action('init', array($this, 'register_meta_fields'));
        add_action('rest_api_init', array($this, 'register_meta_fields_rest'));
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post_knowledge_base', array($this, 'save_meta_box'));
        add_post_type_support('knowledge_base', 'thumbnail');
        add_post_type_support('knowledge_base', 'title');
        add_post_type_support('knowledge_base', 'editor');
        add_post_type_support('knowledge_base', 'author');
        add_post_type_support('knowledge_base', 'excerpt');
    }

    /**
     * Register Custom Post Type
     */
    public function register_cpt() {
        $labels = array(
            'name'                  => __('Knowledge Base', 'sakwood'),
            'singular_name'         => __('Article', 'sakwood'),
            'menu_name'             => __('Knowledge Base', 'sakwood'),
            'add_new'               => __('Add New', 'sakwood'),
            'add_new_item'          => __('Add New Article', 'sakwood'),
            'edit_item'             => __('Edit Article', 'sakwood'),
            'new_item'              => __('New Article', 'sakwood'),
            'view_item'             => __('View Article', 'sakwood'),
            'search_items'          => __('Search Articles', 'sakwood'),
            'not_found'             => __('No articles found', 'sakwood'),
            'not_found_in_trash'    => __('No articles found in Trash', 'sakwood'),
        );

        $args = array(
            'labels'                => $labels,
            'public'                => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 27,
            'menu_icon'             => 'dashicons-book',
            'capability_type'       => 'post',
            'supports'              => array('title', 'editor', 'thumbnail', 'author', 'excerpt'),
            'has_archive'           => true,
            'rewrite'               => array('slug' => 'knowledge'),
            'show_in_rest'          => true,
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'knowledgeArticle',
            'graphql_plural_name'   => 'knowledgeArticles',
        );

        register_post_type('knowledge_base', $args);
    }

    /**
     * Register Meta Fields
     */
    public function register_meta_fields() {
        // Article Order
        register_post_meta('knowledge_base', '_kb_order', array(
            'type'              => 'integer',
            'description'       => 'Article display order',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => 0,
            'sanitize_callback' => 'absint',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Difficulty Level
        register_post_meta('knowledge_base', '_kb_difficulty', array(
            'type'              => 'string',
            'description'       => 'Difficulty level',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => 'beginner',
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Last Updated
        register_post_meta('knowledge_base', '_kb_last_updated', array(
            'type'              => 'string',
            'description'       => 'Last updated date',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Related Articles (comma-separated IDs)
        register_post_meta('knowledge_base', '_kb_related_articles', array(
            'type'              => 'string',
            'description'       => 'Related article IDs',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Views Count
        register_post_meta('knowledge_base', '_kb_views_count', array(
            'type'              => 'integer',
            'description'       => 'Article views count',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => 0,
            'sanitize_callback' => 'absint',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Is Featured
        register_post_meta('knowledge_base', '_kb_is_featured', array(
            'type'              => 'boolean',
            'description'       => 'Featured article',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => false,
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // English Title
        register_post_meta('knowledge_base', '_kb_title_en', array(
            'type'              => 'string',
            'description'       => 'Article title in English',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // English Content
        register_post_meta('knowledge_base', '_kb_content_en', array(
            'type'              => 'string',
            'description'       => 'Article content in English',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'wp_kses_post',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // English Excerpt
        register_post_meta('knowledge_base', '_kb_excerpt_en', array(
            'type'              => 'string',
            'description'       => 'Article excerpt in English',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_textarea_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));
    }

    /**
     * Register Meta Fields for REST API
     */
    public function register_meta_fields_rest() {
        register_rest_field('knowledge_base', 'kbOrder', array(
            'get_callback' => function($post) {
                return (int) get_post_meta($post['id'], '_kb_order', true) ?: 0;
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_order', absint($value));
            },
        ));

        register_rest_field('knowledge_base', 'kbDifficulty', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_kb_difficulty', true) ?: 'beginner';
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_difficulty', sanitize_text_field($value));
            },
        ));

        register_rest_field('knowledge_base', 'kbLastUpdated', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_kb_last_updated', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_last_updated', sanitize_text_field($value));
            },
        ));

        register_rest_field('knowledge_base', 'kbRelatedArticles', array(
            'get_callback' => function($post) {
                $related = get_post_meta($post['id'], '_kb_related_articles', true);
                return $related ? array_map('intval', explode(',', $related)) : array();
            },
            'update_callback' => function($value, $post) {
                if (is_array($value)) {
                    update_post_meta($post->ID, '_kb_related_articles', implode(',', $value));
                }
            },
        ));

        register_rest_field('knowledge_base', 'kbViewsCount', array(
            'get_callback' => function($post) {
                return (int) get_post_meta($post['id'], '_kb_views_count', true) ?: 0;
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_views_count', absint($value));
            },
        ));

        register_rest_field('knowledge_base', 'kbIsFeatured', array(
            'get_callback' => function($post) {
                return (bool) get_post_meta($post['id'], '_kb_is_featured', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_is_featured', rest_sanitize_boolean($value));
            },
        ));

        register_rest_field('knowledge_base', 'kbTitleEn', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_kb_title_en', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_title_en', sanitize_text_field($value));
            },
        ));

        register_rest_field('knowledge_base', 'kbContentEn', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_kb_content_en', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_content_en', wp_kses_post($value));
            },
        ));

        register_rest_field('knowledge_base', 'kbExcerptEn', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_kb_excerpt_en', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_kb_excerpt_en', sanitize_textarea_field($value));
            },
        ));
    }

    /**
     * Add Meta Box
     */
    public function add_meta_box() {
        add_meta_box(
            'kb_details',
            __('Article Details', 'sakwood'),
            array($this, 'render_meta_box'),
            'knowledge_base',
            'side',
            'default'
        );

        add_meta_box(
            'kb_english',
            __('English Translation', 'sakwood'),
            array($this, 'render_english_meta_box'),
            'knowledge_base',
            'normal',
            'default'
        );
    }

    /**
     * Render Details Meta Box
     */
    public function render_meta_box($post) {
        wp_nonce_field('kb_meta_box', 'kb_meta_box_nonce');

        $order = get_post_meta($post->ID, '_kb_order', true) ?: 0;
        $difficulty = get_post_meta($post->ID, '_kb_difficulty', true) ?: 'beginner';
        $is_featured = get_post_meta($post->ID, '_kb_is_featured', true);

        $difficulties = array(
            'beginner' => __('Beginner', 'sakwood'),
            'intermediate' => __('Intermediate', 'sakwood'),
            'advanced' => __('Advanced', 'sakwood'),
        );

        ?>
        <div class="sakwood-kb-meta">
            <p>
                <label for="kb_order"><strong><?php _e('Order', 'sakwood'); ?></strong></label><br>
                <input type="number" id="kb_order" name="kb_order" value="<?php echo esc_attr($order); ?>" class="small-text" min="0" />
                <span class="description"><?php _e('Lower numbers appear first', 'sakwood'); ?></span>
            </p>
            <p>
                <label for="kb_difficulty"><strong><?php _e('Difficulty', 'sakwood'); ?></strong></label><br>
                <select id="kb_difficulty" name="kb_difficulty">
                    <?php foreach ($difficulties as $value => $label) : ?>
                        <option value="<?php echo esc_attr($value); ?>" <?php selected($difficulty, $value); ?>>
                            <?php echo esc_html($label); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </p>
            <p>
                <label>
                    <input type="checkbox" name="kb_is_featured" value="1" <?php checked($is_featured, true); ?> />
                    <strong><?php _e('Featured Article', 'sakwood'); ?></strong>
                </label>
            </p>
            <p>
                <strong><?php _e('Views', 'sakwood'); ?></strong><br>
                <?php echo number_format(get_post_meta($post->ID, '_kb_views_count', true) ?: 0); ?>
            </p>
        </div>
        <?php
    }

    /**
     * Render English Meta Box
     */
    public function render_english_meta_box($post) {
        $title_en = get_post_meta($post->ID, '_kb_title_en', true);
        $content_en = get_post_meta($post->ID, '_kb_content_en', true);
        $excerpt_en = get_post_meta($post->ID, '_kb_excerpt_en', true);

        ?>
        <div class="sakwood-kb-english">
            <p>
                <label for="kb_title_en"><strong><?php _e('Title (English)', 'sakwood'); ?></strong></label><br>
                <input type="text" id="kb_title_en" name="kb_title_en" value="<?php echo esc_attr($title_en); ?>" class="large-text" />
                <span class="description"><?php _e('Leave empty to use Thai title', 'sakwood'); ?></span>
            </p>
            <p>
                <label for="kb_excerpt_en"><strong><?php _e('Excerpt (English)', 'sakwood'); ?></strong></label><br>
                <textarea id="kb_excerpt_en" name="kb_excerpt_en" rows="3" class="large-text"><?php echo esc_textarea($excerpt_en); ?></textarea>
                <span class="description"><?php _e('Leave empty to use Thai excerpt', 'sakwood'); ?></span>
            </p>
            <p>
                <label for="kb_content_en"><strong><?php _e('Content (English)', 'sakwood'); ?></strong></label><br>
                <?php
                $settings = array(
                    'textarea_name' => 'kb_content_en',
                    'media_buttons' => true,
                    'textarea_rows' => 15,
                    'teeny' => false,
                );
                wp_editor($content_en, 'kb_content_en', $settings);
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
        if (!isset($_POST['kb_meta_box_nonce']) ||
            !wp_verify_nonce($_POST['kb_meta_box_nonce'], 'kb_meta_box')) {
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

        // Save order
        if (isset($_POST['kb_order'])) {
            update_post_meta($post_id, '_kb_order', absint($_POST['kb_order']));
        }

        // Save difficulty
        if (isset($_POST['kb_difficulty'])) {
            update_post_meta($post_id, '_kb_difficulty', sanitize_text_field($_POST['kb_difficulty']));
        }

        // Save featured
        if (isset($_POST['kb_is_featured'])) {
            update_post_meta($post_id, '_kb_is_featured', true);
        } else {
            update_post_meta($post_id, '_kb_is_featured', false);
        }

        // Update last updated date
        update_post_meta($post_id, '_kb_last_updated', current_time('mysql'));

        // Save English title
        if (isset($_POST['kb_title_en'])) {
            update_post_meta($post_id, '_kb_title_en', sanitize_text_field($_POST['kb_title_en']));
        }

        // Save English content
        if (isset($_POST['kb_content_en'])) {
            update_post_meta($post_id, '_kb_content_en', wp_kses_post($_POST['kb_content_en']));
        }

        // Save English excerpt
        if (isset($_POST['kb_excerpt_en'])) {
            update_post_meta($post_id, '_kb_excerpt_en', sanitize_textarea_field($_POST['kb_excerpt_en']));
        }
    }
}

// Initialize
new Sakwood_Knowledge_Base_CPT();
