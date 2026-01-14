import { getProducts } from '@/lib/services/productService';
import { ProductCard } from '@/components/ui';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface ShopPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { lang } = await params;
  const [products, dictionary] = await Promise.all([
    getProducts(),
    getDictionary(lang),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {lang === 'th' ? 'ร้านค้า' : 'Shop'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {lang === 'th'
              ? 'ค้นหาสินค้าไม้คุณภาพสูงสำหรับโครงการของคุณ'
              : 'Find high-quality wood products for your projects'}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {lang === 'th' ? 'ไม่พบสินค้า' : 'No products found'}
            </h3>
            <p className="text-gray-500">
              {lang === 'th'
                ? 'ขณะนี้ยังไม่มีสินค้าในร้านค้า'
                : 'There are no products available at the moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
