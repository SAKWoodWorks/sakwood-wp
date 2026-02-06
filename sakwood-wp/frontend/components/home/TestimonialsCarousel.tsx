'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import type { Locale } from '@/i18n-config';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialsSectionProps {
  lang: Locale;
  dictionary: {
    home?: {
      testimonials_title?: string;
      testimonials_subtitle?: string;
    };
    testimonials?: {
      title: string;
      subtitle: string;
      happy_customers: string;
      satisfaction_rate: string;
      years_experience: string;
      average_rating: string;
    };
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Somchai Wong',
    role: 'Construction Manager',
    company: 'Thai Construction Co.',
    content: 'Sakwood has been our trusted supplier for over 5 years. Their pine wood quality is consistent and delivery is always on time. Highly recommended!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Nattaya Smith',
    role: 'Furniture Factory Owner',
    company: 'Bangkok Furniture',
    content: 'The best plywood supplier we\'ve worked with. Excellent quality, competitive prices, and their team is always helpful with technical advice.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 3,
    name: 'John Davis',
    role: 'Contractor',
    company: 'Davis Builders',
    content: 'Outstanding service and premium quality materials. Sakwood never compromises on quality and their marine plywood is simply the best in Thailand.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Kamonwan Dee',
    role: 'Interior Designer',
    company: 'Modern Spaces',
    content: 'I always recommend Sakwood to my clients. Their product range is impressive and the team truly understands what designers need.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=9'
  },
  {
    id: 5,
    name: 'Michael Chen',
    role: 'Project Manager',
    company: 'Asia Developments',
    content: 'Reliable supplier with excellent customer service. They\'ve helped us complete multiple luxury resort projects on schedule.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=12'
  }
];

export function TestimonialsCarousel({ lang, dictionary }: TestimonialsSectionProps) {
  const { home, testimonials: testimonialsDict } = dictionary;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {testimonialsDict?.title || home?.testimonials_title || 'What Our Clients Say'}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {testimonialsDict?.subtitle || home?.testimonials_subtitle || "Don't just take our word for it - hear from our satisfied customers"}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper pb-16"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-blue-300" />
                </div>

                {/* Content */}
                <p className="text-lg leading-relaxed mb-6 text-blue-50">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-blue-300"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-blue-200 text-sm">{testimonial.role}</p>
                    <p className="text-blue-300 text-xs">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">2000+</div>
            <div className="text-blue-200">{testimonialsDict?.happy_customers || 'Happy Customers'}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-blue-200">{testimonialsDict?.satisfaction_rate || 'Satisfaction Rate'}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-blue-200">{testimonialsDict?.years_experience || 'Years Experience'}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">5.0</div>
            <div className="text-blue-200">{testimonialsDict?.average_rating || 'Average Rating'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
