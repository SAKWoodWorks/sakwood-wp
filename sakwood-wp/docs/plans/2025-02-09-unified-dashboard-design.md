# Sakwood Unified Dashboard Design

**Date:** 2025-02-09
**Status:** Design Approved
**Author:** Claude Code + Sakwood Team

## Executive Summary

A unified "Sakwood Command Center" dashboard that consolidates all plugin features into a single, intuitive interface. Replaces the scattered WordPress admin experience with a cohesive SaaS-like dashboard that saves navigation time and reduces training for new team members.

**Primary Goals:**
1. Save time navigating - Everything in one place
2. Reduce training - New team members learn one dashboard
3. Improve visibility - See all important metrics at a glance
4. Streamline workflows - Combine related tasks in unified pages

---

## Overview & Architecture

### The Vision

A custom admin dashboard that:
- **Replaces the default WordPress dashboard** as the landing page after login
- **Integrates seamlessly** with existing plugin features (no rewrites needed)
- **Uses modern, responsive design** matching the Sakwood brand
- **Loads via WordPress admin** but feels like a custom SaaS application

### Technical Stack

| Component | Technology |
|-----------|------------|
| Backend | PHP/WordPress hooks for routing and permissions |
| Frontend | React (loaded in WordPress admin) |
| Data Layer | WordPress REST API |
| Charts | Recharts |
| Styling | Tailwind CSS (consistent with frontend) |
| Build | Webpack (via @wordpress/scripts) |

### Key Design Principles

1. **Progressive disclosure** - Show overview first, details on demand
2. **Contextual actions** - Related tasks appear together
3. **Keyboard shortcuts** - Power users can navigate without mouse
4. **Mobile responsive** - Check orders/applications on phone

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Sakwood    [Search]    [Notifications]  [Profile ▼] │
├──────────┬──────────────────────────────────────────────────┤
│          │  📊 Welcome back! Here's what's happening...     │
│          ├──────────────────────────────────────────────────┤
│ Sidebar  │  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│          │  │ Pending  │ │ Today's  │ │ New      │         │
│ Dashboard│  │ Tasks    │ │ Orders   │ │ Apps     │         │
│ CRM      │  │    5     │ │    12    │ │    3     │         │
│ Products │  └──────────┘ └──────────┘ └──────────┘         │
│ Wholesale│                                                  │
│ Content  │  ┌────────────────────────────────────────┐    │
│ Marketing│  │ Quick Actions                           │    │
│ Settings │  │ [➕ New Product] [✓ Approve Apps] [💬] │    │
│          │  └────────────────────────────────────────┘    │
│          │                                                  │
│          │  ┌────────────────────────────────────────┐    │
│          │  │ Recent Activity Feed                    │    │
│          │  │ • New wholesale app from John D.        │    │
│          │  │ • Order #1234 - PromptPay pending       │    │
│          │  │ • Product "Oak Beam" stock low          │    │
│          │  └────────────────────────────────────────┘    │
└──────────┴──────────────────────────────────────────────────┘
```

---

## Main Dashboard: Quick-Access Cards

### Sales Cards

| Card | Data | Actions |
|------|------|---------|
| **Today's Orders** | Count + total value | Click to view order list |
| **Pending Payments** | PromptPay verifications waiting | Quick approve/reject |
| **Low Stock Alerts** | Products below threshold | Click to restock |

### Customer Cards

| Card | Data | Actions |
|------|------|---------|
| **Pending Tasks** | Tasks due today/overdue | Quick mark complete |
| **Wholesale Applications** | Pending approvals | Approve/reject inline |
| **Recent Interactions** | Last 5 communications | View customer details |

### Task Cards

| Card | Data | Actions |
|------|------|---------|
| **My Tasks** | Assigned to current user | Edit, complete, reassign |
| **Unread Messages** | Contact form submissions | Quick reply |
| **Follow-ups Needed** | Customers marked for follow-up | Schedule callback |

---

## Sidebar Navigation

### Menu Structure

```
📊 Dashboard
   └─ Overview (default landing page)

👥 CRM
   ├─ Customers
   ├─ Interactions
   ├─ Tasks
   └─ Reports

📦 Products
   ├─ All Products
   ├─ Bulk Import
   ├─ Categories
   └─ Stock Alerts

🏷️ Wholesale
   ├─ Applications
   │  ├─ All
   │  ├─ Pending
   │  └─ Approved
   └─ Dealers

📝 Content
   ├─ Blog Posts
   ├─ Hero Slides
   ├─ FAQ
   ├─ Video Gallery
   ├─ Knowledge Base
   └─ Contact Forms

📢 Marketing
   ├─ Popups
   ├─ Chat Settings
   └─ Promotions

🛒 Orders
   ├─ All Orders
   ├─ Pending
   ├─ Processing
   └─ Completed

⚙️ Settings (admin only)
   ├─ PromptPay
   ├─ Users & Roles
   ├─ Menus
   └─ System Settings
```

### Sidebar Features

- **Keyboard navigation** - Arrow keys + Enter to navigate
- **Collapsible** - Click to collapse to icons only
- **Search** - Quick filter menu items (Cmd/Ctrl + K)
- **Badges** - Show counts on items (e.g., "Tasks (5)")
- **Active state** - Highlight current page

---

## Unified Page Layouts

Each section combines related features in one view:

### Products Page Example

```
┌───────────────────────────────────────────────────────────┐
│ Products                          [➕ Add] [📥 Import]     │
├───────────────────────────────────────────────────────────┤
│ 🔍 Search products...    │  Filter: [All ▼]  Sort: [Name ▼]│
├───────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Product List                          [Toggle View]  │ │
│ │                                                       │ │
│ │ 📷  Oak Beam 4m                      ฿1,200.00       │ │
│ │      Stock: 15 | Category: Beams   [Edit] [Delete]  │ │
│ │                                                       │ │
│ │ 📷  Plywood Sheet                    ฿850.00         │ │
│ │      Stock: 42 | Category: Sheets   [Edit] [Delete]  │ │
│ └──────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Bulk Import Panel                                    │ │
│ │ [📁 Upload CSV]  Download Template                   │ │
│ └──────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

### Key Unified Features

- **Contextual panels** - Related tools appear inline
- **Quick actions** - Common actions without leaving the page
- **Inline editing** - Edit fields directly in list view
- **Batch operations** - Select multiple items, apply action
- **Live search** - Results update as you type

---

## Role-Based Access Control

### Access Levels

| Section | Admin | Shop Manager | Editor | Wholesale Dealer |
|---------|-------|--------------|--------|------------------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| CRM | ✅ | ✅ | ❌ | Limited* |
| Products | ✅ | ✅ | ❌ | View only |
| Wholesale | ✅ | ✅ | ❌ | Own apps only |
| Content | ✅ | ❌ | ✅ | ❌ |
| Marketing | ✅ | ✅ | ✅ | ❌ |
| Orders | ✅ | ✅ | ❌ | Own orders only |
| Settings | ✅ | ❌ | ❌ | ❌ |

**Dealer Restrictions:**
- Can only view/edit their own applications
- Can view products (read-only)
- Cannot access customer data or settings
- Blocked from standard WordPress admin

### Implementation

```php
// Check capabilities before showing menu items
if (current_user_can('manage_options')) {
    // Show Settings
}
if (current_user_can('edit_posts')) {
    // Show Content
}
if (current_user_can('manage_woocommerce')) {
    // Show CRM, Products, Orders
}
```

---

## Implementation Plan

### Phase 1: Core Dashboard (Foundation)

1. Create `sakwood-dashboard.php` - Main dashboard plugin file
2. Set up custom admin menu structure
3. Build React app skeleton within WordPress admin
4. Create base layout with sidebar + main content area
5. Implement routing for dashboard pages
6. Replace default WordPress dashboard as landing page

### Phase 2: Dashboard Widgets

1. Build quick-access card components
2. Create REST API endpoints for real-time data
3. Implement statistics counters (orders, tasks, applications)
4. Build activity feed component
5. Add quick actions panel

### Phase 3: Unified Pages

1. Products unified page (list + bulk import inline)
2. CRM customers page (list + interactions + tasks)
3. Wholesale applications page (with approve/reject workflow)
4. Orders page (with status management)
5. Content management pages (blog, hero slides, FAQ, etc.)

### Phase 4: Navigation & Polish

1. Collapsible sidebar with icons
2. Keyboard navigation (arrow keys, shortcuts)
3. Search/filter functionality
4. Mobile responsive design
5. Loading states & error handling

### Phase 5: Role-Based Access

1. Implement capability checks
2. Hide/show menu items by role
3. Dealer-specific views (own applications only)
4. Test with different user roles

---

## File Structure

```
wordpress-plugin/sakwood-integration/
├── dashboard/
│   ├── sakwood-dashboard.php              # Main plugin file
│   ├── assets/
│   │   ├── js/
│   │   │   ├── dashboard.js               # React app entry
│   │   │   ├── components/
│   │   │   │   ├── Layout/
│   │   │   │   │   ├── Sidebar.jsx
│   │   │   │   │   ├── Header.jsx
│   │   │   │   │   └── MainContent.jsx
│   │   │   │   ├── Dashboard/
│   │   │   │   │   ├── Dashboard.jsx
│   │   │   │   │   ├── QuickAccessCard.jsx
│   │   │   │   │   ├── ActivityFeed.jsx
│   │   │   │   │   └── QuickActions.jsx
│   │   │   │   ├── Pages/
│   │   │   │   │   ├── ProductsPage.jsx
│   │   │   │   │   ├── CRM/
│   │   │   │   │   │   ├── CustomersPage.jsx
│   │   │   │   │   │   ├── InteractionsPage.jsx
│   │   │   │   │   │   ├── TasksPage.jsx
│   │   │   │   │   │   └── ReportsPage.jsx
│   │   │   │   │   ├── WholesalePage.jsx
│   │   │   │   │   ├── OrdersPage.jsx
│   │   │   │   │   ├── Content/
│   │   │   │   │   │   ├── BlogPage.jsx
│   │   │   │   │   │   ├── HeroSlidesPage.jsx
│   │   │   │   │   │   ├── FAQPage.jsx
│   │   │   │   │   │   ├── VideoGalleryPage.jsx
│   │   │   │   │   │   └── KnowledgeBasePage.jsx
│   │   │   │   │   ├── MarketingPage.jsx
│   │   │   │   │   └── SettingsPage.jsx
│   │   │   │   └── Shared/
│   │   │   │       ├── DataTable.jsx
│   │   │   │       ├── SearchBar.jsx
│   │   │   │       ├── FilterPanel.jsx
│   │   │   │       └── ActionButtons.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDashboardStats.js
│   │   │   │   ├── useActivityFeed.js
│   │   │   │   └── usePermissions.js
│   │   │   ├── utils/
│   │   │   │   └── api.js                 # API client
│   │   │   └── routes.js                  # Route config
│   │   └── css/
│   │       └── dashboard.css              # Tailwind styles
│   ├── templates/
│   │   └── dashboard-container.php        # React mount point
│   └── api/
│       ├── dashboard-stats.php            # Stats endpoint
│       ├── dashboard-activity.php         # Activity feed
│       └── dashboard-actions.php          # Quick actions
```

---

## REST API Endpoints

### Dashboard Statistics

```
GET /wp-json/sakwood/v1/dashboard/stats
Response: {
  orders: { today: 12, total: 1250, pending: 3 },
  tasks: { pending: 5, overdue: 2, mine: 3 },
  applications: { pending: 3, today: 1 },
  customers: { new: 2, total: 156 }
}
```

### Activity Feed

```
GET /wp-json/sakwood/v1/dashboard/activity
Response: [
  { id: 1, type: 'order', message: 'New order #1234', time: '2 min ago' },
  { id: 2, type: 'wholesale', message: 'Application from John D.', time: '15 min ago' },
  { id: 3, type: 'stock', message: 'Oak Beam low stock', time: '1 hour ago' }
]
```

### Quick Actions

```
POST /wp-json/sakwood/v1/dashboard/quick-action
Body: { action: 'approve_application', id: 123 }
Response: { success: true, message: 'Application approved' }
```

---

## Success Criteria

### Measurable Goals

| Metric | Current | Target |
|--------|---------|--------|
| Time to find common features | ~5 clicks | 1-2 clicks |
| New user training time | 2-3 hours | <30 minutes |
| Daily task completion rate | Baseline | +20% |
| Navigation satisfaction | Survey: 3/5 | Survey: 4.5/5 |

### Technical Success

- [ ] Dashboard loads in <2 seconds
- [ ] All features accessible via keyboard
- [ ] Mobile responsive (iPhone SE and larger)
- [ ] No WordPress admin access for customers (blocked)
- [ ] Role-based access working correctly

---

## Next Steps

1. ✅ Design approved
2. 📝 Create detailed implementation plan
3. 🔧 Set up isolated development workspace
4. 💻 Begin Phase 1 implementation
5. 🧪 Test with different user roles
6. 🚀 Deploy to staging for user feedback
7. 📚 Create user documentation

---

**Document Version:** 1.0
**Last Updated:** 2025-02-09
