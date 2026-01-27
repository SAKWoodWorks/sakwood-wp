import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductSpecifications } from '@/components/products/ProductSpecifications';
import { RelatedProductsCarousel } from '@/components/products/RelatedProductsCarousel';
import { PromotionalPopup } from '@/components/ui/PromotionalPopup';
import { ProductStructuredData } from '@/components/products/ProductStructuredData';
import { getProductBySlug, getProducts } from '@/lib/services/productService';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const productData = await getProductBySlug(slug, lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakwood.com";
  const isThai = lang === 'th';

  if (!productData) {
    return {
      title: 'Product Not Found',
    };
  }

  const productTitle = productData.name || 'Wood Product';
  const description = productData.description?.substring(0, 160) || `Quality ${productTitle} from Sakwood - Thailand's trusted wood supplier`;
  const imageUrl = productData.image?.sourceUrl || `${siteUrl}/og-image.jpg`;

  return {
    title: productTitle,
    description,
    keywords: [
      productTitle,
      isThai ? 'ไม้' : 'wood',
      isThai ? 'ไม้สน' : 'pine wood',
      isThai ? 'เพลย์วูด' : 'plywood',
      isThai ? 'ไม้ก่อสร้าง' : 'construction timber',
      'Sakwood',
      isThai ? 'ขายส่งไม้' : 'wholesale wood',
    ],
    openGraph: {
      title: productTitle,
      description,
      url: `${siteUrl}/${lang}/products/${slug}`,
      siteName: 'Sakwood',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: productTitle,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: productTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/${lang}/products/${slug}`,
    },
  };
}

// Revalidate this page every 5 minutes (300 seconds)
export const revalidate = 300;

export default async function ProductPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common, product, popup } = dictionary;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakwood.com";

  const productData = await getProductBySlug(slug, lang);
  const relatedProducts = await getProducts(lang);

  if (!productData) {
    return notFound();
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: common.products, href: `/${lang}/shop` },
    { name: productData.name, href: `/${lang}/products/${slug}` }
  ];

  return (
    <main className="min-h-screen">
      <ProductStructuredData product={productData} lang={lang} siteUrl={siteUrl} />
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            {productData.name || productData.slug}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image Gallery */}
          <ProductImageGallery product={productData} />

          {/* Right: Product Info */}
          <ProductInfo
            product={productData}
            lang={lang as Locale}
            dictionary={dictionary}
          />
        </div>

        {/* Specifications */}
        <ProductSpecifications
          product={productData}
          dictionary={dictionary}
        />

        {/* Related Products */}
        <RelatedProductsCarousel
          products={relatedProducts.filter(p => p.id !== productData.id).slice(0, 8)}
          lang={lang as Locale}
          dictionary={dictionary}
        />
      </div>

      {/* Promotional Popup */}
      <PromotionalPopup />
    </main>
  );
}
