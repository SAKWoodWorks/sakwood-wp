# Chat Platform Configuration User Manual

**Document Type:** User Manual
**Last Updated:** 2026-01-28
**Audience:** Marketing staff, customer service managers
**Prerequisites:** WordPress Admin access

## Table of Contents

1. [Overview](#overview)
2. [Accessing Chat Settings](#accessing-chat-settings)
3. [Supported Chat Platforms](#supported-chat-platforms)
4. [Configuring Each Platform](#configuring-each-platform)
5. [Visual Settings](#visual-settings)
6. [Testing Configuration](#testing-configuration)
7. [Troubleshooting](#troubleshooting)

## Overview

The Chat Platform system displays contact buttons on your website, allowing customers to reach you through their preferred messaging app. Multiple platforms can be enabled simultaneously.

### Supported Platforms

| Platform | Icon | Best For |
|----------|------|----------|
| **LINE** | Green bubble | Thai market, personal support |
| **Telegram** | Blue paper plane | International customers |
| **Messenger** | Blue speech bubble | Facebook users |
| **Call** | Black phone | Direct phone contact |

### How It Appears

- Floating buttons in bottom-right corner of website
- Shows all enabled platforms in vertical stack
- Optional tooltip with help message
- Pulse animation to draw attention

## Accessing Chat Settings

### Step 1: Navigate to Settings

1. Log in to WordPress Admin
2. In the left sidebar, navigate to **Settings** > **Chat Settings**

```
Settings > Chat Settings
```

### Step 2: Settings Page Layout

The page shows:

| Section | Description |
|---------|-------------|
| **Chat Platforms** | Enable/disable and configure each platform |
| **Quick Settings** | Tooltip, delay, animation settings |
| **Save Button** | Save all settings |

## Supported Chat Platforms

### LINE

LINE is the most popular messaging app in Thailand and is highly recommended for Sakwood.

**Enable For:**
- Thai customers
- Quick product questions
- Order support
- Personal customer service

**Default URL:** `https://lin.ee/ucIAvEC`

### Telegram

Telegram is popular for international customers and those who prefer open platforms.

**Enable For:**
- International customers
- Technical discussions
- File sharing
- Group communications

**Default URL:** `https://t.me/yourusername`

### Messenger

Facebook Messenger reaches customers who use Facebook extensively.

**Enable For:**
- Social media customers
- Marketing campaigns
- Facebook ad responses
- Casual inquiries

**Default URL:** `https://m.me/yourpage`

### Call

Direct phone contact for customers who prefer to speak with someone.

**Enable For:**
- Urgent inquiries
- Large orders
- Technical support
- Established customers

**Default URL:** `tel:+6621234567`

## Configuring Each Platform

### General Setup Process

For each platform (LINE, Telegram, Messenger, Call):

#### 1. Enable the Platform

Check the **Enable** checkbox next to the platform name.

#### 2. Set the URL

Enter the destination URL for the chat button:

| Platform | URL Format | Example |
|----------|------------|---------|
| LINE | `https://lin.ee/[ID]` | `https://lin.ee/ucIAvEC` |
| Telegram | `https://t.me/[username]` | `https://t.me/sakwood` |
| Messenger | `https://m.me/[page]` | `https://m.me/sakwood.official` |
| Call | `tel:+[country][number]` | `tel:+66812345678` |

#### 3. Color (Automatic)

Each platform has a preset color:
- LINE: Green
- Telegram: Blue
- Messenger: Indigo
- Call: Black

Colors are applied automatically and cannot be changed.

### Platform-Specific Setup

#### LINE Setup

**Creating a LINE URL:**

1. Download LINE app and create business account
2. Go to LINE Business Center
3. Create LINE Official Account
4. Get your LINE ID or create LINE URL
5. Copy URL to Chat Settings

**Example URLs:**
- `https://lin.ee/ucIAvEC` - LINE short URL
- `https://line.me/ti/p/~@sakwood` - Direct to @username

**Best Practices:**
- Use LINE Official Account for business
- Set up auto-reply messages
- Create greeting message
- Schedule response times

#### Telegram Setup

**Creating a Telegram URL:**

1. Create Telegram account
2. Create username in Settings
3. Share username: `https://t.me/username`
4. For groups: `https://t.me/groupname`

**Example URLs:**
- `https://t.me/sakwood` - Direct message
- `https://t.me/sakwoodsupport` - Support group
- `https://t.me/joinchat/xxxxx` - Private group invite

**Best Practices:**
- Create bot for automated responses
- Set up group for team support
- Use pinned messages for FAQ
- Enable message forwarding

#### Messenger Setup

**Creating a Messenger URL:**

1. Create Facebook Page for business
2. Go to page settings
3. Find Messenger setup
4. Get page username or ID
5. Format: `https://m.me/[username]`

**Example URLs:**
- `https://m.me/sakwood.official` - Page username
- `https://m.me/123456789` - Page ID

**Best Practices:**
- Set up automated greetings
- Create quick reply buttons
- Use chat plugins for website
- Monitor response time metrics

#### Call Setup

**Creating a Call URL:**

1. Use business phone number
2. Format: `tel:+[country code][area code][number]`
3. No spaces or dashes in URL

**Example URLs:**
- `tel:+6621234567` - Bangkok office
- `tel:+66812345678` - Mobile
- `tel:+6623456789` - Second line

**Best Practices:**
- Use country code (+66 for Thailand)
- Provide backup number
- List available hours
- Consider time zones

## Visual Settings

### Show Tooltip

When enabled, shows a helpful message when chat buttons appear:

| Setting | Description |
|---------|-------------|
| **Enabled** | Shows tooltip after delay |
| **Disabled** | No tooltip, buttons only |

**Tooltip Message:** "Need help? Chat with us!" (appears automatically)

### Tooltip Delay

Controls when the tooltip appears after page load:

| Delay | Best For |
|-------|----------|
| 1-2 seconds | Immediate engagement |
| 3 seconds | Standard (recommended) |
| 4-5 seconds | Less intrusive |
| 6-10 seconds | Minimal intrusion |

**Note:** Tooltip only appears once per visitor (stored in browser).

### Pulse Duration

Controls how long the "pulse" animation plays to draw attention:

| Duration | Effect |
|----------|--------|
| 0 seconds | No animation |
| 3 seconds | Quick attention grab |
| 5 seconds | Standard (recommended) |
| 8-10 seconds | Extended animation |

**Animation Description:**
- Buttons gently scale up and down
- Draws eye without being annoying
- Stops after duration expires

### Platform Display Order

When multiple platforms are enabled, they appear in this order (top to bottom):

1. LINE (if enabled)
2. Telegram (if enabled)
3. Messenger (if enabled)
4. Call (if enabled)

**Note:** Order cannot be customized.

## Testing Configuration

### After Saving Settings

1. **Save Settings** button at bottom of page
2. Open your website in a new tab
3. Wait for tooltip delay (3 seconds default)
4. Verify chat buttons appear in bottom-right corner

### Testing Each Platform

| Platform | How to Test |
|----------|-------------|
| LINE | Click button - should open LINE app or web |
| Telegram | Click button - should open Telegram |
| Messenger | Click button - should open Messenger |
| Call | Click button - should prompt to call |

### Mobile vs Desktop

**Desktop:**
- Opens web version of chat app
- May prompt to open desktop app
- Call option opens dialer

**Mobile:**
- Opens app directly (LINE, Telegram, Messenger)
- Opens phone dialer for Call option
- Smoothest experience overall

### Clearing Cache

If changes don't appear:

1. **Browser Cache:** Press Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. **Website Cache:** Clear cache in caching plugin (if used)
3. **Hard Refresh:** F5 multiple times

## Troubleshooting

### Issue: Chat Buttons Not Appearing

**Possible Causes:**
- No platforms enabled
- JavaScript errors on page
- Cache issues

**Solutions:**
1. Verify at least one platform is enabled
2. Check browser console for errors (F12)
3. Clear browser and website cache
4. Try in different browser

### Issue: Clicking Button Does Nothing

**Possible Causes:**
- Invalid URL format
- Missing app on device
- Popup blocked

**Solutions:**
1. Verify URL format for platform
2. Check app is installed on mobile
3. Disable popup blocker for your site
4. Test on different device

### Issue: Wrong Color Displayed

**Possible Causes:**
- Cache showing old settings
- CSS conflict with theme

**Solutions:**
1. Clear cache and refresh
2. Check for custom CSS affecting chat buttons
3. Verify saved settings match desired colors
4. Contact technical support if persists

### Issue: Tooltip Not Showing

**Possible Causes:**
- Tooltip disabled
- Already shown to user (browser storage)
- Delay set too high

**Solutions:**
1. Verify "Show Tooltip" is checked
2. Clear browser localStorage
3. Check delay setting is reasonable
4. Try in incognito/private mode

### Issue: Animation Not Playing

**Possible Causes:**
- Pulse duration set to 0
- CSS animations disabled
- Browser compatibility issue

**Solutions:**
1. Check pulse duration is not 0
2. Test in modern browser (Chrome, Firefox, Safari)
3. Verify animations not disabled in browser settings
4. Check for CSS conflicts in theme

## Tips and Best Practices

### Platform Selection

**For Thai Market:**
- Enable LINE as primary option
- Consider Call for urgent matters
- Telegram as backup

**For International:**
- Telegram or Messenger as primary
- Email contact also recommended
- Call with country code

**For Support:**
- Multiple platforms for accessibility
- Set expectations for response time
- Consider timezone differences

### URL Management

**Keep URLs Current:**
- Verify links work regularly
- Update if usernames change
- Test after any platform changes
- Document current URLs for reference

**Security:**
- Don't share private contact URLs publicly
- Use business accounts, not personal
- Monitor for unusual activity
- Update credentials periodically

### Customer Expectations

**Response Time:**
- Set clear expectations in auto-replies
- List available hours in bio/about
- Provide fallback contact for urgent matters
- Consider timezone for international customers

**Professional Appearance:**
- Use business account names
- Set professional profile pictures
- Create welcome messages
- Use consistent branding

---

**Related Manuals:**
- [Customer Portal](./07-customer-portal.md) - Customer contact features
- [Promotional Popup](./04-popup-management.md) - Customer engagement tools
