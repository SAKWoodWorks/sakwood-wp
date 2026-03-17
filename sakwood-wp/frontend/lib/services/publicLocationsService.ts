import { API_CONFIG } from '@/lib/config/constants';

/**
 * Public Location Types (for branches, dealers, retail partners)
 */
export interface PublicLocation {
  id: number;
  name: string;
  address: string;
  suite_shop?: string;
  province: string;
  district?: string;
  postal_code?: string;
  phone: string;
  website?: string;
  business_hours?: string;
  email?: string;
  image_url?: string;
  latitude: number;
  longitude: number;
  category: string;
  is_active: boolean;
  distance?: number; // In kilometers, if location-based search
}

export interface PublicLocationsResponse {
  locations: PublicLocation[];
}

/**
 * Get all public locations (branches, dealers, retail partners)
 */
export async function getPublicLocations(
  category?: string,
  province?: string,
  lat?: number,
  lng?: number,
  radius?: number
): Promise<PublicLocation[]> {
  try {
    const params = new URLSearchParams();

    if (category) params.append('category', category);
    if (province) params.append('province', province);
    if (lat !== undefined) params.append('lat', lat.toString());
    if (lng !== undefined) params.append('lng', lng.toString());
    if (radius !== undefined) params.append('radius', radius.toString());

    const queryString = params.toString();
    const url = `${API_CONFIG.endpoint}/public-locations${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch public locations:', response.status);
      return [];
    }

    const locations: PublicLocation[] = await response.json();

    // Calculate distances if lat/lng provided
    if (lat !== undefined && lng !== undefined) {
      locations.forEach((location) => {
        location.distance = calculateDistance(
          lat,
          lng,
          location.latitude,
          location.longitude
        );
      });

      // Filter by radius
      if (radius !== undefined) {
        const filtered = locations.filter((loc) => loc.distance! <= radius);
        return filtered.sort((a, b) => a.distance! - b.distance!);
      }
    }

    return locations;
  } catch (error) {
    console.error('Error fetching public locations:', error);
    return [];
  }
}

/**
 * Get public locations nearest to a location
 */
export async function getNearestPublicLocations(
  lat: number,
  lng: number,
  radius: number = 100
): Promise<PublicLocation[]> {
  return getPublicLocations(undefined, undefined, lat, lng, radius);
}

/**
 * Get public locations by category
 */
export async function getPublicLocationsByCategory(category: string): Promise<PublicLocation[]> {
  return getPublicLocations(category);
}

/**
 * Get public locations by province
 */
export async function getPublicLocationsByProvince(province: string): Promise<PublicLocation[]> {
  return getPublicLocations(undefined, province);
}

/**
 * Get all public locations
 */
export async function getAllPublicLocations(): Promise<PublicLocation[]> {
  return getPublicLocations();
}

/**
 * Get location categories
 */
export async function getPublicLocationCategories(): Promise<string[]> {
  try {
    const url = `${API_CONFIG.endpoint}/public-locations/categories`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch location categories:', response.status);
      return [];
    }

    const categories: string[] = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching location categories:', error);
    return [];
  }
}

/**
 * Get location provinces
 */
export async function getPublicLocationProvinces(): Promise<string[]> {
  try {
    const url = `${API_CONFIG.endpoint}/public-locations/provinces`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch location provinces:', response.status);
      return [];
    }

    const provinces: string[] = await response.json();
    return provinces;
  } catch (error) {
    console.error('Error fetching location provinces:', error);
    return [];
  }
}

/**
 * Calculate distance between two coordinates (in kilometers)
 * Uses Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const earthRadius = 6371; // Earth's radius in kilometers

  const latDiff = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const lngDiff = (lng2 * Math.PI) / 180 - (lng1 * Math.PI) / 180;

  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(lngDiff / 2) *
      Math.sin(lngDiff / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}
