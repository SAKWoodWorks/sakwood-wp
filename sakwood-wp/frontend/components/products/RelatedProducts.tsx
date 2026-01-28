import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import { Product } from '@/lib/types';

interface RelatedProductsProps {
  products: Product[];
  lang: Locale;
  dictionary: {
    product: {
      related_title: string;
      view_details: string;
    };
    common: {
      view_all: string;
    };
  };
}

export function RelatedProducts({ products, lang, dictionary }: RelatedProductsProps) {
  const { product: dict, common } = dictionary;

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="pt-8" aria-labelledby="related-products-heading">
      <div className="flex justify-between items-center mb-8">
        <h2
          id="related-products-heading"
          className="text-2xl font-bold text-blue-900"
        >
          {dict.related_title}
        </h2>
        <Link
          href={`/${lang}/shop`}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
        >
          {common.view_all}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${lang}/products/${product.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                {product.image?.sourceUrl ? (
                  <img
                    src={product.image.sourceUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-blue-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {product.name}
                </h3>
                {product.price && (
                  <p className="text-blue-600 font-bold">
                    {product.price}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
