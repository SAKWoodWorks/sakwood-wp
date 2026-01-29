'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ShoppingCart, GitCompare, Loader2 } from 'lucide-react';
import { useCompare } from '@/lib/context/CompareContext';
import { useCart } from '@/lib/context/CartContext';
import type { Product } from '@/lib/types/product';
import Image from 'next/image';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
  dictionary?: {
    quick_view?: {
      title: string;
      close: string;
      add_to_cart: string;
      add_to_compare: string;
      view_full_details: string;
      dimensions: string;
      thickness: string;
      width: string;
      length: string;
      volume: string;
      sku: string;
      category: string;
      in_stock: string;
      out_of_stock: string;
      loading: string;
      added_to_cart: string;
    };
    product?: {
      add_to_cart: string;
      add_to_quote: string;
      contact_for_price: string;
    };
  };
}

export function QuickViewModal({ product, isOpen, onClose, lang = 'th', dictionary }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useCompare();
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const dict = dictionary?.quick_view || {
    title: lang === 'th' ? 'ดูสินค้าอย่างรวดเห็น' : 'Quick View',
    close: lang === 'th' ? 'ปิด' : 'Close',
    add_to_cart: lang === 'th' ? 'ใส่ตะกร้า' : 'Add to Cart',
    add_to_compare: lang === 'th' ? 'เปรียบเทียบ' : 'Compare',
    view_full_details: lang === 'th' ? 'ดูรายละเอียด' : 'View Full Details',
    dimensions: lang === 'th' ? 'ขนาดสินค้า' : 'Dimensions',
    thickness: lang === 'th' ? 'ความหนา' : 'Thickness',
    width: lang === 'th' ? 'ความกว้าง' : 'Width',
    length: lang === 'th' ? 'ความยาว' : 'Length',
    volume: lang === 'th' ? 'ปริมาตร' : 'Volume',
    sku: lang === 'th' ? 'รหัสสินค้า' : 'SKU',
    category: lang === 'th' ? 'หมวดหมู่' : 'Category',
    in_stock: lang === 'th' ? 'มีสินค้า' : 'In Stock',
    out_of_stock: lang === 'th' ? 'สินค้าหมด' : 'Out of Stock',
    loading: lang === 'th' ? 'กำลังเพิ่ม...' : 'Adding...',
    added_to_cart: lang === 'th' ? 'เพิ่มแล้ว!' : 'Added!',
  };

  const productDict = dictionary?.product || {
    add_to_cart: lang === 'th' ? 'ใส่ตะกร้า' : 'Add to Cart',
    add_to_quote: lang === 'th' ? 'ขอใบเสนอราคา' : 'Add to Quote',
    contact_for_price: lang === 'th' ? 'ติดต่อสอบถามราคา' : 'Contact for Price',
  };

  useEffect(() => {
    if (isOpen) {
      setAddedToCart(false);
      setImageError(false);
    }
  }, [isOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Get all focusable elements within the modal
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];

      // Focus the first element
      firstElement?.focus();

      // Handle Tab key to trap focus within modal
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const lastElement = focusableElements[focusableElements.length - 1];

        // If Shift+Tab on first element, move to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
        // If Tab on last element, move to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      // Handle Escape key to close modal
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleTab);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleTab);
        document.removeEventListener('keydown', handleEscape);
        // Restore focus when modal closes
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCompare = () => {
    addToCompare(product);
  };

  const hasDimensions = product.thickness && product.width && product.length;
  const inStock = true; // TODO: Check stock status from API

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 ${
        isOpen ? 'visible' : 'invisible'
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative mx-2 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors z-10 bg-white/80 sm:bg-transparent"
          aria-label={dict.close}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
          <h2 id="quick-view-title" className="text-xl sm:text-2xl font-bold">{dict.title}</h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Product Image */}
            <div className="relative">
              {product.image ? (
                <div className="relative aspect-square sm:aspect-auto sm:h-80 bg-gray-100 rounded-lg overflow-hidden">
                  {imageError ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs sm:text-sm">{lang === 'th' ? 'ไม่พบรูปภาพ' : 'No image'}</p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={product.image?.sourceUrl || ''}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
              ) : (
                <div className="aspect-square sm:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3 sm:space-y-4">
              {/* Stock Status */}
              <div>
                <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    inStock ? 'bg-green-600' : 'bg-red-600'
                  }`} />
                  {inStock ? dict.in_stock : dict.out_of_stock}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{product.name}</h3>

              {/* Price */}
              {product.price && (
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {product.price} บาท
                </div>
              )}

              {/* Dimensions */}
              {hasDimensions && (
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">{dict.dimensions}</h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-600">{dict.thickness}:</span>
                      <span className="ml-1 sm:ml-2 font-medium text-gray-900">{product.thickness} cm</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{dict.width}:</span>
                      <span className="ml-1 sm:ml-2 font-medium text-gray-900">{product.width} cm</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{dict.length}:</span>
                      <span className="ml-1 sm:ml-2 font-medium text-gray-900">{product.length} m</span>
                    </div>
                    {(product as any).volume && (
                      <div>
                        <span className="text-gray-600">{dict.volume}:</span>
                        <span className="ml-1 sm:ml-2 font-medium text-gray-900">{(product as any).volume.toFixed(4)} m³</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="prose prose-xs sm:prose-sm max-w-none text-gray-700">
                  <p>{product.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={loading || addedToCart || !inStock}
                  className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } ${loading || !inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      {dict.loading}
                    </>
                  ) : addedToCart ? (
                    <>
                      <span className="text-lg sm:text-xl">✓</span>
                      {dict.added_to_cart}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      {product.price ? dict.add_to_cart : productDict.add_to_quote}
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={handleAddToCompare}
                    disabled={isInCompare(product.id)}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                      isInCompare(product.id)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <GitCompare className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">{dict.add_to_compare}</span>
                  </button>

                  <a
                    href={`/${lang}/products/${product.slug}`}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold border-2 border-gray-800 hover:border-gray-900 text-gray-800 hover:text-gray-900 hover:bg-gray-50 transition-all text-xs sm:text-sm"
                  >
                    {dict.view_full_details}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
