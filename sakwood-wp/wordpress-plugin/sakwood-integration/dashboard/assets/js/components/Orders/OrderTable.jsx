import React from 'react';

function OrderTable({ orders, onViewDetails, onVerifyPayment, onUpdateStatus }) {
    const getStatusBadge = (status) => {
        const config = {
            'pending': { label: 'Pending', color: '#dba617', bg: '#fdf8e8' },
            'processing': { label: 'Processing', color: '#2271b1', bg: '#e7f3ed' },
            'completed': { label: 'Completed', color: '#00a32a', bg: '#e7f7ed' },
            'on-hold': { label: 'On Hold', color: '#dba617', bg: '#fdf8e8' },
            'cancelled': { label: 'Cancelled', color: '#50575e', bg: '#f0f0f1' },
            'refunded': { label: 'Refunded', color: '#d63638', bg: '#f7edf0' },
            'promptpay-pending': { label: 'PromptPay Pending', color: '#d63638', bg: '#f7edf0' }
        };
        return config[status] || config['pending'];
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
        }).format(amount);
    };

    return (
        <table className="sakwood-order-table">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => {
                    const statusBadge = getStatusBadge(order.status);
                    const isPromptPayPending = order.status === 'promptpay-pending';

                    return (
                        <tr key={order.id} className={isPromptPayPending ? 'status-critical' : ''}>
                            <td>
                                <div className="order-number">#{order.id}</div>
                            </td>
                            <td>
                                <div className="order-date">
                                    {new Date(order.date_created).toLocaleDateString('th-TH')}
                                </div>
                            </td>
                            <td>
                                <span
                                    className="status-badge"
                                    style={{ color: statusBadge.color, backgroundColor: statusBadge.bg }}
                                >
                                    {statusBadge.label}
                                </span>
                            </td>
                            <td>
                                <div className="customer-info">
                                    <div className="customer-name">
                                        {order.billing?.first_name} {order.billing?.last_name}
                                    </div>
                                    <div className="customer-email">{order.billing?.email}</div>
                                </div>
                            </td>
                            <td>
                                <div className="order-total">{formatCurrency(order.total)}</div>
                            </td>
                            <td>
                                <div className="payment-method">
                                    {order.payment_method_title || 'N/A'}
                                </div>
                            </td>
                            <td>
                                <div className="order-actions">
                                    <button
                                        className="btn-view"
                                        onClick={() => onViewDetails(order)}
                                    >
                                        View
                                    </button>
                                    {isPromptPayPending && (
                                        <button
                                            className="btn-verify"
                                            onClick={() => onVerifyPayment(order.id)}
                                        >
                                            Verify
                                        </button>
                                    )}
                                    <a
                                        href={`/wp-admin/post.php?post=${order.id}&action=edit`}
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

export default OrderTable;
