'use client';

import { useCompare } from '@/lib/context/CompareContext';
import { Scale, Check, Plus } from 'lucide-react';
import type { Product } from '@/lib/types/product';

interface AddToCompareButtonProps {
  product: Product;
  variant?: 'default' | 'small' | 'icon';
  className?: string;
  dictionary?: {
    compare?: {
      add_to_compare: string;
      added: string;
      max_items: string;
    };
  };
}

export function AddToCompareButton({
  product,
  variant = 'default',
  className = '',
  dictionary,
}: AddToCompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare, isFull } = useCompare();

  const isAdded = isInCompare(product.id);

  const handleClick = () => {
    if (isAdded) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const compare = dictionary?.compare || {
    add_to_compare: 'Add to Compare',
    added: 'Added',
    max_items: 'Max 4 products',
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        disabled={!isAdded && isFull}
        className={`relative p-2 rounded-lg transition-all transform hover:scale-110 active:scale-90 ${
          isAdded
            ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
        } ${className}`}
        title={isAdded ? compare.added : compare.add_to_compare}
      >
        {isAdded ? (
          <Check className="w-5 h-5 animate-[bounce_0.5s_ease-out]" />
        ) : (
          <Scale className="w-5 h-5" />
        )}
      </button>
    );
  }

  if (variant === 'small') {
    return (
      <button
        onClick={handleClick}
        disabled={!isAdded && isFull}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all transform hover:scale-105 active:scale-95 ${
          isAdded
            ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
        } ${className}`}
        title={isFull && !isAdded ? compare.max_items : isAdded ? compare.added : compare.add_to_compare}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4 animate-[bounce_0.5s_ease-out]" />
            <span>{compare.added}</span>
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            <span>{compare.add_to_compare}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isAdded && isFull}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 ${
        isAdded
          ? 'bg-blue-900 text-white hover:bg-blue-800'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
      } ${className}`}
      title={isFull && !isAdded ? compare.max_items : ''}
    >
      <Scale className="w-5 h-5" />
      <span>
        {isAdded ? compare.added : compare.add_to_compare}
      </span>
      {isAdded && <Check className="w-4 h-4 animate-[bounce_0.5s_ease-out]" />}
    </button>
  );
}
