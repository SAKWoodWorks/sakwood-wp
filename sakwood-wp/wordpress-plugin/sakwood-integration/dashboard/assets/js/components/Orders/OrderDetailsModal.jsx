import React from 'react';

function OrderDetailsModal({ order, onClose, onVerifyPayment, onUpdateStatus }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
        }).format(amount);
    };

    return (
        <div className="sakwood-modal-overlay" onClick={onClose}>
            <div className="sakwood-modal sakwood-order-modal" onClick={e => e.stopPropagation()}>
                <div className="sakwood-modal-header">
                    <h3>Order #{order.id} Details</h3>
                    <button onClick={onClose}>×</button>
                </div>

                <div className="sakwood-modal-body">
                    <div className="order-details-section">
                        <h4>Order Information</h4>
                        <div className="details-grid">
                            <div>
                                <label>Status:</label>
                                <span>{order.status}</span>
                            </div>
                            <div>
                                <label>Date:</label>
                                <span>{new Date(order.date_created).toLocaleString('th-TH')}</span>
                            </div>
                            <div>
                                <label>Payment:</label>
                                <span>{order.payment_method_title}</span>
                            </div>
                            <div>
                                <label>Total:</label>
                                <span className="order-total">{formatCurrency(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-details-section">
                        <h4>Customer Information</h4>
                        <div className="customer-details">
                            <p><strong>Name:</strong> {order.billing?.first_name} {order.billing?.last_name}</p>
                            <p><strong>Email:</strong> {order.billing?.email}</p>
                            <p><strong>Phone:</strong> {order.billing?.phone}</p>
                            <p><strong>Address:</strong><br />
                                {order.billing?.address_1}{order.billing?.address_2 && ', ' + order.billing.address_2}<br />
                                {order.billing?.city} {order.billing?.state} {order.billing?.postcode}
                            </p>
                        </div>
                    </div>

                    <div className="order-details-section">
                        <h4>Order Items</h4>
                        <div className="order-items">
                            {order.line_items?.map(item => (
                                <div key={item.id} className="order-item">
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-qty">× {item.quantity}</div>
                                    <div className="item-total">{formatCurrency(item.total)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {order.status === 'promptpay-pending' && (
                        <div className="order-quick-actions">
                            <h4>Quick Actions</h4>
                            <div className="action-buttons">
                                <button
                                    className="btn-verify-payment"
                                    onClick={() => onVerifyPayment(order.id)}
                                >
                                    Verify PromptPay Payment
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="sakwood-modal-footer">
                    <button type="button" onClick={onClose}>Close</button>
                    <a
                        href={`/wp-admin/post.php?post=${order.id}&action=edit`}
                        className="btn-edit-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open in WooCommerce
                    </a>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsModal;
