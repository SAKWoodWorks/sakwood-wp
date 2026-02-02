# Security Improvement Plan - Sakwood E-commerce

**Date:** 2026-01-21
**Status:** Draft
**Priority:** HIGH - Execute before production deployment

---

## Executive Summary

This document outlines critical security vulnerabilities identified in the Sakwood e-commerce application and provides a phased approach to remediation. The issues are categorized by severity (Critical, High, Medium, Low) with specific implementation steps.

---

## Phase 1: Critical Fixes (Immediate Action Required)

### 1.1 Remove Exposed API Credentials ⚠️ **CRITICAL**

**Issue:** WooCommerce API keys stored in client-side code (`lib/services/orderStatusService.ts`)

**Risk:** Anyone can view these credentials in browser DevTools and make unauthorized API calls

**Impact:** Full WooCommerce API access - orders, customers, products, payments

**Fix:**

1. Create Next.js API route to proxy order status checks
2. Move credentials to server-side environment variables
3. Update client to call internal API route instead of direct WooCommerce API

**Files to Create/Modify:**
- Create: `app/api/orders/[id]/route.ts` (Next.js 13+ App Router API route)
- Modify: `lib/services/orderStatusService.ts`
- Modify: `.env.local` - add non-prefixed server-side vars

**Implementation Steps:**
```typescript
// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Server-side only - credentials not exposed to client
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const response = await fetch(
    `${process.env.WORDPRESS_API_URL}/orders/${params.id}`,
    {
      headers: {
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
    }
  );

  return NextResponse.json(await response.json());
}
```

**Time Estimate:** 1-2 hours

---

### 1.2 Implement HTML Sanitization (XSS Protection) ⚠️ **CRITICAL**

**Issue:** `dangerouslySetInnerHTML` used without sanitization in:
- `app/[lang]/products/[slug]/components/ProductInfo.tsx:99-101`
- Blog post pages
- Structured data components

**Risk:** Attackers with WordPress admin access can inject malicious scripts

**Impact:** Session hijacking, data theft, malware distribution

**Fix:**

1. Install DOMPurify: `npm install dompurify @types/dompurify`
2. Create sanitization utility
3. Apply before all `dangerouslySetInnerHTML` usage

**Files to Create/Modify:**
- Create: `lib/utils/sanitize.ts`
- Modify: `app/[lang]/products/[slug]/components/ProductInfo.tsx`
- Modify: All blog/post components using dangerouslySetInnerHTML

**Implementation Steps:**
```typescript
// lib/utils/sanitize.ts
import DOMPurify from 'dompurify';

export function sanitizeHTML(html: string, options?: { ALLOWED_TAGS?: string[] }): string {
  if (typeof window === 'undefined') {
    // Server-side: create DOMPurify instance with jsdom
    const { createDOMPurify } = require('dompurify');
    const { JSDOM } = require('jsdom');
    const window = new JSDOM('').window;
    const purify = createDOMPurify(window);
    return purify.sanitize(html, options);
  }

  return DOMPurify.sanitize(html, options);
}

// Usage in ProductInfo.tsx
<div
  dangerouslySetInnerHTML={{
    __html: sanitizeHTML(product.description)
  }}
/>
```

**Time Estimate:** 2-3 hours

---

## Phase 2: Authentication Security (High Priority)

### 2.1 Replace localStorage with HttpOnly Cookies

**Issue:** JWT tokens stored in localStorage (`lib/context/AuthContext.tsx`)

**Risk:** Tokens accessible to JavaScript, vulnerable to XSS

**Impact:** Session hijacking if any XSS vulnerability exists

**Fix:**

1. Update authentication to use HttpOnly, Secure cookies
2. Create Next.js API route for login that sets cookie server-side
3. Remove client-side token storage

**Files to Create/Modify:**
- Create: `app/api/auth/login/route.ts`
- Create: `app/api/auth/logout/route.ts`
- Create: `app/api/auth/refresh/route.ts` (token refresh)
- Modify: `lib/context/AuthContext.tsx`
- Create: `lib/types/cookies.ts`

**Implementation Steps:**

```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Validate credentials with WordPress
  const wpResponse = await fetch(`${process.env.WORDPRESS_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const { token, user } = await wpResponse.json();

  // Set HttpOnly, Secure cookie
  cookies().set('sakwood_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return NextResponse.json({ user });
}

// AuthContext updates to read from cookies
const token = cookies().get('sakwood_token')?.value;
```

**Time Estimate:** 4-6 hours

---

### 2.2 Implement Token Refresh Mechanism

**Issue:** JWT tokens expire without automatic refresh

**Risk:** Users logged out unexpectedly, poor UX

**Impact:** Session management issues

**Fix:**

1. Create refresh token endpoint
2. Implement automatic token refresh on 401 responses
3. Add refresh interval check

**Files to Create/Modify:**
- Create: `app/api/auth/refresh/route.ts`
- Create: `lib/utils/tokenRefresh.ts`
- Modify: `lib/services/wordpressService.ts` (add 401 handling)

**Time Estimate:** 2-3 hours

---

## Phase 3: CSRF Protection (High Priority)

### 3.1 Add CSRF Tokens to Forms

**Issue:** No CSRF protection on state-changing operations

**Risk:** Attackers can trick users into unwanted actions

**Impact:** Unauthorized orders, account changes, data theft

**Fix:**

1. Generate CSRF tokens server-side
2. Include tokens in all forms
3. Validate on form submission

**Files to Create/Modify:**
- Create: `lib/utils/csrf.ts`
- Create: `app/api/auth/csrf/route.ts`
- Modify: All form components (Login, Register, Checkout)
- Modify: WordPress plugin to validate CSRF tokens

**Implementation Steps:**

```typescript
// app/api/auth/csrf/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

export async function GET() {
  const token = randomBytes(32).toString('hex');

  cookies().set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return NextResponse.json({ csrfToken: token });
}

// Usage in forms
<form>
  <input type="hidden" name="csrf_token" value={csrfToken} />
  {/* other fields */}
</form>
```

**Time Estimate:** 4-5 hours

---

## Phase 4: Security Headers & CSP (Medium Priority)

### 4.1 Configure Content Security Policy

**Issue:** No CSP headers configured

**Risk:** XSS attacks have broader attack surface

**Impact:** If XSS exists, attackers can load external resources

**Fix:**

1. Add security headers to Next.js config
2. Configure strict CSP policy
3. Add frame protection

**Files to Create/Modify:**
- Modify: `next.config.ts`

**Implementation:**

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' sak_wp:80 localhost:8006",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: sak_wp:80 localhost:8006 images.unsplash.com",
              "font-src 'self' data:",
              "connect-src 'self' sak_wp:80 localhost:8006",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};
```

**Time Estimate:** 1-2 hours

---

## Phase 5: Server-Side Validation (Medium Priority)

### 5.1 Add Input Validation Middleware

**Issue:** Only client-side validation exists

**Risk:** Bypassed validation via API calls

**Impact:** Invalid data, SQL injection, code injection

**Fix:**

1. Create validation schemas with Zod
2. Add validation middleware to API routes
3. Validate all inputs server-side

**Files to Create/Modify:**
- Create: `lib/validation/schemas.ts`
- Create: `lib/middleware/validation.ts`
- Modify: All API routes

**Implementation:**

```typescript
// lib/validation/schemas.ts
import { z } from 'zod';

export const orderSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^0[0-9]{9}$/), // Thai phone format
  address: z.object({
    province: z.string(),
    district: z.string(),
    subdistrict: z.string(),
    street: z.string(),
    postcode: z.string().regex(/^\d{5}$/),
  }),
  paymentMethod: z.enum(['promptpay', 'bank_transfer']),
  cartItems: z.array(z.object({
    productId: z.number(),
    quantity: z.number().positive(),
  })),
});

// lib/middleware/validation.ts
export function validateBody<T>(schema: z.ZodSchema<T>) {
  return async (request: NextRequest) => {
    const body = await request.json();
    return schema.parse(body);
  };
}
```

**Time Estimate:** 3-4 hours

---

## Phase 6: Cleanup & Hardening (Low Priority)

### 6.1 Remove Debug Code

**Files to Check:**
- All files with `console.log`
- All files with `debugger` statements

**Fix:** Run automated search and remove all debug statements

```bash
# Find all console.log statements
grep -r "console\.log" sakwood-wp/frontend --include="*.ts" --include="*.tsx"
```

**Time Estimate:** 1 hour

---

### 6.2 Add Rate Limiting

**Issue:** No rate limiting on API endpoints

**Risk:** Brute force attacks, DoS

**Impact:** Service degradation, unauthorized access

**Fix:**

1. Implement rate limiting middleware
2. Apply to login and checkout endpoints

**Files to Create:**
- Create: `lib/middleware/rateLimit.ts`

**Implementation:**

```typescript
// lib/middleware/rateLimit.ts
import { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimit.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}
```

**Time Estimate:** 2-3 hours

---

## Implementation Timeline

| Phase | Tasks | Estimated Time | Priority |
|-------|-------|----------------|----------|
| Phase 1 | Critical fixes (API credentials, XSS) | 3-5 hours | CRITICAL |
| Phase 2 | Authentication security | 6-9 hours | HIGH |
| Phase 3 | CSRF protection | 4-5 hours | HIGH |
| Phase 4 | Security headers | 1-2 hours | MEDIUM |
| Phase 5 | Server-side validation | 3-4 hours | MEDIUM |
| Phase 6 | Cleanup & rate limiting | 3-4 hours | LOW |
| **Total** | **All phases** | **20-29 hours** | - |

---

## Testing Checklist

After implementing each phase, verify:

- [ ] No credentials exposed in client-side bundle
- [ ] XSS attempts blocked (check `<script>` in product descriptions)
- [ ] Tokens stored in HttpOnly cookies only
- [ ] CSRF tokens required for all forms
- [ ] Security headers present in response (check DevTools)
- [ ] Rate limiting triggers on repeated requests
- [ ] Input validation rejects malformed data
- [ ] No `console.log` in production build

---

## Monitoring & Maintenance

### 1. Dependency Updates
```bash
# Run monthly
npm audit
npm audit fix
```

### 2. Security Scanning
```bash
# Install and run
npm install -g snyk
snyk test
```

### 3. HTTP Security Headers Check
Visit: https://securityheaders.com/

### 4. OWASP ZAP Scan
Run periodic penetration tests with OWASP ZAP

---

## Environment Variables Reference

**Server-side only (DO NOT prefix with NEXT_PUBLIC_):**
```env
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxx
JWT_SECRET=your-super-secret-key
ENCRYPTION_KEY=32-character-encryption-key
```

**Client-side (safe to expose):**
```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://sak_wp:80/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=http://sak_wp:80/wp-json/sakwood/v1
```

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

## Sign-off

- **Security Review:** Pending
- **Implementation Start:** TBD
- **Target Completion:** TBD
- **Approved By:** _________
- **Date:** _________
