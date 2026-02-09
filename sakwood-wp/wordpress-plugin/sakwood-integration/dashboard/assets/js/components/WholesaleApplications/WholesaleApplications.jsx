import React, { useState, useEffect, useMemo } from 'react';
import ApplicationFilters from './ApplicationFilters';
import ApplicationTable from './ApplicationTable';
import ApplicationDetailsModal from './ApplicationDetailsModal';

function WholesaleApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: ''
    });
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        setLoading(true);
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'get_wholesale_applications_list',
                    nonce: window.sakwoodDashboard?.nonce || ''
                })
            });

            if (response.ok) {
                const data = await response.json();
                setApplications(data.success ? data.data : []);
            }
        } catch (error) {
            console.error('Failed to load applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredApplications = useMemo(() => {
        if (!filters.status) return applications;
        return applications.filter(app => app.status === filters.status);
    }, [applications, filters.status]);

    const handleViewDetails = async (applicationId) => {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'get_wholesale_application_details',
                    application_id: applicationId,
                    nonce: window.sakwoodDashboard?.nonce || ''
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setSelectedApplication(data.data);
                    setShowDetails(true);
                }
            }
        } catch (error) {
            console.error('Failed to load application details:', error);
        }
    };

    const handleUpdateApplication = async (applicationId, status, creditLimit, notes) => {
        try {
            const response = await fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'update_wholesale_application',
                    application_id: applicationId,
                    status: status,
                    credit_limit: creditLimit || '',
                    admin_notes: notes || '',
                    nonce: window.sakwoodDashboard?.nonce || ''
                })
            });

            if (response.ok) {
                setShowDetails(false);
                await loadApplications();
            }
        } catch (error) {
            console.error('Failed to update application:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading applications...</div>;
    }

    return (
        <div className="sakwood-wholesale-applications-page">
            <h1>Wholesale Applications</h1>

            <ApplicationFilters
                filters={filters}
                onFilterChange={(status) => setFilters({ status })}
            />

            <p className="results-count">
                Showing {filteredApplications.length} of {applications.length} applications
            </p>

            {filteredApplications.length === 0 ? (
                <div className="empty-state">No applications found</div>
            ) : (
                <ApplicationTable
                    applications={filteredApplications}
                    onViewDetails={handleViewDetails}
                />
            )}

            {showDetails && selectedApplication && (
                <ApplicationDetailsModal
                    application={selectedApplication}
                    onClose={() => setShowDetails(false)}
                    onUpdate={handleUpdateApplication}
                />
            )}
        </div>
    );
}

export default WholesaleApplications;
