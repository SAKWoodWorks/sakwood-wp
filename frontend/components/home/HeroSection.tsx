import Link from 'next/link';
import type { Locale } from '@/i18n-config';

interface HeroSectionProps {
  lang: Locale;
  dictionary: {
    hero: {
      badge: string;
      title: string;
      title_highlight: string;
      description: string;
      btn_catalog: string;
      btn_quote: string;
    };
  };
}

export function HeroSection({ lang, dictionary }: HeroSectionProps) {
  const { hero } = dictionary;

  return (
    <section
      className="relative min-h-[500px] h-[550px] sm:h-[600px] md:h-[700px] bg-blue-900 flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop')" }}
          role="img"
          aria-label="Premium wood products and timber materials"
        ></div>
        {/* Gradient Overlay for Blue Theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-blue-800/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="h-1 w-8 sm:w-12 bg-white" aria-hidden="true"></div>
            <span className="text-blue-200 font-bold tracking-widest uppercase text-xs sm:text-sm">
              {hero.badge}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-4 sm:mb-6"
          >
            {hero.title} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              {hero.title_highlight}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-lg border-l-2 sm:border-l-4 border-blue-400 pl-4 sm:pl-6">
            {hero.description}
          </p>

          <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero navigation">
            <Link
              href={`/${lang}/shop`}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-900 rounded-none font-bold hover:bg-blue-50 transition-all text-center uppercase tracking-wide text-sm sm:text-base skew-x-[-10deg]"
              aria-label={hero.btn_catalog}
            >
              <span className="block skew-x-[10deg]">{hero.btn_catalog}</span>
            </Link>
            <Link
              href={`/${lang}/quote`}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-300 text-blue-100 rounded-none font-bold hover:bg-blue-800 hover:text-white transition-all text-center uppercase tracking-wide text-sm sm:text-base skew-x-[-10deg]"
              aria-label={hero.btn_quote}
            >
              <span className="block skew-x-[10deg]">{hero.btn_quote}</span>
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
