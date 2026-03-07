# Google Maps API Key Security

## Overview

This application uses Google Maps JavaScript API to display dealer locations on an interactive map. The API key is exposed in client-side code, which requires specific security measures.

## Current Implementation

The Google Maps API key is stored as an environment variable:
- `.env.local` (development): `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `.env.production` (production): `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

The API is loaded in `components/dealer/DealerLocator.tsx`:
```typescript
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initDealerMap&libraries=places`;
```

## Security Measures Implemented

### 1. Google Cloud Console Restrictions

**IMPORTANT**: The following restrictions MUST be configured in Google Cloud Console for your API key:

#### HTTP Referrer Restrictions
- **Production**: `https://sakwood.com/*`
- **Staging**: `https://staging.sakwood.com/*` (if applicable)
- **Development**: `http://localhost:3000/*`

**Why**: Prevents unauthorized domains from using your API key.

#### API Restrictions
Enable only the following APIs:
- Maps JavaScript API
- Places API (for autocomplete/search features)

**Why**: Limits damage if key is compromised - only maps-related features can be used.

### 2. Usage Quotas

Set daily quotas in Google Cloud Console:
- **Maps JavaScript API**: 25,000 map loads per day (free tier)
- **Places API**: 100 requests per 24 hours (free tier)

**Why**: Prevents abuse and unexpected charges.

### 3. Monitoring and Alerts

Configure billing alerts in Google Cloud Console:
- Set budget threshold (e.g., $100/month)
- Enable email alerts for quota usage (80%, 100%)

**Why**: Early detection of suspicious activity.

## Best Practices

### 1. Never Commit API Keys to Git

The `.env.local` and `.env.production` files are in `.gitignore`:
```
# .gitignore
.env*.local
.env.production
```

### 2. Regular Key Rotation

- **Frequency**: Every 90 days
- **Process**:
  1. Generate new API key in Google Cloud Console
  2. Update environment variables
  3. Wait 24 hours for old key usage to drop
  4. Delete old key from Google Cloud Console

### 3. Monitor Usage Regularly

Check Google Cloud Console > APIs & Services > Quotas for:
- Unexpected traffic spikes
- Unusual referrer domains
- API errors (403 Forbidden)

### 4. Implement Rate Limiting (Future Enhancement)

Consider implementing client-side rate limiting:
```typescript
let mapLoadCount = 0;
const MAP_LOAD_LIMIT = 10;

function loadGoogleMaps() {
  if (mapLoadCount >= MAP_LOAD_LIMIT) {
    console.error('Map load limit exceeded');
    return;
  }
  mapLoadCount++;
  // Load Google Maps...
}
```

## Handling Key Compromise

If you suspect your API key has been compromised:

1. **Immediate Actions**:
   - Go to Google Cloud Console
   - Delete the compromised API key
   - Generate a new API key

2. **Update Application**:
   - Update environment variables with new key
   - Deploy to production

3. **Verify Restrictions**:
   - Ensure HTTP referrer restrictions are properly set
   - Verify API restrictions are enabled
   - Check for unauthorized domains in usage reports

4. **Review Logs**:
   - Check Google Cloud Console for unusual usage patterns
   - Review server logs for suspicious activity

## Cost Management

### Free Tier Limits (as of 2025)

- **Maps JavaScript API**: $200 free credit per month (~28,000 map loads)
- **Places API**: Free tier applies with usage-based pricing beyond free limits

### Optimization Strategies

1. **Lazy Loading**: Load Google Maps only when dealer locator page is accessed
2. **Map Caching**: Implement service worker caching for map tiles
3. **Reduce API Calls**: Batch geocoding requests when possible

## Additional Resources

- [Google Maps API Security Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps JavaScript API Pricing](https://maps.googleapis.com/maps/api/js?pricing)

## Troubleshooting

### Error: "RefererNotAllowedMapError"

**Cause**: HTTP referrer restrictions don't match current domain

**Solution**:
1. Check Google Cloud Console > Credentials > API Key
2. Verify HTTP referrer restrictions include your domain
3. Ensure protocol (http/https) matches

### Error: "ApiNotActivatedMapError"

**Cause**: Required API not enabled in Google Cloud Console

**Solution**:
1. Go to Google Cloud Console > APIs & Services > Library
2. Enable "Maps JavaScript API"
3. Enable "Places API" (if using autocomplete)

### Unexpected Charges

**Possible Causes**:
- Missing API restrictions
- Exceeded free tier limits
- Key exposed to public repositories

**Solutions**:
1. Verify all security restrictions are in place
2. Check usage metrics in Google Cloud Console
3. Rotate API key if compromise suspected

## Contact

For questions about Google Maps API key security, contact the development team or review Google's official documentation.
