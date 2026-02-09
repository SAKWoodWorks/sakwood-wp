<?php
/**
 * Bulk User Import for Sakwood Team Members
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Bulk_User_Import {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_post_sakwood_bulk_import_users', array($this, 'handle_import'));
    }

    /**
     * Add admin menu page
     */
    public function add_admin_menu() {
        add_users_page(
            'Bulk Import Users',
            'Bulk Import',
            'create_users',
            'sakwood-bulk-user-import',
            array($this, 'render_import_page')
        );
    }

    /**
     * Render import page
     */
    public function render_import_page() {
        if (!current_user_can('create_users')) {
            wp_die('You do not have permission to access this page.');
        }
        ?>
        <div class="wrap">
            <h1>Bulk Import Users (@sakww.com only)</h1>

            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>Import Team Members</h2>
                <p>Enter one user per line in the format: <code>email@sakww.com, role</code></p>

                <form method="post" action="<?php echo admin_url('admin-post.php'); ?>">
                    <input type="hidden" name="action" value="sakwood_bulk_import_users">
                    <?php wp_nonce_field('sakwood_bulk_import_users', 'sakwood_import_nonce'); ?>

                    <table class="form-table">
                        <tr>
                            <th><label for="users_list">Users List (email, role)</label></th>
                            <td>
                                <textarea
                                    name="users_list"
                                    id="users_list"
                                    rows="15"
                                    cols="50"
                                    class="large-text code"
                                    placeholder="jatjarin@sakww.com, administrator&#10;top@sakww.com, editor&#10;manager@sakww.com, shop_manager"
                                    required
                                ></textarea>
                                <p class="description">
                                    <strong>Format:</strong> email@sakww.com, role (one per line)<br>
                                    <strong>Available roles:</strong> administrator, editor, author, contributor, subscriber, shop_manager, customer
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="default_password">Default Password</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="default_password"
                                    id="default_password"
                                    class="regular-text"
                                    value=""
                                    placeholder="Leave empty to generate random passwords"
                                >
                                <p class="description">
                                    Leave empty to auto-generate secure passwords. Users will need to reset their password on first login.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="send_notification">Send Email Notification</label></th>
                            <td>
                                <label>
                                    <input type="checkbox" name="send_notification" value="1" checked>
                                    Send welcome email with password reset link to new users
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th><label for="skip_existing">Skip Existing Users</label></th>
                            <td>
                                <label>
                                    <input type="checkbox" name="skip_existing" value="1" checked>
                                    Skip users that already exist (update role instead)
                                </label>
                            </td>
                        </tr>
                    </table>

                    <?php submit_button('Import Users', 'primary'); ?>
                </form>
            </div>

            <?php $this->show_import_history(); ?>
        </div>

        <style>
            .import-result {
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .import-result.success {
                background: #edfaef;
                border-left: 4px solid #00a32a;
            }
            .import-result.error {
                background: #fef5f5;
                border-left: 4px solid #d63638;
            }
            .import-result ul {
                margin: 10px 0 0 20px;
            }
            .import-result li {
                margin: 5px 0;
            }
        </style>
        <?php
    }

    /**
     * Show import history from last request
     */
    private function show_import_history() {
        $results = get_transient('sakwood_bulk_import_results');

        if ($results) {
            $class = $results['errors'] > 0 ? 'error' : 'success';
            ?>
            <div class="import-result <?php echo $class; ?>">
                <h3>Import Results</h3>
                <p>
                    <strong>Processed:</strong> <?php echo $results['total']; ?> lines |
                    <strong>Created:</strong> <?php echo $results['created']; ?> |
                    <strong>Updated:</strong> <?php echo $results['updated']; ?> |
                    <strong>Errors:</strong> <?php echo $results['errors']; ?>
                </p>
                <?php if (!empty($results['messages'])): ?>
                    <ul>
                        <?php foreach ($results['messages'] as $message): ?>
                            <li><?php echo esc_html($message); ?></li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
            <?php
            delete_transient('sakwood_bulk_import_results');
        }
    }

    /**
     * Handle bulk import
     */
    public function handle_import() {
        // Verify nonce
        if (!isset($_POST['sakwood_import_nonce']) || !wp_verify_nonce($_POST['sakwood_import_nonce'], 'sakwood_bulk_import_users')) {
            wp_die('Security check failed.');
        }

        // Check permissions
        if (!current_user_can('create_users')) {
            wp_die('You do not have permission to import users.');
        }

        // Get form data
        $users_list = isset($_POST['users_list']) ? sanitize_textarea_field($_POST['users_list']) : '';
        $default_password = isset($_POST['default_password']) ? $_POST['default_password'] : '';
        $send_notification = isset($_POST['send_notification']) && $_POST['send_notification'] == '1';
        $skip_existing = isset($_POST['skip_existing']) && $_POST['skip_existing'] == '1';

        if (empty($users_list)) {
            wp_redirect(admin_url('users.php?page=sakwood-bulk-user-import&error=empty'));
            exit;
        }

        $results = array(
            'total' => 0,
            'created' => 0,
            'updated' => 0,
            'errors' => 0,
            'messages' => array()
        );

        $lines = explode("\n", $users_list);
        $valid_roles = array('administrator', 'editor', 'author', 'contributor', 'subscriber', 'shop_manager', 'customer');

        foreach ($lines as $line_num => $line) {
            $line = trim($line);
            if (empty($line)) {
                continue;
            }

            $results['total']++;

            // Parse line: email, role
            $parts = explode(',', $line);
            if (count($parts) < 2) {
                $results['errors']++;
                $results['messages'][] = "Line " . ($line_num + 1) . ": Invalid format. Use: email@domain.com, role";
                continue;
            }

            $email = trim($parts[0]);
            $role = trim($parts[1]);

            // Validate email domain
            if (!is_email($email) || substr(strrchr($email, "@"), 1) !== 'sakww.com') {
                $results['errors']++;
                $results['messages'][] = "Line " . ($line_num + 1) . " ($email): Invalid email or not @sakww.com domain";
                continue;
            }

            // Validate role
            if (!in_array($role, $valid_roles)) {
                $results['errors']++;
                $results['messages'][] = "Line " . ($line_num + 1) . " ($email): Invalid role '$role'";
                continue;
            }

            // Check if user exists
            $user = get_user_by('email', $email);

            if ($user) {
                // Update existing user
                if ($skip_existing) {
                    $user->set_role($role);
                    $results['updated']++;
                    $results['messages'][] = "✓ Updated: $email → $role";
                } else {
                    $results['errors']++;
                    $results['messages'][] = "Line " . ($line_num + 1) . " ($email): User already exists";
                }
            } else {
                // Create new user
                $username = $this->generate_username_from_email($email);
                $password = !empty($default_password) ? $default_password : wp_generate_password(16, true, true);

                $user_id = wp_create_user($username, $password, $email);

                if (is_wp_error($user_id)) {
                    $results['errors']++;
                    $results['messages'][] = "Line " . ($line_num + 1) . " ($email): " . $user_id->get_error_message();
                } else {
                    // Set role
                    $user = new WP_User($user_id);
                    $user->set_role($role);

                    $results['created']++;
                    $results['messages'][] = "✓ Created: $email → $role (username: $username)";

                    // Send notification
                    if ($send_notification) {
                        wp_new_user_notification($user_id, null, 'both');
                    }
                }
            }
        }

        // Store results
        set_transient('sakwood_bulk_import_results', $results, 30);

        // Redirect back
        wp_redirect(admin_url('users.php?page=sakwood-bulk-user-import&imported=1'));
        exit;
    }

    /**
     * Generate username from email
     */
    private function generate_username_from_email($email) {
        $username = sanitize_user(explode('@', $email)[0]);

        // If username exists, append number
        if (username_exists($username)) {
            $i = 2;
            do {
                $new_username = $username . $i;
                $i++;
            } while (username_exists($new_username));
            $username = $new_username;
        }

        return $username;
    }
}

// Initialize bulk user import
function sakwood_bulk_user_import_init() {
    return Sakwood_Bulk_User_Import::get_instance();
}
add_action('plugins_loaded', 'sakwood_bulk_user_import_init');
