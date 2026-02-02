# Product Management User Manual

**Document Type:** User Manual
**Last Updated:** 2026-01-28
**Audience:** Product managers, inventory staff
**Prerequisites:** WordPress Admin access, WooCommerce access

## Table of Contents

1. [Overview](#overview)
2. [Adding a New Product](#adding-a-new-product)
3. [Product Dimensions](#product-dimensions)
4. [Product Language Support](#product-language-support)
5. [Product Images and Gallery](#product-images-and-gallery)
6. [Pricing and Inventory](#pricing-and-inventory)
7. [Product Categories](#product-categories)
8. [Editing and Managing Products](#editing-and-managing-products)
9. [Bulk Product Import](#bulk-product-import)
10. [Troubleshooting](#troubleshooting)

## Overview

Sakwood products are managed through WooCommerce, the e-commerce plugin integrated with WordPress. Each product includes specifications, dimensions, pricing, and bilingual content support.

### Product Types

| Type | Description | Use For |
|------|-------------|---------|
| **Simple Product** | Single product with fixed price | Most products (plywood, beams, etc.) |
| **Variable Product** | Product with variations | Products with multiple sizes/colors |

### Key Features

- Custom product dimensions (thickness, width, length)
- Bilingual product names and descriptions (TH/EN)
- Multiple product images with gallery
- Inventory tracking
- Price types (retail, wholesale, dealer)

## Adding a New Product

### Step 1: Access Product Editor

1. Log in to WordPress Admin: `http://localhost:8006/wp-admin`
2. Navigate to **WooCommerce** > **Products** > **Add New**

```
WooCommerce > Products > Add New
```

### Step 2: Enter Basic Product Information

| Field | Description | Example |
|-------|-------------|---------|
| **Product Name** | Thai product name (required) | ไม้สังเคราะห์ 4x8 นิ้ว |
| **Permalink** | URL slug (auto-generated) | `plywood-4x8-inch` |
| **Description** | Full product details in Thai | Full specifications and usage |
| **Short Description** | Brief summary for listing page | ขนาด 1220x2440 มม. หน้า 4 มม. |

### Step 3: Enter English Translation

In the **English Translation** meta box:

| Field | Description |
|-------|-------------|
| **Product Name (English)** | English product name |
| **Short Description (English)** | Brief English summary |
| **Description (English)** | Full English description |

**Example:**
- Product Name (English): `Plywood 4x8 Inch`
- Short Description (English): `Size 1220x2440mm, 4mm thickness`

### Step 4: Set Product Dimensions

In the **Product Dimensions** meta box (right sidebar):

| Field | Unit | Description |
|-------|------|-------------|
| **Thickness** | cm | Material thickness |
| **Width** | cm | Panel width |
| **Length** | m | Panel length |

**Example for standard plywood:**
- Thickness: `1.2` (cm)
- Width: `122` (cm)
- Length: `2.44` (m)

### Step 5: Configure Product Data

In the **Product Data** section (main editor area):

#### General Tab

| Setting | Description |
|---------|-------------|
| **Regular Price** | Standard retail price |
| **Sale Price** | Discounted price (optional) |
| **Tax Status** | Taxable for products with VAT |
| **Tax Class** | Standard tax rate |

**Price Format:** Enter numbers only (no currency symbol or commas)
- Correct: `1250`
- Incorrect: `1,250฿`

#### Inventory Tab

| Setting | Description |
|---------|-------------|
| **SKU** | Unique stock code (optional) |
| **Manage Stock** | Enable inventory tracking |
| **Stock Quantity** | Current inventory count |
| **Backorders** | Allow orders when out of stock |
| **Low Stock Threshold** | Alert level for reordering |

#### Shipping Tab

| Setting | Description |
|---------|-------------|
| **Weight** | Product weight (kg) |
| **Dimensions** | Physical size (L x W x H cm) |
| **Shipping Class** | For calculated shipping |

### Step 6: Add Product Images

1. In the right sidebar, click **Set Product Image**
2. Upload or select from Media Library
3. Add **Alt Text** for accessibility
4. Click **Set Product Image**

**Image Specifications:**

| Image Type | Recommended Size | Use |
|------------|------------------|-----|
| Main Image | 800 x 800 px | Product display |
| Gallery Images | 800 x 800 px | Additional views |
| Thumbnail | 300 x 300 px | Category listings |

### Step 7: Add Product Gallery

1. Below main product image, click **Add Product Gallery Images**
2. Select multiple images showing different angles/uses
3. Click **Add to Gallery**
4. Drag to reorder images

**Gallery Best Practices:**
- Include front, back, and side views
- Show product in use/installed
- Include detail shots of important features
- Maintain consistent lighting across all images

### Step 8: Set Product Categories

1. In the right sidebar, find **Product Categories**
2. Check existing categories OR
3. Click **+ Add New Product Category**

**Common Categories:**
- Plywood
- Beams
- Lumber
- Sheet Materials
- Special Order

### Step 9: Publish Product

1. Review all settings
2. Click **Preview** to check appearance
3. Click **Publish** to go live

## Product Dimensions

### Why Dimensions Matter

Product dimensions in Sakwood serve multiple purposes:

1. **Shipping Calculation** - Determines truck size (small/medium/large)
2. **Storage Planning** - Helps customers estimate space needs
3. **Volume Calculation** - Used for delivery pricing
4. **Product Comparison** - Customers compare specifications

### Dimension Fields

| Field | Unit | Used For |
|-------|------|----------|
| Thickness | cm | Material thickness, quality grade |
| Width | cm | Panel coverage area |
| Length | m | Standard board lengths (1.2m, 2.4m, etc.) |

### Truck Size Calculation

The system automatically determines truck type based on dimensions:

| Truck Type | Trigger Condition | Surcharge |
|------------|-------------------|-----------|
| Small (6-wheel) | Default | Base rate |
| Medium (10-wheel) | Items 3-6m OR total >6m OR volume >2m | +500 THB |
| Large (10-wheel) | Items >=6m OR total >12m OR volume >5m | +1,500 THB |

## Product Language Support

### Language Display Behavior

| User Selection | Product Name | Description |
|----------------|--------------|-------------|
| Thai (default) | Main product name field | Main description |
| English | English name field | English description |

### Translating Product Names

**Format for Product Names:**

Thai: `[Material] [Size] [Type]`
- Example: `ไม้สังเคราะห์ MR 4x8 นิ้ว หน้า 4 มม.`
- Translation: `MR Plywood 4x8 Inch 4mm`

### Category Language

Categories can have bilingual display names. Contact administrator to add category translations.

## Product Images and Gallery

### Image Preparation

Before uploading:

1. **Resize** to recommended dimensions
2. **Compress** to under 500KB per image
3. **Name** files descriptively (e.g., `plywood-4mm-front.jpg`)
4. **Format** as JPG for photos, PNG for graphics

### Image Guidelines

| Aspect | Recommendation |
|--------|----------------|
| Background | White or neutral |
| Lighting | Bright, even lighting |
| Angle | Front-facing, 90 degrees |
| Details | Close-ups for texture/features |
| Consistency | Same style across all products |

### Alt Text Guidelines

Alt text helps SEO and accessibility:

```
Good: "Plywood sheet 4mm thickness stacked on warehouse shelf"
Bad: "wood1.jpg" or "product image"
```

## Pricing and Inventory

### Price Types

Sakwood supports multiple price types based on customer tier:

| Customer Type | Discount | How It's Set |
|---------------|----------|--------------|
| Retail | None (base price) | Regular Price field |
| Wholesale | 15% off | Automatic for wholesale customers |
| Dealer Silver | 20% off | Dealer tier system |
| Dealer Gold | 25% off | Dealer tier system |
| Dealer Platinum | 30% off | Dealer tier system |

### Setting Up Sale Prices

For temporary promotions:

1. Enter **Regular Price** (normal price)
2. Enter **Sale Price** (promotional price)
3. Set **Schedule** optional:
   - Start date/time
   - End date/time

### Inventory Management

**Stock Status Options:**

| Status | Meaning | When Used |
|--------|---------|-----------|
| **In Stock** | Available for purchase | Normal selling |
| **Out of Stock** | Not available | Temporary shortage |
| **On Backorder** | Available but delayed | Special order items |

### Low Stock Alerts

Set threshold for automatic alerts:

1. Go to **WooCommerce** > **Settings** > **Products** > **Inventory**
2. Set **Low Stock Threshold** (e.g., 10 units)
3. Enable notifications

## Product Categories

### Category Structure

```
Products (Root)
├── Plywood
│   ├── MR Grade
│   └── Marine Grade
├── Beams
├── Lumber
└── Sheet Materials
```

### Creating Categories

1. Navigate to **Products** > **Categories**
2. Enter **Name** (displayed to users)
3. Enter **Slug** (URL-friendly, auto-generated)
4. Select **Parent** if sub-category
5. Click **Add New Category**

### Category Display

Categories appear in:
- Main navigation menu
- Product sidebar/filter
- Breadcrumb navigation

## Editing and Managing Products

### Quick Edit

For simple changes (price, stock, status):

1. Go to **Products** > **All Products**
2. Hover over product row
3. Click **Quick Edit**
4. Modify fields
5. Click **Update**

### Bulk Edit

For updating multiple products:

1. Go to **Products** > **All Products**
2. Check boxes for products to edit
3. Select **Edit** from Bulk Actions dropdown
4. Click **Apply**
5. Make changes to apply to all selected

**Common Bulk Actions:**
- Change prices (increase/decrease by %)
- Set stock status
- Move to different category
- Change sale status

### Duplicating Products

For creating similar products:

1. Hover over product in list
2. Click **Duplicate** (or use bulk actions)
3. Edit the duplicate as needed
4. Update images, prices, specifications

**When to Use:** Products with multiple similar sizes or grades

## Bulk Product Import

For adding many products at once, use CSV import:

### Step 1: Prepare CSV File

Download template from:
**WooCommerce** > **Products** > **Import** > **Download CSV Template**

### Required Columns

| Column | Description | Example |
|--------|-------------|---------|
| ID | Product ID (leave blank for new) | |
| Type | simple or variable | simple |
| SKU | Unique identifier | PLY-4MM-001 |
| Name | Product name (Thai) | ไม้สังเคราะห์ 4 มม. |
| Published | 1 or 0 | 1 |
| Featured | 1 or 0 | 0 |
| Description in short | Short description | หน้า 4 มม. |
| Description | Full description | Full specs... |
| Categories | Comma-separated | Plywood, MR Grade |
| Images | Comma-separated URLs | http://... |
| Manage stock | 1 or 0 | 1 |
| Stock quantity | Number | 50 |
| Regular price | Number | 1200 |

### Step 2: Import CSV

1. Go to **WooCommerce** > **Products** > **Import**
2. Upload CSV file
3. Map columns if needed
4. Click **Run Import**

### Import Best Practices

- Test with 5-10 products first
- Validate data before full import
- Keep images uploaded to Media Library first
- Backup database before bulk import

## Troubleshooting

### Issue: Product Not Showing on Frontend

**Possible Causes:**
- Product not published
- Out of stock with "Hide out of stock" enabled
- Category not in menu

**Solutions:**
1. Check product status is "Published"
2. Verify stock status allows display
3. Confirm category is included in navigation

### Issue: Images Not Displaying

**Possible Causes:**
- Large file size
- Unsupported format
- Server permissions

**Solutions:**
1. Compress images under 500KB
2. Use JPG format for photos
3. Clear server cache

### Issue: Price Showing Zero

**Possible Causes:**
- Price field left empty
- Tax configuration issue
- Caching problem

**Solutions:**
1. Enter regular price (numbers only)
2. Check tax settings in WooCommerce
3. Clear cache and refresh

### Issue: Dimensions Not Calculating Correctly

**Possible Causes:**
- Wrong unit entered
- Decimal format issue

**Solutions:**
1. Use decimal point, not comma: `1.2` not `1,2`
2. Ensure correct units (cm for thickness/width, m for length)
3. Save product after entering dimensions

## Tips and Best Practices

### Product Descriptions

**Include:**
- Material specifications
- Common applications/uses
- Certification/grade information
- Size and weight details

**Format:**
- Use bullet points for specs
- Keep paragraphs short
- Include measurements in both metric and imperial if helpful

### Pricing Strategy

- Research competitor pricing
- Consider volume discounts
- Factor in delivery costs
- Update prices regularly based on supplier costs

### Inventory Management

- Set reorder points for popular items
- Review stock levels weekly
- Use backorders for special-order products
- Track sales trends for forecasting

### Image Quality

- Use professional photography when possible
- Maintain consistent background/style
- Show scale (include ruler or familiar object)
- Update images if product packaging changes

---

**Related Manuals:**
- [Hero Slider Management](./03-hero-slider-management.md) - Feature products on homepage
- [Wholesale Management](./05-wholesale-management.md) - Manage wholesale pricing
