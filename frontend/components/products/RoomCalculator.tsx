'use client';

import { useState, useMemo } from 'react';
import { Calculator, Home, Layers, LampCeiling, Info, AlertCircle } from 'lucide-react';
import type { Product } from '@/lib/types/product';

interface WoodProduct {
  id: string;
  name: string;
  thickness: number; // in cm
  width: number;  // in cm
  length: number; // in cm (converted from m)
  price?: string;
  categories?: Array<{ slug: string; name: string }>;
}

interface RoomCalculatorProps {
  lang?: string;
  dictionary?: Record<string, any>;
  products?: Product[];
}

// Standard product sizes (thickness in cm, width in cm, length in cm)
const STANDARD_PRODUCTS: Record<string, WoodProduct[]> = {
  floor: [
    { id: 'floor-1', name: 'ไม้พื้น 1.2x12x240cm', thickness: 1.2, width: 12, length: 240 },
    { id: 'floor-2', name: 'ไม้พื้น 1.5x15x300cm', thickness: 1.5, width: 15, length: 300 },
    { id: 'floor-3', name: 'ไม้พื้น 1.8x18x360cm', thickness: 1.8, width: 18, length: 360 },
  ],
  siding: [
    { id: 'siding-1', name: 'ไม้ฝา 1.2x12x240cm', thickness: 1.2, width: 12, length: 240 },
    { id: 'siding-2', name: 'ไม้ฝา 1.5x15x300cm', thickness: 1.5, width: 15, length: 300 },
  ],
  ceiling: [
    { id: 'ceiling-1', name: 'ไม้ฝ้า 1.2x12x240cm', thickness: 1.2, width: 12, length: 240 },
    { id: 'ceiling-2', name: 'ไม้ฝ้า 1.5x15x300cm', thickness: 1.5, width: 15, length: 300 },
  ],
};

export function RoomCalculator({ lang = 'th', dictionary, products = [] }: RoomCalculatorProps) {
  const [projectType, setProjectType] = useState<'floor' | 'siding' | 'ceiling'>('floor');
  const [roomWidth, setRoomWidth] = useState('');
  const [roomLength, setRoomLength] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [wastePercentage, setWastePercentage] = useState('10');
  const [gapBetweenPieces, setGapBetweenPieces] = useState('0.2'); // Default 2mm in cm
  const [selectedProduct, setSelectedProduct] = useState<WoodProduct | null>(null);
  const [results, setResults] = useState<{
    totalArea: number;
    piecesNeeded: number;
    areaWithWaste: number;
    wasteAmount: number;
    estimatedCost?: number;
    costPerPiece?: number;
    gapBetweenPieces?: number;
  } | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Convert Product[] to WoodProduct[] (API returns thickness/width in cm, length in m)
  const convertedProducts: WoodProduct[] = useMemo(() => {
    return products
      .filter(p => {
        const thickness = typeof p.thickness === 'string' ? parseFloat(p.thickness) : (p.thickness ?? 0);
        const width = typeof p.width === 'string' ? parseFloat(p.width) : (p.width ?? 0);
        const length = typeof p.length === 'string' ? parseFloat(p.length) : (p.length ?? 0);
        return width > 0 && length > 0 && thickness > 0; // Only include products with valid dimensions
      })
      .map(p => ({
        id: p.id,
        name: p.name,
        thickness: typeof p.thickness === 'string' ? parseFloat(p.thickness) : (p.thickness ?? 0), // Already in cm
        width: typeof p.width === 'string' ? parseFloat(p.width) : (p.width ?? 0), // Already in cm
        length: Math.round((typeof p.length === 'string' ? parseFloat(p.length) : (p.length ?? 0)) * 100), // Convert m to cm
        price: p.price,
        categories: p.categories?.map(c => ({ slug: c.slug, name: c.name })),
      }));
  }, [products]);

  const dict = dictionary?.room_calculator || {
    title: lang === 'th' ? 'เครื่องคำนวณห้อง' : 'Room Calculator',
    subtitle: lang === 'th'
      ? 'คำนวณปริมาณไม้ที่ต้องการสำหรับโปรเจกต์ของคุณ'
      : 'Calculate the amount of wood needed for your project',
    project_type: lang === 'th' ? 'ประเภทโปรเจกต์' : 'Project Type',
    select_project: lang === 'th' ? 'เลือกประเภทโปรเจกต์' : 'Select Project Type',
    floor: lang === 'th' ? 'ไม้พื้น' : 'Floor',
    siding: lang === 'th' ? 'ไม้ฝา' : 'Siding',
    ceiling: lang === 'th' ? 'ไม้ฝ้า' : 'Ceiling',
    room_dimensions: lang === 'th' ? 'ขนาดห้อง' : 'Room Dimensions',
    width_m: lang === 'th' ? 'ความกว้าง (เมตร)' : 'Width (meters)',
    length_m: lang === 'th' ? 'ความยาว (เมตร)' : 'Length (meters)',
    height_m: lang === 'th' ? 'ความสูง (เมตร)' : 'Height (meters)',
    calculate: lang === 'th' ? 'คำนวณ' : 'Calculate',
    clear: lang === 'th' ? 'ล้างค่า' : 'Clear',
    results: lang === 'th' ? 'ผลการคำนวณ' : 'Results',
    total_area: lang === 'th' ? 'พื้นที่รวม' : 'Total Area',
    sqm: lang === 'th' ? 'ตร.ม.' : 'm²',
    pieces_needed: lang === 'th' ? 'จำนวนแผ่นที่ต้องการ' : 'Pieces Needed',
    piece: lang === 'th' ? 'แผ่น' : 'pieces',
    waste_factor: lang === 'th' ? 'ค่าของเสีย' : 'Waste Factor',
    include_waste: lang === 'th' ? 'รวมค่าของเสีย' : 'Include waste',
    waste_percentage: lang === 'th' ? 'เผื่อค่าของเสีย (%)' : 'Waste allowance (%)',
    product_recommendations: lang === 'th' ? 'สินค้าแนะนำ' : 'Recommended Products',
    recommended_product: lang === 'th' ? 'สินค้าที่แนะนำ' : 'Recommended Product',
    coverage_per_piece: lang === 'th' ? 'ครอบคลุมต่อแผ่น' : 'Coverage per piece',
    total_with_waste: lang === 'th' ? 'รวมค่าของเสีย' : 'Total with waste',
    waste_amount: lang === 'th' ? 'ค่าของเสีย' : 'Waste amount',
    tips_title: lang === 'th' ? 'คำแนะนำ' : 'Tips',
    tip1: lang === 'th'
      ? 'วัดห้องอย่างละเอียดเพื่อความแม่นยำ'
      : 'Measure room carefully for accuracy',
    tip2: lang === 'th'
      ? 'ควรเผื่อนพื้นที่เพิ่มสำหรับบริเวณที่ไม่สมมากัน'
      : 'Add extra area for uneven surfaces',
    tip3: lang === 'th'
      ? 'สำหรับฝ้า ควรพิจารณ์ความสูงด้วย'
      : 'Consider ceiling height for siding',
    tip4: lang === 'th' ? 'ติดต่อผู้ขายเพื่อขอราคาจำนวณเพิ่มเติม' : 'Contact supplier for detailed quote',
    no_products: lang === 'th' ? 'ไม่มีสินค้า' : 'No products available',
    estimated_cost: lang === 'th' ? 'ราคาประเมิน' : 'Estimated Cost',
    cost_per_piece: lang === 'th' ? 'ราคาต่อแผ่น' : 'Cost per piece',
    total_cost: lang === 'th' ? 'รวมทั้งหมด' : 'Total Cost',
    price_not_available: lang === 'th' ? 'ไม่มีราคา' : 'Price not available',
    contact_for_quote: lang === 'th' ? 'ติดต่อเราเพื่อขอราคา' : 'Contact us for a quote',
    thb: lang === 'th' ? '฿' : 'THB',
    select_product: lang === 'th' ? 'เลือกสินค้า' : 'Select Product',
    all_products: lang === 'th' ? 'สินค้าทั้งหมด' : 'All Products',
    recommended_for: lang === 'th' ? 'แนะนำสำหรับ' : 'Recommended for',
    gap_between_pieces: lang === 'th' ? 'ร่องระหว่างแผ่น (ซม.)' : 'Gap Between Pieces (cm)',
    gap_description: lang === 'th' ? 'ระยะห่างระหว่างแผ่นไม้ (เช่น 0.2 ซม. = 2 มม.)' : 'Distance between wood pieces (e.g. 0.2cm = 2mm)',
    with_gap: lang === 'th' ? 'รวมร่องห่าง' : 'With gap',
    effective_width: lang === 'th' ? 'ความกว้างรวมร่อง' : 'Effective width',
  };

  // Category slug to project type mapping
  const categoryMapping: Record<string, string[]> = {
    floor: ['floor', 'flooring', 'ไม้พื้น', 'wood-floor'],
    siding: ['siding', 'wall', 'ไม้ฝา', 'wood-siding'],
    ceiling: ['ceiling', 'ไม้ฝ้า', 'wood-ceiling'],
  };

  // Filter products by category for recommendations
  const recommendedProducts = useMemo(() => {
    if (convertedProducts.length === 0) return [];

    const categorySlugs = categoryMapping[projectType] || [];
    return convertedProducts.filter(product => {
      if (!product.categories || product.categories.length === 0) return false;
      return product.categories.some(cat =>
        categorySlugs.some(slug => cat.slug.includes(slug))
      );
    });
  }, [convertedProducts, projectType]);

  const allProducts = convertedProducts.length > 0 ? convertedProducts : STANDARD_PRODUCTS[projectType];
  const defaultProduct = allProducts[0];

  const calculate = () => {
    const width = parseFloat(roomWidth);
    const length = parseFloat(roomLength);
    const height = parseFloat(roomHeight);
    const product = selectedProduct || defaultProduct;
    const gap = parseFloat(gapBetweenPieces) || 0;

    if (isNaN(width) || isNaN(length) || width <= 0 || length <= 0) {
      alert(lang === 'th' ? 'กรุณากรอกขนาดห้องที่ถูกต้อง' : 'Please enter valid room dimensions');
      return;
    }

    // Calculate total area based on project type
    let totalArea = 0;

    if (projectType === 'floor') {
      // Floor: width x length
      totalArea = width * length;
    } else if (projectType === 'ceiling') {
      // Ceiling: width x length
      totalArea = width * length;
    } else if (projectType === 'siding') {
      // Siding: (width + width + length + length) x height (perimeter x height)
      if (isNaN(height) || height <= 0) {
        alert(lang === 'th' ? 'กรุณากรอกความสูงสำหรับไม้ฝา' : 'Please enter ceiling height for siding');
        return;
      }
      totalArea = (width + width + length + length) * height;
    }

    // Calculate effective width with gap (in cm)
    const effectiveWidth = product.width + gap;

    // Calculate pieces needed considering the gap
    // For floor/ceiling: calculate based on width with gap
    // For siding: calculate based on width with gap
    let piecesNeeded = 0;

    if (projectType === 'floor' || projectType === 'ceiling') {
      // Calculate how many pieces fit across the width (with gap)
      const roomWidthCm = width * 100; // Convert to cm
      const piecesPerRow = Math.ceil(roomWidthCm / effectiveWidth);

      // Calculate how many rows needed
      const pieceLengthCm = product.length / 100; // Already in meters
      const numberOfRows = Math.ceil(length / pieceLengthCm);

      piecesNeeded = piecesPerRow * numberOfRows;
    } else if (projectType === 'siding') {
      // For siding, calculate based on perimeter and height
      const perimeterCm = (width + width + length + length) * 100;
      const piecesPerRow = Math.ceil(perimeterCm / effectiveWidth);
      const numberOfRows = Math.ceil(height); // height is in meters, piece length is in meters
      piecesNeeded = piecesPerRow * numberOfRows;
    }

    // Add waste factor based on user input
    const wastePercent = parseFloat(wastePercentage) || 0;
    const wasteMultiplier = 1 + (wastePercent / 100);
    const areaWithWaste = totalArea * wasteMultiplier;
    const wasteAmount = areaWithWaste - totalArea;
    piecesNeeded = Math.ceil(piecesNeeded * wasteMultiplier);

    // Calculate estimated cost if product has price
    let estimatedCost = undefined;
    let costPerPiece = undefined;
    if (product.price) {
      // Parse price (e.g., "1,200.00฿" or "1200" or "1200.00")
      const priceValue = parseFloat(product.price.replace(/[^\d.]/g, ''));
      if (!isNaN(priceValue)) {
        costPerPiece = priceValue;
        estimatedCost = priceValue * piecesNeeded;
      }
    }

    setResults({
      totalArea,
      piecesNeeded,
      areaWithWaste,
      wasteAmount,
      estimatedCost,
      costPerPiece,
      gapBetweenPieces: gap,
    });
  };

  const clear = () => {
    setRoomWidth('');
    setRoomLength('');
    setRoomHeight('');
    setWastePercentage('10');
    setGapBetweenPieces('0.2');
    setSelectedProduct(null);
    setResults(null);
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'floor':
        return <Home className="w-5 h-5" />;
      case 'siding':
        return <Layers className="w-5 h-5" />;
      case 'ceiling':
        return <LampCeiling className="w-5 h-5" />;
      default:
        return <Calculator className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-green-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 bg-green-600 rounded-lg">
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{dict.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{dict.subtitle}</p>
        </div>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors w-full sm:w-auto"
        >
          {showInstructions ? (lang === 'th' ? 'ซ่อนวิธีใช้' : 'Hide Instructions') : (lang === 'th' ? 'แสดงวิธีใช้' : 'Show Instructions')}
        </button>
      </div>

      {/* How to Use Instructions */}
      {showInstructions && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            {lang === 'th' ? 'วิธีการคำนวณ' : 'How to Calculate'}
          </h4>

          {/* Formula Explanation */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">
              {lang === 'th' ? 'สูตรคำนวณ' : 'Calculation Formula'}
            </h5>
            <div className="text-xs sm:text-sm text-gray-700 space-y-2">
              {projectType === 'floor' && (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="font-bold text-green-700 text-sm sm:text-base">{dict.floor}:</span>
                    <span className="bg-white px-2 sm:px-3 py-1 rounded border border-gray-300 text-xs sm:text-sm">
                      {dict.width_m} × {dict.length_m} = {dict.total_area}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {lang === 'th' ? 'ตัวอย่าง: ห้องกว้าง 3 เมตร × ยาว 4 เมตร = 12 ตร.ม.' : 'Example: 3m × 4m room = 12 m²'}
                  </div>
                </>
              )}
              {projectType === 'ceiling' && (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="font-bold text-green-700 text-sm sm:text-base">{dict.ceiling}:</span>
                    <span className="bg-white px-2 sm:px-3 py-1 rounded border border-gray-300 text-xs sm:text-sm">
                      {dict.width_m} × {dict.length_m} = {dict.total_area}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {lang === 'th' ? 'ตัวอย่าง: เพดานกว้าง 3 เมตร × ยาว 4 เมตร = 12 ตร.ม.' : 'Example: 3m × 4m ceiling = 12 m²'}
                  </div>
                </>
              )}
              {projectType === 'siding' && (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="font-bold text-green-700 text-sm sm:text-base">{dict.siding}:</span>
                    <span className="bg-white px-2 sm:px-3 py-1 rounded border border-gray-300 text-xs sm:text-sm break-all">
                      ({dict.width_m} + {dict.width_m} + {dict.length_m} + {dict.length_m}) × {dict.height_m} = {dict.total_area}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {lang === 'th' ? 'ตัวอย่าง: (3 + 3 + 4 + 4) × 2.5 = 35 ตร.ม.' : 'Example: (3 + 3 + 4 + 4) × 2.5 = 35 m²'}
                  </div>
                </>
              )}
            </div>
          </div>

          <ol className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
            <li className="flex gap-2 sm:gap-3">
              <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
              <span className="text-xs sm:text-sm">
                <strong>{dict.select_project}:</strong> {lang === 'th' ? 'เลือกไม้พื้น, ไม้ฝา, หรือไม้ฝ้า' : 'Choose Floor, Siding, or Ceiling'}
              </span>
            </li>
            <li className="flex gap-2 sm:gap-3">
              <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</span>
              <span className="text-xs sm:text-sm">
                <strong>{dict.room_dimensions}:</strong> {lang === 'th' ? 'กรอกความกว้างและความยาวของห้อง (เมตร)' : 'Enter room width and length (meters)'}
                {projectType === 'siding' && ` + ${dict.height_m}`}
              </span>
            </li>
            <li className="flex gap-2 sm:gap-3">
              <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</span>
              <span className="text-xs sm:text-sm">
                <strong>{dict.product_recommendations}:</strong> {lang === 'th' ? 'เลือกขนาดไม้ที่ต้องการใช้งาน' : 'Select the wood size you want to use'}
              </span>
            </li>
            <li className="flex gap-2 sm:gap-3">
              <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">4</span>
              <span className="text-xs sm:text-sm">
                <strong>{dict.calculate}:</strong> {lang === 'th' ? 'คลิกปุ่มคำนวณเพื่อดูผลลัพธ์' : 'Click Calculate button to see results'}
              </span>
            </li>
          </ol>
        </div>
      )}

      {/* Project Type Selection */}
      <div className="mb-4 sm:mb-6">
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
          <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
          {dict.project_type}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          {(['floor', 'siding', 'ceiling'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setProjectType(type);
                setSelectedProduct(null);
                setResults(null);
              }}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all flex flex-row sm:flex-col items-center gap-2 ${
                projectType === type
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <span className="flex-shrink-0">{getProjectIcon(type)}</span>
              <span className="font-medium text-sm sm:text-base">{dict[type]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Room Dimensions */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          {dict.room_dimensions}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Width */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              {dict.width_m}
            </label>
            <input
              type="number"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value)}
              placeholder="3"
              step="0.1"
              min="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Length */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              {dict.length_m}
            </label>
            <input
              type="number"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value)}
              placeholder="4"
              step="0.1"
              min="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Height (only for siding) */}
          {projectType === 'siding' && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {dict.height_m}
              </label>
              <input
                type="number"
                value={roomHeight}
                onChange={(e) => setRoomHeight(e.target.value)}
                placeholder="2.5"
                step="0.1"
                min="0"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Waste Factor */}
        <div>
          <label htmlFor="waste" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            {dict.waste_percentage}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="waste"
              value={wastePercentage}
              onChange={(e) => setWastePercentage(e.target.value)}
              placeholder="10"
              step="1"
              min="0"
              max="50"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="text-sm sm:text-base text-gray-600 font-medium">%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'th' ? 'แนะนำ 5-15%' : 'Recommended 5-15%'}
          </p>
        </div>

        {/* Gap Between Pieces */}
        <div>
          <label htmlFor="gap" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            {dict.gap_between_pieces}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="gap"
              value={gapBetweenPieces}
              onChange={(e) => setGapBetweenPieces(e.target.value)}
              placeholder="0.2"
              step="0.1"
              min="0"
              max="2"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="text-sm sm:text-base text-gray-600 font-medium">cm</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {dict.gap_description}
          </p>
        </div>
      </div>

      {/* Product Selection */}
      <div className="mb-4 sm:mb-6">
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
          <Info className="w-3 h-3 sm:w-4 sm:h-4" />
          {dict.product_recommendations}
        </label>

        {allProducts.length === 0 ? (
          <div className="p-4 sm:p-6 bg-gray-100 rounded-lg text-center">
            <p className="text-sm sm:text-base text-gray-600 mb-2">{dict.no_products}</p>
            <p className="text-xs sm:text-sm text-gray-500">
              Make sure your products have dimensions (Thickness, Width, Length) set in WordPress admin.
            </p>
          </div>
        ) : (
          <>
            {/* Recommended Products (by category) */}
            {recommendedProducts.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <div className="text-xs sm:text-sm font-medium text-green-700 mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {dict.recommended_for} {dict[projectType]}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                  {recommendedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                        selectedProduct?.id === product.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-green-200 hover:border-green-400 bg-green-50/50'
                      }`}
                    >
                      <div className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{product.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {product.thickness} x {product.width} x {(product.length / 100).toFixed(2)} cm/m
                      </div>
                      {product.price && (
                        <div className="text-xs sm:text-sm text-green-700 font-semibold mt-1">
                          {product.price}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All Products Dropdown */}
            <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                {dict.all_products}
              </label>
              <select
                value={selectedProduct?.id || ''}
                onChange={(e) => {
                  const product = allProducts.find(p => p.id === e.target.value);
                  if (product) setSelectedProduct(product);
                }}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">{dict.select_product}</option>
                {allProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.thickness}x{product.width}x{(product.length / 100).toFixed(2)}cm
                    {product.price ? ` (${product.price})` : ''}
                  </option>
                ))}
              </select>
              {selectedProduct && (
                <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded text-xs sm:text-sm">
                  <div className="font-medium text-gray-900">{selectedProduct.name}</div>
                  <div className="text-gray-600">
                    {selectedProduct.thickness} x {selectedProduct.width} x {(selectedProduct.length / 100).toFixed(2)} cm/m
                  </div>
                  {selectedProduct.price && (
                    <div className="text-green-700 font-semibold mt-1">
                      {selectedProduct.price}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={calculate}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
          {dict.calculate}
        </button>
        <button
          onClick={clear}
          className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors text-sm sm:text-base"
        >
          {dict.clear}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            {dict.results}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            {/* Total Area */}
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">{dict.total_area}</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-900">
                {results.totalArea.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{dict.sqm}</div>
            </div>

            {/* Pieces Needed */}
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">{dict.pieces_needed}</div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-900">
                {results.piecesNeeded}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{dict.piece}</div>
            </div>

            {/* Waste Amount */}
            <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                {dict.waste_amount} ({parseFloat(wastePercentage) || 0}%)
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-red-900">
                {results.wasteAmount.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{dict.sqm}</div>
            </div>

            {/* With Waste */}
            <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">{dict.total_with_waste}</div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-900">
                {results.areaWithWaste.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{dict.sqm}</div>
            </div>
          </div>

          {/* Recommended Product Details */}
          {selectedProduct && (
            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="text-xs sm:text-sm text-gray-700">
                <strong>{dict.recommended_product}:</strong> {selectedProduct.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                <strong>{dict.coverage_per_piece}:</strong> {((selectedProduct.width / 100) * (selectedProduct.length / 100)).toFixed(2)} {dict.sqm}
              </div>
              {results.gapBetweenPieces !== undefined && results.gapBetweenPieces > 0 && (
                <>
                  <div className="text-xs sm:text-sm text-gray-600">
                    <strong>{dict.gap_between_pieces}:</strong> {results.gapBetweenPieces.toFixed(1)} cm
                  </div>
                  <div className="text-xs sm:text-sm text-blue-700">
                    <strong>{dict.effective_width}:</strong> {(selectedProduct.width + results.gapBetweenPieces).toFixed(1)} cm ({selectedProduct.width} + {results.gapBetweenPieces})
                  </div>
                </>
              )}
              {selectedProduct.price && (
                <div className="text-xs sm:text-sm text-green-700">
                  <strong>{dict.cost_per_piece}:</strong> {selectedProduct.price}
                </div>
              )}
            </div>
          )}

          {/* Price Breakdown */}
          {results.estimatedCost !== undefined && results.costPerPiece !== undefined ? (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <h4 className="text-base sm:text-lg font-bold text-green-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                {dict.estimated_cost}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Cost Per Piece */}
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg border border-green-200">
                  <span className="text-xs sm:text-sm text-gray-700">{dict.cost_per_piece}:</span>
                  <span className="text-sm sm:text-base font-bold text-green-900">
                    {results.costPerPiece.toFixed(2)} {dict.thb}
                  </span>
                </div>

                {/* Total Cost */}
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg border border-green-300">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">{dict.total_cost}:</span>
                  <span className="text-lg sm:text-xl font-bold text-green-900">
                    {results.estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {dict.thb}
                  </span>
                </div>
              </div>

              {/* Calculation Details */}
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-white rounded-lg border border-green-100">
                <div className="text-xs text-gray-600 space-y-1">
                  <div>
                    <span className="font-medium">{results.piecesNeeded}</span> {dict.piece} × <span className="font-medium">{results.costPerPiece.toFixed(2)}</span> {dict.thb} = <span className="font-bold text-green-900">{results.estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {dict.thb}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-yellow-900 mb-1">
                    {dict.price_not_available}
                  </div>
                  <div className="text-xs text-yellow-800">
                    {dict.contact_for_quote}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 lg:p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          {dict.tips_title}
        </h4>
        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5 text-sm sm:text-base">•</span>
            <span className="text-xs sm:text-sm">{dict.tip1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5 text-sm sm:text-base">•</span>
            <span className="text-xs sm:text-sm">{dict.tip2}</span>
          </li>
          {projectType === 'siding' && (
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5 text-sm sm:text-base">•</span>
              <span className="text-xs sm:text-sm">{dict.tip3}</span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5 text-sm sm:text-base">•</span>
            <span className="text-xs sm:text-sm">{dict.tip4}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
