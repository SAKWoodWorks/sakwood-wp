# Customer Segmentation Module

## Overview

The Customer Segmentation module allows you to group customers based on various criteria such as purchase history, demographics, and engagement. This enables targeted marketing and personalized customer experiences.

## Features

### Segment Types

1. **Dynamic Segments**
   - Automatically add/remove customers based on rules
   - Rules evaluated on order completion, user registration, and daily cron
   - Examples: VIP Customers, Recent Buyers, At-Risk Customers

2. **Manual Segments**
   - Manually select which customers belong
   - Full control over membership
   - Examples: Beta Testers, VIP List, Special Projects

### Segmentation Rules

**Purchase History:**
- Total spent (THB)
- Number of orders
- Average order value
- Last purchase date
- First purchase date
- Products purchased
- Categories purchased

**Demographics:**
- Location (Province)
- User role (Retail/Wholesale/Dealer)
- Registration date

**Engagement:**
- Last login date
- Newsletter subscription status
- Account age (days)

### Rule Logic

- **Match ALL**: All rules in the group must be satisfied (AND logic)
- **Match ANY**: At least one rule in the group must be satisfied (OR logic)
- Multiple rule groups create OR conditions between groups

## Installation

The module is automatically loaded with the main Sakwood Integration plugin. No additional installation required.

### Database Tables

The module creates three tables on activation:

1. `wp_sakwood_segments` - Segment definitions
2. `wp_sakwood_segment_members` - Customer-segment assignments
3. `wp_sakwood_segment_log` - Activity logging

## Admin Interface

### Menu Structure

```
Segments (main menu)
├── All Segments
├── Add New Segment
├── Activity Log
└── Analytics
```

### Creating a Segment

1. Navigate to **Segments → Add New Segment**
2. Enter segment name and description
3. Choose segment type (Dynamic or Manual)
4. Select a color for UI identification
5. For dynamic segments:
   - Click "Add Rule Group"
   - Select rule type, operator, and value
   - Choose match logic (ALL/ANY)
   - Add multiple rules as needed
6. Click "Create Segment"

### Managing Segment Members

**Dynamic Segments:**
- Members are automatically managed
- Click "Evaluate" to manually re-evaluate rules
- Members added/removed based on rule matching

**Manual Segments:**
- Use the "Members" page to view current members
- Add customers using the dropdown selector
- Remove members individually

### Analytics Dashboard

View segment performance metrics:
- Total segments and active segments
- Total segmented customers
- Revenue by segment
- Customer count by segment
- Revenue percentage per segment
- Average revenue per customer

Export analytics to CSV for further analysis.

## REST API Endpoints

### Segments

```
GET    /wp-json/sakwood/v1/segments
POST   /wp-json/sakwood/v1/segments
GET    /wp-json/sakwood/v1/segments/{id}
PUT    /wp-json/sakwood/v1/segments/{id}
DELETE /wp-json/sakwood/v1/segments/{id}
```

### Segment Members

```
GET    /wp-json/sakwood/v1/segments/{id}/members
POST   /wp-json/sakwood/v1/segments/{id}/members
DELETE /wp-json/sakwood/v1/segments/{id}/members/{customer_id}
```

### Customer Segments

```
GET /wp-json/sakwood/v1/customers/{id}/segments
```

### Analytics

```
GET /wp-json/sakwood/v1/segments/analytics/overview
GET /wp-json/sakwood/v1/segments/{id}/analytics
```

### Rule Types

```
GET /wp-json/sakwood/v1/segments/rules
```

## API Examples

### Create Dynamic Segment

```bash
curl -X POST https://wp.sakww.com/wp-json/sakwood/v1/segments \
  -H "Content-Type: application/json" \
  -H "X-WP-Nonce: YOUR_NONCE" \
  -d '{
    "name": "VIP Customers",
    "description": "High-value customers",
    "type": "dynamic",
    "color": "#8B5CF6",
    "is_active": 1,
    "rules": [
      {
        "match": "all",
        "rules": [
          {
            "type": "total_spent",
            "operator": ">=",
            "value": 50000
          }
        ]
      }
    ]
  }'
```

### Add Customer to Manual Segment

```bash
curl -X POST https://wp.sakww.com/wp-json/sakwood/v1/segments/123/members \
  -H "Content-Type: application/json" \
  -H "X-WP-Nonce: YOUR_NONCE" \
  -d '{
    "customer_id": 456
  }'
```

### Get Customer's Segments

```bash
curl https://wp.sakww.com/wp-json/sakwood/v1/customers/456/segments \
  -H "X-WP-Nonce: YOUR_NONCE"
```

## Default Segments

The module creates these segments on activation:

1. **VIP Customers** - Total spending ≥ 50,000 THB
2. **Wholesale Customers** - User role is wholesale_customer
3. **Recent Customers** - Purchased within last 30 days
4. **At Risk Customers** - No purchase in 90+ days
5. **New Customers** - Registered within last 14 days

## Automated Evaluation

### Triggers

Segments are automatically re-evaluated when:
- Order status changes to "completed"
- Order is cancelled or refunded
- User registers a new account
- Relevant user meta is updated (province, newsletter status)

### Scheduled Task

A daily cron job (`sakwood_daily_segment_evaluation`) re-evaluates all active dynamic segments to catch any changes that might not trigger event-based evaluation.

## Use Cases

### 1. Targeted Email Campaigns

Export segment member lists and import into email marketing tools for targeted campaigns:
- Send re-engagement emails to "At Risk Customers"
- Send exclusive offers to "VIP Customers"
- Send welcome series to "New Customers"

### 2. Special Pricing

Integrate with WooCommerce to offer segment-specific pricing:
- Wholesale pricing for wholesale segment
- Volume discounts for high-value customers
- First-purchase discounts for new customers

### 3. Personalized Experience

Customize website experience based on segment:
- Show different homepage banners
- Highlight relevant products
- Display segment-specific promotions

### 4. Customer Support

Prioritize support based on segment:
- VIP customers get priority support
- Dedicated account manager for wholesale
- Proactive outreach to at-risk customers

## Best Practices

### Rule Design

1. **Start Simple**: Begin with 1-2 rules, then expand
2. **Test First**: Create test segments before applying to large customer bases
3. **Monitor Performance**: Check analytics regularly
4. **Avoid Overlap**: Minimize customers in too many segments

### Segment Naming

- Use clear, descriptive names
- Include criteria in description
- Use color coding consistently
- Archive inactive segments instead of deleting

### Performance

- Limit dynamic segments to 10-15 for large customer bases
- Use specific rules to reduce evaluation time
- Monitor cron job execution time
- Export and archive old segments periodically

## Troubleshooting

### Segment Not Evaluating

**Problem:** Dynamic segment not adding/removing customers

**Solutions:**
1. Check segment is active
2. Verify rules are properly configured
3. Manually click "Evaluate" button
4. Check WordPress cron is running: `wp cron test`
5. Review activity log for errors

### Missing Customers

**Problem:** Expected customers not in segment

**Solutions:**
1. Verify customer matches all rule criteria
2. Check rule operators (>= vs >, etc.)
3. Review customer's order history
4. Ensure orders have correct status (completed/processing)

### Performance Issues

**Problem:** Slow segment evaluation

**Solutions:**
1. Reduce number of dynamic segments
2. Simplify complex rule combinations
3. Increase PHP memory limit
4. Run evaluation during off-peak hours

## Database Schema

### wp_sakwood_segments

| Column | Type | Description |
|--------|------|-------------|
| id | INT(11) | Primary key |
| name | VARCHAR(255) | Segment name |
| description | TEXT | Segment description |
| type | ENUM | 'manual' or 'dynamic' |
| rules | JSON | Segmentation rules |
| color | VARCHAR(7) | Hex color code |
| is_active | TINYINT(1) | Active status |
| customer_count | INT(11) | Cached member count |
| total_revenue | DECIMAL(15,2) | Cached total revenue |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |

### wp_sakwood_segment_members

| Column | Type | Description |
|--------|------|-------------|
| id | INT(11) | Primary key |
| segment_id | INT(11) | Foreign key to segments |
| customer_id | BIGINT(20) | WordPress user ID |
| assigned_at | DATETIME | Assignment timestamp |
| assigned_by | ENUM | 'system' or 'manual' |
| is_active | TINYINT(1) | Active membership |

### wp_sakwood_segment_log

| Column | Type | Description |
|--------|------|-------------|
| id | INT(11) | Primary key |
| segment_id | INT(11) | Foreign key to segments |
| customer_id | BIGINT(20) | WordPress user ID |
| action | ENUM | 'added', 'removed', 'updated' |
| reason | VARCHAR(255) | Reason for action |
| logged_at | DATETIME | Log timestamp |

## Developer Hooks

### Actions

```php
// After customer added to segment
do_action('sakwood_segment_customer_added', $segment_id, $customer_id);

// After customer removed from segment
do_action('sakwood_segment_customer_removed', $segment_id, $customer_id);

// After segment evaluation
do_action('sakwood_segment_evaluated', $segment_id, $result);
```

### Filters

```php
// Modify available rule types
apply_filters('sakwood_segment_rule_types', $rule_types);

// Modify segment evaluation result
apply_filters('sakwood_segment_evaluation_result', $result, $segment, $customer_id);
```

## Support

For issues or questions:
- Check the [CLAUDE.md](../CLAUDE.md) documentation
- Review activity logs in WordPress admin
- Contact Sakwood support team

---

**Version:** 1.0.0  
**Last Updated:** March 2026
