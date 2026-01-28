<?php
require_once('/var/www/html/wp-load.php');

$posts = get_posts(array(
    'post_type' => 'contact_submission',
    'posts_per_page' => 5,
));

echo "Found " . count($posts) . " contact submissions\n\n";

foreach ($posts as $post) {
    echo "Title: " . $post->post_title . "\n";
    echo "Name: " . get_post_meta($post->ID, 'contact_name', true) . "\n";
    echo "Email: " . get_post_meta($post->ID, 'contact_email', true) . "\n";
    echo "Phone: " . get_post_meta($post->ID, 'contact_phone', true) . "\n";
    echo "Message: " . wp_trim_words($post->post_content, 10) . "...\n";
    echo "---\n";
}
