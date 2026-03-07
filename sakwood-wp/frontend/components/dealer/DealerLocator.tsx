'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, Search, Store, Clock, Phone, Mail, Star } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getDealerLocations, getThailandProvinces, type DealerLocation } from '@/lib/services/dealerLocationService';

interface DealerLocatorProps {
  lang: Locale;
  dictionary: {
    dealer_locator?: {
      page_title?: string;
      subtitle?: string;
      search_placeholder?: string;
      find_nearest?: string;
      filter_by_province?: string;
      all_provinces?: string;
      dealer_info?: {
        name?: string;
        tier?: string;
        address?: string;
        phone?: string;
        email?: string;
        hours?: string;
        territories?: string;
        distance?: string;
      };
    };
  };
}

declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        InfoWindow: new (options?: any) => any;
        LatLng: new (lat: number, lng: number) => any;
        LatLngBounds: new () => any;
        Animation: {
          DROP: number;
        };
        SymbolPath: {
          CIRCLE: number;
        };
        event: {
          addListener(instance: any, eventName: string, handler: () => void): any;
        };
      };
    };
    initDealerMap: () => void;
  }
}

export function DealerLocator({ lang, dictionary }: DealerLocatorProps) {
  const [dealers, setDealers] = useState<DealerLocation[]>([]);
  const [filteredDealers, setFilteredDealers] = useState<DealerLocation[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<DealerLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchRadius, setSearchRadius] = useState(100);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const dict = dictionary.dealer_locator || {};
  const provinces = getThailandProvinces();

  // Load Google Maps API
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initDealerMap&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initDealerMap = () => {
        setMapLoaded(true);
      };
    } else if (window.google) {
      setMapLoaded(true);
    }
  }, []);

  // Initialize map when loaded and dealers are fetched
  useEffect(() => {
    if (mapLoaded && mapRef.current && !mapInstanceRef.current && dealers.length > 0) {
      initMap();
    }
  }, [mapLoaded, dealers]);

  // Update markers when filtered dealers change
  useEffect(() => {
    if (mapInstanceRef.current && filteredDealers.length > 0) {
      updateMarkers();
    }
  }, [filteredDealers]);

  const initMap = () => {
    if (!mapRef.current || !window.google?.maps) return;

    const google = window.google.maps;

    // Center on Thailand
    const thailand = { lat: 13.7563, lng: 100.5018 };

    const map = new google.Map(mapRef.current, {
      zoom: 6,
      center: thailand,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    mapInstanceRef.current = map;
    updateMarkers();
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current || !window.google?.maps) return;

    const google = window.google.maps;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    const bounds = new google.LatLngBounds();

    filteredDealers.forEach((dealer) => {
      const position = { lat: dealer.latitude, lng: dealer.longitude };

      const marker = new google.Marker({
        position,
        map: mapInstanceRef.current,
        title: dealer.business_name,
        animation: google.Animation.DROP,
      });

      // Add click event to show dealer info
      google.event.addListener(marker, 'click', () => {
        setSelectedDealer(dealer);
        mapInstanceRef.current.panTo(position);
        mapInstanceRef.current.setZoom(12);
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (filteredDealers.length > 0) {
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  // Fetch dealers on mount
  useEffect(() => {
    async function loadDealers() {
      setLoading(true);
      const data = await getDealerLocations();
      setDealers(data);
      setFilteredDealers(data);
      setLoading(false);
    }
    loadDealers();
  }, []);

  // Filter by province
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);

    if (province === '') {
      setFilteredDealers(dealers);
    } else {
      // Find the Thai name for the selected English province name
      const selectedProvinceObj = provinces.find(p => p.name_en === province);
      const thaiName = selectedProvinceObj?.name;

      const filtered = dealers.filter((d) => {
        // Check if dealer's province matches (either Thai or English name)
        const provinceMatches = d.province === province || d.province === thaiName;
        // Check if territories contain the province
        const territoryMatches = d.territories?.includes(province) || d.territories?.includes(thaiName || '');
        return provinceMatches || territoryMatches;
      });

      setFilteredDealers(filtered);
    }
  };

  // Find nearest dealers
  const handleFindNearest = () => {
    if (!navigator.geolocation) {
      alert(lang === 'th' ? 'เบราว์เซอร์ไม่รองรับการระบุตำแหน่ง' : 'Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const nearest = await getDealerLocations(undefined, latitude, longitude, searchRadius);
        setFilteredDealers(nearest);

        if (nearest.length > 0 && mapInstanceRef.current && window.google?.maps) {
          const google = window.google.maps;

          // Center map on user location
          mapInstanceRef.current.setCenter({ lat: latitude, lng: longitude });
          mapInstanceRef.current.setZoom(9);

          // Add user location marker
          const userMarker = new google.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapInstanceRef.current,
            icon: {
              path: google.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285f4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
            title: lang === 'th' ? 'ตำแหน่งของคุณ' : 'Your Location',
          });
          markersRef.current.push(userMarker);
        } else {
          alert(lang === 'th' ? `ไม่พบตัวแทนจำหน่ายในรัศมี ${searchRadius} กม.` : `No dealers found within ${searchRadius} km`);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert(lang === 'th' ? 'ไม่สามารถระบุตำแหน่งได้' : 'Unable to get your location');
      }
    );
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Map Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div ref={mapRef} className="w-full h-[500px] md:h-[600px] bg-gray-100" />
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="space-y-6">
        {/* Search Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            {lang === 'th' ? 'ค้นหาตัวแทนจำหน่าย' : 'Find Dealers'}
          </h2>

          {/* Province Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {dict.filter_by_province || (lang === 'th' ? 'กรองตามจังหวัด' : 'Filter by Province')}
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{dict.all_provinces || (lang === 'th' ? 'ทุกจังหวัด' : 'All Provinces')}</option>
              {provinces.map((province) => (
                <option key={province.name_en} value={province.name_en}>
                  {lang === 'th' ? province.name : province.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Find Nearest Button */}
          <button
            onClick={handleFindNearest}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Navigation className="w-5 h-5" />
            {dict.find_nearest || (lang === 'th' ? 'ค้นหาตัวแทนจำหน่ายใกล้ฉัน' : 'Find Nearest Dealers')}
          </button>

          {/* Results Count */}
          <p className="text-sm text-gray-600 text-center">
            {lang === 'th' ? 'พบ' : 'Found'} {filteredDealers.length} {lang === 'th' ? 'รายการ' : 'dealers'}
          </p>
        </div>

        {/* Dealer List */}
        <div className="bg-white rounded-lg shadow-md p-6 max-h-[500px] overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">{lang === 'th' ? 'กำลังโหลด...' : 'Loading...'}</p>
            </div>
          ) : filteredDealers.length === 0 ? (
            <div className="text-center py-8">
              <Store className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">{lang === 'th' ? 'ไม่พบตัวแทนจำหน่าย' : 'No dealers found'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  onClick={() => setSelectedDealer(dealer)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedDealer?.id === dealer.id
                      ? 'border-blue-900 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-blue-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-blue-900 mb-1 truncate">{dealer.business_name}</h3>

                      {/* Tier Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          dealer.tier === 'platinum'
                            ? 'bg-purple-100 text-purple-800'
                            : dealer.tier === 'gold'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <Star className="w-3 h-3" />
                          {dealer.tierDisplayName}
                        </span>
                        {dealer.distance !== undefined && (
                          <span className="text-xs text-gray-500">
                            {dealer.distance.toFixed(1)} km
                          </span>
                        )}
                      </div>

                      {/* Location */}
                      <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                        {dealer.address}, {dealer.province}
                      </p>

                      {/* Phone */}
                      {dealer.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{dealer.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Dealer Modal */}
      {selectedDealer && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDealer(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{selectedDealer.business_name}</h3>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedDealer.tier === 'platinum'
                      ? 'bg-purple-100 text-purple-800'
                      : selectedDealer.tier === 'gold'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <Star className="w-4 h-4" />
                    {selectedDealer.tierDisplayName} Dealer
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDealer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-700">{dict.dealer_info?.address || 'Address'}</p>
                    <p className="text-gray-600">{selectedDealer.address}</p>
                    <p className="text-gray-600">
                      {selectedDealer.district && `${selectedDealer.district}, `}
                      {selectedDealer.province} {selectedDealer.postal_code}
                    </p>
                  </div>
                </div>

                {selectedDealer.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-700">{dict.dealer_info?.phone || 'Phone'}</p>
                      <a
                        href={`tel:${selectedDealer.phone}`}
                        className="text-blue-900 hover:underline"
                      >
                        {selectedDealer.phone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedDealer.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-700">{dict.dealer_info?.email || 'Email'}</p>
                      <a
                        href={`mailto:${selectedDealer.email}`}
                        className="text-blue-900 hover:underline text-sm break-all"
                      >
                        {selectedDealer.email}
                      </a>
                    </div>
                  </div>
                )}

                {selectedDealer.business_hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-700">{dict.dealer_info?.hours || 'Business Hours'}</p>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{selectedDealer.business_hours}</p>
                    </div>
                  </div>
                )}

                {selectedDealer.territories && selectedDealer.territories.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Store className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-700">{dict.dealer_info?.territories || 'Service Areas'}</p>
                      <p className="text-gray-600 text-sm">
                        {selectedDealer.territories.join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                {selectedDealer.discountPercentage > 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      {lang === 'th' ? 'ส่วนลด' : 'Discount'} {selectedDealer.discountPercentage}%
                    </p>
                    <p className="text-green-700 text-sm">
                      {lang === 'th' ? 'สำหรับลูกค้ารายย่อย' : 'For retail customers'}
                    </p>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedDealer(null)}
                className="w-full mt-6 px-6 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
              >
                {lang === 'th' ? 'ปิด' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
