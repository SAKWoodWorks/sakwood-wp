import React, { useState } from 'react';

function ApplicationDetailsModal({ application, onClose, onUpdate }) {
    const [creditLimit, setCreditLimit] = useState(application.credit_limit || '50000');
    const [notes, setNotes] = useState(application.admin_notes || '');
    const [processing, setProcessing] = useState(false);

    const handleApprove = async () => {
        setProcessing(true);
        await onUpdate(application.application_id, 'approved', creditLimit, '');
        setProcessing(false);
    };

    const handleReject = async () => {
        if (!notes.trim()) {
            alert('Please provide a reason for rejection');
            return;
        }
        setProcessing(true);
        await onUpdate(application.application_id, 'rejected', '', notes);
        setProcessing(false);
    };

    return (
        <div className="sakwood-modal-overlay" onClick={onClose}>
            <div className="sakwood-modal sakwood-application-modal" onClick={e => e.stopPropagation()}>
                <div className="sakwood-modal-header">
                    <h3>Application {application.application_id}</h3>
                    <button onClick={onClose}>×</button>
                </div>

                <div className="sakwood-modal-body">
                    <div className="application-details-section">
                        <h4>Business Information</h4>
                        <div className="details-grid">
                            <div>
                                <label>Company:</label>
                                <span>{application.company_name}</span>
                            </div>
                            <div>
                                <label>Tax ID:</label>
                                <span>{application.tax_id}</span>
                            </div>
                            <div>
                                <label>Business Type:</label>
                                <span>{application.business_type}</span>
                            </div>
                            <div>
                                <label>Phone:</label>
                                <span>{application.business_phone}</span>
                            </div>
                        </div>
                        <div className="full-width">
                            <label>Address:</label>
                            <span>{application.business_address}, {application.business_city} {application.business_province} {application.business_postal_code}</span>
                        </div>
                    </div>

                    <div className="application-details-section">
                        <h4>Application Details</h4>
                        <div className="details-grid">
                            <div>
                                <label>Status:</label>
                                <span>{application.status}</span>
                            </div>
                            <div>
                                <label>Submitted:</label>
                                <span>{new Date(application.submitted_date).toLocaleString('th-TH')}</span>
                            </div>
                            <div>
                                <label>Est. Volume:</label>
                                <span>{application.estimated_volume}</span>
                            </div>
                        </div>
                    </div>

                    <div className="application-details-section">
                        <h4>Review Application</h4>
                        <div className="form-group">
                            <label>Credit Limit (THB)</label>
                            <input
                                type="number"
                                value={creditLimit}
                                onChange={(e) => setCreditLimit(e.target.value)}
                                placeholder="50000"
                            />
                        </div>
                        <div className="form-group">
                            <label>Admin Notes (required for rejection)</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Reason for rejection or additional notes..."
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="application-actions-section">
                        {application.status === 'pending' && (
                            <div className="action-buttons">
                                <button
                                    className="btn-approve"
                                    onClick={handleApprove}
                                    disabled={processing}
                                >
                                    Approve Application
                                </button>
                                <button
                                    className="btn-reject"
                                    onClick={handleReject}
                                    disabled={processing}
                                >
                                    Reject Application
                                </button>
                            </div>
                        )}
                        {application.status === 'approved' && (
                            <div className="action-buttons">
                                <button
                                    className="btn-activate"
                                    onClick={() => onUpdate(application.application_id, 'active', creditLimit, '')}
                                    disabled={processing}
                                >
                                    Activate Account
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="sakwood-modal-footer">
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ApplicationDetailsModal;
