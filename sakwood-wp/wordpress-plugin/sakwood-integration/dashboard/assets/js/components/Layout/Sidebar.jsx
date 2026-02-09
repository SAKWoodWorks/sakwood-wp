import React from 'react';

const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', capability: 'edit_posts' },
    { id: 'crm', icon: '👥', label: 'CRM', capability: 'manage_woocommerce', submenu: ['Customers', 'Interactions', 'Tasks', 'Reports'] },
    { id: 'products', icon: '📦', label: 'Products', capability: 'manage_woocommerce', submenu: ['All Products', 'Bulk Import'] },
    { id: 'wholesale', icon: '🏷️', label: 'Wholesale', capability: 'manage_woocommerce', submenu: ['Applications', 'Dealers'] },
    { id: 'content', icon: '📝', label: 'Content', capability: 'edit_posts', submenu: ['Blog', 'Hero Slides', 'FAQ'] },
    { id: 'marketing', icon: '📢', label: 'Marketing', capability: 'edit_posts', submenu: ['Popups', 'Chat'] },
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
                                className={currentPage === item.id ? 'active' : ''}
                            >
                                <span className="icon">{item.icon}</span>
                                {isOpen && <span className="label">{item.label}</span>}
                            </button>
                            {isOpen && item.submenu && (
                                <ul className="submenu">
                                    {item.submenu.map((sub) => (
                                        <li key={sub}>
                                            <a href={`#${item.id}/${sub.toLowerCase().replace(' ', '-')}`}>
                                                {sub}
                                            </a>
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
