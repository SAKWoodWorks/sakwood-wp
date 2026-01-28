import type { Locale } from '@/i18n-config';

interface AboutHeroProps {
  lang: Locale;
  dictionary: {
    about: {
      hero_badge: string;
      hero_title: string;
      hero_subtitle: string;
    };
  };
}

export function AboutHero({ lang, dictionary }: AboutHeroProps) {
  const { about } = dictionary;

  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-blue-900 flex items-center overflow-hidden"
      aria-labelledby="about-hero-heading"
    >
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541123603104-512919d6a96c?q=80&w=2000&auto=format&fit=crop')" }}
          role="img"
          aria-label="Wood craftsmanship and timber materials"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-blue-800/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 w-12 bg-white" aria-hidden="true"></div>
            <span className="text-blue-200 font-bold tracking-widest uppercase text-sm">
              {about.hero_badge}
            </span>
          </div>
          
          <h1
            id="about-hero-heading"
            className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            {about.hero_title}
          </h1>
          
          <p className="text-lg text-blue-100 leading-relaxed max-w-lg border-l-4 border-blue-400 pl-6">
            {about.hero_subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
