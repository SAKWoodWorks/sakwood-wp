<?php
/**
 * Blog Language Meta Box
 *
 * Adds English translation fields to post editor
 * Thai content is entered in the main post fields, English translations in this meta box
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Blog_Language_Meta_Box {

    public function __construct() {
        add_action('add_meta_boxes', array($this, 'add_meta_box'));
        add_action('save_post', array($this, 'save_meta_box'), 10, 2);
        // Display language indicator on post list (moved to blog-language-translation.php)
    }

    /**
     * Add meta box to post editor
     */
    public function add_meta_box() {
        add_meta_box(
            'sakwood_post_language_fields',
            __('English Translation', 'sakwood-integration'),
            array($this, 'render_meta_box'),
            'post',
            'normal',
            'high'
        );
    }

    /**
     * Render meta box content
     */
    public function render_meta_box($post) {
        wp_nonce_field('sakwood_post_language_nonce', 'sakwood_post_language_nonce');

        // Get existing English translations
        $title_en = get_post_meta($post->ID, '_post_title_en', true);
        $content_en = get_post_meta($post->ID, '_post_content_en', true);
        $excerpt_en = get_post_meta($post->ID, '_post_excerpt_en', true);

        ?>
        <div class="sakwood-blog-language-meta-box">
            <p class="description">
                <?php _e('Enter the English translation for this post below. The Thai content is entered in the main post fields above.', 'sakwood-integration'); ?>
            </p>

            <table class="form-table">
                <tr>
                    <th><label for="_post_title_en"><?php _e('Post Title (English)', 'sakwood-integration'); ?></label></th>
                    <td>
                        <input
                            type="text"
                            id="_post_title_en"
                            name="_post_title_en"
                            value="<?php echo esc_attr($title_en); ?>"
                            class="large-text"
                        />
                    </td>
                </tr>
                <tr>
                    <th><label for="_post_excerpt_en"><?php _e('Excerpt (English)', 'sakwood-integration'); ?></label></th>
                    <td>
                        <textarea
                            id="_post_excerpt_en"
                            name="_post_excerpt_en"
                            rows="5"
                            class="large-text"
                        ><?php echo esc_textarea($excerpt_en); ?></textarea>
                    </td>
                </tr>
                <tr>
                    <th><label for="_post_content_en"><?php _e('Content (English)', 'sakwood-integration'); ?></label></th>
                    <td>
                        <?php
                        wp_editor(
                            $content_en,
                            '_post_content_en',
                            array(
                                'textarea_name' => '_post_content_en',
                                'media_buttons' => true,
                                'textarea_rows' => 15,
                                'teeny' => false
                            )
                        );
                        ?>
                    </td>
                </tr>
            </table>
        </div>
        <?php
    }

    /**
     * Save meta box data
     */
    public function save_meta_box($post_id, $post) {
        // Check nonce
        if (!isset($_POST['sakwood_post_language_nonce']) ||
            !wp_verify_nonce($_POST['sakwood_post_language_nonce'], 'sakwood_post_language_nonce')) {
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

        // Don't save for revisions
        if (wp_is_post_revision($post_id)) {
            return;
        }

        // Save English translations
        $fields = array(
            '_post_title_en',
            '_post_content_en',
            '_post_excerpt_en'
        );

        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, $field, wp_kses_post($_POST[$field]));
            }
        }
    }
}

// Initialize
new Sakwood_Blog_Language_Meta_Box();
