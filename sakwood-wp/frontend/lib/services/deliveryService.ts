// Delivery rate calculation service
// Warehouse location: Pathumtani, Thailand
// Rates are loaded from DeliveryRate.csv

export enum TruckType {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ShippingRate {
  province: string;
  rate: number;
  estimatedDays: string;
  truckType?: TruckType;
}

export interface CartItem {
  length?: number | string;
  width?: number | string;
  thickness?: number | string;
  volume?: number;
  surfaceArea?: number | string;
  quantity: number;
}

// CSV data structure from DeliveryRate.csv
interface DeliveryRateRow {
  zone: string;
  province: string;
  baseRate: number;
  priceTiers: {
    tier1: number;      // 0-10k
    tier2: number;      // 10k-25k
    tier3: number;      // 25k-50k
    tier4: number;      // 50k-75k
    tier5: number;      // 75k-100k
    tier6: number;      // 100k-150k
    tier7: number;      // 150k-200k
    tier8: number;      // 200k-250k
    tier9: number;      // 250k-300k
  };
}

// Parsed delivery rates from CSV
const DELIVERY_RATES: ShippingRate[] = [
  // Zone 1: Bangkok Metropolitan Area (6W)
  { province: 'Pathumtani', rate: 5000, estimatedDays: '1' },
  { province: 'Nonthaburi', rate: 5000, estimatedDays: '1-2' },
  { province: 'Samut Prakan', rate: 5000, estimatedDays: '1-2' },
  { province: 'Nakhon Pathom', rate: 5000, estimatedDays: '1-2' },
  { province: 'Samut Sakhon', rate: 5000, estimatedDays: '1-2' },
  { province: 'Phra Nakhon Si Ayutthaya', rate: 6500, estimatedDays: '2-3' },
  { province: 'Ang Thong', rate: 2000, estimatedDays: '2-3' },
  { province: 'Lopburi', rate: 2000, estimatedDays: '2-3' },
  { province: 'Saraburi', rate: 2000, estimatedDays: '2-3' },
  { province: 'Sing Buri', rate: 2000, estimatedDays: '2-3' },
  { province: 'Chai Nat', rate: 2000, estimatedDays: '2-3' },
  { province: 'Suphan Buri', rate: 2000, estimatedDays: '2-3' },

  // Zone 2: Central Region (10W)
  { province: 'Kanchanaburi', rate: 2500, estimatedDays: '2-3' },
  { province: 'Ratchaburi', rate: 2500, estimatedDays: '2-3' },
  { province: 'Phetchaburi', rate: 2500, estimatedDays: '2-3' },
  { province: 'Prachuap Khiri Khan', rate: 3000, estimatedDays: '3-4' },
  { province: 'Chonburi', rate: 2500, estimatedDays: '2-3' },
  { province: 'Rayong', rate: 2500, estimatedDays: '2-3' },
  { province: 'Chanthaburi', rate: 3000, estimatedDays: '3-4' },
  { province: 'Trat', rate: 3000, estimatedDays: '3-4' },
  { province: 'Chachoengsao', rate: 2000, estimatedDays: '2-3' },
  { province: 'Prachinburi', rate: 2000, estimatedDays: '2-3' },
  { province: 'Sa Kaeo', rate: 2500, estimatedDays: '2-3' },
  { province: 'Nakhon Nayok', rate: 2000, estimatedDays: '2-3' },

  // Zone 3: Northern Region (6W)
  { province: 'Kamphaeng Phet', rate: 4000, estimatedDays: '3-4' },
  { province: 'Tak', rate: 4000, estimatedDays: '3-4' },
  { province: 'Uthai Thani', rate: 3500, estimatedDays: '3-4' },
  { province: 'Nakhon Sawan', rate: 3000, estimatedDays: '2-3' },
  { province: 'Phichit', rate: 3500, estimatedDays: '3-4' },
  { province: 'Phitsanulok', rate: 3500, estimatedDays: '3-4' },
  { province: 'Phichai', rate: 3500, estimatedDays: '3-4' },
  { province: 'Phetchabun', rate: 3500, estimatedDays: '3-4' },
  { province: 'Chiang Mai', rate: 7500, estimatedDays: '4-5' },
  { province: 'Lamphun', rate: 7500, estimatedDays: '4-5' },
  { province: 'Lampang', rate: 7500, estimatedDays: '4-5' },
  { province: 'Uttaradit', rate: 4500, estimatedDays: '4-5' },
  { province: 'Phrae', rate: 4500, estimatedDays: '4-5' },
  { province: 'Nan', rate: 7500, estimatedDays: '4-5' },
  { province: 'Phayao', rate: 7500, estimatedDays: '4-5' },
  { province: 'Chiang Rai', rate: 9000, estimatedDays: '4-5' },
  { province: 'Mae Hong Son', rate: 10000, estimatedDays: '5-6' },

  // Zone 4: Northeastern Region (6W)
  { province: 'Nakhon Ratchasima', rate: 3500, estimatedDays: '3-4' },
  { province: 'Buri Ram', rate: 3500, estimatedDays: '3-4' },
  { province: 'Surin', rate: 3500, estimatedDays: '3-4' },
  { province: 'Sisaket', rate: 3500, estimatedDays: '3-4' },
  { province: 'Ubon Ratchathani', rate: 4000, estimatedDays: '4-5' },
  { province: 'Yasothon', rate: 3500, estimatedDays: '3-4' },
  { province: 'Chaiyaphum', rate: 3500, estimatedDays: '3-4' },
  { province: 'Amnat Charoen', rate: 4000, estimatedDays: '4-5' },
  { province: 'Nong Bua Lamphu', rate: 4000, estimatedDays: '4-5' },
  { province: 'Khon Kaen', rate: 4000, estimatedDays: '4-5' },
  { province: 'Udon Thani', rate: 4000, estimatedDays: '4-5' },
  { province: 'Loei', rate: 4000, estimatedDays: '4-5' },
  { province: 'Nong Khai', rate: 4000, estimatedDays: '4-5' },
  { province: 'Maha Sarakham', rate: 5000, estimatedDays: '4-5' },
  { province: 'Roi Et', rate: 3500, estimatedDays: '3-4' },
  { province: 'Kalasin', rate: 4000, estimatedDays: '4-5' },
  { province: 'Sakon Nakhon', rate: 4000, estimatedDays: '4-5' },
  { province: 'Nakhon Phanom', rate: 4000, estimatedDays: '4-5' },
  { province: 'Mukdahan', rate: 4000, estimatedDays: '4-5' },

  // Zone 5: Southern Region (6W)
  { province: 'Chumphon', rate: 4000, estimatedDays: '4-5' },
  { province: 'Ranong', rate: 4500, estimatedDays: '4-5' },
  { province: 'Surat Thani', rate: 4500, estimatedDays: '4-5' },
  { province: 'Phangnga', rate: 5000, estimatedDays: '5-6' },
  { province: 'Phuket', rate: 5000, estimatedDays: '5-6' },
  { province: 'Krabi', rate: 5000, estimatedDays: '5-6' },
  { province: 'Phatthalung', rate: 4500, estimatedDays: '4-5' },
  { province: 'Trang', rate: 4500, estimatedDays: '4-5' },
  { province: 'Satun', rate: 5000, estimatedDays: '5-6' },
  { province: 'Songkhla', rate: 4500, estimatedDays: '4-5' },
  { province: 'Yala', rate: 5000, estimatedDays: '5-6' },
  { province: 'Narathiwat', rate: 5000, estimatedDays: '5-6' },
  { province: 'Pattani', rate: 5000, estimatedDays: '5-6' },
  { province: 'Nakhon Si Thammarat', rate: 4500, estimatedDays: '4-5' },
];

/**
 * Get shipping rate for a specific province
 * @param province - Name of province
 * @returns Shipping rate information or default rate if province not found
 */
export function getShippingRate(province: string): ShippingRate {
  const normalizedProvince = province.toLowerCase().trim();
  const rate = DELIVERY_RATES.find(
    (r) => r.province.toLowerCase() === normalizedProvince
  );

  return (
    rate || {
      province,
      rate: 6000, // Default rate for unknown provinces
      estimatedDays: '5-7',
    }
  );
}

/**
 * Get all available provinces
 * @returns Array of province names
 */
export function getAllProvinces(): string[] {
  return DELIVERY_RATES.map((rate) => rate.province).sort();
}

/**
 * Determine truck type based on cart items
 * @param items - Array of cart items with dimensions
 * @returns Truck type needed
 */
export function determineTruckType(items: CartItem[]): TruckType {
  let totalLength = 0;
  let totalVolume = 0;

  items.forEach(item => {
    const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : (item.length || 0);
    const volume = item.volume || 0;
    totalLength += length * item.quantity;
    totalVolume += volume * item.quantity;
  });

  // Large truck needed if:
  // - Any single item is 6 meters or longer, OR
  // - Total length exceeds 12 meters, OR
  // - Total volume exceeds 5 cubic meters
  const hasLongItem = items.some(item => {
    const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : (item.length || 0);
    return length >= 6;
  });
  const totalLengthExceedsLimit = totalLength > 12;
  const totalVolumeExceedsLimit = totalVolume > 5;

  if (hasLongItem || totalLengthExceedsLimit || totalVolumeExceedsLimit) {
    return TruckType.LARGE;
  }

  // Medium truck needed if:
  // - Any single item is 3-6 meters, OR
  // - Total length exceeds 6 meters, OR
  // - Total volume exceeds 2 cubic meters
  const hasMediumItem = items.some(item => {
    const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : (item.length || 0);
    return length >= 3 && length < 6;
  });
  const totalLengthExceedsMedium = totalLength > 6;
  const totalVolumeExceedsMedium = totalVolume > 2;

  if (hasMediumItem || totalLengthExceedsMedium || totalVolumeExceedsMedium) {
    return TruckType.MEDIUM;
  }

  return TruckType.SMALL;
}

/**
 * Get truck type surcharge
 * @param truckType - Type of truck
 * @returns Additional cost for truck type
 */
export function getTruckTypeSurcharge(truckType: TruckType): number {
  switch (truckType) {
    case TruckType.SMALL:
      return 0;
    case TruckType.MEDIUM:
      return 500;
    case TruckType.LARGE:
      return 1500;
    default:
      return 0;
  }
}

/**
 * Get truck type display name
 * @param truckType - Type of truck
 * @returns Display name for truck type
 */
export function getTruckTypeName(truckType: TruckType): string {
  switch (truckType) {
    case TruckType.SMALL:
      return 'Small Truck (6-wheel)';
    case TruckType.MEDIUM:
      return 'Medium Truck (10-wheel)';
    case TruckType.LARGE:
      return 'Large Truck (10-wheel)';
    default:
      return 'Standard Truck';
  }
}

/**
 * Get price tier based on order value
 * @param cartTotal - Total cart value
 * @returns Price tier multiplier
 */
function getPriceTier(cartTotal: number): number {
  if (cartTotal >= 250000) return 0.9;      // 250k-300k: 10% discount
  if (cartTotal >= 200000) return 0.95;     // 200k-250k: 5% discount
  if (cartTotal >= 150000) return 1.0;       // 150k-200k: no discount
  if (cartTotal >= 100000) return 1.05;      // 100k-150k: 5% surcharge
  if (cartTotal >= 75000) return 1.1;        // 75k-100k: 10% surcharge
  if (cartTotal >= 50000) return 1.15;       // 50k-75k: 15% surcharge
  if (cartTotal >= 25000) return 1.2;        // 25k-50k: 20% surcharge
  if (cartTotal >= 10000) return 1.25;       // 10k-25k: 25% surcharge
  return 1.0;                                      // 0-10k: 25% surcharge
}

/**
 * Calculate shipping cost based on province and truck type
 * @param province - Name of province
 * @param cartTotal - Total cart value (optional, can be used for free shipping)
 * @param items - Cart items to determine truck type
 * @returns Shipping cost in THB
 */
export function calculateShippingCost(
  province: string,
  cartTotal?: number,
  items?: CartItem[]
): { cost: number; truckType: TruckType; truckTypeName: string; priceTier: string } {
  const rate = getShippingRate(province);
  const truckType = items ? determineTruckType(items) : TruckType.SMALL;
  const truckSurcharge = getTruckTypeSurcharge(truckType);
  const priceTier = cartTotal ? getPriceTier(cartTotal) : 1.0;

  // Free shipping for orders over 10,000 THB
  if (cartTotal && cartTotal >= 10000) {
    return {
      cost: 0,
      truckType,
      truckTypeName: getTruckTypeName(truckType),
      priceTier: 'Free',
    };
  }

  const baseCost = rate.rate + truckSurcharge;
  const totalCost = baseCost * priceTier;

  return {
    cost: totalCost,
    truckType,
    truckTypeName: getTruckTypeName(truckType),
    priceTier: priceTier === 1.0 ? 'Standard' : `${Math.round((1 - priceTier) * 100)}% ${priceTier < 1 ? 'Discount' : 'Surcharge'}`,
  };
}

/**
 * Get shipping zones
 * @returns Array of zones with their rates
 */
export function getShippingZones(): {
  zone: string;
  provinces: string[];
  rate: number;
  estimatedDays: string;
}[] {
  const zones = [
    { name: 'Bangkok Metropolitan Area', rate: 5000, days: '1-2' },
    { name: 'Central Region', rate: 2500, days: '2-3' },
    { name: 'Northern Region', rate: 7500, days: '4-5' },
    { name: 'Northeastern Region', rate: 4000, days: '4-5' },
    { name: 'Southern Region', rate: 5000, days: '5-6' },
  ];

  return zones.map((zone) => ({
    zone: zone.name,
    provinces: DELIVERY_RATES.filter((r) => r.rate === zone.rate).map((r) => r.province),
    rate: zone.rate,
    estimatedDays: zone.days,
  }));
}
