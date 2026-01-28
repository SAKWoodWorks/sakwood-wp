import Link from 'next/link';
import type { Locale } from '@/i18n-config';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  count: number;
}

interface CategoriesSectionProps {
  lang: Locale;
  dictionary: {
    home?: {
      categories_title?: string;
      categories_subtitle?: string;
      browse_all?: string;
    };
    categories?: {
      title: string;
      subtitle: string;
      browse_all: string;
      browse_products: string;
    };
  };
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Pine Wood',
    slug: 'pine-wood',
    image: 'https://images.unsplash.com/photo-1544571901-2656599c365c?w=600&q=80',
    icon: '🌲',
    count: 45
  },
  {
    id: '2',
    name: 'Plywood',
    slug: 'plywood',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    icon: '📋',
    count: 32
  },
  {
    id: '3',
    name: 'Construction Timber',
    slug: 'construction-timber',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    icon: '🏗️',
    count: 28
  },
  {
    id: '4',
    name: 'Marine Plywood',
    slug: 'marine-plywood',
    image: 'https://images.unsplash.com/photo-1567263827555-1f6e4b3a6b5e?w=600&q=80',
    icon: '⛵',
    count: 18
  },
  {
    id: '5',
    name: 'Film Faced Plywood',
    slug: 'film-faced-plywood',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
    icon: '🎬',
    count: 24
  },
  {
    id: '6',
    name: 'MDF Board',
    slug: 'mdf-board',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    icon: '🔲',
    count: 15
  }
];

export function CategoriesSection({ lang, dictionary }: CategoriesSectionProps) {
  const { home, categories: categoriesDict } = dictionary;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-900 text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
            Product Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {categoriesDict?.title || home?.categories_title || 'Browse by Category'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {categoriesDict?.subtitle || home?.categories_subtitle || 'Explore our wide range of premium wood products organized by category'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/${lang}/shop?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-64 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                  <div className="text-5xl mb-3 animate-bounce-slow">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {category.count} Products Available
                  </p>
                  <div className="flex items-center text-white font-semibold group-hover:text-blue-300 transition-colors">
                    <span className="mr-2">{categoriesDict?.browse_products || 'Browse Products'}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href={`/${lang}/shop`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            {categoriesDict?.browse_all || home?.browse_all || 'View All Products'}
          </Link>
        </div>
      </div>
    </section>
  );
}
