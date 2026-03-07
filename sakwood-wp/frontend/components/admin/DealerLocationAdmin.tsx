'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Trash2, Loader2, Edit, Star, Clock } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { DealerLocation } from '@/lib/services/dealerLocationService';

interface DealerLocationAdminProps {
  lang: Locale;
  dictionary: {
    admin?: {
      dealer_locations?: {
        title?: string;
        subtitle?: string;
        no_locations?: string;
        loading?: string;
        delete_confirm?: string;
        delete_success?: string;
        delete_error?: string;
        refresh?: string;
        dealer_info?: {
          name?: string;
          tier?: string;
          email?: string;
          phone?: string;
          address?: string;
          coordinates?: string;
          hours?: string;
          territories?: string;
        };
      };
    };
  };
}

export function DealerLocationAdmin({ lang, dictionary }: DealerLocationAdminProps) {
  const dict = dictionary.admin?.dealer_locations || {};
  const [locations, setLocations] = useState<DealerLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/dealer-locations');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      setLocations(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dealer locations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, businessName: string) => {
    if (!confirm(`${dict.delete_confirm || (lang === 'th' ? 'ลบ' : 'Delete')} "${businessName}"?`)) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/api/admin/dealer-locations?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete location');
      }

      // Remove from list
      setLocations(locations.filter(loc => loc.id !== id));
    } catch (err: any) {
      alert(err.message || (dict.delete_error || 'Failed to delete location'));
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-900" />
        <p className="mt-4 text-gray-600">{dict.loading || (lang === 'th' ? 'กำลังโหลด...' : 'Loading...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p>{error}</p>
        <button
          onClick={fetchLocations}
          className="mt-3 text-sm underline hover:no-underline"
        >
          {dict.refresh || (lang === 'th' ? 'ลองอีกครั้ง' : 'Try Again')}
        </button>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">{dict.no_locations || (lang === 'th' ? 'ไม่พบตำแหน่งร้านค้า' : 'No dealer locations found')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-1">
            {dict.title || (lang === 'th' ? 'จัดการตำแหน่งร้านค้า' : 'Manage Dealer Locations')}
          </h2>
          <p className="text-sm text-gray-600">
            {dict.subtitle || (lang === 'th' ? 'จัดการข้อมูลตำแหน่งร้านค้าของตัวแทนจำหน่ายทั้งหมด' : 'Manage all dealer location data')}
          </p>
        </div>
        <button
          onClick={fetchLocations}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {dict.refresh || (lang === 'th' ? 'รีเฟรช' : 'Refresh')}
        </button>
      </div>

      <div className="grid gap-4">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-bold text-blue-900">{location.business_name}</h3>
                  {location.tier && (
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      location.tier === 'platinum'
                        ? 'bg-purple-100 text-purple-800'
                        : location.tier === 'gold'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <Star className="w-3.5 h-3.5" />
                      {location.tierDisplayName}
                    </span>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {location.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="hover:text-blue-900">
                        {location.phone}
                      </a>
                    </div>
                  )}
                  {location.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a href={`mailto:${location.email}`} className="hover:text-blue-900 break-all">
                        {location.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>{location.address}</p>
                    <p>
                      {location.district && `${location.district}, `}
                      {location.province} {location.postal_code}
                    </p>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="mt-2 text-sm text-gray-500">
                  <strong>{dict.dealer_info?.coordinates || (lang === 'th' ? 'พิกัด' : 'Coordinates')}:</strong>{' '}
                  {location.latitude}, {location.longitude}
                </div>

                {/* Business Hours */}
                {location.business_hours && (
                  <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>{dict.dealer_info?.hours || (lang === 'th' ? 'เวลาทำการ' : 'Business Hours')}:</strong>
                      <p className="whitespace-pre-line">{location.business_hours}</p>
                    </div>
                  </div>
                )}

                {/* Territories */}
                {location.territories && location.territories.length > 0 && (
                  <div className="mt-3 text-sm">
                    <strong className="text-gray-700">{dict.dealer_info?.territories || (lang === 'th' ? 'พื้นที่ให้บริการ' : 'Service Areas')}:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {location.territories.map((territory) => (
                        <span
                          key={territory}
                          className="inline-block px-2 py-1 bg-blue-50 text-blue-900 rounded text-xs"
                        >
                          {territory}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => {/* TODO: Implement edit */}}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(location.id, location.business_name)}
                  disabled={deleting === location.id}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete"
                >
                  {deleting === location.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
