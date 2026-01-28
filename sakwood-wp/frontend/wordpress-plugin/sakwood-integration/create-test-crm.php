<?php
// Create test CRM data
require_once('/var/www/html/wp-load.php');

echo "Creating test CRM data...\n";

// Create test customer
$customer_id = Sakwood_CRM_Customer::create(array(
    'first_name' => 'Test',
    'last_name' => 'Customer',
    'email' => 'test' . time() . '@example.com',
    'phone' => '081-234-5678',
    'line_id' => 'test_line',
    'company' => 'Test Company',
    'customer_type' => 'wholesale',
    'source' => 'manual',
));

echo "Created customer ID: $customer_id\n";

// Create a test interaction
Sakwood_CRM_Interaction::log_call($customer_id, 'Initial contact', 'Test call for CRM setup', 'outbound', 5);
echo "Created interaction\n";

// Create a test task
$due_date = date('Y-m-d H:i:s', strtotime('+1 day'));
Sakwood_CRM_Task::create(array(
    'customer_id' => $customer_id,
    'title' => 'Follow up with test customer',
    'description' => 'Test task for CRM setup',
    'task_type' => 'follow_up',
    'priority' => 'medium',
    'due_date' => $due_date,
));
echo "Created task\n";

echo "✅ Test data created!\n";
