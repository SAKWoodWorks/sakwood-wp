import type { Locale } from '@/i18n-config';

interface AboutMissionProps {
  lang: Locale;
  dictionary: {
    about: {
      mission_title: string;
      mission_subtitle: string;
      mission_desc: string;
      vision_title: string;
      vision_desc: string;
    };
  };
}

export function AboutMission({ lang, dictionary }: AboutMissionProps) {
  const { about } = dictionary;

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="about-mission-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="about-mission-heading"
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            {about.mission_title}
          </h2>
          <p className="text-blue-600 font-semibold">
            {about.mission_subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-900">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900">
                {about.mission_title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {about.mission_desc}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-600">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900">
                {about.vision_title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {about.vision_desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
