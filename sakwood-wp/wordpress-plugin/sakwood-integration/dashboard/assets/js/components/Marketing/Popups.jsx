import React from 'react';

function Popups() {
    return (
        <div className="sakwood-popups-page">
            <h1>Promotional Popups</h1>

            <div className="settings-section">
                <h2>Popup Management</h2>
                <p className="settings-description">
                    Create and manage promotional popup messages for visitors.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>All Popups</h3>
                        <p>View and manage all promotional popups.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-popups" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Manage Popups
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Add New Popup</h3>
                        <p>Create a new promotional popup.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-popups&action=add" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Add Popup
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Active Popups</h3>
                        <p>View currently active popups on site.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-popups&filter=active" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Active Popups
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Popup Analytics</h3>
                        <p>View popup performance metrics.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-popups&action=analytics" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            View Analytics
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Popup Features</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Display Options</h3>
                        <ul className="feature-list">
                            <li>Auto-delay timing</li>
                            <li>Page targeting</li>
                            <li>Scheduling (start/end dates)</li>
                            <li>Show frequency limits</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Content Types</h3>
                        <ul className="feature-list">
                            <li>Promotional offers</li>
                            <li>Newsletter signup</li>
                            <li>Announcements</li>
                            <li>Custom HTML/CSS</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Targeting</h3>
                        <ul className="feature-list">
                            <li>New vs returning visitors</li>
                            <li>Geographic location</li>
                            <li>Device type</li>
                            <li>Referral source</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Analytics</h3>
                        <ul className="feature-list">
                            <li>Impressions</li>
                            <li>Conversion rate</li>
                            <li>Close rate</li>
                            <li>A/B testing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popups;
