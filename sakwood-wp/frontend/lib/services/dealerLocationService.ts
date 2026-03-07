import { API_CONFIG } from '@/lib/config/constants';

/**
 * Dealer Location Types
 */
export interface DealerLocation {
  id: number;
  user_id: number;
  business_name: string;
  address: string;
  province: string;
  district?: string;
  postal_code?: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  business_hours?: string;
  tier: string;
  tierDisplayName: string;
  discountPercentage: number;
  territories: string[];
  distance?: number; // In kilometers, if location-based search
  user_email?: string;
  display_name?: string;
}

export interface DealerLocationsResponse {
  locations: DealerLocation[];
}

/**
 * Get all active dealer locations
 */
export async function getDealerLocations(
  province?: string,
  lat?: number,
  lng?: number,
  radius?: number
): Promise<DealerLocation[]> {
  try {
    const params = new URLSearchParams();

    if (province) params.append('province', province);
    if (lat !== undefined) params.append('lat', lat.toString());
    if (lng !== undefined) params.append('lng', lng.toString());
    if (radius !== undefined) params.append('radius', radius.toString());

    const queryString = params.toString();
    const url = `${API_CONFIG.endpoint}/dealer/locations${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch dealer locations:', response.status);
      return [];
    }

    const locations: DealerLocation[] = await response.json();
    return locations;
  } catch (error) {
    console.error('Error fetching dealer locations:', error);
    return [];
  }
}

/**
 * Get dealers nearest to a location
 */
export async function getNearestDealers(
  lat: number,
  lng: number,
  radius: number = 100
): Promise<DealerLocation[]> {
  return getDealerLocations(undefined, lat, lng, radius);
}

/**
 * Get dealers by province
 */
export async function getDealersByProvince(province: string): Promise<DealerLocation[]> {
  return getDealerLocations(province);
}

/**
 * Get all dealers (no filters)
 */
export async function getAllDealers(): Promise<DealerLocation[]> {
  return getDealerLocations();
}

/**
 * Get Thailand provinces list
 */
export function getThailandProvinces(): { name: string; name_en: string }[] {
  return [
    { name: 'กรุงเทพมหานคร', name_en: 'Bangkok' },
    { name: 'สมุทรปราการ', name_en: 'Samut Prakan' },
    { name: 'นนทบุรี', name_en: 'Nonthaburi' },
    { name: 'ปทุมธานี', name_en: 'Pathum Thani' },
    { name: 'พระนครศรีอยุธยา', name_en: 'Ayutthaya' },
    { name: 'อ่างทอง', name_en: 'Ang Thong' },
    { name: 'ลพบุรี', name_en: 'Lopburi' },
    { name: 'สิงห์บุรี', name_en: 'Sing Buri' },
    { name: 'ชัยนาท', name_en: 'Chai Nat' },
    { name: 'สระบุรี', name_en: 'Saraburi' },
    { name: 'ชลบุรี', name_en: 'Chonburi' },
    { name: 'ระยอง', name_en: 'Rayong' },
    { name: 'จันทบุรี', name_en: 'Chanthaburi' },
    { name: 'ตราด', name_en: 'Trat' },
    { name: 'ฉะเชิงเทรา', name_en: 'Chachoengsao' },
    { name: 'ปราจีนบุรี', name_en: 'Prachinburi' },
    { name: 'นครนายก', name_en: 'Nakhon Nayok' },
    { name: 'สระแก้ว', name_en: 'Sa Kaeo' },
    { name: 'นครราชสีมา', name_en: 'Nakhon Ratchasima' },
    { name: 'บุรีรัมย์', name_en: 'Buri Ram' },
    { name: 'สุรินทร์', name_en: 'Surin' },
    { name: 'ศรีสะเกษ', name_en: 'Sisaket' },
    { name: 'อุบลราชธานี', name_en: 'Ubon Ratchathani' },
    { name: 'ยโสธร', name_en: 'Yasothon' },
    { name: 'ชัยภูมิ', name_en: 'Chaiyaphum' },
    { name: 'อำนาจเจริญ', name_en: 'Amnat Charoen' },
    { name: 'บึงกาฬ', name_en: 'Bueng Kan' },
    { name: 'หนองบัวลำภู', name_en: 'Nong Bua Lam Phu' },
    { name: 'ขอนแก่น', name_en: 'Khon Kaen' },
    { name: 'อุดรธานี', name_en: 'Udon Thani' },
    { name: 'เลย', name_en: 'Loei' },
    { name: 'หนองคาย', name_en: 'Nong Khai' },
    { name: 'มหาสารคาม', name_en: 'Maha Sarakham' },
    { name: 'ร้อยเอต', name_en: 'Roi Et' },
    { name: 'กาฬสินธุ์', name_en: 'Kalasin' },
    { name: 'สกลนคร', name_en: 'Sakon Nakhon' },
    { name: 'นครพนม', name_en: 'Nakhon Phanom' },
    { name: 'มุกดาหาร', name_en: 'Mukdahan' },
    { name: 'เชียงใหม่', name_en: 'Chiang Mai' },
    { name: 'ลำปาง', name_en: 'Lampang' },
    { name: 'ลำพูน', name_en: 'Lamphun' },
    { name: 'แพร่', name_en: 'Phrae' },
    { name: 'น่าน', name_en: 'Nan' },
    { name: 'พะเยา', name_en: 'Phayao' },
    { name: 'เชียงราย', name_en: 'Chiang Rai' },
    { name: 'แม่ฮ่องสอน', name_en: 'Mae Hong Son' },
    { name: 'ประจวบคีรีขันธ์', name_en: 'Prachuap Khiri Khan' },
    { name: 'กาญจนบุรี', name_en: 'Kanchanaburi' },
    { name: 'ราชบุรี', name_en: 'Ratchaburi' },
    { name: 'เพชรบุรี', name_en: 'Phetchaburi' },
    { name: 'ประจวบคีรีขันธ์', name_en: 'Prachuap Khiri Khan' },
    { name: 'นครศรีธรรมราช', name_en: 'Nakhon Si Thammarat' },
    { name: 'กระบี่', name_en: 'Krabi' },
    { name: 'พังงา', name_en: 'Phangnga' },
    { name: 'ภูเก็ต', name_en: 'Phuket' },
    { name: 'สุราษฎร์ธานี', name_en: 'Surat Thani' },
    { name: 'ระนอง', name_en: 'Ranong' },
    { name: 'ชุมพร', name_en: 'Chumphon' },
    { name: 'สงขลา', name_en: 'Songkhla' },
    { name: 'สตูล', name_en: 'Satun' },
    { name: 'ตรัง', name_en: 'Trang' },
    { name: 'พัทลุง', name_en: 'Phatthalung' },
    { name: 'ปัตตานี', name_en: 'Pattani' },
    { name: 'ยะลา', name_en: 'Yala' },
    { name: 'นราธิวาสราชนคร', name_en: 'Narathiwat' },
  ];
}
