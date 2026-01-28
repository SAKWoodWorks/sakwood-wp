import { ImprovedHeroSlider } from './ImprovedHeroSlider';
import { getHeroSlides } from '@/lib/services/heroSlideService';
import { getSliderSettings } from '@/lib/services/sliderSettingsService';
import type { Locale } from '@/i18n-config';
import { Dictionary } from '@/lib/types/dictionary';

interface HeroSliderWrapperProps {
  lang: Locale;
  dictionary: Dictionary;
}

export async function HeroSliderWrapper({ lang, dictionary }: HeroSliderWrapperProps) {
  const slidesFromWP = await getHeroSlides();
  const sliderSettings = await getSliderSettings();

  // If no slides from WordPress, use default fallback
  const useDefaultSlides = slidesFromWP.length === 0;

  return (
    <ImprovedHeroSlider
      lang={lang}
      dictionary={dictionary}
      slidesFromWP={slidesFromWP}
      useDefaultSlides={useDefaultSlides}
      autoplayDelay={sliderSettings.autoplay_delay}
    />
  );
}
