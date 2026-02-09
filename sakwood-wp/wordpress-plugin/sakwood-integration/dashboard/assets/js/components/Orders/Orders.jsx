import React, { useState, useEffect, useMemo } from 'react';
import OrderFilters from './OrderFilters';
import OrderTable from './OrderTable';
import OrderDetailsModal from './OrderDetailsModal';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        paymentStatus: '',
        dateFrom: '',
        dateTo: ''
    });
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch('/wp-json/wc/v3/orders?per_page=100', {
                headers: {
                    'X-WP-Nonce': window.sakwoodDashboard?.nonce || ''
                }
            });
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = useMemo(() => {
        let filtered = orders;

        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(o =>
                o.id?.toString().includes(search) ||
                o.billing?.first_name?.toLowerCase().includes(search) ||
                o.billing?.last_name?.toLowerCase().includes(search) ||
                o.billing?.email?.toLowerCase().includes(search)
            );
        }

        if (filters.status) {
            filtered = filtered.filter(o => o.status === filters.status);
        }

        if (filters.paymentStatus) {
            const isPaid = o.status === 'completed' || o.status === 'processing';
            if (filters.paymentStatus === 'paid') {
                filtered = filtered.filter(o => isPaid);
            } else {
                filtered = filtered.filter(o => !isPaid);
            }
        }

        return filtered;
    }, [orders, filters]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };

    const handleVerifyPayment = async (orderId) => {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'sakwood_verify_promptpay_payment',
                    order_id: orderId,
                    nonce: window.sakwoodDashboard?.nonce || ''
                })
            });

            if (response.ok) {
                await loadOrders();
            }
        } catch (error) {
            console.error('Verification failed:', error);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`/wp-json/wc/v3/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': window.sakwoodDashboard?.nonce || ''
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setOrders(prev => prev.map(o =>
                    o.id === orderId ? { ...o, status: newStatus } : o
                ));
            }
        } catch (error) {
            console.error('Status update failed:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    return (
        <div className="sakwood-orders-page">
            <h1>Orders</h1>

            <OrderFilters
                filters={filters}
                onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                onClearFilters={() => setFilters({ search: '', status: '', paymentStatus: '', dateFrom: '', dateTo: '' })}
            />

            <p className="results-count">
                Showing {filteredOrders.length} of {orders.length} orders
            </p>

            {filteredOrders.length === 0 ? (
                <div className="empty-state">No orders found</div>
            ) : (
                <OrderTable
                    orders={filteredOrders}
                    onViewDetails={handleViewDetails}
                    onVerifyPayment={handleVerifyPayment}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}

            {showDetails && selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setShowDetails(false)}
                    onVerifyPayment={handleVerifyPayment}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
}

export default Orders;
