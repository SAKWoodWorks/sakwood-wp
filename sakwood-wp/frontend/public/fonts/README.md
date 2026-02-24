# Fonts Directory

This directory contains font files used by the Sakwood application.

## Thai Font for PDF Export

**File:** `sarabun-thai-400-normal.woff2`
- **Source:** @fontsource/sarabun package
- **Purpose:** PDF export functionality for Thai language
- **Size:** ~9.7 KB (Thai character subset)
- **Usage:** Loaded dynamically by `lib/utils/pdfFont.ts` when exporting PDFs

## How to Update

If you need to update this font:

1. Update the npm package:
   ```bash
   npm install @fontsource/sarabun@latest
   ```

2. Copy the new font file:
   ```bash
   cp node_modules/@fontsource/sarabun/files/sarabun-thai-400-normal.woff2 public/fonts/
   ```

3. Test PDF export on the price-list page

## Font Details

- **Font Family:** Sarabun
- **Designer:** Suppakit Chalermlarp
- **License:** SIL Open Font License 1.1
- **Characters:** Thai script + Latin subset
- **Weight:** 400 (Regular)
- **Style:** Normal

## About Sarabun Font

Sarabun is the official Thai font family used by Thai government agencies. It was designed to be highly readable and supports both Thai and Latin scripts.

For more information: https://fonts.google.com/specimen/Sarabun
