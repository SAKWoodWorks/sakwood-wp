import Link from 'next/link';
import { getProducts } from '@/lib/services/productService';
import type { Locale } from '@/i18n-config';
import { ProductCardWithCompare } from './ProductCardWithCompare';

interface ProductSectionProps {
  lang: Locale;
  dictionary: {
    home: {
      products_new: string;
      products_title: string;
      products_view_all: string;
      loading: string;
    };
    compare?: {
      add_to_compare: string;
      added: string;
      max_items: string;
    };
  };
}

export async function ProductSection({ lang, dictionary }: ProductSectionProps) {
  const products = await getProducts(lang);
  const { home } = dictionary;

  return (
    <section
      className="bg-slate-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 text-slate-800"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-6 sm:mb-8 lg:mb-12 border-b border-slate-200 pb-4 sm:pb-6">
          <div>
            <span className="text-blue-600 font-bold tracking-wider uppercase text-xs sm:text-sm">{home.products_new}</span>
            <h2
              id="products-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 uppercase text-slate-900"
            >
              {home.products_title}
            </h2>
          </div>
          <Link
            href={`/${lang}/shop`}
            className="hidden md:inline-block px-4 sm:px-6 py-2 sm:py-3 border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-colors uppercase text-xs sm:text-sm font-bold tracking-wide"
            aria-label={home.products_view_all}
          >
            {home.products_view_all} →
          </Link>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list" aria-label="Featured wood products">
            {products.map((product, index) => (
              <ProductCardWithCompare
                key={product.id}
                product={product}
                lang={lang}
                index={index}
                dictionary={dictionary}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 text-center max-w-2xl mx-auto border border-blue-100 shadow-lg" role="status">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6" aria-hidden="true">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              {lang === 'th' ? 'ไม่พบสินค้า' : 'No Products Found'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {lang === 'th'
                ? 'ไม่มีสินค้าภาษาอังกฤษในขณะนี้'
                : 'No English products available at the moment'}
            </p>
            <Link
              href={`/${lang === 'th' ? '/en' : '/th'}/shop`}
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-bold uppercase tracking-wide rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
            >
              {lang === 'th' ? 'ดูสินค้าภาษาไทย' : 'View Thai Products'}
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-6 sm:mt-8 lg:mt-12 text-center md:hidden">
            <Link
              href={`/${lang}/shop`}
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-bold uppercase tracking-wide text-xs sm:text-sm"
              aria-label={home.products_view_all}
            >
              {home.products_view_all}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
