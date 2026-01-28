import type { Locale } from '@/i18n-config';

interface FooterPartnersProps {
  lang: Locale;
}

export function FooterPartners({ lang }: FooterPartnersProps) {
  const PARTNERS = [
    { name: 'SCG', color: 'text-yellow-400' },
    { name: 'TOA', color: 'text-red-400' },
    { name: 'Beger', color: 'text-blue-300' },
    { name: 'Hafele', color: 'text-orange-400' },
    { name: 'Makita', color: 'text-teal-400' },
    { name: 'Bosch', color: 'text-green-400' }
  ];

  return (
    <div className="border-t border-blue-700/50 py-6 sm:py-8">
      <div className="text-center mb-4">
        <p className="text-blue-300 text-xs uppercase tracking-widest">
          {lang === 'th' ? 'พันธมิตร' : 'Trusted Partners'}
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
        {PARTNERS.map((partner, index) => (
          <span
            key={index}
            className={`text-lg sm:text-xl font-bold ${partner.color} opacity-70 hover:opacity-100 transition-opacity`}
          >
            {partner.name}
          </span>
        ))}
      </div>
    </div>
  );
}
