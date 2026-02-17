import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getMenu } from '@/lib/services/menuService';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface TermsOfServicePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: TermsOfServicePageProps) {
  const { lang } = await params;
  const isThai = lang === 'th';

  return {
    title: isThai ? 'เงื่อนไขการให้บริการ' : 'Terms of Service',
    description: isThai
      ? 'เงื่อนไขการให้บริการของ SAK WoodWorks'
      : 'Terms of Service of SAK WoodWorks',
  };
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
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
              {isThai ? 'เงื่อนไขการให้บริการ' : 'Terms of Service'}
            </h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'ยอมรับเงื่อนไข' : 'Acceptance of Terms'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600">
                    การเข้าถึงและใช้เว็บไซต์ของ SAK WoodWorks ถือว่าคุณยอมรับและตกลงปฏิบัติตามเงื่อนไขการให้บริการนี้
                    หากคุณไม่ยอมรับเงื่อนไขเหล่านี้ กรุณาอย่าใช้เว็บไซต์ของเรา
                  </p>
                ) : (
                  <p className="text-gray-600">
                    By accessing and using the SAK WoodWorks website, you accept and agree to be bound by these Terms of Service.
                    If you do not agree to these terms, please do not use our website.
                  </p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'การใช้เว็บไซต์' : 'Use of Website'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    เว็บไซต์นี้มีไว้เพื่อวัตถุประสงค์ในการให้ข้อมูลเกี่ยวกับผลิตภัณฑ์ไม้และบริการของเรา
                    คุณตกลงที่จะไม่:
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    This website is for informational purposes about our wood products and services.
                    You agree not to:
                  </p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      ? 'ใช้เว็บไซต์เพื่อวัตถุประสงค์ที่ผิดกฎหมาย'
                      : 'Use the website for any illegal purpose'}
                  </li>
                  <li>
                    {isThai
                      ? 'พยายามเข้าถึงส่วนที่ไม่ได้รับอนุญาตของเว็บไซต์'
                      : 'Attempt to gain unauthorized access to any part of the website'}
                  </li>
                  <li>
                    {isThai
                      ? 'รบกวนหรือขัดขวางการใช้งานเว็บไซต์'
                      : 'Interfere with or disrupt the website'}
                  </li>
                  <li>
                    {isThai
                      ? 'โพสต์หรือส่งข้อมูลที่เป็นอันตราย ก่อกวน หรือหมิ่นเหมือ'
                      : 'Post or transmit harmful, threatening, or defamatory content'}
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'ผลิตภัณฑ์และบริการ' : 'Products and Services'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    เราพยายามอย่างดีที่จะแสดงข้อมูลผลิตภัณฑ์และราคาอย่างถูกต้อง แต่เราไม่รับประกันความถูกต้อง
                    สีของผลิตภัณฑ์อาจแตกต่างจากภาพถ่ายเล็กน้อยเนื่องจากการตั้งค่าจอแสดงผล
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    We strive to accurately display product information and prices, but we do not warrant their accuracy.
                    Product colors may vary slightly from photographs due to monitor settings.
                  </p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'การสั่งซื้อและการชำระเงิน' : 'Orders and Payment'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    เราขอสงวนสิทธิ์ในการ:
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    We reserve the right to:
                  </p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      ? 'จำกัดปริมาณการสั่งซื้อ'
                      : 'Limit order quantities'}
                  </li>
                  <li>
                    {isThai
                      ? 'ปฏิเสธหรือยกเลิกคำสั่งซื้อที่มีข้อผิดพลาดในราคาหรือข้อมูล'
                      : 'Refuse or cancel orders with price or information errors'}
                  </li>
                  <li>
                    {isThai
                      ? 'ขอให้ชำระเงินก่อนสำหรับคำสั่งซื้อบางรายการ'
                      : 'Request pre-payment for certain orders'}
                  </li>
                </ul>
                {isThai ? (
                  <p className="text-gray-600 mt-4">
                    ชำระเงินผ่าน PromptPay หรือโอนเงินผ่านธนาคาร รายละเอียดจะแสดงเมื่อชำระเงิน
                  </p>
                ) : (
                  <p className="text-gray-600 mt-4">
                    Payment is accepted via PromptPay or bank transfer. Details will be provided at checkout.
                  </p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'การจัดส่ง' : 'Shipping and Delivery'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    เราให้บริการจัดส่งในพื้นที่กรุงเทพฯ และปริมณฑล และจัดส่งทั่วประเทศไทย:
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    We provide delivery in Bangkok metropolitan area and nationwide shipping:
                  </p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      ? 'กรุงเทพฯ: ภายในวันหรือวันถัดไป'
                      : 'Bangkok: Same day or next day delivery'}
                  </li>
                  <li>
                    {isThai
                      ? 'ต่างจังหวัด: 3-5 วันทำการขึ้นอยู่กับพื้นที่'
                      : 'Provincial: 3-5 business days depending on location'}
                  </li>
                  <li>
                    {isThai
                      ? 'ค่าจัดส่งคำนวณตามน้ำหนักและพื้นที่'
                      : 'Shipping fees calculated by weight and location'}
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'การคืนสินค้า' : 'Returns and Refunds'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600 mb-4">
                    เรายอมรับการคืนสินค้าภายใน 7 วันหาก:
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    We accept returns within 7 days if:
                  </p>
                )}
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    {isThai
                      ? 'สินค้ามีข้อบกพร่องจากผู้ผลิต'
                      : 'Products have manufacturing defects'}
                  </li>
                  <li>
                    {isThai
                      ? 'สินค้าไม่ตรงตามที่สั่งซื้อ'
                      : 'Products differ from what was ordered'}
                  </li>
                  <li>
                    {isThai
                      ? 'สินค้าอยู่ในสภาพเดิมและไม่ได้ถูกใช้งาน'
                      : 'Products are in original condition and unused'}
                  </li>
                </ul>
                {isThai ? (
                  <p className="text-gray-600 mt-4">
                    กรุณาติดต่อเราที่ info@sakwood.com สำหรับการคืนสินค้า
                  </p>
                ) : (
                  <p className="text-gray-600 mt-4">
                    Please contact us at info@sakwood.com for returns.
                  </p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'ข้อจำกัดความรับผิด' : 'Limitation of Liability'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600">
                    SAK WoodWorks จะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้หรือไม่สามารถใช้เว็บไซต์นี้
                    รวมถึงแต่ไม่จำกัดเฉพาะความเสียหายโดยตรง ทางอ้อม ผลต่อเนื่อง หรือบทลงโทษ
                  </p>
                ) : (
                  <p className="text-gray-600">
                    SAK WoodWorks shall not be liable for any damages arising from the use or inability to use this website,
                    including but not limited to direct, indirect, incidental, or punitive damages.
                  </p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'กฎหมายที่ควบคุม' : 'Governing Law'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600">
                    เงื่อนไขการให้บริการนี้อยู่ภายใต้การควบคุมของกฎหมายของประเทศไทย
                    และข้อพิพาทใดๆ จะถูกตัดสินตามกฎหมายไทย
                  </p>
                ) : (
                  <p className="text-gray-600">
                    These Terms of Service are governed by the laws of Thailand.
                    Any disputes will be resolved under Thai law.
                  </p>
                )}
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {isThai ? 'การเปลี่ยนแปลงเงื่อนไข' : 'Changes to Terms'}
                </h2>
                {isThai ? (
                  <p className="text-gray-600">
                    เราขอสงวนสิทธิ์ในการแก้ไขเงื่อนไขการให้บริการนี้ได้ตลอดเวลา
                    การเปลี่ยนแปลงจะมีผลบังคับใช้ทันทีเมื่อโพสต์บนเว็บไซต์
                  </p>
                ) : (
                  <p className="text-gray-600">
                    We reserve the right to modify these Terms of Service at any time.
                    Changes will be effective immediately upon posting on the website.
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
