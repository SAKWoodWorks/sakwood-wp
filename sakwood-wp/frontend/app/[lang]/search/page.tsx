import { redirect } from 'next/navigation';
import { getDictionary } from '@/lib/get-dictionary';
import { searchProducts } from '@/lib/services/searchService';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n-config';
import { SearchResults } from '@/components/search/SearchResults';

interface SearchPageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isThai = lang === 'th';

  return {
    title: isThai ? 'ค้นหาสินค้า | Sakwood' : 'Search Products | Sakwood',
    description: isThai
      ? 'ค้นหาสินค้าไม้คุณภาพจาก Sakwood'
      : 'Search for premium wood products from Sakwood',
  };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { lang } = await params;
  const { q: searchQuery } = await searchParams;

  // Redirect if no search query
  if (!searchQuery) {
    redirect(`/${lang}`);
  }

  const dictionary = await getDictionary(lang as Locale);

  // Search for products
  const searchResults = await searchProducts(searchQuery, lang);

  return (
    <SearchResults
      lang={lang as Locale}
      dictionary={dictionary}
      searchQuery={searchQuery}
      initialResults={searchResults}
    />
  );
}
