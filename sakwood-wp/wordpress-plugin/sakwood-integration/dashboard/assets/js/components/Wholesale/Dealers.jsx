import React from 'react';

function Dealers() {
    return (
        <div className="sakwood-dealers-page">
            <h1>Dealer Management</h1>

            <div className="settings-section">
                <h2>Dealer Network</h2>
                <p className="settings-description">
                    Manage wholesale dealers and distributors.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>All Dealers</h3>
                        <p>View and manage all dealer accounts.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-dealer-list" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            View Dealers
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Add New Dealer</h3>
                        <p>Register a new dealer or distributor.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-dealer-list&action=add" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Add Dealer
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Dealer Applications</h3>
                        <p>Review pending dealer applications.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-dealer-applications" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Applications
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Pending Approvals</h3>
                        <p>View dealers awaiting approval.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-dealer-list&filter=pending" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Pending
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Dealer Features</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Dealer Profiles</h3>
                        <ul className="feature-list">
                            <li>Business information</li>
                            <li>Tax ID & certificates</li>
                            <li>Credit limits</li>
                            <li>Payment terms</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Pricing Tiers</h3>
                        <ul className="feature-list">
                            <li>Wholesale pricing</li>
                            <li>Volume discounts</li>
                            <li>Dealer exclusive products</li>
                            <li>Special promotions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dealers;
