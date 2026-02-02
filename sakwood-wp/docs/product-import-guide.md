# Bulk Product Import Guide for Sakwood

## Overview

This guide shows you how to bulk import products into Sakwood using a CSV file and a ZIP file of images.

---

## Prerequisites

1. **WordPress Admin Access** - You need access to `/wp-admin`
2. **Product Data** - Your product information in Google Sheets
3. **Product Images** - All product images in one folder (as JPG/PNG files)

---

## Step 1: Prepare Your Google Sheet

### Use the Template

1. Copy the template from `docs/product-import-template.csv`
2. Open it in Google Sheets or Excel
3. Fill in your product data

### Required Columns

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| `product_name_th` | Thai product name | ไม้กรอง AA | ✅ Yes |
| `product_name_en` | English product name | AA Grade Plywood | ✅ Yes |
| `description_th` | Full Thai description | ไม้กรองเกรด AA... | ✅ Yes |
| `description_en` | Full English description | Premium AA grade... | ✅ Yes |
| `price` | Sale price (฿) | 1200 | ✅ Yes |
| `width` | Width in mm | 1200 | ✅ Yes |
| `length` | Length in meters | 2.4 | ✅ Yes |
| `thickness` | Thickness in mm | 18 | ✅ Yes |
| `category` | Category slug | wood-panels | ✅ Yes |

### Optional Columns

| Column | Description | Example |
|--------|-------------|---------|
| `short_desc_th` | Short Thai description | ไม้กรองคุณภาพสูง |
| `short_desc_en` | Short English description | Premium quality plywood |
| `regular_price` | Original price (for sale display) | 1500 |
| `sku` | Product SKU code | WOOD-AA-001 |
| `stock_status` | `instock` or `outofstock` | instock |
| `image_file_names` | Main image filename | wood-aa-001.jpg |
| `gallery_file_names` | Extra images (separate with `||`) | img1.jpg\|\|img2.jpg |
| `tags` | Comma-separated tags | premium,marine-grade |

---

## Step 2: Prepare Your Images

### Image Organization (Fastest Method)

Put all images in **one folder** named by SKU/product code:

```
images/
  ├── wood-aa-001.jpg          (main image)
  ├── wood-aa-001-g1.jpg       (gallery 1)
  ├── wood-aa-001-g2.jpg       (gallery 2)
  ├── wood-a-001.jpg
  ├── wood-a-001-g1.jpg
  └── ...
```

### Naming Convention

- **Main image:** `{sku}.jpg` (e.g., `wood-aa-001.jpg`)
- **Gallery images:** `{sku}-g1.jpg`, `{sku}-g2.jpg`, etc.

### Supported Formats

- JPG
- PNG
- WebP

### Recommended Image Size

- **Minimum:** 800 x 800 pixels
- **Optimal:** 1200 x 1200 pixels or larger
- **File size:** Under 2MB per image

---

## Step 3: Create ZIP File of Images

1. Select all your product images
2. Compress/ZIP them into one file
3. Name it: `product-images.zip`

---

## Step 4: Export CSV from Google Sheets

1. In Google Sheets: **File → Download → Comma-separated values (.csv)**
2. Save as: `products.csv`

---

## Step 5: Import to WordPress

### Access Bulk Import Page

1. Go to: `http://localhost:8006/wp-admin`
2. Navigate to: **Products → Bulk Import**

### Upload Files

1. **Upload CSV File**
   - Click "Choose File" or drag and drop
   - Select your `products.csv`

2. **Upload Images ZIP**
   - Click "Choose File" or drag and drop
   - Select your `product-images.zip`

3. **Click "Preview Import"**

### Review and Validate

The system will show:
- ✅ Number of products found
- ✅ Number of images detected
- ⚠️ Any validation errors (e.g., missing required fields)

### Run Import

1. If everything looks good, click **"Start Import"**
2. Wait for progress bar to complete
3. Review results:
   - ✅ Products created
   - ❌ Products with errors

---

## Step 6: Verify Imported Products

### Check WordPress Admin

1. Go to: **Products → All Products**
2. Verify your new products appear
3. Click each product to check:
   - Thai and English names
   - Descriptions
   - Dimensions (width, length, thickness)
   - Images
   - Pricing
   - Categories

### Check Frontend

1. Go to: `http://localhost:3000/th/shop` (or your frontend URL)
2. Verify products display correctly
3. Click a product to check detail page

---

## Common Issues & Solutions

### Issue: "Missing required field"

**Solution:** Check that all required columns have values:
- `product_name_th`, `product_name_en`
- `description_th`, `description_en`
- `price`
- `width`, `length`, `thickness`
- `category`

### Issue: "Image not found"

**Solution:**
- Verify image filename in CSV matches actual file
- Check image is inside the ZIP file
- Ensure file extension matches (JPG vs jpg)

### Issue: "Category not found"

**Solution:**
- The import will automatically create categories if they don't exist
- Check the category slug is valid (lowercase, hyphens only)

### Issue: "Product created but no images"

**Solution:**
- Ensure `image_file_names` column has the correct filename
- Check ZIP file contains the image
- Try re-running the import (it will update existing products)

---

## Tips for Success

1. **Test with 5 products first** - Before importing all 100 products, test with a small batch
2. **Use consistent naming** - Keep image filenames predictable (e.g., use SKU as filename)
3. **Backup first** - Before bulk import, consider backing up your database
4. **Check CSV encoding** - Ensure CSV is UTF-8 encoded for Thai characters
5. **Validate URLs** - If using external image URLs, test that they are accessible

---

## Example: Complete Product Row

```csv
"ไม้กรองเกรด AA","AA Grade Plywood","ไม้กรองเกรด AA คุณภาพสูง","Premium AA grade plywood","ไม้กรองคุณภาพสูง","Premium quality plywood",1200,1500,WOOD-AA-001,1200,2.4,18,wood-panels,instock,wood-aa-001.jpg,wood-aa-001-g1.jpg||wood-aa-001-g2.jpg,premium,marine-grade
```

---

## Need Help?

If you encounter issues:
1. Check the error log in the import results
2. Verify CSV format matches template
3. Ensure all required fields are filled
4. Contact support with error details
