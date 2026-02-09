import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products, onQuickEdit }) {
    return (
        <div className="sakwood-product-grid">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onQuickEdit={onQuickEdit}
                />
            ))}
        </div>
    );
}

export default ProductGrid;
