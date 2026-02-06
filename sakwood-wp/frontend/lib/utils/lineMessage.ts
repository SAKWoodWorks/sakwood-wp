/**
 * LINE Message Generator
 * Generates LINE URLs with pre-filled messages for cart and product inquiries
 */

import type { Locale } from '@/i18n-config';
import { defaultChatConfig } from '@/lib/config/chatConfig';

export interface CartItem {
  id: string | number;
  name: string;
  price?: string;
  quantity: number;
}

export interface Product {
  name: string;
  price?: string;
  slug?: string;
  [key: string]: string | number | undefined | boolean;
}

/**
 * Format price for display in LINE message
 */
function formatPrice(priceStr: string, locale: Locale): string {
  // Remove currency symbol and format
  const price = priceStr.replace(/[^\d.,]/g, '');
  if (locale === 'th') {
    return `${price} บาท`;
  }
  return `฿${price}`;
}

/**
 * Build cart items list for LINE message
 */
function buildCartItemsList(items: CartItem[], maxItems: number = 10): string {
  const visibleItems = items.slice(0, maxItems);

  const itemList = visibleItems.map(item => {
    const price = item.price ? formatPrice(item.price, 'th') : 'ราคาพิเศษ (Price on request)';
    return `- ${item.name} (x${item.quantity}) - ${price}`;
  });

  let result = itemList.join('\n');

  // Add "and X more items" if there are more items
  if (items.length > maxItems) {
    result += `\n- ...and ${items.length - maxItems} more items`;
  }

  return result;
}

/**
 * Generate LINE URL for cart inquiry
 * Uses LINE Official Account format with pre-filled message
 */
export function generateCartLineMessage(
  items: CartItem[],
  total: number,
  lang: Locale
): string {
  if (!items || items.length === 0) {
    // No items, just open LINE chat
    const lineId = defaultChatConfig.platforms.line.url.replace('@', '');
    return `https://line.me/R/ti/p/@${lineId}`;
  }

  // Build message based on language
  let message: string;

  if (lang === 'th') {
    // Thai message
    message = `สวัสดีครับ/ค่ะ ทาง SAK WoodWorks,

สนใจสั่งซื้อสินค้าดังนี้:
${buildCartItemsList(items)}

ยอดรวม: ${formatPrice(total.toFixed(2), 'th')}

กรุณาแจ้งราคาที่แม่นยำและค่าจัดส่งด้วยครับ/ค่ะ
ขอบคุณครับ/ค่ะ`;
  } else {
    // English message
    message = `Hello SAK WoodWorks,

I'm interested in ordering:
${buildCartItemsList(items)}

Cart Total: ${formatPrice(total.toFixed(2), 'en')}

Please provide a quote with current pricing and delivery information.
Thank you!`;
  }

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Generate LINE URL for Official Account
  // LINE OA format: https://line.me/R/oaMessage/{account_id}/?text={encoded_message}
  const lineId = defaultChatConfig.platforms.line.url.replace('@', '');
  return `https://line.me/R/oaMessage/${lineId}/?text=${encodedMessage}`;
}

/**
 * Generate LINE URL for single product inquiry
 * Uses LINE Official Account format with pre-filled message
 */
export function generateProductLineMessage(
  product: Product,
  lang: Locale
): string {
  const price = product.price ? formatPrice(product.price, 'th') : 'ราคาพิเศษ (Price on request)';

  let message: string;

  if (lang === 'th') {
    // Thai message
    message = `สวัสดีครับ/ค่ะ ทาง SAK WoodWorks,

สนใจสินค้า: ${product.name}
${price}

กรุณาแจ้งรายละเอียดและราคาด้วยครับ/ค่ะ
ขอบคุณครับ/ค่ะ`;
  } else {
    // English message
    message = `Hello SAK WoodWorks,

I'm interested in: ${product.name}
Price: ${price}

Please provide more information about this product.
Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);

  // Generate LINE URL for Official Account
  // LINE OA format: https://line.me/R/oaMessage/{account_id}/?text={encoded_message}
  const lineId = defaultChatConfig.platforms.line.url.replace('@', '');
  return `https://line.me/R/oaMessage/${lineId}/?text=${encodedMessage}`;
}
