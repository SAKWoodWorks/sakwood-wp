<?php
/**
 * Video Gallery REST API
 *
 * Custom REST API endpoints for video gallery with language support
 * Thai content from default fields, English from meta fields
 * Auto-fetches thumbnails from YouTube/Vimeo
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Video_Gallery_REST_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Sanitize slug without removing Thai characters
     */
    public function sanitize_slug_preserve_thai($slug) {
        return urldecode($slug);
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        // Get all videos with language filter
        register_rest_route('sakwood/v1', '/videos', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_videos'),
            'permission_callback' => '__return_true',
            'args' => array(
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'category' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'per_page' => array(
                    'default' => 50,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // Get single video by slug with language filter
        register_rest_route('sakwood/v1', '/videos/(?P<slug>[^/]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_video_by_slug'),
            'permission_callback' => '__return_true',
            'args' => array(
                'slug' => array(
                    'required' => true,
                    'sanitize_callback' => array($this, 'sanitize_slug_preserve_thai'),
                ),
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));

        // Get video categories
        register_rest_route('sakwood/v1', '/video-categories', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_video_categories'),
            'permission_callback' => '__return_true',
        ));

        // Search videos
        register_rest_route('sakwood/v1', '/videos/search', array(
            'methods' => 'GET',
            'callback' => array($this, 'search_videos'),
            'permission_callback' => '__return_true',
            'args' => array(
                'q' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'category' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));
    }

    /**
     * Get videos with language filtering
     */
    public function get_videos($request) {
        $language = $request->get_param('language');
        $category = $request->get_param('category');
        $per_page = $request->get_param('per_page');
        $page = $request->get_param('page');

        // Build query args
        $args = array(
            'post_type' => 'video_gallery',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'orderby' => 'meta_value_num',
            'meta_key' => '_video_position',
            'order' => 'ASC',
        );

        // Filter by category (meta field)
        if (!empty($category)) {
            $args['meta_query'] = array(
                array(
                    'key' => '_video_category',
                    'value' => $category,
                    'compare' => '=',
                ),
            );
        }

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_videos = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_videos[] = $this->format_video($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_videos);
    }

    /**
     * Get single video by slug with language filtering
     */
    public function get_video_by_slug($request) {
        $slug = $request->get_param('slug');
        $language = $request->get_param('language');

        // Get video by slug
        $posts = get_posts(array(
            'name' => $slug,
            'post_type' => 'video_gallery',
            'post_status' => 'publish',
            'numberposts' => 1,
        ));

        if (empty($posts)) {
            return new WP_Error('video_not_found', __('Video not found', 'sakwood'), array('status' => 404));
        }

        $post = $posts[0];

        // Increment view count
        $view_count = get_post_meta($post->ID, '_video_views', true) ?: 0;
        update_post_meta($post->ID, '_video_views', $view_count + 1);

        // Return the video with appropriate language content
        return rest_ensure_response($this->format_video($post, $language));
    }

    /**
     * Get video categories
     */
    public function get_video_categories($request) {
        $categories = array(
            array(
                'id' => 'product-tutorial',
                'name' => __('Product Tutorial', 'sakwood'),
                'slug' => 'product-tutorial',
            ),
            array(
                'id' => 'company-news',
                'name' => __('Company News', 'sakwood'),
                'slug' => 'company-news',
            ),
            array(
                'id' => 'installation-guide',
                'name' => __('Installation Guide', 'sakwood'),
                'slug' => 'installation-guide',
            ),
            array(
                'id' => 'customer-story',
                'name' => __('Customer Story', 'sakwood'),
                'slug' => 'customer-story',
            ),
            array(
                'id' => 'other',
                'name' => __('Other', 'sakwood'),
                'slug' => 'other',
            ),
        );

        return rest_ensure_response($categories);
    }

    /**
     * Search videos
     */
    public function search_videos($request) {
        $query = $request->get_param('q');
        $language = $request->get_param('language');
        $category = $request->get_param('category');

        // Build query args
        $args = array(
            'post_type' => 'video_gallery',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            's' => $query,
            'orderby' => 'meta_value_num',
            'meta_key' => '_video_position',
            'order' => 'ASC',
        );

        // Filter by category
        if (!empty($category)) {
            $args['meta_query'] = array(
                array(
                    'key' => '_video_category',
                    'value' => $category,
                    'compare' => '=',
                ),
            );
        }

        $posts_query = new WP_Query($args);

        if (!$posts_query->have_posts()) {
            return rest_ensure_response(array());
        }

        $formatted_videos = array();

        while ($posts_query->have_posts()) {
            $posts_query->the_post();
            global $post;
            $formatted_videos[] = $this->format_video($post, $language);
        }

        wp_reset_postdata();

        return rest_ensure_response($formatted_videos);
    }

    /**
     * Get video thumbnail URL from YouTube or Vimeo
     */
    private function get_video_thumbnail($video_type, $video_id, $custom_thumbnail = '') {
        // Return custom thumbnail if provided
        if (!empty($custom_thumbnail)) {
            return $custom_thumbnail;
        }

        // Auto-fetch from YouTube
        if ($video_type === 'youtube' && !empty($video_id)) {
            return "https://img.youtube.com/vi/{$video_id}/maxresdefault.jpg";
        }

        // Auto-fetch from Vimeo (requires API, return placeholder)
        if ($video_type === 'vimeo' && !empty($video_id)) {
            // Vimeo thumbnail requires their API, return a placeholder URL
            // In production, you would use Vimeo oEmbed API
            return "https://placehold.co/1280x720/1a1a1a/FFF?text=Vimeo+Video";
        }

        return null;
    }

    /**
     * Format video data for API response based on language
     */
    private function format_video($post, $language = 'th') {
        // Get language-specific content
        if ($language === 'en') {
            // Try to get English content from meta fields
            $title = get_post_meta($post->ID, '_video_title_en', true);
            $description = get_post_meta($post->ID, '_video_description_en', true);

            // Fall back to Thai content if English translation is missing
            if (empty($title)) {
                $title = get_the_title($post->ID);
            }
            if (empty($description)) {
                $description = apply_filters('the_content', $post->post_content);
            }
        } else {
            // Use Thai content from default WordPress fields
            $title = get_the_title($post->ID);
            $description = apply_filters('the_content', $post->post_content);
        }

        // Get video meta fields
        $video_url = get_post_meta($post->ID, '_video_url', true);
        $video_type = get_post_meta($post->ID, '_video_type', true) ?: 'youtube';
        $video_id = get_post_meta($post->ID, '_video_id', true);
        $video_duration = get_post_meta($post->ID, '_video_duration', true);
        $video_category = get_post_meta($post->ID, '_video_category', true) ?: 'other';
        $video_position = get_post_meta($post->ID, '_video_position', true) ?: 0;
        $custom_thumbnail = get_post_meta($post->ID, '_video_thumbnail_url', true);
        $video_views = get_post_meta($post->ID, '_video_views', true) ?: 0;

        // Get featured image (fallback if no video thumbnail)
        $featured_image = null;
        if (has_post_thumbnail($post->ID)) {
            $featured_image_id = get_post_thumbnail_id($post->ID);
            $featured_image = array(
                'sourceUrl' => wp_get_attachment_image_url($featured_image_id, 'full'),
                'altText' => get_post_meta($featured_image_id, '_wp_attachment_image_alt', true),
            );
        }

        // Auto-fetch thumbnail or use featured image
        $thumbnail_url = $this->get_video_thumbnail($video_type, $video_id, $custom_thumbnail);
        if (!$thumbnail_url && $featured_image) {
            $thumbnail_url = $featured_image['sourceUrl'];
        }

        return array(
            'id' => $post->ID,
            'databaseId' => $post->ID,
            'title' => $title,
            'slug' => $post->post_name,
            'description' => $description,
            'excerpt' => wp_trim_words($description, 30),
            'date' => get_the_date('c', $post->ID),
            'videoUrl' => $video_url,
            'videoType' => $video_type,
            'videoId' => $video_id,
            'videoDuration' => $video_duration,
            'videoCategory' => $video_category,
            'videoPosition' => (int) $video_position,
            'thumbnailUrl' => $thumbnail_url,
            'featuredImage' => $featured_image ? array('node' => $featured_image) : null,
            'views' => (int) $video_views,
            'language' => $language,
        );
    }
}

// Initialize
new Sakwood_Video_Gallery_REST_API();
