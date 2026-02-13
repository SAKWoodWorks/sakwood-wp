# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo for **Sakwood**, a WordPress + Next.js e-commerce site for premium wood products in Thailand.

```
sakwood/
└── sakwood-wp/
    ├── frontend/              # Next.js 16 frontend (React 19)
    │   ├── app/              # Next.js App Router pages
    │   ├── components/       # React components
    │   ├── lib/             # Utilities, services, types
    │   ├── dictionaries/     # Translation files (en.json, th.json)
    │   ├── public/          # Static assets
    │   └── __tests__/       # Test files
    ├── wordpress-plugin/      # WordPress/WooCommerce integration plugin
    │   └── sakwood-integration/ # Custom WordPress plugin (40+ PHP files)
    ├── nginx/               # Production Nginx configuration
    ├── scripts/             # Deployment and utility scripts
    ├── docs/               # Documentation and user manuals
    ├── docker-compose.yml    # Development environment
    └── docker-compose.prod.yml # Production environment
```

### Frontend Architecture (`sakwood-wp/frontend/`)

The frontend is a **Next.js 16 App Router** application with the following architecture:

**Routing & Internationalization:**
- Uses Next.js App Router with dynamic locale routing: `app/[lang]/...`
- Supported locales: `th` (default), `en`
- Internationalization handled via `middleware.ts` using `@formatjs/intl-localematcher` and `negotiator`
- Translation dictionaries in `dictionaries/{en,th}.json`, loaded via `lib/get-dictionary.ts`
- Type-safe translations via `lib/types/dictionary.ts`
- Middleware auto-redirects URLs without locale prefix (e.g., `/products` → `/th/products`)

**Data Layer:**
- WordPress GraphQL API as the primary content backend via `API_CONFIG.endpoint`
- Custom WordPress REST API endpoints for e-commerce operations (`/wp-json/sakwood/v1/*`)
- **No WooCommerce API keys required** - uses custom endpoints that bypass authentication
- GraphQL queries defined in `lib/graphql/queries.ts`
- Service layer in `lib/services/`:
  - `wordpressService.ts` - WordPress GraphQL client wrapper
  - `woocommerceService.ts` - Order creation via `/wp-json/sakwood/v1/create-order`
  - `productService.ts` - Product CRUD operations
  - `searchService.ts` - Product search (Thai-specific: removes spaces for better matching)
  - `menuService.ts` - Navigation menus with fallback
  - `blogService.ts` - Blog content with language support
  - `deliveryService.ts` - Thailand zone-based shipping calculations
  - `promptpayService.ts` - PromptPay QR code generation (EMVCo CRC-16/CCITT-FALSE)
  - `orderService.ts` - Order retrieval by ID
  - `orderStatusService.ts` - Payment status polling with AbortController support
  - `wholesaleService.ts` - Wholesale application management
  - `popupService.ts` - Promotional popup settings
  - `heroSlideService.ts` - Homepage slider content
  - `chatService.ts` - Live chat platform configuration
  - `sliderSettingsService.ts` - Hero slider CRUD operations
  - `customerAddressService.ts` - Customer address CRUD operations
  - `customerOrderService.ts` - Customer order history (in development)

**State Management (in `lib/context/`):**
- `CartContext.tsx` - Client-side cart state with localStorage persistence (`sakwood-cart` key)
- `AuthContext.tsx` - User authentication, roles (retail/wholesale), wholesale status
- `CompareContext.tsx` - Product comparison functionality
- `ChatContext.tsx` - Chat configuration state
- All contexts handle SSR safely with mounted state pattern

**Component Organization:**
```
components/
├── ui/          # Reusable UI components (shadcn/ui: Button, Card, Badge, Skeleton)
├── layout/      # Layout components (Header, Footer, Breadcrumbs, SocialLinks, PromotionalPopup)
├── home/        # Page-specific components for homepage
├── about/       # Page-specific components for about page
├── products/    # Product-related components (ProductCard, ProductCompare, QuickView)
├── cart/        # Cart components (CartItems, CartSummary)
├── checkout/    # Checkout components (PaymentVerification, OrderSuccess)
├── auth/        # Authentication components (Login, Register, AccountDashboard)
├── order/       # Order management components
├── chat/        # Live chat buttons (LINE, Telegram, Messenger, Phone)
└── search/      # Search functionality
```

**TypeScript Configuration:**
- Path alias `@/*` maps to `frontend/` root directory
- Strict mode enabled
- Target: ES2017
- Use `Locale` type from `i18n-config.ts` for type-safe locale handling

**Internationalization (Middleware):**
- `middleware.ts` handles locale detection and redirection using `@formatjs/intl-localematcher` and `negotiator`
- Middleware excludes static assets (images, manifests, API routes) from locale processing
- URLs without locale prefix are redirected to browser-detected locale
- URLs with existing locale prefix are preserved without auto-detection (prevents forced redirects)
- Note: Middleware contains Thai language comments explaining the locale routing logic

**Error Monitoring:**
- Sentry integration for production error tracking
- Configuration in `next.config.ts` and `sentry.client.config.ts`
- Automatic error reporting from frontend and API routes
- Performance monitoring for page loads and API calls

**Security Headers (next.config.ts):**
- HSTS (Strict-Transport-Security) with preload
- XSS Protection with block mode
- Content Security Policy (CSP) for script, style, image, font, and connect sources
- Permissions Policy for camera, microphone, and geolocation (disabled by default)
- Frame Options, X-Content-Type-Options, and Referrer-Policy configured

## Development Commands

**Frontend Development:**
```bash
cd sakwood-wp/frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code (includes TypeScript checking via tsc --noEmit)
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

**Docker Environment:**
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

**WordPress Plugin Development:**
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

**Deployment:**
```bash
# Deploy to production (requires configured droplet)
.\deploy.ps1         # Windows PowerShell
./deploy.sh          # Mac/Linux Bash

# Scripts will:
# - Upload files to DigitalOcean droplet
# - Configure environment variables
# - Set up Nginx configuration
# - Start Docker containers via docker-compose.prod.yml
# - Verify deployment

# Production environment
docker-compose -f docker-compose.prod.yml up -d    # Start production containers
docker-compose -f docker-compose.prod.yml down     # Stop production containers
docker-compose -f docker-compose.prod.yml logs -f  # View production logs
```

**Creating Test Users:**
```bash
# Method 1: Via Docker exec
docker exec -i sak_wp php -r '
require_once("/var/www/html/wp-load.php");
$user_id = wp_create_user("testuser", "test123", "test@sakwood.com");
wp_update_user(array("ID" => $user_id, "role" => "administrator"));
echo "User created: testuser / test123\n";
'

# Method 2: Via PHP script in plugin
# Create create-user.php with admin_init hook, visit /wp-admin/?create_test_user=1
```

**Scripts Directory:**
The `scripts/` directory contains utility scripts for development and deployment:
- `backup-database.sh` - Database backup utility
- `monitor-resources.sh` - System resource monitoring

**Root-level Deployment Scripts:**
- `deploy.sh` / `deploy.ps1` - Production deployment scripts (DigitalOcean)

## Environment Variables

Frontend requires a `.env.local` file in `sakwood-wp/frontend/`:

```env
# WordPress GraphQL API
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:8006/graphql

# WordPress REST API (Custom endpoints - no authentication required)
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8006/wp-json/sakwood/v1
NEXT_PUBLIC_WORDPRESS_REST_URL=http://localhost:8006/wp-json/sakwood/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=SAK WoodWorks
NEXT_PUBLIC_APP_DESCRIPTION=Premium Construction Materials

# Feature Flags
NEXT_PUBLIC_ENABLE_CART=true
NEXT_PUBLIC_ENABLE_REGISTRATION=true
NEXT_PUBLIC_ENABLE_WHOLESALE=true

# Analytics & Monitoring (Optional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
# NEXT_PUBLIC_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0

# Social Media Links
NEXT_PUBLIC_LINE_URL=https://lin.ee/v86CTkq

# Payment Configuration (PromptPay)
NEXT_PUBLIC_PROMPTPAY_MERCHANT_ID=0225559000467
NEXT_PUBLIC_PROMPTPAY_MERCHANT_NAME=SAK WoodWorks
```

**Important:** The application uses custom WordPress endpoints (`/wp-json/sakwood/v1/*`) instead of direct WooCommerce REST API. No API keys are required - orders are created via the custom `create-order` endpoint implemented in `wordpress-plugin/sakwood-integration/`.

See `frontend/.env.local.example` for all available environment variables.

## Key Architecture Patterns

**Product Data Flow:**
1. Products managed in WordPress/WooCommerce admin
2. Next.js fetches via GraphQL queries (product details, images, prices)
3. Orders created via custom WordPress REST endpoint (`/wp-json/sakwood/v1/create-order`)
4. PromptPay payment integration with QR code generation (EMVCo standard CRC-16/CCITT-FALSE)

**Image Handling:**
- Product images served from WordPress backend
- Remote image patterns configured in `next.config.ts` for:
  - `sak_wp:80` (Docker WordPress container)
  - `localhost:8006` (Local development)
  - `images.unsplash.com` (Placeholder images)
- Image URL transformation for mobile compatibility
- **Next.js rewrite rules proxy `/wp-content/` requests to bypass CORS**
  - Critical for mobile devices that cannot access `localhost:8006`
  - Browser requests `/wp-content/uploads/image.jpg` → Next.js proxies to WordPress
  - Disabled Next.js image optimization (`unoptimized: true`) for compatibility
  - Both locale-prefixed (`/:lang(wp-content/...`) and root (`/wp-content/...`) paths are handled
  - Restart dev server after changing `next.config.ts` for rewrite rules to take effect

**Mobile Compatibility:**
- API proxy routes (`/api/products`, `/api/chat`) bypass CORS on mobile devices
- Client-side image URL transformation in cart and product services
- Next.js rewrites proxy WordPress content requests
- Custom WordPress plugin volume-mounted in production (read-only)

**Content Types:**
- Products: Simple products with price, regular price, images, gallery
- Blog Posts: Posts with author, categories, tags, featured images
- Menus: Hierarchical navigation menus from WordPress
- Custom Post Types (via plugin): FAQ, knowledge base, hero slides, video gallery, contact forms

**WordPress Plugin Architecture (40+ PHP files):**
- REST APIs: orders, customers, products, CRM, dealer, chat
- Custom post types: FAQ, knowledge base, hero slides, video gallery, contact forms
- Admin interfaces: chat settings, popup management, PromptPay, slider settings
- Multilingual support: TH/EN for products and blog
- CRM system: customers, interactions, tasks, payments
- Wholesale application workflow
- Product language meta fields
- Menu management
- Password reset functionality
- Password management system (password-reset-*.php)

**Production Architecture:**
- Nginx reverse proxy routing between frontend and backend
- Docker Compose production configuration (`docker-compose.prod.yml`)
  - Frontend container runs on port 8007
  - WordPress container runs on port 8006
  - Resource limits configured for each service
- Custom WordPress plugin volume-mounted read-only in production
- Next.js rewrite rules proxy WordPress content requests
- SSL/TLS termination at Nginx level

## Important Notes

- The frontend runs standalone with `npm run dev`; WordPress backend runs via Docker
- Cart uses localStorage key `sakwood-cart` for persistence
- Prices are stored as strings in WooCommerce format (e.g., "1,200.00฿") and parsed for calculations
- Delivery rates calculated via `deliveryService.ts` using zone-based pricing for 77 Thailand provinces
- Truck type (small/medium/large) is determined automatically based on cart item dimensions and total volume
- Free shipping for orders over 10,000 THB
- All product pages are under `[lang]/products/[slug]` route pattern
- Checkout uses PromptPay QR codes generated via `promptpayService.ts` (supports phone numbers and 13-digit tax IDs)
- Login accepts both username OR email (uses `type="text"` input, not `type="email"`)
- Custom WordPress plugin at `wordpress-plugin/sakwood-integration/` provides:
  - Custom REST endpoints (`/wp-json/sakwood/v1/*`)
  - Product language meta fields (TH/EN products)
  - Blog language support
  - Wholesale application system
  - Chat platform configuration
  - Promotional popup management
  - Hero slider custom post type
  - Product dimensions (length, width, thickness, surface area)
  - Customer address management (CRUD operations stored in user_meta)
  - Customer orders REST API

## Authentication & User Management

**User Roles:**
- `retail` - Standard retail customers
- `wholesale` - B2B customers with special pricing and credit terms
- `dealer` - Dealers/distributors (managed via separate dealer management system)

**Wholesale Status Flow:**
- `pending` → `approved` → `active` (or `rejected`)

**Authentication Pattern:**
- Login accepts both username and email for flexibility
- User session stored in localStorage (`sakwood-user`, `sakwood-token`)
- AuthContext provides `user` object with role, wholesale status, and profile data
- Custom WordPress endpoints handle auth (no JWT required for development)
- For customer-specific APIs, pass `user_id` explicitly in request body/query params to avoid cookie issues

**Customer Portal Features:**
- Account Dashboard with tabs: Overview, Orders, Details, Addresses
- Address Management: Full CRUD (create, read, update, delete) with multiple addresses support
- Profile Management: Edit personal info, change password
- Wholesale Application: Full application flow with business info and tax ID

**API Authentication Pattern:**
When creating custom customer endpoints in WordPress:
```php
// For development: accept user_id from request
$user_id = isset($params['user_id']) ? intval($params['user_id']) : get_current_user_id();

// Store customer data in user_meta (not separate tables)
update_user_meta($user_id, 'customer_addresses', $addresses);
```

**Creating New Customer Endpoints:**

1. **WordPress REST API** (`wordpress-plugin/sakwood-integration/`):
```php
class Sakwood_Custom_Feature_API {
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('sakwood/v1', '/customer/feature', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_feature'),
            'permission_callback' => '__return_true', // TODO: Add proper auth
        ));

        register_rest_route('sakwood/v1', '/customer/feature/(?P<id>[a-zA-Z0-9_]+)', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_feature'),
            'permission_callback' => '__return_true',
        ));
    }

    public function get_feature($request) {
        $params = $request->get_params();
        $user_id = isset($params['user_id']) ? intval($params['user_id']) : get_current_user_id();

        if (!$user_id) {
            return new WP_Error('not_authenticated', 'User not authenticated', array('status' => 401));
        }

        // Fetch and return data
    }
}

// Initialize
new Sakwood_Custom_Feature_API();
```

2. **Next.js API Route** (`frontend/app/api/feature/route.ts`):
```typescript
import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const cookieHeader = request.headers.get('cookie') || '';

    const wpUrl = userId
      ? `${WORDPRESS_API_URL}/sakwood/v1/customer/feature?user_id=${userId}`
      : `${WORDPRESS_API_URL}/sakwood/v1/customer/feature`;

    const response = await fetch(wpUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch feature' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

3. **Frontend Service** (`frontend/lib/services/featureService.ts`):
```typescript
export interface FeatureData {
  id: string;
  user_id: number;
  // ... other fields
}

export async function getFeature(userId?: number): Promise<{ success: boolean; data?: FeatureData; error?: string }> {
  try {
    const url = userId ? `/api/feature?user_id=${userId}` : '/api/feature';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch feature' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch feature' };
  }
}
```

4. **Include in Plugin** (`wordpress-plugin/sakwood-integration/sakwood-integration.php`):
```php
// Load Custom Feature API
require_once SAKWOOD_PLUGIN_DIR . 'custom-feature-api.php';
```

## Code Quality Standards

**When writing code for this project:**

1. **Remove console.log statements** before committing (use console.error only for actual errors)
2. **Add AbortController for polling** - any async polling in useEffect must have cleanup
3. **Use mounted state pattern** for SSR-safe components that use localStorage
4. **Thai language optimization** - Remove spaces from Thai search queries for better matching
5. **Null checks before array operations** - always check if array exists before `.map()`
6. **Type safety** - avoid `any` types, use proper TypeScript interfaces
7. **Proper cleanup in useEffect** - return cleanup function to prevent memory leaks
8. **Responsive design** - use Tailwind breakpoints (sm:, md:, lg:, xl:) for all components

**Common patterns:**
```typescript
// SSR-safe localStorage access
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;

// AbortController for polling
useEffect(() => {
  const abortController = new AbortController();
  // async operation with abortController.signal
  return () => abortController.abort();
}, []);

// Null-safe array mapping
items?.nodes?.map((item) => ...) || []

// API proxy pattern (bypass CORS on mobile)
// Next.js API route (app/api/chat/route.ts):
export async function GET() {
  const response = await fetch('http://localhost:8006/wp-json/sakwood/v1/chat');
  const data = await response.json();
  return NextResponse.json(data);
}

// Image URL transformation for mobile
function transformImageUrl(url: string) {
  if (url.includes('localhost:8006')) {
    const urlObj = new URL(url);
    const match = urlObj.pathname.match(/\/wp-content\/(.*)/);
    if (match) return `/wp-content/${match[1]}`; // Proxied path
  }
  return url;
}
```

## Delivery/Shipping Architecture

The shipping system is designed for Thailand-specific logistics:

**Zone-Based Pricing:**
- Zone 1: Bangkok Metropolitan Area (1-2 days, 5,000-6,500 THB)
- Zone 2: Central Region (2-3 days, 2,000-3,000 THB)
- Zone 3: Northern Region (3-5 days, 3,000-10,000 THB)
- Zone 4: Northeastern Region (3-5 days, 3,500-4,000 THB)
- Zone 5: Southern Region (4-6 days, 4,000-5,000 THB)

**Truck Type Surcharges:**
- Small Truck (6-wheel): Base rate
- Medium Truck (10-wheel): +500 THB (items 3-6m, total >6m, or volume >2m³)
- Large Truck (10-wheel): +1,500 THB (items ≥6m, total >12m, or volume >5m³)

**Price Tier Adjustments:**
Orders under 10,000 THB receive percentage-based surcharges (10-25%).
Orders 10,000+ THB receive free shipping.

## Translation Pattern

To add new translations:
1. Add the key to both `dictionaries/en.json` and `dictionaries/th.json`
2. Update the `Dictionary` interface in `lib/types/dictionary.ts`
3. Access in components using the `dict` prop from `getDictionary(locale)`

## Additional Documentation

- **DEPLOYMENT.md** - Comprehensive DigitalOcean deployment guide with SSL setup, troubleshooting, and maintenance procedures
- **docs/user-manuals/** - Complete series (8 manuals) for blog management, product management, hero slider, popups, wholesale/dealer management, customer portal, and chat settings
- **process.md** - Development session logs with issue tracking and architecture decision records
- **nginx/** - Nginx configuration files for production deployment:
  - `nginx.conf` - Main Nginx configuration
  - `sakwood.conf` - Site-specific configuration with SSL
  - `nginx-ssl.conf` - SSL/TLS configuration

## Production URLs & Endpoints

When deployed to production:
- Frontend: `https://sakwood.com` (or configured domain)
- WordPress Admin: `https://sakwood.com/wp-admin`
- WordPress GraphQL API: `https://sakwood.com/graphql`
- Custom REST API: `https://sakwood.com/wp-json/sakwood/v1/*`
- WordPress Content: Proxied via `/wp-content/*` rewrites

The production architecture uses Nginx as a reverse proxy to route requests between the Next.js frontend and WordPress backend, with SSL/TLS termination at the Nginx level.

**Production Ports:**
- Frontend (Next.js): Port 8007 (internal)
- WordPress: Port 8006 (internal)
- Nginx routes external traffic (80/443) to appropriate services

## Testing Strategy

The project uses a multi-layered testing approach:

**Unit Testing (Vitest):**
- Component testing with React Testing Library
- Service layer testing
- Utility function testing
- Test files located in `__tests__/` directories
- Configuration: `vitest.config.ts`

**E2E Testing (Playwright):**
- Full user flow testing
- Cross-browser testing
- Mobile responsiveness testing
- Configuration: `playwright.config.ts`

**Coverage Reporting:**
- Run `npm run test:coverage` to generate coverage reports
- Coverage thresholds configured in Vitest setup

When adding new features, include tests for:
- Critical user flows (checkout, authentication)
- API service functions
- Complex business logic (shipping calculations, price parsing)
- Component interactions and state management

## Common Development Workflow

**Starting Development:**
1. Start Docker containers: `cd sakwood-wp && docker-compose up -d`
2. Install frontend dependencies: `cd frontend && npm install`
3. Start development server: `npm run dev`
4. Access frontend at `http://localhost:3000`
5. Access WordPress at `http://localhost:8006`

**Making Changes:**
- **Frontend changes**: Edit files in `frontend/`, hot-reload is automatic
- **WordPress plugin changes**: Copy to Docker container or restart:
  ```bash
  docker cp wordpress-plugin/sakwood-integration/file.php sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/
  ```
- **Database changes**: Use phpMyAdmin at `http://localhost:8888`

**Testing Changes:**
1. Run unit tests: `npm test`
2. Run E2E tests: `npm run test:e2e`
3. Check types: `npm run lint` (includes TypeScript checking)
4. Build production bundle: `npm run build`

**Committing Changes:**
1. Remove console.log statements
2. Ensure all tests pass
3. Run linting and fix issues
4. Follow conventional commit format: `feat:`, `fix:`, `refactor:`, etc.

## Troubleshooting Common Issues

**Docker Containers Won't Start:**
- Check port conflicts: Ensure ports 8006 (WordPress) and 8888 (phpMyAdmin) are available
- Rebuild containers: `docker-compose down && docker-compose up -d --build`
- Check logs: `docker-compose logs -f`

**Frontend Can't Connect to WordPress:**
- Verify WordPress is running: `docker-compose ps`
- Check API URL in `.env.local` matches Docker container
- Try accessing GraphQL directly: `http://localhost:8006/graphql`

**Plugin Changes Not Appearing:**
- Restart WordPress container: `docker-compose restart sak_wp`
- Or copy plugin file directly: `docker cp wordpress-plugin/sakwood-integration/file.php sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/`

**Build Errors:**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

**Translation Issues:**
- Verify key exists in both `dictionaries/en.json` and `dictionaries/th.json`
- Check `Dictionary` interface in `lib/types/dictionary.ts` is updated
- Restart dev server to reload dictionaries

**Images Broken on Mobile:**
- Verify rewrite rules in `next.config.ts` are active
- Check that images are being requested through Next.js proxy
- Ensure `unoptimized: true` is set in next.config.ts
- Restart dev server after changing configuration
