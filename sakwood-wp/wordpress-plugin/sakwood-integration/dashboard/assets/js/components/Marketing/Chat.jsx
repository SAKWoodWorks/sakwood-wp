import React from 'react';

function Chat() {
    return (
        <div className="sakwood-chat-page">
            <h1>Chat Platform Settings</h1>

            <div className="settings-section">
                <h2>Live Chat Integration</h2>
                <p className="settings-description">
                    Configure chat platforms for customer communication.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>LINE Official Account</h3>
                        <p>Configure LINE OA messaging and rich menus.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-chat&platform=line" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure LINE
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Telegram Bot</h3>
                        <p>Set up Telegram bot for instant messaging.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-chat&platform=telegram" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Telegram
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Facebook Messenger</h3>
                        <p>Connect Facebook Messenger for customer chat.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-chat&platform=messenger" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Messenger
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Phone/WhatsApp</h3>
                        <p>Display phone number and WhatsApp button.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-chat&platform=whatsapp" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Configure Phone
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Chat Features</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Display Options</h3>
                        <ul className="feature-list">
                            <li>Floating chat buttons</li>
                            <li>Custom icons & colors</li>
                            <li>Position settings</li>
                            <li>Show/hide schedules</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Business Hours</h3>
                        <ul className="feature-list">
                            <li>Operating hours</li>
                            <li>Auto-response messages</li>
                            <li>Away mode</li>
                            <li>Holiday schedules</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Multi-Platform</h3>
                        <ul className="feature-list">
                            <li>Multiple chat platforms</li>
                            <li>Platform priority</li>
                            <li>Device-specific display</li>
                            <li>Language detection</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Analytics</h3>
                        <ul className="feature-list">
                            <li>Click tracking</li>
                            <li>Conversation metrics</li>
                            <li>Response time</li>
                            <li>Customer satisfaction</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
