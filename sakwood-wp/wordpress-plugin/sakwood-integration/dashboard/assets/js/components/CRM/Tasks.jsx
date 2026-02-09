import React from 'react';

function Tasks() {
    return (
        <div className="sakwood-tasks-page">
            <h1>Task Management</h1>

            <div className="settings-section">
                <h2>Tasks Overview</h2>
                <p className="settings-description">
                    Manage tasks, to-dos, and action items for your team.
                </p>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>All Tasks</h3>
                        <p>View and manage all tasks across the team.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-tasks" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            View All Tasks
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>My Tasks</h3>
                        <p>View tasks assigned to you.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-tasks&filter=mine" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            My Tasks
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Add New Task</h3>
                        <p>Create a new task and assign to team members.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-tasks&action=add" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Add Task
                        </a>
                    </div>

                    <div className="setting-card">
                        <h3>Overdue Tasks</h3>
                        <p>View tasks that are past their due date.</p>
                        <a href="/wp-admin/admin.php?page=sakwood-crm-tasks&filter=overdue" className="btn-settings-link" target="_blank" rel="noopener noreferrer">
                            Overdue Tasks
                        </a>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Task Features</h2>
                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Task Management</h3>
                        <ul className="feature-list">
                            <li>Task assignment</li>
                            <li>Due dates & reminders</li>
                            <li>Priority levels</li>
                            <li>Status tracking</li>
                        </ul>
                    </div>

                    <div className="setting-card">
                        <h3>Collaboration</h3>
                        <ul className="feature-list">
                            <li>Comments & updates</li>
                            <li>File attachments</li>
                            <li>Task dependencies</li>
                            <li>Team notifications</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
