import React from 'react';

function ProductCard({ product, onQuickEdit }) {
    const getStockBadge = (status) => {
        const config = {
            instock: { label: 'In Stock', color: '#00a32a', bg: '#e7f7ed' },
            outofstock: { label: 'Out of Stock', color: '#d63638', bg: '#f7edf0' },
            onbackorder: { label: 'Backorder', color: '#dba617', bg: '#fdf8e8' }
        };
        const { label, color, bg } = config[status] || config.instock;
        return { label, color, bg };
    };

    const stockBadge = getStockBadge(product.stockStatus);
    const isOutOfStock = product.stockStatus === 'outofstock';

    return (
        <div className={`sakwood-product-card ${isOutOfStock ? 'stock-critical' : ''}`}>
            {product.image?.sourceUrl ? (
                <img
                    src={product.image.sourceUrl}
                    alt={product.name}
                    className="sakwood-product-image"
                />
            ) : (
                <div className="sakwood-product-image-placeholder">📦</div>
            )}

            <div className="sakwood-product-card-content">
                <h3 className="sakwood-product-name">{product.name}</h3>
                {product.sku && (
                    <p className="sakwood-product-sku">SKU: {product.sku}</p>
                )}

                <div className="sakwood-product-price">
                    {product.price}
                    {product.regularPrice && product.regularPrice !== product.price && (
                        <span className="sakwood-product-regular-price">
                            {product.regularPrice}
                        </span>
                    )}
                </div>

                {(product.thickness || product.width || product.length) && (
                    <p className="sakwood-product-dimensions">
                        {product.thickness && `${product.thickness}cm × `}
                        {product.width && `${product.width}cm × `}
                        {product.length && `${product.length}m`}
                    </p>
                )}

                <span
                    className="stock-status-badge"
                    style={{ color: stockBadge.color, backgroundColor: stockBadge.bg }}
                >
                    {stockBadge.label}
                </span>
            </div>

            <div className="sakwood-product-card-footer">
                <div className="sakwood-product-actions">
                    <button
                        className="btn-quick-edit"
                        onClick={() => onQuickEdit(product)}
                    >
                        Quick Edit
                    </button>
                </div>
                <a
                    href={`/wp-admin/post.php?post=${product.databaseId}&action=edit`}
                    className="btn-edit-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Edit in WooCommerce
                </a>
            </div>
        </div>
    );
}

export default ProductCard;
