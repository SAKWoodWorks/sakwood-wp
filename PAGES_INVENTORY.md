# Sakwood Website - Complete Page Inventory

Total Pages: **36 pages** (excluding dynamic routes)

---

## 🏠 **Main Pages** (5 pages)

| # | Route | Page | Description |
|---|-------|------|-------------|
| 1 | `/th` or `/en` | `page.tsx` | Homepage |
| 2 | `/th/about` | `about/page.tsx` | About Us |
| 3 | `/th/contact` | `contact/page.tsx` | Contact page |
| 4 | `/th/shop` | `shop/page.tsx` | Shop/Products listing |
| 5 | `/th/blog` | `blog/page.tsx` | Blog listing |

---

## 🛒 **E-Commerce Pages** (5 pages)

| # | Route | Page | Description |
|---|-------|------|-------------|
| 6 | `/th/products/[slug]` | `products/[slug]/page.tsx` | Single product detail |
| 7 | `/th/cart` | `cart/page.tsx` | Shopping cart |
| 8 | `/th/checkout` | `checkout/page.tsx` | Checkout page |
| 9 | `/th/checkout/success` | `checkout/success/page.tsx` | Order confirmation |
| 10 | `/th/price-list` | `price-list/page.tsx` | Complete price list |

---

## 👤 **Authentication & Account Pages** (4 pages)

| # | Route | Page | Description |
|---|-------|------|-------------|
| 11 | `/th/login` | `login/page.tsx` | Login page |
| 12 | `/th/register` | `register/page.tsx` | Registration page |
| 13 | `/th/account` | `account/page.tsx` | Account dashboard |
| 14 | `/th/account/orders` | `account/orders/page.tsx` | Order history |

---

## 📋 **Order Management Pages** (3 pages)

| # | Route | Page | Description |
|---|-------|------|-------------|
| 15 | `/th/orders/[orderId]` | `orders/[orderId]/page.tsx` | Track order by ID |
| 16 | `/th/order-details/[orderId]` | `order-details/[orderId]/page.tsx` | Order details |
| 17 | `/th/compare` | `compare/page.tsx` | Product comparison |

---

## 📝 **Content Pages** (8 pages)

| # | Route | Page | Description |
|---|-------|------|-------------|
| 18 | `/th/blog/[slug]` | `blog/[slug]/page.tsx` | Blog post detail |
| 19 | `/th/faq` | `faq/page.tsx` | FAQ page |
| 20 | `/th/videos` | `videos/page.tsx` | Video gallery |
| 21 | `/th/videos/[slug]` | `videos/[slug]/page.tsx` | Single video |
| 22 | `/th/knowledge` | `knowledge/page.tsx` | Knowledge base |
| 23 | `/th/knowledge/[slug]` | `knowledge/[slug]/page.tsx` | Knowledge article |
| 24 | `/th/knowledge/category/[slug]` | `knowledge/category/[slug]/page.tsx` | Knowledge category |
| 25 | `/th/knowledge/search` | `knowledge/search/page.tsx` | Knowledge search |

---

## 💼 **Business Pages** (3 pages)

| # | Route | Page | Description |
|---|-------|------|-------------|
| 26 | `/th/quote` | `quote/page.tsx` | Request quote |
| 27 | `/th/wholesale` | `wholesale/page.tsx` | Wholesale information |
| 28 | `/th/wholesale/apply` | `wholesale/apply/page.tsx` | Wholesale application |
| 29 | `/th/wholesale/status` | `wholesale/status/page.tsx` | Check application status |

---

## 🔧 **Utility Pages** (5 pages)

| # | Route | Page | Description |
|---|-------|------|-------------|
| 30 | `/th/search` | `search/page.tsx` | Site search |
| 31 | `/th/calculator` | `calculator/page.tsx` | Wood calculator |
| 32 | `/th/room-calculator` | `room-calculator/page.tsx` | Room size calculator |
| 33 | `/th/debug/popup` | `debug/popup/page.tsx` | Debug promotional popup |

---

## 📊 **Summary by Category**

| Category | Count |
|----------|-------|
| Main Pages | 5 |
| E-Commerce | 5 |
| Authentication | 4 |
| Order Management | 3 |
| Content (Blog/FAQ/Videos/Knowledge) | 8 |
| Business (Quote/Wholesale) | 4 |
| Utility (Search/Calculator) | 4 |
| **Total** | **33** |

---

## 🌐 **Multilingual Routes**

All pages support **2 languages** (Thai & English):

- **Thai:** `/th/*` routes
- **English:** `/en/*` routes

Total unique URLs = 33 pages × 2 languages = **66 URLs**

---

## 🔗 **Dynamic Routes (with Parameters)**

| Route Pattern | Example | Description |
|---------------|---------|-------------|
| `[slug]` | `/th/products/pine-wood` | Product slug |
| `[slug]` | `/th/blog/how-to-choose-wood` | Blog post slug |
| `[slug]` | `/th/videos/installation-guide` | Video slug |
| `[slug]` | `/th/knowledge/wood-types` | Knowledge article |
| `[slug]` | `/th/knowledge/category/tips` | Knowledge category |
| `[orderId]` | `/th/orders/12345` | Order ID |
| `[orderId]` | `/th/order-details/12345` | Order details |

---

## 📁 **Page File Locations**

All pages are in: `frontend/app/[lang]/`

```
app/[lang]/
├── page.tsx                          # Homepage
├── about/page.tsx                    # About
├── account/
│   ├── page.tsx                      # Account dashboard
│   └── orders/page.tsx               # Order history
├── blog/
│   ├── page.tsx                      # Blog listing
│   └── [slug]/page.tsx               # Blog post
├── cart/page.tsx                     # Shopping cart
├── checkout/
│   ├── page.tsx                      # Checkout
│   └── success/page.tsx              # Success
├── compare/page.tsx                  # Compare products
├── contact/page.tsx                  # Contact
├── faq/page.tsx                      # FAQ
├── knowledge/
│   ├── page.tsx                      # Knowledge base
│   ├── search/page.tsx               # Search
│   ├── [slug]/page.tsx               # Article
│   └── category/[slug]/page.tsx      # Category
├── login/page.tsx                    # Login
├── order-details/[orderId]/page.tsx  # Order details
├── orders/[orderId]/page.tsx         # Track order
├── price-list/page.tsx               # Price list
├── products/[slug]/page.tsx          # Product detail
├── quote/page.tsx                    # Request quote
├── register/page.tsx                 # Register
├── room-calculator/page.tsx          # Room calculator
├── search/page.tsx                   # Site search
├── shop/page.tsx                     # Shop
├── videos/
│   ├── page.tsx                      # Video gallery
│   └── [slug]/page.tsx               # Video detail
└── wholesale/
    ├── page.tsx                      # Wholesale info
    ├── apply/page.tsx                # Apply
    └── status/page.tsx               # Check status
```

---

## 🎯 **Quick Stats**

- **Total page.tsx files:** 36
- **Main pages:** 5
- **Dynamic route pages:** 7
- **Languages supported:** 2 (Thai, English)
- **Total accessible URLs:** 66+ (dynamic routes create unlimited URLs)

---

## 🔍 **Missing Pages** (Consider Adding)

Based on the menu items, you might want to add:

1. **Terms & Conditions** (`/terms`)
2. **Privacy Policy** (`/privacy`)
3. **Shipping/Delivery Info** (`/shipping`)
4. **Returns & Refunds** (`/returns`)
5. **Warranty Information** (`/warranty`)
6. **Careers** (`/careers`)
7. **Partners** (`/partners`)
8. **News/Press** (`/news`)

---

## 📝 **Notes**

1. All pages are under `[lang]` dynamic route for internationalization
2. Each page automatically has Thai and English versions
3. Pages use Server Components by default (better performance)
4. ISR is enabled on some pages (blog, products, shop)
5. Debug page should be removed or protected in production

---

Last updated: 2026-01-27
