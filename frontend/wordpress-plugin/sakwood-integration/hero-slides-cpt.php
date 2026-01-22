<?php
/**
 * Register Hero Slides Custom Post Type
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Hero_Slides_CPT {

    public function __construct() {
        add_action('init', array($this, 'register_cpt'));
        add_action('init', array($this, 'register_meta_fields'));
        add_action('rest_api_init', array($this, 'register_meta_fields_rest'));
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post_hero_slide', array($this, 'save_meta_box'));
        add_filter('graphql_register_types', array($this, 'register_graphql_fields'));
        add_post_type_support('hero_slide', 'thumbnail');
        add_post_type_support('hero_slide', 'title');
        add_post_type_support('hero_slide', 'editor');
    }

    /**
     * Register Custom Post Type
     */
    public function register_cpt() {
        $labels = array(
            'name'                  => __('Hero Slides', 'sakwood'),
            'singular_name'         => __('Hero Slide', 'sakwood'),
            'menu_name'             => __('Hero Slides', 'sakwood'),
            'add_new'               => __('Add New', 'sakwood'),
            'add_new_item'          => __('Add New Slide', 'sakwood'),
            'edit_item'             => __('Edit Slide', 'sakwood'),
            'new_item'              => __('New Slide', 'sakwood'),
            'view_item'             => __('View Slide', 'sakwood'),
            'search_items'          => __('Search Slides', 'sakwood'),
            'not_found'             => __('No slides found', 'sakwood'),
            'not_found_in_trash'    => __('No slides found in Trash', 'sakwood'),
        );

        $args = array(
            'labels'                => $labels,
            'public'                => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 20,
            'menu_icon'             => 'dashicons-format-gallery',
            'capability_type'       => 'post',
            'supports'              => array('title', 'thumbnail'),
            'has_archive'           => false,
            'rewrite'               => false,
            'show_in_rest'          => true,
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'heroSlide',
            'graphql_plural_name'   => 'heroSlides',
        );

        register_post_type('hero_slide', $args);
    }

    /**
     * Register Meta Fields
     */
    public function register_meta_fields() {
        register_post_meta('hero_slide', '_slide_subtitle', array(
            'type'              => 'string',
            'description'       => 'Slide subtitle text',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        register_post_meta('hero_slide', '_slide_description', array(
            'type'              => 'string',
            'description'       => 'Slide description text',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_textarea_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        register_post_meta('hero_slide', '_slide_cta_text', array(
            'type'              => 'string',
            'description'       => 'CTA button text',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        register_post_meta('hero_slide', '_slide_cta_link', array(
            'type'              => 'string',
            'description'       => 'CTA button link',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'esc_url_raw',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        register_post_meta('hero_slide', '_slide_text_color', array(
            'type'              => 'string',
            'description'       => 'Text color (hex)',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => '#ffffff',
            'sanitize_callback' => 'sanitize_hex_color',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        register_post_meta('hero_slide', '_slide_overlay', array(
            'type'              => 'boolean',
            'description'       => 'Enable dark overlay',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => true,
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        register_post_meta('hero_slide', '_slide_position', array(
            'type'              => 'integer',
            'description'       => 'Slide order position',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => 0,
            'sanitize_callback' => 'absint',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        register_post_meta('hero_slide', '_slide_video', array(
            'type'              => 'string',
            'description'       => 'Video URL (YouTube or MP4)',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'esc_url_raw',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));
    }

    /**
     * Register Meta Fields for REST API
     */
    public function register_meta_fields_rest() {
        register_rest_field('hero_slide', 'slide_subtitle', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_subtitle', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_subtitle', $value);
            },
        ));

        register_rest_field('hero_slide', 'slide_description', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_description', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_description', $value);
            },
        ));

        register_rest_field('hero_slide', 'slide_cta_text', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_cta_text', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_cta_text', $value);
            },
        ));

        register_rest_field('hero_slide', 'slide_cta_link', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_cta_link', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_cta_link', $value);
            },
        ));

        register_rest_field('hero_slide', 'slide_text_color', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_text_color', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_text_color', $value);
            },
        ));

        register_rest_field('hero_slide', 'slide_overlay', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_overlay', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_overlay', $value);
            },
        ));

        register_rest_field('hero_slide', 'slide_position', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_position', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_position', $value);
            },
        ));

        register_rest_field('hero_slide', 'slide_video', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_slide_video', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_slide_video', $value);
            },
        ));
    }

    /**
     * Add Meta Box
     */
    public function add_meta_box() {
        add_meta_box(
            'hero_slide_details',
            __('Slide Details', 'sakwood'),
            array($this, 'render_meta_box'),
            'hero_slide',
            'normal',
            'high'
        );
    }

    /**
     * Render Meta Box
     */
    public function render_meta_box($post) {
        wp_nonce_field('hero_slide_meta_box', 'hero_slide_meta_box_nonce');

        $subtitle = get_post_meta($post->ID, '_slide_subtitle', true);
        $description = get_post_meta($post->ID, '_slide_description', true);
        $cta_text = get_post_meta($post->ID, '_slide_cta_text', true);
        $cta_link = get_post_meta($post->ID, '_slide_cta_link', true);
        $text_color = get_post_meta($post->ID, '_slide_text_color', true) ?: '#ffffff';
        $overlay = get_post_meta($post->ID, '_slide_overlay', true);
        $position = get_post_meta($post->ID, '_slide_position', true) ?: 0;
        $video = get_post_meta($post->ID, '_slide_video', true);

        ?>
        <div class="sakwood-slide-meta">
            <table class="form-table">
                <tr>
                    <th><label for="slide_position"><?php _e('Position', 'sakwood'); ?></label></th>
                    <td>
                        <input type="number" id="slide_position" name="slide_position" value="<?php echo esc_attr($position); ?>" class="small-text" />
                        <p class="description"><?php _e('Order of the slide (0 = first)', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label for="slide_subtitle"><?php _e('Subtitle', 'sakwood'); ?></label></th>
                    <td>
                        <input type="text" id="slide_subtitle" name="slide_subtitle" value="<?php echo esc_attr($subtitle); ?>" class="regular-text" />
                        <p class="description"><?php _e('Small text above the title', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label for="slide_description"><?php _e('Description', 'sakwood'); ?></label></th>
                    <td>
                        <textarea id="slide_description" name="slide_description" rows="4" class="large-text"><?php echo esc_textarea($description); ?></textarea>
                        <p class="description"><?php _e('Main description text', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label for="slide_cta_text"><?php _e('CTA Button Text', 'sakwood'); ?></label></th>
                    <td>
                        <input type="text" id="slide_cta_text" name="slide_cta_text" value="<?php echo esc_attr($cta_text); ?>" class="regular-text" placeholder="<?php _e('Shop Now', 'sakwood'); ?>" />
                    </td>
                </tr>
                <tr>
                    <th><label for="slide_cta_link"><?php _e('CTA Button Link', 'sakwood'); ?></label></th>
                    <td>
                        <input type="url" id="slide_cta_link" name="slide_cta_link" value="<?php echo esc_attr($cta_link); ?>" class="regular-text" placeholder="<?php echo esc_url(home_url('/shop')); ?>" />
                    </td>
                </tr>
                <tr>
                    <th><label for="slide_text_color"><?php _e('Text Color', 'sakwood'); ?></label></th>
                    <td>
                        <input type="color" id="slide_text_color" name="slide_text_color" value="<?php echo esc_attr($text_color); ?>" />
                        <p class="description"><?php _e('Color for title and text', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label><?php _e('Dark Overlay', 'sakwood'); ?></label></th>
                    <td>
                        <label>
                            <input type="checkbox" name="slide_overlay" value="1" <?php checked($overlay, true); ?> />
                            <?php _e('Enable dark overlay on background image', 'sakwood'); ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th><label for="slide_video"><?php _e('Video URL', 'sakwood'); ?></label></th>
                    <td>
                        <input type="url" id="slide_video" name="slide_video" value="<?php echo esc_attr($video); ?>" class="large-text" placeholder="<?php _e('https://www.youtube.com/watch?v=xxx or https://example.com/video.mp4', 'sakwood'); ?>" />
                        <p class="description"><?php _e('Enter YouTube URL or MP4 video URL. If set, video will be used instead of background image.', 'sakwood'); ?></p>
                    </td>
                </tr>
            </table>

            <div class="slide-image-preview">
                <h4><?php _e('Featured Image', 'sakwood'); ?></h4>
                <p class="description"><?php _e('Set a featured image for this slide. Recommended size: 1920x1080px', 'sakwood'); ?></p>
                <?php
                if (has_post_thumbnail($post->ID)) {
                    echo '<div style="margin-top: 10px;">';
                    the_post_thumbnail('medium');
                    echo '</div>';
                }
                ?>
            </div>
        </div>

        <style>
            .sakwood-slide-meta input[type="color"],
            .sakwood-slide-meta input[type="number"] {
                height: 30px;
            }
            .slide-image-preview {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
            }
            .slide-image-preview img {
                max-width: 300px;
                height: auto;
            }
        </style>
        <?php
    }

    /**
     * Save Meta Box
     */
    public function save_meta_box($post_id) {
        // Check nonce
        if (!isset($_POST['hero_slide_meta_box_nonce']) ||
            !wp_verify_nonce($_POST['hero_slide_meta_box_nonce'], 'hero_slide_meta_box')) {
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

        // Save fields
        if (isset($_POST['slide_position'])) {
            update_post_meta($post_id, '_slide_position', absint($_POST['slide_position']));
        }

        if (isset($_POST['slide_subtitle'])) {
            update_post_meta($post_id, '_slide_subtitle', sanitize_text_field($_POST['slide_subtitle']));
        }

        if (isset($_POST['slide_description'])) {
            update_post_meta($post_id, '_slide_description', sanitize_textarea_field($_POST['slide_description']));
        }

        if (isset($_POST['slide_cta_text'])) {
            update_post_meta($post_id, '_slide_cta_text', sanitize_text_field($_POST['slide_cta_text']));
        }

        if (isset($_POST['slide_cta_link'])) {
            update_post_meta($post_id, '_slide_cta_link', esc_url_raw($_POST['slide_cta_link']));
        }

        if (isset($_POST['slide_text_color'])) {
            update_post_meta($post_id, '_slide_text_color', sanitize_hex_color($_POST['slide_text_color']));
        }

        if (isset($_POST['slide_overlay'])) {
            update_post_meta($post_id, '_slide_overlay', true);
        } else {
            update_post_meta($post_id, '_slide_overlay', false);
        }

        if (isset($_POST['slide_video'])) {
            update_post_meta($post_id, '_slide_video', esc_url_raw($_POST['slide_video']));
        }
    }

    /**
     * Register GraphQL Fields
     */
    public function register_graphql_fields($type_registry) {
        // Register status field
        register_graphql_field('heroSlide', 'status', array(
            'type'        => 'String',
            'description' => 'Post status',
            'resolve'     => function($post) {
                return get_post_status($post->ID);
            },
        ));

        register_graphql_fields('heroSlide', array(
            'slideSubtitle' => array(
                'type'        => 'String',
                'description' => 'Slide subtitle',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_subtitle', true);
                },
            ),
            'slideDescription' => array(
                'type'        => 'String',
                'description' => 'Slide description',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_description', true);
                },
            ),
            'slideCtaText' => array(
                'type'        => 'String',
                'description' => 'CTA button text',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_cta_text', true);
                },
            ),
            'slideCtaLink' => array(
                'type'        => 'String',
                'description' => 'CTA button link',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_cta_link', true);
                },
            ),
            'slideTextColor' => array(
                'type'        => 'String',
                'description' => 'Text color',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_text_color', true) ?: '#ffffff';
                },
            ),
            'slideOverlay' => array(
                'type'        => 'Boolean',
                'description' => 'Enable dark overlay',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_overlay', true);
                },
            ),
            'slidePosition' => array(
                'type'        => 'Int',
                'description' => 'Slide position',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_position', true) ?: 0;
                },
            ),
            'slideVideo' => array(
                'type'        => 'String',
                'description' => 'Video URL (YouTube or MP4)',
                'resolve'     => function($post) {
                    return get_post_meta($post->ID, '_slide_video', true);
                },
            ),
        ));
    }
}

// Initialize
new Sakwood_Hero_Slides_CPT();
