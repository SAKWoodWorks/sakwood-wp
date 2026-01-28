'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import type { SwiperRef } from 'swiper/react';
import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale } from '@/i18n-config';
import { Dictionary } from '@/lib/types/dictionary';
import { HeroSlide } from '@/lib/services/heroSlideService';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroSliderProps {
  lang: Locale;
  dictionary: Dictionary;
  slidesFromWP?: HeroSlide[];
  useDefaultSlides?: boolean;
  autoplayDelay?: number;
}

interface Slide {
  id: string | number;
  image: string;
  video?: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  link: string;
  badge?: string;
  textColor?: string;
  overlay?: boolean;
}

export function ImprovedHeroSlider({
  lang,
  dictionary,
  slidesFromWP = [],
  useDefaultSlides = false,
  autoplayDelay = 6000
}: HeroSliderProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);

  // Helper function to extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Check if URL is a YouTube video
  const isYouTube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Convert WordPress slides to our format
  const wpSlides: Slide[] = slidesFromWP.map((slide, index) => ({
    id: slide.id || `wp-slide-${index}`, // Use the GraphQL ID directly as string
    image: slide.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80',
    video: slide.slideVideo || undefined,
    title: slide.title || 'Welcome',
    subtitle: slide.slideSubtitle || '',
    description: slide.slideDescription || '',
    cta: slide.slideCtaText || 'Learn More',
    link: slide.slideCtaLink || `/${lang}/shop`,
    badge: undefined,
    textColor: slide.slideTextColor || '#ffffff',
    overlay: slide.slideOverlay !== undefined ? slide.slideOverlay : true,
  }));

  // Default fallback slides
  const defaultSlides: Slide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80',
      title: dictionary.home?.title_start || 'Premium Thai Pine & Teak',
      subtitle: dictionary.home?.title_end || "Wholesale Prices Direct to You",
      description: dictionary.home?.subtitle || 'Grade-A structural pine and premium teak. Factory-direct pricing. No middleman.',
      cta: dictionary.home?.btn_catalog || 'Get Free Quote',
      link: `/${lang}/quote`,
      badge: lang === 'th' ? 'ผู้ผลิตไม้ยอดนิยม' : 'Premium Quality'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
      title: dictionary.hero?.title || 'Building Thailand Since 1999',
      subtitle: dictionary.hero?.title_highlight || '25+ Years of Excellence',
      description: dictionary.hero?.description || 'Trusted by contractors, furniture makers, and developers across Thailand. ISO certified quality.',
      cta: dictionary.home?.btn_quote || 'View Products',
      link: `/${lang}/shop`,
      badge: lang === 'th' ? 'มาตรฐาน 25 ปี' : 'Since 1999'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80',
      title: lang === 'th' ? 'จัดส่งภายในวันเดียว' : 'Same-Day Delivery',
      subtitle: lang === 'th' ? 'กรุงเทพฯ และปริมณเมือง' : 'Bangkok & Perimeter Areas',
      description: lang === 'th'
        ? 'ขนส่งด้วยรถบรรทุกของเรา กรุงเทพฯและปริมณเมือง ส่งฟรีภายในวันเดียว'
        : 'We own our logistics fleet. Same-day delivery available for Bangkok and perimeter areas.',
      cta: lang === 'th' ? 'โทร.02-123-4567' : 'Call 02-123-4567',
      link: 'tel:02-123-4567',
      badge: '🚚'
    }
  ];

  // Use WordPress slides if available and not forcing default, otherwise use defaults
  const slides = (!useDefaultSlides && wpSlides.length > 0) ? wpSlides : defaultSlides;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const goNext = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  const goPrev = () => {
    swiperRef.current?.swiper?.slidePrev();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Video (MP4 or YouTube) or Image */}
              {slide.video ? (
                isYouTube(slide.video) ? (
                  <div className="absolute inset-0 w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(slide.video)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(slide.video)}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      title="YouTube video background"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={slide.image}
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                )
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center transform scale-105"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    animation: index === currentSlide ? 'slowZoom 20s infinite alternate' : 'none'
                  }}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0">
                {/* Conditionally render overlay based on slide.overlay property */}
                {slide.overlay !== false && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-blue-900/40" />
                )}
              </div>

              {/* Animated Particles */}
              {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(20)].map((_, i) => {
                    // Use deterministic positions based on index to avoid hydration mismatch
                    const left = (i * 5.2) % 100;
                    const top = (i * 7.3) % 100;
                    const delay = (i * 0.3) % 5;
                    const duration = 5 + ((i * 0.5) % 10);

                    return (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          animationDelay: `${delay}s`,
                          animationDuration: `${duration}s`
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
                <div className="max-w-3xl space-y-6" style={{ color: slide.textColor || '#ffffff' }}>
                  {/* Badge */}
                  {slide.badge && (
                    <div className="inline-flex items-center gap-2 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide animate-slideDown text-white">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      {slide.badge}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-slideUp" style={{ animationDelay: '0.2s', color: slide.textColor || '#ffffff' }}>
                    {slide.title}
                    <span className="block text-blue-400 mt-2">{slide.subtitle}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-xl md:text-2xl leading-relaxed animate-slideUp" style={{ animationDelay: '0.4s', color: `${slide.textColor || '#ffffff'}cc` }}>
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div className="flex flex-wrap gap-4 animate-slideUp" style={{ animationDelay: '0.6s' }}>
                    <a
                      href={slide.link}
                      className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      {slide.cta}
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={`/${lang}/contact`}
                      className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-white/30 hover:border-white/50"
                    >
                      {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                    </a>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-3 mt-4 animate-slideUp" style={{ animationDelay: '0.8s' }}>
                    <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/20">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l-10-5 10 5-10-5 10 5z"/></svg>
                      <span>{lang === 'th' ? 'ISO 9001' : 'ISO Certified'}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/20">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span>{lang === 'th' ? 'รับประกัน 15 ปี' : '15-Year Warranty'}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/20">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                      <span>{lang === 'th' ? 'ผู้เชี่ยวชาญ #1' : '#1 Supplier'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Counter */}
              <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-white font-bold">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-8 left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm">Scroll Down</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
