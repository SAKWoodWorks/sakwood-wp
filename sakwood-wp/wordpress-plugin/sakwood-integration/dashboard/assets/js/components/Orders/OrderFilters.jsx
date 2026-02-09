import React from 'react';

function OrderFilters({ filters, onFilterChange, onClearFilters }) {
    const orderStatuses = [
        { value: '', label: 'All Statuses' },
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'completed', label: 'Completed' },
        { value: 'on-hold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'refunded', label: 'Refunded' },
        { value: 'promptpay-pending', label: 'PromptPay Pending' }
    ];

    return (
        <div className="sakwood-order-filters">
            <div className="filter-group">
                <label>Search</label>
                <input
                    type="text"
                    placeholder="Order ID, customer name, email..."
                    value={filters.search}
                    onChange={(e) => onFilterChange('search', e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Order Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                >
                    {orderStatuses.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Payment Status</label>
                <select
                    value={filters.paymentStatus}
                    onChange={(e) => onFilterChange('paymentStatus', e.target.value)}
                >
                    <option value="">All</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
            </div>

            <button className="clear-filters" onClick={onClearFilters}>
                Clear Filters
            </button>
        </div>
    );
}

export default OrderFilters;
