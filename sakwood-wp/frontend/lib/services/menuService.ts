import { MenuItem } from '@/lib/types';

// WordPress REST API base URL
const RAW_BASE_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json';
const BASE_URL = RAW_BASE_URL;

// Fallback menu items
const FALLBACK_MENU: MenuItem[] = [
  { id: '1', label: 'Home', path: '/', order: 1 },
  { id: '2', label: 'Shop', path: '/products', order: 2 },
  { id: '3', label: 'Request Quote', path: '/quote-request', order: 3 },
  { id: '4', label: 'Blog', path: '/blog', order: 4 },
  { id: '5', label: 'About', path: '/about', order: 5 },
  { id: '6', label: 'Contact', path: '/contact', order: 6 },
];

export async function getMenu(locale: string = 'th'): Promise<MenuItem[]> {
  try {
    if (locale !== 'th' && locale !== 'en') {
      locale = 'th';
    }

    console.log('[menuService] Fetching menu from:', `${BASE_URL}/sakwood/v1/menu?lang=${locale}`);

    const response = await fetch(`${BASE_URL}/sakwood/v1/menu?lang=${locale}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch menu: ${response.statusText}`);
    }

    const data: MenuItem[] = await response.json();

    if (!data || data.length === 0) {
      return FALLBACK_MENU;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    return FALLBACK_MENU;
  }
}
