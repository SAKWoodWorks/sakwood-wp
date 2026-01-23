import { GA_ID } from '@/lib/analytics';

/**
 * Google Analytics Component
 * Adds GA4 scripts to the page
 *
 * Only renders when GA_ID is configured
 */
export function GoogleAnalytics() {
  if (!GA_ID) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  );
}
