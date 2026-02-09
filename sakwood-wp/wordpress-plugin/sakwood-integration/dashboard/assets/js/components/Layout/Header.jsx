import React, { useState, useEffect } from 'react';

function Header({ onToggleSidebar }) {
    const [wpMenuVisible, setWpMenuVisible] = useState(false);

    useEffect(() => {
        // Check saved preference
        const savedState = localStorage.getItem('sakwood_wp_menu_hidden');
        setWpMenuVisible(savedState === 'false');
    }, []);

    const toggleWpMenu = () => {
        const newState = !wpMenuVisible;
        setWpMenuVisible(newState);

        // Dispatch event for PHP to handle
        window.dispatchEvent(new CustomEvent('toggle-wp-menu', {
            detail: { show: newState }
        }));
    };

    return (
        <header className="sakwood-header">
            <div className="sakwood-header-left">
                <button onClick={onToggleSidebar} className="menu-toggle" title="Toggle Sakwood Sidebar">
                    ☰
                </button>
                <button
                    onClick={toggleWpMenu}
                    className={`wp-menu-toggle ${wpMenuVisible ? 'active' : ''}`}
                    title="Toggle WordPress Admin Menu"
                >
                    {wpMenuVisible ? '⊟' : '⊠'}
                </button>
            </div>
            <div className="sakwood-header-center">
                <input type="search" placeholder="Search... (Ctrl+K)" />
            </div>
            <div className="sakwood-header-right">
                <button className="notifications">🔔</button>
                <div className="user-info">
                    <span>{window.sakwoodDashboard?.user?.name || 'User'}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
