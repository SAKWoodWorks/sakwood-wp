'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { calculateWholesalePrice, calculateSavingsPercentage, formatPrice } from '@/lib/services/wholesaleService';
import { Badge } from '@/components/ui/badge';

interface WholesalePricingProps {
  retailPrice: string | number;
  productId?: number;
  minimumOrder?: number;
  className?: string;
}

export function WholesalePricing({
  retailPrice,
  productId,
  minimumOrder = 50,
  className = '',
}: WholesalePricingProps) {
  const { isWholesale } = useAuth();

  if (!isWholesale) {
    // Show retail price only for non-wholesale customers
    return (
      <div className={className}>
        <span className="text-2xl font-bold text-gray-900">
          {formatPrice(retailPrice)}
        </span>
      </div>
    );
  }

  // Calculate wholesale price (15% off)
  const wholesalePrice = calculateWholesalePrice(retailPrice);
  const savingsPercent = calculateSavingsPercentage(retailPrice);
  const retailPriceNum = typeof retailPrice === 'string'
    ? parseFloat(retailPrice.replace(/[^\d.]/g, ''))
    : retailPrice;

  const savingsAmount = retailPriceNum - (parseFloat(wholesalePrice));

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Wholesale Badge */}
      <div className="flex items-center gap-2">
        <Badge className="bg-blue-600 text-white">
          Wholesale Pricing
        </Badge>
        {savingsPercent > 0 && (
          <Badge className="bg-green-600 text-white">
            Save {savingsPercent}%
          </Badge>
        )}
      </div>

      {/* Prices */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-blue-600">
            {formatPrice(wholesalePrice)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {formatPrice(retailPrice)}
          </span>
        </div>

        <p className="text-sm text-green-600 font-medium">
          You save {formatPrice(savingsAmount)} per unit
        </p>

        {minimumOrder > 1 && (
          <p className="text-xs text-gray-500">
            Minimum order quantity: {minimumOrder} units
          </p>
        )}
      </div>

      {/* Volume Discount Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-900">
        <p className="font-medium mb-1">Wholesale Benefits:</p>
        <ul className="space-y-1 text-xs text-blue-800">
          <li>• 15% discount on all products</li>
          <li>• Net-30 payment terms available</li>
          <li>• Dedicated account manager</li>
        </ul>
      </div>
    </div>
  );
}

interface WholesalePriceTagProps {
  retailPrice: string | number;
  showComparison?: boolean;
  className?: string;
}

/**
 * Compact price tag for product cards
 */
export function WholesalePriceTag({
  retailPrice,
  showComparison = false,
  className = '',
}: WholesalePriceTagProps) {
  const { isWholesale } = useAuth();

  const wholesalePrice = calculateWholesalePrice(retailPrice);

  if (!isWholesale) {
    return (
      <span className={`text-lg font-bold text-gray-900 ${className}`}>
        {formatPrice(retailPrice)}
      </span>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-blue-600">
          {formatPrice(wholesalePrice)}
        </span>
        <Badge className="bg-blue-100 text-blue-800 text-xs">Wholesale</Badge>
      </div>
      {showComparison && (
        <span className="text-sm text-gray-500 line-through">
          {formatPrice(retailPrice)}
        </span>
      )}
    </div>
  );
}
