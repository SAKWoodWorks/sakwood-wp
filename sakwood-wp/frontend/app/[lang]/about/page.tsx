import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutCTA } from "@/components/about/AboutCTA";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: common.about, href: `/${lang}/about` }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
      <AboutHero lang={lang as Locale} dictionary={dictionary} />
      <AboutStory lang={lang as Locale} dictionary={dictionary} />
      <AboutMission lang={lang as Locale} dictionary={dictionary} />
      <AboutValues lang={lang as Locale} dictionary={dictionary} />
      <AboutTeam lang={lang as Locale} dictionary={dictionary} />
      <AboutCTA lang={lang as Locale} dictionary={dictionary} />
    </>
  );
}
