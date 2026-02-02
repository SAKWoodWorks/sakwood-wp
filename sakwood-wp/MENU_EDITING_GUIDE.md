# How to Edit Menu Names in WordPress Admin

## Quick Access

1. **WordPress Admin URL:** http://localhost:8006/wp-admin
2. **Menu Location:** Appearance → Menus

---

## Editing Thai Menu

### Step-by-Step:

1. **Go to Menus Page**
   - WordPress Admin → **Appearance → Menus**

2. **Select Thai Menu**
   - Click on **"Primary Menu Thai"** from the dropdown (top left)
   - Click **Select** button

3. **Edit Menu Items**
   - You'll see all Thai menu items listed
   - To rename a menu item:
     * Click the **down arrow** ▼ next to the item
     * Edit the **"Navigation Label"** field
     - Example: Change "หน้าแรก" to "หน้าหลัก"

4. **Add New Menu Items**
   - On the left side, choose:
     * **Pages** - Add existing WordPress pages
     * **Custom Links** - Add any URL (e.g., /shop, /products)
   - Click **Add to Menu**
   - Configure the item:
     * **Navigation Label**: The text displayed in menu (e.g., "หน้าแรก")
     * **Title Attribute**: Tooltip text on hover

5. **Reorder Items**
   - Drag and drop menu items to reorder
   - Drag slightly to the right to create nested/sub-menu items

6. **Save Changes**
   - Click **Save Menu** button at the bottom

---

## Editing English Menu

### Step-by-Step:

1. **Go to Menus Page**
   - WordPress Admin → **Appearance → Menus**

2. **Select English Menu**
   - Click on **"Primary Menu English"** from the dropdown
   - Click **Select** button

3. **Edit Menu Items**
   - Edit the **"Navigation Label"** field
   - Example: Change "Home" to "Homepage"

4. **Save Changes**
   - Click **Save Menu** button

---

## Common Menu Items to Translate

### Thai Menu Items:
| English | Thai | Path |
|---------|------|------|
| Home | หน้าแรก | / |
| Shop | ร้านค้า | /shop |
| Products | สินค้า | /products |
| Request Quote | ขอใบเสนอราคา | /quote |
| Quote | ใบเสนอราคา | /quote |
| Blog | บล็อก | /blog |
| About | เกี่ยวกับเรา | /about |
| Contact | ติดต่อเรา | /contact |
| Price List | ราคาสินค้า | /price-list |
| Account | บัญชีของฉัน | /account |
| Cart | ตระกร้าสินค้า | /cart |
| Checkout | ชำระเงิน | /checkout |

### English Menu Items:
| English | Path |
|---------|------|
| Home | / |
| Shop | /shop |
| Products | /products |
| Request Quote | /quote |
| Blog | /blog |
| About | /about |
| Contact | /contact |
| Price List | /price-list |
| Account | /account |
| Cart | /cart |
| Checkout | /checkout |

---

## Setting Up Menus for the First Time

### Creating Thai Menu:

1. **Appearance → Menus**
2. Click **"create a new menu"** link (near top)
3. **Menu Name:** `Primary Menu Thai`
4. Click **Create Menu**
5. **Add Menu Items:**
   - Select "Custom Links"
   - URL: `/`
   - Link Text: `หน้าแรก`
   - Click **Add to Menu**
   - Repeat for other items
6. **Menu Settings** (bottom of page):
   - Check ✅ **"Primary Menu Thai"**
7. Click **Save Menu**

### Creating English Menu:

1. **Appearance → Menus**
2. Click **"create a new menu"** again
3. **Menu Name:** `Primary Menu English`
4. Click **Create Menu**
5. **Add Menu Items:**
   - Select "Custom Links"
   - URL: `/`
   - Link Text: `Home`
   - Click **Add to Menu**
   - Repeat for other items
6. **Menu Settings**:
   - Check ✅ **"Primary Menu English"**
7. Click **Save Menu**

---

## Troubleshooting

### Menu locations not showing?

If you don't see "Primary Menu Thai" or "Primary Menu English" in the Menu Settings:

1. **Check plugin is activated:**
   - WordPress Admin → Plugins
   - Verify "Sakwood Integration" is active

2. **Check menu-rest-api.php exists:**
   ```bash
   # Verify file exists in WordPress container
   docker exec sak_wp ls -la /var/www/html/wp-content/plugins/sakwood-integration/menu-rest-api.php
   ```

3. **Restart WordPress container:**
   ```bash
   cd sakwood-wp
   docker-compose restart
   ```

### Menu not updating on frontend?

1. **Clear Next.js cache:**
   ```bash
   cd frontend
   rm -rf .next
   npm run dev
   ```

2. **Check browser cache:**
   - Hard refresh: Ctrl + Shift + R (Windows/Linux)
   - Cmd + Shift + R (Mac)

3. **Verify API endpoint:**
   ```bash
   # Test Thai menu
   curl http://localhost:8006/wp-json/sakwood/v1/menu?lang=th

   # Test English menu
   curl http://localhost:8006/wp-json/sakwood/v1/menu?lang=en
   ```

---

## Tips & Best Practices

1. **Use Custom Links for all menu items**
   - URLs should NOT include language prefix
   - Use: `/shop` (not `/th/shop` or `/en/shop`)
   - The frontend automatically prepends the language

2. **Keep menus synchronized**
   - Maintain the same menu structure in both languages
   - Same items in same order
   - Just different labels

3. **Add icons later (optional)**
   - Menu items can have icons added via CSS
   - Or edit Header component to include icon field

4. **Test both languages**
   - Always check menu items work in both Thai and English
   - Visit `/th/*` and `/en/*` routes

---

## Example Menu Structure

### Thai Menu (Primary Menu Thai):
```
หน้าแรก (/)
ร้านค้า (/shop)
ขอใบเสนอราคา (/quote)
บล็อก (/blog)
เกี่ยวกับเรา (/about)
ติดต่อเรา (/contact)
```

### English Menu (Primary Menu English):
```
Home (/)
Shop (/shop)
Request Quote (/quote)
Blog (/blog)
About (/about)
Contact (/contact)
```

---

## Need Help?

- **WordPress Documentation:** https://wordpress.org/documentation/article/appearance-menus-screen/
- **Plugin Location:** `wordpress-plugin/sakwood-integration/menu-rest-api.php`
- **Frontend Service:** `frontend/lib/services/menuService.ts`
