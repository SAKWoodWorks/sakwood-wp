import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Edge runtime specific configuration
  beforeSend(event) {
    // Filter edge-specific errors
    if (event.request?.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
    }

    return event;
  },

  // Filter edge runtime noise
  ignoreErrors: [
    'Non-Error promise rejection captured',
  ],
});
