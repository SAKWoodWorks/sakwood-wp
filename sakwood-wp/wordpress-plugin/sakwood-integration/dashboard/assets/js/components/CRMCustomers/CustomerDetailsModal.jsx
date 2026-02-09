import React from 'react';

function CustomerDetailsModal({ customer, onClose }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
        }).format(amount || 0);
    };

    return (
        <div className="sakwood-modal-overlay" onClick={onClose}>
            <div className="sakwood-modal sakwood-customer-modal" onClick={e => e.stopPropagation()}>
                <div className="sakwood-modal-header">
                    <h3>Customer #{customer.id}</h3>
                    <button onClick={onClose}>×</button>
                </div>

                <div className="sakwood-modal-body">
                    <div className="customer-details-section">
                        <h4>Customer Information</h4>
                        <div className="details-grid">
                            <div>
                                <label>Name:</label>
                                <span>{customer.first_name} {customer.last_name || '-'}</span>
                            </div>
                            <div>
                                <label>Username:</label>
                                <span>@{customer.username}</span>
                            </div>
                            <div>
                                <label>Email:</label>
                                <span>{customer.email}</span>
                            </div>
                            <div>
                                <label>Phone:</label>
                                <span>{customer.billing?.phone || '-'}</span>
                            </div>
                            <div>
                                <label>Role:</label>
                                <span>{customer.role}</span>
                            </div>
                            <div>
                                <label>Since:</label>
                                <span>{new Date(customer.date_created).toLocaleDateString('th-TH')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="customer-details-section">
                        <h4>Order Statistics</h4>
                        <div className="details-grid">
                            <div>
                                <label>Total Orders:</label>
                                <span>{customer.order_count || 0}</span>
                            </div>
                            <div>
                                <label>Total Spent:</label>
                                <span className="customer-total-spent">{formatCurrency(customer.total_spent)}</span>
                            </div>
                            <div>
                                <label>Average Order:</label>
                                <span>
                                    {customer.order_count > 0
                                        ? formatCurrency(customer.total_spent / customer.order_count)
                                        : '฿0'}
                                </span>
                            </div>
                            <div>
                                <label>Last Order:</label>
                                <span>
                                    {customer.last_order
                                        ? new Date(customer.last_order.date_created).toLocaleDateString('th-TH')
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="customer-details-section">
                        <h4>Billing Address</h4>
                        {customer.billing ? (
                            <div className="address-details">
                                <p>{customer.billing.first_name} {customer.billing.last_name}</p>
                                {customer.billing.company && <p>{customer.billing.company}</p>}
                                <p>{customer.billing.address_1}</p>
                                {customer.billing.address_2 && <p>{customer.billing.address_2}</p>}
                                <p>{customer.billing.city} {customer.billing.state} {customer.billing.postcode}</p>
                                <p>{customer.billing.country}</p>
                            </div>
                        ) : (
                            <p>No billing address on file</p>
                        )}
                    </div>

                    <div className="customer-details-section">
                        <h4>Shipping Address</h4>
                        {customer.shipping ? (
                            <div className="address-details">
                                <p>{customer.shipping.first_name} {customer.shipping.last_name}</p>
                                {customer.shipping.company && <p>{customer.shipping.company}</p>}
                                <p>{customer.shipping.address_1}</p>
                                {customer.shipping.address_2 && <p>{customer.shipping.address_2}</p>}
                                <p>{customer.shipping.city} {customer.shipping.state} {customer.shipping.postcode}</p>
                                <p>{customer.shipping.country}</p>
                            </div>
                        ) : (
                            <p>No shipping address on file</p>
                        )}
                    </div>
                </div>

                <div className="sakwood-modal-footer">
                    <button type="button" onClick={onClose}>Close</button>
                    <a
                        href={`/wp-admin/admin.php?page=sakwood-crm&user_id=${customer.id}`}
                        className="btn-view-crm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Full CRM Profile
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetailsModal;
