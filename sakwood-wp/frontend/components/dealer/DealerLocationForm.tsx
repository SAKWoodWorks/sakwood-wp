'use client';

import { useState, useEffect } from 'react';
import { MapPin, Save, Loader2, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getThailandProvinces } from '@/lib/services/dealerLocationService';

interface DealerLocationFormProps {
  lang: Locale;
  dictionary: {
    dealer_location?: {
      title?: string;
      subtitle?: string;
      business_name?: string;
      address?: string;
      province?: string;
      district?: string;
      postal_code?: string;
      phone?: string;
      email?: string;
      business_hours?: string;
      coordinates?: string;
      latitude?: string;
      longitude?: string;
      save_button?: string;
      saving?: string;
      saved?: string;
      error_loading?: string;
      error_saving?: string;
      use_current_location?: string;
      detecting_location?: string;
    };
  };
  initialData?: {
    business_name?: string;
    address?: string;
    province?: string;
    district?: string;
    postal_code?: string;
    phone?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    business_hours?: string;
  };
  onSave?: (locationData: any) => void;
}

export function DealerLocationForm({
  lang,
  dictionary,
  initialData,
  onSave
}: DealerLocationFormProps) {
  const dict = dictionary.dealer_location || {};
  const provinces = getThailandProvinces();

  const [formData, setFormData] = useState({
    business_name: initialData?.business_name || '',
    address: initialData?.address || '',
    province: initialData?.province || '',
    district: initialData?.district || '',
    postal_code: initialData?.postal_code || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    business_hours: initialData?.business_hours || '',
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === 'th' ? 'เบราว์เซอร์ไม่รองรับการระบุตำแหน่ง' : 'Geolocation is not supported by your browser');
      return;
    }

    setSaving(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setSaving(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError(lang === 'th' ? 'ไม่สามารถระบุตำแหน่งได้' : 'Unable to get your location');
        setSaving(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const response = await fetch('/api/dealer/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: null, // Will be determined server-side from session
          locationData: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save location');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      if (onSave) {
        onSave(formData);
      }
    } catch (err: any) {
      setError(err.message || (dict.error_saving || 'Failed to save location'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-blue-900 mb-1">
            {dict.title || (lang === 'th' ? 'ข้อมูลตำแหน่งร้านค้า' : 'Store Location')}
          </h3>
          <p className="text-sm text-gray-600">
            {dict.subtitle || (lang === 'th' ? 'ระบุตำแหน่งร้านค้าของคุณเพื่อให้ลูกค้าหาคุณได้ง่ายขึ้น' : 'Specify your store location so customers can find you easily')}
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">{dict.saved || (lang === 'th' ? 'บันทึกแล้ว' : 'Saved!')}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Business Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {dict.business_name || (lang === 'th' ? 'ชื่อกิจการ' : 'Business Name')} *
        </label>
        <input
          type="text"
          required
          value={formData.business_name}
          onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={lang === 'th' ? 'เช่น บริษัท ไม้สาทิศ ไทย จำกัด' : 'e.g., Sathorn Wood Co., Ltd.'}
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {dict.address || (lang === 'th' ? 'ที่อยู่' : 'Address')} *
        </label>
        <textarea
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={lang === 'th' ? 'เลขที่, ถนน, แขวง/ตำบล' : 'House number, street, sub-district'}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Province */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {dict.province || (lang === 'th' ? 'จังหวัด' : 'Province')} *
          </label>
          <select
            required
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{lang === 'th' ? 'เลือกจังหวัด' : 'Select Province'}</option>
            {provinces.map((province) => (
              <option key={province.name_en} value={province.name}>
                {lang === 'th' ? province.name : province.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {dict.district || (lang === 'th' ? 'เขต/อำเภอ' : 'District')}
          </label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={lang === 'th' ? 'เขต/อำเภอ' : 'e.g., Pathum Wan'}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Postal Code */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {dict.postal_code || (lang === 'th' ? 'รหัสไปรษณีย์' : 'Postal Code')}
          </label>
          <input
            type="text"
            value={formData.postal_code}
            onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10110"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {dict.phone || (lang === 'th' ? 'โทรศัพท์' : 'Phone')} *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="02-123-4567"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {dict.email || (lang === 'th' ? 'อีเมล' : 'Email')} *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="contact@company.com"
        />
      </div>

      {/* Coordinates */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-900" />
          <span className="font-semibold text-blue-900">
            {dict.coordinates || (lang === 'th' ? 'พิกัด' : 'Coordinates')} *
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict.latitude || (lang === 'th' ? 'ละติจูด' : 'Latitude')}
            </label>
            <input
              type="number"
              step="any"
              required
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="13.7563"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict.longitude || (lang === 'th' ? 'ลองจิจูด' : 'Longitude')}
            </label>
            <input
              type="number"
              step="any"
              required
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100.5018"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleDetectLocation}
          disabled={saving}
          className="text-sm text-blue-900 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <MapPin className="w-4 h-4" />
          {dict.use_current_location || (lang === 'th' ? 'ใช้ตำแหน่งปัจจุบัน' : 'Use Current Location')}
        </button>
      </div>

      {/* Business Hours */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {dict.business_hours || (lang === 'th' ? 'เวลาทำการ' : 'Business Hours')}
        </label>
        <textarea
          value={formData.business_hours}
          onChange={(e) => setFormData({ ...formData, business_hours: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={lang === 'th' ? 'จันทร์ - ศุกร์: 9:00 - 17:00 น.\nเสาร์: 9:00 - 12:00 น.' : 'Monday - Friday: 9:00 - 17:00\nSaturday: 9:00 - 12:00'}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {dict.saving || (lang === 'th' ? 'กำลังบันทึก...' : 'Saving...')}
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {dict.save_button || (lang === 'th' ? 'บันทึกข้อมูล' : 'Save Location')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
