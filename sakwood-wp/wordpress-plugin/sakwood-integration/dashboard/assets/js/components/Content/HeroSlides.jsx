import React from 'react';

function HeroSlides() {
    return (
        <div className="sakwood-hero-slides-page">
            <h1>Hero Slides Management</h1>

            <div className="settings-section">
                <h2>Slides</h2>
                <p className="settings-description">
                    Manage homepage hero slider with customizable slides.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>All Slides</h3>
                        <p>View and manage all hero slides.</p>
                        <a href="/wp-admin/edit.php?post_type=hero_slide" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            View All Slides
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Add New Slide</h3>
                        <p>Create a new hero slide with custom content.</p>
                        <a href="/wp-admin/post-new.php?post_type=hero_slide" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Add New Slide
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Slide Features</h2>
                <p className="settings-description">
                    Each slide supports various customization options.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Content</h3>
                        <p>Title, subtitle, description, and call-to-action button.</p>
                        <ul className="feature-list">
                            <li>Title & Subtitle</li>
                            <li>Description text</li>
                            <li>CTA button text & link</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Appearance</h3>
                        <p>Customize visual elements of each slide.</p>
                        <ul className="feature-list">
                            <li>Featured image</li>
                            <li>Text color picker</li>
                            <li>Overlay toggle</li>
                            <li>Position settings</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Video Support</h3>
                        <p>Add video background to slides.</p>
                        <ul className="feature-list">
                            <li>Video URL field</li>
                            <li>Auto-play support</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Bilingual</h3>
                        <p>Thai and English content support.</p>
                        <ul className="feature-list">
                            <li>Thai (primary)</li>
                            <li>English translations</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Slider Settings</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Global Configuration</h3>
                        <p>Configure slider behavior and timing.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-slider" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Slider Settings
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSlides;
