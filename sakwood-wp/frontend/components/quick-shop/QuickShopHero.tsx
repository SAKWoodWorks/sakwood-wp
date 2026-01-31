import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n-config';

interface QuickShopHeroProps {
  lang: Locale;
  dictionary: {
    quick_shop?: {
      hero_title?: string;
      hero_subtitle?: string;
      hero_cta_primary?: string;
      hero_cta_secondary?: string;
    };
  };
}

export function QuickShopHero({ lang, dictionary }: QuickShopHeroProps) {
  const dict = dictionary.quick_shop || {};

  const title = dict.hero_title || (lang === 'th'
    ? 'ไม้คุณภาพสูงสำหรับโครงการของคุณ'
    : 'Premium Wood for Your Projects');

  const subtitle = dict.hero_subtitle || (lang === 'th'
    ? 'จัดส่งทั่วประเทศไทย • ราคาส่ง'
    : 'Fast delivery across Thailand • Wholesale prices');

  const ctaPrimary = dict.hero_cta_primary || (lang === 'th' ? 'ช้อปเลย' : 'Shop Now');
  const ctaSecondary = dict.hero_cta_secondary || (lang === 'th' ? 'ขอราคา' : 'Get Quote');

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white" aria-labelledby="quick-shop-hero-heading">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1544571901-2656599c365c?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/90" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-4xl mx-auto">
          <h1 id="quick-shop-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-10 font-light">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#products"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
            >
              {ctaPrimary} →
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold text-lg rounded-lg transition-all duration-300 text-center"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'th' ? '500+ โครงการสำเร็จ' : '500+ Projects Completed'}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'th' ? 'จัดส่งทั่ว 77 จังหวัด' : '77 Provinces Delivered'}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {lang === 'th' ? 'ราคาส่งตั้งแต่ 1 แผ่น' : 'Wholesale from 1 sheet'}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
