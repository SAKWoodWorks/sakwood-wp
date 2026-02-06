import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session replay
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,

  // Filter sensitive data
  beforeSend(event) {
    // Remove sensitive data from breadcrumbs
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.filter((breadcrumb) => {
        // Filter out password-related breadcrumbs
        if (breadcrumb.message?.toLowerCase().includes('password')) {
          return false;
        }
        return true;
      });
    }

    // Add custom context
    if (event.user) {
      // Don't send PII
      delete event.user.email;
      delete event.user.ip_address;
    }

    // Add app context
    if (event.exception) {
      const exception = event.exception.values?.[0];
      if (exception) {
        event.contexts = {
          ...(event.contexts || {}),
          app: {
            name: 'SAK WoodWorks',
            version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
          },
        };
      }
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    // Random plugins/extensions
    'top.GLOBALS',
    // Facebook flakiness
    'fb_xd_fragment',
    // Network errors that are not actionable
    'Non-Error promise rejection captured',
    // Chrome extensions
    /chrome-extension:/,
    // Safari extensions
    /safari-extension:/,
  ],

  // Deny URLs for performance monitoring
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    // Safari extensions
    /^safari-extension:\/\//i,
  ],
});
