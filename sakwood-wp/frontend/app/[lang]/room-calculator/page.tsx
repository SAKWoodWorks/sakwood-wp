import { RoomCalculator } from '@/components/products/RoomCalculator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getDictionary } from '@/lib/get-dictionary';
import { getProducts } from '@/lib/services/productService';
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
    title: isThai ? 'เครื่องคำนวณห้อง | Sakwood' : 'Room Calculator | Sakwood',
    description: isThai
      ? 'คำนวณปริมาณไม้ที่ต้องการสำหรับโปรเจกต์พื้น ผนัง และฝ้า - เครื่องคำนวณฟรีจาก Sakwood'
      : 'Calculate wood needed for floor, siding, and ceiling projects - Free calculator from Sakwood',
  };
}

export default async function RoomCalculatorPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common } = dictionary;

  // Fetch real products from the backend
  const products = await getProducts(lang as Locale);

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: lang === 'th' ? 'เครื่องคำนวณห้อง' : 'Room Calculator', href: `/${lang}/room-calculator` },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === 'th' ? 'เครื่องคำนวณห้อง' : 'Room Calculator'}
          </h1>
          <p className="text-xl text-green-100">
            {lang === 'th'
              ? 'คำนวณปริมาณไม้ที่ต้องการสำหรับโปรเจกต์ของคุณ'
              : 'Calculate the amount of wood needed for your project'}
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <RoomCalculator lang={lang} dictionary={dictionary} products={products} />
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
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>{lang === 'th' ? 'เลือกประเภทโปรเจกต์ (ไม้พื้น, ไม้ฝา, หรือไม้ฝ้า)' : 'Select project type (floor, siding, or ceiling)'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>{lang === 'th' ? 'วัดขนาดห้อง ความกว้าง และความยาว (เมตร)' : 'Measure room width and length (meters)'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>{lang === 'th' ? 'สำหรับไม้ฝา วัดความสูงของห้องเพิ่มเติม' : 'For siding, measure room height as well'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span>{lang === 'th' ? 'เลือกขนาดไม้ที่ต้องการใช้งาน' : 'Select the wood product size you want to use'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <span>{lang === 'th' ? 'คลิกคำนวณเพื่อดูจำนวนแผ่นที่ต้องการ' : 'Click calculate to see how many pieces you need'}</span>
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'th' ? 'ข้อมูลเพิ่มเติม' : 'Additional Information'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">
                    {lang === 'th' ? 'ประเภทโปรเจกต์' : 'Project Types'}
                  </h3>
                  <p className="text-sm">
                    {lang === 'th'
                      ? 'ไม้พื้น: คำนวณจากพื้นที่ความกว้าง x ความยาว | ไม้ฝา: คำนวณจากเส้นรอบรูป x ความสูง | ไม้ฝ้า: คำนวณจากพื้นที่ความกว้าง x ความยาว'
                      : 'Floor: width x length area | Siding: perimeter x height | Ceiling: width x length area'}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {lang === 'th' ? 'ค่าของเสีย' : 'Waste Factor'}
                  </h3>
                  <p className="text-sm">
                    {lang === 'th'
                      ? 'เครื่องคำนวณจะเพิ่ม 10% สำหรับของเสียจากการตัดและประกอบ คุณสามารถปิดการใช้งานได้หากไม่ต้องการ'
                      : 'The calculator adds 10% for cutting and assembly waste. You can disable this option if not needed.'}
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">
                    {lang === 'th' ? 'คำแนะนำ' : 'Recommendations'}
                  </h3>
                  <p className="text-sm">
                    {lang === 'th'
                      ? 'ควรวัดห้องอย่างละเอียดและเผื่อพื้นที่เพิ่มสำหรับพื้นที่ที่ไม่เรียบ สำหรับโปรเจกต์ขนาดใหญ่ แนะนำให้ติดต่อผู้ขายเพื่อขอราคาจำนวนเพิ่มเติม'
                      : 'Measure rooms carefully and add extra area for uneven surfaces. For large projects, contact your supplier for detailed quotes and bulk pricing.'}
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
