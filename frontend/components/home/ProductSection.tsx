import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/services/productService';
import type { Locale } from '@/i18n-config';

interface ProductSectionProps {
  lang: Locale;
  dictionary: {
    home: {
      products_new: string;
      products_title: string;
      products_view_all: string;
      loading: string;
    };
  };
}

export async function ProductSection({ lang, dictionary }: ProductSectionProps) {
  const products = await getProducts();
  const { home } = dictionary;

  return (
    <section
      className="bg-slate-50 py-24 px-6 text-slate-800"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-6">
          <div>
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">{home.products_new}</span>
            <h2
              id="products-heading"
              className="text-3xl md:text-4xl font-extrabold mt-2 uppercase text-slate-900"
            >
              {home.products_title}
            </h2>
          </div>
          <Link
            href={`/${lang}/shop`}
            className="hidden md:inline-block px-6 py-3 border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-colors uppercase text-sm font-bold tracking-wide"
            aria-label={home.products_view_all}
          >
            {home.products_view_all} →
          </Link>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Featured wood products">
            {products.map((product) => (
              <article key={product.id} role="listitem">
                <Link
                  href={`/${lang}/products/${product.slug}`}
                  className="group block bg-white border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  aria-label={`View details for ${product.name}`}
                >
                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-all z-10" aria-hidden="true"></div>
                    {product.image?.sourceUrl ? (
                      <Image
                        src={product.image.sourceUrl}
                        alt={`${product.name} - Premium wood product`}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full group-hover:scale-110 transition duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400" aria-hidden="true">
                        <span className="text-4xl mb-2">📦</span>
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 z-20 bg-blue-600 text-white text-xs font-bold px-2 py-1 uppercase">
                      In Stock
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 border-t-4 border-transparent group-hover:border-blue-600 transition-all bg-white">
                    <h3 className="font-bold text-lg mb-2 truncate text-slate-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-slate-500 text-sm">Starting at</span>
                      <span className="text-xl font-bold text-blue-900">
                        {product.price || "Contact"}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center max-w-2xl mx-auto border border-blue-100 shadow-lg" role="alert">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Connection Failed
            </h3>
            <p className="text-gray-600 mb-6">
              Unable to connect to WordPress backend. Please ensure:
            </p>
            <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1" aria-hidden="true">•</span>
                <span><strong>WPGraphQL</strong> plugin is installed and activated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1" aria-hidden="true">•</span>
                <span><strong>WPGraphQL WooCommerce</strong> plugin is installed and activated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1" aria-hidden="true">•</span>
                <span>WordPress container is running and accessible</span>
              </li>
            </ul>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>API URL:</strong> http://sak_wp:80/graphql
              </p>
            </div>
          </div>
        )}
        
        {products.length > 0 && (
          <div className="mt-12 text-center md:hidden">
            <Link
              href={`/${lang}/shop`}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-bold uppercase tracking-wide"
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
