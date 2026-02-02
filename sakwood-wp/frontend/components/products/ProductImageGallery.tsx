'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Combine main image with gallery images
  // Main image is the cover/first image, followed by gallery images
  const images: string[] = [];
  
  // Add main image as cover/first image
  if (product.image?.sourceUrl) {
    images.push(product.image.sourceUrl);
  }
  
  // Add gallery images
  if (product.galleryImages?.nodes) {
    product.galleryImages.nodes.forEach(img => {
      if (img.sourceUrl && !images.includes(img.sourceUrl)) {
        images.push(img.sourceUrl);
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        {images[selectedImage] ? (
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer transition-all',
                selectedImage === index
                  ? 'ring-2 ring-blue-900 ring-offset-2'
                  : 'hover:ring-2 hover:ring-blue-600'
              )}
              aria-label={`View ${index + 1}`}
            >
              <img
                src={img}
                alt={`${product.name} - View ${index + 1}`}
                className={cn(
                  'w-full h-full object-cover transition-opacity',
                  selectedImage === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
