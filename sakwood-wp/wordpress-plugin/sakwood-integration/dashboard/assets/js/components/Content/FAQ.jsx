import React from 'react';

function FAQ() {
    return (
        <div className="sakwood-faq-page">
            <h1>FAQ Management</h1>

            <div className="settings-section">
                <h2>FAQ Items</h2>
                <p className="settings-description">
                    Manage frequently asked questions with categories.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>All FAQs</h3>
                        <p>View and manage all FAQ items.</p>
                        <a href="/wp-admin/edit.php?post_type=faq" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            View All FAQs
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Add New FAQ</h3>
                        <p>Create a new FAQ item.</p>
                        <a href="/wp-admin/post-new.php?post_type=faq" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Add New FAQ
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Categories</h3>
                        <p>Manage FAQ categories for organization.</p>
                        <a href="/wp-admin/edit-tags.php?taxonomy=faq_category&post_type=faq" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Manage Categories
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>FAQ Features</h2>
                <p className="settings-description">
                    Each FAQ item supports various display options.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Content</h3>
                        <p>Question and answer fields with bilingual support.</p>
                        <ul className="feature-list">
                            <li>Question (TH/EN)</li>
                            <li>Answer (TH/EN)</li>
                            <li>Rich text editor</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Display Options</h3>
                        <p>Control where FAQs appear.</p>
                        <ul className="feature-list">
                            <li>Featured FAQ toggle</li>
                            <li>Display on homepage</li>
                            <li>Order/priority setting</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
