import { Metadata } from 'next';
import { PriceTable } from '@/components/products/PriceTable';
import { getProducts } from '@/lib/services/productService';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

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

        <PriceTable
          products={products}
          lang={lang as Locale}
          dictionary={dictionary}
        />

        {/* CTA Section */}
        <div className="mt-12 bg-blue-900 text-white rounded-xl p-8 text-center">
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
  );
}
