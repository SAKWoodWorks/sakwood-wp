# Customer Segmentation Module - User Manual

**Version:** 1.0.0  
**Last Updated:** March 26, 2026

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Quick Start Guide](#quick-start-guide)
3. [Features](#features)
4. [Getting Started](#getting-started)
5. [Creating Your First Segment](#creating-your-first-segment)
6. [Managing Segments](#managing-segments)
7. [Using Analytics](#using-analytics)
8. [Real-World Examples](#real-world-examples)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)
11. [API Reference](#api-reference)
12. [FAQ](#faq)

---

## Overview

The Customer Segmentation module allows you to group customers based on various criteria such as purchase history, demographics, and engagement. This enables targeted marketing and personalized customer experiences.

### Why Use Customer Segmentation?

- 🎯 **Targeted Marketing**: Send relevant promotions to specific customer groups
- 💰 **Increased Revenue**: Personalized offers convert better
- 📊 **Better Insights**: Understand customer behavior patterns
- ⚡ **Automation**: Let the system automatically categorize customers
- 🎨 **Personalization**: Show different experiences to different segments

---

## Quick Start Guide

**5-Minute Setup:**

1. **Access the Module**
   - Go to WordPress Admin → **Segments**

2. **View Default Segments**
   - 5 pre-built segments are ready to use:
     - VIP Customers (spent ≥ 50,000 ฿)
     - Wholesale Customers
     - Recent Customers (purchased in 30 days)
     - At Risk Customers (no purchase in 90 days)
     - New Customers (registered in 14 days)

3. **Check Your Customers**
   - Click "Members" on any segment to see who qualifies

4. **Create a Custom Segment**
   - Go to **Add New Segment**
   - Name it, add rules, save

5. **Export for Marketing**
   - Go to Analytics → Export CSV
   - Use in your email campaigns

---

## Features

### Segment Types

#### 1. Dynamic Segments
- ✅ Automatically add/remove customers based on rules
- ✅ Rules evaluated on order completion, user registration, and daily cron
- ✅ Perfect for behavior-based grouping
- **Examples:** VIP Customers, Recent Buyers, At-Risk Customers

#### 2. Manual Segments
- ✅ Manually select which customers belong
- ✅ Full control over membership
- ✅ Great for special lists and testing
- **Examples:** Beta Testers, VIP List, Special Projects

### Comparison Table

| Feature | Dynamic | Manual |
|---------|---------|--------|
| Auto-assignment | ✅ Yes | ❌ No |
| Manual override | ⚠️ Limited | ✅ Full |
| Rule-based | ✅ Yes | ❌ No |
| Maintenance | ✅ Automatic | 🔧 Manual |
| Best for | Behavior patterns | Special lists |

## Installation

The module is automatically loaded with the main Sakwood Integration plugin. No additional installation required.

### Database Tables

The module creates three tables on activation:

1. `wp_sakwood_segments` - Segment definitions
2. `wp_sakwood_segment_members` - Customer-segment assignments
3. `wp_sakwood_segment_log` - Activity logging

---

## Getting Started

### Accessing the Module

**Step 1: Log into WordPress Admin**
```
Development: http://localhost:8006/wp-admin
Production: https://wp.sakww.com/wp-admin
```

**Step 2: Navigate to Segments**
- Look for the **Segments** menu item (with people icon 👥)
- Located in the main admin menu, position 56

**Step 3: View Dashboard**
- You'll see statistics at the top:
  - Total Segments
  - Active Segments
  - Customers Segmented
  - Total Revenue

### Understanding the Interface

#### Main Menu Items

| Menu Item | Purpose | When to Use |
|-----------|---------|-------------|
| **All Segments** | View and manage all segments | Daily operations |
| **Add New Segment** | Create a new segment | When you need a new group |
| **Activity Log** | View customer assignment history | Auditing and troubleshooting |
| **Analytics** | Performance metrics and charts | Weekly/monthly reviews |

#### Color Coding

Each segment has a color that appears throughout the UI:
- 🔵 Blue - Default
- 🟢 Green - Positive segments (Recent, New)
- 🟣 Purple - Premium segments (VIP)
- 🟡 Yellow - Warning segments (At Risk)
- 🔴 Red - Urgent segments (Churned)

---

## Creating Your First Segment

### Step-by-Step Guide

#### Step 1: Basic Information

1. Go to **Segments → Add New Segment**
2. Fill in the form:

**Field Guide:**

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| Name | ✅ Yes | Clear, descriptive name | "VIP Customers" |
| Description | Optional | Purpose of segment | "High-value customers for exclusive offers" |
| Type | ✅ Yes | Dynamic or Manual | Dynamic |
| Color | Optional | UI identification color | #8B5CF6 (Purple) |
| Status | Optional | Active or Inactive | Active |

#### Step 2: Choose Segment Type

**Choose Dynamic if:**
- You want automatic customer assignment
- You have clear rules (spending, location, etc.)
- The group changes frequently

**Choose Manual if:**
- You want full control
- You're creating a special list
- The group is small and stable

#### Step 3: Add Rules (Dynamic Only)

**Rule Structure:**
```
Rule Group
├── Match: ALL (AND) or ANY (OR)
├── Rule 1: [Type] [Operator] [Value]
├── Rule 2: [Type] [Operator] [Value]
└── Rule 3: [Type] [Operator] [Value]
```

**Available Rule Types:**

**Purchase History:**
| Rule | Operators | Example |
|------|-----------|---------|
| Total Spent | =, ≠, >, >=, <, <= | Total Spent >= 50000 |
| Number of Orders | =, ≠, >, >=, <, <= | Orders >= 5 |
| Average Order Value | =, ≠, >, >=, <, <= | AOV >= 2000 |
| Last Purchase Date | before, after, within, not_within | Last Purchase within 30 days |
| Products Purchased | in, not_in, all | Purchased Product X |
| Categories Purchased | in, not_in, all | Purchased from "Wood" category |

**Demographics:**
| Rule | Operators | Example |
|------|-----------|---------|
| Location | in, not_in | Location = Bangkok |
| User Role | =, ≠ | Role = wholesale_customer |
| Registration Date | before, after | Registered after Jan 1, 2025 |

**Engagement:**
| Rule | Operators | Example |
|------|-----------|---------|
| Last Login | before, after, within, not_within | Logged in within 7 days |
| Newsletter Subscribed | =, ≠ | Subscribed = Yes |
| Account Age | =, ≠, >, >=, <, <= | Age <= 14 days |

#### Step 4: Test Your Rules

**Rule Preview:**
- As you add rules, see the description update
- Example: "Customers matching: Total Spent >= 50000 AND Orders >= 5"

**Best Practice:**
- Start with 1-2 simple rules
- Test with "Evaluate" button
- Add more rules gradually

#### Step 5: Save and Evaluate

1. Click **"Create Segment"**
2. System automatically evaluates rules
3. Customers are assigned based on matching
4. View results on segment members page

---

## Managing Segments

### Viewing Segments

**All Segments Page Shows:**
- Segment name with color indicator
- Type badge (Dynamic/Manual)
- Status (Active/Inactive)
- Member count
- Total revenue from segment
- Creation date
- Action buttons

### Editing a Segment

**Steps:**
1. Go to **All Segments**
2. Click **"Edit"** on desired segment
3. Modify fields or rules
4. Click **"Update Segment"**

**⚠️ Important:**
- Changing rules on dynamic segments triggers re-evaluation
- Members may be added or removed automatically
- Activity is logged for tracking

### Evaluating Dynamic Segments

**Manual Evaluation:**
1. Go to **All Segments**
2. Click **"Evaluate"** on dynamic segment
3. System checks all customers against rules
4. Updates membership automatically

**When to Evaluate:**
- After changing rules
- When membership seems incorrect
- Before important marketing campaigns

### Managing Members

#### Dynamic Segments
- ❌ Cannot manually add/remove (automatic)
- ✅ Can view member list
- ✅ Can export member data
- ⚙️ Use "Evaluate" to update

#### Manual Segments
- ✅ Can manually add members
- ✅ Can manually remove members
- ✅ Full control over membership

**Add Member (Manual):**
1. Go to segment's **Members** page
2. Select customer from dropdown
3. Click **"Add to Segment"**

**Remove Member (Manual):**
1. Go to segment's **Members** page
2. Click **"Remove"** next to customer
3. Confirm removal

### Exporting Data

**Export Segment Members:**
1. Go to segment's **Members** page
2. Click **"Export CSV"**
3. File downloads with columns:
   - Customer ID
   - Name
   - Email
   - Assigned Date
   - Assigned By
   - Total Spent
   - Order Count

**Use Cases:**
- Email marketing campaigns
- CRM imports
- Customer analysis
- Direct mail campaigns

---

## Using Analytics

### Analytics Dashboard

**Access:** Segments → Analytics

#### Overview Statistics

| Metric | Description | Use Case |
|--------|-------------|----------|
| Active Segments | Number of active segments | Monitor complexity |
| Total Segmented Customers | Unique customers in segments | Measure coverage |
| Total Revenue | Revenue from all segments | Calculate ROI |
| Avg Revenue/Customer | Average per segmented customer | Identify value |

#### Segment Performance Chart

**Visual Elements:**
- Horizontal bar chart
- Sorted by revenue (highest first)
- Color-coded by segment
- Shows revenue and customer count

**Insights:**
- Which segments generate most revenue
- Which segments have most customers
- Revenue concentration risks

#### Detailed Metrics Table

**Columns:**
| Column | Description |
|--------|-------------|
| Segment | Name with color |
| Customers | Member count |
| Revenue | Total revenue |
| % of Total | Revenue percentage |
| Avg/Customer | Revenue per customer |
| Type | Dynamic or Manual |

**Sort Options:**
- Click column headers to sort
- Identify top/bottom performers

### Exporting Analytics

**Steps:**
1. Go to **Analytics** page
2. Click **"Export Report"**
3. CSV file downloads

**File Contents:**
- All segment metrics
- Calculated percentages
- Ready for Excel/Google Sheets

**Use Cases:**
- Monthly reporting
- Stakeholder presentations
- Trend analysis
- Budget planning

---

## Real-World Examples

### Example 1: VIP Customer Program

**Goal:** Reward high-value customers

**Segment Setup:**
```
Name: VIP Customers
Type: Dynamic
Color: Purple (#8B5CF6)

Rules:
- Total Spent >= 50,000 THB
- AND Orders >= 5
```

**Marketing Action:**
- Export member list
- Send exclusive 20% discount code
- Early access to new products

### Example 2: Win-Back Campaign

**Goal:** Re-engage inactive customers

**Segment Setup:**
```
Name: At Risk Customers
Type: Dynamic
Color: Orange (#F59E0B)

Rules:
- Last Purchase Date NOT WITHIN 90 days
- AND Total Spent >= 5,000 THB (was valuable)
```

**Marketing Action:**
- Send "We Miss You" email
- Offer 15% discount
- Survey to understand why they left

### Example 3: New Customer Welcome

**Goal:** Onboard new customers effectively

**Segment Setup:**
```
Name: New Customers
Type: Dynamic
Color: Cyan (#06B6D4)

Rules:
- Account Age <= 14 days
```

**Marketing Action:**
- Send welcome email series
- Provide getting started guide
- Offer first-purchase discount

### Example 4: Wholesale Targeting

**Goal:** Promote bulk products to wholesalers

**Segment Setup:**
```
Name: Wholesale Customers
Type: Dynamic
Color: Blue (#3B82F6)

Rules:
- User Role = wholesale_customer
```

**Marketing Action:**
- Send wholesale pricing updates
- Invite to exclusive events
- Share bulk order incentives

### Example 5: Geographic Campaign

**Goal:** Target customers in specific province

**Segment Setup:**
```
Name: Bangkok Customers
Type: Dynamic
Color: Green (#10B981)

Rules:
- Location IN (Bangkok)
```

**Marketing Action:**
- Promote local pickup discount
- Invite to Bangkok showroom event
- Test new delivery options

---

## Best Practices

### Segment Design

✅ **DO:**
- Use clear, descriptive names
- Keep rules simple initially
- Test with small segments first
- Document segment purpose
- Review performance monthly
- Archive inactive segments

❌ **DON'T:**
- Create too many segments (max 15-20)
- Use overly complex rule combinations
- Forget to evaluate dynamic segments
- Mix different purposes in one segment
- Delete segments with historical data

### Naming Conventions

**Good Names:**
- "VIP Customers - High Value"
- "At Risk - No Purchase 90 Days"
- "New Customers - First 14 Days"

**Bad Names:**
- "Segment 1"
- "Test"
- "Customers who buy stuff"

### Rule Complexity

**Start Simple:**
```
Rule 1: Total Spent >= 50,000
```

**Then Add Gradually:**
```
Rule Group 1 (Match ALL):
- Total Spent >= 50,000
- Orders >= 5

Rule Group 2 (Match ANY):
- Last Purchase within 30 days
- Last Login within 7 days
```

### Performance Tips

1. **Limit Dynamic Segments**
   - Max 10-15 for large customer bases (1000+)
   - Each segment evaluates all customers

2. **Use Specific Rules**
   - "Total Spent >= 50,000" is faster than "Products Purchased IN (100 products)"

3. **Schedule Wisely**
   - Daily cron runs automatically
   - Avoid manual evaluation during peak hours

4. **Monitor Performance**
   - Check evaluation time in activity log
   - If slow, simplify rules or split segments

### Data Quality

**Maintain Clean Data:**
- Regularly review member lists
- Remove test customers
- Merge duplicate segments
- Update outdated rules

**Archive, Don't Delete:**
- Set `is_active = 0` instead of deleting
- Preserves historical data
- Can reactivate if needed

---

## Troubleshooting

### Problem: Segment Not Evaluating

**Symptoms:**
- Click "Evaluate" but no customers added
- Expected customers not in segment

**Solutions:**
1. ✅ Check segment is **Active**
2. ✅ Verify rules are properly configured
3. ✅ Ensure customers have required data (orders, meta)
4. ✅ Check order status is "completed" or "processing"
5. ✅ Manually run evaluation and check activity log

**Debug Steps:**
```sql
-- Check if segment exists
SELECT * FROM wp_sakwood_segments WHERE id = 123;

-- Check if customer has orders
SELECT * FROM wp_posts 
WHERE post_type = 'shop_order' 
AND post_author = 456 
AND post_status IN ('wc-completed', 'wc-processing');
```

### Problem: Wrong Customers in Segment

**Symptoms:**
- Customers who shouldn't qualify are included
- Expected customers are missing

**Solutions:**
1. ✅ Review rule logic (ALL vs ANY)
2. ✅ Check rule operators (>= vs >)
3. ✅ Verify customer data is correct
4. ✅ Re-evaluate segment
5. ✅ Check activity log for errors

### Problem: Slow Performance

**Symptoms:**
- Evaluation takes > 30 seconds
- Admin pages load slowly

**Solutions:**
1. ✅ Reduce number of dynamic segments
2. ✅ Simplify complex rules
3. ✅ Increase PHP memory limit in wp-config.php
4. ✅ Run evaluations during off-peak hours
5. ✅ Archive old inactive segments

### Problem: Export Not Working

**Symptoms:**
- CSV download fails
- Empty CSV file

**Solutions:**
1. ✅ Check segment has members
2. ✅ Verify browser allows downloads
3. ✅ Try different browser
4. ✅ Check PHP memory limit
5. ✅ Export smaller segments first

### Problem: Activity Log Empty

**Symptoms:**
- No entries in activity log
- Can't track changes

**Solutions:**
1. ✅ Ensure segment is active
2. ✅ Trigger an evaluation
3. ✅ Add/remove a customer manually
4. ✅ Check database table exists: `wp_sakwood_segment_log`

---

## API Reference

### Authentication

All API requests require WordPress admin authentication:

**For Admin Users:**
```bash
# Get nonce from WordPress admin
# Include in request headers
X-WP-Nonce: YOUR_NONCE
```

**For Application Passwords:**
```bash
# Use Basic Auth
Authorization: Basic base64(username:app_password)
```

### Endpoints

#### List Segments
```bash
GET /wp-json/sakwood/v1/segments

Parameters:
- type: all|manual|dynamic (default: all)
- status: all|active|inactive (default: active)
- per_page: 1-100 (default: 20)
- page: integer (default: 1)
```

#### Create Segment
```bash
POST /wp-json/sakwood/v1/segments

Body:
{
  "name": "Segment Name",
  "description": "Description",
  "type": "dynamic",
  "color": "#3B82F6",
  "is_active": 1,
  "rules": [...]
}
```

#### Update Segment
```bash
PUT /wp-json/sakwood/v1/segments/{id}

Body:
{
  "name": "Updated Name",
  ...
}
```

#### Delete Segment
```bash
DELETE /wp-json/sakwood/v1/segments/{id}
```

#### Get Segment Members
```bash
GET /wp-json/sakwood/v1/segments/{id}/members

Parameters:
- per_page: 1-100 (default: 50)
- page: integer (default: 1)
```

#### Add Member
```bash
POST /wp-json/sakwood/v1/segments/{id}/members

Body:
{
  "customer_id": 123
}
```

#### Remove Member
```bash
DELETE /wp-json/sakwood/v1/segments/{id}/members/{customer_id}
```

#### Evaluate Segment
```bash
POST /wp-json/sakwood/v1/segments/{id}/evaluate

Response:
{
  "success": true,
  "message": "Added 5 customers, removed 2 customers",
  "added": 5,
  "removed": 2,
  "total_members": 50
}
```

#### Get Analytics
```bash
GET /wp-json/sakwood/v1/segments/analytics/overview

Response:
{
  "total_segments": 10,
  "total_customers_segmented": 500,
  "total_revenue_segmented": 1000000,
  "segments": [...]
}
```

#### Get Customer's Segments
```bash
GET /wp-json/sakwood/v1/customers/{id}/segments
```

---

## FAQ

### General Questions

**Q: How many segments can I create?**
A: Technically unlimited, but we recommend 15-20 maximum for performance.

**Q: Can a customer be in multiple segments?**
A: Yes! Customers can belong to multiple segments simultaneously.

**Q: How often are dynamic segments evaluated?**
A: Automatically on order completion, user registration, and daily via cron.

**Q: Can I manually add customers to dynamic segments?**
A: No, dynamic segments are fully automated. Use manual segments for manual control.

**Q: What happens if I delete a segment?**
A: The segment is deleted, but customer records remain. Activity log is preserved.

### Technical Questions

**Q: Does this work with WooCommerce?**
A: Yes! Purchase history rules use WooCommerce order data.

**Q: Can I import customers from CSV?**
A: Not directly. Import users to WordPress first, then create rules to auto-assign.

**Q: Are segments synced with external tools?**
A: Not automatically. Export CSV and import to your email/CRM tool.

**Q: Can I use segments for pricing?**
A: Not in v1.0. Future versions may include segment-based pricing.

**Q: How do I backup segment data?**
A: Standard WordPress database backup includes segment tables.

### Marketing Questions

**Q: How do I email a segment?**
A: Export CSV from Members page, import to your email tool (Mailchimp, etc.).

**Q: Can I show different products to segments?**
A: Not in v1.0. Requires custom frontend development.

**Q: How do I track segment performance?**
A: Use Analytics page to view revenue and customer metrics.

**Q: Can I A/B test with segments?**
A: Yes! Create two similar segments with slight rule variations.

---

## Support

### Getting Help

**Documentation:**
- This user manual
- [SEGMENTATION-MODULE.md](./SEGMENTATION-MODULE.md)
- [CUSTOMER-SEGMENTATION-IMPLEMENTATION.md](../../CUSTOMER-SEGMENTATION-IMPLEMENTATION.md)

**Check Logs:**
- WordPress Admin → Segments → Activity Log
- WordPress debug.log
- Browser console for JavaScript errors

**Contact:**
- Sakwood support team
- GitHub Issues: https://github.com/SAKWoodWorks/sakwood-wp/issues

### Reporting Bugs

**Include:**
1. WordPress version
2. Plugin version
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots if applicable
6. Error messages from logs

### Feature Requests

**Submit:**
- Describe the use case
- Explain business value
- Provide examples
- Priority level

---

**Version:** 1.0.0  
**Last Updated:** March 26, 2026  
**Author:** SAK WoodWorks Development Team
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
