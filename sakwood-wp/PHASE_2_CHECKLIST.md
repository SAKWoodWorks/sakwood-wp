# PHASE 2 VERIFICATION CHECKLIST

## Task 8: Test Suite Foundation

- [ ] Install test dependencies: `cd frontend && npm install`
- [ ] Run unit tests: `npm test` (should show 20 tests passing)
- [ ] Run E2E tests: `npm run test:e2e` (requires dev server)
- [ ] Check test coverage: `npm run test:coverage`
- [ ] Verify test files exist:
  - [ ] `frontend/vitest.config.ts`
  - [ ] `frontend/vitest.setup.ts`
  - [ ] `frontend/playwright.config.ts`
  - [ ] `frontend/__tests__/unit/CartContext.test.tsx`
  - [ ] `frontend/__tests__/unit/AuthContext.test.tsx`
  - [ ] `frontend/e2e/checkout.spec.ts`

---

## Task 9: Sentry Error Tracking

- [ ] Create Sentry account at https://sentry.io
- [ ] Create new project (select Next.js)
- [ ] Get DSN from project settings
- [ ] Add to `.env.local`:
  ```env
  NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
  SENTRY_AUTH_TOKEN=your-auth-token
  ```
- [ ] Verify Sentry files exist:
  - [ ] `frontend/sentry.client.config.ts`
  - [ ] `frontend/sentry.server.config.ts`
  - [ ] `frontend/sentry.edge.config.ts`
  - [ ] `frontend/lib/sentry.ts`
  - [ ] `frontend/docs/SENTRY_SETUP.md`
- [ ] Test error capture in browser console:
  ```javascript
  Sentry.captureException(new Error('Test error'));
  ```
- [ ] Check Sentry dashboard for error
- [ ] (Optional) Set up source map upload

---

## Task 10: Customer Portal Features

### Profile Editing
- [ ] Log in to account
- [ ] Navigate to Account > Details
- [ ] Verify profile form displays:
  - [ ] First name
  - [ ] Last name
  - [ ] Display name
  - [ ] Phone
  - [ ] Company
  - [ ] LINE ID
- [ ] Edit profile fields
- [ ] Click "Save"
- [ ] Verify success message
- [ ] Refresh page to confirm changes saved

### Password Reset
- [ ] Log out
- [ ] Navigate to Login page
- [ ] Click "Forgot Password?"
- [ ] Enter email address
- [ ] Submit form
- [ ] Check email for reset link
- [ ] Click reset link (or copy token)
- [ ] Enter new password (min 8 characters)
- [ ] Confirm new password
- [ ] Submit form
- [ ] Verify password changed and logged in

### Download Invoices
- [ ] Log in to account
- [ ] Navigate to Account > Orders
- [ ] Click on an order
- [ ] Click "Download Invoice" button
- [ ] Verify PDF downloads with:
  - [ ] Invoice number
  - [ ] Date
  - [ ] Bill to / Ship to addresses
  - [ ] Line items
  - [ ] Totals
  - [ ] Payment method
- [ ] Open PDF and verify formatting

### WordPress API Endpoints
- [ ] Test profile API (while logged in):
  ```bash
  curl http://localhost:8006/wp-json/sakwood/v1/customer/profile \
    -H "Cookie: wordpress_test_cookie=WP+Cookie+check; wordpress_logged_in..."
  ```
- [ ] Verify response includes profile data

---

## Task 11: Advanced Search Features

### Search Autocomplete
- [ ] Navigate to search page or open search modal
- [ ] Type "ไม้" (wood in Thai)
- [ ] Verify autocomplete dropdown appears
- [ ] Verify suggestions show:
  - [ ] Product images
  - [ ] Product names
  - [ ] Prices
- [ ] Click a suggestion
- [ ] Verify navigates to product page
- [ ] Type another query
- [ ] Click "Search for [query]"
- [ ] Verify navigates to search results page

### Recent Searches
- [ ] Perform a search
- [ ] Close search
- [ ] Open search again
- [ ] Verify previous search appears under "Recent Searches"
- [ ] Click recent search
- [ ] Verify search re-runs
- [ ] Click X to remove recent search
- [ ] Click "Clear All" to remove all
- [ ] Refresh page
- [ ] Verify recent searches persist (localStorage)

### Advanced Filters
- [ ] Navigate to `/th/search` or `/en/search`
- [ ] Verify filters sidebar appears
- [ ] **Price Range**:
  - [ ] Set min price to 1000
  - [ ] Set max price to 50000
  - [ ] Verify results filter
  - [ ] Verify active filter chip appears
  - [ ] Click X on chip to remove
- [ ] **Dimensions**:
  - [ ] Set length min/max
  - [ ] Set width min/max
  - [ ] Set thickness min/max
  - [ ] Verify results filter
- [ ] **Grade**:
  - [ ] Click grade buttons (A, B, C, D)
  - [ ] Verify multiple grades can be selected
  - [ ] Click again to deselect
  - [ ] Verify results filter
- [ ] **In Stock Only**:
  - [ ] Check "In Stock Only" checkbox
  - [ ] Verify only in-stock items show
- [ ] **Clear All**:
  - [ ] Set multiple filters
  - [ ] Click "Clear All"
  - [ ] Verify all filters removed

---

## Build Verification

- [ ] Run build: `cd frontend && npm run build`
- [ ] Verify build completes successfully
- [ ] Check for TypeScript errors
- [ ] Verify all routes compile
- [ ] Check bundle size is reasonable
- [ ] Test production build: `npm start`
- [ ] Navigate to http://localhost:3000
- [ ] Verify pages load correctly
- [ ] Test critical user flows:
  - [ ] Browse products
  - [ ] Add to cart
  - [ ] Checkout
  - [ ] Login/logout
  - [ ] Search
  - [ ] Account dashboard

---

## Integration Checklist

### WordPress Plugin
- [ ] Copy new PHP files to plugin directory:
  ```bash
  docker cp wordpress-plugin/sakwood-integration/customer-profile-api.php \
    sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/

  docker cp wordpress-plugin/sakwood-integration/password-reset-api.php \
    sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/
  ```
- [ ] Verify plugin loads without errors
- [ ] Check WordPress admin for new API endpoints:
  - [ ] `/wp-json/sakwood/v1/customer/profile`
  - [ ] `/wp-json/sakwood/v1/password-reset/request`
  - [ ] `/wp-json/sakwood/v1/password-reset/confirm`
- [ ] Test API endpoints with Postman or curl

### Frontend Integration
- [ ] Verify API routes exist:
  - [ ] `frontend/app/api/customer-profile/route.ts`
  - [ ] `frontend/app/api/password-reset/route.ts`
  - [ ] `frontend/app/api/password-reset/confirm/route.ts`
  - [ ] `frontend/app/api/orders/[orderId]/invoice/route.ts`
- [ ] Test API routes in development
- [ ] Check browser console for errors
- [ ] Verify data fetches correctly

---

## Performance Verification

- [ ] Run Lighthouse audit on homepage
- [ ] Check performance score > 90
- [ ] Verify no console errors
- [ ] Check Sentry dashboard for errors (if enabled)
- [ ] Test on mobile device
- [ ] Verify responsive design
- [ ] Check load times on 3G
- [ ] Verify images load correctly

---

## Security Verification

- [ ] Verify Sentry filters PII:
  - [ ] Emails not sent
  - [ ] Passwords not sent
  - [ ] IP addresses not sent
- [ ] Test password reset security:
  - [ ] Tokens expire after 1 hour
  - [ ] Invalid tokens rejected
  - [ ] Success response even for non-existent emails
- [ ] Verify profile editing:
  - [ ] Cannot change email directly
  - [ ] Cannot change tax ID
  - [ ] LINE ID locked if set by admin
- [ ] Check WordPress nonce verification

---

## Documentation

- [ ] Read `frontend/docs/SENTRY_SETUP.md`
- [ ] Review `PHASE_2_SUMMARY.md`
- [ ] Update team on new features
- [ ] Create user documentation for:
  - [ ] Profile editing
  - [ ] Password reset
  - [ ] Invoice download
  - [ ] Advanced search

---

## Final Sign-Off

- [ ] All tests pass
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] All features tested manually
- [ ] Documentation updated
- [ ] Team notified
- [ ] Ready for deployment

---

**Date Completed**: ___________
**Tester**: ___________
**Notes**: ___________
