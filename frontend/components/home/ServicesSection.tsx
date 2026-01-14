import type { Locale } from '@/i18n-config';

interface ServicesSectionProps {
  lang: Locale;
  dictionary: {
    services: {
      badge: string;
      title: string;
      construction_title: string;
      construction_desc: string;
      plywood_title: string;
      plywood_desc: string;
      delivery_title: string;
      delivery_desc: string;
    };
  };
}

export function ServicesSection({ lang, dictionary }: ServicesSectionProps) {
  const { services } = dictionary;

  return (
    <section
      className="py-24 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">{services.badge}</span>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 uppercase"
          >
            {services.title}
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4" aria-hidden="true"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <article className="group p-8 border border-slate-100 hover:border-blue-600 bg-slate-50 hover:bg-white transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 rounded-bl-full transition-all group-hover:scale-150" aria-hidden="true"></div>
            <div className="w-16 h-16 bg-white text-blue-600 border border-blue-100 flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
              🏗️
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase group-hover:text-blue-700">{services.construction_title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {services.construction_desc}
            </p>
          </article>

          {/* Box 2 */}
          <article className="group p-8 border border-slate-100 hover:border-blue-600 bg-slate-50 hover:bg-white transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 rounded-bl-full transition-all group-hover:scale-150" aria-hidden="true"></div>
            <div className="w-16 h-16 bg-white text-blue-600 border border-blue-100 flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
              🪵
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase group-hover:text-blue-700">{services.plywood_title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {services.plywood_desc}
            </p>
          </article>

          {/* Box 3 */}
          <article className="group p-8 border border-slate-100 hover:border-blue-600 bg-slate-50 hover:bg-white transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 rounded-bl-full transition-all group-hover:scale-150" aria-hidden="true"></div>
            <div className="w-16 h-16 bg-white text-blue-600 border border-blue-100 flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
              🚛
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase group-hover:text-blue-700">{services.delivery_title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {services.delivery_desc}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
