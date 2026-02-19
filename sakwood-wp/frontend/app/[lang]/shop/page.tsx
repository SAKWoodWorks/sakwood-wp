import { getProducts } from '@/lib/services/productService';
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
    page?: string;
  }>;
}

// Revalidate this page every 3 minutes (180 seconds)
export const revalidate = 180;

export default async function ShopPage({ params, searchParams }: ShopPageProps) {
  const { lang } = await params;
  const { category: categorySlug, sort: sortParam, page: pageParam } = await searchParams;

  const currentPage = parseInt(pageParam || '1', 10);

  const [productsData, dictionary] = await Promise.all([
    getProducts(lang, categorySlug, sortParam as ProductSortBy | undefined, currentPage),
    getDictionary(lang),
  ]);

  return (
    <ShopPageComponent
      lang={lang}
      dictionary={dictionary}
      initialProducts={productsData.products}
      initialTotal={productsData.total}
    />
  );
}
