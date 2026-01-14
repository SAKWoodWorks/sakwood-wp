import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types/dictionary';

interface TestimonialsSectionProps {
  lang: Locale;
  dictionary: Dictionary;
}

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Supakit Construction',
    company: 'Bangkok, Thailand',
    rating: 5,
    review: 'Excellent quality materials and reliable delivery. SAK WoodWorks has been our trusted supplier for over 5 years. Their marine plywood is top-notch.',
    image: 'SC',
  },
  {
    id: '2',
    name: 'Chaiwat Builders',
    company: 'Chonburi, Thailand',
    rating: 5,
    review: 'Great prices and fast delivery. The construction wood we ordered was exactly as specified and arrived on time. Highly recommended!',
    image: 'CB',
  },
  {
    id: '3',
    name: 'Nattaya Engineering',
    company: 'Samut Prakan, Thailand',
    rating: 5,
    review: 'Professional service and high-quality products. We have been using SAK WoodWorks for all our timber needs and they never disappoint.',
    image: 'NE',
  },
];

export function TestimonialsSection({ lang, dictionary }: TestimonialsSectionProps) {
  return (
    <section
      className="bg-white py-24 px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">What Our Clients Say</span>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-extrabold mt-2 uppercase text-slate-900"
          >
            Customer <span className="text-blue-600">Reviews</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Customer testimonials">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.id}
              role="listitem"
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-2xl font-bold text-blue-600">
                    {testimonial.image}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 2.28 4.88L12 17.77l-4.28-9.51-2.28-4.88L6 14.14l-3.09-6.26L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Review */}
              <p className="text-slate-600 leading-relaxed">
                &ldquo;{testimonial.review}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
