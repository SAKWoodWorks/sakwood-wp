'use client';

/**
 * ProductCompare Component
 *
 * Main comparison view showing products side-by-side.
 * Displays specs, prices, dimensions with difference highlighting.
 */

import { useMemo } from 'react';
import { useCompare } from '@/context/CompareContext';
import type { CompareProduct } from '@/lib/types/compare';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ProductCompareProps {
  products: CompareProduct[];
  dict: any;
  onRemove: (productId: string) => void;
  onClearAll: () => void;
}

export function ProductCompare({ products, dict, onRemove, onClearAll }: ProductCompareProps) {
  const { productIds } = useCompare();

  // Memoize comparison rows to prevent unnecessary re-renders
  const comparisonRows = useMemo(() => {
    return [
      {
        label: dict.wishlist?.image || 'Image',
        values: products.map((p) => ({
          value: p.image,
          type: 'image',
        })),
      },
      {
        label: dict.wishlist?.name || 'Name',
        values: products.map((p) => ({
          value: p.name,
          type: 'text',
        })),
      },
      {
        label: dict.products?.price || 'Price',
        values: products.map((p) => ({
          value: p.price,
          type: 'price',
        })),
      },
      {
        label: dict.products?.dimensions || 'Dimensions',
        values: products.map((p) => ({
          value: p.dimensions
            ? `${p.dimensions.length || '-'} × ${p.dimensions.width || '-'} × ${p.dimensions.thickness || '-'} mm`
            : 'N/A',
          type: 'text',
        })),
      },
      {
        label: dict.products?.surfaceArea || 'Surface Area',
        values: products.map((p) => ({
          value: p.dimensions?.surfaceArea
            ? `${p.dimensions.surfaceArea.toLocaleString()} m²`
            : 'N/A',
          type: 'text',
        })),
      },
    ];
  }, [products, dict]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">{dict.compare?.empty || 'No products to compare'}</h2>
        <p className="text-muted-foreground mb-6">
          {dict.compare?.emptyMessage || 'Add products to compare their specifications'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {dict.compare?.title || 'Compare Products'} ({products.length})
        </h2>
        <Button variant="outline" onClick={onClearAll}>
          {dict.compare?.clearAll || 'Clear All'}
        </Button>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-6">
          {/* Mobile: Stacked layout */}
          <div className="lg:hidden">
            {products.map((product, index) => (
              <div key={product.id} className="mb-6 pb-6 border-b last:border-0">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(product.id)}
                  >
                    {dict.compare?.remove || 'Remove'}
                  </Button>
                </div>

                {product.image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <span className="font-medium">{dict.products?.price || 'Price'}:</span>{' '}
                    {product.price}
                  </div>
                  <div>
                    <span className="font-medium">{dict.products?.dimensions || 'Dimensions'}:</span>{' '}
                    {product.dimensions
                      ? `${product.dimensions.length || '-'} × ${product.dimensions.width || '-'} × ${product.dimensions.thickness || '-'} mm`
                      : 'N/A'}
                  </div>
                  {product.dimensions?.surfaceArea && (
                    <div>
                      <span className="font-medium">{dict.products?.surfaceArea || 'Surface Area'}:</span>{' '}
                      {product.dimensions.surfaceArea.toLocaleString()} m²
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Side-by-side layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[200px_1fr] gap-4">
              {/* Labels column */}
              <div className="space-y-4">
                {comparisonRows.map((row, index) => (
                  <div key={index} className="flex items-center h-20 font-medium">
                    {row.label}
                  </div>
                ))}
              </div>

              {/* Products columns */}
              <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="space-y-4">
                    {/* Remove button */}
                    <div className="flex items-center h-20">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(product.id)}
                        className="w-full"
                      >
                        {dict.compare?.remove || 'Remove'}
                      </Button>
                    </div>

                    {/* Values */}
                    {comparisonRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex items-center h-20">
                        {row.values[rowIndex]?.type === 'image' && row.values[rowIndex]?.value ? (
                          <div className="relative w-full h-32">
                            <Image
                              src={row.values[rowIndex].value}
                              alt={product.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        ) : (
                          <span className="text-sm">{row.values[rowIndex]?.value || 'N/A'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
