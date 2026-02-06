import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Filter sensitive request data
  beforeSend(event, hint) {
    // Remove sensitive request headers
    if (event.request?.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
      delete event.request.headers['x-api-key'];
    }

    // Remove sensitive request body data
    if (event.request?.data) {
      const data = event.request.data as Record<string, unknown>;
      if (data.password) {
        delete data.password;
      }
      if (data.currentPassword) {
        delete data.currentPassword;
      }
      if (data.newPassword) {
        delete data.newPassword;
      }
    }

    // Don't send PII
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    // Network errors that are not actionable
    'Non-Error promise rejection captured',
    // Database connection errors (retryable)
    'ECONNREFUSED',
  ],
});
