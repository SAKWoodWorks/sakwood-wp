import { graphqlRequest } from '@/lib/graphql/client';
import { GET_MENU_QUERY } from '@/lib/graphql/queries';
import { MenuItem } from '@/lib/types';

interface MenuData {
  menuItems: {
    nodes: MenuItem[];
  };
}

// Fallback menu items when WordPress API is not available
const FALLBACK_MENU: MenuItem[] = [
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
    path: '/quote',
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

export async function getMenu(location: string = 'PRIMARY'): Promise<MenuItem[]> {
  try {
    const data = await graphqlRequest<MenuData>(GET_MENU_QUERY, { location });
    
    if (!data || !data.menuItems || !data.menuItems.nodes) {
      console.warn('Menu data not found, using fallback menu');
      return FALLBACK_MENU;
    }

    const nodes = data.menuItems.nodes;
    
    // Build hierarchical menu structure
    const buildMenuTree = (items: MenuItem[], parentId: string | null = null): MenuItem[] => {
      return items
        .filter((item) => item.parentId === parentId)
        .map((item) => ({
          ...item,
          children: buildMenuTree(items, item.id),
        }))
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    };
    
    const menuTree = buildMenuTree(nodes);
    
    // If menu is empty, use fallback
    if (menuTree.length === 0) {
      console.warn('Menu is empty, using fallback menu');
      return FALLBACK_MENU;
    }
    
    return menuTree;
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    return FALLBACK_MENU;
  }
}
