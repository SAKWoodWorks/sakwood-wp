import React from 'react';

function ApplicationTable({ applications, onViewDetails }) {
    const getStatusBadge = (status) => {
        const config = {
            'pending': { label: 'Pending', color: '#dba617', bg: '#fdf8e8' },
            'approved': { label: 'Approved', color: '#2271b1', bg: '#e7f3ed' },
            'active': { label: 'Active', color: '#00a32a', bg: '#e7f7ed' },
            'rejected': { label: 'Rejected', color: '#d63638', bg: '#f7edf0' }
        };
        return config[status] || config['pending'];
    };

    return (
        <table className="sakwood-application-table">
            <thead>
                <tr>
                    <th>Application ID</th>
                    <th>Company</th>
                    <th>Applicant</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {applications.map(app => {
                    const statusBadge = getStatusBadge(app.status);

                    return (
                        <tr key={app.id}>
                            <td>
                                <div className="application-id">{app.application_id}</div>
                            </td>
                            <td>
                                <div className="company-name">{app.company_name}</div>
                            </td>
                            <td>
                                <div className="applicant-info">
                                    <div className="applicant-name">{app.user_name || 'N/A'}</div>
                                    <div className="applicant-email">{app.user_email || 'N/A'}</div>
                                </div>
                            </td>
                            <td>
                                <div className="application-date">
                                    {new Date(app.submitted_date).toLocaleDateString('th-TH')}
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
                                <div className="application-actions">
                                    <button
                                        className="btn-view"
                                        onClick={() => onViewDetails(app.application_id)}
                                    >
                                        Review
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ApplicationTable;
