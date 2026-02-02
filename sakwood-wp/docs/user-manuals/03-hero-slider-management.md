# Hero Slider Management User Manual

**Document Type:** User Manual
**Last Updated:** 2026-01-28
**Audience:** Marketing staff, content editors
**Prerequisites:** WordPress Admin access

## Table of Contents

1. [Overview](#overview)
2. [Creating a New Slide](#creating-a-new-slide)
3. [Slide Settings Explained](#slide-settings-explained)
4. [Video Backgrounds](#video-backgrounds)
5. [Managing Slide Order](#managing-slide-order)
6. [Slider Duration Settings](#slider-duration-settings)
7. [Editing and Deleting Slides](#editing-and-deleting-slides)
8. [Troubleshooting](#troubleshooting)

## Overview

The Hero Slider is the main image carousel on the homepage. It displays promotional content, featured products, or announcements with automatic rotation.

### Key Features

- Unlimited number of slides
- Customizable slide duration
- Video or image backgrounds
- Overlay controls for readability
- Bilingual content support (TH/EN)
- Call-to-action buttons
- Customizable text colors

### Where It Appears

- Homepage hero section
- Full-width display
- Auto-plays on page load
- Shows navigation dots and arrows

## Creating a New Slide

### Step 1: Access Hero Slides

1. Log in to WordPress Admin
2. In the left sidebar, navigate to **Hero Slides** > **Add New Slide**

```
Hero Slides > Add New Slide
```

### Step 2: Enter Slide Title

The title is for internal identification only (not displayed on frontend):

- **Example:** `January Promotion 2026` or `Featured Product - Plywood`

### Step 3: Set Featured Image (Background)

1. In the right sidebar, click **Set Featured Image**
2. Upload or select from Media Library
3. Click **Set Featured Image**

**Image Specifications:**

| Requirement | Specification |
|-------------|---------------|
| Format | JPG, PNG, WebP |
| Recommended Size | 1920 x 1080 px (16:9 ratio) |
| Maximum Size | 2 MB |
| Orientation | Landscape |

### Step 4: Configure Slide Settings

Scroll down to the **Slide Details** meta box:

| Field | Description | Example |
|-------|-------------|---------|
| **Slider Duration** | Global setting for all slides (ms) | 5000 (5 seconds) |
| **Position** | Order in carousel (0 = first) | 0, 1, 2... |
| **Subtitle** | Small text above title | `PROMOTION` or `NEW ARRIVAL` |
| **Description** | Main text content | Product description or offer details |
| **CTA Button Text** | Button label | `Shop Now` or `Learn More` |
| **CTA Button Link** | Destination URL | `/shop` or `/products/plywood` |
| **Video URL** | YouTube or MP4 URL (optional) | See Video section |
| **Text Color** | Color picker for text | `#ffffff` (white) |
| **Dark Overlay** | Add dark tint to background | Checked for readability |

### Step 5: Publish Slide

1. Review all settings
2. Click **Preview** to see how it looks
3. Click **Publish** to add to slider

## Slide Settings Explained

### Position (Slide Order)

Determines the sequence slides appear:

| Value | Result |
|-------|--------|
| 0 | First slide |
| 1 | Second slide |
| 2 | Third slide |
| etc. | ... |

**Tips:**
- Use increments of 10 (0, 10, 20) to easily insert new slides between existing ones
- Negative numbers are not supported
- Slides with same position sorted by date created

### Subtitle

Small text appearing above the main content:

**Examples:**
- `PROMOTION` - For sales
- `NEW ARRIVAL` - For new products
- `FEATURED` - For highlighted items
- `ข้อเสนอพิเศษ` - Thai: Special Offer

### Description

Main message displayed on the slide. Keep it concise for readability:

**Best Practices:**
- Maximum 2-3 lines
- Focus on single message
- Include call-to-action language
- Match language to your target audience

**Examples:**
- `Get 15% off all plywood this week only`
- `Premium construction materials delivered to your door`

### Call-to-Action (CTA)

The button that prompts user action:

| Field | Description |
|-------|-------------|
| **CTA Button Text** | What appears on the button |
| **CTA Button Link** | Where it goes when clicked |

**Common CTAs:**
- `Shop Now` → `/products`
- `Learn More` → `/about`
- `Contact Us` → `/contact`
- `View Catalog` → `/catalog`

**URL Formats:**
- Internal: `/shop` or `/products/plywood`
- External: `https://supplier.com/catalog`
- Anchor: `/shop#plywood-section`

### Text Color

Use the color picker to choose text color:

**Common Choices:**

| Background | Text Color | Hex Code |
|------------|------------|----------|
| Light background | Black | `#000000` |
| Dark background | White | `#ffffff` |
| Blue background | White | `#ffffff` |

### Dark Overlay

When checked, adds a semi-transparent black layer over the background image:

**Use When:**
- Background is light or colorful
- Text needs better contrast
- Image has varying brightness

**Don't Use When:**
- Background is already dark
- You want full image visibility

## Video Backgrounds

Slides can use video backgrounds instead of static images.

### Supported Video Types

| Type | Source | Format |
|------|--------|--------|
| YouTube | YouTube URL | Any YouTube video URL |
| Direct | Self-hosted | MP4 file URL |

### Adding a YouTube Video

1. Copy YouTube video URL
2. Paste into **Video URL** field
3. Save slide

**Example URLs:**
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ`

### Adding a Direct MP4 Video

1. Upload MP4 to Media Library
2. Copy file URL
3. Paste into **Video URL** field

**Video Specifications:**

| Requirement | Specification |
|-------------|---------------|
| Format | MP4 |
| Recommended Size | 1920 x 1080 px |
| Maximum Size | 50 MB |
| Duration | 10-30 seconds (looping) |

**Important Notes:**
- If video URL is set, it overrides the featured image
- Videos autoplay on loop (no sound)
- Consider mobile data usage - videos use more bandwidth

## Managing Slide Order

### Method 1: Using Position Numbers

1. Edit each slide
2. Change the **Position** number
3. Save changes

**Example:**
```
Slide A: Position = 0 (first)
Slide B: Position = 10 (second)
Slide C: Position = 20 (third)
```

This allows inserting new slides between existing ones without renumbering everything.

### Method 2: Drag and Drop (if plugin enabled)

Some WordPress installations support drag-and-drop reordering:

1. Go to **Hero Slides** > **All Slides**
2. Drag slides to reorder
3. Save order

## Slider Duration Settings

The duration setting controls how long each slide displays before advancing to the next.

### Setting Duration

1. Edit any slide (or create new one)
2. Find **Slider Duration** field
3. Enter duration in milliseconds
4. Save slide

**This is a global setting** - it applies to ALL slides, not just the one you're editing.

### Common Durations

| Duration | Milliseconds | Use For |
|----------|--------------|---------|
| Very Fast | 3000 | High-impact slides |
| Fast | 5000 | Standard promotions |
| Medium | 8000 | Detailed content |
| Slow | 10000 | Information-heavy |

**Recommendation:** 5000-6000ms (5-6 seconds) is optimal for most content.

### Duration Guidelines

Consider:
- **Reading time** - Can user read the text in that time?
- **Impact** - Longer viewing = more memorable
- **Patience** - Too long = users might not see all slides
- **Mobile users** - Consider slower connections

## Editing and Deleting Slides

### Editing a Slide

1. Go to **Hero Slides** > **All Slides**
2. Click on the slide title
3. Make changes
4. Click **Update**

### Quick Edit

For basic changes (title, order, status):

1. Go to **Hero Slides** > **All Slides**
2. Hover over slide row
3. Click **Quick Edit**
4. Modify fields
5. Click **Update**

### Deleting a Slide

**Method 1: Single Slide**

1. Go to **Hero Slides** > **All Slides**
2. Hover over slide
3. Click **Trash**

**Method 2: Bulk Delete**

1. Check boxes for slides to delete
2. Select **Move to Trash** from Bulk Actions
3. Click **Apply**

### Permanently Deleting

Deleted slides go to Trash first:

1. Click **Trash** link at top of list
2. Either:
   - Click **Restore** to recover
   - Click **Delete Permanently** to remove

## Troubleshooting

### Issue: Slide Not Appearing on Homepage

**Possible Causes:**
- Slide not published
- Position conflict
- Caching issue

**Solutions:**
1. Check slide status is "Published"
2. Verify position number is unique
3. Clear browser cache and refresh
4. Clear website cache (if using caching plugin)

### Issue: Text Hard to Read

**Possible Causes:**
- Low contrast between text and background
- No overlay enabled

**Solutions:**
1. Enable **Dark Overlay** checkbox
2. Change text color for better contrast
3. Use a simpler background image

### Issue: Video Not Playing

**Possible Causes:**
- Unsupported video format
- Incorrect URL
- Browser restrictions

**Solutions:**
1. Use YouTube URL format (most reliable)
2. For MP4, ensure direct URL (not download page)
3. Test on different browsers
4. Consider using static image instead

### Issue: CTA Button Not Working

**Possible Causes:**
- Invalid URL format
- Link to non-existent page
- External link blocked

**Solutions:**
1. Verify URL starts with `/` for internal links
2. Check destination page exists
3. For external links, use full URL including `https://`
4. Test link in preview mode

### Issue: Wrong Duration

**Possible Causes:**
- Cache not cleared
- Conflicting settings

**Solutions:**
1. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear website cache
3. Edit any slide and update duration
4. Save and check again

## Tips and Best Practices

### Content Strategy

**Limit Slides:**
- 3-5 slides maximum
- More = users may not see all content
- Rotate seasonal content

**Clear Messaging:**
- One message per slide
- Focus on benefits, not features
- Include urgency when appropriate

**Strong CTAs:**
- Action-oriented text
- Clear destination
- Test different options

### Visual Design

**Image Quality:**
- Use high-resolution images
- Professional photography when possible
- Consistent style across slides

**Readability:**
- Test on mobile devices
- Use overlay when needed
- Keep text minimal

**Brand Consistency:**
- Use brand colors
- Maintain consistent typography
- Follow brand voice

### Performance

**File Sizes:**
- Compress images before uploading
- Use WebP format when possible
- Limit video file sizes

**Testing:**
- Test on different devices
- Check mobile vs desktop appearance
- Verify load times

---

**Related Manuals:**
- [Product Management](./02-product-management.md) - Feature products in slider
- [Popup Management](./04-popup-management.md) - Additional promotional tools
