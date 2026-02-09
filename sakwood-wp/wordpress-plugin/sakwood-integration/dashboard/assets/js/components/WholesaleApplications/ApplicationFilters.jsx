import React from 'react';

function ApplicationFilters({ filters, onFilterChange }) {
    return (
        <div className="sakwood-application-filters">
            <div className="filter-group">
                <label>Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="active">Active</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </div>
    );
}

export default ApplicationFilters;
