import { getProducts, getProductCategories } from '@/lib/services/productService';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import type { ProductSortBy } from '@/lib/types';
import { ShopPage as ShopPageComponent } from './ShopPage';

interface ShopPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

// Revalidate this page every 3 minutes (180 seconds)
export const revalidate = 180;

export default async function ShopPage({ params, searchParams }: ShopPageProps) {
  const { lang } = await params;
  const { category: categorySlug, sort: sortParam } = await searchParams;

  const [products, categories, dictionary] = await Promise.all([
    getProducts(lang, categorySlug, sortParam as ProductSortBy | undefined),
    getProductCategories(),
    getDictionary(lang),
  ]);

  return (
    <ShopPageComponent
      lang={lang}
      dictionary={dictionary}
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
