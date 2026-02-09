import React, { useState, useEffect, useMemo } from 'react';
import ProductFilters from './ProductFilters';
import ViewToggle from './ViewToggle';
import ProductGrid from './ProductGrid';
import ProductTable from './ProductTable';
import QuickEditModal from './QuickEditModal';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        stockStatus: '',
        language: 'th'
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showQuickEdit, setShowQuickEdit] = useState(false);

    // Load saved view preference
    useEffect(() => {
        const savedView = localStorage.getItem('sakwood-products-view');
        if (savedView) setViewMode(savedView);
    }, []);

    // Save view preference
    useEffect(() => {
        localStorage.setItem('sakwood-products-view', viewMode);
    }, [viewMode]);

    // Fetch products
    useEffect(() => {
        loadProducts();
    }, [filters.language]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `/wp-json/sakwood/v1/products?language=${filters.language}&per_page=100`
            );
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Client-side filtering
    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name?.toLowerCase().includes(search) ||
                p.sku?.toLowerCase().includes(search)
            );
        }

        if (filters.category) {
            filtered = filtered.filter(p =>
                p.categories?.some(c => c.slug === filters.category)
            );
        }

        if (filters.stockStatus) {
            filtered = filtered.filter(p => p.stockStatus === filters.stockStatus);
        }

        return filtered;
    }, [products, filters]);

    // Extract unique categories
    const allCategories = useMemo(() => {
        const categoryMap = new Map();
        products.forEach(product => {
            product.categories?.forEach(cat => {
                if (!categoryMap.has(cat.id)) {
                    categoryMap.set(cat.id, cat);
                }
            });
        });
        return Array.from(categoryMap.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }, [products]);

    const handleFilterChange = (key, value) => {
        if (key === 'clear') {
            setFilters({ search: '', category: '', stockStatus: '', language: 'th' });
        } else {
            setFilters(prev => ({ ...prev, [key]: value }));
        }
    };

    const handleQuickEdit = (product) => {
        setSelectedProduct(product);
        setShowQuickEdit(true);
    };

    const handleQuickEditSave = (productId, updatedData) => {
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, ...updatedData } : p
        ));
        setShowQuickEdit(false);
    };

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="sakwood-products-page">
            <h1>Products</h1>

            <div className="sakwood-products-header">
                <ProductFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    categories={allCategories}
                />
                <ViewToggle
                    currentView={viewMode}
                    onViewChange={setViewMode}
                />
            </div>

            <p className="results-count">
                Showing {filteredProducts.length} of {products.length} products
            </p>

            {filteredProducts.length === 0 ? (
                <div className="empty-state">No products found</div>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <ProductGrid
                            products={filteredProducts}
                            onQuickEdit={handleQuickEdit}
                        />
                    ) : (
                        <ProductTable
                            products={filteredProducts}
                            onQuickEdit={handleQuickEdit}
                        />
                    )}
                </>
            )}

            {showQuickEdit && selectedProduct && (
                <QuickEditModal
                    product={selectedProduct}
                    onClose={() => setShowQuickEdit(false)}
                    onSave={handleQuickEditSave}
                />
            )}
        </div>
    );
}

export default Products;
