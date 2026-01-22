import type { Locale } from '@/i18n-config';

interface PartnersSectionProps {
  lang: Locale;
  dictionary: {
    home: {
      partners_title: string;
      partners_subtitle: string;
    };
  };
}

export function PartnersSection({ lang, dictionary }: PartnersSectionProps) {
  const { home } = dictionary;

  const PARTNERS = [
    'SCG', 'TOA', 'Beger', 'Hafele', 'Makita', 'Bosch'
  ];

  return (
    <section className="py-12 border-t border-slate-100 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-8">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {PARTNERS.map((partner, index) => (
            <span key={index} className="text-2xl font-black text-slate-400 hover:text-blue-800 cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
