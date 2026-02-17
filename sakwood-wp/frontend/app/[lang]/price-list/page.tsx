import { Metadata } from 'next';
import { PriceTable } from '@/components/products/PriceTable';
import { getProducts } from '@/lib/services/productService';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import PrintButton from '@/components/products/PrintButton';

interface PriceListPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PriceListPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isThai = lang === 'th';

  return {
    title: isThai ? 'ราคาสินค้า | Sakwood' : 'Price List | Sakwood',
    description: isThai
      ? 'ตารางราคาสินค้าไม้ทั้งหมด เปรียบเทียบราคาและสเปกสินค้าได้ที่นี่ Sakwood'
      : 'Complete product price list. Compare prices and specifications at Sakwood',
  };
}

export default async function PriceListPage({ params }: PriceListPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const products = await getProducts(lang as Locale);

  const breadcrumbItems = [
    { name: dictionary.common.home, href: `/${lang}` },
    { name: lang === 'th' ? 'ราคาสินค้า' : 'Price List', href: `/${lang}/price-list` }
  ];

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide non-printable elements */
          .no-print, button, a[href*="/quote"], a[href*="/contact"] {
            display: none !important;
          }

          /* Ensure full width */
          main, .container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Table styles for print */
          table {
            width: 100% !important;
            page-break-inside: auto;
            font-size: 10pt;
          }

          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }

          thead {
            display: table-header-group;
          }

          tfoot {
            display: table-footer-group;
          }

          /* Background colors */
          th {
            background-color: #1e3a8a !important;
            color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Remove shadows and borders for cleaner print */
          * {
            box-shadow: none !important;
            text-shadow: none !important;
          }

          /* Page breaks */
          .page-break {
            page-break-before: always;
          }

          /* Footer for print */
          @page {
            margin: 1cm;
            size: landscape;
          }

          /* Hide filters and search in print */
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {lang === 'th' ? 'ราคาสินค้าทั้งหมด' : 'Complete Price List'}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {lang === 'th'
                ? 'เปรียบเทียบราคาและคุณสมบัติสินค้าไม้ทั้งหมดของเรา สำหรับโครงการก่อสร้างและอุตสาหกรรม'
                : 'Compare prices and specifications of all our wood products for construction and industrial projects'
              }
            </p>
          </div>

          {/* Print Button - Only shows on screen, hidden in print */}
          <div className="mb-6 flex justify-end no-print">
            <PrintButton lang={lang as Locale} />
          </div>

          <PriceTable
            products={products}
            lang={lang as Locale}
            dictionary={dictionary}
          />

          {/* CTA Section - Hidden in print */}
          <div className="mt-12 bg-blue-900 text-white rounded-xl p-8 text-center no-print">
            <h2 className="text-2xl font-bold mb-4">
              {lang === 'th'
                ? 'ต้องการคำปรึกษาเรื่องราคาสำหรับโครงการใหญ่?'
                : 'Need Pricing for Large Projects?'
              }
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {lang === 'th'
                ? 'เราให้ราคาพิเศษสำหรับโครงการก่อสร้างและการสั่งซื้อจำนวนมาก ติดต่อเราเพื่อรับใบเสนอราคา'
                : 'We offer special pricing for construction projects and bulk orders. Contact us for a custom quote.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${lang}/quote`}
                className="inline-block px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                {lang === 'th' ? 'ขอใบเสนอราคา' : 'Get a Quote'}
              </a>
              <a
                href={`/${lang}/contact`}
                className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
