import React, { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../../utils/api';

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await fetchDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="sakwood-dashboard-overview">
            <h1>Welcome back!</h1>
            <p>Here's what's happening today...</p>

            <div className="quick-access-cards">
                <div className="card">
                    <h3>Pending Tasks</h3>
                    <div className="value">{stats?.tasks?.pending || 0}</div>
                </div>
                <div className="card">
                    <h3>Today's Orders</h3>
                    <div className="value">{stats?.orders?.today || 0}</div>
                </div>
                <div className="card">
                    <h3>New Applications</h3>
                    <div className="value">{stats?.applications?.pending || 0}</div>
                </div>
            </div>

            <div className="activity-feed">
                <h2>Recent Activity</h2>
                <ul>
                    <li>System initialized successfully</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
