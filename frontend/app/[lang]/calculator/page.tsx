import { WoodSizeCalculator } from '@/components/products/WoodSizeCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getDictionary } from '@/lib/get-dictionary';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isThai = lang === 'th';

  return {
    title: isThai ? 'เครื่องคำนวณขนาดไม้ | Sakwood' : 'Wood Size Calculator | Sakwood',
    description: isThai
      ? 'คำนวณปริมาตรไม้ที่ต้องการสำหรับโปรเจกต์ของคุณ - เครื่องคำนวณฟรีจาก Sakwood'
      : 'Calculate wood volume needed for your project - Free calculator from Sakwood',
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: lang === 'th' ? 'เครื่องคำนวณ' : 'Calculator', href: `/${lang}/calculator` },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === 'th' ? 'เครื่องคำนวณขนาดไม้' : 'Wood Size Calculator'}
          </h1>
          <p className="text-xl text-blue-100">
            {lang === 'th'
              ? 'คำนวณปริมาตรและน้ำหนักไม้สำหรับโปรเจกต์ของคุณ'
              : 'Calculate wood volume and weight for your project'}
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <WoodSizeCalculator lang={lang} dictionary={dictionary} />
      </div>

      {/* Additional Information */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'th' ? 'วิธีการใช้งาน' : 'How to Use'}
              </h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>{lang === 'th' ? 'วัดความยาวของไม้ที่คุณต้องการ (เซนติเมตร)' : 'Measure the length of wood you need (centimeters)'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>{lang === 'th' ? 'วัดความกว้างของไม้ (เซนติเมตร)' : 'Measure the width of wood (centimeters)'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>{lang === 'th' ? 'วัดความหนาของไม้ (เซนติเมตร)' : 'Measure the thickness of wood (centimeters)'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span>{lang === 'th' ? 'ระบุจำนวนไม้ที่ต้องการ' : 'Enter the quantity needed'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <span>{lang === 'th' ? 'คลิกคำนวณเพื่อดูผลลัพธ์' : 'Click calculate to see results'}</span>
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'th' ? 'ข้อมูลที่มีประโยชน์' : 'Useful Information'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {lang === 'th' ? 'หน่วยวัด' : 'Measurement Units'}
                  </h3>
                  <p className="text-sm">
                    {lang === 'th'
                      ? 'เครื่องคำนวณใช้เซนติเมตร (cm) และแสดงผลลัพธ์เป็นลูกบาศก์เมตร (m³) และกิโลกรัม (kg)'
                      : 'The calculator uses centimeters (cm) and displays results in cubic meters (m³) and kilograms (kg)'}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">
                    {lang === 'th' ? 'การประเมินน้ำหนัก' : 'Weight Estimation'}
                  </h3>
                  <p className="text-sm">
                    {lang === 'th'
                      ? 'น้ำหนักคำนวณโดยใช้ความหนาแน่นเฉลี่ยของไม้สนเกรด A ที่ 500 กก./ลบ.ม. น้ำหนักจริงอาจแตกต่างตามชนิดไม้และความชื้น'
                      : 'Weight is calculated using average density of Grade A pine at 500 kg/m³. Actual weight may vary by wood type and moisture content.'}
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">
                    {lang === 'th' ? 'คำแนะนำ' : 'Recommendations'}
                  </h3>
                  <p className="text-sm">
                    {lang === 'th'
                      ? 'ควรเผื่อนไม้เพิ่ม 5-10% สำหรับของเสียในการตัดและประกอบ และปรึกษาผู้ขายเพื่อราคาที่ดีที่สุด'
                      : 'Add 5-10% extra for waste from cutting and assembly. Consult with your supplier for the best pricing on bulk orders.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
