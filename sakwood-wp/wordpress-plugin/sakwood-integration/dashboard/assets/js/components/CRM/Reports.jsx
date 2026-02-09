import React from 'react';

function Reports() {
    return (
        <div className="sakwood-reports-page">
            <h1>CRM Reports</h1>

            <div className="settings-section">
                <h2>Sales Reports</h2>
                <p className="settings-description">
                    View sales performance and customer analytics.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Sales Overview</h3>
                        <p>View total sales, revenue, and growth metrics.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-reports&type=sales" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Sales Report
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Customer Analysis</h3>
                        <p>Analyze customer demographics and behavior.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-reports&type=customers" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Customer Report
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Product Performance</h3>
                        <p>View best-selling products and categories.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-reports&type=products" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Product Report
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Team Performance</h3>
                        <p>Track sales team performance metrics.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-reports&type=team" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Team Report
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Report Features</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Export Options</h3>
                        <ul className="feature-list">
                            <li>CSV export</li>
                            <li>PDF reports</li>
                            <li>Excel spreadsheets</li>
                            <li>Scheduled email reports</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Custom Reports</h3>
                        <ul className="feature-list">
                            <li>Date range filters</li>
                            <li>Custom metrics</li>
                            <li>Comparison views</li>
                            <li>Trend analysis</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;
