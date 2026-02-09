import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../Dashboard/Dashboard';
import Products from '../Products/Products';
import Orders from '../Orders/Orders';
import WholesaleApplications from '../WholesaleApplications/WholesaleApplications';
import CRMCustomers from '../CRMCustomers/CRMCustomers';

// Page component for unimplemented pages
function ComingSoon({ pageName }) {
    // Get the base page and section from pageName
    const [basePage, section] = pageName.split('-');

    const titles = {
        'crm': 'CRM',
        'products': 'Products',
        'wholesale': 'Wholesale',
        'content': 'Content Management',
        'marketing': 'Marketing',
        'orders': 'Orders',
        'settings': 'Settings',
    };

    const sectionTitles = {
        'customers': 'Customers',
        'interactions': 'Interactions',
        'tasks': 'Tasks',
        'reports': 'Reports',
        'all': 'All Products',
        'bulk-import': 'Bulk Import',
        'applications': 'Applications',
        'dealers': 'Dealers',
        'blog': 'Blog Management',
        'hero-slides': 'Hero Slides',
        'faq': 'FAQ Management',
        'popups': 'Popup Management',
        'chat': 'Chat Settings',
    };

    const fullTitle = section
        ? `${titles[basePage]} - ${sectionTitles[section] || section}`
        : (titles[pageName] || pageName);

    return (
        <div className="sakwood-page-coming-soon">
            <h1>{fullTitle}</h1>
            <div className="coming-soon-content">
                <div className="coming-soon-icon">🚧</div>
                <h2>Coming Soon</h2>
                <p>This page is under development. Check back later!</p>
                <div className="coming-soon-features">
                    <h3>Planned Features:</h3>
                    <ul>
                        {pageName.startsWith('crm') && (
                            <>
                                <li>Customer list with search and filters</li>
                                <li>Interaction history tracking</li>
                                <li>Task management system</li>
                                <li>Sales reports and analytics</li>
                            </>
                        )}
                        {pageName.startsWith('products') && (
                            <>
                                <li>Product catalog with images</li>
                                <li>Bulk import from CSV</li>
                                <li>Stock management alerts</li>
                                <li>Price editing tools</li>
                            </>
                        )}
                        {pageName.startsWith('wholesale') && (
                            <>
                                <li>Application approval workflow</li>
                                <li>Dealer management system</li>
                                <li>Pricing tier configuration</li>
                            </>
                        )}
                        {pageName === 'orders' && (
                            <>
                                <li>Order list with status filters</li>
                                <li>Order details view</li>
                                <li>PromptPay verification</li>
                                <li>Shipping management</li>
                            </>
                        )}
                        {pageName.startsWith('content') && (
                            <>
                                <li>Content editor with live preview</li>
                                <li>Media library integration</li>
                                <li>SEO optimization tools</li>
                            </>
                        )}
                        {pageName.startsWith('marketing') && (
                            <>
                                <li>Campaign management</li>
                                <li>Analytics tracking</li>
                                <li>Customer engagement tools</li>
                            </>
                        )}
                        {pageName === 'settings' && (
                            <>
                                <li>Site configuration</li>
                                <li>User management</li>
                                <li>Integration settings</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('dashboard');

    // Render current page
    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'products-all':
                return <Products />;
            case 'orders':
                return <Orders />;
            case 'wholesale-applications':
                return <WholesaleApplications />;
            case 'crm-customers':
                return <CRMCustomers />;
            default:
                return <ComingSoon pageName={currentPage} />;
        }
    };

    return (
        <div className="sakwood-dashboard">
            <Sidebar
                isOpen={sidebarOpen}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="sakwood-dashboard-main">
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="sakwood-dashboard-content">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}

export default App;
