<?php
/**
 * Diagnostic script for bulk import issues
 * Upload this to your WordPress root and access it directly
 */

// Prevent direct access from browser (remove this line to run)
// exit('Access denied');

echo "<h2>Sakwood Bulk Import Diagnostics</h2>";
echo "<style>body{font-family:sans-serif;margin:20px;} .ok{color:green;} .error{color:red;} .warning{color:orange;}</style>";

// Check PHP version
echo "<h3>PHP Configuration</h3>";
echo "PHP Version: " . PHP_VERSION . "<br>";

// Check upload limits
$upload_max = ini_get('upload_max_filesize');
$post_max = ini_get('post_max_size');
$memory_limit = ini_get('memory_limit');
$max_execution = ini_get('max_execution_time');

echo "<strong>Upload Limits:</strong><br>";
echo "upload_max_filesize: <span class='warning'>$upload_max</span><br>";
echo "post_max_size: <span class='warning'>$post_max</span><br>";
echo "memory_limit: <span class='ok'>$memory_limit</span><br>";
echo "max_execution_time: <span class='ok'>$max_execution_time seconds</span><br>";

// Check if values are sufficient
$upload_max_bytes = $this->return_bytes($upload_max);
$post_max_bytes = $this->return_bytes($post_max);

if ($upload_max_bytes < 50 * 1024 * 1024) {
    echo "<p class='error'>❌ upload_max_filesize is less than 50MB. ZIP uploads may fail.</p>";
} else {
    echo "<p class='ok'>✓ upload_max_filesize is sufficient</p>";
}

if ($post_max_bytes < 50 * 1024 * 1024) {
    echo "<p class='error'>❌ post_max_size is less than 50MB. ZIP uploads may fail.</p>";
} else {
    echo "<p class='ok'>✓ post_max_size is sufficient</p>";
}

// Check ZipArchive
echo "<h3>PHP Extensions</h3>";
if (class_exists('ZipArchive')) {
    echo "<p class='ok'>✓ ZipArchive class is available</p>";

    // Test creating a ZIP
    $zip = new ZipArchive();
    echo "<p class='ok'>✓ ZipArchive can be instantiated</p>";
} else {
    echo "<p class='error'>❌ ZipArchive class is NOT available. Install php-zip extension.</p>";
}

// Check fileinfo
if (function_exists('finfo_open')) {
    echo "<p class='ok'>✓ fileinfo functions available</p>";
} else {
    echo "<p class='error'>❌ fileinfo functions NOT available</p>";
}

// Check WordPress upload directory
echo "<h3>WordPress Upload Directory</h3>";
$upload_dir = wp_upload_dir();
echo "Base directory: " . $upload_dir['basedir'] . "<br>";
echo "Base URL: " . $upload_dir['baseurl'] . "<br>";

if (is_writable($upload_dir['basedir'])) {
    echo "<p class='ok'>✓ Upload directory is writable</p>";
} else {
    echo "<p class='error'>❌ Upload directory is NOT writable. Check permissions.</p>";
}

// Check temp directory
$temp_dir = $upload_dir['basedir'] . '/temp-import/';
if (!file_exists($temp_dir)) {
    if (mkdir($temp_dir, 0755, true)) {
        echo "<p class='ok'>✓ Created temp directory: $temp_dir</p>";
    } else {
        echo "<p class='error'>❌ Cannot create temp directory: $temp_dir</p>";
    }
} else {
    echo "<p class='ok'>✓ Temp directory exists: $temp_dir</p>";
}

if (is_writable($temp_dir)) {
    echo "<p class='ok'>✓ Temp directory is writable</p>";
} else {
    echo "<p class='error'>❌ Temp directory is NOT writable</p>";
}

// Recommended settings
echo "<h3>Recommended PHP Settings</h3>";
echo "<p>For bulk import with ZIP files, add these to your php.ini or wp-config.php:</p>";
echo "<pre>";
echo "upload_max_filesize = 100M\n";
echo "post_max_size = 100M\n";
echo "memory_limit = 256M\n";
echo "max_execution_time = 300\n";
echo "max_input_time = 300\n";
echo "</pre>";

// WordPress wp-config method
echo "<h3>Alternative: Add to wp-config.php (before /* That's all, stop editing! */)</h3>";
echo "<pre>";
echo "@ini_set( 'upload_max_filesize' , '100M' );\n";
echo "@ini_set( 'post_max_size' , '100M' );\n";
echo "@ini_set( 'memory_limit' , '256M' );\n";
echo "@ini_set( 'max_execution_time' , '300' );\n";
echo "</pre>";

// Helper function to convert shorthand to bytes
function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    $val = (int)$val;
    switch($last) {
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }
    return $val;
}

echo "<p><em>Delete this file after running diagnostics.</em></p>";
?>
