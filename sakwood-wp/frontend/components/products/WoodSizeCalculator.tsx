'use client';

import { useState } from 'react';
import { Calculator, Ruler, Box, Weight, Info } from 'lucide-react';

interface WoodSizeCalculatorProps {
  lang?: string;
  dictionary?: {
    calculator?: {
      title: string;
      subtitle: string;
      length: string;
      width: string;
      thickness: string;
      quantity: string;
      calculate: string;
      clear: string;
      results: string;
      total_volume: string;
      total_pieces: string;
      estimated_weight: string;
      per_piece: string;
      cubic_meter: string;
      piece: string;
      kg: string;
      info_title: string;
      info_description: string;
      tips_title: string;
      tip1: string;
      tip2: string;
      tip3: string;
    };
  };
}

export function WoodSizeCalculator({ lang = 'th', dictionary }: WoodSizeCalculatorProps) {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [results, setResults] = useState<{
    volumePerPiece: number;
    totalVolume: number;
    totalPieces: number;
    totalWeight: number;
  } | null>(null);

  const dict = dictionary?.calculator || {
    title: lang === 'th' ? 'เครื่องคำนวณขนาดไม้' : 'Wood Size Calculator',
    subtitle: lang === 'th' ? 'คำนวณปริมาตรไม้ที่ต้องการสำหรับโปรเจกต์ของคุณ' : 'Calculate the wood volume needed for your project',
    length: lang === 'th' ? 'ความยาว (ซม.)' : 'Length (cm)',
    width: lang === 'th' ? 'ความกว้าง (ซม.)' : 'Width (cm)',
    thickness: lang === 'th' ? 'ความหนา (ซม.)' : 'Thickness (cm)',
    quantity: lang === 'th' ? 'จำนวน' : 'Quantity',
    calculate: lang === 'th' ? 'คำนวณ' : 'Calculate',
    clear: lang === 'th' ? 'ล้างค่า' : 'Clear',
    results: lang === 'th' ? 'ผลการคำนวณ' : 'Results',
    total_volume: lang === 'th' ? 'ปริมาตรรวม' : 'Total Volume',
    total_pieces: lang === 'th' ? 'จำนวนไม้ทั้งหมด' : 'Total Pieces',
    estimated_weight: lang === 'th' ? 'น้ำหนักโดยประมาณ' : 'Estimated Weight',
    per_piece: lang === 'th' ? 'ต่อไม้' : 'per piece',
    cubic_meter: lang === 'th' ? 'ลบ.ม.' : 'm³',
    piece: lang === 'th' ? 'ไม้' : 'pieces',
    kg: lang === 'th' ? 'กก.' : 'kg',
    info_title: lang === 'th' ? 'ข้อมูลเพิ่มเติม' : 'Additional Information',
    info_description: lang === 'th'
      ? 'น้ำหนักคำนวณโดยใช้ความหนาแน่นเฉลี่ยของไม้สนเกรด A ที่ 500 กก./ลบ.ม. น้ำหนักจริงอาจแตกต่างตามชนิดไม้และความชื้น'
      : 'Weight calculated using average density of Grade A pine at 500 kg/m³. Actual weight may vary by wood type and moisture content.',
    tips_title: lang === 'th' ? 'คำแนะนำ' : 'Tips',
    tip1: lang === 'th' ? 'ควรเผื่อนไม้เพิ่ม 5-10% สำหรับของเสีย' : 'Add 5-10% extra for waste/cuts',
    tip2: lang === 'th' ? 'ตรวจสอบหน่วยวัดให้แน่ใจว่าถูกต้อง' : 'Double-check your measurements',
    tip3: lang === 'th' ? 'ปรึกษาผู้ขายเพื่อขอราคาล่วงหน้า' : 'Contact supplier for bulk pricing',
  };

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const t = parseFloat(thickness);
    const q = parseInt(quantity);

    if (isNaN(l) || isNaN(w) || isNaN(t) || l <= 0 || w <= 0 || t <= 0) {
      alert(lang === 'th' ? 'กรุณากรอกขนาดที่ถูกต้อง' : 'Please enter valid dimensions');
      return;
    }

    // Calculate volume per piece in cubic meters (cm to m conversion: divide by 100)
    const volumePerPiece = (l / 100) * (w / 100) * (t / 100);

    // Total volume
    const totalVolume = volumePerPiece * q;

    // Estimated weight (average pine wood density ~500 kg/m³)
    const totalWeight = totalVolume * 500;

    setResults({
      volumePerPiece,
      totalVolume,
      totalPieces: q,
      totalWeight,
    });
  };

  const clear = () => {
    setLength('');
    setWidth('');
    setThickness('');
    setQuantity('1');
    setResults(null);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 shadow-lg border border-blue-100">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-blue-600 rounded-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{dict.title}</h3>
          <p className="text-gray-600">{dict.subtitle}</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Length */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Ruler className="w-4 h-4" />
            {dict.length}
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="200"
            step="0.1"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Width */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Box className="w-4 h-4" />
            {dict.width}
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="20"
            step="0.1"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Thickness */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Calculator className="w-4 h-4" />
            {dict.thickness}
          </label>
          <input
            type="number"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            placeholder="5"
            step="0.1"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Info className="w-4 h-4" />
            {dict.quantity}
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={calculate}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          {dict.calculate}
        </button>
        <button
          onClick={clear}
          className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
        >
          {dict.clear}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Box className="w-5 h-5 text-blue-600" />
            {dict.results}
          </h4>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Total Volume */}
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{dict.total_volume}</div>
              <div className="text-3xl font-bold text-blue-900">
                {results.totalVolume.toFixed(4)}
              </div>
              <div className="text-sm text-gray-500">{dict.cubic_meter}</div>
            </div>

            {/* Total Pieces */}
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{dict.total_pieces}</div>
              <div className="text-3xl font-bold text-green-700">
                {results.totalPieces}
              </div>
              <div className="text-sm text-gray-500">{dict.piece}</div>
            </div>

            {/* Estimated Weight */}
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{dict.estimated_weight}</div>
              <div className="text-3xl font-bold text-orange-700">
                {results.totalWeight.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">{dict.kg}</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>{dict.per_piece}:</strong> {results.volumePerPiece.toFixed(6)} {dict.cubic_meter}
            </p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5" />
          {dict.tips_title}
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            {dict.tip1}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            {dict.tip2}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            {dict.tip3}
          </li>
        </ul>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>{dict.info_title}:</strong> {dict.info_description}
        </p>
      </div>
    </div>
  );
}
