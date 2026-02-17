'use client';

/**
 * CompareButton Component
 *
 * "Add to Compare" button for product cards and detail pages.
 * Shows visual indication when product is already added.
 */

import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';

interface CompareButtonProps {
  productId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function CompareButton({
  productId,
  variant = 'outline',
  size = 'default',
  className = '',
}: CompareButtonProps) {
  const { hasProduct, addProduct, removeProduct } = useCompare();

  const isAdded = hasProduct(productId);

  const handleClick = () => {
    if (isAdded) {
      removeProduct(productId);
    } else {
      addProduct(productId);
    }
  };

  return (
    <Button
      variant={isAdded ? 'default' : variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={isAdded ? 'Remove from comparison' : 'Add to comparison'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isAdded ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
      {isAdded ? 'Comparing' : 'Compare'}
    </Button>
  );
}
