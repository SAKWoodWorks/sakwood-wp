import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../Dashboard/Dashboard';

// Page component for unimplemented pages
function ComingSoon({ pageName }) {
    const titles = {
        'crm': 'CRM',
        'products': 'Products',
        'wholesale': 'Wholesale',
        'content': 'Content Management',
        'marketing': 'Marketing',
        'orders': 'Orders',
        'settings': 'Settings',
    };

    return (
        <div className="sakwood-page-coming-soon">
            <h1>{titles[pageName] || pageName}</h1>
            <div className="coming-soon-content">
                <div className="coming-soon-icon">🚧</div>
                <h2>Coming Soon</h2>
                <p>This page is under development. Check back later!</p>
                <div className="coming-soon-features">
                    <h3>Planned Features:</h3>
                    <ul>
                        {pageName === 'crm' && (
                            <>
                                <li>Customer list with search and filters</li>
                                <li>Interaction history tracking</li>
                                <li>Task management system</li>
                                <li>Sales reports and analytics</li>
                            </>
                        )}
                        {pageName === 'products' && (
                            <>
                                <li>Product catalog with images</li>
                                <li>Bulk import from CSV</li>
                                <li>Stock management alerts</li>
                                <li>Price editing tools</li>
                            </>
                        )}
                        {pageName === 'wholesale' && (
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
                        {!['crm', 'products', 'wholesale', 'orders'].includes(pageName) && (
                            <>
                                <li>Full page content</li>
                                <li>Interactive tools</li>
                                <li>Data management</li>
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
