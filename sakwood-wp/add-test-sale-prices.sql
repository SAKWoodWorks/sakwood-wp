-- Quick script to add sale prices to products for testing
-- This sets regular_price and sale_price meta fields in WordPress

-- Get post_meta for a few products and add sale prices
-- Replace {product_id} with actual product IDs from wp_posts

-- Example: Add sale price to product ID 100
-- DELETE FROM wp_postmeta WHERE post_id = 100 AND meta_key IN ('_regular_price', '_sale_price');
-- INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES
-- (100, '_regular_price', '1000'),
-- (100, '_sale_price', '800');

-- Run this query to find your product IDs:
SELECT ID, post_title FROM wp_posts WHERE post_type = 'product' LIMIT 10;
