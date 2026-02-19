# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **headless WordPress e-commerce application** for SAK WoodWorks, a premium wood products supplier in Thailand.

**Architecture:**
- **Frontend:** Next.js 16 (React 19) with App Router - Customer-facing website
- **Backend:** WordPress 6.4+ + WooCommerce - Product/content management
- **API Layer:** WPGraphQL + Custom WordPress REST endpoints (`/wp-json/sakwood/v1/*`)
- **Database:** MySQL 8.0
- **Deployment:** Docker containers (development & production)
- **Payment:** PromptPay QR code generation (EMVCo CRC-16/CCITT-FALSE)
- **Languages:** TypeScript (frontend), PHP 8.3 (WordPress plugin)

**Directory Structure:**
```
sakwood-wp/
├── frontend/              # Next.js 16 App Router application
│   ├── app/              # App Router pages with [lang] dynamic routing
│   ├── components/       # React components (ui/, layout/, feature-specific)
│   ├── lib/              # Services, utilities, GraphQL queries, types
│   ├── dictionaries/     # i18n files (en.json, th.json)
│   └── public/           # Static assets
├── wordpress-plugin/     # WordPress/WooCommerce integration
│   └── sakwood-integration/  # Custom plugin with REST API endpoints
├── nginx/                # Production Nginx configuration
├── scripts/              # Deployment scripts (deploy.ps1, deploy.sh)
└── docs/                 # User manuals and technical documentation
```

## Specialized Agent System

This project uses a custom agent system defined in `.claude/agents/` for specialized workflows:

**Available Agents:**
- `feature-orchestrator` - Manages complete feature lifecycle from planning through implementation
- `nextjs-wpgraphql-builder` - Creates/modifies Next.js components that consume WordPress GraphQL data
- `nextjs-debugger` - Diagnoses hydration errors, API failures, caching issues, or server-client mismatches
- `code-quality-auditor` - Reviews code for security, performance, SEO, and accessibility compliance
- `docs-writer` - Creates/updates technical documentation

**When to use agents:**
- Building new features → `feature-orchestrator`
- Creating product/blog pages → `nextjs-wpgraphql-builder`
- Debugging Next.js issues → `nextjs-debugger`
- After major code changes → `code-quality-auditor`
- Updating documentation → `docs-writer`

## Development Commands

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code (TypeScript + ESLint)
npm run lint

# Run tests
npm test              # Unit tests with Vitest
npm run test:ui       # Vitest UI
npm run test:coverage # Coverage report
npm run test:e2e      # E2E tests with Playwright
npm run test:e2e:ui   # E2E tests with UI
```

### Docker Environment (Development)
```bash
cd sakwood-wp

# Start WordPress, MySQL, and phpMyAdmin
docker-compose up -d

# Access services
# WordPress Admin: http://localhost:8006/wp-admin (admin/admin123)
# WordPress Site: http://localhost:8006
# phpMyAdmin: http://localhost:8888 (root/sakWW099)
# WordPress GraphQL: http://localhost:8006/graphql
# Custom REST API: http://localhost:8006/wp-json/sakwood/v1

# Stop services
docker-compose down

# View logs
docker-compose logs -f          # All services
docker logs sak_wp              # WordPress only
docker logs sak_db              # MySQL only

# Restart services
docker-compose restart

# Copy plugin changes to container
docker cp wordpress-plugin/sakwood-integration/file.php sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/
```

### Production Deployment (DigitalOcean)
```bash
cd sakwood-wp

# Deploy to production
.\deploy.ps1         # Windows PowerShell
./deploy.sh          # Mac/Linux Bash

# Production environment
docker-compose -f docker-compose.prod.yml up -d    # Start production containers
docker-compose -f docker-compose.prod.yml down     # Stop production containers
docker-compose -f docker-compose.prod.yml logs -f  # View production logs
```

## Core Architecture Patterns

### The Critical Dual-Service Pattern

**This is the most important pattern to understand.**

Every data fetching feature typically has **two service files**:

1. **Server-Side Service** (`lib/services/featureService.ts`)
   - Direct GraphQL calls to WordPress
   - Used by Server Components for initial page load (SSR)
   - Runs in Node.js environment (can access `process.env.WORDPRESS_API_URL`)

2. **Client-Side Service** (`lib/services/featureServiceClient.ts`)
   - Calls Next.js API proxy routes or REST API
   - Used by Client Components for interactive updates
   - Runs in browser (cannot access server env vars)
   - Bypasses CORS issues for mobile devices

**Example - Products:**
- `productService.ts` - Server-side GraphQL queries with pagination
- `productServiceClient.ts` - Client-side REST API calls for filters/pagination

**Why this pattern exists:**
- Mobile browsers can't access `localhost:8006` directly (Docker WordPress container)
- Server-side env vars (`process.env.WORDPRESS_API_URL`) not available in browser
- Next.js rewrites and proxy routes bridge this gap

### Request Flow & Data Layer

**Server-Side Rendering (SSR):**
```typescript
// Server Component (app/[lang]/shop/page.tsx)
const productsData = await getProducts(lang, category, sortBy, currentPage);
// Returns: { products: Product[], total: number }
```

**Client-Side Updates:**
```typescript
// Client Component (ShopPage.tsx)
useEffect(() => {
  async function loadProducts() {
    const result = await getProductsClient(lang, category, sortBy, currentPage, PRODUCTS_PER_PAGE);
    setProducts(result.products);
    setTotalProducts(result.total);
  }
  loadProducts();
}, [selectedCategory, sortBy, currentPage]);
```

### Mobile Compatibility Strategy

**Problem:** Mobile browsers on same network cannot access `localhost:8006`

**Three Solutions:**
1. **Image URL Transformation:** `sak_wp:80/wp-content/...` → `/wp-content/...` (Next.js rewrite)
2. **Next.js Rewrite Rules:** `/wp-json/*` → WordPress server-side proxy
3. **API Proxy Routes:** `/api/*` routes for complex operations

**Configuration** (in `next.config.ts`):
```typescript
rewrites() {
  return [
    { source: '/:lang(en|th)/wp-json/:path*', destination: `${wordpressUrl}/wp-json/:path*` },
    { source: '/wp-json/:path*', destination: `${wordpressUrl}/wp-json/:path*` },
    { source: '/:lang(en|th)/wp-content/:path*', destination: `${wordpressUrl}/wp-content/:path*` },
    { source: '/wp-content/:path*', destination: `${wordpressUrl}/wp-content/:path*` },
  ];
}
```

### Component & Page Structure

**App Router Pattern:**
```
app/[lang]/              # Dynamic locale routing (th, en)
├── (page)/              # Homepage group
├── shop/
│   ├── page.tsx        # Server Component: fetches initial data with pagination
│   └── ShopPage.tsx    # Client Component: filters, pagination, categories
├── products/[slug]/    # Dynamic product pages
├── blog/[slug]/        # Blog post pages
└── account/            # Customer portal (protected routes)
```

**Data Flow Example (Shop Page):**
1. User visits `/th/shop?page=2`
2. Server Component fetches products 13-24 via `getProducts(lang, category, sortBy, 2)`
3. Data passed to Client Component as props: `initialProducts`, `initialTotal`
4. Client component hydrates and enables filters/pagination
5. User changes filter → `useEffect` triggers `getProductsClient(..., 1)` → resets to page 1

### State Management (React Context)

**All contexts use SSR-safe mounted state pattern:**
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;  // Prevents hydration mismatches
```

**Available Contexts:**
- `CartContext` - Shopping cart, localStorage key: `sakwood-cart`
- `AuthContext` - User authentication, roles (retail/wholesale/dealer)
- `CompareContext` - Product comparison
- `ChatContext` - Live chat platform configuration

### Internationalization (i18n)

**Configuration:**
- Supported locales: `th` (default), `en`
- Middleware: `@formatjs/intl-localematcher` + `negotiator`
- Auto-redirect: `/products` → `/th/products`
- Type-safe translations via `lib/types/dictionary.ts`

**Accessing translations:**
```typescript
// Server Components
import { getDictionary } from '@/lib/get-dictionary';
const dict = await getDictionary(lang);
return <h1>{dict.shop.title}</h1>;
```

## Critical Architecture Decisions

### 1. GraphQL Language Field Issue (2026-02-19)

**Problem:** WPGraphQL 2.9.0 adds a `language` field to Post types that references non-existent `LanguageEnum` type, causing errors when querying categories.

**Solution:** Removed `categories` from GraphQL query, created REST API endpoint instead.

**Files:**
- `frontend/lib/graphql/queries.ts` - GET_PRODUCTS_QUERY (categories removed)
- `wordpress-plugin/sakwood-integration/product-categories-api.php` - New REST endpoint
- `frontend/lib/services/productServiceCategories.ts` - Fetch categories from REST
- `frontend/app/[lang]/shop/ShopPage.tsx` - Fetch categories in useEffect

**API Endpoint:** `GET /wp-json/sakwood/v1/categories`

### 2. Pagination Implementation (2026-02-19)

**Shop page now has:**
- 12 products per page (`PRODUCTS_PER_PAGE`)
- Pagination component showing "Showing 1-12 of 40 products"
- URL state: `?page=2` updates browser URL
- Resets to page 1 when filters change

**Services return:**
```typescript
interface ProductsResponse {
  products: Product[];
  total: number;
}
```

### 3. Client-Side API Pattern (CRITICAL - Language Prefix Required)

**Always use language-prefixed paths in client components:**
```typescript
// ❌ Wrong - loses query params through middleware redirect
fetch('/wp-json/sakwood/v1/categories?language=en')
// Middleware redirects /wp-json/* and query params get lost

// ✅ Correct - language prefix bypasses middleware
fetch(`/${language}/wp-json/sakwood/v1/categories?language=${language}`)
// Next.js rewrite: /:lang(en|th)/wp-json/:path* → WordPress
```

**Why this matters:**
- Next.js middleware strips query parameters from `/wp-json/*` paths
- Language-prefixed paths match rewrite rules exactly
- Query parameters (`?language=en`) reach WordPress correctly
- Categories display in correct language on shop page

**Example from productServiceCategories.ts:**
```typescript
export async function getProductCategories(language: string = 'th'): Promise<ProductCategory[]> {
  // MUST use language prefix to avoid middleware redirect
  const url = `/${language}/wp-json/sakwood/v1/categories?language=${language}`;
  const response = await fetch(url, { ... });
  // ...
}
```

## Key Services Reference

**WordPress Services** (`lib/services/`):
- `wordpressService.ts` - GraphQL client wrapper
- `productService.ts` - Server-side products with pagination (returns `ProductsResponse`)
- `productServiceClient.ts` - Client-side products with pagination
- `productServiceCategories.ts` - Fetch categories from REST API (bypasses GraphQL)
- `searchService.ts` - Thai-optimized search (removes spaces for matching)
- `menuService.ts` - Navigation menus with fallback
- `blogService.ts` - Blog content with language support
- `deliveryService.ts` - Thailand zone-based shipping (77 provinces)
- `promptpayService.ts` - PromptPay QR code generation (EMVCo standard)
- `orderService.ts` - Order retrieval by ID
- `orderStatusService.ts` - Payment status polling with AbortController
- `wholesaleService.ts` - Wholesale application flow
- `customerAddressService.ts` - Customer address CRUD
- `customerOrderService.ts` - Customer order history
- `popupService.ts` / `heroSlideService.ts` / `chatService.ts` - Content management
- `sliderSettingsService.ts` - Hero slider CRUD

**GraphQL Queries** (`lib/graphql/queries.ts`):
- `GET_PRODUCTS_QUERY` - Product listing (NO categories - triggers language error)
- `GET_PRODUCT_QUERY` - Single product details
- `GET_HERO_SLIDES_QUERY` - Homepage slider

## WordPress Plugin Architecture

**Custom REST API** (`/wp-json/sakwood/v1/*`):
- `GET /products` - Product listing with language/category filter
- `GET /products/{slug}` - Single product details
- `POST /create-order` - Create new order
- `GET /categories` - All product categories (NEW - bypasses GraphQL)
- `GET /menu` - Navigation menu by language
- `GET /posts` - Blog posts
- `POST /wholesale/apply` - Wholesale application
- `GET /customer/addresses` - Customer address CRUD
- `GET /customer/orders` - Customer order history

**Custom Post Types:**
- Hero Slides - Homepage slider content
- FAQ - Frequently asked questions
- Knowledge Base - Technical articles
- Video Gallery - Product videos

**Critical Files:**
- `sakwood-integration.php` - Main plugin file, loads all modules
- `product-api.php` - Product REST endpoints with category filtering support
  - **Important:** Line 44-47 registers `category` parameter
  - Line 92-95 uses `wc_get_products()` with `category` array
  - WooCommerce filters by category **slug**, not name or ID
- `product-bulk-import.php` - CSV bulk import for products
- `product-categories-api.php` - Categories REST endpoint with language filtering
- `product-language.php` - Product language meta fields (TH/EN on single product)
- `category-language.php` - Category language meta fields (TH/EN on single category)
- `product-price-types.php` - Multiple price types (piece, meter, etc.)

### Category Language System (2026-02-19)

**Single Category with Two Languages:**
- One category entity (not separate TH/EN categories)
- Thai name stored in category `name` field
- English name stored in term_meta `category_name_en`
- API returns correct name based on `?language=` parameter

**Adding Categories in WordPress Admin:**
1. Go to Products → Categories
2. **Name** field: Enter Thai name (primary)
3. **Category Name (English)** field: Enter English translation
4. Click "Add New Category"

**API Response Format:**
```json
{
  "id": 39,
  "name": "Battens",              // English name when ?language=en
  "slug": "battens",
  "count": 5,
  "name_th": "ไม้โครงสน",          // Thai name (always included)
  "name_en": "Battens"            // English name (always included)
}
```

**Frontend Usage:**
```typescript
// Fetch categories with correct language
const cats = await getProductCategories(lang);  // 'th' or 'en'

// Response automatically has correct language in 'name' field
cats.map(cat => cat.name)  // Returns Thai names for 'th', English for 'en'
```

**TypeScript Interface:**
```typescript
interface ProductCategory {
  id: number;
  name: string;          // Localized based on ?language= param
  slug: string;
  count?: number;
  name_th?: string;      // Thai name (always available)
  name_en?: string;      // English name (if set)
}
```

**Category Filtering Best Practices:**
- Use clean, simple slugs (e.g., `battens`, not `pine-battens`)
- Avoid special characters or spaces in slugs
- When bulk importing products, ensure category slugs match existing categories
- Test filtering via API: `curl "http://localhost:8006/wp-json/sakwood/v1/products?category=battens"`
- Frontend sends category slug, not name or ID
- All category filtering happens server-side via `wc_get_products()`

## Code Quality Standards

**Required Patterns:**
1. **Remove console.log** - Use `console.error` only for actual errors
2. **AbortController for polling** - All async polling in `useEffect` must have cleanup
3. **Mounted state pattern** - For SSR-safe localStorage access
4. **Null-safe arrays** - Check `array?.map()` or use `array?.map() ?? []`
5. **Type safety** - Avoid `any`, use proper TypeScript interfaces
6. **useEffect cleanup** - Return cleanup function to prevent memory leaks
7. **Responsive design** - Use Tailwind breakpoints (sm:, md:, lg:, xl:)
8. **Thai search optimization** - Remove spaces from Thai queries for better matching
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
fetch(`${process.env.WORDPRESS_API_URL}/categories`)  // ❌ Broken in browser
```

## Business Logic

**Authentication:**
- User roles: `retail`, `wholesale`, `dealer`
- Login accepts both username OR email (input type="text", not email)
- Session: localStorage (`sakwood-user`, `sakwood-token`)
- **API Pattern:** Pass `user_id` explicitly in request body to avoid cookie issues

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

**Wholesale Flow:** `pending` → `approved` → `active` (or `rejected`)

**Current Product Categories (2026-02-19):**
- ไม้โครงสน (Battens) - 5 products - slug: `battens`
- ไม้แปรรูปสน (Timber) - 19 products - slug: `timber`
- ไม้ฝาสน (Cladding) - 7 products - slug: `cladding`
- ไม้พื้น (Flooring) - 6 products - slug: `flooring`
- ไม้ครอบมุม - ไม้บัว (Corner - Skirting) - 2 products - slug: `corner`
- เสา (Pole) - 1 product - slug: `pole`
- Other categories: Conifer (40 products, parent category), Teak, Fused Bamboo
- Total: 40 unique products (after removing 5 duplicates on 2026-02-19)

## Troubleshooting

**Docker Issues:**
```bash
docker-compose down && docker-compose up -d --build  # Rebuild
docker-compose logs -f                               # Check logs
```

**Frontend Can't Connect:**
```bash
docker-compose ps                                   # Verify WordPress running
curl http://localhost:8006/graphql                  # Test GraphQL
curl http://localhost:8006/wp-json/sakwood/v1/products?language=en
```

**Plugin Changes Not Appearing:**
```bash
docker cp wordpress-plugin/sakwood-integration/file.php sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/
docker-compose restart sak_wp
```

**Build Errors:**
```bash
cd frontend && rm -rf .next                         # Clear cache
rm -rf node_modules && npm install                  # Reinstall deps
npm run lint                                       # Check TypeScript
```

**GraphQL LanguageEnum Error:**
- This occurs when querying `categories` in GraphQL
- Use REST API endpoint instead: `GET /wp-json/sakwood/v1/categories`
- Service: `getProductCategories()` in `productServiceCategories.ts`

**Images Broken on Mobile:** Verify `next.config.ts` has rewrite rules for `/wp-content/*` and `/wp-json/*`

**Categories Not Showing:**
- Check browser console for fetch errors
- Verify Next.js rewrite rules are working
- Test REST API: `curl http://localhost:8006/wp-json/sakwood/v1/categories`
- Test with language: `curl http://localhost:8006/wp-json/sakwood/v1/categories?language=en`

**Categories Showing Wrong Language (e.g., TH on EN page):**
- Check if service uses language prefix: `/${language}/wp-json/...`
- Wrong: `/wp-json/sakwood/v1/categories?language=en` (loses query param)
- Correct: `/en/wp-json/sakwood/v1/categories?language=en`
- Verify in `productServiceCategories.ts` line 13
- Test API: `curl http://localhost:8006/wp-json/sakwood/v1/categories?language=en`
- Should return: `[{"id":39,"name":"Battens",...}]`
- Test API: `curl http://localhost:8006/wp-json/sakwood/v1/categories?language=th`
- Should return: `[{"id":39,"name":"ไม้โครงสน",...}]`

**Category Filter Showing All Products (Critical):**
- Check if WordPress API accepts `category` parameter (product-api.php line 44-47)
- Verify category slugs match between frontend and database
- Common issue: Frontend sends `pole` but database has `pine-pole`
- Check actual slugs in WordPress Admin → Products → Categories
- Or test API: `curl http://localhost:8006/wp-json/sakwood/v1/categories?language=en`
- If slugs don't match, rename categories in WordPress Admin or via script
- WooCommerce `wc_get_products()` uses category slug, not name or ID
- API filter example: `?category=battens&per_page=100` returns only battens products

## Feature Implementation Pattern

When adding new features:
1. WordPress Plugin: Create REST API endpoint in `wordpress-plugin/sakwood-integration/`
2. Frontend: Add TypeScript interfaces in `lib/types/`
3. Service: Create `lib/services/featureService.ts` (server-side)
4. Service: Create `lib/services/featureServiceClient.ts` (client-side, if needed)
5. API Route: Create `app/api/feature/route.ts` (proxy to WordPress, if needed)
6. Components: Build React components with error handling
7. Translations: Add to `dictionaries/en.json` and `dictionaries/th.json`
8. Update `lib/types/dictionary.ts` with new translation keys
9. Test in development, build, verify

## Creating Customer Endpoints

**WordPress REST API** (add to plugin):
```php
register_rest_route('sakwood/v1', '/customer/feature', array(
    'methods' => 'GET',
    'callback' => 'get_feature',
    'permission_callback' => '__return_true', // TODO: Add auth for production
));
```

**Next.js API Route** (`app/api/feature/route.ts`):
```typescript
const userId = searchParams.get('user_id');
const wpUrl = userId ? `${WORDPRESS_API}/customer/feature?user_id=${userId}` : `${WORDPRESS_API}/customer/feature`;
// Forward cookies, proxy response
```

## Production URLs

- **Frontend:** `https://sakwood.com`
- **WordPress Admin:** `https://sakwood.com/wp-admin` (admin/admin123)
- **WordPress GraphQL:** `https://sakwood.com/graphql`
- **Custom REST API:** `https://sakwood.com/wp-json/sakwood/v1/*`
- **Internal Ports:** Frontend (8007), WordPress (8006), Nginx routes external traffic

## Documentation References

**User Manuals:** `docs/user-manuals/00-index.md`

**Architecture:** `frontend/plans/code-structure-improvement-plan.md`

**Recent Major Changes (2026-02-19):**
- Implemented category language system (single category with TH/EN names)
- Fixed pagination on shop page (12 products per page)
- Removed duplicate products (45 → 40 unique products)
- Fixed GraphQL language field issue by using REST API for categories
- Established language-prefixed URL pattern for client-side fetches
- Added English translations to 6 main categories (Battens, Timber, Cladding, Flooring, Corner, Pole)
- **Fixed category filtering** - Added `category` parameter to products API, renamed category slugs from `pine-*` to clean names
- All products now properly filterable by category on shop page
