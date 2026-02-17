import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getMenu } from '@/lib/services/menuService';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PrivacyPolicyPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps) {
  const { lang } = await params;
  const isThai = lang === 'th';

  return {
    title: isThai ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy',
    description: isThai
      ? 'นโยบายความเป็นส่วนตัวของ SAK WoodWorks'
      : 'Privacy Policy of SAK WoodWorks',
  };
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { lang } = await params;
  const menuItems = await getMenu(lang);
  const dictionary = await getDictionary(lang as Locale);
  const isThai = lang === 'th';

  return (
    <>
      <Header menuItems={menuItems} lang={lang as Locale} dictionary={dictionary} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {isThai ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
            </h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'ข้อมูลที่เราเก็บรวบรวม' : 'Information We Collect'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    เราเก็บรวบรวมข้อมูลที่คุณให้ไว้โดยตรงเมื่อคุณ:
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    We collect information you provide directly to us when you:
                  </p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      ? 'สร้างบัญชีผู้ใช้หรือลงทะเบียน'
                      : 'Create an account or register'}
                  </li>
                  <li>
                    {isThai ? 'สั่งซื้อสินค้า' : 'Place an order'}
                  </li>
                  <li>
                    {isThai
                      ? 'ติดต่อเราผ่านแบบฟอร์มหรืออีเมล'
                      : 'Contact us through forms or email'}
                  </li>
                  <li>
                    {isThai
                      ? 'สมัครสมาชิกข่าวสารหรือโปรโมชั่น'
                      : 'Subscribe to newsletters or promotions'}
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'การใช้คุกกี้' : 'Use of Cookies'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ คุกกี้คือไฟล์ข้อความขนาดเล็กที่เก็บไว้ในอุปกรณ์ของคุณ
                    เราใช้คุกกี้สำหรับ:
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    We use cookies to enhance your experience. Cookies are small text files stored on your device.
                    We use cookies for:
                  </p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      : 'คุกกี้ที่จำเป็น - จำเป็นสำหรับการทำงานของเว็บไซต์'
                      : 'Necessary Cookies - Required for the website to function'}
                  </li>
                  <li>
                    {isThai
                      ? 'คุกกี้การทำงาน - จดจำการตั้งค่าและการตั้งค่าของคุณ'
                      : 'Functional Cookies - Remember your settings and preferences'}
                  </li>
                  <li>
                    {isThai
                      ? 'คุกกี้วิเคราะห์ - ช่วยให้เราเข้าใจวิธีการใช้งานเว็บไซต์ของคุณ'
                      : 'Analytics Cookies - Help us understand how you use our website'}
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'วัตถุประสงค์การเก็บข้อมูล' : 'Purpose of Data Collection'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">เราใช้ข้อมูลของคุณเพื่อ:</p>
                ) : (
                  <p className="text-gray-600 mb-4">We use your information to:</p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      ? 'ประมวลผลและดำเนินการคำสั่งซื้อของคุณ'
                      : 'Process and fulfill your orders'}
                  </li>
                  <li>
                    {isThai
                      ? 'ส่งการอัปเดตเกี่ยวกับคำสั่งซื้อของคุณ'
                      : 'Send updates about your orders'}
                  </li>
                  <li>
                    {isThai
                      ? 'ตอบคำถามและให้การสนับสนุนลูกค้า'
                      : 'Respond to inquiries and provide customer support'}
                  </li>
                  <li>
                    {isThai
                      ? 'ปรับปรุงผลิตภัณฑ์และบริการของเรา'
                      : 'Improve our products and services'}
                  </li>
                  <li>
                    {isThai
                      ? 'ส่งข่าวสารและโปรโมชั่น (หากคุณเลือกรับ)'
                      : 'Send news and promotions (if you opt in)'}
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'ความปลอดภัยของข้อมูล' : 'Data Security'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600">
                    เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของคุณจากการเข้าถึง เปลี่ยนแปลง หรือทำลายโดยไม่ได้รับอนุญาต
                    อย่างไรก็ตาม ไม่มีการส่งข้อมูลที่ปลอดภัย 100% ผ่านอินเทอร์เน็ต
                  </p>
                ) : (
                  <p className="text-gray-600">
                    We implement appropriate security measures to protect your information against unauthorized access,
                    alteration, or destruction. However, no method of transmission over the Internet is 100% secure.
                  </p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'สิทธิ์ของคุณ' : 'Your Rights'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    คุณมีสิทธิ์ในการ:
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    You have the right to:
                  </p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      ? 'เข้าถึงข้อมูลส่วนบุคคลของคุณ'
                      : 'Access your personal information'}
                  </li>
                  <li>
                    {isThai
                      ? 'แก้ไขข้อมูลที่ไม่ถูกต้อง'
                      : 'Correct inaccurate information'}
                  </li>
                  <li>
                    {isThai
                      ? 'ขอให้ลบข้อมูลส่วนบุคคลของคุณ'
                      : 'Request deletion of your personal information'}
                  </li>
                  <li>
                    {isThai
                      ? 'คัดค้านการประมวลผลข้อมูลของคุณ'
                      : 'Object to processing of your information'}
                  </li>
                  <li>
                    {isThai
                      ? 'ถอนความยินยอมในการใช้คุกกี้'
                      : 'Withdraw cookie consent at any time'}
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'ติดต่อเรา' : 'Contact Us'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600">
                    หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวของเรา โปรดติดต่อเราที่ info@sakwood.com
                  </p>
                ) : (
                  <p className="text-gray-600">
                    If you have questions about our Privacy Policy, please contact us at info@sakwood.com
                  </p>
                )}
              </section>

              <section className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">
                  {isThai
                    ? 'อัปเดตล่าสุด: กุมภาพันธ์ 2026'
                    : 'Last updated: February 2026'}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer lang={lang as Locale} />
    </>
  );
}
