import React from 'react';

const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', capability: 'edit_posts' },
    {
        id: 'crm',
        icon: '👥',
        label: 'CRM',
        capability: 'manage_woocommerce',
        submenu: [
            { id: 'crm-customers', label: 'Customers' },
            { id: 'crm-interactions', label: 'Interactions' },
            { id: 'crm-tasks', label: 'Tasks' },
            { id: 'crm-reports', label: 'Reports' }
        ]
    },
    {
        id: 'products',
        icon: '📦',
        label: 'Products',
        capability: 'manage_woocommerce',
        submenu: [
            { id: 'products-all', label: 'All Products' },
            { id: 'products-bulk-import', label: 'Bulk Import' }
        ]
    },
    {
        id: 'wholesale',
        icon: '🏷️',
        label: 'Wholesale',
        capability: 'manage_woocommerce',
        submenu: [
            { id: 'wholesale-applications', label: 'Applications' },
            { id: 'wholesale-dealers', label: 'Dealers' }
        ]
    },
    {
        id: 'content',
        icon: '📝',
        label: 'Content',
        capability: 'edit_posts',
        submenu: [
            { id: 'content-blog', label: 'Blog' },
            { id: 'content-hero-slides', label: 'Hero Slides' },
            { id: 'content-faq', label: 'FAQ' }
        ]
    },
    {
        id: 'marketing',
        icon: '📢',
        label: 'Marketing',
        capability: 'edit_posts',
        submenu: [
            { id: 'marketing-popups', label: 'Popups' },
            { id: 'marketing-chat', label: 'Chat' }
        ]
    },
    { id: 'orders', icon: '🛒', label: 'Orders', capability: 'manage_woocommerce' },
    { id: 'settings', icon: '⚙️', label: 'Settings', capability: 'manage_options' },
];

function Sidebar({ isOpen, currentPage, onNavigate, onToggle }) {
    const userCapabilities = window.sakwoodDashboard?.user?.capabilities || {};

    // Filter menu items based on user capabilities
    const visibleItems = menuItems.filter(item => {
        if (!item.capability) return true;
        return userCapabilities[item.capability] === true;
    });

    return (
        <aside className={`sakwood-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <div className="sakwood-sidebar-header">
                <h2>{isOpen ? 'Sakwood' : 'SAK'}</h2>
                <button onClick={onToggle} className="toggle-btn">
                    {isOpen ? '◀' : '▶'}
                </button>
            </div>
            <nav className="sakwood-sidebar-nav">
                <ul>
                    {visibleItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onNavigate(item.id)}
                                className={currentPage === item.id || currentPage.startsWith(item.id + '-') ? 'active' : ''}
                            >
                                <span className="icon">{item.icon}</span>
                                {isOpen && <span className="label">{item.label}</span>}
                            </button>
                            {isOpen && item.submenu && (
                                <ul className="submenu">
                                    {item.submenu.map((sub) => (
                                        <li key={sub.id}>
                                            <button
                                                onClick={() => onNavigate(sub.id)}
                                                className={currentPage === sub.id ? 'active' : ''}
                                            >
                                                {sub.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
