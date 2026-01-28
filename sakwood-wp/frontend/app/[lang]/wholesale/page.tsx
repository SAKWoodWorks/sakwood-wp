import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface WholesalePageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export async function generateMetadata({ params }: WholesalePageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.wholesale.page_title} | ${process.env.NEXT_PUBLIC_APP_NAME || 'Sakwood'}`,
    description: dictionary.wholesale.page_subtitle,
  };
}

export default async function WholesalePage({ params }: WholesalePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { wholesale, common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: wholesale.page_title, href: `/${lang}/wholesale` }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {wholesale.page_title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              {wholesale.page_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}/wholesale/apply`}>
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  {wholesale.apply_now}
                </Button>
              </Link>
              <Link href={`/${lang}/register`}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  {common.contact}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {wholesale.benefits_title}
            </h2>
            <p className="text-lg text-gray-600">
              {wholesale.benefits_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1: Pricing */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {wholesale.benefit_pricing}
              </h3>
              <p className="text-gray-600">
                {wholesale.benefit_pricing_desc}
              </p>
            </div>

            {/* Benefit 2: Credit Terms */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {wholesale.benefit_credit}
              </h3>
              <p className="text-gray-600">
                {wholesale.benefit_credit_desc}
              </p>
            </div>

            {/* Benefit 3: Support */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {wholesale.benefit_support}
              </h3>
              <p className="text-gray-600">
                {wholesale.benefit_support_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-lg shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {wholesale.cta_title}
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              {wholesale.cta_desc}
            </p>
            <Link href={`/${lang}/wholesale/apply`}>
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {wholesale.apply_button}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="bg-white rounded-lg shadow-md p-6">
              <summary className="font-semibold text-lg cursor-pointer text-gray-900">
                Who can apply for a wholesale account?
              </summary>
              <p className="mt-3 text-gray-600">
                Wholesale accounts are available to registered businesses including retailers, contractors, manufacturers, and distributors. You must have a valid business registration and Tax ID.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6">
              <summary className="font-semibold text-lg cursor-pointer text-gray-900">
                How long does the approval process take?
              </summary>
              <p className="mt-3 text-gray-600">
                Most applications are reviewed within 2-3 business days. You will receive an email notification once your application has been approved.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6">
              <summary className="font-semibold text-lg cursor-pointer text-gray-900">
                What are the payment terms for wholesale customers?
              </summary>
              <p className="mt-3 text-gray-600">
                Approved wholesale customers can choose between immediate payment (PromptPay/Bank Transfer) or Net-30 payment terms (pay within 30 days of delivery) based on your credit limit.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6">
              <summary className="font-semibold text-lg cursor-pointer text-gray-900">
                Is there a minimum order quantity?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, wholesale orders have a minimum order quantity of 50 units per product to qualify for wholesale pricing. Contact us for more details.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
