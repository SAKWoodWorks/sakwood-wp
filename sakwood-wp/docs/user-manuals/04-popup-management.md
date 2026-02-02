# Promotional Popup Management User Manual

**Document Type:** User Manual
**Last Updated:** 2026-01-28
**Audience:** Marketing staff, promotions managers
**Prerequisites:** WordPress Admin access

## Table of Contents

1. [Overview](#overview)
2. [Accessing Popup Settings](#accessing-popup-settings)
3. [Creating a Promotional Popup](#creating-a-promotional-popup)
4. [Popup Settings Explained](#popup-settings-explained)
5. [Uploading Popup Images](#uploading-popup-images)
6. [Discount Codes](#discount-codes)
7. [Enabling/Disabling the Popup](#enablingdisabling-the-popup)
8. [Troubleshooting](#troubleshooting)

## Overview

The Promotional Popup is a configurable overlay that appears on the website to display special offers, discount codes, or announcements to visitors.

### Key Features

- Enable/disable toggle
- Customizable title and message
- Discount code display
- Image background support
- Adjustable display delay
- Call-to-action button
- One popup at a time (single active campaign)

### Where It Appears

- Appears after specified delay
- Shows once per visitor (uses browser storage)
- Displays on all pages when enabled
- Mobile-responsive design

## Accessing Popup Settings

### Step 1: Navigate to Settings

1. Log in to WordPress Admin
2. In the left sidebar, navigate to **Settings** > **Popup**

```
Settings > Popup
```

### Step 2: Current Settings Display

The page shows current popup configuration:

- Enabled/disabled status
- Preview of content
- Current settings values

## Creating a Promotional Popup

### Step 1: Basic Information

Complete the form fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Enable Popup** | Show/hide toggle | Checked = active |
| **Title** | Main headline | `Special Offer!` |
| **Subtitle** | Supporting message | `Get exclusive discount` |
| **Discount Code** | Promo code to copy | `SAKWOOD15` |
| **Discount Description** | Instructions | `Use this code at checkout:` |
| **CTA Text** | Button label | `Start Shopping Now` |
| **CTA Link** | Button destination | `/shop` |

### Step 2: Add Image (Optional)

1. Click **Upload Image** button
2. Select image from Media Library
3. Click **Use This Image**
4. Preview appears on page

**Image Specifications:**

| Requirement | Specification |
|-------------|---------------|
| Format | JPG, PNG, WebP |
| Recommended Size | 1200 x 600 px |
| Maximum Size | 1 MB |
| Aspect Ratio | 2:1 |

### Step 3: Set Display Delay

Enter the number of seconds before popup appears:

| Delay | Best For |
|-------|----------|
| 0-2 seconds | Immediate engagement |
| 3-5 seconds | Allow page to load (recommended) |
| 6-10 seconds | Let users explore first |

**Recommendation:** 3 seconds is optimal for most campaigns.

### Step 4: Save Settings

Click **Save Settings** at the bottom of the page.

## Popup Settings Explained

### Enable Popup

Turns the popup on or off without deleting content.

| Status | Result |
|--------|--------|
| Checked | Popup appears on website |
| Unchecked | Popup hidden (content preserved) |

**Use When:**
- Temporarily disable during maintenance
- Pause between campaigns
- A/B testing with/without popup

### Title

Main heading in large text:

**Examples:**
- `Special Offer!`
- `Welcome to Sakwood`
- `Limited Time Deal`
- `ข้อเสนอพิเศษ!` (Thai)

### Subtitle

Secondary text below title:

**Examples:**
- `Get 15% off your first order`
- `Free shipping on orders over 10,000 THB`
- `New products just arrived`

### Discount Code

The promo code displayed prominently:

| Format | Example |
|--------|---------|
| Simple word | `SAKWOOD15` |
| Word + number | `SAVE20` |
| Seasonal | `SUMMER2026` |

**Best Practices:**
- Easy to remember
- Easy to type
- All caps for visibility
- Meaningful (relates to discount)

### Discount Description

Instructions for using the code:

| Option | Example |
|--------|---------|
| Simple | `Use this code at checkout:` |
| Detailed | `Enter at checkout for 15% off entire order` |
| Expiration | `Valid until March 31, 2026` |

### CTA (Call-to-Action)

The button that closes popup and navigates:

| Field | Description |
|-------|-------------|
| **CTA Text** | What appears on button |
| **CTA Link** | Destination URL |

**Common CTAs:**

| Text | Link | Use For |
|------|------|---------|
| `Start Shopping` | `/shop` | General shopping |
| `View Products` | `/products` | Product focus |
| `Learn More` | `/promotions` | Info focus |
| `Close` | `#` | Just close popup |

### Delay

Seconds before popup appears after page load:

| Value | User Experience |
|-------|-----------------|
| 0-2 | May feel intrusive |
| 3-5 | Balanced (recommended) |
| 6-10 | More subtle |

**Factors to Consider:**
- Mobile users (longer delay better)
- Page load time (adjust based on speed)
- User intent (longer for informational sites)

## Uploading Popup Images

### Image Guidelines

| Aspect | Recommendation |
|--------|----------------|
| Content | Product showcase or promotional graphic |
| Style | Match brand colors and design |
| Text | Minimal text in image (use form fields instead) |
| Quality | High resolution but compressed |

### Uploading Process

1. Click **Upload Image** button
2. Media Library opens
3. Either:
   - Upload new file
   - Select existing image
4. Click **Use This Image**
5. Preview displays below button

### Removing Image

1. Click **Remove Image** button
2. Image preview disappears
3. Save settings to confirm

## Discount Codes

### Creating Codes in WooCommerce

Popup display is separate from actual discount creation. To create working codes:

1. Go to **WooCommerce** > **Coupons** > **Add New**
2. Enter **Code** (must match popup code exactly)
3. Configure discount:
   - **Discount Type:** Percentage, Fixed cart, or Fixed product
   - **Coupon Amount:** Discount value
   - **Usage Limit:** Per customer or total
4. Set **Expiration Date** if limited-time
5. Click **Publish**

### Code Best Practices

| Practice | Why |
|----------|-----|
| Uppercase only | Easier to read and type |
| Short (8-10 chars) | Easier to remember |
| No special chars | Avoid confusion |
| Meaningful | Relates to offer |

**Examples:**
- `WELCOME15` - New customer discount
- `SAVE20` - 20% off promotion
- `FREESHIP` - Free shipping offer
- `JANUARY26` - Month-specific code

## Enabling/Disabling the Popup

### To Enable

1. Go to **Settings** > **Popup**
2. Check **Enable Popup** box
3. Click **Save Settings**

### To Disable

1. Go to **Settings** > **Popup**
2. Uncheck **Enable Popup** box
3. Click **Save Settings**

**Note:** Disabling preserves all content for future use.

### Campaign Schedule Example

For time-based campaigns:

| Date | Action |
|------|--------|
| Day 1 | Enable popup with new campaign |
| Day 7 | Disable popup (campaign ends) |
| Day 8 | Update content for next campaign |
| Day 14 | Enable popup for new campaign |

## Troubleshooting

### Issue: Popup Not Appearing

**Possible Causes:**
- Popup not enabled
- Browser cache showing "already seen" state
- JavaScript errors on page

**Solutions:**
1. Verify **Enable Popup** is checked
2. Clear browser cache and localStorage
3. Try in incognito/private mode
4. Check browser console for errors

### Issue: Discount Code Not Working

**Possible Causes:**
- Code not created in WooCommerce
- Code expired
- Code typed incorrectly

**Solutions:**
1. Verify code exists in **WooCommerce** > **Coupons**
2. Check expiration date
3. Test code in checkout
4. Ensure popup code matches WooCommerce code exactly

### Issue: Image Not Displaying

**Possible Causes:**
- Image file too large
- Unsupported format
- Broken image URL

**Solutions:**
1. Compress image under 1MB
2. Use JPG or PNG format
3. Re-upload image
4. Check image URL is valid

### Issue: Popup Appears Too Quickly

**Possible Causes:**
- Delay set too low
- Page loads faster than expected

**Solutions:**
1. Increase delay to 4-5 seconds
2. Test on actual connection speed
3. Consider different mobile vs desktop delay

### Issue: Popup Text Hard to Read

**Possible Causes:**
- Image background conflicts with text
- Poor color contrast

**Solutions:**
1. Use solid color or subtle image
2. Ensure text contrast is sufficient
3. Test on mobile devices
4. Consider no image for text-heavy popups

## Tips and Best Practices

### Campaign Strategy

**Frequency:**
- Don't show on every visit
- Consider cookie duration settings
- Rotate campaigns weekly/monthly

**Timing:**
- Launch during high-traffic periods
- Align with promotions or holidays
- Avoid showing during checkout process

**Targeting:**
- Consider new vs returning customers
- Product-specific promotions
- Seasonal campaigns

### Content Best Practices

**Clear Offer:**
- State discount clearly
- Show value (15% off, save 500 THB)
- Include expiration if limited

**Strong CTA:**
- Action-oriented text
- Clear next steps
- Easy to close if not interested

**Mobile Optimization:**
- Keep text concise
- Large, tappable close button
- Test on mobile devices

### Testing

**Before Launch:**
- Test on different browsers
- Verify discount code works
- Check mobile appearance
- Confirm CTA link works

**A/B Testing:**
- Test different headlines
- Compare delay times
- Try with/without image
- Measure conversion impact

---

**Related Manuals:**
- [Hero Slider Management](./03-hero-slider-management.md) - Homepage promotions
- [Product Management](./02-product-management.md) - Product-specific promotions
