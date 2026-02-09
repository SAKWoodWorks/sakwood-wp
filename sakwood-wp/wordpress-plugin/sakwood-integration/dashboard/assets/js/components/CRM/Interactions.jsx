import React from 'react';

function Interactions() {
    return (
        <div className="sakwood-interactions-page">
            <h1>Customer Interactions</h1>

            <div className="settings-section">
                <h2>Interaction Tracking</h2>
                <p className="settings-description">
                    Track all customer interactions including calls, emails, meetings, and notes.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>All Interactions</h3>
                        <p>View complete history of customer interactions.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-interactions" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            View Interactions
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Today's Schedule</h3>
                        <p>View scheduled follow-ups and appointments for today.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-interactions&filter=today" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Today's Schedule
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Add Interaction</h3>
                        <p>Log a new customer interaction or note.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-interactions&action=add" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Add Interaction
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Upcoming Follow-ups</h3>
                        <p>View customers requiring follow-up actions.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-interactions&filter=pending" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Pending Follow-ups
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Interaction Types</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Communication Log</h3>
                        <ul className="feature-list">
                            <li>Phone calls</li>
                            <li>Email communications</li>
                            <li>Meeting notes</li>
                            <li>WhatsApp/LINE messages</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Activity Tracking</h3>
                        <ul className="feature-list">
                            <li>Automatic timestamps</li>
                            <li>Staff assignment</li>
                            <li>Follow-up reminders</li>
                            <li>Outcome status</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Interactions;
