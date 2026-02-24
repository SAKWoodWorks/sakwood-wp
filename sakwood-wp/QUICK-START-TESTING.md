# Quick Start: Testing Thai Font PDF Export

## Problem Fixed

Thai text in PDF exports was showing as alien/gibberish characters. This is now FIXED.

## How to Test (2 Minutes)

### 1. Start the Application

```bash
cd frontend
npm run dev
```

Wait for: `✓ Ready in Xms` (server runs on port 3001)

### 2. Open Price List Page

**In your browser:**
```
http://localhost:3001/th/price-list
```

### 3. Open Browser Console

**Windows/Linux:** Press `F12` or `Ctrl+Shift+J`
**Mac:** Press `Cmd+Option+J`

Click on the "Console" tab

### 4. Export PDF

1. Click the blue **"ส่งออก PDF"** button (top right)
2. Watch the console for: `✅ Thai font loaded from local /fonts/ directory`
3. PDF will download automatically

### 5. Verify PDF

Open the downloaded PDF file and check:
- ✅ Thai product names are readable (not gibberish)
- ✅ Table headers show Thai text correctly
- ✅ Footer text is in Thai
- ✅ Numbers and prices display correctly

## Expected Console Output

**SUCCESS:**
```
✅ Thai font loaded from local /fonts/ directory
```

**FALLBACK (if local fails):**
```
⚠️ Local font fetch failed: [error]
✅ Thai font loaded from Google Fonts
```

**FAILURE (all strategies exhausted):**
```
❌ All font loading strategies failed - Thai text may not display correctly
```

## Troubleshooting

### Thai text still shows as gibberish?

**1. Check console for errors:**
   - Look for red error messages
   - Note which font loading strategy worked (if any)

**2. Clear browser cache:**
   - Chrome: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or: DevTools → Application → Clear storage → Clear site data

**3. Verify font file exists:**
   ```bash
   ls -lh frontend/public/fonts/sarabun-thai-400-normal.woff2
   # Should show ~9.7 KB file size
   ```

**4. Check Network tab:**
   - Open DevTools → Network tab
   - Click "Export PDF" button
   - Look for `sarabun-thai-400-normal.woff2` request
   - Should show Status: 200 (green)

**5. Reinstall font:**
   ```bash
   cd frontend
   npm install @fontsource/sarabun
   cp node_modules/@fontsource/sarabun/files/sarabun-thai-400-normal.woff2 public/fonts/
   npm run dev
   ```

### PDF doesn't download?

1. Check pop-up blocker isn't blocking the download
2. Look for console errors
3. Try a different browser

### Font file missing?

```bash
# Install the font package
cd frontend
npm install @fontsource/sarabun

# Copy font to public directory
cp node_modules/@fontsource/sarabun/files/sarabun-thai-400-normal.woff2 public/fonts/

# Verify file exists
ls -lh public/fonts/sarabun-thai-400-normal.woff2
```

## What Was Fixed

**Before:**
- Font loading failed with fetch errors
- Thai text appeared as: `??????` or alien characters
- No fallback mechanism

**After:**
- Font loads from local file (most reliable)
- 3-tier fallback system (local → Google Fonts → UNZCDN)
- Detailed console logging for debugging
- Thai text displays correctly

## Files Changed

1. `frontend/lib/utils/pdfFont.ts` - Font loading logic
2. `frontend/components/products/PriceTable.tsx` - PDF generation
3. `frontend/public/fonts/sarabun-thai-400-normal.woff2` - Thai font file
4. `frontend/package.json` - Added @fontsource/sarabun dependency

## Technical Details

**Font:** Sarabun (official Thai government font)
**Size:** 9.7 KB (Thai character subset)
**Format:** WOFF2
**Location:** Served from `/fonts/` directory
**Fallback:** Google Fonts CDN

## Testing Checklist

- [ ] Dev server starts without errors
- [ ] Navigate to `/th/price-list`
- [ ] Console shows "Thai font loaded" success message
- [ ] PDF downloads successfully
- [ ] Thai text is readable in PDF
- [ ] Product names display correctly
- [ ] Headers and footers are correct
- [ ] Test on Chrome/Firefox/Safari
- [ ] Test on mobile device

## Next Steps

If everything works:
1. ✅ Testing complete
2. Ready for production deployment
3. Monitor console for any errors

If something doesn't work:
1. Check the "Troubleshooting" section above
2. Review browser console for specific errors
3. Check Network tab for failed requests
4. See `THAI-FONT-FIX-SUMMARY.md` for detailed technical info

## Additional Resources

- **Full Documentation:** `THAI-FONT-FIX-SUMMARY.md`
- **Testing Guide:** `frontend/TEST-PDF-FONT.md`
- **Fonts README:** `frontend/public/fonts/README.md`

---

**Questions?** Check the main summary document for detailed technical information.

**Last Updated:** 2025-02-17
**Status:** ✅ Ready for Testing
