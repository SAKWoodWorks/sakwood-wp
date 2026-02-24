/**
 * Generate base64 encoded Thai font for PDF export
 * Run this script to update the base64 font in .env.local
 *
 * Usage: node scripts/generate-font-base64.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Try multiple sources for the Sarabun font
const FONT_SOURCES = [
  'https://raw.githubusercontent.com/googlefonts/sarabun/main/fonts/ttf/Sarabun-Regular.ttf',
  'https://github.com/googlefonts/sarabun/raw/main/fonts/ttf/Sarabun-Regular.ttf',
  'https://cdn.jsdelivr.net/gh/googlefonts/sarabun@main/fonts/ttf/Sarabun-Regular.ttf',
];

function downloadFont(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const chunks = [];
          response.on('data', (chunk) => chunks.push(chunk));
          response.on('end', () => resolve(Buffer.concat(chunks)));
        } else {
          reject(new Error(`Failed to download: ${response.statusCode}`));
        }
      })
      .on('error', reject);
  });
}

async function main() {
  console.log('🔍 Searching for Sarabun font...');

  let fontBuffer = null;
  let source = '';

  // Try each source
  for (const url of FONT_SOURCES) {
    try {
      console.log(`  Trying: ${url}`);
      fontBuffer = await downloadFont(url);
      source = url;
      console.log('  ✅ Successfully downloaded!');
      break;
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
    }
  }

  if (!fontBuffer) {
    console.error('\n❌ Error: Could not download font from any source');
    process.exit(1);
  }

  // Convert to base64
  console.log('\n🔄 Converting to base64...');
  const base64 = fontBuffer.toString('base64');
  console.log(`  Font size: ${(fontBuffer.length / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Base64 size: ${(base64.length / 1024 / 1024).toFixed(2)} MB`);

  // Save to .env.local
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = `# Thai Font for PDF Export (base64 encoded)\n# Generated from: ${source}\nNEXT_PUBLIC_THAI_FONT_BASE64="${base64}"\n`;

  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ Success!');
  console.log(`\n📝 Base64 font saved to: ${envPath}`);
  console.log('\n⚠️  Important notes:');
  console.log('   - This file is already in .gitignore (safe for local development)');
  console.log('   - For production, add NEXT_PUBLIC_THAI_FONT_BASE64 to your deployment environment variables');
  console.log('   - The font will be automatically loaded by the PDF export function');
}

main().catch(console.error);
