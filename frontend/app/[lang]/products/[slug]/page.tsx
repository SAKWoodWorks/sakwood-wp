import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductSpecifications } from '@/components/products/ProductSpecifications';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { getProductBySlug, getProducts } from '@/lib/services/productService';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common, product } = dictionary;

  const productData = await getProductBySlug(slug);
  const relatedProducts = await getProducts();

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
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
      
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
        <RelatedProducts 
          products={relatedProducts.filter(p => p.id !== productData.id).slice(0, 4)}
          lang={lang as Locale}
          dictionary={dictionary}
        />
      </div>
    </main>
  );
}
