import React from 'react';

function CustomerTable({ customers, onViewDetails }) {
    const getRoleBadge = (role) => {
        const config = {
            'customer': { label: 'Customer', color: '#2271b1', bg: '#e7f3ed' },
            'subscriber': { label: 'Subscriber', color: '#00a32a', bg: '#e7f7ed' },
            'shop_manager': { label: 'Shop Manager', color: '#dba617', bg: '#fdf8e8' },
            'administrator': { label: 'Admin', color: '#d63638', bg: '#f7edf0' }
        };
        return config[role] || config['customer'];
    };

    return (
        <table className="sakwood-customer-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Orders</th>
                    <th>Total Spent</th>
                    <th>Last Order</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => {
                    const roleBadge = getRoleBadge(customer.role);

                    return (
                        <tr key={customer.id}>
                            <td>
                                <div className="customer-id">#{customer.id}</div>
                            </td>
                            <td>
                                <div className="customer-name">
                                    {customer.first_name} {customer.last_name || customer.username}
                                </div>
                                {customer.username && customer.username !== `${customer.first_name} ${customer.last_name}` && (
                                    <div className="customer-username">@{customer.username}</div>
                                )}
                            </td>
                            <td>
                                <div className="customer-email">{customer.email}</div>
                            </td>
                            <td>
                                <span
                                    className="role-badge"
                                    style={{ color: roleBadge.color, backgroundColor: roleBadge.bg }}
                                >
                                    {roleBadge.label}
                                </span>
                            </td>
                            <td>
                                <div className="customer-orders">{customer.order_count || 0}</div>
                            </td>
                            <td>
                                <div className="customer-spent">
                                    {customer.total_spent ? new Intl.NumberFormat('th-TH', {
                                        style: 'currency',
                                        currency: 'THB'
                                    }).format(customer.total_spent) : '฿0'}
                                </div>
                            </td>
                            <td>
                                <div className="customer-last-order">
                                    {customer.last_order ? new Date(customer.last_order.date_created).toLocaleDateString('th-TH') : 'N/A'}
                                </div>
                            </td>
                            <td>
                                <div className="customer-actions">
                                    <button
                                        className="btn-view"
                                        onClick={() => onViewDetails(customer)}
                                    >
                                        View
                                    </button>
                                    <a
                                        href={`/wp-admin/user-edit.php?user_id=${customer.id}`}
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

export default CustomerTable;
