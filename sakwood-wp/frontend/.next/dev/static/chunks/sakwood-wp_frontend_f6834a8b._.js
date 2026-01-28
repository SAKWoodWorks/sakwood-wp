(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumbs",
    ()=>Breadcrumbs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function Breadcrumbs({ items, lang }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "py-4 px-6 bg-slate-50 border-b border-slate-200",
        "aria-label": "Breadcrumb navigation",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "flex items-center gap-2 text-sm text-slate-600",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-center gap-2",
                        children: [
                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400",
                                "aria-hidden": "true",
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                                lineNumber: 22,
                                columnNumber: 17
                            }, this),
                            index === items.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-slate-900",
                                "aria-current": "page",
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                                lineNumber: 25,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "hover:text-blue-600 transition-colors",
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                                lineNumber: 29,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.href, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Breadcrumbs;
var _c;
__turbopack_context__.k.register(_c, "Breadcrumbs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/customerAddressService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Customer Address Service
 * Manages customer addresses via WordPress REST API
 */ __turbopack_context__.s([
    "createCustomerAddress",
    ()=>createCustomerAddress,
    "deleteCustomerAddress",
    ()=>deleteCustomerAddress,
    "getCustomerAddresses",
    ()=>getCustomerAddresses,
    "updateCustomerAddress",
    ()=>updateCustomerAddress
]);
async function getCustomerAddresses(userId) {
    try {
        const url = userId ? `/api/customer-addresses?user_id=${userId}` : '/api/customer-addresses';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            return {
                addresses: [],
                total: 0
            };
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            addresses: [],
            total: 0
        };
    }
}
async function createCustomerAddress(address, userId) {
    try {
        const response = await fetch('/api/customer-addresses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userId ? {
                ...address,
                user_id: userId
            } : address),
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Failed to create address'
            };
        }
        return {
            success: true,
            address: data.address,
            message: data.message
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to create address'
        };
    }
}
async function updateCustomerAddress(addressId, address, userId) {
    try {
        const response = await fetch(`/api/customer-addresses/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userId ? {
                ...address,
                user_id: userId
            } : address),
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Failed to update address'
            };
        }
        return {
            success: true,
            address: data.address,
            message: data.message
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to update address'
        };
    }
}
async function deleteCustomerAddress(addressId, userId) {
    try {
        const url = userId ? `/api/customer-addresses/${addressId}?user_id=${userId}` : `/api/customer-addresses/${addressId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Failed to delete address'
            };
        }
        return {
            success: true,
            message: data.message
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to delete address'
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/crmService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addCRMNote",
    ()=>addCRMNote,
    "getCRMProfile",
    ()=>getCRMProfile,
    "getCRMStats",
    ()=>getCRMStats,
    "getInteraction",
    ()=>getInteraction,
    "getInteractionTypeLabel",
    ()=>getInteractionTypeLabel,
    "getInteractions",
    ()=>getInteractions,
    "getInteractionsSummary",
    ()=>getInteractionsSummary,
    "getPriorityLabel",
    ()=>getPriorityLabel,
    "getStatusLabel",
    ()=>getStatusLabel,
    "getTask",
    ()=>getTask,
    "getTasks",
    ()=>getTasks,
    "getTasksSummary",
    ()=>getTasksSummary,
    "updateCRMProfile",
    ()=>updateCRMProfile
]);
async function getCRMProfile(userId) {
    try {
        let url = '/api/customer-crm/profile';
        if (userId) {
            url += `?user_id=${userId}`;
        }
        const response = await fetch(url, {
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                success: false,
                error: errorData.error || 'Failed to fetch profile'
            };
        }
        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch profile'
        };
    }
}
async function getCRMStats(userId) {
    try {
        let url = '/api/customer-crm/profile';
        if (userId) {
            url += `?user_id=${userId}`;
        }
        const response = await fetch(url, {
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                success: false,
                error: errorData.error || 'Failed to fetch stats'
            };
        }
        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch stats'
        };
    }
}
async function updateCRMProfile(updates, userId) {
    try {
        const response = await fetch('/api/customer-crm/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...updates,
                user_id: userId
            }),
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                success: false,
                error: errorData.error || 'Failed to update profile'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to update profile'
        };
    }
}
async function getInteractions(userId, perPage = 20, page = 1, type) {
    try {
        let url = `/api/customer-crm/interactions?per_page=${perPage}&page=${page}`;
        if (userId) {
            url += `&user_id=${userId}`;
        }
        if (type) {
            url += `&type=${encodeURIComponent(type)}`;
        }
        const response = await fetch(url, {
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                success: false,
                error: errorData.error || 'Failed to fetch interactions'
            };
        }
        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch interactions'
        };
    }
}
async function addCRMNote(message, userId) {
    try {
        const response = await fetch('/api/customer-crm/interactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                interaction_type: 'note',
                message,
                user_id: userId
            }),
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                success: false,
                error: errorData.error || 'Failed to add note'
            };
        }
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to add note'
        };
    }
}
async function getInteraction(id, userId) {
    try {
        // Note: This endpoint might not be implemented in WordPress yet
        // Returning placeholder
        return {
            success: false,
            error: 'Not implemented'
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch interaction'
        };
    }
}
async function getInteractionsSummary(userId) {
    try {
        const result = await getInteractions(userId, 1000, 1);
        if (!result.success || !result.data) {
            return {
                success: false,
                error: result.error || 'Failed to fetch interactions summary'
            };
        }
        const interactions = result.data.interactions || [];
        const summary = {
            total: interactions.length,
            byType: {
                call: interactions.filter((i)=>i.interactionType === 'call').length,
                email: interactions.filter((i)=>i.interactionType === 'email').length,
                line: interactions.filter((i)=>i.interactionType === 'line').length,
                visit: interactions.filter((i)=>i.interactionType === 'visit').length,
                note: interactions.filter((i)=>i.interactionType === 'note').length
            },
            recent: interactions.slice(0, 5)
        };
        return {
            success: true,
            data: summary
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch interactions summary'
        };
    }
}
async function getTasks(userId, perPage = 20, page = 1, status) {
    try {
        let url = `/api/customer-crm/tasks?per_page=${perPage}&page=${page}`;
        if (userId) {
            url += `&user_id=${userId}`;
        }
        if (status) {
            url += `&status=${encodeURIComponent(status)}`;
        }
        const response = await fetch(url, {
            cache: 'no-store'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            return {
                success: false,
                error: errorData.error || 'Failed to fetch tasks'
            };
        }
        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch tasks'
        };
    }
}
async function getTask(id, userId) {
    try {
        // Note: This endpoint might not be implemented in WordPress yet
        // Returning placeholder
        return {
            success: false,
            error: 'Not implemented'
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch task'
        };
    }
}
async function getTasksSummary(userId) {
    try {
        const result = await getTasks(userId, 1000, 1);
        if (!result.success || !result.data) {
            return {
                success: false,
                error: result.error || 'Failed to fetch tasks summary'
            };
        }
        const tasks = result.data.tasks || [];
        const summary = {
            total: tasks.length,
            pending: tasks.filter((t)=>t.status === 'pending').length,
            inProgress: tasks.filter((t)=>t.status === 'in_progress').length,
            completed: tasks.filter((t)=>t.status === 'completed').length,
            overdue: tasks.filter((t)=>{
                if (!t.dueDate) return false;
                return new Date(t.dueDate) < new Date() && t.status !== 'completed';
            }).length,
            byPriority: {
                low: tasks.filter((t)=>t.priority === 'low').length,
                medium: tasks.filter((t)=>t.priority === 'medium').length,
                high: tasks.filter((t)=>t.priority === 'high').length
            },
            upcoming: tasks.filter((t)=>t.status !== 'completed' && t.dueDate).sort((a, b)=>new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 5)
        };
        return {
            success: true,
            data: summary
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch tasks summary'
        };
    }
}
function getInteractionTypeLabel(type, locale = 'th') {
    const labels = {
        call: {
            th: 'โทร',
            en: 'Call'
        },
        email: {
            th: 'อีเมล',
            en: 'Email'
        },
        line: {
            th: 'LINE',
            en: 'LINE'
        },
        visit: {
            th: 'เยี่ยม',
            en: 'Visit'
        },
        note: {
            th: 'โน้ต',
            en: 'Note'
        }
    };
    return labels[type]?.[locale === 'en' ? 'en' : 'th'] || type;
}
function getPriorityLabel(priority, locale = 'th') {
    const labels = {
        low: {
            th: 'ต่ำ',
            en: 'Low'
        },
        medium: {
            th: 'ปานกลาง',
            en: 'Medium'
        },
        high: {
            th: 'สูง',
            en: 'High'
        }
    };
    return labels[priority]?.[locale === 'en' ? 'en' : 'th'] || priority;
}
function getStatusLabel(status, locale = 'th') {
    const labels = {
        pending: {
            th: 'รอดำเนินการ',
            en: 'Pending'
        },
        in_progress: {
            th: 'กำลังดำเนินการ',
            en: 'In Progress'
        },
        completed: {
            th: 'เสร็จสิ้น',
            en: 'Completed'
        },
        overdue: {
            th: 'เกินกำหนด',
            en: 'Overdue'
        }
    };
    return labels[status]?.[locale === 'en' ? 'en' : 'th'] || status;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountDashboard",
    ()=>AccountDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$customerAddressService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/customerAddressService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$crmService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/crmService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function AccountDashboard({ lang, dictionary }) {
    _s();
    const { account, common, auth, crm } = dictionary;
    const { user, isLoading, logout, changePassword, refreshUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { getCartCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    // Password form state
    const [passwordData, setPasswordData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [passwordSuccess, setPasswordSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmittingPassword, setIsSubmittingPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasRefreshed, setHasRefreshed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Address form state
    const [showAddressForm, setShowAddressForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingAddress, setEditingAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [addresses, setAddresses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [addressForm, setAddressForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        first_name: '',
        last_name: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'TH',
        phone: ''
    });
    const [addressLoading, setAddressLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addressError, setAddressError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [addressSuccess, setAddressSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmittingAddress, setIsSubmittingAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // CRM state
    const [crmProfile, setCrmProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [crmLoading, setCrmLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load addresses
    const loadAddresses = async ()=>{
        setAddressLoading(true);
        setAddressError('');
        console.log('[AccountDashboard] Loading addresses for user:', user?.id, user);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$customerAddressService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCustomerAddresses"])(user?.id);
        console.log('[AccountDashboard] Addresses result:', result);
        if (result.addresses) {
            setAddresses(result.addresses);
        } else {
            setAddressError('Failed to load addresses');
        }
        setAddressLoading(false);
    };
    // Load CRM data
    const loadCRMData = async ()=>{
        if (!user?.id) return;
        setCrmLoading(true);
        const profileResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$crmService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCRMProfile"])(user.id);
        if (profileResult.success && profileResult.data) {
            setCrmProfile(profileResult.data);
        }
        setCrmLoading(false);
    };
    // Refresh user data once when loaded to get fresh data with firstName/lastName
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountDashboard.useEffect": ()=>{
            if (!isLoading && user && !hasRefreshed && refreshUser) {
                refreshUser();
                setHasRefreshed(true);
            }
        }
    }["AccountDashboard.useEffect"], [
        isLoading,
        user,
        refreshUser,
        hasRefreshed
    ]);
    // Load addresses when switching to addresses tab
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountDashboard.useEffect": ()=>{
            if (activeTab === 'addresses' && !addressLoading && user?.id) {
                console.log('[AccountDashboard] Switching to addresses tab, user ID:', user.id);
                loadAddresses();
            }
        }
    }["AccountDashboard.useEffect"], [
        activeTab,
        user?.id
    ]);
    // Load CRM data when switching to Details tab
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountDashboard.useEffect": ()=>{
            if (activeTab === 'details' && !crmLoading && user?.id) {
                loadCRMData();
            }
        }
    }["AccountDashboard.useEffect"], [
        activeTab,
        user?.id
    ]);
    // Mock orders - replace with actual orders from your backend
    const orders = [];
    // Handle password change
    const handlePasswordChange = async (e)=>{
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        // Validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError(account.password_mismatch || 'Passwords do not match');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setPasswordError(account.password_too_short || 'Password must be at least 8 characters');
            return;
        }
        setIsSubmittingPassword(true);
        const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
        setIsSubmittingPassword(false);
        if (result.success) {
            setPasswordSuccess(account.password_success || 'Password changed successfully');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            // Clear success message after 3 seconds
            setTimeout(()=>setPasswordSuccess(''), 3000);
        } else {
            setPasswordError(result.error || 'Failed to change password');
        }
    };
    // Handle add new address
    const handleAddAddress = ()=>{
        setEditingAddress(null);
        setAddressForm({
            first_name: user?.firstName || '',
            last_name: user?.lastName || '',
            company: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: 'TH',
            phone: ''
        });
        setShowAddressForm(true);
    };
    // Handle edit address
    const handleEditAddress = (address)=>{
        setEditingAddress(address);
        setAddressForm(address);
        setShowAddressForm(true);
    };
    // Handle save address
    const handleSaveAddress = async (e)=>{
        e.preventDefault();
        setAddressError('');
        setAddressSuccess('');
        setIsSubmittingAddress(true);
        console.log('[AccountDashboard] Saving address. User ID:', user?.id, 'User:', user);
        console.log('[AccountDashboard] Address form:', addressForm);
        try {
            let result;
            if (editingAddress) {
                // Update existing address
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$customerAddressService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCustomerAddress"])(editingAddress.id, addressForm, user?.id);
            } else {
                // Create new address
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$customerAddressService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCustomerAddress"])(addressForm, user?.id);
            }
            console.log('[AccountDashboard] Save result:', result);
            if (result.success) {
                setAddressSuccess(editingAddress ? 'Address updated successfully' : 'Address added successfully');
                setShowAddressForm(false);
                setEditingAddress(null);
                setAddressForm({
                    first_name: '',
                    last_name: '',
                    company: '',
                    address_1: '',
                    address_2: '',
                    city: '',
                    state: '',
                    postcode: '',
                    country: 'TH',
                    phone: ''
                });
                // Reload addresses
                await loadAddresses();
                // Clear success message after 3 seconds
                setTimeout(()=>setAddressSuccess(''), 3000);
            } else {
                setAddressError(result.error || 'Failed to save address');
            }
        } catch (err) {
            setAddressError('Failed to save address');
        } finally{
            setIsSubmittingAddress(false);
        }
    };
    // Handle cancel address form
    const handleCancelAddress = ()=>{
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressForm({
            first_name: '',
            last_name: '',
            company: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: 'TH',
            phone: ''
        });
    };
    // Handle delete address
    const handleDeleteAddress = async (addressId)=>{
        if (!confirm('Are you sure you want to delete this address?')) {
            return;
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$customerAddressService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCustomerAddress"])(addressId, user?.id);
        if (result.success) {
            setAddressSuccess('Address deleted successfully');
            await loadAddresses();
            setTimeout(()=>setAddressSuccess(''), 3000);
        } else {
            setAddressError(result.error || 'Failed to delete address');
        }
    };
    // Redirect if not authenticated
    if (!isLoading && !user) {
        router.push(`/${lang}/login`);
        return null;
    }
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-600",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                lineNumber: 291,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
            lineNumber: 290,
            columnNumber: 7
        }, this);
    }
    const breadcrumbItems = [
        {
            name: common.home,
            href: `/${lang}`
        },
        {
            name: account.my_account,
            href: `/${lang}/account`
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"], {
                items: breadcrumbItems,
                lang: lang
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gray-50 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-gray-900",
                                    children: [
                                        account.welcome,
                                        ", ",
                                        user?.firstName || user?.displayName,
                                        "!"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-gray-600",
                                    children: account.overview
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                            lineNumber: 307,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-4 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-lg shadow-md p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setActiveTab('overview'),
                                                    className: `w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                                                    children: account.overview
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setActiveTab('orders'),
                                                    className: `w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                                                    children: account.my_orders
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setActiveTab('details'),
                                                    className: `w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'details' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                                                    children: account.account_details
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setActiveTab('addresses'),
                                                    className: `w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'addresses' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`,
                                                    children: account.addresses
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                                    className: "my-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>logout(),
                                                    className: "w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors",
                                                    children: auth.logout
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-lg shadow-md p-6",
                                        children: [
                                            activeTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-bold text-gray-900 mb-6",
                                                        children: account.overview
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-blue-50 rounded-lg p-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-3xl font-bold text-blue-600",
                                                                        children: orders.length
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 381,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-600 mt-1",
                                                                        children: account.my_orders
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 382,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-green-50 rounded-lg p-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-3xl font-bold text-green-600",
                                                                        children: getCartCount()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 385,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-600 mt-1",
                                                                        children: common.products
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-purple-50 rounded-lg p-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-3xl font-bold text-purple-600",
                                                                        children: "0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 389,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-600 mt-1",
                                                                        children: account.addresses
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 390,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-4",
                                                        children: account.personal_info
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-gray-500",
                                                                        children: [
                                                                            auth.first_name,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-2 text-gray-900",
                                                                        children: user?.firstName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 398,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-gray-500",
                                                                        children: [
                                                                            auth.last_name,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-2 text-gray-900",
                                                                        children: user?.lastName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 402,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-gray-500",
                                                                        children: [
                                                                            auth.email,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 405,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-2 text-gray-900",
                                                                        children: user?.email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 406,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                lineNumber: 376,
                                                columnNumber: 19
                                            }, this),
                                            activeTab === 'orders' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-bold text-gray-900 mb-6",
                                                        children: account.my_orders
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 414,
                                                        columnNumber: 21
                                                    }, this),
                                                    orders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center py-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "mx-auto h-12 w-12 text-gray-400",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                    lineNumber: 418,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "mt-2 text-sm font-medium text-gray-900",
                                                                children: account.no_orders
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 420,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-sm text-gray-500",
                                                                children: account.no_orders_desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-6",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: `/${lang}/shop`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "primary",
                                                                        size: "md",
                                                                        children: account.start_shopping
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 424,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                    lineNumber: 423,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 422,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4",
                                                        children: orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "border rounded-lg p-4"
                                                            }, order.id, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 433,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                lineNumber: 413,
                                                columnNumber: 19
                                            }, this),
                                            activeTab === 'details' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-bold text-gray-900 mb-6",
                                                        children: account.account_details
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                        className: "space-y-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                children: auth.first_name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 448,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                defaultValue: user?.firstName,
                                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 451,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 447,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                children: auth.last_name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 458,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                defaultValue: user?.lastName,
                                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 461,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 457,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 446,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: auth.email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 469,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "email",
                                                                        defaultValue: user?.email,
                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 472,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 468,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "primary",
                                                                        size: "md",
                                                                        children: account.save
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 479,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "secondary",
                                                                        size: "md",
                                                                        children: account.cancel
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                                        className: "my-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-4",
                                                        children: account.change_password
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                        onSubmit: handlePasswordChange,
                                                        className: "space-y-4",
                                                        children: [
                                                            passwordError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded",
                                                                children: passwordError
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 25
                                                            }, this),
                                                            passwordSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded",
                                                                children: passwordSuccess
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: account.current_password
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 504,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "password",
                                                                        value: passwordData.currentPassword,
                                                                        onChange: (e)=>setPasswordData({
                                                                                ...passwordData,
                                                                                currentPassword: e.target.value
                                                                            }),
                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                        required: true
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 507,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 503,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: account.new_password
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 516,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "password",
                                                                        value: passwordData.newPassword,
                                                                        onChange: (e)=>setPasswordData({
                                                                                ...passwordData,
                                                                                newPassword: e.target.value
                                                                            }),
                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                        required: true,
                                                                        minLength: 8
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 519,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-500 mt-1",
                                                                        children: "Minimum 8 characters"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 527,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 515,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: account.confirm_password || 'Confirm New Password'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 530,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "password",
                                                                        value: passwordData.confirmPassword,
                                                                        onChange: (e)=>setPasswordData({
                                                                                ...passwordData,
                                                                                confirmPassword: e.target.value
                                                                            }),
                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                        required: true,
                                                                        minLength: 8
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 533,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "primary",
                                                                size: "md",
                                                                type: "submit",
                                                                disabled: isSubmittingPassword,
                                                                children: isSubmittingPassword ? account.changing || 'Changing...' : account.save || 'Save'
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, this),
                                            activeTab === 'addresses' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-bold text-gray-900",
                                                                children: account.addresses
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 557,
                                                                columnNumber: 23
                                                            }, this),
                                                            !showAddressForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "primary",
                                                                size: "sm",
                                                                onClick: handleAddAddress,
                                                                children: account.add_address || 'Add Address'
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 559,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 21
                                                    }, this),
                                                    addressSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded",
                                                        children: addressSuccess
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 23
                                                    }, this),
                                                    addressError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded",
                                                        children: addressError
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 576,
                                                        columnNumber: 23
                                                    }, this),
                                                    showAddressForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold text-gray-900 mb-4",
                                                                children: editingAddress ? account.edit_address || 'Edit Address' : account.add_address || 'Add Address'
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 584,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                                onSubmit: handleSaveAddress,
                                                                className: "space-y-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                        children: [
                                                                                            auth.first_name,
                                                                                            " *"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 590,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        value: addressForm.first_name,
                                                                                        onChange: (e)=>setAddressForm({
                                                                                                ...addressForm,
                                                                                                first_name: e.target.value
                                                                                            }),
                                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                                        required: true
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 593,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 589,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                        children: [
                                                                                            auth.last_name,
                                                                                            " *"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 602,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        value: addressForm.last_name,
                                                                                        onChange: (e)=>setAddressForm({
                                                                                                ...addressForm,
                                                                                                last_name: e.target.value
                                                                                            }),
                                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                                        required: true
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 605,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 601,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 588,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                children: account.company || 'Company'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 615,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: addressForm.company,
                                                                                onChange: (e)=>setAddressForm({
                                                                                        ...addressForm,
                                                                                        company: e.target.value
                                                                                    }),
                                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 618,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 614,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                children: [
                                                                                    account.address_1 || 'Address',
                                                                                    " *"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 626,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: addressForm.address_1,
                                                                                onChange: (e)=>setAddressForm({
                                                                                        ...addressForm,
                                                                                        address_1: e.target.value
                                                                                    }),
                                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                                required: true
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 629,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 625,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                children: account.address_2 || 'Apartment, suite, etc.'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 638,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: addressForm.address_2,
                                                                                onChange: (e)=>setAddressForm({
                                                                                        ...addressForm,
                                                                                        address_2: e.target.value
                                                                                    }),
                                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 641,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 637,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                        children: [
                                                                                            account.city || 'City',
                                                                                            " *"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 650,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        value: addressForm.city,
                                                                                        onChange: (e)=>setAddressForm({
                                                                                                ...addressForm,
                                                                                                city: e.target.value
                                                                                            }),
                                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                                        required: true
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 653,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 649,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                        children: [
                                                                                            account.state || 'Province',
                                                                                            " *"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 662,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        value: addressForm.state,
                                                                                        onChange: (e)=>setAddressForm({
                                                                                                ...addressForm,
                                                                                                state: e.target.value
                                                                                            }),
                                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                                        required: true
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 665,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 661,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                        children: [
                                                                                            account.postcode || 'Postcode',
                                                                                            " *"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 674,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "text",
                                                                                        value: addressForm.postcode,
                                                                                        onChange: (e)=>setAddressForm({
                                                                                                ...addressForm,
                                                                                                postcode: e.target.value
                                                                                            }),
                                                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                                                                        required: true
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 677,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 673,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 648,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                                children: account.phone || 'Phone'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 687,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "tel",
                                                                                value: addressForm.phone,
                                                                                onChange: (e)=>setAddressForm({
                                                                                        ...addressForm,
                                                                                        phone: e.target.value
                                                                                    }),
                                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 690,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 686,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                variant: "primary",
                                                                                size: "md",
                                                                                type: "submit",
                                                                                disabled: isSubmittingAddress,
                                                                                children: isSubmittingAddress ? account.saving || 'Saving...' : account.save || 'Save'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 698,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                variant: "secondary",
                                                                                size: "md",
                                                                                type: "button",
                                                                                onClick: handleCancelAddress,
                                                                                disabled: isSubmittingAddress,
                                                                                children: account.cancel || 'Cancel'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 706,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 697,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 587,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 23
                                                    }, this),
                                                    addressLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center py-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-4 text-gray-600",
                                                                children: account.loading_addresses || 'Loading addresses...'
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 23
                                                    }, this) : addresses.length === 0 && !showAddressForm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center py-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "mx-auto h-12 w-12 text-gray-400",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 729,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 730,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 728,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "mt-2 text-sm font-medium text-gray-900",
                                                                children: "No addresses found"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 732,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-sm text-gray-500",
                                                                children: "Add your first address to get started"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 733,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                        children: addresses.map((address)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-between items-start mb-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "font-semibold text-gray-900",
                                                                                        children: [
                                                                                            address.first_name,
                                                                                            " ",
                                                                                            address.last_name
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 741,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    address.company && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm text-gray-600",
                                                                                        children: address.company
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 742,
                                                                                        columnNumber: 53
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 740,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleEditAddress(address),
                                                                                        className: "text-blue-600 hover:text-blue-700 text-sm font-medium",
                                                                                        children: account.edit || 'Edit'
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 745,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleDeleteAddress(address.id),
                                                                                        className: "text-red-600 hover:text-red-700 text-sm font-medium",
                                                                                        children: account.delete || 'Delete'
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                        lineNumber: 751,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 744,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 739,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-600 space-y-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: address.address_1
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 760,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            address.address_2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: address.address_2
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 761,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: [
                                                                                    address.city,
                                                                                    ", ",
                                                                                    address.state,
                                                                                    " ",
                                                                                    address.postcode
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 762,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            address.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                children: [
                                                                                    account.phone,
                                                                                    ": ",
                                                                                    address.phone
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                                lineNumber: 763,
                                                                                columnNumber: 49
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                        lineNumber: 759,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, address.id, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                        lineNumber: 736,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                                lineNumber: 555,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                                    lineNumber: 373,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                    lineNumber: 305,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/auth/AccountDashboard.tsx",
                lineNumber: 304,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AccountDashboard, "fqctokxfz1MKp8KqmOJVNo2gCW4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AccountDashboard;
var _c;
__turbopack_context__.k.register(_c, "AccountDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sakwood-wp_frontend_f6834a8b._.js.map