'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/services/productService';
import type { Locale } from '@/i18n-config';
import type { Product } from '@/lib/types';

interface SaleProductsSectionDebugProps {
  lang: Locale;
}

export function SaleProductsSectionDebug({ lang }: SaleProductsSectionDebugProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts(lang);
        const allProducts = data.products;

        // Debug: Log all products with their prices
        console.log('=== ALL PRODUCTS ===');
        allProducts.forEach((p, i) => {
          console.log(`${i + 1}. ${p.name}`);
          console.log(`   Price: ${p.price}`);
          console.log(`   Regular Price: ${p.regularPrice || 'NOT SET'}`);
          console.log(`   Raw product keys: ${Object.keys(p).join(', ')}`);
        });

        // Filter sale products
        const sales = allProducts.filter(product => {
          if (!product.price || !product.regularPrice) return false;

          const extractPrice = (priceStr: string) => {
            return parseFloat(priceStr.replace(/[^\d.]/g, '') || '0');
          };

          const price = extractPrice(product.price);
          const regularPrice = extractPrice(product.regularPrice);

          // Debug: Show the calculation
          console.log(`${product.name}:`);
          console.log(`  Raw Price: "${product.price}" → Extracted: ${price}`);
          console.log(`  Raw Regular Price: "${product.regularPrice}" → Extracted: ${regularPrice}`);
          console.log(`  Is Sale? ${regularPrice} > ${price} = ${regularPrice > price}`);

          return regularPrice > price && price > 0;
        });

        console.log('=== SALE PRODUCTS FOUND ===');
        console.log(`Total: ${sales.length}`);
        sales.forEach((p, i) => {
          console.log(`${i + 1}. ${p.name}`);
          console.log(`   Regular: ${p.regularPrice} → Sale: ${p.price}`);
        });

        setProducts(allProducts);
        setSaleProducts(sales);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [lang]);

  return (
    <div className="bg-yellow-100 border-4 border-yellow-500 p-8 my-8">
      <h2 className="text-2xl font-bold mb-4">🔍 Sale Products Debug</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-lg">
              <strong>Total Products:</strong> {products.length}
            </p>
            <p className="text-lg">
              <strong>Sale Products Found:</strong> <span className={saleProducts.length > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{saleProducts.length}</span>
            </p>
          </div>

          {saleProducts.length > 0 ? (
            <>
              <h3 className="text-xl font-bold mb-4 text-green-600">✅ Sale Products Section WILL appear on homepage</h3>
              <div className="grid grid-cols-2 gap-4">
                {saleProducts.map(product => (
                  <div key={product.id} className="bg-white p-4 rounded border">
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-red-600 line-through">{product.regularPrice}</p>
                    <p className="text-green-600 text-xl font-bold">{product.price}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-red-100 border-2 border-red-500 p-4 rounded">
              <h3 className="text-xl font-bold mb-2 text-red-600">❌ No sale products found!</h3>
              <p className="mb-2">The sale section will NOT appear because no products have sale prices set.</p>
              <p className="text-sm">To fix: Go to WordPress Admin → Products → Edit product → Set both "Regular Price" and "Sale Price"</p>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-bold mb-2">All Products Price Status:</h4>
            <div className="bg-white p-4 rounded border max-h-96 overflow-y-auto">
              {products.map(product => {
                const extractPrice = (priceStr: string) => {
                  return parseFloat(priceStr.replace(/[^\d.]/g, '') || '0');
                };

                const priceNum = product.price ? extractPrice(product.price) : 0;
                const regularPriceNum = product.regularPrice ? extractPrice(product.regularPrice) : 0;
                const hasSale = product.price && product.regularPrice && regularPriceNum > priceNum && priceNum > 0;

                return (
                  <div key={product.id} className={`py-2 border-b ${hasSale ? 'bg-green-50' : ''}`}>
                    <div className="font-semibold">{product.name}</div>
                    <div className="ml-4 text-sm text-gray-600">
                      <div>Price: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{product.price || 'NOT SET'}</span> → <span className="font-bold text-blue-600">{priceNum}</span></div>
                      <div>Regular Price: <span className="font-mono px-2 py-1 rounded">{product.regularPrice || 'NOT SET'}</span> → <span className="font-bold text-blue-600">{regularPriceNum}</span></div>
                      <div className="mt-1">
                        <span className={hasSale ? 'text-green-600 font-bold' : 'text-red-600'}>
                          {hasSale ? '✓ IS A SALE PRODUCT!' : `✗ NOT SALE (${regularPriceNum} > ${priceNum} = ${regularPriceNum > priceNum})`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded">
            <h4 className="font-bold mb-2">🔍 Check Browser Console (F12) for Detailed Debug Info:</h4>
            <p className="text-sm mb-2">Press F12, go to Console tab, and look for "=== ALL PRODUCTS ===" to see what fields are actually in each product.</p>
            <p className="text-sm">If you don't see "regularPrice" in the keys list, the GraphQL query isn't returning it.</p>
          </div>
        </>
      )}
    </div>
  );
}
