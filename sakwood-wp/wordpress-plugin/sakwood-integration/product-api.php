<?php
/**
 * Products REST API
 *
 * Custom REST API endpoint for products with language filtering
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Product_API {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Sanitize slug without removing Thai characters
     */
    public function sanitize_slug_preserve_thai($slug) {
        // Just URL decode and return - no sanitization to preserve Thai characters
        return urldecode($slug);
    }

    /**
     * Register REST API routes
     */
    public function register_routes() {
        register_rest_route('sakwood/v1', '/products', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_products'),
            'permission_callback' => '__return_true',
            'args' => array(
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'category' => array(
                    'default' => '',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'per_page' => array(
                    'default' => 10,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));

        // GET route for retrieving a single product
        register_rest_route('sakwood/v1', '/products/(?P<slug>[^/]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_product_by_slug'),
            'permission_callback' => '__return_true',
            'args' => array(
                'slug' => array(
                    'required' => true,
                    'sanitize_callback' => array($this, 'sanitize_slug_preserve_thai'), // Custom sanitization to preserve Thai
                ),
                'language' => array(
                    'default' => 'th',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));

        // POST route for updating a product
        register_rest_route('sakwood/v1', '/products/(?P<slug>[^/]+)', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_product'),
            'permission_callback' => '__return_true', // TODO: Add proper authentication
            'args' => array(
                'slug' => array(
                    'required' => true,
                    'sanitize_callback' => array($this, 'sanitize_slug_preserve_thai'),
                ),
                'regular_price' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'sale_price' => array(
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'stock_status' => array(
                    'required' => false,
                    'validate_callback' => function($param) {
                        return in_array($param, array('instock', 'outofstock', 'onbackorder'));
                    },
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));
    }

    /**
     * Get products with language filtering
     */
    public function get_products($request) {
        $language = $request->get_param('language');
        $category = $request->get_param('category');
        $per_page = $request->get_param('per_page');
        $page = $request->get_param('page');

        // Build query arguments for WooCommerce
        $args = array(
            'status' => 'publish',
            'limit' => $per_page,
            'page' => $page,
        );

        // Add category filter if provided
        if (!empty($category)) {
            $args['category'] = array($category);
        }

        $products = wc_get_products($args);

        if (empty($products)) {
            return rest_ensure_response(array());
        }

        $formatted_products = array();

        foreach ($products as $product) {
            // Format each product with the requested language content
            $formatted_products[] = $this->format_product($product, $language);
        }

        return rest_ensure_response($formatted_products);
    }

    /**
     * Get single product by slug with language filtering
     */
    public function get_product_by_slug($request) {
        $slug = $request->get_param('slug');
        $language = $request->get_param('language');

        // Get product by slug using standard WordPress query
        $args = array(
            'name' => $slug,
            'post_type' => 'product',
            'post_status' => 'publish',
            'numberposts' => 1
        );

        $posts = get_posts($args);

        if (empty($posts)) {
            return new WP_Error('product_not_found', __('Product not found', 'sakwood-integration'), array('status' => 404));
        }

        $post = $posts[0];
        $product = wc_get_product($post->ID);

        if (!$product) {
            return new WP_Error('product_not_found', __('Product not found', 'sakwood-integration'), array('status' => 404));
        }

        // Format product with requested language
        return rest_ensure_response($this->format_product($product, $language));
    }

    /**
     * Format product data for API response
     */
    private function format_product($product, $language = 'th') {
        // Get basic product data
        $image_id = $product->get_image_id();
        $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'full') : null;

        // Get gallery images
        $gallery_images = array();
        $attachment_ids = $product->get_gallery_image_ids();
        foreach ($attachment_ids as $attachment_id) {
            $gallery_images[] = array(
                'sourceUrl' => wp_get_attachment_image_url($attachment_id, 'full'),
                'altText' => get_post_meta($attachment_id, '_wp_attachment_image_alt', true),
            );
        }

        // Get custom meta fields (dimensions)
        $width = get_post_meta($product->get_id(), '_product_width', true);
        $length = get_post_meta($product->get_id(), '_product_length', true);
        $thickness = get_post_meta($product->get_id(), '_product_thickness', true);

        // Get product categories with language support
        $category_terms = get_the_terms($product->get_id(), 'product_cat');
        $categories = array();
        if ($category_terms && !is_wp_error($category_terms)) {
            foreach ($category_terms as $term) {
                // Get category name in requested language
                $cat_name = $term->name;
                if ($language === 'en') {
                    $name_en = get_term_meta($term->term_id, 'category_name_en', true);
                    if (!empty($name_en)) {
                        $cat_name = $name_en;
                    }
                }

                $categories[] = array(
                    'id' => $term->term_id,
                    'name' => $cat_name,
                    'slug' => $term->slug,
                );
            }
        }

        // Get content based on language
        if ($language === 'en') {
            // Use English meta fields
            $name = get_post_meta($product->get_id(), '_product_title_en', true) ?: $product->get_title();
            $description = get_post_meta($product->get_id(), '_product_description_en', true) ?: '';
            $short_description = get_post_meta($product->get_id(), '_product_short_description_en', true) ?: '';
        } else {
            // Use default Thai fields
            $name = $product->get_title();
            $description = $product->get_description() ?: '';
            $short_description = $product->get_short_description() ?: '';
        }

        // Get BOTH language versions for cart support
        $name_th = $product->get_title();
        $name_en = get_post_meta($product->get_id(), '_product_title_en', true);
        $short_description_th = $product->get_short_description() ?: '';
        $short_description_en = get_post_meta($product->get_id(), '_product_short_description_en', true);

        $formatted_product = array(
            'id' => $product->get_id(),
            'databaseId' => $product->get_id(),
            'name' => $name,
            'slug' => urldecode($product->get_slug()),
            'sku' => $product->get_sku(),
            'language' => $language,
            'price' => $product->get_price(),
            'regularPrice' => $product->get_regular_price(),
            'description' => wp_strip_all_tags($description),
            'shortDescription' => wp_strip_all_tags($short_description),
            'image' => $image_url ? array(
                'sourceUrl' => $image_url,
            ) : null,
            'galleryImages' => array(
                'nodes' => $gallery_images,
            ),
            'stockStatus' => $product->get_stock_status(),
            // Always include both language versions
            'name_th' => $name_th,
            'name_en' => $name_en ?: null,
            'shortDescription_th' => $short_description_th,
            'shortDescription_en' => $short_description_en ?: null,
            'width' => $width,
            'length' => $length,
            'thickness' => $thickness,
            'categories' => $categories,
        );

        // Apply filter to allow other plugins to modify product data (e.g., price types)
        return apply_filters('sakwood_product_api_format', $formatted_product, $product);
    }

    /**
     * Update product (Quick Edit for Dashboard)
     */
    public function update_product($request) {
        $slug = $request->get_param('slug');
        $params = $request->get_params();

        // Log for debugging
        error_log('Sakwood Product Update: Slug = ' . $slug);
        error_log('Sakwood Product Update: Params = ' . print_r($params, true));

        // Get product by slug
        $args = array(
            'name' => $slug,
            'post_type' => 'product',
            'post_status' => 'any',
            'numberposts' => 1
        );

        $posts = get_posts($args);

        if (empty($posts)) {
            error_log('Sakwood Product Update: Product not found for slug = ' . $slug);
            return new WP_Error(
                'product_not_found',
                'Product not found',
                array('status' => 404)
            );
        }

        $product = wc_get_product($posts[0]->ID);

        if (!$product) {
            error_log('Sakwood Product Update: Cannot create WC product for slug = ' . $slug);
            return new WP_Error(
                'product_not_found',
                'Product not found',
                array('status' => 404)
            );
        }

        error_log('Sakwood Product Update: Product found = ' . $product->get_name() . ' (ID: ' . $product->get_id() . ')');

        // Update regular price
        if (isset($params['regular_price']) && !empty($params['regular_price'])) {
            $product->set_regular_price($params['regular_price']);
            error_log('Sakwood Product Update: Set regular_price = ' . $params['regular_price']);
        }

        // Update sale price
        if (isset($params['sale_price'])) {
            $sale_price = $params['sale_price'];

            // If sale price is empty, remove it
            if (empty($sale_price) || $sale_price === '') {
                $product->set_sale_price('');
                error_log('Sakwood Product Update: Removed sale price');
            } else {
                $product->set_sale_price($sale_price);
                error_log('Sakwood Product Update: Set sale_price = ' . $sale_price);
            }
        }

        // Update stock status
        if (isset($params['stock_status'])) {
            $product->set_stock_status($params['stock_status']);
            error_log('Sakwood Product Update: Set stock_status = ' . $params['stock_status']);
        }

        // Save the product
        $result = $product->save();
        error_log('Sakwood Product Update: Save result = ' . print_r($result, true));

        // Clear product transients
        wc_delete_product_transients($product->get_id());

        error_log('Sakwood Product Update: Product updated successfully');

        // Get updated product data
        $updated_product = array(
            'id' => $product->get_id(),
            'databaseId' => $product->get_id(),
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'price' => $product->get_price(),
            'regularPrice' => $product->get_regular_price(),
            'stockStatus' => $product->get_stock_status(),
        );

        return rest_ensure_response($updated_product);
    }
}

// Initialize
new Sakwood_Product_API();
