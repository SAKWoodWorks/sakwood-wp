import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProductSection } from "@/components/home/ProductSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CTABanner } from "@/components/home/CTABanner";
import { StructuredData } from "@/components/home/StructuredData";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` }
  ];

  return (
    <>
      <StructuredData />
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
      <HeroSection lang={lang as Locale} dictionary={dictionary} />
      <StatsSection lang={lang as Locale} dictionary={dictionary} />
      <ServicesSection lang={lang as Locale} dictionary={dictionary} />
      <ProductSection lang={lang as Locale} dictionary={dictionary} />
      <TestimonialsSection lang={lang as Locale} dictionary={dictionary} />
      <BlogSection lang={lang as Locale} dictionary={dictionary} />
      <CTABanner lang={lang as Locale} dictionary={dictionary} />
    </>
  );
}
