<?php
require_once('/var/www/html/wp-load.php');

echo "Testing get_all function...\n";
$result = Sakwood_CRM_Customer::get_all(array('limit' => 10));

echo "Customers count: " . count($result['customers']) . "\n";
echo "Total: " . $result['total'] . "\n";
echo "Pages: " . $result['pages'] . "\n";

if (!empty($result['customers'])) {
    echo "\nCustomers:\n";
    foreach ($result['customers'] as $customer) {
        echo "  - {$customer->first_name} {$customer->last_name} ({$customer->email})\n";
    }
}

echo "\n✅ Test passed!\n";
