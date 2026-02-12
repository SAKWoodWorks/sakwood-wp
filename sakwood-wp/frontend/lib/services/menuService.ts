import { MenuItem } from '@/lib/types';

// WordPress REST API base URL - use server-side or fallback to client-side
// Remove /sakwood/v1 suffix if present to avoid double path
const RAW_BASE_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';
const BASE_URL = RAW_BASE_URL.replace(/\/sakwood\/v1$/, '');

// Fallback menu items for Thai language
const FALLBACK_MENU_TH: MenuItem[] = [
  {
    id: '1',
    label: 'หน้าแรก',
    path: '/',
    order: 1,
  },
  {
    id: '2',
    label: 'ร้านค้า',
    path: '/products',
    order: 2,
  },
  {
    id: '3',
    label: 'ขอใบเสนอราคา',
    path: '/quote-request',
    order: 3,
  },
  {
    id: '4',
    label: 'บล็อก',
    path: '/blog',
    order: 4,
  },
  {
    id: '5',
    label: 'เกี่ยวกับเรา',
    path: '/about',
    order: 5,
  },
  {
    id: '6',
    label: 'ติดต่อเรา',
    path: '/contact',
    order: 6,
  },
];

// Fallback menu items for English language
const FALLBACK_MENU_EN: MenuItem[] = [
  {
    id: '1',
    label: 'Home',
    path: '/',
    order: 1,
  },
  {
    id: '2',
    label: 'Shop',
    path: '/shop',
    order: 2,
  },
  {
    id: '3',
    label: 'Request Quote',
    path: '/quote-request',
    order: 3,
  },
  {
    id: '4',
    label: 'Blog',
    path: '/blog',
    order: 4,
  },
  {
    id: '5',
    label: 'About',
    path: '/about',
    order: 5,
  },
  {
    id: '6',
    label: 'Contact',
    path: '/contact',
    order: 6,
  },
];

/**
 * Get menu items based on locale
 *
 * @param locale - Locale code ('th' or 'en')
 * @returns Promise<MenuItem[]> - Hierarchical menu structure
 */
export async function getMenu(locale: string = 'th'): Promise<MenuItem[]> {
  try {
    // Validate locale
    if (locale !== 'th' && locale !== 'en') {
      locale = 'th';
    }

    // Fetch menu from WordPress REST API
    const response = await fetch(`${BASE_URL}/sakwood/v1/menu?lang=${locale}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch menu: ${response.statusText}`);
    }

    const data: MenuItem[] = await response.json();

    // If menu is empty, use fallback
    if (!data || data.length === 0) {
      return locale === 'th' ? FALLBACK_MENU_TH : FALLBACK_MENU_EN;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    // Return fallback menu based on locale
    return locale === 'th' ? FALLBACK_MENU_TH : FALLBACK_MENU_EN;
  }
}
