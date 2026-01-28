import Link from 'next/link';
import type { Locale } from '@/i18n-config';

interface AboutCTAProps {
  lang: Locale;
  dictionary: {
    about: {
      cta_title: string;
      cta_desc: string;
      cta_btn: string;
    };
  };
}

export function AboutCTA({ lang, dictionary }: AboutCTAProps) {
  const { about } = dictionary;

  return (
    <section className="py-20 bg-blue-900" aria-labelledby="about-cta-heading">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          id="about-cta-heading"
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          {about.cta_title}
        </h2>
        <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          {about.cta_desc}
        </p>
        <Link
          href={`/${lang}/shop`}
          className="inline-block px-10 py-4 bg-white text-blue-900 rounded-none font-bold hover:bg-blue-50 transition-all uppercase tracking-wide skew-x-[-10deg]"
          aria-label={about.cta_btn}
        >
          <span className="block skew-x-[10deg]">{about.cta_btn}</span>
        </Link>
      </div>
    </section>
  );
}
