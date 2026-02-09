import React, { useState } from 'react';

function QuickEditModal({ product, onClose, onSave }) {
    const [formData, setFormData] = useState({
        price: product.price || '',
        regularPrice: product.regularPrice || '',
        stockStatus: product.stockStatus || 'instock'
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(
                `/wp-json/wc/v3/products/${product.databaseId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': window.sakwoodDashboard?.nonce || ''
                    },
                    body: JSON.stringify({
                        regular_price: formData.regularPrice,
                        price: formData.price,
                        stock_status: formData.stockStatus
                    })
                }
            );

            if (response.ok) {
                onSave(product.id, formData);
            } else {
                alert('Failed to update product. Please try again.');
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update product. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="sakwood-modal-overlay" onClick={onClose}>
            <div className="sakwood-modal" onClick={e => e.stopPropagation()}>
                <div className="sakwood-modal-header">
                    <h3>Quick Edit: {product.name}</h3>
                    <button onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="sakwood-modal-body">
                    <div className="form-group">
                        <label>Regular Price</label>
                        <input
                            type="text"
                            value={formData.regularPrice}
                            onChange={(e) => setFormData({...formData, regularPrice: e.target.value})}
                            placeholder="฿0.00"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Sale Price</label>
                        <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            placeholder="Leave empty if no sale"
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock Status</label>
                        <select
                            value={formData.stockStatus}
                            onChange={(e) => setFormData({...formData, stockStatus: e.target.value})}
                            required
                        >
                            <option value="instock">In Stock</option>
                            <option value="outofstock">Out of Stock</option>
                            <option value="onbackorder">On Backorder</option>
                        </select>
                    </div>

                    <div className="sakwood-modal-footer">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuickEditModal;
