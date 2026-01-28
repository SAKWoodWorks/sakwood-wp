'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { SwiperRef } from 'swiper/react';
import { Locale } from '@/i18n-config';
import { Dictionary } from '@/lib/types/dictionary';

interface HeroSliderProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function HeroSlider({ lang, dictionary }: HeroSliderProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<SwiperRef>(null);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80',
      title: dictionary.hero.title,
      subtitle: dictionary.hero.description,
      cta: dictionary.hero.btn_catalog,
      link: `/${lang}/shop`
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
      title: dictionary.hero.title_highlight,
      subtitle: dictionary.hero.description,
      cta: dictionary.hero.btn_quote,
      link: `/${lang}/about`
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80',
      title: dictionary.hero.title,
      subtitle: dictionary.hero.description,
      cta: dictionary.hero.btn_catalog,
      link: `/${lang}/quote`
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1567263827555-1f6e4b3a6b5e?w=1920&q=80',
      title: dictionary.hero.title_highlight,
      subtitle: dictionary.hero.description,
      cta: dictionary.hero.btn_catalog,
      link: `/${lang}/products`
    }
  ];

  const togglePlayPause = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px]">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
                <div className="max-w-2xl text-white space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200">
                    {slide.subtitle}
                  </p>
                  <a
                    href={slide.link}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-8 right-8 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
