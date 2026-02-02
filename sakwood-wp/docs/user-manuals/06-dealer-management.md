# Dealer Application System User Manual

**Document Type:** User Manual
**Last Updated:** 2026-01-28
**Audience:** Sales managers, regional managers
**Prerequisites:** WordPress Admin access, Manager role

## Table of Contents

1. [Overview](#overview)
2. [Dealer Tiers Explained](#dealer-tiers-explained)
3. [Accessing Dealer Applications](#accessing-dealer-applications)
4. [Application Review Process](#application-review-process)
5. [Approving Dealer Applications](#approving-dealer-applications)
6. [Assigning Territories](#assigning-territories)
7. [Managing Dealer Tiers](#managing-dealer-tiers)
8. [Viewing Active Dealers](#viewing-active-dealers)
9. [Troubleshooting](#troubleshooting)

## Overview

The Dealer System is an elevated partnership program for qualified wholesale customers. Dealers receive higher discounts, exclusive territories, and increased credit limits based on their tier level.

### Dealer vs Wholesale

| Feature | Wholesale | Dealer Silver | Dealer Gold | Dealer Platinum |
|---------|-----------|---------------|-------------|-----------------|
| **Discount** | 15% | 20% | 25% | 30% |
| **Credit Limit** | 50,000 THB | 100,000 THB | 200,000 THB | 500,000 THB |
| **Min Order** | None | 50,000 THB | 100,000 THB | 200,000 THB |
| **Territories** | None | None | Yes | Yes |
| **References Required** | 0 | 2 | 5 | 10 |

### Application Prerequisites

Before applying for dealer status, customers must:
1. Be an active wholesale customer
2. Have a payment history of 6+ months
3. Meet minimum order requirements

## Dealer Tiers Explained

### Silver Tier

| Requirement | Value |
|-------------|-------|
| **Minimum Order** | 50,000 THB |
| **Minimum Quantity** | 50 pieces |
| **Discount** | 20% |
| **Credit Limit** | 100,000 THB |
| **References** | 2 trade references |

**Best For:** Growing businesses with consistent orders

### Gold Tier

| Requirement | Value |
|-------------|-------|
| **Minimum Order** | 100,000 THB |
| **Minimum Quantity** | 100 pieces |
| **Discount** | 25% |
| **Credit Limit** | 200,000 THB |
| **References** | 5 trade references |
| **History Required** | 6 months active wholesale |
| **Sales Capacity** | 100,000+ THB/month |

**Best For:** Established businesses with significant volume

### Platinum Tier

| Requirement | Value |
|-------------|-------|
| **Minimum Order** | 200,000 THB |
| **Minimum Quantity** | 200 pieces |
| **Discount** | 30% |
| **Credit Limit** | 500,000 THB |
| **References** | 10 trade references |
| **History Required** | 12 months active wholesale |
| **Sales Capacity** | 500,000+ THB/month |

**Best For:** Large regional distributors and high-volume partners

## Accessing Dealer Applications

### Navigation

1. Log in to WordPress Admin
2. Navigate to **Dealer** in left sidebar

```
Dealer > Applications
```

### Sub-Menu Options

| Menu Item | Description |
|-----------|-------------|
| **Applications** | All dealer applications |
| **Active Dealers** | Currently active dealer list |
| **Territories** | Territory assignments |

### Application List View

Columns displayed:

| Column | Description |
|--------|-------------|
| **ID** | Database reference |
| **Application ID** | Unique ID (e.g., DLR-xxxxxxxx) |
| **Company** | Business name |
| **Requested Tier** | Silver, Gold, or Platinum |
| **Status** | Pending, Approved, Rejected |
| **Submitted** | Application date |
| **Actions** | View, Approve, Reject buttons |

## Application Review Process

### Step 1: Open Application

1. Click on **Application ID** or company name
2. Full application detail page opens

### Step 2: Review Applicant Information

**Business Details:**
- Current wholesale status and history
- Company registration information
- Business type and industry

**Application Content:**

| Field | Description |
|-------|-------------|
| **Requested Tier** | Silver, Gold, or Platinum |
| **Storage Facility** | Description of storage capacity |
| **Delivery Vehicles** | Available transportation |
| **Sales Capacity** | Estimated monthly sales |
| **Dealer Experience** | Years in industry |
| **Requested Territories** | Preferred provinces |

**References:**
- Trade references (company, contact, relationship)
- Business references (for Platinum tier)

**Wholesale History:**
- Previous orders (last 10 orders)
- Total spending
- Order frequency
- Payment history

### Step 3: Evaluate Eligibility

Check tier requirements:

| Tier Check | What to Verify |
|------------|----------------|
| **Silver** | Active wholesale + 2 references |
| **Gold** | 5+ wholesale orders + 5 references + 100k capacity |
| **Platinum** | 10+ wholesale orders + 10 references + 500k capacity |

### Step 4: Make Decision

- **Approve** - Grant dealer status
- **Reject** - Decline with reason
- **Request Info** - Contact applicant for clarification

## Approving Dealer Applications

### Step 1: Initiate Approval

1. From application detail, click **Approve**
2. Approval dialog opens

### Step 2: Configure Approval

**Tier Assignment:**

| Option | Description |
|--------|-------------|
| **As Requested** | Approve for the tier they applied for |
| **Different Tier** | Approve for lower tier if requirements not met |

**Territory Assignment:**

1. Review requested territories
2. Select provinces to assign
3. Check for existing territory conflicts
4. Confirm assignment

**Credit Limit:**

| Tier | Default Credit Limit |
|------|---------------------|
| Silver | 100,000 THB |
| Gold | 200,000 THB |
| Platinum | 500,000 THB |

Can be adjusted based on business assessment.

**Admin Notes:**
- Include approval reasoning
- Note any special conditions
- Document for future reference

### Step 3: Confirm Approval

1. Review all settings
2. Click **Confirm Approval**
3. System sends approval email to customer

### What Happens After Approval

| Action | Description |
|--------|-------------|
| **User Role Updated** | Changed to dealer role (e.g., dealer_silver) |
| **Discount Applied** | Automatic tier discount at checkout |
| **Credit Limit Set** | Configured in user profile |
| **Territories Assigned** | Stored in user meta |
| **Email Sent** | Notification with dealer benefits |

## Assigning Territories

### Territory Overview

Thailand is divided into 77 provinces for dealer territory assignment:

| Zone | Provinces | Territory Type |
|------|-----------|----------------|
| **Zone 1** | Bangkok, Samut Prakan, Nonthaburi, Pathum Thani | Exclusive available |
| **Zone 2** | Central region | Exclusive available |
| **Zone 3** | Northern region | Exclusive available |
| **Zone 4** | Northeastern region | Exclusive available |
| **Zone 5** | Southern region | Exclusive available |

### Territory Assignment Process

**For Gold and Platinum dealers:**

1. Review requested territories in application
2. Check existing dealer territory map
3. Assign available provinces
4. Document any territory restrictions

**Territory Rules:**

| Rule | Description |
|------|-------------|
| **Non-Exclusive** | Multiple dealers can operate in same area |
| **Exclusive** | Single dealer per area (Platinum only) |
| **Overlap Allowed** | For Silver tier, no territory protection |

### Viewing Territory Assignments

1. Navigate to **Dealer** > **Active Dealers**
2. Each dealer shows assigned territories
3. Click dealer for detailed territory view

## Managing Dealer Tiers

### Upgrading Dealers

For existing dealers requesting tier upgrade:

1. Review wholesale order history
2. Verify new tier requirements met
3. Edit user profile
4. Update **Dealer Tier** field
5. Adjust credit limit if needed
6. Notify customer of upgrade

### Downgrading Dealers

If dealer not meeting requirements:

1. Review performance data
2. Document reason for downgrade
3. Contact dealer to discuss
4. Edit user profile
5. Change to lower tier
6. Adjust credit limit accordingly

### Removing Dealer Status

For terminating dealer relationship:

1. Edit user profile
2. Change role from dealer to wholesale or customer
3. Remove territory assignments
4. Set credit limit to zero
5. Document termination reason

## Viewing Active Dealers

### Active Dealers List

Navigate to **Dealer** > **Active Dealers**

Display columns:

| Column | Description |
|--------|-------------|
| **User ID** | WordPress user ID |
| **Email** | Contact email |
| **Company** | Business name |
| **Tier** | Silver, Gold, or Platinum |
| **Territories** | Assigned provinces |
| **Actions** | View, Edit, Remove |

### Dealer Performance

To view dealer performance:

1. Click on dealer name
2. View order history
3. Check total spending
4. Review order frequency

**Key Metrics:**
- Monthly order volume
- Average order value
- Payment timeliness
- Territory coverage

## Troubleshooting

### Issue: Cannot Approve Application

**Possible Causes:**
- Customer not active wholesale
- Missing required information
- User account issue

**Solutions:**
1. Verify wholesale status is "active"
2. Check all required fields completed
3. Ensure user account exists and is valid
4. Check for duplicate applications

### Issue: Territory Conflict

**Possible Causes:**
- Province already assigned
- Exclusive territory overlap

**Solutions:**
1. Review existing territory assignments
2. Negotiate territory sharing with dealers
3. Assign non-overlapping provinces
4. Consider dealer tier for priority

### Issue: Wrong Discount Applied

**Possible Causes:**
- Tier not correctly assigned
- Cache issue
- User role problem

**Solutions:**
1. Verify user role matches tier
2. Clear website cache
3. Check dealer tier in user profile
4. Customer should log out and back in

### Issue: Credit Limit Not Working

**Possible Causes:**
- Limit not saved correctly
- Order exceeds limit

**Solutions:**
1. Verify credit limit in user profile
2. Check limit is positive number
3. Review current outstanding orders
4. Increase limit if justified by history

## Tips and Best Practices

### Application Review

**Response Time:**
- Process applications within 5 business days
- Provide updates if taking longer
- Set clear expectations with applicants

**Verification:**
- Call trade references
- Check business registration
- Verify storage facilities if possible
- Review wholesale payment history

**Documentation:**
- Keep detailed notes on decisions
- Document territory assignments
- Track dealer performance over time

### Territory Management

**Assignment Strategy:**
- Start with smaller territories
- Expand based on performance
- Monitor territory sales reports
- Adjust assignments annually

**Conflict Resolution:**
- Establish clear territory rules
- Mediate dealer disputes fairly
- Consider market demand for adjustments
- Document all territory changes

### Dealer Relationships

**Onboarding:**
- Send welcome package with dealer handbook
- Schedule introductory call
- Provide ordering training
- Assign account manager contact

**Ongoing Support:**
- Regular check-in calls
- Quarterly business reviews
- Provide marketing materials
- Share product updates

**Performance Monitoring:**
- Track monthly sales volume
- Monitor order frequency
- Review payment patterns
- Solicit feedback annually

---

**Related Manuals:**
- [Wholesale Management](./05-wholesale-management.md) - Basic wholesale management
- [Customer Portal](./07-customer-portal.md) - Customer-facing features
