# Sakwood CRM System - Complete Setup Guide

## Overview

The Sakwood CRM (Customer Relationship Management) system helps you manage customer relationships, track interactions, automate follow-ups, and analyze customer data.

### Features

✅ **Customer Management**
- Automatic customer creation from WooCommerce orders
- Customer segmentation (Retail, Wholesale, VIP)
- Complete customer profiles with contact info
- Order history and spending tracking

✅ **Interaction Logging**
- Track calls, emails, LINE messages, visits
- Internal notes for team collaboration
- Communication history per customer

✅ **Task Management**
- Follow-up tasks with due dates
- Payment reminder automation
- Task assignment to team members
- Priority levels and status tracking

✅ **Automated Workflows**
- Auto-categorize customers based on spending
- Auto-create follow-up tasks for new orders
- Auto-create payment reminders for PromptPay
- Email notifications for task reminders

✅ **Reports & Analytics**
- Customer statistics and distribution
- Top customers by revenue
- Interaction metrics
- Payment tracking

---

## Installation

### Step 1: Activate the Plugin

1. Copy the `sakwood-integration` folder to your WordPress plugins directory:
   ```bash
   wp-content/plugins/sakwood-integration/
   ```

2. Log in to WordPress Admin
3. Go to **Plugins** → **Installed Plugins**
4. Find "Sakwood Integration"
5. Click **Activate**

### Step 2: Create Database Tables

The plugin will automatically create the required database tables upon activation. Tables created:

- `wp_sakwood_customers` - Customer profiles
- `wp_sakwood_interactions` - Communication logs
- `wp_sakwood_tasks` - Follow-up tasks
- `wp_sakwood_payments` - Payment tracking

### Step 3: Configure Permissions

Make sure users who will use the CRM have the `manage_woocommerce` capability.

---

## Usage Guide

### 1. Customer Management

#### View All Customers

1. Go to **CRM** → **Customers**
2. Browse all customers with filters:
   - Customer Type (Retail/Wholesale/VIP)
   - Status (Active/Inactive/Blocked)
   - Search by name, email, phone, company

#### Customer Details Page

Click on any customer to view:
- **Profile**: Contact information, LINE ID, company, tax ID
- **Statistics**: Total orders, total spent, average order value
- **Order History**: All WooCommerce orders
- **Interactions**: All logged communications
- **Tasks**: Follow-up tasks and reminders

#### Customer Segmentation

Customers are automatically categorized:

| Type | Criteria |
|------|----------|
| **Retail** | Default for all new customers |
| **Wholesale** | Spent over 10,000฿ OR has company name |
| **VIP** | 5+ orders OR spent over 50,000฿ |

You can manually update customer type from the customer details page.

### 2. Logging Interactions

#### Log a Call

1. Go to **CRM** → **Customer Details**
2. Scroll to "Log Interaction" section
3. Select Type: **Call**
4. Enter subject and notes
5. Select direction: **Inbound** (customer called) or **Outbound** (you called)
6. Optionally add duration (minutes)
7. Click **Save**

#### Log an Email

Emails sent through WooCommerce are automatically logged. To log manual emails:

1. Select Type: **Email**
2. Enter subject and message
3. Save

#### Log LINE Conversation

1. Select Type: **LINE**
2. Enter message content
3. Save

#### Add Internal Note

1. Select Type: **Note**
2. Enter your note
3. Notes are only visible to your team

### 3. Task Management

#### Create a Task

1. Go to **CRM** → **Customer Details**
2. Scroll to "Add Task" section
3. Enter:
   - **Title**: Brief task description
   - **Description**: Detailed notes
   - **Type**: Follow-up, Payment Reminder, Quote, Meeting, Other
   - **Priority**: Low, Medium, High, Urgent
   - **Due Date**: When to complete
4. Click **Create Task**

#### View Your Tasks

1. Go to **CRM** → **Tasks**
2. See all tasks assigned to you
3. Filter by status (Pending/In Progress/Completed)

#### Complete a Task

1. Click **Complete** button next to task
2. Task is marked as completed with completion time

#### Automatic Tasks

The system automatically creates:

| Trigger | Task Created | Timing |
|---------|--------------|--------|
| New order | Follow up on order #XXX | 3 days later |
| Pending PromptPay payment | Payment reminder - Order #XXX | 1 day later |

### 4. Dashboard

The CRM Dashboard provides an overview:

- **Statistics Cards**: Total customers, VIP count, wholesale count, pending tasks
- **Recent Customers**: Latest 5 customers added
- **Upcoming Tasks**: Your next 5 tasks
- **Recent Interactions**: Latest 5 communications logged

Access: **CRM** → **Dashboard**

### 5. Reports

Access reports at **CRM** → **Reports**

#### Available Reports

- **Customer Distribution**: Breakdown by customer type
- **Top Customers**: Top 10 by total spending
- **New Customers**: Count for current month
- **Total Revenue**: All-time revenue from customers
- **Average Order Value**: Mean order amount
- **Interaction Stats**: Communication counts (last 30 days)

---

## WooCommerce Integration

### Automatic Customer Sync

When a WooCommerce order is created:

1. Customer is automatically added to CRM (or updated if exists)
2. Order count and total spent are updated
3. Customer type is auto-categorized
4. Follow-up task is created (3 days later)

### PromptPay Payment Tracking

For PromptPay orders:

1. Order created with status "Pending"
2. Payment reminder task created (1 day later)
3. Admin verifies payment in WooCommerce
4. Customer sees success on frontend
5. Customer type updated based on spending

---

## API Reference

### Customer Functions

```php
// Get or create customer from order
$customer = Sakwood_CRM_Customer::get_or_create_from_order($order_id);

// Get customer by email
$customer = Sakwood_CRM_Customer::get_by_email('customer@email.com');

// Get customer statistics
$stats = Sakwood_CRM_Customer::get_stats($customer_id);

// Get all customers with filters
$result = Sakwood_CRM_Customer::get_all(array(
    'customer_type' => 'vip',
    'status' => 'active',
    'limit' => 20,
));

// Update customer
Sakwood_CRM_Customer::update($customer_id, array(
    'customer_type' => 'vip',
    'phone' => '081-234-5678',
));

// Auto-categorize customer
Sakwood_CRM_Customer::auto_categorize($customer_id);
```

### Interaction Functions

```php
// Log a call
Sakwood_CRM_Interaction::log_call($customer_id, 'Follow up call', 'Discussed new product line', 'outbound', 5);

// Log an email
Sakwood_CRM_Interaction::log_email($customer_id, 'Quote sent', 'Quote #123 attached', 'outbound');

// Log LINE message
Sakwood_CRM_Interaction::log_line($customer_id, 'Customer asked about shipping', 'inbound');

// Add internal note
Sakwood_CRM_Interaction::add_note($customer_id, 'Prefers LINE communication');

// Get customer interactions
$interactions = Sakwood_CRM_Interaction::get_by_customer($customer_id, 50);
```

### Task Functions

```php
// Create a task
$task_id = Sakwood_CRM_Task::create(array(
    'customer_id' => $customer_id,
    'title' => 'Follow up on quote',
    'description' => 'Customer interested in wholesale pricing',
    'task_type' => 'follow_up',
    'priority' => 'high',
    'due_date' => '2025-01-20 14:00:00',
));

// Complete a task
Sakwood_CRM_Task::complete($task_id);

// Get customer tasks
$tasks = Sakwood_CRM_Task::get_by_customer($customer_id, 'pending');

// Get your assigned tasks
$my_tasks = Sakwood_CRM_Task::get_by_assigned(get_current_user_id());

// Get overdue tasks
$overdue = Sakwood_CRM_Task::get_overdue();
```

---

## Frontend Integration (Next.js)

### Customer Profile Component

Create a customer portal in Next.js:

```typescript
// app/[lang]/account/page.tsx

import { CustomerProfile } from '@/components/crm/CustomerProfile';

export default async function AccountPage({ params }) {
  const { lang } = await params;

  // Fetch customer data from WordPress API
  const response = await fetch(`${process.env.WORDPRESS_API_URL}/sakwood/v1/customer`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const customer = await response.json();

  return (
    <main>
      <CustomerProfile customer={customer} />
    </main>
  );
}
```

### WordPress REST API Endpoints

Add to your WordPress plugin:

```php
// Add REST API endpoint for customer data
add_action('rest_api_init', function() {
    register_rest_route('sakwood/v1', '/customer', array(
        'methods' => 'GET',
        'callback' => function() {
            $user_id = get_current_user_id();

            if (!$user_id) {
                return new WP_Error('unauthorized', 'User not logged in', array('status' => 401));
            }

            $customer = Sakwood_CRM_Customer::get_by_email(wp_get_current_user()->user_email);

            if (!$customer) {
                return new WP_Error('not_found', 'Customer not found', array('status' => 404));
            }

            $stats = Sakwood_CRM_Customer::get_stats($customer->id);
            $orders = Sakwood_CRM_Customer::get_orders($customer->id);

            return array(
                'customer' => $customer,
                'stats' => $stats,
                'orders' => $orders,
            );
        },
    ));
});
```

---

## Customization

### Adjust Customer Categorization Rules

Edit `crm-customers.php`:

```php
public static function auto_categorize($customer_id) {
    $customer = self::get($customer_id);

    // Customize these thresholds
    if ($customer->total_orders >= 10) {  // Changed from 5
        $new_type = 'vip';
    } elseif ($customer->total_spent >= 20000) {  // Changed from 10000
        $new_type = 'wholesale';
    }

    // ...
}
```

### Modify Auto-Task Timing

Edit `crm-tasks.php`:

```php
// Change follow-up from 3 days to 7 days
add_action('woocommerce_new_order', function($order_id) {
    $due_date = date('Y-m-d H:i:s', strtotime('+7 days'));  // Changed from +3 days

    Sakwood_CRM_Task::create(array(
        'customer_id' => $customer->id,
        'title' => 'Follow up on Order #' . $order_id,
        // ...
    ));
});
```

---

## Troubleshooting

### Customers not being created

1. Check WooCommerce orders are being created
2. Verify database tables exist: `wp_sakwood_customers`
3. Check WordPress error log
4. Ensure plugin is activated

### Tasks not being created

1. Check if tasks table exists: `wp_sakwood_tasks`
2. Verify WP-Cron is working
3. Check user has permission to create tasks
4. Review error logs

### Email reminders not sending

1. Check WordPress email configuration
2. Verify `wp_mail()` is working
3. Check spam folder
4. Ensure assigned user has valid email

### Database not created

Manually create tables:

```php
// Run this once in WordPress admin or via wp-cli
Sakwood_CRM_Database::create_tables();
```

---

## Best Practices

### 1. Log Every Interaction

- Log all calls with customers
- Email WooCommerce customers → automatically logged
- Add LINE conversations
- Note customer preferences

### 2. Keep Tasks Updated

- Complete tasks when done
- Update task status as you work
- Add notes to tasks for context
- Set realistic due dates

### 3. Regular Review

- Check CRM dashboard daily
- Review overdue tasks
- Follow up with VIP customers personally
- Analyze reports weekly

### 4. Data Quality

- Keep customer info current
- Merge duplicate customer records
- Verify customer categorization
- Clean up old completed tasks

### 5. Team Collaboration

- Assign tasks appropriately
- Use notes to share information
- Tag team members in interactions
- Review customer profiles before calls

---

## Support

For issues or questions:
- LINE: @Sakwood
- Email: support@sakwood.com
- Documentation: https://docs.sakwood.com

---

## Roadmap

Future enhancements planned:

- [ ] Email campaign integration
- [ ] SMS notifications
- [ ] Advanced reporting with charts
- [ ] Customer portal frontend
- [ ] Multi-location support
- [ ] Integration with accounting software
- [ ] Mobile app support
- [ ] WhatsApp integration
- [ ] File attachments to interactions
- [ ] Customer tags and custom fields

---

## Changelog

### Version 1.0.0 (2025-01-16)
- Initial release
- Customer management
- Interaction logging
- Task management
- WooCommerce integration
- Admin dashboard
- Basic reporting

---

## License

Proprietary - Sakwood © 2025
