<?php
/**
 * Register Video Gallery Custom Post Type
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Video_Gallery_CPT {

    public function __construct() {
        add_action('init', array($this, 'register_cpt'));
        add_action('init', array($this, 'register_meta_fields'));
        add_action('rest_api_init', array($this, 'register_meta_fields_rest'));
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post_video_gallery', array($this, 'save_meta_box'));
        add_action('admin_footer-post-new.php', array($this, 'admin_footer_script'));
        add_action('admin_footer-post.php', array($this, 'admin_footer_script'));
        add_post_type_support('video_gallery', 'thumbnail');
        add_post_type_support('video_gallery', 'title');
        add_post_type_support('video_gallery', 'editor');
    }

    /**
     * Register Custom Post Type
     */
    public function register_cpt() {
        $labels = array(
            'name'                  => __('Videos', 'sakwood'),
            'singular_name'         => __('Video', 'sakwood'),
            'menu_name'             => __('Video Gallery', 'sakwood'),
            'add_new'               => __('Add New', 'sakwood'),
            'add_new_item'          => __('Add New Video', 'sakwood'),
            'edit_item'             => __('Edit Video', 'sakwood'),
            'new_item'              => __('New Video', 'sakwood'),
            'view_item'             => __('View Video', 'sakwood'),
            'search_items'          => __('Search Videos', 'sakwood'),
            'not_found'             => __('No videos found', 'sakwood'),
            'not_found_in_trash'    => __('No videos found in Trash', 'sakwood'),
        );

        $args = array(
            'labels'                => $labels,
            'public'                => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 26,
            'menu_icon'             => 'dashicons-video',
            'capability_type'       => 'post',
            'supports'              => array('title', 'thumbnail', 'editor'),
            'has_archive'           => false,
            'rewrite'               => false,
            'show_in_rest'          => true,
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'videoGallery',
            'graphql_plural_name'   => 'videoGalleries',
        );

        register_post_type('video_gallery', $args);
    }

    /**
     * Register Meta Fields
     */
    public function register_meta_fields() {
        // Video URL
        register_post_meta('video_gallery', '_video_url', array(
            'type'              => 'string',
            'description'       => 'Video URL (YouTube or Vimeo)',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'esc_url_raw',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Video Type (auto-detected)
        register_post_meta('video_gallery', '_video_type', array(
            'type'              => 'string',
            'description'       => 'Video type (youtube or vimeo)',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Video ID (auto-extracted)
        register_post_meta('video_gallery', '_video_id', array(
            'type'              => 'string',
            'description'       => 'Extracted video ID',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Video Duration
        register_post_meta('video_gallery', '_video_duration', array(
            'type'              => 'string',
            'description'       => 'Video duration (MM:SS or HH:MM:SS)',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Video Category
        register_post_meta('video_gallery', '_video_category', array(
            'type'              => 'string',
            'description'       => 'Video category',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => 'other',
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Custom Thumbnail URL
        register_post_meta('video_gallery', '_video_thumbnail_url', array(
            'type'              => 'string',
            'description'       => 'Custom thumbnail URL override',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'esc_url_raw',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // Position/Order
        register_post_meta('video_gallery', '_video_position', array(
            'type'              => 'integer',
            'description'       => 'Display position',
            'single'            => true,
            'show_in_rest'      => true,
            'default'           => 0,
            'sanitize_callback' => 'absint',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // English Title
        register_post_meta('video_gallery', '_video_title_en', array(
            'type'              => 'string',
            'description'       => 'Video title in English',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function() {
                return current_user_can('edit_posts');
            },
        ));

        // English Description
        register_post_meta('video_gallery', '_video_description_en', array(
            'type'              => 'string',
            'description'       => 'Video description in English',
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
        register_rest_field('video_gallery', 'videoUrl', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_url', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_url', esc_url_raw($value));
            },
        ));

        register_rest_field('video_gallery', 'videoType', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_type', true) ?: 'youtube';
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_type', sanitize_text_field($value));
            },
        ));

        register_rest_field('video_gallery', 'videoId', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_id', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_id', sanitize_text_field($value));
            },
        ));

        register_rest_field('video_gallery', 'videoDuration', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_duration', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_duration', sanitize_text_field($value));
            },
        ));

        register_rest_field('video_gallery', 'videoCategory', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_category', true) ?: 'other';
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_category', sanitize_text_field($value));
            },
        ));

        register_rest_field('video_gallery', 'videoThumbnailUrl', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_thumbnail_url', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_thumbnail_url', esc_url_raw($value));
            },
        ));

        register_rest_field('video_gallery', 'videoPosition', array(
            'get_callback' => function($post) {
                return (int) get_post_meta($post['id'], '_video_position', true) ?: 0;
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_position', absint($value));
            },
        ));

        register_rest_field('video_gallery', 'videoTitleEn', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_title_en', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_title_en', sanitize_text_field($value));
            },
        ));

        register_rest_field('video_gallery', 'videoDescriptionEn', array(
            'get_callback' => function($post) {
                return get_post_meta($post['id'], '_video_description_en', true);
            },
            'update_callback' => function($value, $post) {
                update_post_meta($post->ID, '_video_description_en', sanitize_textarea_field($value));
            },
        ));
    }

    /**
     * Add Meta Box
     */
    public function add_meta_box() {
        add_meta_box(
            'video_gallery_details',
            __('Video Details', 'sakwood'),
            array($this, 'render_meta_box'),
            'video_gallery',
            'normal',
            'high'
        );

        add_meta_box(
            'video_gallery_english',
            __('English Translation', 'sakwood'),
            array($this, 'render_english_meta_box'),
            'video_gallery',
            'normal',
            'default'
        );
    }

    /**
     * Render Details Meta Box
     */
    public function render_meta_box($post) {
        wp_nonce_field('video_gallery_meta_box', 'video_gallery_meta_box_nonce');

        $video_url = get_post_meta($post->ID, '_video_url', true);
        $video_type = get_post_meta($post->ID, '_video_type', true) ?: 'youtube';
        $video_id = get_post_meta($post->ID, '_video_id', true);
        $video_duration = get_post_meta($post->ID, '_video_duration', true);
        $video_category = get_post_meta($post->ID, '_video_category', true) ?: 'other';
        $video_thumbnail_url = get_post_meta($post->ID, '_video_thumbnail_url', true);
        $video_position = get_post_meta($post->ID, '_video_position', true) ?: 0;

        $categories = array(
            'product-tutorial' => __('Product Tutorial', 'sakwood'),
            'company-news' => __('Company News', 'sakwood'),
            'installation-guide' => __('Installation Guide', 'sakwood'),
            'customer-story' => __('Customer Story', 'sakwood'),
            'other' => __('Other', 'sakwood'),
        );

        ?>
        <div class="sakwood-video-meta">
            <table class="form-table">
                <tr>
                    <th><label for="video_url"><?php _e('Video URL', 'sakwood'); ?></label></th>
                    <td>
                        <input type="url" id="video_url" name="video_url" value="<?php echo esc_attr($video_url); ?>" class="large-text" placeholder="https://www.youtube.com/watch?v=xxx" />
                        <p class="description">
                            <?php _e('Enter a YouTube or Vimeo URL. The video ID and type will be auto-detected.', 'sakwood'); ?>
                        </p>
                        <button type="button" id="detect_video_btn" class="button">
                            <?php _e('Detect Video Info', 'sakwood'); ?>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th><label for="video_type"><?php _e('Video Type', 'sakwood'); ?></label></th>
                    <td>
                        <select id="video_type" name="video_type">
                            <option value="youtube" <?php selected($video_type, 'youtube'); ?>><?php _e('YouTube', 'sakwood'); ?></option>
                            <option value="vimeo" <?php selected($video_type, 'vimeo'); ?>><?php _e('Vimeo', 'sakwood'); ?></option>
                        </select>
                        <p class="description"><?php _e('Usually auto-detected from URL', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label for="video_id"><?php _e('Video ID', 'sakwood'); ?></label></th>
                    <td>
                        <input type="text" id="video_id" name="video_id" value="<?php echo esc_attr($video_id); ?>" class="regular-text" readonly />
                        <p class="description"><?php _e('Auto-extracted from URL (read-only)', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label for="video_duration"><?php _e('Duration', 'sakwood'); ?></label></th>
                    <td>
                        <input type="text" id="video_duration" name="video_duration" value="<?php echo esc_attr($video_duration); ?>" class="small-text" placeholder="12:34" />
                        <p class="description"><?php _e('Format: MM:SS or HH:MM:SS', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label for="video_category"><?php _e('Category', 'sakwood'); ?></label></th>
                    <td>
                        <select id="video_category" name="video_category">
                            <?php foreach ($categories as $value => $label) : ?>
                                <option value="<?php echo esc_attr($value); ?>" <?php selected($video_category, $value); ?>>
                                    <?php echo esc_html($label); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th><label for="video_position"><?php _e('Position', 'sakwood'); ?></label></th>
                    <td>
                        <input type="number" id="video_position" name="video_position" value="<?php echo esc_attr($video_position); ?>" class="small-text" min="0" />
                        <p class="description"><?php _e('Display order (lower numbers first)', 'sakwood'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th><label for="video_thumbnail_url"><?php _e('Custom Thumbnail', 'sakwood'); ?></label></th>
                    <td>
                        <input type="url" id="video_thumbnail_url" name="video_thumbnail_url" value="<?php echo esc_attr($video_thumbnail_url); ?>" class="regular-text" />
                        <p class="description"><?php _e('Optional: override auto-fetched thumbnail', 'sakwood'); ?></p>
                    </td>
                </tr>
            </table>

            <?php if (!empty($video_url)) : ?>
                <div id="video_preview" style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
                    <h4><?php _e('Video Preview', 'sakwood'); ?></h4>
                    <?php echo $this->get_video_embed($video_url, $video_type, $video_id); ?>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }

    /**
     * Render English Meta Box
     */
    public function render_english_meta_box($post) {
        $title_en = get_post_meta($post->ID, '_video_title_en', true);
        $description_en = get_post_meta($post->ID, '_video_description_en', true);

        ?>
        <div class="sakwood-video-english">
            <p>
                <label for="video_title_en"><strong><?php _e('Title (English)', 'sakwood'); ?></strong></label><br>
                <input type="text" id="video_title_en" name="video_title_en" value="<?php echo esc_attr($title_en); ?>" class="large-text" />
                <span class="description"><?php _e('Leave empty to use Thai title', 'sakwood'); ?></span>
            </p>
            <p>
                <label for="video_description_en"><strong><?php _e('Description (English)', 'sakwood'); ?></strong></label><br>
                <textarea id="video_description_en" name="video_description_en" rows="4" class="large-text"><?php echo esc_textarea($description_en); ?></textarea>
                <span class="description"><?php _e('Leave empty to use Thai content', 'sakwood'); ?></span>
            </p>
        </div>
        <?php
    }

    /**
     * Get video embed HTML
     */
    private function get_video_embed($url, $type, $video_id) {
        if (empty($video_id)) {
            return '<p>' . __('Video ID not found', 'sakwood') . '</p>';
        }

        if ($type === 'youtube') {
            return '<iframe width="560" height="315" src="https://www.youtube.com/embed/' . esc_attr($video_id) . '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } elseif ($type === 'vimeo') {
            return '<iframe src="https://player.vimeo.com/video/' . esc_attr($video_id) . '?h=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        }

        return '<p>' . __('Invalid video type', 'sakwood') . '</p>';
    }

    /**
     * Admin footer script for video detection
     */
    public function admin_footer_script() {
        global $post;
        if (!$post || $post->post_type !== 'video_gallery') {
            return;
        }
        ?>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('#detect_video_btn').on('click', function() {
                const url = $('#video_url').val();
                if (!url) {
                    alert('<?php _e('Please enter a video URL first', 'sakwood'); ?>');
                    return;
                }

                // Detect YouTube
                const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                if (youtubeMatch) {
                    $('#video_type').val('youtube');
                    $('#video_id').val(youtubeMatch[1]);
                    alert('<?php _e('YouTube video detected!', 'sakwood'); ?>');
                    return;
                }

                // Detect Vimeo
                const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
                if (vimeoMatch) {
                    $('#video_type').val('vimeo');
                    $('#video_id').val(vimeoMatch[1]);
                    alert('<?php _e('Vimeo video detected!', 'sakwood'); ?>');
                    return;
                }

                alert('<?php _e('Could not detect video. Please check the URL.', 'sakwood'); ?>');
            });
        });
        </script>
        <?php
    }

    /**
     * Save Meta Box
     */
    public function save_meta_box($post_id) {
        // Check nonce
        if (!isset($_POST['video_gallery_meta_box_nonce']) ||
            !wp_verify_nonce($_POST['video_gallery_meta_box_nonce'], 'video_gallery_meta_box')) {
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

        // Save video URL
        if (isset($_POST['video_url'])) {
            $url = esc_url_raw($_POST['video_url']);
            update_post_meta($post_id, '_video_url', $url);

            // Auto-detect video type and ID
            $video_type = sanitize_text_field($_POST['video_type']);
            $video_id = sanitize_text_field($_POST['video_id']);

            // If video ID is empty, try to auto-detect
            if (empty($video_id) && !empty($url)) {
                $youtube_match = preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/', $url, $matches);
                if ($youtube_match) {
                    $video_type = 'youtube';
                    $video_id = $matches[1];
                } else {
                    $vimeo_match = preg_match('/vimeo\.com\/(\d+)/', $url, $matches);
                    if ($vimeo_match) {
                        $video_type = 'vimeo';
                        $video_id = $matches[1];
                    }
                }
            }

            update_post_meta($post_id, '_video_type', $video_type);
            update_post_meta($post_id, '_video_id', $video_id);
        }

        // Save other fields
        if (isset($_POST['video_duration'])) {
            update_post_meta($post_id, '_video_duration', sanitize_text_field($_POST['video_duration']));
        }

        if (isset($_POST['video_category'])) {
            update_post_meta($post_id, '_video_category', sanitize_text_field($_POST['video_category']));
        }

        if (isset($_POST['video_position'])) {
            update_post_meta($post_id, '_video_position', absint($_POST['video_position']));
        }

        if (isset($_POST['video_thumbnail_url'])) {
            update_post_meta($post_id, '_video_thumbnail_url', esc_url_raw($_POST['video_thumbnail_url']));
        }

        if (isset($_POST['video_title_en'])) {
            update_post_meta($post_id, '_video_title_en', sanitize_text_field($_POST['video_title_en']));
        }

        if (isset($_POST['video_description_en'])) {
            update_post_meta($post_id, '_video_description_en', sanitize_textarea_field($_POST['video_description_en']));
        }
    }
}

// Initialize
new Sakwood_Video_Gallery_CPT();
