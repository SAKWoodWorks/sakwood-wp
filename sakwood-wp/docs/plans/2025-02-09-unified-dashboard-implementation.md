# Unified Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a unified WordPress admin dashboard that consolidates all Sakwood plugin features into a single, intuitive interface with sidebar navigation, quick-access cards, and role-based access control.

**Architecture:** A WordPress plugin that loads a React application into the admin interface, using WordPress REST API for data fetching and PHP hooks for routing and permissions. The dashboard replaces the default WordPress admin dashboard as the landing page.

**Tech Stack:** PHP (WordPress hooks), React (UI), WordPress REST API (data layer), Tailwind CSS (styling), Webpack (@wordpress/scripts for build)

---

## Task 1: Create Dashboard Plugin Foundation

**Files:**
- Create: `wordpress-plugin/sakwood-integration/dashboard/sakwood-dashboard.php`

**Step 1: Create main dashboard plugin file**

```php
<?php
/**
 * Sakwood Unified Dashboard
 *
 * @package SakwoodIntegration
 */

if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Dashboard {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'add_dashboard_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
        add_filter('login_redirect', array($this, 'redirect_to_dashboard'), 10, 3);
    }

    public function add_dashboard_menu() {
        // Remove default dashboard
        remove_menu_page('index.php');

        // Add our dashboard as the main menu
        add_menu_page(
            'Sakwood Dashboard',
            'Dashboard',
            'edit_posts',
            'sakwood-dashboard',
            array($this, 'render_dashboard'),
            'dashicons-dashboard',
            1
        );

        // Add submenu items (placeholders for now)
        add_submenu_page(
            'sakwood-dashboard',
            'Overview',
            'Overview',
            'edit_posts',
            'sakwood-dashboard',
            array($this, 'render_dashboard')
        );
    }

    public function enqueue_assets($hook) {
        // Only load on our dashboard pages
        if (strpos($hook, 'sakwood-dashboard') === false) {
            return;
        }

        // Enqueue React app
        wp_enqueue_script(
            'sakwood-dashboard-app',
            plugins_url('dashboard/assets/js/build/dashboard.js', dirname(__FILE__)),
            array('wp-element'),
            '1.0.0',
            true
        );

        // Enqueue styles
        wp_enqueue_style(
            'sakwood-dashboard-style',
            plugins_url('dashboard/assets/css/dashboard.css', dirname(__FILE__)),
            array(),
            '1.0.0'
        );

        // Pass data to React
        wp_localize_script('sakwood-dashboard-app', 'sakwoodDashboard', array(
            'apiUrl' => rest_url('sakwood/v1/dashboard'),
            'nonce' => wp_create_nonce('wp_rest'),
            'user' => array(
                'id' => get_current_user_id(),
                'role' => wp_get_current_user()->roles[0] ?? '',
                'name' => wp_get_current_user()->display_name,
            ),
        ));
    }

    public function render_dashboard() {
        ?>
        <div id="sakwood-dashboard-root"></div>
        <?php
    }

    public function redirect_to_dashboard($redirect_to, $request, $user) {
        // Redirect admins to our dashboard after login
        if (isset($user->roles) && is_array($user->roles)) {
            if (in_array('administrator', $user->roles) ||
                in_array('editor', $user->roles) ||
                in_array('shop_manager', $user->roles)) {
                return admin_url('admin.php?page=sakwood-dashboard');
            }
        }
        return $redirect_to;
    }
}

// Initialize dashboard
function sakwood_dashboard_init() {
    return Sakwood_Dashboard::get_instance();
}
add_action('plugins_loaded', 'sakwood_dashboard_init');
```

**Step 2: Update main plugin to load dashboard**

Modify: `wordpress-plugin/sakwood-integration/sakwood-integration.php`

After line 163 (after Menu REST API), add:

```php
// Load Unified Dashboard
require_once SAKWOOD_PLUGIN_DIR . 'dashboard/sakwood-dashboard.php';
```

**Step 3: Create package.json for React build**

Create: `wordpress-plugin/sakwood-integration/dashboard/package.json`

```json
{
  "name": "sakwood-dashboard",
  "version": "1.0.0",
  "description": "Sakwood Unified Dashboard",
  "scripts": {
    "build": "wp-scripts build",
    "start": "wp-scripts start",
    "check-engines": "wp-scripts check-engines"
  },
  "devDependencies": {
    "@wordpress/scripts": "^26.0.0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  }
}
```

**Step 4: Create webpack config**

Create: `wordpress-plugin/sakwood-integration/dashboard/webpack.config.js`

```javascript
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: './assets/js/dashboard.js',
    output: {
        path: path.resolve(__dirname, 'assets/js/build'),
        filename: 'dashboard.js',
    },
};
```

**Step 5: Commit**

```bash
cd wordpress-plugin/sakwood-integration
git add dashboard/sakwood-dashboard.php dashboard/package.json dashboard/webpack.config.js
cd ../..
git add wordpress-plugin/sakwood-integration/sakwood-integration.php
git commit -m "feat(dashboard): create dashboard plugin foundation"
```

---

## Task 2: Set Up React App Structure

**Files:**
- Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/dashboard.js`
- Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/App.jsx`
- Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/Sidebar.jsx`
- Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/Header.jsx`
- Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Dashboard/Dashboard.jsx`
- Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/utils/api.js`

**Step 1: Create main React entry point**

Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/dashboard.js`

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/Layout/App';

// Initialize React app
const container = document.getElementById('sakwood-dashboard-root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
```

**Step 2: Create main App component**

Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/App.jsx`

```javascript
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
```

**Step 3: Create Sidebar component**

Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/Sidebar.jsx`

```javascript
import React from 'react';

const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'crm', icon: '👥', label: 'CRM', submenu: ['Customers', 'Interactions', 'Tasks', 'Reports'] },
    { id: 'products', icon: '📦', label: 'Products', submenu: ['All Products', 'Bulk Import'] },
    { id: 'wholesale', icon: '🏷️', label: 'Wholesale', submenu: ['Applications', 'Dealers'] },
    { id: 'content', icon: '📝', label: 'Content', submenu: ['Blog', 'Hero Slides', 'FAQ'] },
    { id: 'marketing', icon: '📢', label: 'Marketing', submenu: ['Popups', 'Chat'] },
    { id: 'orders', icon: '🛒', label: 'Orders' },
    { id: 'settings', icon: '⚙️', label: 'Settings', adminOnly: true },
];

function Sidebar({ isOpen, currentPage, onNavigate, onToggle }) {
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
                    {menuItems.map((item) => (
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
```

**Step 4: Create Header component**

Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/Header.jsx`

```javascript
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
```

**Step 5: Create Dashboard component**

Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Dashboard/Dashboard.jsx`

```javascript
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
```

**Step 6: Create API utility**

Create: `wordpress-plugin/sakwood-integration/dashboard/assets/js/utils/api.js`

```javascript
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
```

**Step 7: Commit**

```bash
git add wordpress-plugin/sakwood-integration/dashboard/assets/js/
git commit -m "feat(dashboard): set up React app structure"
```

---

## Task 3: Create REST API Endpoints

**Files:**
- Create: `wordpress-plugin/sakwood-integration/dashboard/api/dashboard-stats.php`
- Create: `wordpress-plugin/sakwood-integration/dashboard/api/dashboard-activity.php`
- Modify: `wordpress-plugin/sakwood-integration/dashboard/sakwood-dashboard.php`

**Step 1: Create stats endpoint**

Create: `wordpress-plugin/sakwood-integration/dashboard/api/dashboard-stats.php`

```php
<?php
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Dashboard_Stats_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('sakwood/v1', '/dashboard/stats', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_stats'),
            'permission_callback' => function() {
                return current_user_can('edit_posts');
            },
        ));
    }

    public function get_stats($request) {
        global $wpdb;

        $customers_table = $wpdb->prefix . 'sakwood_customers';
        $tasks_table = $wpdb->prefix . 'sakwood_tasks';
        $interactions_table = $wpdb->prefix . 'sakwood_interactions';

        // Get order stats from WooCommerce
        $today_orders = wc_get_orders(array(
            'limit' => -1,
            'date_created' => date('Y-m-d'),
            'return' => 'ids',
        ));

        // Get task stats
        $pending_tasks = $wpdb->get_var(
            "SELECT COUNT(*) FROM $tasks_table WHERE status = 'pending'"
        );

        // Get customer stats
        $total_customers = $wpdb->get_var(
            "SELECT COUNT(*) FROM $customers_table"
        );

        return array(
            'orders' => array(
                'today' => count($today_orders),
                'pending' => wc_get_orders(array(
                    'status' => 'pending',
                    'return' => 'ids',
                    'limit' => -1,
                )),
            ),
            'tasks' => array(
                'pending' => intval($pending_tasks),
            ),
            'customers' => array(
                'total' => intval($total_customers),
            ),
            'applications' => array(
                'pending' => Sakwood_Wholesale_Database::get_count_by_status('pending'),
            ),
        );
    }
}

new Sakwood_Dashboard_Stats_API();
```

**Step 2: Create activity feed endpoint**

Create: `wordpress-plugin/sakwood-integration/dashboard/api/dashboard-activity.php`

```php
<?php
if (!defined('ABSPATH')) {
    exit;
}

class Sakwood_Dashboard_Activity_API {

    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('sakwood/v1', '/dashboard/activity', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_activity'),
            'permission_callback' => function() {
                return current_user_can('edit_posts');
            },
        ));
    }

    public function get_activity($request) {
        global $wpdb;

        $activities = array();

        // Get recent orders
        $recent_orders = wc_get_orders(array(
            'limit' => 5,
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        foreach ($recent_orders as $order) {
            $activities[] = array(
                'id' => 'order-' . $order->get_id(),
                'type' => 'order',
                'message' => sprintf(
                    'New order #%s from %s - %s',
                    $order->get_id(),
                    $order->get_billing_first_name() . ' ' . $order->get_billing_last_name(),
                    $order->get_total()
                ),
                'time' => human_time_diff(strtotime($order->get_date_created()), current_time('timestamp')) . ' ago',
                'link' => $order->get_edit_order_url(),
            );
        }

        // Get recent wholesale applications
        $apps = Sakwood_Wholesale_Database::get_all_applications('', 5, 0);
        foreach ($apps as $app) {
            $activities[] = array(
                'id' => 'wholesale-' . $app->id,
                'type' => 'wholesale',
                'message' => sprintf(
                    'Wholesale application from %s',
                    $app->business_name
                ),
                'time' => human_time_diff(strtotime($app->created_at), current_time('timestamp')) . ' ago',
                'link' => admin_url('admin.php?page=sakwood-wholesale'),
            );
        }

        // Sort by time
        usort($activities, function($a, $b) {
            return strtotime($b['time']) - strtotime($a['time']);
        });

        return array_slice($activities, 0, 10);
    }
}

new Sakwood_Dashboard_Activity_API();
```

**Step 3: Load API files in main dashboard plugin**

Modify: `wordpress-plugin/sakwood-integration/dashboard/sakwood-dashboard.php`

After the class definition, before the initialization, add:

```php
// Load API endpoints
require_once SAKWOOD_PLUGIN_DIR . 'dashboard/api/dashboard-stats.php';
require_once SAKWOOD_PLUGIN_DIR . 'dashboard/api/dashboard-activity.php';
```

**Step 4: Commit**

```bash
git add wordpress-plugin/sakwood-integration/dashboard/api/
git add wordpress-plugin/sakwood-integration/dashboard/sakwood-dashboard.php
git commit -m "feat(dashboard): add REST API endpoints for stats and activity"
```

---

## Task 4: Create Dashboard Styles

**Files:**
- Create: `wordpress-plugin/sakwood-integration/dashboard/assets/css/dashboard.css`

**Step 1: Create main stylesheet**

Create: `wordpress-plugin/sakwood-integration/dashboard/assets/css/dashboard.css`

```css
/* Reset & Base */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.sakwood-dashboard {
    display: flex;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f0f0f1;
    color: #1d2327;
}

/* Sidebar */
.sakwood-sidebar {
    width: 260px;
    background: #1d2327;
    color: #fff;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
}

.sakwood-sidebar.collapsed {
    width: 60px;
}

.sakwood-sidebar-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #0000001a;
}

.sakwood-sidebar-header h2 {
    font-size: 18px;
    font-weight: 600;
}

.sakwood-sidebar.collapsed h2 {
    display: none;
}

.toggle-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 4px 8px;
    font-size: 14px;
}

.sakwood-sidebar-nav ul {
    list-style: none;
    padding: 8px 0;
}

.sakwood-sidebar-nav > ul > li {
    margin: 4px 0;
}

.sakwood-sidebar-nav button {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
    transition: background 0.2s;
}

.sakwood-sidebar-nav button:hover,
.sakwood-sidebar-nav button.active {
    background: #0000001a;
}

.sakwood-sidebar-nav button .icon {
    font-size: 18px;
    margin-right: 12px;
}

.sakwood-sidebar.collapsed button .label {
    display: none;
}

.submenu {
    list-style: none;
    padding-left: 48px;
}

.submenu li {
    margin: 2px 0;
}

.submenu a {
    display: block;
    padding: 8px 16px;
    color: #ffffffcc;
    text-decoration: none;
    font-size: 13px;
}

.submenu a:hover {
    color: #fff;
    background: #0000001a;
}

/* Main Content */
.sakwood-dashboard-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* Header */
.sakwood-header {
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #0000001a;
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 24px;
}

.menu-toggle {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
}

.sakwood-header-center {
    flex: 1;
}

.sakwood-header-center input {
    width: 100%;
    max-width: 400px;
    padding: 8px 16px;
    border: 1px solid #00000033;
    border-radius: 4px;
    font-size: 14px;
}

.sakwood-header-right {
    display: flex;
    align-items: center;
    gap: 16px;
}

.notifications {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
}

/* Content Area */
.sakwood-dashboard-content {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
}

.sakwood-dashboard-overview h1 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 8px;
}

.sakwood-dashboard-overview p {
    color: #50575e;
    font-size: 16px;
    margin-bottom: 32px;
}

/* Quick Access Cards */
.quick-access-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
}

.card {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card h3 {
    font-size: 14px;
    font-weight: 500;
    color: #50575e;
    margin-bottom: 12px;
}

.card .value {
    font-size: 36px;
    font-weight: 600;
    color: #1d2327;
}

/* Activity Feed */
.activity-feed {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.activity-feed h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
}

.activity-feed ul {
    list-style: none;
}

.activity-feed li {
    padding: 12px 0;
    border-bottom: 1px solid #0000000d;
}

.activity-feed li:last-child {
    border-bottom: none;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
    font-size: 16px;
    color: #50575e;
}
```

**Step 2: Commit**

```bash
git add wordpress-plugin/sakwood-integration/dashboard/assets/css/dashboard.css
git commit -m "feat(dashboard): add main stylesheet"
```

---

## Task 5: Build and Test

**Files:**
- (Build output files)

**Step 1: Install dependencies**

Run: `cd wordpress-plugin/sakwood-integration/dashboard && npm install`

Expected: Dependencies installed successfully

**Step 2: Build React app**

Run: `npm run build`

Expected: Build output in `assets/js/build/dashboard.js`

**Step 3: Copy files to WordPress container**

Run: `docker cp wordpress-plugin/sakwood-integration/dashboard sak_wp:/var/www/html/wp-content/plugins/sakwood-integration/`

**Step 4: Activate and test**

1. Login to WordPress admin: `http://localhost:8006/wp-admin`
2. Verify dashboard loads as default page
3. Check console for errors
4. Test sidebar navigation
5. Verify stats display

**Step 5: Fix any issues**

Address any errors found during testing. Common issues:
- Check file paths in `wp_enqueue_script`
- Verify REST API endpoints are registered
- Ensure React app mounts correctly

**Step 6: Commit working version**

```bash
git add wordpress-plugin/sakwood-integration/dashboard/
git commit -m "feat(dashboard): complete Phase 1 - core dashboard foundation"
```

---

## Task 6: Add Role-Based Access Control

**Files:**
- Modify: `wordpress-plugin/sakwood-integration/dashboard/sakwood-dashboard.php`
- Modify: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/Sidebar.jsx`

**Step 1: Update PHP to pass user capabilities**

Modify: `wordpress-plugin/sakwood-integration/dashboard/sakwood-dashboard.php`

Update the `wp_localize_script` call:

```php
wp_localize_script('sakwood-dashboard-app', 'sakwoodDashboard', array(
    'apiUrl' => rest_url('sakwood/v1/dashboard'),
    'nonce' => wp_create_nonce('wp_rest'),
    'user' => array(
        'id' => get_current_user_id(),
        'role' => wp_get_current_user()->roles[0] ?? '',
        'name' => wp_get_current_user()->display_name,
        'capabilities' => array(
            'manage_options' => current_user_can('manage_options'),
            'edit_posts' => current_user_can('edit_posts'),
            'manage_woocommerce' => current_user_can('manage_woocommerce'),
        ),
    ),
));
```

**Step 2: Update Sidebar to respect permissions**

Modify: `wordpress-plugin/sakwood-integration/dashboard/assets/js/components/Layout/Sidebar.jsx`

Update the menuItems array:

```javascript
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
```

Update the Sidebar component to filter items:

```javascript
function Sidebar({ isOpen, currentPage, onNavigate, onToggle }) {
    const userCapabilities = window.sakwoodDashboard?.user?.capabilities || {};

    // Filter menu items based on user capabilities
    const visibleItems = menuItems.filter(item => {
        if (!item.capability) return true;
        return userCapabilities[item.capability] === true;
    });

    return (
        <aside className={`sakwood-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            {/* ... rest of component ... */}
            <nav className="sakwood-sidebar-nav">
                <ul>
                    {visibleItems.map((item) => (
                        {/* ... render item ... */}
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
```

**Step 3: Commit**

```bash
git add wordpress-plugin/sakwood-integration/dashboard/
git commit -m "feat(dashboard): add role-based access control"
```

---

## Testing Checklist

After completing all tasks, verify:

- [ ] Dashboard loads as default page after login
- [ ] Stats display correctly (orders, tasks, applications)
- [ ] Activity feed shows recent activity
- [ ] Sidebar navigation works
- [ ] Sidebar collapses/expands
- [ ] Role-based access hides Settings for non-admins
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Quick access cards display data
- [ ] Search input is present (functionality not implemented yet)

---

## Known Limitations (Phase 1)

This is Phase 1 of the dashboard. Not yet implemented:

- Keyboard navigation shortcuts
- Actual page content beyond dashboard overview
- Inline editing
- Quick actions functionality
- Notification system
- Advanced filtering
- Dealer-specific views

These will be added in Phase 2-5.

---

**End of Implementation Plan**
