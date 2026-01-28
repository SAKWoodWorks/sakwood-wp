import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CartItems } from '@/components/cart/CartItems';
import { CartSummary } from '@/components/cart/CartSummary';
import { CartActions } from '@/components/cart/CartActions';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function CartPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common, cart } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: cart.page_title, href: `/${lang}/cart` }
  ];

  return (
    <main className="min-h-screen py-12">
        <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
        
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            {cart.page_title}
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <CartItems lang={lang as Locale} dictionary={dictionary} />
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary lang={lang as Locale} dictionary={dictionary} />
            </div>
          </div>

          {/* Cart Actions */}
          <CartActions lang={lang as Locale} dictionary={dictionary} />
        </div>
    </main>
  );
}
