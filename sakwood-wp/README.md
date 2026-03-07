# 🌲 SAK WoodWorks

<div align="center">

**Premium Wood Products E-Commerce Platform**

A modern WordPress + Next.js headless e-commerce solution for premium wood products in Thailand.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![WordPress](https://img.shields.io/badge/WordPress-6.4+-blue?style=flat-square&logo=wordpress)](https://wordpress.org/)

[Features](#-key-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Configuration](#-configuration)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [Documentation](#-documentation)

---

## 🎯 Overview

**SAK WoodWorks** is a bilingual (Thai/English) e-commerce platform built with a headless architecture. The system combines WordPress/WooCommerce for content and product management with Next.js 16 for a modern, performant frontend.

### What Makes It Different

- 🌏 **Bilingual**: Native Thai/English support with locale routing
- 💳 **PromptPay Integration**: Thai QR code payment system
- 🚚 **Smart Shipping**: Zone-based shipping calculations for 77 Thailand provinces
- 👥 **Wholesale System**: B2B features with credit terms
- 🎨 **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1 (App Router)
- **UI Library**: React 19.2
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **State**: React Context (Cart, Auth, Compare, Chat)
- **Testing**: Vitest + Playwright + Testing Library
- **Error Tracking**: Sentry

### Backend
- **CMS**: WordPress 6.4+
- **E-commerce**: WooCommerce
- **API**: WPGraphQL + Custom REST API (`/wp-json/sakwood/v1/*`)
- **Database**: MySQL 5.7 (dev), MySQL 8.0 (prod)
- **Container**: Docker & Docker Compose

### Development Tools
- **Linting**: ESLint
- **Testing**: Vitest, Playwright
- **Monitoring**: Sentry
- **Version Control**: Git

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** - For WordPress and MySQL containers
- **Node.js 18+** - For Next.js frontend
- **npm** or **yarn** - Package manager
- **Git** - Version control

### Check Your Setup

```bash
docker --version      # Should be 20.10+
node --version        # Should be 18.0.0+
npm --version         # Should be 9.0.0+
git --version         # Should be 2.0+
```

---

## 🚀 Quick Start

Get up and running in 5 minutes:

### 1. Clone the Repository

```bash
git clone https://github.com/SAKWoodWorks/sakwood-wp.git
cd sakwood-wp
```

### 2. Start Docker Environment

This starts WordPress, MySQL, and phpMyAdmin:

```bash
docker-compose up -d
```

Wait for services to initialize (approximately 30-60 seconds).

### 3. Configure Environment Variables

Create `.env.local` in the `frontend/` directory:

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:8006/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8006/wp-json/sakwood/v1
NEXT_PUBLIC_APP_NAME=SAK WoodWorks
NEXT_PUBLIC_APP_DESCRIPTION=Premium Construction Materials
NEXT_PUBLIC_ENABLE_CART=true
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **WordPress Admin**: http://localhost:8006/wp-admin
- **WordPress Site**: http://localhost:8006
- **phpMyAdmin**: http://localhost:8888 (root/sakWW099)

---

## 📁 Project Structure

```
sakwood-wp/
├── frontend/                        # Next.js 16 frontend
│   ├── app/                        # App Router pages
│   │   └── [lang]/                 # Locale-based routing
│   │       ├── (shop)/             # Shop pages
│   │       ├── products/           # Product pages
│   │       ├── checkout/           # Checkout flow
│   │       └── account/            # Customer portal
│   ├── components/                 # React components
│   │   ├── ui/                     # Reusable UI (shadcn/ui)
│   │   ├── layout/                 # Layout components
│   │   ├── products/               # Product-specific
│   │   ├── cart/                   # Shopping cart
│   │   └── auth/                   # Authentication
│   ├── lib/                        # Utilities & services
│   │   ├── graphql/                # GraphQL queries
│   │   ├── services/               # API services
│   │   └── contexts/               # React contexts
│   ├── dictionaries/               # i18n translations
│   ├── public/                     # Static assets
│   └── package.json
├── wordpress-plugin/                # Custom WordPress plugin
│   └── sakwood-integration/        # Plugin files
│       ├── sakwood-integration.php # Main plugin file
│       ├── includes/               # Plugin functionality
│       └── templates/              # Custom templates
├── docker-compose.yml              # Docker services
├── CLAUDE.md                       # Comprehensive project guide
├── GIT_WORKFLOW.md                 # Git workflow guide
└── README.md                       # This file
```

---

## 💻 Development

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Docker Environment

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker logs -f sak_wp

# Restart services
docker-compose restart

# Access WordPress container
docker exec -it sak_wp bash
```

### WordPress Plugin Development

After editing plugin files:

```bash
# Copy to container
docker cp wordpress-plugin/sakwood-integration/updated-file.php \
  sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/

# Or restart container (if using volume mount)
docker-compose restart
```

### Testing

```bash
cd frontend

# Unit tests (Vitest)
npm run test

# Unit tests with UI
npm run test:ui

# Test coverage
npm run test:coverage

# E2E tests (Playwright)
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

---

## ⚙️ Configuration

### Environment Variables

#### Frontend (`.env.local`)

```env
# WordPress GraphQL API
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:8006/graphql

# WordPress REST API (Custom endpoints)
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8006/wp-json/sakwood/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=SAK WoodWorks
NEXT_PUBLIC_APP_DESCRIPTION=Premium Construction Materials

# Feature Flags
NEXT_PUBLIC_ENABLE_CART=true
```

#### Docker Services

- **WordPress**: `localhost:8006`
- **MySQL**: `localhost:3306`
- **phpMyAdmin**: `localhost:8888`
- **WordPress Container**: `sak_wp`
- **MySQL Container**: `sak_db`

### WordPress Configuration

1. **Initial Setup**: Visit http://localhost:8006/wp-admin
2. **Default Admin**: Created during first run
3. **GraphQL API**: http://localhost:8006/graphql
4. **Custom REST API**: http://localhost:8006/wp-json/sakwood/v1

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Next.js   │────────▶│  WordPress   │◀────────│   WooCommerce│
│  Frontend   │ GraphQL │   Backend    │ REST    │             │
└─────────────┘         └──────────────┘         └─────────────┘
       │                       │
       │                       ▼
       │               ┌──────────────┐
       │               │     MySQL    │
       └──────────────▶│   Database   │
         Custom REST   └──────────────┘
            API
```

### Data Flow

1. **Product Management**: WordPress/WooCommerce admin
2. **Data Fetching**: Next.js via GraphQL + custom REST API
3. **Order Creation**: Custom endpoint `/wp-json/sakwood/v1/create-order`
4. **Authentication**: Custom endpoints with localStorage persistence

### API Architecture

- **GraphQL**: Product queries, blog content, menus
- **REST API**: Order creation, customer operations, custom endpoints
- **No Authentication Required**: Custom endpoints bypass WooCommerce REST API

### State Management

- **CartContext**: Shopping cart with localStorage
- **AuthContext**: User authentication and roles
- **SSR-Safe**: Mounted state pattern for client-side only code

---

## ✨ Key Features

### E-commerce
- ✅ Bilingual product catalog (Thai/English)
- ✅ Bilingual shopping cart with language switching
- ✅ Shopping cart with localStorage persistence
- ✅ PromptPay QR code payment (EMVCo CRC-16)
- ✅ Thailand zone-based shipping (77 provinces)
- ✅ Free shipping threshold (10,000+ THB)
- ✅ Automatic truck type selection based on dimensions
- ✅ LINE messaging integration for orders

### Dealer System
- ✅ **NEW:** Interactive dealer locator with Google Maps
- ✅ Dealer tiers (Silver, Gold, Platinum)
- ✅ Territory-based dealer assignment
- ✅ Dealer application workflow
- ✅ Dealer dashboard with order management

### User Management

- ✅ Retail & wholesale customer roles
- ✅ Wholesale application workflow
- ✅ Customer portal with order history
- ✅ Address book management
- ✅ Profile editing
- ✅ Admin access restricted to @sakww.com emails

### Content Management

- ✅ Dynamic navigation menus
- ✅ Blog posts with categories
- ✅ Hero slider for homepage
- ✅ FAQ and knowledge base
- ✅ Video gallery

### SEO & Performance

- ✅ **NEW:** Comprehensive structured data (Product, Organization, Breadcrumb, FAQ, Article, etc.)
- ✅ **NEW:** Dealer locator JSON-LD for SEO
- ✅ **NEW:** Dynamic sitemap.xml with product listings
- ✅ **NEW:** Robots.txt with proper directives
- ✅ Bilingual OpenGraph and Twitter Cards
- ✅ Hreflang tags for multilingual SEO
- ✅ Server-side rendering (SSR)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Image optimization (disabled for WordPress proxy)
- ✅ Security headers (HSTS, CSP, XSS Protection)

### Accessibility

- ✅ **NEW:** Focus trap for modal keyboard navigation
- ✅ **NEW:** ARIA attributes (aria-modal, aria-labelledby, aria-label)
- ✅ **NEW:** Toast notifications with screen reader support
- ✅ Semantic HTML throughout
- ✅ SkipLink for keyboard navigation
- ✅ Proper heading hierarchy

### Security

- ✅ **NEW:** CSRF protection for API endpoints
- ✅ **NEW:** Input sanitization for WordPress plugin
- ✅ **NEW:** Google Maps API key security best practices
- ✅ WordPress admin restricted to @sakww.com domain
- ✅ Content Security Policy (CSP) headers
- ✅ HTTP Strict Transport Security (HSTS)

### Technical

- ✅ TypeScript strict mode (100% coverage)
- ✅ Responsive design (mobile-first)
- ✅ Error tracking with Sentry
- ✅ Dual-service pattern (server + client services)
- ✅ Language-prefixed routing (/th/, /en/)
- ✅ Test coverage: 94.6% (35/37 tests passing)

### User Management
- ✅ Retail & wholesale customer roles
- ✅ Wholesale application workflow
- ✅ Customer portal with order history
- ✅ Address book management
- ✅ Profile editing

### Content Management
- ✅ Dynamic navigation menus
- ✅ Blog posts with categories
- ✅ Hero slider for homepage
- ✅ FAQ and knowledge base
- ✅ Video gallery

### Technical
- ✅ Server-side rendering (SSR)
- ✅ Image optimization
- ✅ TypeScript strict mode
- ✅ Responsive design
- ✅ Error tracking (Sentry)

---

## 🚢 Deployment

### Quick Deployment (DigitalOcean)

**Automated deployment scripts are provided:**

```bash
# Windows PowerShell
.\deploy.ps1

# Mac/Linux
./deploy.sh
```

**Before running:**
1. Update droplet IP in deployment script
2. Ensure SSH access to your server
3. Verify `.env.production` is configured

The script handles:
- SSH connection to droplet
- Git pull from GitHub
- Docker image rebuild
- Container restart
- Deployment verification

### Production Build

```bash
cd frontend

# Build production bundle
npm run build

# Test production build locally
npm run start
```

### Environment Setup

**Production Environment Variables (`.env.production`):**

```env
# Production URLs
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://wp.sakww.com/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.sakww.com/wp-json/sakwood/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=SAK WoodWorks
NEXT_PUBLIC_APP_DESCRIPTION=Premium Wood Products

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn-here
```

**Docker Production (`docker-compose.prod.yml`):**

```yaml
frontend:
  environment:
    # Server-side: Docker internal URLs
    - WORDPRESS_API_URL=http://sak_wp:80/wp-json
    - WORDPRESS_GRAPHQL_URL=http://sak_wp:80/graphql
    # Client-side: External URLs (full paths)
    - NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://wp.sakww.com/graphql
    - NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.sakww.com/wp-json/sakwood/v1
```

### Deployment Checklist

- [ ] Update environment variables for production
- [ ] Set WordPress GraphQL URL to production
- [ ] Configure WooCommerce payment gateways
- [ ] Set up shipping zones and rates
- [ ] Test payment flow end-to-end
- [ ] Configure DNS and SSL certificates
- [ ] Set up monitoring (Sentry)
- [ ] Configure database backups
- [ ] Verify Docker networking (containers on same network)
- [ ] Test mobile image loading (proxy working)

### Production URLs

- **Frontend**: https://sakwood.com
- **WordPress Admin**: https://wp.sakww.com/wp-admin
- **GraphQL API**: https://wp.sakww.com/graphql
- **REST API**: https://wp.sakww.com/wp-json/sakwood/v1

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Code Standards

- **TypeScript**: Strict mode enabled, avoid `any` types
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **Formatting**: Follow existing code patterns

### Commit Messages

Follow the conventional commit format:

```
<type>(<scope>): <subject>

feat(component): add product comparison feature
fix(api): resolve cart CORS issue
docs(readme): update deployment instructions
```

See [GIT_WORKFLOW.md](GIT_WORKFLOW.md) for detailed guidelines.

### Development Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and commit
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

3. Push and create PR
   ```bash
   git push origin feature/your-feature-name
   ```

4. Request review and address feedback

5. Merge after approval

### Testing

- Write unit tests for new utilities and services
- Add E2E tests for user flows
- Ensure all tests pass before submitting PR
- Test on multiple screen sizes (mobile, tablet, desktop)

---

## 🔧 Troubleshooting

### Docker Issues

**Problem: Containers won't start**
```bash
# Stop and remove all containers
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

**Problem: Can't access WordPress**
- Check containers are running: `docker ps`
- Verify port 8006 is not in use
- Check logs: `docker logs sak_wp`

### Frontend Issues

**Problem: Can't connect to WordPress API**
- Verify Docker containers are running
- Check `.env.local` has correct WordPress URL
- Ensure GraphQL plugin is active in WordPress

**Problem: Build errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### WordPress Issues

**Problem: GraphQL returns errors**
- Verify WPGraphQL plugin is active
- Check WordPress permalink settings
- Clear WordPress cache

**Problem: Custom endpoints not working**
- Ensure custom plugin is activated
- Check WordPress error logs: `docker logs sak_wp`
- Verify REST API namespace is registered

---

## 📚 Recent Updates

### March 2025

**Major Features:**

- ✨ **Dealer Locator System**
  - Interactive Google Maps integration
  - Real-time dealer search by province
  - GPS-based location finding
  - SEO-optimized with JSON-LD structured data
  - Fully accessible with keyboard navigation and screen readers

- 🌐 **Bilingual Cart Enhancement**
  - 77 Thai province translations
  - Province name normalization (Thai ↔ English)
  - Localized LINE messaging
  - Bilingual product display names

- 🔒 **Security Improvements**
  - CSRF protection for dealer API
  - Input sanitization in WordPress plugin
  - Google Maps API key security documentation
  - Admin access restricted to @sakww.com domain

- ♿ **Accessibility Enhancements**
  - Focus trap for modal keyboard navigation
  - Comprehensive ARIA attributes
  - Toast notification system (replaced alerts)
  - Screen reader support throughout

- 📈 **SEO Optimization**
  - Comprehensive structured data (7+ schema types)
  - Dealer locator JSON-LD for search engines
  - Dynamic sitemap with all products
  - SEO score: 92/100

**Bug Fixes:**

- 🐛 Fixed TypeScript error in useFocusTrap hook
- 🐛 Corrected province dropdown to use English names
- 🐛 Fixed admin login restriction to check email domain first
- 🐛 Corrected popup API URL path construction

**Documentation:**

- 📚 Enhanced CLAUDE.md with deployment guides
- 📚 Added production debugging learnings
- 📚 Google Maps security best practices
- 📚 Performance and security sections

**Test Coverage:**

- ✅ 94.6% pass rate (35/37 tests)
- ✅ TypeScript strict mode (100% coverage)
- ✅ Build compiles successfully

---

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Comprehensive project guide with architecture patterns
- **[GIT_WORKFLOW.md](GIT_WORKFLOW.md)** - Git workflow and commit conventions
- **[Next.js Documentation](https://nextjs.org/docs)** - Next.js framework guide
- **[WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)** - WordPress API reference

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

For support and questions:

- **GitHub Issues**: https://github.com/SAKWoodWorks/sakwood-wp/issues
- **Documentation**: See [CLAUDE.md](CLAUDE.md) for detailed guides

---

<div align="center">

**Built with ❤️ for SAK WoodWorks**

[⬆ Back to Top](#-sak-woodworks)

</div>
