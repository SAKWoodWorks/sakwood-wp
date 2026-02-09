import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../Dashboard/Dashboard';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('dashboard');

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
                    <Dashboard />
                </main>
            </div>
        </div>
    );
}

export default App;
