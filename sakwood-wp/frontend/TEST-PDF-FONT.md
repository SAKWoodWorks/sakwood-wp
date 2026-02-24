# Thai Font PDF Export Test

## Testing the Font Loading Fix

### 1. Manual Testing Steps

1. **Start the Development Server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Navigate to Price List Page:**
   - Thai: `http://localhost:3000/th/price-list`
   - English: `http://localhost:3000/en/price-list`

3. **Test PDF Export:**
   - Click the "Export PDF" / "ส่งออก PDF" button
   - Open browser DevTools Console (F12)
   - Check for the following console messages:
     - ✅ `Thai font loaded from @fontsource/sarabun` (SUCCESS)
     - ⚠️ `Fontsource package load failed:` (FALLBACK)
     - ❌ `All font loading strategies failed` (FAILURE)

4. **Verify PDF Content:**
   - Open the downloaded PDF file
   - Thai text should display correctly (not as alien/gibberish characters)
   - Check product names, headers, and footer text

### 2. Font Loading Fallback Strategy

The implementation uses a 3-tier fallback system:

1. **Primary:** `@fontsource/sarabun` package (bundled with app)
2. **Fallback 1:** Local `/fonts/Sarabun-Regular-full.woff2`
3. **Fallback 2:** Google Fonts CDN
4. **Failure Mode:** Use default font (Thai will show as gibberish)

### 3. Expected Console Output

**Success (Thai Font Loaded):**
```
✅ Thai font loaded from @fontsource/sarabun
PDF generation complete
```

**Partial Success (Fallback):**
```
⚠️ Fontsource package load failed: [error details]
✅ Thai font loaded from local file
PDF generation complete
```

**Failure (No Font):**
```
❌ All font loading strategies failed - Thai text may not display correctly
PDF generated with default font (Thai will be unreadable)
```

### 4. Troubleshooting

If Thai text still appears as gibberish:

**A. Check Browser Console:**
- Look for specific error messages
- Verify which strategy (if any) succeeded

**B. Verify Font File:**
```bash
# Check if font file exists and has reasonable size
ls -lh frontend/public/fonts/Sarabun-Regular-full.woff2
# Should be ~10KB or more
```

**C. Clear Browser Cache:**
- Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- Clear all browser data for localhost

**D. Reinstall Font Package:**
```bash
cd frontend
rm -rf node_modules/@fontsource
npm install @fontsource/sarabun
```

### 5. Production Deployment Notes

The font is bundled with the application via `@fontsource/sarabun`, so:
- ✅ No additional environment variables needed
- ✅ No CDN dependencies in production
- ✅ Works offline after initial page load
- ✅ No CORS issues (font is bundled)

### 6. Code Changes Made

**File:** `frontend/lib/utils/pdfFont.ts`
- Added import for `@fontsource/sarabun`
- Implemented 3-tier fallback strategy
- Added helper function `getFontName()`
- Improved error logging

**File:** `frontend/components/products/PriceTable.tsx`
- Updated import to include `getFontName`
- Uses `getFontName(lang)` for font selection

### 7. Alternative Solutions (If This Fails)

**Option A: Use TTF Instead of WOFF2**
```bash
# Install TTF version
npm install @fontsource/sarabun@4.5.0  # Older version has TTF
```

**Option B: Base64 Embedded Font**
Create `.env.local` with:
```bash
NEXT_PUBLIC_THAI_FONT_BASE64="<base64-encoded-font>"
```
Generate with: `node scripts/generate-font-base64.js`

**Option C: Different PDF Library**
Consider `pdfkit` or `react-pdf` which handle Unicode better:
```bash
npm install pdfkit
```

### 8. Testing Checklist

- [ ] Dev server starts without errors
- [ ] Navigate to `/th/price-list` successfully
- [ ] Export PDF button works
- [ ] Console shows "Thai font loaded" success message
- [ ] Thai text displays correctly in PDF
- [ ] English text displays correctly in PDF
- [ ] PDF layout is correct (tables, headers, footers)
- [ ] File size is reasonable (< 1MB for typical price list)

### 9. Known Issues

1. **WOFF2 vs TTF:** jsPDF prefers TTF format, but WOFF2 should work. If not, switch to TTF.
2. **Font Subset:** The Thai-only subset is ~10KB. Full font would be ~200KB.
3. **Mobile Devices:** Test on actual mobile devices (not just DevTools mobile emulation)

### 10. Next Steps

If this solution works:
1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on production build (`npm run build && npm start`)
3. Consider adding loading state for PDF generation
4. Add error boundary for PDF export failures

If this solution fails:
1. Try Option A (TTF format)
2. Try Option B (Base64 embedded)
3. Consider switching to `pdfkit` library

## Contact & Support

For issues with PDF export:
1. Check browser console for error messages
2. Verify `@fontsource/sarabun` is installed
3. Check Network tab for failed font requests
4. Review this document's troubleshooting section
