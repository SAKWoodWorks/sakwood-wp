import React from 'react';

function ProductTable({ products, onQuickEdit }) {
    const getStockBadge = (status) => {
        const config = {
            instock: { label: 'In Stock', color: '#00a32a', bg: '#e7f7ed' },
            outofstock: { label: 'Out of Stock', color: '#d63638', bg: '#f7edf0' },
            onbackorder: { label: 'Backorder', color: '#dba617', bg: '#fdf8e8' }
        };
        return config[status] || config.instock;
    };

    return (
        <table className="sakwood-product-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => {
                    const stockBadge = getStockBadge(product.stockStatus);
                    const isOutOfStock = product.stockStatus === 'outofstock';

                    return (
                        <tr
                            key={product.id}
                            className={isOutOfStock ? 'stock-critical' : ''}
                        >
                            <td>
                                <div className="table-product-info">
                                    {product.image?.sourceUrl ? (
                                        <img
                                            src={product.image.sourceUrl}
                                            alt={product.name}
                                            className="table-product-image"
                                        />
                                    ) : (
                                        <div className="table-product-image-placeholder">📦</div>
                                    )}
                                    <div className="table-product-details">
                                        <div className="table-product-name">{product.name}</div>
                                        {product.sku && (
                                            <div className="table-product-sku">{product.sku}</div>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td>{product.sku || '-'}</td>
                            <td>
                                {product.price}
                                {product.regularPrice && product.regularPrice !== product.price && (
                                    <span className="table-regular-price">
                                        {product.regularPrice}
                                    </span>
                                )}
                            </td>
                            <td>
                                <span
                                    className="stock-status-badge"
                                    style={{ color: stockBadge.color, backgroundColor: stockBadge.bg }}
                                >
                                    {stockBadge.label}
                                </span>
                            </td>
                            <td>
                                <div className="table-actions">
                                    <button
                                        className="btn-quick-edit"
                                        onClick={() => onQuickEdit(product)}
                                    >
                                        Quick Edit
                                    </button>
                                    <a
                                        href={`/wp-admin/post.php?post=${product.databaseId}&action=edit`}
                                        className="btn-edit-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Edit
                                    </a>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ProductTable;
