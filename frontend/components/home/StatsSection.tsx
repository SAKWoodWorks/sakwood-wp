import type { Locale } from '@/i18n-config';

interface StatsSectionProps {
  lang: Locale;
  dictionary: {
    stats: {
      heading: string;
      experience: string;
      projects: string;
      quality: string;
      delivery: string;
    };
  };
}

export function StatsSection({ lang, dictionary }: StatsSectionProps) {
  const { stats } = dictionary;

  return (
    <section
      className="bg-blue-600 py-12 relative z-20 text-white"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 id="stats-heading" className="sr-only">{stats.heading}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500/50" role="list" aria-label="Our achievements">
          <div role="listitem">
            <h3 className="text-4xl font-extrabold">25+</h3>
            <p className="text-blue-100 font-medium uppercase text-sm mt-1">{stats.experience}</p>
          </div>
          <div role="listitem">
            <h3 className="text-4xl font-extrabold">500+</h3>
            <p className="text-blue-100 font-medium uppercase text-sm mt-1">{stats.projects}</p>
          </div>
          <div role="listitem">
            <h3 className="text-4xl font-extrabold">100%</h3>
            <p className="text-blue-100 font-medium uppercase text-sm mt-1">{stats.quality}</p>
          </div>
          <div role="listitem">
            <h3 className="text-4xl font-extrabold">24h</h3>
            <p className="text-blue-100 font-medium uppercase text-sm mt-1">{stats.delivery}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
