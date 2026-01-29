# Sentry Error Tracking Setup

This project includes Sentry integration for error tracking and performance monitoring.

## Setup Instructions

### 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io) and create an account
2. Create a new project
3. Select "Next.js" as the platform

### 2. Configure Environment Variables

Add the following variables to your `.env.local` file:

```env
# Sentry DSN (from Sentry project settings)
NEXT_PUBLIC_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0

# Sentry Auth Token (for source maps upload)
SENTRY_AUTH_TOKEN=your-auth-token-here

# Project Information
SENTRY_PROJECT=your-project-slug
SENTRY_ORG=your-org-slug

# Application Version (optional)
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 3. Upload Source Maps (Optional but Recommended)

Source maps allow Sentry to show original source code instead of minified code.

**Option 1: Automatic Upload (Recommended)**

Install the Sentry CLI:
```bash
npm install -g @sentry/cli
```

Update `next.config.ts` to upload source maps automatically:
```typescript
import { withSentryConfig } from '@sentry/nextjs';

export default withSentryConfig(
  {
    // Your existing Next.js config
    reactStrictMode: true,
    // ... other config
  },
  {
    // Sentry options
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
  }
);
```

**Option 2: Manual Upload**

```bash
sentry-cli releases new $NEXT_PUBLIC_APP_VERSION
sentry-cli releases files $NEXT_PUBLIC_APP_VERSION upload-sourcemaps .next/static
sentry-cli releases finalize $NEXT_PUBLIC_APP_VERSION
```

### 4. Testing

Test that Sentry is working by throwing an error in development:

```typescript
import * as Sentry from '@sentry/nextjs';

// Test error capture
Sentry.captureException(new Error('Test error'));

// Test message capture
Sentry.captureMessage('Test message', 'info');
```

## Using the Sentry Utilities

The project includes helper functions in `lib/sentry.ts`:

### Track Errors

```typescript
import { trackError } from '@/lib/sentry';

try {
  // Some code that might fail
} catch (error) {
  trackError(error, {
    context: 'additional context',
    user: currentUser,
  });
}
```

### Track User Actions

```typescript
import { trackUserAction } from '@/lib/sentry';

// Track button clicks
trackUserAction('Add to Cart', {
  productId: '123',
  productName: 'Wood Board',
});

// Track checkout steps
import { trackCheckoutStep } from '@/lib/sentry';

trackCheckoutStep('payment', true, {
  amount: 1500,
  method: 'PromptPay',
});
```

### Track Performance

```typescript
import { withPerformanceTracking } from '@/lib/sentry';

const slowFunction = withPerformanceTracking(
  () => {
    // Expensive operation
  },
  'slowFunction'
);
```

## Monitoring

### View Errors

1. Go to your Sentry dashboard
2. Navigate to your project
3. View "Issues" tab for error reports

### Performance Monitoring

1. Navigate to "Performance" tab
2. View transaction times
3. Identify slow operations

### Release Tracking

Track errors per release:
```typescript
Sentry.setRelease('1.0.0');
```

## Privacy & Security

The Sentry integration automatically:

- **Removes passwords** from error data
- **Removes PII** (email, IP addresses)
- **Masks sensitive request headers** (Authorization, Cookie)
- **Filters extension-related errors**

No sensitive customer data is sent to Sentry.

## Development vs Production

**Development Mode:**
- All errors are captured
- 100% transaction sampling
- Session replay enabled
- Source maps loaded from disk

**Production Mode:**
- All errors are captured
- 10% transaction sampling (to reduce costs)
- 10% session replay sampling
- Source maps uploaded to Sentry

## Troubleshooting

### Errors Not Appearing in Sentry

1. Check `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. Check browser console for Sentry errors
3. Verify your auth token has correct permissions
4. Check Sentry dashboard for "Issues"

### Source Maps Not Working

1. Verify source maps are uploaded: `sentry-cli releases files <version> list`
2. Check that `.next/static` is not in `.gitignore`
3. Ensure `upload-sourcemaps` ran successfully

### Too Many Errors

1. Adjust sampling rates in `sentry.client.config.ts`
2. Add more patterns to `ignoreErrors` array
3. Use `beforeSend` to filter unwanted errors

## Additional Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry CLI Documentation](https://docs.sentry.io/cli/)
- [Source Maps Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/sourcemaps/)
