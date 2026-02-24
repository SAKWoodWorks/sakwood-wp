import Link from 'next/link';
import { getProducts } from '@/lib/services/productService';
import type { Locale } from '@/i18n-config';
import { ProductCardWithCompare } from './ProductCardWithCompare';

interface SaleProductsSectionProps {
  lang: Locale;
  dictionary: {
    home?: {
      sale_products?: string;
      sale_products_title?: string;
      sale_products_subtitle?: string;
      products_view_all: string;
    };
    compare?: {
      add_to_compare: string;
      added: string;
      max_items: string;
    };
  };
}

export async function SaleProductsSection({ lang, dictionary }: SaleProductsSectionProps) {
  const productsData = await getProducts(lang);

  // Filter products that are on sale (have both price and regularPrice, and they're different)
  const saleProducts = productsData.products.filter(product => {
    if (!product.price || !product.regularPrice) return false;

    // Extract numeric values from price strings (e.g., "1,200.00฿" -> 1200.00)
    const extractPrice = (priceStr: string) => {
      return parseFloat(priceStr.replace(/[^\d.]/g, '') || '0');
    };

    const price = extractPrice(product.price);
    const regularPrice = extractPrice(product.regularPrice);

    // Product is on sale if regular price is higher than current price
    return regularPrice > price && price > 0;
  });

  // Take only first 4 sale products for homepage
  const displayProducts = saleProducts.slice(0, 4);

  const dict = dictionary.home || {};

  return (
    <>
      {displayProducts.length > 0 && (
        <>
          {/* Section Separator */}
          <div className="relative py-12 sm:py-16 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto text-center px-4">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                </svg>
                <span className="text-lg sm:text-xl font-bold text-gray-800">
                  {lang === 'th' ? 'โปรโมชั่นพิเศษ' : 'Special Sale Section'}
                </span>
                <div className="h-6 w-px bg-gray-300"></div>
                <span className="text-gray-600">
                  {lang === 'th' ? 'สินค้าราคาพิเศษเฉพาะลูกค้าคนสำคัญ' : 'Exclusive offers for valued customers'}
                </span>
              </div>
            </div>
          </div>

          <section
            className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
            aria-labelledby="sale-products-heading"
          >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto relative">
            {/* Header with badge */}
            <header className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-bold uppercase tracking-wider mb-4 animate-pulse">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                </svg>
                {dict.sale_products || (lang === 'th' ? 'โปรโมชั่น' : 'Special Offer')}
              </div>
              <h2
                id="sale-products-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4"
              >
                {dict.sale_products_title || (lang === 'th' ? 'สินค้าราคาพิเศษ' : 'Sale Products')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                {dict.sale_products_subtitle || (
                  lang === 'th'
                    ? 'สินค้าคุณภาพดีในราคาพิเศษเพื่อลูกค้าคนสำคัญ'
                    : 'High-quality products at special prices for our valued customers'
                )}
              </p>
            </header>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12" role="list" aria-label="Products on sale">
              {displayProducts.map((product, index) => (
                <ProductCardWithCompare
                  key={product.id}
                  product={product}
                  lang={lang}
                  index={index}
                  dictionary={dictionary}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                href={`/${lang}/shop`}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide rounded-lg shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                aria-label={dict.products_view_all}
              >
                {dict.products_view_all}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        </>
      )}
    </>
  );
}
