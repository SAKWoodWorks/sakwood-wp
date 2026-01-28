import { HeroSlider } from "@/components/home/HeroSlider";
import { HeroSliderWrapper } from "@/components/home/HeroSliderWrapper";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProductSection } from "@/components/home/ProductSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTABanner } from "@/components/home/CTABanner";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { QualityShowcase } from "@/components/home/QualityShowcase";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { ProjectsGallery } from "@/components/home/ProjectsGallery";
import { StructuredData } from "@/components/home/StructuredData";
import { BackToTop } from "@/components/ui/BackToTop";
import { PromotionalPopup } from "@/components/ui/PromotionalPopup";
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <>
      <StructuredData />
      <HeroSliderWrapper lang={lang as Locale} dictionary={dictionary} />
      <QualityShowcase lang={lang as Locale} dictionary={dictionary} />
      <StatsSection lang={lang as Locale} dictionary={dictionary} />
      <BenefitsSection lang={lang as Locale} dictionary={dictionary} />
      <ServicesSection lang={lang as Locale} dictionary={dictionary} />
      <CategoriesSection lang={lang as Locale} dictionary={dictionary} />
      <WhyChooseSection lang={lang as Locale} dictionary={dictionary} />
      <ProductSection lang={lang as Locale} dictionary={dictionary} />
      <ProjectsGallery lang={lang as Locale} dictionary={dictionary} />
      <TestimonialsCarousel lang={lang as Locale} dictionary={dictionary} />
      <CTABanner lang={lang as Locale} dictionary={dictionary} />
      <BackToTop backToTopLabel={dictionary.back_to_top || 'Back to top'} />
      <PromotionalPopup />
    </>
  );
}
