import type { Locale } from '@/i18n-config';

interface AboutStoryProps {
  lang: Locale;
  dictionary: {
    about: {
      story_title: string;
      story_subtitle: string;
      story_content: string;
    };
  };
}

export function AboutStory({ lang, dictionary }: AboutStoryProps) {
  const { about } = dictionary;

  return (
    <section className="py-20 bg-white" aria-labelledby="about-story-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              id="about-story-heading"
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
            >
              {about.story_title}
            </h2>
            <p className="text-blue-600 font-semibold mb-4">
              {about.story_subtitle}
            </p>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              {about.story_content}
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-[4/3] bg-cover bg-center rounded-lg shadow-2xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop')" }}
              role="img"
              aria-label="Wood warehouse with timber materials"
            ></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-900 -z-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
