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
- `feature-orchestrator` - Manages complete feature lifecycle from planning through implementation (use when adding new features like product comparison, wishlist, promotional banners)
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

# Run individual test file
npm test -- cart.test.ts
```

### Docker Environment (Development)
```bash
cd sakwood-wp

# Start WordPress, MySQL, and phpMyAdmin
docker-compose up -d

# Access services
# WordPress Admin: http://localhost:8006/wp-admin
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
```

### WordPress Plugin Development
```bash
# After editing plugin files, copy to Docker container
docker cp wordpress-plugin/sakwood-integration/custom-file.php sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/

# Or restart the container to mount changes
docker-compose restart

# Check WordPress logs
docker logs sak_wp

# Access WordPress container directly
docker exec -it sak_wp bash
```

### Production Deployment (DigitalOcean)
```bash
cd sakwood-wp

# Deploy to production
.\deploy.ps1         # Windows PowerShell
./deploy.sh          # Mac/Linux Bash

# Or manually:
cd frontend && npm run build
# Then copy .next/ folder to production server

# Production environment
docker-compose -f docker-compose.prod.yml up -d    # Start production containers
docker-compose -f docker-compose.prod.yml down     # Stop production containers
docker-compose -f docker-compose.prod.yml logs -f  # View production logs
```

## Core Architecture Patterns

### Request Flow & Data Layer

**Server-Side Rendering (SSR):**
- Pages use `async function` components with `await params`
- Initial data fetched server-side via WordPress GraphQL/REST APIs
- Client components receive initial data as props, then hydrate
- Revalidation: 180 seconds (3 minutes) for dynamic content

**Client-Side Updates:**
- Interactive features use `useEffect` to refresh data after user actions
- Services in `lib/services/*Service.ts` handle API calls
- State managed via React Context (Cart, Auth, Compare, Chat)

**Mobile Compatibility Strategy:**
- WordPress runs on `localhost:8006` (dev) or port 8006 (prod)
- Mobile browsers cannot access `localhost:8006` directly
- **Solution 1:** Next.js rewrite rules (`/wp-content/*` → WordPress server-side proxy)
- **Solution 2:** API proxy routes (`/api/*` → WordPress)
- **Solution 3:** Client-side image URL transformation in services

### Dual-Service Pattern

Most features have two service files:
- `lib/services/featureService.ts` - Server-side (imported by Server Components/API routes)
- `lib/services/featureServiceClient.ts` - Client-side (calls `/api/feature` proxy route)

**Why:** Direct WordPress API calls fail on mobile due to CORS. Proxy routes bypass this.

## Component & Page Structure

**App Router Pattern:**
```
app/[lang]/              # Dynamic locale routing (th, en)
├── (page)/              # Homepage group
├── shop/
│   ├── page.tsx        # Server Component: fetches initial data
│   └── ShopPage.tsx    # Client Component: handles filters, pagination
├── products/[slug]/    # Dynamic product pages
├── blog/[slug]/        # Blog post pages
└── account/            # Customer portal (protected routes)
```

**Component Organization:**
- `components/ui/` - shadcn/ui primitives (Button, Card, Badge, Skeleton)
- `components/layout/` - Header, Footer, Breadcrumbs, SocialLinks
- `components/{feature}/` - Feature-specific components (products, cart, auth, checkout)

**Typical Data Flow (Shop Page Example):**
1. User visits `/en/shop`
2. Server Component (`page.tsx`) fetches products via `getProducts(lang, category, sortBy)`
3. Data passed to Client Component (`ShopPage.tsx`) as `initialProducts` prop
4. Client-side: User changes filter → `useEffect` triggers `getProductsClient()`
5. State updates, component re-renders with new data

## Key Services Reference

**WordPress Services** (`lib/services/`):
- `wordpressService.ts` - GraphQL client wrapper
- `productService.ts` / `productServiceClient.ts` - Product CRUD operations
- `searchService.ts` - Thai-optimized search (removes spaces for matching)
- `menuService.ts` - Navigation menus with fallback
- `blogService.ts` - Blog content with language support
- `deliveryService.ts` - Thailand zone-based shipping (77 provinces)
- `promptpayService.ts` - PromptPay QR code generation (EMVCo standard)
- `orderService.ts` - Order retrieval by ID
- `orderStatusService.ts` - Payment status polling with AbortController
- `wholesaleService.ts` - Wholesale application flow
- `customerAddressService.ts` - Customer address CRUD (stored in user_meta)
- `customerOrderService.ts` - Customer order history
- `popupService.ts` / `heroSlideService.ts` / `chatService.ts` - Content management
- `sliderSettingsService.ts` - Hero slider CRUD

**GraphQL Queries** (`lib/graphql/queries.ts`):
- `GET_PRODUCTS_QUERY` - Product listing
- `GET_PRODUCT_QUERY` - Single product details
- `GET_PRODUCT_CATEGORIES_QUERY` - Categories
- `GET_HERO_SLIDES_QUERY` - Homepage slider

## State Management (React Context)

**Available Contexts:**
- `CartContext` - Shopping cart state, localStorage key: `sakwood-cart`
- `AuthContext` - User authentication, roles (retail/wholesale), wholesale status
- `CompareContext` - Product comparison functionality
- `ChatContext` - Live chat platform configuration

**All contexts use SSR-safe mounted state pattern:**
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;  // Prevents hydration mismatches
```

## Internationalization (i18n)

**Configuration:**
- Supported locales: `th` (default), `en`
- Middleware uses `@formatjs/intl-localematcher` + `negotiator`
- Auto-redirects URLs without locale prefix (`/products` → `/th/products`)
- Type-safe translations via `lib/types/dictionary.ts`

**Accessing translations in Server Components:**
```typescript
import { getDictionary } from '@/lib/get-dictionary';

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <h1>{dict.home.title}</h1>;
}
```

## WordPress Plugin Architecture

**Custom REST API** (`/wp-json/sakwood/v1/*`):
- `GET /products` - Product listing with language/category filter
- `GET /products/{slug}` - Single product details
- `POST /create-order` - Create new order
- `GET /menu` - Navigation menu by language
- `GET /posts` - Blog posts
- `GET /popup` - Promotional popup settings
- `POST /wholesale/apply` - Wholesale application
- `GET /customer/addresses` - Customer address CRUD
- `GET /customer/orders` - Customer order history

**Custom Post Types:**
- Hero Slides - Homepage slider content
- FAQ - Frequently asked questions
- Knowledge Base - Technical articles
- Video Gallery - Product videos

**Critical: Menu Locations**
- Create separate menus for TH and EN languages
- Locations: `primary-en`, `primary-th`, `PRIMARY_EN`, `PRIMARY_TH`
- WordPress Admin: Appearance → Menus → Manage Locations

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

**Essential Code Patterns:**

```typescript
// SSR-Safe localStorage Access
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;

// AbortController for Polling (REQUIRED for all polling)
useEffect(() => {
  const abortController = new AbortController();
  async function pollStatus() {
    const response = await fetch(url, { signal: abortController.signal });
    // Update state...
  }
  pollStatus();
  return () => abortController.abort();
}, [orderId]);

// Null-Safe Array Operations
items?.nodes?.map((item) => ...) ?? []
```

## Testing Strategy

**Unit Testing (Vest):**
- Component testing with React Testing Library
- Service layer testing
- Test files in `__tests__/` directories
- Config: `vitest.config.ts`

**E2E Testing (Playwright):**
- Full user flow testing
- Cross-browser: Chromium, Firefox, WebKit
- Mobile responsiveness
- Config: `playwright.config.ts`

**Commands:**
```bash
cd frontend
npm test              # Unit tests
npm run test:ui       # Vitest UI
npm run test:e2e      # Playwright tests
npm test -- cart.test.ts  # Single test file
```

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
docker-compose restart sak_wp                       # Restart WordPress
docker cp wordpress-plugin/sakwood-integration/file.php sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/
```

**Build Errors:**
```bash
cd frontend && rm -rf .next                         # Clear cache
rm -rf node_modules && npm install                  # Reinstall deps
npm run lint                                       # Check TypeScript
```

**Images Broken on Mobile:** Verify `next.config.ts` has rewrite rules for `/wp-content/*` and `/wp-json/*`

## Deployment (DigitalOcean)

**Quick Deploy:**
```bash
git add . && git commit -m "feat: description" && git push
.\deploy.ps1        # Windows PowerShell
./deploy.sh         # Mac/Linux
```

**Full Deploy with Build:**
```bash
cd frontend && npm run build && cd ..
.\deploy.ps1
```

**Production Server:**
```bash
ssh root@wp.sakww.com
cd /root/sakwood-wp && git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build frontend
docker-compose -f docker-compose.prod.yml logs -f frontend
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
- **WordPress Admin:** `https://sakwood.com/wp-admin`
- **WordPress GraphQL:** `https://sakwood.com/graphql`
- **Custom REST API:** `https://sakwood.com/wp-json/sakwood/v1/*`
- **Internal Ports:** Frontend (8007), WordPress (8006), Nginx routes external traffic

## Documentation References

**User Manuals:** `docs/user-manuals/00-index.md` (Blog, Products, Hero Slider, Popup, Wholesale, Dealer, Customer Portal, Chat Settings)

**Architecture:** `frontend/plans/code-structure-improvement-plan.md`, `docs/SEO-UX-AEO-Implementation-Summary.md`
