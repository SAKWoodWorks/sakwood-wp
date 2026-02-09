import React from 'react';

function Blog() {
    return (
        <div className="sakwood-blog-page">
            <h1>Blog Management</h1>

            <div className="settings-section">
                <h2>Posts</h2>
                <p className="settings-description">
                    Manage blog posts with bilingual support (Thai and English).
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>All Posts</h3>
                        <p>View and edit all blog posts.</p>
                        <a href="/wp-admin/edit.php" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            View All Posts
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Add New Post</h3>
                        <p>Create a new blog post with Thai and English content.</p>
                        <a href="/wp-admin/post-new.php" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Add New Post
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Categories</h3>
                        <p>Manage blog post categories.</p>
                        <a href="/wp-admin/edit-tags.php?taxonomy=category" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Manage Categories
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Tags</h3>
                        <p>Manage blog post tags.</p>
                        <a href="/wp-admin/edit-tags.php?taxonomy=post_tag" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Manage Tags
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Bilingual Support</h2>
                <p className="settings-description">
                    Each post supports both Thai (primary) and English translations.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Thai Content</h3>
                        <p>Edit Thai title, content, and excerpt.</p>
                        <div className="language-indicator th">
                            <span className="lang-code">TH</span>
                            <span className="lang-label">Thai (Primary)</span>
                        </div>
                    </div>

                    <div className="setting-card">
                        <h3>English Content</h3>
                        <p>Edit English title, content, and excerpt via custom fields.</p>
                        <div className="language-indicator en">
                            <span className="lang-code">EN</span>
                            <span className="lang-label">English Translation</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Media</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Media Library</h3>
                        <p>Manage images and media for blog posts.</p>
                        <a href="/wp-admin/upload.php" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Media Library
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
