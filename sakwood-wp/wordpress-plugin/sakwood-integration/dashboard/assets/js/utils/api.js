const API_URL = window.sakwoodDashboard?.apiUrl || '/wp-json/sakwood/v1/dashboard';

export async function fetchDashboardStats() {
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }
    return await response.json();
}

export async function fetchActivityFeed() {
    const response = await fetch(`${API_URL}/activity`);
    if (!response.ok) {
        throw new Error('Failed to fetch activity');
    }
    return await response.json();
}
