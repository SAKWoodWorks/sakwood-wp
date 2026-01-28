<?php
/**
 * Wholesale Admin Interface
 *
 * Admin pages for managing wholesale applications
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Wholesale_Admin {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        // Use 'edit_posts' capability (available to Editors, Admins, Shop Managers)
        $capability = 'edit_posts';

        add_menu_page(
            'Wholesale Applications',
            'Wholesale',
            $capability,
            'sakwood-wholesale',
            array($this, 'applications_page'),
            'dashicons-groups',
            30
        );

        add_submenu_page(
            'sakwood-wholesale',
            'All Applications',
            'All Applications',
            $capability,
            'sakwood-wholesale',
            array($this, 'applications_page')
        );

        add_submenu_page(
            'sakwood-wholesale',
            'Pending Applications',
            'Pending',
            $capability,
            'sakwood-wholesale-pending',
            array($this, 'applications_page')
        );

        add_submenu_page(
            'sakwood-wholesale',
            'Approved Applications',
            'Approved',
            $capability,
            'sakwood-wholesale-approved',
            array($this, 'applications_page')
        );
    }

    /**
     * Enqueue admin scripts
     */
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'sakwood-wholesale') === false) {
            return;
        }

        wp_enqueue_style('wholesale-admin', SAKWOOD_PLUGIN_URL . 'assets/css/wholesale-admin.css', array(), SAKWOOD_VERSION);
    }

    /**
     * Applications list page
     */
    public function applications_page() {
        $status = isset($_GET['status']) ? sanitize_text_field($_GET['status']) : '';
        $page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
        $per_page = 20;
        $offset = ($page - 1) * $per_page;

        // Get applications
        $applications = Sakwood_Wholesale_Database::get_all_applications($status, $per_page, $offset);
        $total_count = Sakwood_Wholesale_Database::get_count_by_status($status);
        $total_pages = ceil($total_count / $per_page);

        // Get status counts
        $pending_count = Sakwood_Wholesale_Database::get_count_by_status('pending');
        $approved_count = Sakwood_Wholesale_Database::get_count_by_status('approved');
        $rejected_count = Sakwood_Wholesale_Database::get_count_by_status('rejected');
        $active_count = Sakwood_Wholesale_Database::get_count_by_status('active');

        // Handle bulk actions
        if (isset($_POST['action']) && isset($_POST['application_ids'])) {
            $this->handle_bulk_action();
        }

        include SAKWOOD_PLUGIN_DIR . 'templates/wholesale-applications.php';
    }

    /**
     * Handle bulk actions
     */
    private function handle_bulk_action() {
        if (!isset($_POST['_wpnonce']) || !wp_verify_nonce($_POST['_wpnonce'], 'bulk_wholesale_applications')) {
            return;
        }

        $action = sanitize_text_field($_POST['action']);
        $application_ids = array_map('intval', $_POST['application_ids']);

        foreach ($application_ids as $id) {
            // Get application by database ID, not application_id
            global $wpdb;
            $table_name = Sakwood_Wholesale_Database::get_table_name();
            $app = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $id));

            if ($app) {
                if ($action === 'approve') {
                    Sakwood_Wholesale_Database::update_status($app->application_id, 'approved', 50000);
                    $this->send_status_email($app, 'approved');
                } elseif ($action === 'reject') {
                    Sakwood_Wholesale_Database::update_status($app->application_id, 'rejected');
                    $this->send_status_email($app, 'rejected');
                }
            }
        }

        echo '<div class="notice notice-success is-dismissible"><p>Bulk action completed.</p></div>';
    }

    /**
     * Get status label
     */
    public static function get_status_label($status) {
        $labels = array(
            'pending' => '<span style="color: #f0ad4e;">⏳ Pending Review</span>',
            'approved' => '<span style="color: #5cb85c;">✓ Approved</span>',
            'active' => '<span style="color: #5cb85c;">● Active</span>',
            'rejected' => '<span style="color: #d9534f;">✗ Rejected</span>',
        );

        return isset($labels[$status]) ? $labels[$status] : $status;
    }

    /**
     * Send status email
     */
    private function send_status_email($application, $status) {
        $user = get_userdata($application->user_id);
        if (!$user) {
            return false;
        }

        $to = $user->user_email;
        $subject = '';

        if ($status === 'approved') {
            $subject = 'Your Wholesale Application Has Been Approved!';
            $message = "Dear {$user->first_name},\n\n";
            $message .= "Great news! Your wholesale application for {$application->company_name} has been approved.\n\n";
            $message .= "You now have access to:\n";
            $message .= "- 15% discount on all products\n";
            $message .= "- Net-30 payment terms\n";
            $message .= "- Dedicated account manager\n\n";
            $message .= "Your credit limit: ฿" . number_format($application->credit_limit, 0) . "\n\n";
            $message .= "Start shopping at: " . home_url('/wholesale') . "\n\n";
            $message .= "Best regards,\nSakwood Team";
        } elseif ($status === 'rejected') {
            $subject = 'Regarding Your Wholesale Application';
            $message = "Dear {$user->first_name},\n\n";
            $message .= "Thank you for your interest in our wholesale program.\n\n";
            $message .= "Unfortunately, we are unable to approve your application at this time. ";
            $message .= "This decision may be due to various factors including business verification, ";
            $message .= "estimated volume, or current capacity.\n\n";
            $message .= "We encourage you to apply again in the future.\n\n";
            $message .= "If you have questions, please contact our support team.\n\n";
            $message .= "Best regards,\nSakwood Team";
        }

        $headers = array('Content-Type: text/plain; charset=UTF-8');

        return wp_mail($to, $subject, $message, $headers);
    }
}

// Initialize admin
new Sakwood_Wholesale_Admin();
