# Blog Post Management User Manual

**Document Type:** User Manual
**Last Updated:** 2026-01-28
**Audience:** Content editors, marketing staff
**Prerequisites:** WordPress Admin access

## Table of Contents

1. [Overview](#overview)
2. [Creating a New Blog Post](#creating-a-new-blog-post)
3. [Thai/English Language Support](#thaienglish-language-support)
4. [Categories and Tags](#categories-and-tags)
5. [Featured Images](#featured-images)
6. [Publishing and Scheduling](#publishing-and-scheduling)
7. [Editing Existing Posts](#editing-existing-posts)
8. [Troubleshooting](#troubleshooting)

## Overview

The Sakwood blog system supports bilingual content (Thai and English) with automatic language detection. Blog posts are managed through WordPress and displayed on both the Thai and English versions of the website.

### Key Features

- Bilingual content support (TH/EN)
- Categories and tags for organization
- Featured images with automatic optimization
- SEO-friendly URLs
- Scheduled publishing
- Author attribution

## Creating a New Blog Post

### Step 1: Access the Post Editor

1. Log in to WordPress Admin: `http://localhost:8006/wp-admin`
2. In the left sidebar, navigate to **Posts** > **Add New**

```
Posts > Add New
```

### Step 2: Enter Thai Content (Primary Language)

The main WordPress editor fields are used for Thai content:

| Field | Description |
|-------|-------------|
| **Title** | The post title in Thai |
| **Permalink** | Auto-generated URL slug (can edit) |
| **Content Editor** | Main post content in Thai |
| **Excerpt** | Short summary in Thai (optional) |

**Example:**
- Title: `วิธีเลือกไม้สังเคราะห์ที่เหมาะกับโครงการของคุณ`
- Content: Full article in Thai

### Step 3: Enter English Translation

Below the main content editor, you will find a section called **English Translation**.

![Screenshot placeholder: English Translation meta box](images/blog-editor.png)

| Field | Description |
|-------|-------------|
| **Post Title (English)** | The English title |
| **Excerpt (English)** | Short summary in English |
| **Content (English)** | Full English content with formatting toolbar |

**Example:**
- Post Title (English): `How to Choose the Right Plywood for Your Project`
- Content (English): Full article in English

### Step 4: Add Featured Image

1. In the right sidebar, find **Featured Image**
2. Click **Set Featured Image**
3. Upload or select from Media Library
4. Click **Set Featured Image** to confirm

**Recommended image size:** 1200 x 630 pixels (landscape)

### Step 5: Set Categories and Tags

In the right sidebar:

**Categories:**
- Check existing categories OR
- Click **+ Add New Category** to create one

**Tags:**
- Enter tags separated by commas
- Click **Add** for each tag
- Common tags: `Tips & Guides`, `Education`, `Sustainability`

### Step 6: SEO Settings (Optional)

If Yoast SEO or similar plugin is installed:

1. Scroll to **SEO** section below the editor
2. Edit the SEO title and meta description
3. Ensure keywords are included for search optimization

### Step 7: Publish

**Option A: Publish Immediately**
- Click the **Publish** button (top right)

**Option B: Schedule for Later**
1. Click the link next to "Publish immediately"
2. Select date and time
3. Click **Schedule**

## Thai/English Language Support

### How It Works

The Sakwood platform uses a single post for both languages:

1. **Thai content** is entered in the main WordPress fields
2. **English content** is entered in the "English Translation" meta box
3. The website automatically displays the correct language based on user selection

### Language Switching Behavior

| User Selection | Displayed Content |
|----------------|-------------------|
| Thai (default) | Main title, content, excerpt (Thai) |
| English | English translation fields |

### Best Practices

1. **Always provide both languages** - Even if basic, ensure English translation exists
2. **Consistent formatting** - Match paragraph breaks and headings between languages
3. **Image alt text** - Describe images in both languages if possible
4. **Date formatting** - Uses Thai format automatically (e.g., 28 มกราคม 2026)

## Categories and Tags

### Creating Categories

1. Navigate to **Posts** > **Categories**
2. Enter **Name** (displayed text)
3. Enter **Slug** (URL-friendly version, auto-generated)
4. Select **Parent** if creating sub-category
5. Click **Add New Category**

**Suggested Categories:**
- Tips & Guides
- Education
- Sustainability
- Company News
- Product Highlights

### Using Tags

Tags are more specific than categories and help with related posts:

- **Format:** Comma-separated, lowercase preferred
- **Examples:** `plywood`, `construction tips`, `sustainable sourcing`
- **Limit:** Use 3-5 relevant tags per post

## Featured Images

### Image Requirements

| Requirement | Specification |
|-------------|---------------|
| Format | JPG, PNG, WebP |
| Recommended Size | 1200 x 630 px |
| Maximum Size | 2 MB |
| Aspect Ratio | 16:9 or 2:1 |

### Uploading Images

1. Click **Set Featured Image**
2. Drag and drop OR click **Select Files**
3. Add **Alt Text** for accessibility (Thai and English if possible)
4. Click **Set Featured Image**

### Alt Text Best Practices

- Describe the image content clearly
- Include relevant keywords naturally
- Keep under 125 characters
- Example: `Plywood sheets stacked in warehouse with natural lighting`

## Publishing and Scheduling

### Publishing Status Options

| Status | Description | When to Use |
|--------|-------------|-------------|
| **Draft** | Saved but not visible | Work in progress |
| **Pending Review** | Awaiting editor approval | Multi-step workflows |
| **Published** | Live on website | Ready for public |
| **Scheduled** | Auto-publishes later | Future announcements |

### Scheduling a Post

1. Complete all content and translations
2. Click **Publish** button (top right)
3. Click the **Schedule** link that appears
4. Select desired date and time
5. Confirm by clicking **Schedule**

**Tip:** Schedule posts for early morning (9 AM) for maximum engagement.

### Visibility Options

In the **Publish** section:

- **Public:** Visible to everyone (default)
- **Password Protected:** Requires password to view
- **Private:** Only visible to admins and editors

## Editing Existing Posts

### Quick Edit

1. Navigate to **Posts** > **All Posts**
2. Hover over the post title
3. Click **Quick Edit**
4. Modify: Title, Slug, Categories, Tags, Status
5. Click **Update**

### Full Edit

1. Navigate to **Posts** > **All Posts**
2. Click on the post title
3. Make any changes to content or translations
4. Click **Update** to save changes

### Reverting Changes

WordPress saves revisions automatically:

1. Scroll below the content editor
2. Click **Revisions**
3. Select a revision to compare
4. Click **Restore This Revision** if needed

## Troubleshooting

### Issue: English Translation Not Showing

**Possible Causes:**
- English fields were left empty
- Caching issue on the website

**Solutions:**
1. Edit the post and ensure English fields are filled
2. Clear website cache (if caching plugin is active)
3. Hard refresh browser: Ctrl + Shift + R (Windows) / Cmd + Shift + R (Mac)

### Issue: Featured Image Not Displaying

**Possible Causes:**
- Image format not supported
- Image file too large
- Permalink issues

**Solutions:**
1. Re-upload image in JPG format
2. Compress image to under 2 MB
3. Resave permalinks: Settings > Permalinks > Save Changes

### Issue: Post Not Appearing on Blog Page

**Possible Causes:**
- Post scheduled for future date
- Post set to Private
- Category excluded from blog page

**Solutions:**
1. Check publish date in Publish section
2. Ensure visibility is set to Public
3. Verify category is not excluded in theme settings

### Issue: Formatting Lost When Saving

**Possible Causes:**
- Special characters in content
- Copy-pasting from Word

**Solutions:**
1. Use **Paste as text** button in editor
2. Clear formatting before pasting
3. Use plain text editor to clean content first

## Tips and Best Practices

### Content Quality

- **Headlines:** Keep under 60 characters for SEO
- **Content length:** Aim for 500-1000 words
- **Paragraphs:** Keep short (2-3 sentences) for readability
- **Headings:** Use H2, H3 for structure (not H1)

### SEO Optimization

- Include keywords naturally in title and first paragraph
- Use descriptive alt text for images
- Internal link to related posts and products
- Add meta description (155 characters max)

### Bilingual Content

- Maintain consistency between Thai and English versions
- Use professional translation for important posts
- Cultural adaptation may be needed for examples/references

---

**Next Steps:**
- Learn about [Product Management](./02-product-management.md)
- Configure [Hero Slider](./03-hero-slider-management.md) for homepage
