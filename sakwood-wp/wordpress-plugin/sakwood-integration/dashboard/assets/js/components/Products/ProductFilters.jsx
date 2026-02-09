import React from 'react';

function ProductFilters({ filters, onFilterChange, categories }) {
    return (
        <div className="sakwood-product-filters">
            <div className="filter-group">
                <label>Search</label>
                <input
                    type="text"
                    placeholder="Name or SKU..."
                    value={filters.search}
                    onChange={(e) => onFilterChange('search', e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Category</label>
                <select
                    value={filters.category}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Stock Status</label>
                <select
                    value={filters.stockStatus}
                    onChange={(e) => onFilterChange('stockStatus', e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                    <option value="onbackorder">Backorder</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Language</label>
                <div className="language-toggle">
                    <button
                        className={filters.language === 'th' ? 'active' : ''}
                        onClick={() => onFilterChange('language', 'th')}
                    >
                        TH
                    </button>
                    <button
                        className={filters.language === 'en' ? 'active' : ''}
                        onClick={() => onFilterChange('language', 'en')}
                    >
                        EN
                    </button>
                </div>
            </div>

            <button
                className="clear-filters"
                onClick={() => onFilterChange('clear', null)}
            >
                Clear Filters
            </button>
        </div>
    );
}

export default ProductFilters;
