import Link from 'next/link';
import type { Locale } from '@/i18n-config';

interface CTABannerProps {
  lang: Locale;
  dictionary: {
    home: {
      cta_title: string;
      cta_desc: string;
      cta_btn: string;
      cta_line: string;
    };
  };
}

export function CTABanner({ lang, dictionary }: CTABannerProps) {
  const { home } = dictionary;

  return (
    <section 
      className="py-20 relative bg-blue-900 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" aria-hidden="true"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h2 
          id="cta-heading"
          className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight"
        >
          {home.cta_title}
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto font-medium">
          {home.cta_desc}
        </p>
        <nav className="flex flex-col sm:flex-row justify-center gap-4" aria-label="Call to action">
          <Link
            href={`/${lang}/quote`}
            className="px-10 py-4 bg-white text-blue-900 font-bold uppercase tracking-wider hover:bg-blue-50 transition shadow-xl rounded-sm"
            aria-label={home.cta_btn}
          >
            {home.cta_btn}
          </Link>
          <button 
            className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white/10 transition rounded-sm"
            aria-label={home.cta_line}
          >
            {home.cta_line}
          </button>
        </nav>
      </div>
    </section>
  );
}
