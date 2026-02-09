import React, { useState, useEffect, useMemo } from 'react';
import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';
import CustomerDetailsModal from './CustomerDetailsModal';

function CRMCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: ''
    });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/wp-json/wc/v3/customers?per_page=100', {
                headers: {
                    'X-WP-Nonce': window.sakwoodDashboard?.nonce || ''
                }
            });
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Failed to load customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = useMemo(() => {
        let filtered = customers;

        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(c =>
                c.id?.toString().includes(search) ||
                c.first_name?.toLowerCase().includes(search) ||
                c.last_name?.toLowerCase().includes(search) ||
                c.email?.toLowerCase().includes(search) ||
                c.username?.toLowerCase().includes(search)
            );
        }

        if (filters.role) {
            filtered = filtered.filter(c => c.role === filters.role);
        }

        return filtered;
    }, [customers, filters]);

    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
        setShowDetails(true);
    };

    if (loading) {
        return <div className="loading">Loading customers...</div>;
    }

    return (
        <div className="sakwood-crm-customers-page">
            <h1>Customers</h1>

            <CustomerFilters
                filters={filters}
                onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                onClearFilters={() => setFilters({ search: '', role: '', status: '' })}
            />

            <p className="results-count">
                Showing {filteredCustomers.length} of {customers.length} customers
            </p>

            {filteredCustomers.length === 0 ? (
                <div className="empty-state">No customers found</div>
            ) : (
                <CustomerTable
                    customers={filteredCustomers}
                    onViewDetails={handleViewDetails}
                />
            )}

            {showDetails && selectedCustomer && (
                <CustomerDetailsModal
                    customer={selectedCustomer}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </div>
    );
}

export default CRMCustomers;
