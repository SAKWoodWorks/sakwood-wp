import React from 'react';

function Header({ onToggleSidebar }) {
    return (
        <header className="sakwood-header">
            <div className="sakwood-header-left">
                <button onClick={onToggleSidebar} className="menu-toggle">
                    ☰
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
