<?php
/**
 * Menu REST API
 *
 * Provides multilingual menu endpoints for Sakwood Next.js frontend
 *
 * @package SakwoodIntegration
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Sakwood_Menu_REST_API
 *
 * Registers REST API endpoints for multilingual menu support
 */
class Sakwood_Menu_REST_API {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        register_rest_route('sakwood/v1', '/menu', array(
            'methods'             => 'GET',
            'callback'            => array($this, 'get_menu'),
            'permission_callback' => '__return_true',
            'args'                => array(
                'lang' => array(
                    'required'          => false,
                    'default'           => 'th',
                    'validate_callback' => function($param) {
                        return in_array($param, array('th', 'en'));
                    },
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));
    }

    /**
     * Get menu items based on language
     *
     * @param WP_REST_Request $request Full request object
     * @return WP_REST_Response|WP_Error Response object or error
     */
    public function get_menu($request) {
        $lang = $request->get_param('lang');

        // Determine menu location based on language
        // WordPress themes typically register 'primary' not 'PRIMARY_EN'/'PRIMARY_TH'
        $location = $lang === 'en' ? 'primary' : 'primary';

        // Get menu items from the specified location
        $menu_items = $this->get_menu_items_by_location($location);

        // If no items found, try the common location names
        if (empty($menu_items)) {
            // Try alternative location names that WordPress themes commonly use
            $alt_locations = array('primary', 'main', 'menu-1', 'menu-primary');
            foreach ($alt_locations as $alt_loc) {
                $items = $this->get_menu_items_by_location($alt_loc);
                if (!empty($items)) {
                    $menu_items = $items;
                    break;
                }
            }
        }

        // If still empty, return empty array
        if (empty($menu_items)) {
            return rest_ensure_response(array());
        }

        // Build hierarchical menu tree
        $menu_tree = $this->build_menu_tree($menu_items);

        return rest_ensure_response($menu_tree);
    }

    /**
     * Get menu items by location
     *
     * @param string $location Menu location identifier
     * @return array Menu items
     */
    private function get_menu_items_by_location($location) {
        // Get all registered nav menus
        $locations = get_nav_menu_locations();

        // Check if the location exists
        if (!isset($locations[$location]) || !$locations[$location]) {
            return array();
        }

        $menu_id = $locations[$location];

        // Get menu items
        $menu_items = wp_get_nav_menu_items($menu_id, array(
            'post_status' => 'publish',
        ));

        if (empty($menu_items) || is_wp_error($menu_items)) {
            return array();
        }

        return $menu_items;
    }

    /**
     * Build hierarchical menu tree
     *
     * @param array $menu_items Flat array of menu items
     * @return array Hierarchical menu tree
     */
    private function build_menu_tree($menu_items) {
        // Convert menu items to a simpler format
        $items = array();
        foreach ($menu_items as $item) {
            $items[] = array(
                'id'       => strval($item->ID),
                'label'    => $item->title,
                'path'     => $this->extract_path_from_url($item->url),
                'url'      => $item->url,
                'target'   => $item->target ?: '_self',
                'parentId' => $item->menu_item_parent ? strval($item->menu_item_parent) : null,
                'order'    => intval($item->menu_order),
            );
        }

        // Build hierarchical structure
        $tree = $this->build_tree_recursive($items);

        return $tree;
    }

    /**
     * Extract path from URL
     *
     * @param string $url Full URL
     * @return string Path (e.g., /products)
     */
    private function extract_path_from_url($url) {
        $parsed = parse_url($url);
        return isset($parsed['path']) ? $parsed['path'] : '/';
    }

    /**
     * Build tree recursively
     *
     * @param array $items Flat array of menu items
     * @param string|null $parent_id Parent ID
     * @return array Tree structure
     */
    private function build_tree_recursive($items, $parent_id = null) {
        $tree = array();

        foreach ($items as $item) {
            if ($item['parentId'] === $parent_id) {
                $children = $this->build_tree_recursive($items, $item['id']);

                if (!empty($children)) {
                    $item['children'] = $children;
                }

                $tree[] = $item;
            }
        }

        // Sort by order
        usort($tree, function($a, $b) {
            return $a['order'] - $b['order'];
        });

        return $tree;
    }
}

// Initialize the Menu REST API
new Sakwood_Menu_REST_API();
