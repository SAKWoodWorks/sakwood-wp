# Advanced Promotional Banners - Feature Specification

## Overview
A comprehensive promotional banner system for Sakwood with scheduling, targeting, and analytics tracking.

## Features
1. **Banner Types**: Top bar, modal/popup, slide-in, fullscreen announcement
2. **Scheduling**: Start/end dates with timezone support
3. **Targeting**: Device type, user location, page-specific targeting, new vs returning visitors
4. **Analytics**: Impressions, click-through rate, dismissals
5. **A/B Testing**: Multiple banner variants with performance tracking
6. **Bilingual**: Full TH/EN support

---

## WordPress Backend Schema (ACF)

### Custom Post Type: `sakwood_promo_banner`

```php
// Register Custom Post Type in WordPress
register_post_type('sakwood_promo_banner', [
    'label' => 'Promotional Banners',
    'public' => false,
    'show_ui' => true,
    'supports' => ['title'],
    'rewrite' => ['slug' => 'promo-banners'],
]);
```

### ACF Field Group: `promo_banner_settings`

```json
{
  "banner_type": {
    "type": "select",
    "choices": ["top_bar", "modal", "slide_in", "fullscreen"],
    "default": "top_bar"
  },
  "banner_content_th": {
    "type": "textarea",
    "label": "Banner Content (Thai)"
  },
  "banner_content_en": {
    "type": "textarea",
    "label": "Banner Content (English)"
  },
  "banner_link": {
    "type": "url",
    "label": "Call to Action Link"
  },
  "button_text_th": {
    "type": "text",
    "label": "Button Text (Thai)"
  },
  "button_text_en": {
    "type": "text",
    "label": "Button Text (English)"
  },
  "background_color": {
    "type": "color_picker",
    "default": "#1e40af"
  },
  "text_color": {
    "type": "color_picker",
    "default": "#ffffff"
  },
  "banner_image": {
    "type": "image",
    "return_format": "array"
  },
  "schedule_start": {
    "type": "date_time_picker",
    "label": "Start Date/Time"
  },
  "schedule_end": {
    "type": "date_time_picker",
    "label": "End Date/Time"
  },
  "targeting": {
    "type": "group",
    "sub_fields": {
      "device_types": {
        "type": "checkbox",
        "choices": ["desktop", "tablet", "mobile"]
      },
      "show_on_pages": {
        "type": "relationship",
        "post_type": ["page", "product", "post"]
      },
      "visitor_type": {
        "type": "radio",
        "choices": ["all", "new", "returning"]
      },
      "max_impressions": {
        "type": "number",
        "label": "Max Impressions Per User"
      },
      "display_delay": {
        "type": "number",
        "label": "Display Delay (seconds)",
        "default": 0
      }
    }
  },
  "ab_test_group": {
    "type": "text",
    "label": "A/B Test Group ID"
  },
  "is_active": {
    "type": "true_false",
    "default": true
  }
}
```

---

## GraphQL Query

```graphql
query GetActivePromoBanners($lang: String, $path: String) {
  promoBanners(
    first: 10
    where: {
      status: PUBLISH
      orderby: { field: DATE, order: DESC }
    }
  ) {
    nodes {
      id
      databaseId
      title
      slug
      date

      # ACF Fields
      bannerType
      bannerContentTh
      bannerContentEn
      bannerLink
      buttonTextTh
      buttonTextEn
      backgroundColor
      textColor
      bannerImage {
        sourceUrl
        altText
        mediaItemId
      }
      scheduleStart
      scheduleEnd
      targeting {
        deviceTypes
        showOnPages
        visitorType
        maxImpressions
        displayDelay
      }
      abTestGroup
      isActive
    }
  }
}
```

---

## TypeScript Interfaces

```typescript
// lib/types/promotional-banner.ts

export interface PromotionalBanner {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;

  // Banner Content
  bannerType: 'top_bar' | 'modal' | 'slide_in' | 'fullscreen';
  bannerContentTh: string;
  bannerContentEn: string;
  bannerLink?: string;
  buttonTextTh?: string;
  buttonTextEn?: string;
  backgroundColor?: string;
  textColor?: string;
  bannerImage?: {
    sourceUrl: string;
    altText?: string;
    mediaItemId: number;
  };

  // Scheduling
  scheduleStart?: string; // ISO date string
  scheduleEnd?: string;   // ISO date string

  // Targeting
  targeting: {
    deviceTypes: ('desktop' | 'tablet' | 'mobile')[];
    showOnPages?: number[]; // Page IDs
    visitorType: 'all' | 'new' | 'returning';
    maxImpressions?: number;
    displayDelay: number;
  };

  // A/B Testing
  abTestGroup?: string;

  // Status
  isActive: boolean;

  // Analytics (stored separately)
  impressions?: number;
  clicks?: number;
  dismissals?: number;
}

export interface BannerAnalytics {
  bannerId: number;
  variantId?: string;
  userId?: string;
  sessionId: string;
  action: 'impression' | 'click' | 'dismiss';
  timestamp: string;
  device: string;
  page: string;
}

export interface PromoBannersResponse {
  promoBanners: {
    nodes: PromotionalBanner[];
  };
}
```

---

## File Structure

```
frontend/
├── components/
│   └── promotional-banners/
│       ├── PromotionalBannerManager.tsx    # Main container component
│       ├── TopBarBanner.tsx                 # Top bar banner
│       ├── ModalBanner.tsx                  # Modal/popup banner
│       ├── SlideInBanner.tsx                # Slide-in banner (bottom/side)
│       └── FullscreenBanner.tsx             # Fullscreen announcement
├── lib/
│   ├── graphql/
│   │   └── queries.ts                       # Add GET_PROMO_BANNERS_QUERY
│   ├── services/
│   │   └── promotionalBannerService.ts      # Banner CRUD + analytics
│   └── hooks/
│       └── usePromotionalBanners.ts         # Custom hook for banner logic
└── app/
    └── api/
        └── banners/
            └── [id]/
                └── route.ts                 # Analytics tracking endpoint

wordpress-plugin/sakwood-integration/
├── promo-banner-post-type.php               # CPT registration
├── promo-banner-acf.php                     # ACF field group
└── promo-banner-analytics.php               # REST API for analytics
```

---

## Translation Keys (dictionaries/en.json & dictionaries/th.json)

```json
{
  "banner": {
    "close": "Close",
    "dismiss": "Dismiss",
    "cta_button": "Learn More",
    "view_offer": "View Offer",
    "limited_time": "Limited Time Offer",
    "expires_soon": "Expires Soon",
    "new_arrival": "New Arrival",
    "special_promo": "Special Promotion",
    "free_shipping": "Free Shipping",
    "sale": "Sale"
  }
}
```

---

## Component Props Structure

```typescript
interface PromotionalBannerProps {
  banner: PromotionalBanner;
  lang: Locale;
  dictionary: Dictionary;
  currentPagePath: string;
  onClose?: () => void;
  onImpression?: () => void;
  onClick?: () => void;
}
```

---

## Key Implementation Requirements

1. **Server-Side Rendering**: Banner data fetched server-side, displayed client-side
2. **LocalStorage**: Track impressions/dismissals per banner using localStorage
3. **Session ID**: Generate unique session ID for analytics
4. **Scheduling Logic**: Compare start/end dates with current server time
5. **Targeting Logic**:
   - Device detection (user agent)
   - New vs returning visitor (localStorage flag)
   - Page matching (current path vs show_on_pages)
6. **Analytics Debouncing**: Send analytics events in batches to reduce API calls
7. **A/B Testing**: Randomly assign variant, track performance separately
8. **Accessibility**:
   - `role="dialog"` or `role="banner"`
   - `aria-label` for close buttons
   - Keyboard navigation (ESC to close)
   - Focus trap for modals

---

## WordPress REST API Endpoints

### POST /wp-json/sakwood/v1/banner/analytics
```php
// Accepts: { bannerId, action, sessionId, device, page }
// Returns: { success: true, tracked: true }
// Stores analytics in custom table: wp_sakwood_banner_analytics
```

### GET /wp-json/sakwood/v1/banner/analytics/[id]
```php
// Returns analytics summary for banner
// { impressions, clicks, ctr, dismissals }
```

---

## Security Considerations

1. **Rate Limiting**: Analytics endpoint should be rate-limited per session
2. **Data Sanitization**: All banner content stored in WordPress should be sanitized
3. **XSS Prevention**: Use React's default escaping, no `dangerouslySetInnerHTML`
4. **CSRF Protection**: Analytics endpoint uses WordPress nonces for authenticated requests
5. **PII Protection**: Session IDs should be random UUIDs, no user tracking without consent

---

## Performance Optimizations

1. **Caching**: Banner data cached with Next.js ISR (revalidate every 5 minutes)
2. **Lazy Loading**: Banners load after main content (display delay)
3. **Analytics Batching**: Send events in batches every 30 seconds
4. **LocalStorage**: Cache dismissed state to avoid re-showing closed banners
5. **Image Optimization**: Use Next.js Image for banner images
