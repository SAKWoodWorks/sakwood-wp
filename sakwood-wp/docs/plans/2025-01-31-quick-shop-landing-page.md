# Quick Shop Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a conversion-focused landing page at `/[lang]/quick-shop` that drives product sales with minimal distractions.

**Architecture:** Server Components with progressive rendering. Single-page route with hero section, product grid, and conversion CTAs. Data fetched from WordPress GraphQL API.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, WordPress GraphQL

---

## Task 1: Create Landing Page Route Structure

**Files:**
- Create: `frontend/app/[lang]/quick-shop/page.tsx`

**Step 1: Create the page component with basic structure**

```typescript
import { Suspense } from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { QuickShopHero } from '@/components/quick-shop/QuickShopHero';
import { QuickShopProducts } from '@/components/quick-shop/QuickShopProducts';
import { QuickShopTrust } from '@/components/quick-shop/QuickShopTrust';
import { QuickShopBenefits } from '@/components/quick-shop/QuickShopBenefits';
import { QuickShopCTA } from '@/components/quick-shop/QuickShopCTA';

export const revalidate = 60; // ISR every 60 seconds

interface QuickShopPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function QuickShopPage({ params }: QuickShopPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <main className="min-h-screen bg-white">
      <QuickShopHero lang={lang as Locale} dictionary={dictionary} />
      <QuickShopTrust lang={lang as Locale} dictionary={dictionary} />
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
        <QuickShopProducts lang={lang as Locale} dictionary={dictionary} />
      </Suspense>
      <QuickShopBenefits lang={lang as Locale} dictionary={dictionary} />
      <QuickShopCTA lang={lang as Locale} dictionary={dictionary} />
    </main>
  );
}

export async function generateMetadata({ params }: QuickShopPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as any);

  return {
    title: lang === 'th' ? 'ช้อปปิ้ง - SAK WoodWorks' : 'Quick Shop - SAK WoodWorks',
    description: lang === 'th'
      ? 'สั่งซื้อไม้คุณภาพสูงออนไลน์ จัดส่งทั่วประเทศไทย'
      : 'Order premium wood online with fast delivery across Thailand',
  };
}
```

**Step 2: Verify page is accessible**

Run: `cd frontend && npm run dev`
Visit: `http://localhost:3000/th/quick-shop`
Expected: 404 error (components don't exist yet)

**Step 3: Commit**

```bash
git add frontend/app/[lang]/quick-shop/page.tsx
git commit -m "feat: create quick-shop landing page route"
```

---

## Task 2: Create Hero Section Component

**Files:**
- Create: `frontend/components/quick-shop/QuickShopHero.tsx`

**Step 1: Create hero component**

```typescript
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n-config';

interface QuickShopHeroProps {
  lang: Locale;
  dictionary: {
    quick_shop?: {
      hero_title?: string;
      hero_subtitle?: string;
      hero_cta_primary?: string;
      hero_cta_secondary?: string;
    };
  };
}

export function QuickShopHero({ lang, dictionary }: QuickShopHeroProps) {
  const dict = dictionary.quick_shop || {};

  const title = dict.hero_title || (lang === 'th'
    ? 'ไม้คุณภาพสูงสำหรับโครงการของคุณ'
    : 'Premium Wood for Your Projects');

  const subtitle = dict.hero_subtitle || (lang === 'th'
    ? 'จัดส่งทั่วประเทศไทย • ราคาส่ง'
    : 'Fast delivery across Thailand • Wholesale prices');

  const ctaPrimary = dict.hero_cta_primary || (lang === 'th' ? 'ช้อปเลย' : 'Shop Now');
  const ctaSecondary = dict.hero_cta_secondary || (lang === 'th' ? 'ขอราคา' : 'Get Quote');

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1544571901-2656599c365c?w=1920&q=80"
          alt="Wood background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/90" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-10 font-light">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#products"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
            >
              {ctaPrimary} →
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold text-lg rounded-lg transition-all duration-300 text-center"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'th' ? '500+ โครงการสำเร็จ' : '500+ Projects Completed'}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'th' ? 'จัดส่งทั่ว 77 จังหวัด' : '77 Provinces Delivered'}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'th' ? 'ราคาส่งตั้งแต่ 1 แผ่น' : 'Wholesale from 1 sheet'}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
```

**Step 2: Test hero renders**

Run: `cd frontend && npm run dev`
Visit: `http://localhost:3000/th/quick-shop`
Expected: Hero section visible with title, CTAs, trust indicators

**Step 3: Commit**

```bash
git add frontend/components/quick-shop/QuickShopHero.tsx
git commit -m "feat: add quick-shop hero section"
```

---

## Task 3: Create Trust Banner Component

**Files:**
- Create: `frontend/components/quick-shop/QuickShopTrust.tsx`

**Step 1: Create trust banner component**

```typescript
import type { Locale } from '@/i18n-config';

interface QuickShopTrustProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

export function QuickShopTrust({ lang }: QuickShopTrustProps) {
  const trusts = [
    {
      icon: '✓',
      text: lang === 'th' ? '500+ โครงการสำเร็จ' : '500+ Projects Completed',
    },
    {
      icon: '✓',
      text: lang === 'th' ? 'จัดส่งทั่ว 77 จังหวัด' : '77 Provinces Delivered',
    },
    {
      icon: '✓',
      text: lang === 'th' ? 'ราคาส่งตั้งแต่ 1 แผ่น' : 'Wholesale Pricing',
    },
  ];

  return (
    <section className="bg-blue-600 text-white py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 text-center">
          {trusts.map((trust, index) => (
            <div key={index} className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-green-300 text-xl">{trust.icon}</span>
              <span>{trust.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Test trust banner renders**

Visit: `http://localhost:3000/th/quick-shop`
Expected: Blue banner with 3 trust indicators below hero

**Step 3: Commit**

```bash
git add frontend/components/quick-shop/QuickShopTrust.tsx
git commit -m "feat: add quick-shop trust banner"
```

---

## Task 4: Create Products Section Component

**Files:**
- Create: `frontend/components/quick-shop/QuickShopProducts.tsx`
- Modify: `frontend/lib/services/productService.ts` (add getFeaturedProducts function)

**Step 1: Add getFeaturedProducts to productService**

```typescript
// Add to frontend/lib/services/productService.ts

import { cache } from 'react';

// Existing getProducts function...

export const getFeaturedProducts = cache(async (lang: Locale, limit: number = 6) => {
  try {
    const query = `
      query GetFeaturedProducts($lang: LanguageCodeEnum!, $limit: Int) {
        products(where: {
          language: $lang,
          orderby: { field: POPULARITY, order: DESC }
        }, first: $limit) {
          nodes {
            id
            databaseId
            name
            slug
            price
            regularPrice
            shortDescription(format: RENDERED)
            image {
              sourceUrl
              altText
            }
            ... on SimpleProduct {
              price
              regularPrice
            }
          }
        }
      }
    `;

    const response = await fetch(API_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { lang: lang.toUpperCase(), limit }
      }),
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }

    const data = await response.json();
    return data.data?.products?.nodes || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
});
```

**Step 2: Create QuickShopProducts component**

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/services/productService';
import type { Locale } from '@/i18n-config';
import { ProductCard } from '@/components/products/ProductCard';

interface QuickShopProductsProps {
  lang: Locale;
  dictionary: {
    quick_shop?: {
      products_title?: string;
      products_subtitle?: string;
      view_all?: string;
    };
    product?: {
      add_to_cart?: string;
      request_quote?: string;
    };
  };
}

export async function QuickShopProducts({ lang, dictionary }: QuickShopProductsProps) {
  const products = await getFeaturedProducts(lang, 6);
  const dict = dictionary.quick_shop || {};

  const title = dict.products_title || (lang === 'th' ? 'สินค้าขายดี' : 'Best Sellers');
  const subtitle = dict.products_subtitle || (lang === 'th'
    ? 'ไม้คุณภาพสูงที่ลูกค้าชื่นชอบ'
    : 'Premium wood products trusted by our customers');
  const viewAll = dict.view_all || (lang === 'th' ? 'ดูทั้งหมด' : 'View All');

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-900 text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
            {lang === 'th' ? 'แนะนำ' : 'Featured'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {products.map((product: any, index: number) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <Link href={`/${lang}/products/${product.slug}`}>
                      <Image
                        src={product.image?.sourceUrl || '/placeholder.jpg'}
                        alt={product.image?.altText || product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <Link href={`/${lang}/products/${product.slug}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p
                      className="text-slate-600 text-sm mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                    />

                    {/* Price */}
                    <div className="mb-4">
                      {product.regularPrice && product.regularPrice !== product.price && (
                        <span className="text-slate-400 line-through text-sm mr-2">
                          {product.regularPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-blue-600">
                        {product.price}
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/${lang}/products/${product.slug}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                      >
                        {lang === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                href={`/${lang}/shop`}
                className="inline-block px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {viewAll} →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">
              {lang === 'th' ? 'ไม่พบสินค้า' : 'No products found'}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 3: Test products section loads**

Visit: `http://localhost:3000/th/quick-shop`
Expected: Products grid with 6 products, each with image, price, and "View Details" button

**Step 4: Commit**

```bash
git add frontend/components/quick-shop/QuickShopProducts.tsx frontend/lib/services/productService.ts
git commit -m "feat: add quick-shop products section with featured products"
```

---

## Task 5: Create Benefits Section Component

**Files:**
- Create: `frontend/components/quick-shop/QuickShopBenefits.tsx`

**Step 1: Create benefits component**

```typescript
import { Shield, Truck, DollarSign, Award } from 'lucide-react';
import type { Locale } from '@/i18n-config';

interface QuickShopBenefitsProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

export function QuickShopBenefits({ lang }: QuickShopBenefitsProps) {
  const benefits = [
    {
      icon: Shield,
      title: lang === 'th' ? 'รับประกันคุณภาพ' : 'Quality Guaranteed',
      description: lang === 'th'
        ? 'ไม้เกรดพรีเมียม ผ่านการคัดสรรมาอย่างดี'
        : 'Premium graded wood, carefully selected',
    },
    {
      icon: Truck,
      title: lang === 'th' ? 'จัดส่งรวดเร็ว' : 'Fast Delivery',
      description: lang === 'th'
        ? 'ส่งทั่วประเทศไทย 1-6 วันทำการ'
        : 'Nationwide delivery in 1-6 business days',
    },
    {
      icon: DollarSign,
      title: lang === 'th' ? 'ราคาส่ง' : 'Wholesale Prices',
      description: lang === 'th'
        ? 'ราคาโรงงาน ไม่มีนายหน้า'
        : 'Factory direct pricing, no middlemen',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {lang === 'th' ? 'ทำไมต้อง SAK WoodWorks?' : 'Why Choose SAK WoodWorks?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-6">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Test benefits section renders**

Visit: `http://localhost:3000/th/quick-shop`
Expected: 3 benefit cards with icons below products section

**Step 3: Commit**

```bash
git add frontend/components/quick-shop/QuickShopBenefits.tsx
git commit -m "feat: add quick-shop benefits section"
```

---

## Task 6: Create Final CTA Section Component

**Files:**
- Create: `frontend/components/quick-shop/QuickShopCTA.tsx`

**Step 1: Create CTA component**

```typescript
import Link from 'next/link';
import type { Locale } from '@/i18n-config';

interface QuickShopCTAProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

export function QuickShopCTA({ lang }: QuickShopCTAProps) {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
          {lang === 'th' ? 'พร้อมเริ่มโครงการของคุณ?' : 'Ready to Start Your Project?'}
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          {lang === 'th'
            ? 'สั่งซื้อไม้คุณภาพสูงออนไลน์ จัดส่งทั่วประเทศไทย'
            : 'Order premium wood online with fast delivery across Thailand'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${lang}/shop`}
            className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
          >
            {lang === 'th' ? 'ดูสินค้าทั้งหมด' : 'Browse All Products'}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold text-lg rounded-lg transition-all duration-300 text-center"
          >
            {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Test CTA section renders**

Visit: `http://localhost:3000/th/quick-shop`
Expected: Blue gradient CTA section at bottom with two buttons

**Step 3: Commit**

```bash
git add frontend/components/quick-shop/QuickShopCTA.tsx
git commit -m "feat: add quick-shop final CTA section"
```

---

## Task 7: Add Translations

**Files:**
- Modify: `frontend/dictionaries/en.json`
- Modify: `frontend/dictionaries/th.json`

**Step 1: Add English translations**

```json
// Add to frontend/dictionaries/en.json

{
  "quick_shop": {
    "hero_title": "Premium Wood for Your Projects",
    "hero_subtitle": "Fast delivery across Thailand • Wholesale prices",
    "hero_cta_primary": "Shop Now",
    "hero_cta_secondary": "Get Quote",
    "products_title": "Best Sellers",
    "products_subtitle": "Premium wood products trusted by our customers",
    "view_all": "View All Products"
  }
}
```

**Step 2: Add Thai translations**

```json
// Add to frontend/dictionaries/th.json

{
  "quick_shop": {
    "hero_title": "ไม้คุณภาพสูงสำหรับโครงการของคุณ",
    "hero_subtitle": "จัดส่งทั่วประเทศไทย • ราคาส่ง",
    "hero_cta_primary": "ช้อปเลย",
    "hero_cta_secondary": "ขอราคา",
    "products_title": "สินค้าขายดี",
    "products_subtitle": "ไม้คุณภาพสูงที่ลูกค้าชื่นชอบ",
    "view_all": "ดูสินค้าทั้งหมด"
  }
}
```

**Step 3: Update TypeScript types**

```typescript
// Modify frontend/lib/types/dictionary.ts

export interface Dictionary {
  // ... existing properties
  quick_shop?: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_cta_primary?: string;
    hero_cta_secondary?: string;
    products_title?: string;
    products_subtitle?: string;
    view_all?: string;
  };
}
```

**Step 4: Test translations work**

Visit: `http://localhost:3000/th/quick-shop` - should show Thai
Visit: `http://localhost:3000/en/quick-shop` - should show English

**Step 5: Commit**

```bash
git add frontend/dictionaries/ frontend/lib/types/dictionary.ts
git commit -m "feat: add quick-shop translations (TH/EN)"
```

---

## Task 8: Add Navigation Link

**Files:**
- Modify: `frontend/components/layout/Header.tsx`

**Step 1: Add Quick Shop link to navigation**

Find the navigation menu section and add:

```typescript
<Link
  href={`/${lang}/quick-shop`}
  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
>
  {lang === 'th' ? 'ช้อปปิ้ง' : 'Quick Shop'}
</Link>
```

**Step 2: Test link is clickable**

Visit: `http://localhost:3000/th`
Click on "Quick Shop" link
Expected: Navigates to `/th/quick-shop`

**Step 3: Commit**

```bash
git add frontend/components/layout/Header.tsx
git commit -m "feat: add quick-shop link to header navigation"
```

---

## Task 9: Performance Testing

**Step 1: Run Lighthouse audit**

```bash
cd frontend
npm run build
npm run start
```

Open Chrome DevTools → Lighthouse → Run audit on `http://localhost:3000/th/quick-shop`

**Step 2: Verify metrics**

Expected results:
- Performance Score: > 90 (minimal components, optimized images)
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

**Step 3: Test on mobile**

1. Chrome DevTools → Device Toolbar (Toggle device toolbar)
2. Select iPhone SE or similar
3. Reload page and verify layout works

**Step 4: Check bundle size**

```bash
npm run build
# Check .next/static/chunks/ for total size
# Should be < 150KB initial (vs ~250KB for homepage)
```

**Step 5: Document results**

Create: `docs/performance/quick-shop-baseline.md`

```markdown
# Quick Shop Landing Page - Performance Baseline

Date: YYYY-MM-DD

## Metrics
- Performance Score: __/100
- LCP: __s
- FID: __ms
- CLS: __
- Bundle Size: __KB

## Notes
- Mobile performance: ____
- Desktop performance: ____
```

**Step 6: Commit**

```bash
git add docs/performance/quick-shop-baseline.md
git commit -m "test: document quick-shop performance baseline"
```

---

## Task 10: Final Testing & Bug Fixes

**Step 1: Manual testing checklist**

- [ ] Thai version loads correctly
- [ ] English version loads correctly
- [ ] All links work (products, contact, shop)
- [ ] Images load without errors
- [ ] Mobile responsive (320px - 768px)
- [ ] Tablet responsive (768px - 1024px)
- [ ] Desktop responsive (> 1024px)
- [ ] No console errors
- [ ] Meta tags correct (view source)
- [ ] Scroll to products works

**Step 2: Fix any issues found**

Address each issue as a separate commit with descriptive message.

**Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete quick-shop landing page implementation"
```

---

## Testing Strategy

### Unit Tests (Optional but Recommended)

```typescript
// frontend/components/__tests__/QuickShopProducts.test.tsx

import { render } from '@testing-library/react';
import { QuickShopProducts } from '../quick-shop/QuickShopProducts';

jest.mock('@/lib/services/productService');

describe('QuickShopProducts', () => {
  it('renders products grid', async () => {
    const mockProducts = [
      { id: '1', name: 'Test Product', price: '฿1,000' }
    ];

    require('@/lib/services/productService').getFeaturedProducts.mockResolvedValue(mockProducts);

    const { getByText } = await render(
      <QuickShopProducts lang="th" dictionary={{}} />
    );

    expect(getByText('Test Product')).toBeInTheDocument();
  });

  it('shows empty state when no products', async () => {
    require('@/lib/services/productService').getFeaturedProducts.mockResolvedValue([]);

    const { getByText } = await render(
      <QuickShopProducts lang="th" dictionary={{}} />
    );

    expect(getByText('ไม่พบสินค้า')).toBeInTheDocument();
  });
});
```

### Integration Tests

```bash
# Run build and start server
npm run build
npm run start

# Test all routes
curl http://localhost:3000/th/quick-shop
curl http://localhost:3000/en/quick-shop

# Check for 200 status
Expected: HTTP 200 OK
```

---

## Documentation Needed

1. **User Manual Entry** (`docs/user-manuals/09-quick-shop.md`)
   - How to access quick shop page
   - How products are selected (featured algorithm)
   - How to customize hero image/CTAs

2. **Developer Documentation** (`docs/developers/quick-shop-architecture.md`)
   - Component structure
   - Data fetching strategy
   - Performance optimizations

---

## Success Criteria

- [ ] Page loads in < 2 seconds on 4G mobile
- [ ] All products display correctly
- [ ] Mobile responsive (tested on real device)
- [ ] Both Thai and English versions work
- [ ] Lighthouse Performance score > 90
- [ ] No console errors
- [ ] Accessible (WCAG AA compliant)
- [ ] SEO meta tags correct

---

## Rollback Plan

If critical issues found:

```bash
# Revert all commits
git revert <commit-range>

# Or delete branch
git checkout master
git branch -D feature/quick-shop-landing-page
```

---

**Total Estimated Time:** 2-3 hours
**Lines of Code:** ~800
**New Components:** 5
**Modified Files:** 8
