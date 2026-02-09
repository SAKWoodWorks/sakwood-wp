import React from 'react';

function BulkImport() {
    return (
        <div className="sakwood-bulk-import-page">
            <h1>Bulk Product Import</h1>

            <div className="settings-section">
                <h2>Import Products</h2>
                <p className="settings-description">
                    Import multiple products at once using CSV files.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>CSV Import</h3>
                        <p>Upload a CSV file to bulk import products.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-bulk-import" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Import Products
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Download Template</h3>
                        <p>Download the CSV template with required columns.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-bulk-import&action=template" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Get Template
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Import History</h3>
                        <p>View previous imports and their status.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-bulk-import&action=history" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Import History
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>CSV Format</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Required Columns</h3>
                        <ul className="feature-list">
                            <li>Product Name*</li>
                            <li>SKU*</li>
                            <li>Regular Price*</li>
                            <li>Sale Price</li>
                            <li>Stock Quantity</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Optional Columns</h3>
                        <ul className="feature-list">
                            <li>Description (TH/EN)</li>
                            <li>Categories</li>
                            <li>Images (URLs)</li>
                            <li>Dimensions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BulkImport;
