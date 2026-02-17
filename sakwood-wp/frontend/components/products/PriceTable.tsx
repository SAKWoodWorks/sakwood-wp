'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product, PriceType } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import { ArrowUpDown, Filter, Eye, ShoppingCart, GitCompare, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getPriceLabel, getAllPrices } from '@/lib/utils/priceTypes';
import { loadThaiFont, needsCustomFont } from '@/lib/utils/pdfFont';

interface PriceTableProps {
  products: Product[];
  lang: Locale;
  dictionary?: {
    common?: {
      view_details: string;
    };
    product?: {
      add_to_cart: string;
      add_to_compare: string;
      in_stock: string;
      out_of_stock: string;
      contact_for_price: string;
    };
    price_table?: {
      title: string;
      subtitle: string;
      search_placeholder: string;
      filter_by: string;
      all_categories: string;
      sort_by: string;
      product_name: string;
      price: string;
      dimensions: string;
      grade: string;
      stock: string;
      actions: string;
      no_results: string;
      sort_name_asc: string;
      sort_name_desc: string;
      sort_price_asc: string;
      sort_price_desc: string;
      export_pdf: string;
      price_per_piece?: string;
      price_per_meter?: string;
      price_per_sqm?: string;
      price_per_cubic_foot?: string;
      price_per_cubic_meter?: string;
      price_per_board_foot?: string;
      price_types?: string;
      view_all_prices?: string;
    };
  };
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export function PriceTable({ products, lang, dictionary }: PriceTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const dict = dictionary?.price_table || {
    title: lang === 'th' ? 'ตารางราคาสินค้า' : 'Product Price List',
    subtitle: lang === 'th'
      ? 'เปรียบเทียบราคาและสเปกสินค้าได้ที่นี่'
      : 'Compare prices and specifications at a glance',
    search_placeholder: lang === 'th' ? 'ค้นหาสินค้า...' : 'Search products...',
    filter_by: lang === 'th' ? 'กรองตามหมวดหมู่:' : 'Filter by:',
    all_categories: lang === 'th' ? 'ทั้งหมด' : 'All Categories',
    sort_by: lang === 'th' ? 'เรียงตาม:' : 'Sort by:',
    product_name: lang === 'th' ? 'ชื่อสินค้า' : 'Product',
    price: lang === 'th' ? 'ราคา' : 'Price',
    dimensions: lang === 'th' ? 'ขนาด' : 'Dimensions',
    grade: lang === 'th' ? 'เกรด' : 'Grade',
    stock: lang === 'th' ? 'สถานะ' : 'Stock',
    actions: lang === 'th' ? 'ดำเนินการ' : 'Actions',
    no_results: lang === 'th' ? 'ไม่พบสินค้า' : 'No products found',
    sort_name_asc: lang === 'th' ? 'ชื่อ A-Z' : 'Name A-Z',
    sort_name_desc: lang === 'th' ? 'ชื่อ Z-A' : 'Name Z-A',
    sort_price_asc: lang === 'th' ? 'ราคา น้อย-มาก' : 'Price Low-High',
    sort_price_desc: lang === 'th' ? 'ราคา มาก-น้อย' : 'Price High-Low',
    export_pdf: lang === 'th' ? 'ส่งออก PDF' : 'Export PDF',
  };

  // Export to PDF function
  const exportToPDF = async () => {
    const doc = new jsPDF();

    // Load Thai font if needed
    if (needsCustomFont(lang)) {
      try {
        const thaiFontBase64 = await loadThaiFont();
        if (thaiFontBase64) {
          doc.addFileToVFS('Sarabun-Regular.ttf', thaiFontBase64);
          doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
          doc.setFont('Sarabun');
        }
      } catch (error) {
        console.error('Failed to load Thai font, using default font:', error);
      }
    }

    // Add title
    doc.setFontSize(18);
    doc.text(dict.title, 14, 22);

    // Add subtitle
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(dict.subtitle, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 36);

    // Build headers using allPriceTypes
    const headers = [
      dict.product_name,
      ...allPriceTypes.map(type => getPriceLabel(type, lang, dictionary)),
      dict.stock
    ];

    // Build table data
    const tableData = filteredAndSortedProducts.map(product => {
      const stockStatus = getStockStatus(product);
      const allPrices = getAllPrices(product);
      const pricesMap = new Map(allPrices.map(p => [p.type, p.amount]));

      // Map each price type column to its price or "-"
      const priceColumns = allPriceTypes.map(type => {
        const price = pricesMap.get(type);
        return price ? formatPrice(price, type) : '-';
      });

      return [
        product.name,
        ...priceColumns,
        stockStatus.text
      ];
    });

    // Calculate column widths dynamically
    const baseColumnWidths = {
      product: 60,
      stock: 20
    };

    // Distribute remaining width among price columns
    const totalBaseWidth = Object.values(baseColumnWidths).reduce((a, b) => a + b, 0);
    const availableWidth = 190 - totalBaseWidth; // Total page width is ~190
    const priceColumnWidth = Math.floor(availableWidth / allPriceTypes.length);

    // Build column styles
    const columnStyles: Record<number, { cellWidth: number }> = {
      0: { cellWidth: baseColumnWidths.product },
    };

    // Add price column styles
    allPriceTypes.forEach((_, index) => {
      columnStyles[1 + index] = { cellWidth: priceColumnWidth };
    });

    // Add stock column style
    columnStyles[1 + allPriceTypes.length] = { cellWidth: baseColumnWidths.stock };

    // Add table
    autoTable(doc, {
      startY: 44,
      head: [headers],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 2,
        font: needsCustomFont(lang) ? 'Sarabun' : 'helvetica',
      },
      headStyles: {
        fillColor: [30, 58, 138],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      columnStyles,
    });

    // Add footer
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);

      // Use Thai font if needed
      if (needsCustomFont(lang)) {
        doc.setFont('Sarabun');
      }

      doc.text(
        `SAK WoodWorks - ${lang === 'th' ? 'ผู้จำหน่ายไม้คุณภาพสูง' : 'Premium Wood Products Supplier'}`,
        14,
        doc.internal.pageSize.height - 10
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10,
        { align: 'right' }
      );
    }

    // Save PDF
    const fileName = `sakwood-price-list-${lang}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  // Collect all unique price types across all products
  const allPriceTypes = useMemo(() => {
    const priceTypes = new Set<PriceType>();
    products.forEach(product => {
      (product.priceTypes || ['piece']).forEach(type => {
        priceTypes.add(type);
      });
    });
    // Sort: piece first, then alphabetically
    return Array.from(priceTypes).sort((a, b) => {
      if (a === 'piece') return -1;
      if (b === 'piece') return 1;
      return a.localeCompare(b);
    });
  }, [products]);

  // Collect all unique categories from products
  const allCategories = useMemo(() => {
    const categoryMap = new Map<string, string>(); // slug -> name

    products.forEach(product => {
      const categories = product.categories || [];
      categories.forEach(cat => {
        categoryMap.set(cat.slug, cat.name);
      });
    });

    // Convert to array and sort alphabetically
    return Array.from(categoryMap.entries()).map(([slug, name]) => ({
      slug,
      name
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter (based on product categories)
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => {
        const categories = product.categories || [];
        const categorySlugs = categories.map((c: any) => c.slug);
        return categorySlugs.includes(categoryFilter);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || '0');
          return priceA - priceB;
        case 'price-desc':
          const priceA2 = parseFloat(a.price?.replace(/[^\d.]/g, '') || '0');
          const priceB2 = parseFloat(b.price?.replace(/[^\d.]/g, '') || '0');
          return priceB2 - priceA2;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, categoryFilter, sortBy]);

  // Helper function to get stock status
  const getStockStatus = (product: Product) => {
    const stock = product.stockStatus || 'instock';
    if (stock === 'instock') {
      return {
        text: dictionary?.product?.in_stock || (lang === 'th' ? 'มีสินค้า' : 'In Stock'),
        className: 'bg-green-100 text-green-700'
      };
    }
    return {
      text: dictionary?.product?.out_of_stock || (lang === 'th' ? 'หมด' : 'Out of Stock'),
      className: 'bg-red-100 text-red-700'
    };
  };

  // Helper function to format price with currency
  const formatPrice = (amount: string | undefined, priceType: PriceType): string => {
    if (!amount) return lang === 'th' ? 'ติดต่อ' : 'Contact';

    // Remove existing currency symbols and format
    const cleanAmount = amount.replace(/[฿THB\s,]/g, '');
    const currency = lang === 'th' ? ' บาท' : ' THB';
    const label = getPriceLabel(priceType, lang, dictionary);

    // Extract the part after "/" for the label
    const labelPart = label.includes('/') ? label.split('/')[1] : priceType;
    return `${cleanAmount}${currency}/${labelPart}`;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{dict.title}</h2>
        <p className="text-gray-600">{dict.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {lang === 'th' ? 'ตัวเลือกการแสดงผล' : 'Display Options'}
            </h3>
            <p className="text-sm text-gray-500">
              {filteredAndSortedProducts.length} {lang === 'th' ? 'สินค้า' : 'products'}
            </p>
          </div>
          <button
            onClick={exportToPDF}
            disabled={filteredAndSortedProducts.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            {dict.export_pdf}
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.search_placeholder}
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder={dict.search_placeholder}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.filter_by}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">{dict.all_categories}</option>
              {allCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {dict.sort_by}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="name-asc">{dict.sort_name_asc}</option>
              <option value="name-desc">{dict.sort_name_desc}</option>
              <option value="price-asc">{dict.sort_price_asc}</option>
              <option value="price-desc">{dict.sort_price_desc}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold">{dict.product_name}</th>
                {allPriceTypes.map(type => (
                  <th key={type} className="px-4 py-4 text-left text-sm font-semibold">
                    {getPriceLabel(type, lang, dictionary)}
                  </th>
                ))}
                <th className="px-4 py-4 text-left text-sm font-semibold">{dict.stock}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{dict.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product, index) => {
                  const stockStatus = getStockStatus(product);
                  const allPrices = getAllPrices(product);
                  const pricesMap = new Map(allPrices.map(p => [p.type, p.amount]));

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {product.image?.sourceUrl && (
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={product.image.sourceUrl}
                                alt={product.name}
                                fill
                                className="object-cover rounded-lg"
                                unoptimized
                              />
                            </div>
                          )}
                          <div>
                            <Link
                              href={`/${lang}/products/${product.slug}`}
                              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm"
                            >
                              {product.name}
                            </Link>
                            {product.shortDescription && (
                              <p
                                className="text-xs text-gray-500 mt-1 line-clamp-1"
                                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      {allPriceTypes.map(type => (
                        <td key={type} className="px-4 py-4 text-sm">
                          <span className="font-semibold text-blue-900">
                            {pricesMap.get(type) ? formatPrice(pricesMap.get(type)!, type) : '-'}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${stockStatus.className}`}
                        >
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/${lang}/products/${product.slug}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title={dictionary?.common?.view_details || (lang === 'th' ? 'ดูรายละเอียด' : 'View Details')}
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title={dictionary?.product?.add_to_cart || (lang === 'th' ? 'ใส่ตะกร้า' : 'Add to Cart')}
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                            title={dictionary?.product?.add_to_compare || (lang === 'th' ? 'เปรียบเทียบ' : 'Compare')}
                          >
                            <GitCompare className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3 + allPriceTypes.length} className="px-6 py-12 text-center">
                    <p className="text-gray-500 text-lg">{dict.no_results}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden px-4 py-6 space-y-4">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => {
              const stockStatus = getStockStatus(product);
              const allPrices = getAllPrices(product);
              const pricesMap = new Map(allPrices.map(p => [p.type, p.amount]));

              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex gap-3">
                    {product.image?.sourceUrl && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={product.image.sourceUrl}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${lang}/products/${product.slug}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {stockStatus.text}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {allPriceTypes.map(type => (
                      <div key={type} className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">
                          {getPriceLabel(type, lang, dictionary)}
                        </div>
                        <div className="text-sm font-semibold text-blue-900">
                          {pricesMap.get(type) ? formatPrice(pricesMap.get(type)!, type) : '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                    <Link
                      href={`/${lang}/products/${product.slug}`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{dict.no_results}</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-blue-900">
            {lang === 'th'
              ? `แสดง ${filteredAndSortedProducts.length} จาก ${products.length} สินค้า`
              : `Showing ${filteredAndSortedProducts.length} of ${products.length} products`
            }
          </p>
        </div>
      )}
    </div>
  );
}
