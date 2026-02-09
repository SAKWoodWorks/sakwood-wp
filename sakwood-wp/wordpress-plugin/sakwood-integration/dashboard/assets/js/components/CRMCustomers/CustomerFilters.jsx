import React from 'react';

function CustomerFilters({ filters, onFilterChange, onClearFilters }) {
    return (
        <div className="sakwood-customer-filters">
            <div className="filter-group">
                <label>Search</label>
                <input
                    type="text"
                    placeholder="Name, email, username..."
                    value={filters.search}
                    onChange={(e) => onFilterChange('search', e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Role</label>
                <select
                    value={filters.role}
                    onChange={(e) => onFilterChange('role', e.target.value)}
                >
                    <option value="">All Roles</option>
                    <option value="customer">Customer</option>
                    <option value="subscriber">Subscriber</option>
                    <option value="shop_manager">Shop Manager</option>
                </select>
            </div>

            <button className="clear-filters" onClick={onClearFilters}>
                Clear Filters
            </button>
        </div>
    );
}

export default CustomerFilters;
