# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SAK WoodWorks** - Headless WordPress e-commerce application for premium wood products in Thailand.

**Tech Stack:**
- **Frontend:** Next.js 16 (React 19) with App Router
- **Backend:** WordPress 6.4+ + WooCommerce
- **API:** WPGraphQL + Custom REST endpoints (`/wp-json/sakwood/v1/*`)
- **Database:** MySQL 5.7 (dev), MySQL 8.0 (prod)
- **Payment:** PromptPay QR codes (EMVCo CRC-16/CCITT-FALSE)
- **Deployment:** Docker containers (dev & prod)
- **Languages:** TypeScript (frontend), PHP 8.3 (plugin)

**Directory Structure:**
```
sakwood-wp/
├── frontend/              # Next.js 16 App Router application
│   ├── app/              # App Router pages with [lang] dynamic routing
│   ├── components/       # React components (ui/, layout/, feature-specific)
│   ├── lib/              # Services, utilities, GraphQL queries, types
│   ├── dictionaries/     # i18n files (en.json, th.json)
│   └── public/           # Static assets (fonts, images)
├── wordpress-plugin/     # WordPress/WooCommerce integration
│   └── sakwood-integration/  # Custom plugin with REST API endpoints
├── nginx/                # Production Nginx reverse proxy configs
├── docker-compose.yml    # Development environment (no frontend container)
└── docker-compose.prod.yml # Production environment (includes frontend)
```

---

## Build & Development Commands

### Frontend (Local Development)
```bash
cd frontend

# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Testing (Vitest)
npm test              # Run unit tests
npm run test:ui       # Vitest UI
npm run test:coverage # Coverage report

# E2E Testing (Playwright)
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Playwright UI
```

### Docker Development
```bash
cd sakwood-wp

# Start WordPress, MySQL, phpMyAdmin
# Note: Frontend runs separately with `npm run dev`
docker-compose up -d

# Access Services:
# WordPress: http://localhost:8006
# WordPress Admin: http://localhost:8006/wp-admin (admin/admin123)
# phpMyAdmin: http://localhost:8888 (root/sakWW099)
# GraphQL: http://localhost:8006/graphql
# REST API: http://localhost:8006/wp-json/sakwood/v1

# Operations
docker-compose down                    # Stop services
docker-compose logs -f                 # View logs
docker logs sak_wp                     # WordPress logs
docker restart sak_wp                  # Restart WordPress

# Hot-reload plugin changes
docker cp wordpress-plugin/sakwood-integration/file.php \
  sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/

# WP-CLI commands
docker exec -it sak_wp wp plugin list
docker exec -it sak_wp wp post list --post_type=product
```

### Production Deployment (DigitalOcean)

**Pre-deployment:**
1. Update `deploy.sh` or `deploy.ps1` with droplet IP and domain
2. Ensure `.env.production` exists with correct values
3. Configure SSH keys for droplet access

**Deploy:**
```bash
./deploy.sh          # Mac/Linux
.\deploy.ps1         # Windows PowerShell
```

**Post-deployment:**
```bash
ssh root@droplet-ip

# SSL certificates
certbot --nginx -d sakwood.com -d www.sakwood.com
certbot --nginx -d wp.sakww.com

# Check containers
cd /var/www/sakwood
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
```

**Production URLs:**
- Frontend: `https://sakwood.com` (internal port 8007)
- WordPress Admin: `https://wp.sakww.com/wp-admin`
- GraphQL: `https://wp.sakww.com/graphql`
- REST API: `https://wp.sakww.com/wp-json/sakwood/v1`

---

## High-Level Architecture

### The Critical Dual-Service Pattern

**Every data fetching feature typically has two service files:**

1. **Server-Side Service** (`lib/services/featureService.ts`)
   - Direct GraphQL/REST calls to WordPress using `WORDPRESS_API_URL` (server env var)
   - Used by Server Components for SSR
   - Runs in Node.js (can access `process.env.WORDPRESS_API_URL`)
   - Example: `productService.ts` - Calls `http://sak_wp:80/wp-json/...` directly

2. **Client-Side Service** (`lib/services/featureServiceClient.ts`)
   - Calls REST API through Next.js rewrites using language-prefixed paths
   - Used by Client Components for interactive updates (filter changes, pagination, etc.)
   - Runs in browser (cannot access server env vars)
   - Example: `productServiceClient.ts` - Calls `/th/wp-json/sakwood/v1/products?...`

**Why this exists:**
- Mobile browsers can't access `localhost:8006` directly (only the Next.js server can)
- Server-side env vars (`WORDPRESS_API_URL`) not available in browser
- Next.js rewrites (`next.config.ts`) bridge this gap by proxying requests
- Language prefix required to avoid middleware redirect that strips query params

### Request Flow

**Server-Side Rendering:**
```typescript
// Server Component
const productsData = await getProducts(lang, category, sortBy, page);
// Returns: { products: Product[], total: number }
```

**Client-Side Updates:**
```typescript
// Client Component
useEffect(() => {
  async function loadProducts() {
    const result = await getProductsClient(lang, category, sortBy, page, PER_PAGE);
    setProducts(result.products);
    setTotalProducts(result.total);
  }
  loadProducts();
}, [selectedCategory, sortBy, page]);
```

### Environment Variables Strategy

**Development (`.env.local`):**
```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:8006/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8006/wp-json/sakwood/v1
```

**Production (`.env.production`):**
```env
# Client-side (browser)
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://wp.sakww.com/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.sakww.com/wp-json/sakwood/v1

# Server-side (Node.js - set in docker-compose.prod.yml)
# CRITICAL: Do NOT include /wp-json or /graphql - code adds these paths
WORDPRESS_GRAPHQL_URL=http://sak_wp:80
WORDPRESS_API_URL=http://sak_wp:80
```

**Smart Fallback Pattern (`lib/config/constants.ts`):**
```typescript
endpoint: process.env.WORDPRESS_GRAPHQL_URL ||  // Server: Docker internal
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||  // Client: External
  'http://localhost:8006/graphql'  // Dev fallback
```
This pattern allows the same code to work in both server and client environments.

### Next.js Rewrite Rules

**Purpose:** Proxy WordPress assets/API through Next.js to fix mobile access issues.

**Configuration (`next.config.ts`):**
```typescript
rewrites() {
  const wordpressUrl = process.env.WORDPRESS_API_URL || 'http://localhost:8006';
  return [
    { source: '/:lang(en|th)/wp-json/:path*', destination: `${wordpressUrl}/wp-json/:path*` },
    { source: '/wp-json/:path*', destination: `${wordpressUrl}/wp-json/:path*` },
    { source: '/:lang(en|th)/wp-content/:path*', destination: `${wordpressUrl}/wp-content/:path*` },
    { source: '/wp-content/:path*', destination: `${wordpressUrl}/wp-content/:path*` },
  ];
}
```

**Image URL Transformation (`lib/services/productService.ts:45-69`):**
WordPress returns images as `http://sak_wp:80/wp-content/uploads/...` or `http://localhost:8006/wp-content/uploads/...`. These URLs must be transformed to `/wp-content/uploads/...` so they can be proxied through Next.js rewrite rules. This is critical for mobile devices that can't access `localhost:8006`.

```typescript
function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Transform sak_wp:80 to Next.js proxy path
  if (url.includes('sak_wp:80')) {
    const urlObj = new URL(url);
    const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);
    if (wpContentMatch) {
      return `/wp-content/${wpContentMatch[1]}`;
    }
  }
  // Same for localhost:8006
  return url;
}
```

**IMPORTANT: Next.js Image Optimization Disabled**
- `next.config.ts` sets `images: { unoptimized: true }`
- Reason: Next.js optimization was causing errors with proxied WordPress images
- Result: Images load directly from WordPress through Next.js proxy without optimization
- Trade-off: Faster load times, no transformation errors, but no automatic WebP conversion or resizing

### Middleware & Locale Routing

**CRITICAL:** Query parameter loss bug - Middleware strips query params from non-prefixed URLs.

**Always use language-prefixed paths in client components:**
```typescript
// ❌ Wrong - loses query params
fetch('/wp-json/sakwood/v1/categories?language=en')

// ✅ Correct - preserves query params
fetch(`/${language}/wp-json/sakwood/v1/categories?language=${language}`)
```

**Locales:**
- Supported: `th` (default), `en`
- Type-safe: `type Locale = 'en' | 'th'`
- Middleware auto-redirects: `/products` → `/th/products`
- Browser detection via `@formatjs/intl-localematcher` + `negotiator`

### State Management (React Context)

**All contexts use SSR-safe mounted state pattern:**
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;  // Prevents hydration mismatches
```

**Contexts:**
- `CartContext` - Shopping cart, localStorage: `sakwood-cart`
- `AuthContext` - User authentication, roles (retail/wholesale/dealer)
- `CompareContext` - Product comparison
- `ChatContext` - Live chat platform configuration

---

## Critical Production Troubleshooting

### Docker Networking Issues (Containers on Different Networks)

**Symptom:** Frontend container cannot reach WordPress container in production.

**Root Cause:** Containers not on the same Docker network.

**Diagnosis:**
```bash
# Check container networks
docker inspect sak_frontend | grep -A 10 Networks
docker inspect sak_wp | grep -A 10 Networks

# Check if both use same network
docker network ls
docker network inspect sakwood_network
```

**Solution 1: Ensure Shared Network in `docker-compose.prod.yml`:**
```yaml
networks:
  sakwood_network:
    driver: bridge

services:
  wordpress:
    networks:
      - sakwood_network

  frontend:
    networks:
      - sakwood_network
```

**Solution 2: Use Correct Internal URLs (CRITICAL - No trailing `/wp-json`):**
```yaml
# docker-compose.prod.yml
frontend:
  environment:
    # Server-side: Use Docker hostname WITHOUT /wp-json path!
    # The code adds /wp-json/sakwood/v1 automatically
    - WORDPRESS_API_URL=http://sak_wp:80
    # Client-side: Use external URL with full path
    - NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.sakww.com/wp-json/sakwood/v1
```

**⚠️ CRITICAL BUG PREVENTION:**
Never include `/wp-json` in `WORDPRESS_API_URL`. The code constructs the full API path as:
```typescript
const url = `${WORDPRESS_API_URL}/wp-json/sakwood/v1/products`;
```
If `WORDPRESS_API_URL=http://sak_wp:80/wp-json`, it creates:
- `http://sak_wp:80/wp-json/wp-json/sakwood/v1/products` ❌ (404 error)

Correct configuration (`WORDPRESS_API_URL=http://sak_wp:80`) creates:
- `http://sak_wp:80/wp-json/sakwood/v1/products` ✅ (works)

**Solution 3: Restart All Services on Same Network:**
```bash
cd /var/www/sakwood
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

**Verify Connectivity:**
```bash
# From frontend container
docker exec sak_frontend ping sak_wp
docker exec sak_frontend curl http://sak_wp:80/graphql

# Check logs
docker-compose -f docker-compose.prod.yml logs frontend | grep -i error
docker-compose -f docker-compose.prod.yml logs wordpress | grep -i error
```

### Common Production Issues

**Issue: Frontend shows "Failed to fetch" errors or "REST API failed: 404"**

**Quick Diagnosis:**
```bash
# 1. Check WORDPRESS_API_URL is correct (NO /wp-json suffix!)
docker exec sak_frontend env | grep WORDPRESS_API_URL

# 2. Test WordPress API from WordPress container
docker exec sak_wp sh -c "php -r 'echo json_encode(json_decode(file_get_contents(\"http://localhost/wp-json/sakwood/v1/products?language=th&per_page=1\")), JSON_PRETTY_PRINT);'"

# 3. Test connectivity from frontend to WordPress
docker exec sak_frontend node -e "require('http').get('http://sak_wp:80/wp-json/sakwood/v1/products?language=th&per_page=1', (res) => { let data = ''; res.on('data', (d) => { data += d; }); res.on('end', () => { console.log(data.substring(0, 500)); }); }).on('error', (e) => { console.error('Error:', e.message); });"

# 4. Check frontend logs for specific errors
docker logs sak_frontend 2>&1 | grep -E "REST API" | tail -10
```

**Expected Correct Values:**
```bash
WORDPRESS_API_URL=http://sak_wp:80  # ✅ Correct - NO /wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.sakww.com/wp-json/sakwood/v1  # ✅ Correct
```

**Common Fix:**
If `WORDPRESS_API_URL=http://sak_wp:80/wp-json` (wrong!), edit `/var/www/sakwood/docker-compose.prod.yml`:
```bash
nano /var/www/sakwood/docker-compose.prod.yml
# Change: WORDPRESS_API_URL=http://sak_wp:80/wp-json
# To: WORDPRESS_API_URL=http://sak_wp:80

# Restart frontend
cd /var/www/sakwood
docker compose -f docker-compose.prod.yml up -d frontend
```

**Issue: Images broken in production**
- Check Nginx config: `wp.sakww.com` should proxy to `sak_wp:8006`
- Verify SSL certificates are valid
- Check Next.js rewrite rules use correct `WORDPRESS_API_URL`

**Issue: WordPress admin not accessible**
- Verify `wp.sakww.com` DNS points to correct IP
- Check Nginx config: `nginx/wordpress.conf`
- Ensure WordPress container is running: `docker ps | grep sak_wp`

**Issue: Database connection errors**
```bash
# Check MySQL container
docker ps | grep sak_db

# Check WordPress can reach database
docker exec sak_wp ping db

# Verify database credentials in docker-compose.prod.yml
```

---

## Code Quality Standards

**Required Patterns:**

1. **Remove console.log** - Use `console.error` only for actual errors
2. **AbortController for polling** - All async polling in `useEffect` must have cleanup
3. **Mounted state pattern** - For SSR-safe localStorage access
4. **Null-safe arrays** - Check `array?.map()` or use `array?.map() ?? []`
5. **Type safety** - Avoid `any`, use proper TypeScript interfaces
6. **useEffect cleanup** - Return cleanup function to prevent memory leaks
7. **Responsive design** - Use Tailwind breakpoints (sm:, md:, lg:, xl:)
8. **Thai search optimization** - Remove spaces from Thai queries
9. **Client-side fetch with language prefix** - Use `/${language}/wp-json/...` not `/wp-json/...`

**Essential Code Patterns:**

```typescript
// SSR-Safe localStorage Access
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;

// AbortController for Polling (REQUIRED)
useEffect(() => {
  const abortController = new AbortController();
  async function pollStatus() {
    const response = await fetch(url, { signal: abortController.signal });
  }
  pollStatus();
  return () => abortController.abort();
}, [orderId]);

// Null-Safe Array Operations
items?.nodes?.map((item) => ...) ?? []

// Client-side fetch (MUST use language prefix)
fetch(`/${language}/wp-json/sakwood/v1/categories?language=${language}`)  // ✅ Correct
fetch('/wp-json/sakwood/v1/categories')  // ❌ Loses query params
```

---

## WordPress Plugin Architecture

**Custom REST API** (`/wp-json/sakwood/v1/*`):
- `GET /products` - Product listing with language/category filter
- `GET /products/{slug}` - Single product details
- `POST /create-order` - Create new order
- `GET /categories` - All product categories (bypasses GraphQL)
- `GET /menu` - Navigation menu by language
- `GET /posts` - Blog posts
- `POST /wholesale/apply` - Wholesale application
- `GET /customer/addresses` - Customer address CRUD
- `GET /customer/orders` - Customer order history
- `POST /password-reset` - Password reset flow
- `GET /faq`, `GET /knowledge`, `GET /videos` - Content endpoints
- `GET /dealer/*` - Dealer system endpoints

**Critical Files:**
- `sakwood-integration.php` - Main plugin file, loads all modules
- `product-api.php` - Product REST endpoints (category filtering: uses **slug**, not name/ID)
- `product-categories-api.php` - Categories with language filtering
- `product-language.php` - Product TH/EN meta fields
- `category-language.php` - Category TH/EN names

**Key Plugin Systems:**
- **CRM:** `crm-database.php`, `crm-customers.php`, `crm-interactions.php`, `crm-tasks.php`
- **Wholesale:** `wholesale-database.php`, `wholesale-api.php`
- **Dealer:** `dealer-api.php`, `includes/database/dealer-database.php`
- **Content:** `hero-slides-cpt.php`, `faq-cpt.php`, `knowledge-base-cpt.php`, `video-gallery-cpt.php`
- **Blog:** `blog-language-translation.php`, `blog-language-meta-box.php`
- **Users:** `user-roles.php`, `password-reset-api.php`, `bulk-user-import.php`
- **Upload:** `fix-php-upload-limits.php`
- **Admin Dashboard:** `dashboard/sakwood-dashboard.php` - React-based admin interface

**Admin Dashboard (React App):**
- Location: `wordpress-plugin/sakwood-integration/dashboard/`
- Build command: `npm run build` (from dashboard directory)
- Built files: `dashboard/assets/js/build/dashboard.js`
- If dashboard shows blank/404, the React app needs to be built:
  ```bash
  cd wordpress-plugin/sakwood-integration/dashboard
  npm install
  npm run build
  # Commit the built files to deploy
  ```

---

## Language System

### Product Language (Single Product, Two Languages)

**Meta Fields:**
- `_product_title_en` - English product name
- `_product_description_en` - English full description
- `_product_short_description_en` - English short description
- Thai content in default WordPress fields (`post_title`, `post_content`, `post_excerpt`)

**API Usage:**
```bash
curl "http://localhost:8006/wp-json/sakwood/v1/products/wood-batten?language=th"
curl "http://localhost:8006/wp-json/sakwood/v1/products/wood-batten?language=en"
```

### Category Language (Single Category, Two Names)

**Meta Fields:**
- `category_name_en` - English name
- `name` (default) - Thai name

**API Response:**
```json
{
  "id": 39,
  "name": "Battens",              // Localized based on ?language=
  "slug": "battens",
  "name_th": "ไม้โครงสน",          // Always included
  "name_en": "Battens"            // Always included
}
```

---

## Feature Implementation Pattern

When adding new features:

1. **WordPress Plugin:** Create REST API endpoint in `wordpress-plugin/sakwood-integration/`
2. **Frontend:** Add TypeScript interfaces in `lib/types/`
3. **Service:** Create `lib/services/featureService.ts` (server-side)
4. **Service:** Create `lib/services/featureServiceClient.ts` (client-side, if needed)
5. **API Route:** Create `app/api/feature/route.ts` (proxy to WordPress, if needed)
6. **Components:** Build React components with error handling
7. **Translations:** Add to `dictionaries/en.json` and `dictionaries/th.json`
8. **Update** `lib/types/dictionary.ts` with new translation keys
9. **Test** in development, build, verify

**WordPress Endpoint Template:**
```php
register_rest_route('sakwood/v1', '/customer/feature', array(
    'methods' => 'GET',
    'callback' => 'get_feature',
    'permission_callback' => '__return_true', // TODO: Add auth for production
));
```

**Next.js API Route Template:**
```typescript
const userId = searchParams.get('user_id');
const wpUrl = userId ? `${WORDPRESS_API}/customer/feature?user_id=${userId}` : `${WORDPRESS_API}/customer/feature`;
// Forward cookies, proxy response
```

---

## TypeScript Type System

**Product Pricing Types (`lib/types/index.ts`):**
```typescript
type PriceType = 'piece' | 'meter' | 'square_meter' | 'cubic_meter';

interface Product {
  priceTypes: PriceType[];           // Available pricing types
  prices: Partial<Record<PriceType, string>>;  // Prices by type
  price: string;                     // Display price (main)
}
```

**Locale Type (`i18n-config.ts`):**
```typescript
type Locale = 'en' | 'th';  // Type-safe language codes
```

**All WordPress API responses should have corresponding TypeScript interfaces** in `lib/types/index.ts` to ensure type safety across the application.

---

## Business Logic

**Authentication:**
- User roles: `retail`, `wholesale`, `dealer`
- Login accepts username OR email (input `type="text"`)
- Session: localStorage (`sakwood-user`, `sakwood-token`)
- API Pattern: Pass `user_id` explicitly to avoid cookie issues

**Dealer System:**
- Tiers: `silver`, `gold`, `platinum`
- Each tier has: discount %, min order amount/quantity, credit multiplier
- Territories by province
- Application flow: `pending` → `approved`/`rejected` → `active`

**Shipping Zones (Thailand):**
- Zone 1: Bangkok Metropolitan (1-2 days, 5,000-6,500 THB)
- Zone 2: Central Region (2-3 days, 2,000-3,000 THB)
- Zone 3: Northern Region (3-5 days, 3,000-10,000 THB)
- Zone 4: Northeastern (3-5 days, 3,500-4,000 THB)
- Zone 5: Southern Region (4-6 days, 4,000-5,000 THB)
- Free shipping: Orders ≥10,000 THB

**Truck Type Surcharges:**
- Small Truck (6-wheel): Base rate
- Medium Truck (10-wheel): +500 THB (items 3-6m, total >6m, volume >2m³)
- Large Truck (10-wheel): +1,500 THB (items ≥6m, total >12m, volume >5m³)

---

## Database & Backup

**Development Database:**
- MySQL 5.7 in Docker (`sak_db`)
- Connection: `db:3306` (from WordPress container)
- Root password: `sakWW099`

**Database Access:**
```bash
# MySQL CLI
docker exec -it sak_db mysql -uroot -psakWW099

# Export
docker exec sak_db mysqldump -uroot -psakWW099 wordpress > backup.sql

# Import
docker exec -i sak_db mysql -uroot -psakWW099 wordpress < backup.sql

# phpMyAdmin: http://localhost:8888 (root/sakWW099)
```

---

## Common Development Issues

**GraphQL LanguageEnum Error:**
- Occurs when querying `categories` in GraphQL
- Use REST API instead: `GET /wp-json/sakwood/v1/categories`
- Service: `getProductCategories()` in `productServiceCategories.ts`

**Categories Showing Wrong Language:**
- Check service uses language prefix: `/${language}/wp-json/...`
- Wrong: `/wp-json/sakwood/v1/categories?language=en`
- Correct: `/en/wp-json/sakwood/v1/categories?language=en`

**Category Filter Showing All Products:**
- Check if WordPress API accepts `category` parameter (`product-api.php` line 44-47)
- Verify category slugs match (frontend vs database)
- WooCommerce `wc_get_products()` uses category **slug**, not name or ID
- Test: `curl "http://localhost:8006/wp-json/sakwood/v1/products?category=battens"`

**Images Broken on Mobile:**
- Verify `next.config.ts` has rewrite rules for `/wp-content/*` and `/wp-json/*`

**Plugin Changes Not Appearing:**
```bash
# Option 1: Hot-reload single file (fastest for development)
docker cp wordpress-plugin/sakwood-integration/file.php \
  sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/

# Option 2: Restart WordPress container (ensures all changes loaded)
docker restart sak_wp

# Option 3: Volume-mounted in docker-compose.yml (auto-reloads)
# The plugin directory is already mounted: ./wordpress-plugin/sakwood-integration:/var/www/html/wp-content/plugins/sakwood-integration
# Just save the file and wait 1-2 seconds
```

**Build Errors:**
```bash
cd frontend && rm -rf .next
rm -rf node_modules && npm install
npm run lint
```
