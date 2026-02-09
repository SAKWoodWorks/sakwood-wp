import React from 'react';

function Settings() {
    return (
        <div className="sakwood-settings-page">
            <h1>Settings</h1>

            <div className="settings-section">
                <h2>General Configuration</h2>
                <p className="settings-description">
                    Manage site-wide settings and configurations.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Store Settings</h3>
                        <p>Configure store name, currency, and contact information.</p>
                        <a href="/wp-admin/admin.php?page=wc-settings" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure WooCommerce
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Shipping Zones</h3>
                        <p>Set up shipping zones and delivery rates for Thailand.</p>
                        <a href="/wp-admin/admin.php?page=wc-settings&tab=shipping" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Shipping
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Payment Methods</h3>
                        <p>Manage PromptPay and other payment options.</p>
                        <a href="/wp-admin/admin.php?page=wc-settings&tab=checkout" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Payments
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Tax Settings</h3>
                        <p>Configure tax rates and calculation rules.</p>
                        <a href="/wp-admin/admin.php?page=wc-settings&tab=tax" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Taxes
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Integration Settings</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Chat Platforms</h3>
                        <p>Configure LINE, Telegram, and Messenger chat buttons.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-chat" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Chat
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Promotional Popups</h3>
                        <p>Manage promotional popup messages for visitors.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-popups" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Manage Popups
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Hero Slider</h3>
                        <p>Configure homepage hero slides and animations.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-slider" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Slider
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>API Configuration</h3>
                        <p>REST API and GraphQL endpoint settings.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-api" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            API Settings
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Account Management</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>User Roles</h3>
                        <p>Manage administrator and customer roles.</p>
                        <a href="/wp-admin/users.php" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Manage Users
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Site Health</h3>
                        <p>Check site status and troubleshoot issues.</p>
                        <a href="/wp-admin/site-health.php" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Site Health
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
