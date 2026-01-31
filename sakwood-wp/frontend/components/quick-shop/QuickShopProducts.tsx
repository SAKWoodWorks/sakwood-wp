import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/services/productService';
import type { Locale } from '@/i18n-config';

interface QuickShopProductsProps {
  lang: Locale;
  dictionary: {
    quick_shop?: {
      products_title?: string;
      products_subtitle?: string;
      view_all?: string;
    };
    product?: {
      add_to_cart?: string;
      request_quote?: string;
    };
  };
}

export async function QuickShopProducts({ lang, dictionary }: QuickShopProductsProps) {
  const products = await getFeaturedProducts(lang, 6);
  const dict = dictionary.quick_shop || {};

  const title = dict.products_title || (lang === 'th' ? 'สินค้าขายดี' : 'Best Sellers');
  const subtitle = dict.products_subtitle || (lang === 'th'
    ? 'ไม้คุณภาพสูงที่ลูกค้าชื่นชอบ'
    : 'Premium wood products trusted by our customers');
  const viewAll = dict.view_all || (lang === 'th' ? 'ดูทั้งหมด' : 'View All');

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-900 text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
            {lang === 'th' ? 'แนะนำ' : 'Featured'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {products.map((product: any, index: number) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <Link href={`/${lang}/products/${product.slug}`}>
                      <Image
                        src={product.image?.sourceUrl || '/placeholder.jpg'}
                        alt={product.image?.altText || product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <Link href={`/${lang}/products/${product.slug}`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p
                      className="text-slate-600 text-sm mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                    />

                    {/* Price */}
                    <div className="mb-4">
                      {product.regularPrice && product.regularPrice !== product.price && (
                        <span className="text-slate-400 line-through text-sm mr-2">
                          {product.regularPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-blue-600">
                        {product.price}
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/${lang}/products/${product.slug}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                      >
                        {lang === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                href={`/${lang}/shop`}
                className="inline-block px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {viewAll} →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">
              {lang === 'th' ? 'ไม่พบสินค้า' : 'No products found'}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
