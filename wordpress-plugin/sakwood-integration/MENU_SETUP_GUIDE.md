# WordPress Admin Setup Guide - Multilingual Menu System

## Overview

The Sakwood multilingual menu system allows you to manage separate navigation menus for Thai and English languages. When a user switches languages, they will automatically see the appropriate menu.

## Menu Locations

The system registers two menu locations:

1. **Primary Menu Thai (PRIMARY_TH)** - For Thai language navigation
2. **Primary Menu English (PRIMARY_EN)** - For English language navigation

## Step-by-Step Setup

### 1. Access Menu Management

1. Log in to WordPress Admin
2. Navigate to **Appearance → Menus**

### 2. Create Thai Menu

1. Click **"create a new menu"** link (near the top)
2. Enter menu name: **"Primary Menu Thai"**
3. Click **"Create Menu"**
4. Add menu items:
   - Click checkboxes next to desired pages/posts
   - Click **"Add to Menu"**
   - Organize menu items by dragging to reorder
   - Create nested items by dragging them slightly to the right under parent items
5. In **"Menu Settings"** section, check the box for **"Primary Menu Thai"**
6. Click **"Save Menu"**

### 3. Create English Menu

1. Click **"create a new menu"** link again
2. Enter menu name: **"Primary Menu English"**
3. Click **"Create Menu"**
4. Add the translated versions of your menu items:
   - Add English pages/posts
   - Match the structure of your Thai menu (same items, translated)
   - Reorder to match the Thai menu structure
5. In **"Menu Settings"** section, check the box for **"Primary Menu English"**
6. Click **"Save Menu"**

### 4. Verify Menu Locations

1. Go to **Appearance → Menus**
2. Use the **"Select a menu to edit"** dropdown
3. You should see both menus listed
4. When editing each menu, verify the correct location is checked:
   - **Primary Menu Thai** → **Primary Menu Thai**
   - **Primary Menu English** → **Primary Menu English**

## Recommended Menu Structure

### Thai Menu Example
```
- หน้าแรก (Home)
- ร้านค้า (Shop)
  - ไม้สน (Pine Wood)
  - เพลย์วูด (Plywood)
- ขอใบเสนอราคา (Request Quote)
- บล็อก (Blog)
- เกี่ยวกับเรา (About)
- ติดต่อเรา (Contact)
```

### English Menu Example
```
- Home
- Shop
  - Pine Wood
  - Plywood
- Request Quote
- Blog
- About
- Contact
```

## URL Structure for Menu Items

When adding menu items, ensure URLs follow the locale routing pattern:

- Thai pages: `/th/page-name`
- English pages: `/en/page-name`

Example:
- Thai About page: `/th/about`
- English About page: `/en/about`

## Custom Links

If you need to add custom links (not pages):

1. Expand **"Custom Links"** section
2. Enter URL (with language prefix):
   - Thai: `https://yoursite.com/th/products`
   - English: `https://yoursite.com/en/products`
3. Enter Link Text
4. Click **"Add to Menu"**

## Testing

1. Open your frontend application
2. Navigate to homepage: `http://localhost:3000/th` or `http://localhost:3000/en`
3. Verify the correct menu language is displayed
4. Use the language switcher to toggle between Thai and English
5. Verify the menu updates automatically

## Fallback Behavior

If a language-specific menu is not created or is empty:
- The system will fall back to the `PRIMARY` menu location
- If `PRIMARY` is also empty, the system uses hardcoded fallback menus:
  - **Thai fallback**: หน้าแรก, ร้านค้า, ขอใบเสนอราคา, บล็อก, เกี่ยวกับเรา, ติดต่อเรา
  - **English fallback**: Home, Shop, Request Quote, Blog, About, Contact

## Troubleshooting

### Menu not appearing in correct language
- Verify both menus are created and assigned to correct locations
- Clear Next.js cache: `rm -rf .next` and restart dev server
- Check browser cache (hard refresh: Ctrl+Shift+R)

### Menu items showing wrong URLs
- Ensure custom links include language prefix (`/th/` or `/en/`)
- For page links, verify pages are created in correct language

### Changes not reflecting
- WordPress menus cache automatically
- Next.js may need cache clearing: `npm run dev` (rebuilds)
- Check `cache: 'no-store'` setting in `menuService.ts`

## API Endpoint Reference

The menu REST API endpoint:
```
GET /wp-json/sakwood/v1/menu?lang=th
GET /wp-json/sakwood/v1/menu?lang=en
```

Response format:
```json
[
  {
    "id": "1",
    "label": "หน้าแรก",
    "path": "/",
    "url": "http://localhost:8006/",
    "target": "_self",
    "parentId": null,
    "order": 1,
    "children": []
  }
]
```

## Support

For issues or questions:
- Check the plugin code: `wordpress-plugin/sakwood-integration/menu-rest-api.php`
- Check frontend service: `frontend/lib/services/menuService.ts`
- Check layout integration: `frontend/app/[lang]/layout.tsx`
