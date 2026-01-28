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
"[project]/sakwood-wp/frontend/lib/get-dictionary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDictionary",
    ()=>getDictionary
]);
;
// กำหนดว่าภาษาไหน ให้ไปโหลดไฟล์ไหน
const dictionaries = {
    en: ()=>__turbopack_context__.A("[project]/sakwood-wp/frontend/dictionaries/en.json (json, async loader)").then((module)=>module.default),
    th: ()=>__turbopack_context__.A("[project]/sakwood-wp/frontend/dictionaries/th.json (json, async loader)").then((module)=>module.default)
};
const getDictionary = async (locale)=>{
    const dictLoader = dictionaries[locale];
    if (!dictLoader) {
        throw new Error(`Dictionary for locale "${locale}" not found`);
    }
    return dictLoader();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/dealerService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDealerApplicationStatus",
    ()=>getDealerApplicationStatus,
    "getDealerInfo",
    ()=>getDealerInfo,
    "getDealerOrders",
    ()=>getDealerOrders,
    "getDealerTerritories",
    ()=>getDealerTerritories,
    "getDealerTiers",
    ()=>getDealerTiers,
    "isTerritoryAvailable",
    ()=>isTerritoryAvailable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Dealer Service
 * Handles dealer-related API calls
 */ const WORDPRESS_API_URL = ("TURBOPACK compile-time value", "http://localhost:8006/wp-json/sakwood/v1") || 'http://localhost:8006/wp-json/sakwood/v1';
async function getDealerTiers() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/dealer/tiers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Failed to fetch dealer tiers'
            };
        }
        // Parse JSON strings for benefits and requirements
        const tiers = data.map((tier)=>({
                ...tier,
                benefits: typeof tier.benefits === 'string' ? JSON.parse(tier.benefits) : tier.benefits,
                requirements: typeof tier.requirements === 'string' ? JSON.parse(tier.requirements) : tier.requirements
            }));
        return {
            success: true,
            data: tiers
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch dealer tiers'
        };
    }
}
async function getDealerInfo(userId) {
    try {
        const url = userId ? `/api/dealer/info?user_id=${userId}` : '/api/dealer/info';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Failed to fetch dealer info'
            };
        }
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch dealer info'
        };
    }
}
async function getDealerApplicationStatus(applicationId) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/dealer/status/${applicationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Application not found'
            };
        }
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch application status'
        };
    }
}
async function getDealerTerritories(userId) {
    try {
        const url = userId ? `/api/dealer/territories?user_id=${userId}` : '/api/dealer/territories';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Failed to fetch territories'
            };
        }
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch territories'
        };
    }
}
async function getDealerOrders(userId, limit = 20) {
    try {
        const url = userId ? `/api/dealer/orders?user_id=${userId}&limit=${limit}` : `/api/dealer/orders?limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Failed to fetch orders'
            };
        }
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch orders'
        };
    }
}
async function isTerritoryAvailable(province, excludeDealerId) {
    try {
        const params = new URLSearchParams({
            province
        });
        if (excludeDealerId) params.append('exclude_dealer_id', excludeDealerId.toString());
        const response = await fetch(`${WORDPRESS_API_URL}/dealer/check-territory?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'Failed to check territory'
            };
        }
        return {
            success: true,
            available: data.available
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to check territory'
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/dealerApplicationService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Dealer Application Service
 * Handles dealer application submissions
 */ __turbopack_context__.s([
    "checkTierEligibility",
    ()=>checkTierEligibility,
    "formatBusinessReferences",
    ()=>formatBusinessReferences,
    "formatTradeReferences",
    ()=>formatTradeReferences,
    "getThaiProvinces",
    ()=>getThaiProvinces,
    "getTierDiscount",
    ()=>getTierDiscount,
    "submitDealerApplication",
    ()=>submitDealerApplication,
    "validateDealerApplication",
    ()=>validateDealerApplication
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const WORDPRESS_API_URL = ("TURBOPACK compile-time value", "http://localhost:8006/wp-json/sakwood/v1") || 'http://localhost:8006/wp-json/sakwood/v1';
async function submitDealerApplication(applicationData, token) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${WORDPRESS_API_URL}/dealer/apply`, {
            method: 'POST',
            headers,
            body: JSON.stringify(applicationData),
            cache: 'no-store'
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: data.message || data.error || 'Failed to submit application'
            };
        }
        return {
            success: true,
            applicationId: data.applicationId
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to submit application'
        };
    }
}
function validateDealerApplication(data) {
    const errors = [];
    // Required fields
    if (!data.requestedTier) {
        errors.push('Tier selection is required');
    }
    if (!data.storageFacility || data.storageFacility.trim().length < 20) {
        errors.push('Storage facility details must be at least 20 characters');
    }
    if (!data.deliveryVehicles || data.deliveryVehicles.trim().length < 20) {
        errors.push('Delivery vehicles description must be at least 20 characters');
    }
    if (!data.salesCapacity) {
        errors.push('Sales capacity estimate is required');
    }
    if (!data.dealerExperience || data.dealerExperience.trim().length < 30) {
        errors.push('Dealer experience must be at least 30 characters');
    }
    if (!data.requestedTerritories || data.requestedTerritories.length === 0) {
        errors.push('At least one territory must be requested');
    }
    // Tier-specific validations
    if (data.requestedTier === 2 || data.requestedTier === 3) {
        if (!data.tradeReferences || data.tradeReferences.length < 2) {
            errors.push('At least 2 trade references required for Gold/Platinum tier');
        }
    }
    if (data.requestedTier === 3) {
        if (!data.businessReferences || data.businessReferences.length < 3) {
            errors.push('At least 3 business references required for Platinum tier');
        }
        // Check sales capacity for Platinum
        const capacityValue = parseInt(data.salesCapacity);
        if (capacityValue < 500000) {
            errors.push('Monthly sales capacity must be at least 500,000 THB for Platinum tier');
        }
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
function formatTradeReferences(references) {
    return JSON.stringify(references);
}
function formatBusinessReferences(references) {
    return JSON.stringify(references);
}
async function checkTierEligibility(wholesaleStatus, wholesaleOrderCount, wholesaleTotalSpent) {
    // This would typically come from an API endpoint, but for now we'll calculate client-side
    const tiers = [
        {
            tierId: 1,
            tierName: 'Silver',
            minOrderAmount: 50000,
            minOrderQuantity: 50,
            requirements: [
                'Active wholesale customer',
                'Minimum 1 year in business',
                'Storage facility proof',
                '2 trade references'
            ],
            canApply: wholesaleStatus === 'active',
            reason: wholesaleStatus !== 'active' ? 'Must be an active wholesale customer' : undefined
        },
        {
            tierId: 2,
            tierName: 'Gold',
            minOrderAmount: 100000,
            minOrderQuantity: 100,
            requirements: [
                'Active wholesale customer for 6+ months',
                'Minimum 2 years in business',
                'Storage facility >100 sqm',
                '5+ trade references',
                'Monthly sales capacity 100k+ THB'
            ],
            canApply: wholesaleStatus === 'active' && wholesaleOrderCount >= 5,
            reason: wholesaleOrderCount < 5 ? 'Must have at least 5 wholesale orders' : undefined
        },
        {
            tierId: 3,
            tierName: 'Platinum',
            minOrderAmount: 200000,
            minOrderQuantity: 200,
            requirements: [
                'Active wholesale customer for 12+ months',
                'Minimum 3 years in business',
                'Large storage facility >200 sqm',
                '10+ trade references',
                'Monthly sales capacity 500k+ THB',
                'Delivery fleet documentation'
            ],
            canApply: wholesaleStatus === 'active' && wholesaleOrderCount >= 10 && wholesaleTotalSpent >= 500000,
            reason: wholesaleOrderCount < 10 ? 'Must have at least 10 wholesale orders' : wholesaleTotalSpent < 500000 ? 'Must have spent at least 500,000 THB on wholesale orders' : undefined
        }
    ];
    return tiers;
}
function getTierDiscount(tierId) {
    const discounts = {
        1: 20,
        2: 25,
        3: 30
    };
    return discounts[tierId] || 0;
}
function getThaiProvinces() {
    return [
        'Bangkok',
        'Pathumtani',
        'Nonthaburi',
        'Samut Prakan',
        'Nakhon Pathom',
        'Samut Sakhon',
        'Phra Nakhon Si Ayutthaya',
        'Ang Thong',
        'Lopburi',
        'Saraburi',
        'Sing Buri',
        'Chai Nat',
        'Suphan Buri',
        'Kanchanaburi',
        'Ratchaburi',
        'Phetchaburi',
        'Prachuap Khiri Khan',
        'Chonburi',
        'Rayong',
        'Chanthaburi',
        'Trat',
        'Chachoengsao',
        'Prachinburi',
        'Sa Kaeo',
        'Nakhon Nayok',
        'Kamphaeng Phet',
        'Tak',
        'Uthai Thani',
        'Nakhon Sawan',
        'Phichit',
        'Phitsanulok',
        'Phichai',
        'Phetchabun',
        'Chiang Mai',
        'Lamphun',
        'Lampang',
        'Uttaradit',
        'Phrae',
        'Nan',
        'Phayao',
        'Chiang Rai',
        'Mae Hong Son',
        'Nakhon Ratchasima',
        'Buri Ram',
        'Surin',
        'Sisaket',
        'Ubon Ratchathani',
        'Yasothon',
        'Chaiyaphum',
        'Amnat Charoen',
        'Nong Bua Lamphu',
        'Khon Kaen',
        'Udon Thani',
        'Loei',
        'Nong Khai',
        'Maha Sarakham',
        'Roi Et',
        'Kalasin',
        'Sakon Nakhon',
        'Nakhon Phanom',
        'Mukdahan',
        'Chumphon',
        'Ranong',
        'Surat Thani',
        'Phangnga',
        'Phuket',
        'Krabi',
        'Phatthalung',
        'Trang',
        'Satun',
        'Songkhla',
        'Yala',
        'Narathiwat',
        'Pattani',
        'Nakhon Si Thammarat'
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DealerApplyForm",
    ()=>DealerApplyForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/layout/Breadcrumbs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$get$2d$dictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/get-dictionary.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$dealerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/dealerService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$dealerApplicationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/dealerApplicationService.ts [app-client] (ecmascript)");
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
function DealerApplyForm({ lang }) {
    _s();
    const { user, token, isWholesale, isDealer, applyForDealer } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [dictionary, setDictionary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tiers, setTiers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [provinces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$dealerApplicationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getThaiProvinces"])());
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        requestedTier: '',
        storageFacility: '',
        deliveryVehicles: '',
        salesCapacity: '',
        dealerExperience: '',
        requestedTerritories: [],
        tradeReferences: [],
        businessReferences: []
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DealerApplyForm.useEffect": ()=>{
            setMounted(true);
            async function loadData() {
                const dict = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$get$2d$dictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDictionary"])(lang);
                setDictionary(dict);
                const tiersResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$dealerService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDealerTiers"])();
                if (tiersResult.success && tiersResult.data) {
                    setTiers(tiersResult.data);
                }
            }
            loadData();
        }
    }["DealerApplyForm.useEffect"], [
        lang
    ]);
    // Redirect if not authenticated or not wholesale
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DealerApplyForm.useEffect": ()=>{
            if (mounted && dictionary) {
                if (!user || !isWholesale) {
                    router.push(`/${lang}/login`);
                    return;
                }
                // Redirect if already a dealer
                if (isDealer) {
                    router.push(`/${lang}/dealer/status`);
                    return;
                }
            }
        }
    }["DealerApplyForm.useEffect"], [
        mounted,
        dictionary,
        user,
        isWholesale,
        isDealer,
        lang,
        router
    ]);
    // Handle redirect after successful submission
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DealerApplyForm.useEffect": ()=>{
            if (success) {
                const timer = setTimeout({
                    "DealerApplyForm.useEffect.timer": ()=>{
                        router.push(`/${lang}/dealer/status`);
                    }
                }["DealerApplyForm.useEffect.timer"], 2000);
                return ({
                    "DealerApplyForm.useEffect": ()=>clearTimeout(timer)
                })["DealerApplyForm.useEffect"];
            }
        }
    }["DealerApplyForm.useEffect"], [
        success,
        lang,
        router
    ]);
    if (!mounted || !dictionary) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
            lineNumber: 84,
            columnNumber: 12
        }, this);
    }
    const { dealer, common } = dictionary;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        // Validation
        if (!formData.requestedTier) {
            setError(dealer.select_tier);
            return;
        }
        if (formData.requestedTerritories.length === 0) {
            setError('Please select at least one territory');
            return;
        }
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$dealerApplicationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateDealerApplication"])({
            requestedTier: parseInt(formData.requestedTier),
            storageFacility: formData.storageFacility,
            deliveryVehicles: formData.deliveryVehicles,
            salesCapacity: formData.salesCapacity,
            dealerExperience: formData.dealerExperience,
            requestedTerritories: formData.requestedTerritories,
            tradeReferences: formData.tradeReferences,
            businessReferences: formData.businessReferences
        });
        if (!validation.valid) {
            setError(validation.errors.join(', '));
            return;
        }
        setIsLoading(true);
        try {
            const result = await applyForDealer({
                requestedTier: parseInt(formData.requestedTier),
                storageFacility: formData.storageFacility,
                deliveryVehicles: formData.deliveryVehicles,
                salesCapacity: formData.salesCapacity,
                dealerExperience: formData.dealerExperience,
                requestedTerritories: formData.requestedTerritories,
                tradeReferences: formData.tradeReferences,
                businessReferences: formData.businessReferences
            });
            if (result.success) {
                // Save application data to localStorage for status page
                const applicationData = {
                    status: 'pending',
                    applicationId: result.applicationId || `DLR-${Date.now()}`,
                    submittedDate: new Date().toISOString(),
                    businessName: user.businessName || user.displayName
                };
                try {
                    localStorage.setItem('dealer_application', JSON.stringify(applicationData));
                } catch (error) {
                    console.error('Failed to save application data:', error);
                // Continue anyway - this isn't critical
                }
                setSuccess(true);
            // Redirect to status page after 2 seconds
            } else {
                setError(result.error || dealer.error_application_pending);
                setIsLoading(false);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };
    const addTradeReference = ()=>{
        setFormData({
            ...formData,
            tradeReferences: [
                ...formData.tradeReferences,
                {
                    company: '',
                    contact: '',
                    relationship: ''
                }
            ]
        });
    };
    const removeTradeReference = (index)=>{
        setFormData({
            ...formData,
            tradeReferences: formData.tradeReferences.filter((_, i)=>i !== index)
        });
    };
    const updateTradeReference = (index, field, value)=>{
        const updated = [
            ...formData.tradeReferences
        ];
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        setFormData({
            ...formData,
            tradeReferences: updated
        });
    };
    const addBusinessReference = ()=>{
        setFormData({
            ...formData,
            businessReferences: [
                ...formData.businessReferences,
                {
                    company: '',
                    contact: '',
                    accountValue: ''
                }
            ]
        });
    };
    const removeBusinessReference = (index)=>{
        setFormData({
            ...formData,
            businessReferences: formData.businessReferences.filter((_, i)=>i !== index)
        });
    };
    const updateBusinessReference = (index, field, value)=>{
        const updated = [
            ...formData.businessReferences
        ];
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        setFormData({
            ...formData,
            businessReferences: updated
        });
    };
    const breadcrumbItems = [
        {
            name: common.home,
            href: `/${lang}`
        },
        {
            name: dealer.page_title,
            href: `/${lang}/dealer/apply`
        }
    ];
    if (success) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"], {
                    items: breadcrumbItems,
                    lang: lang
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-md p-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-8 h-8",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M5 13l4 4L19 7"
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 215,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 213,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-gray-900 mb-4",
                                    children: dealer.success_title
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-6",
                                    children: dealer.success_message
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "Redirecting to status page..."
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$layout$2f$Breadcrumbs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"], {
                items: breadcrumbItems,
                lang: lang
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-gray-900 mb-2",
                                    children: dealer.application_title
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: dealer.application_subtitle
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6",
                            role: "alert",
                            "aria-live": "assertive",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "bg-white rounded-lg shadow-md p-8 space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold text-gray-900 mb-4 pb-2 border-b",
                                            children: dealer.tier_selection
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 262,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: tiers.map((tier)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: `block p-4 border rounded-lg cursor-pointer transition-all ${formData.requestedTier === tier.id.toString() ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: "tier",
                                                                value: tier.id,
                                                                checked: formData.requestedTier === tier.id.toString(),
                                                                onChange: (e)=>setFormData({
                                                                        ...formData,
                                                                        requestedTier: e.target.value
                                                                    }),
                                                                className: "mt-1 mr-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold text-gray-900 mb-1",
                                                                        children: [
                                                                            tier.tier_name === 'silver' && dealer.tier_silver,
                                                                            tier.tier_name === 'gold' && dealer.tier_gold,
                                                                            tier.tier_name === 'platinum' && dealer.tier_platinum
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 286,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-600 mb-2",
                                                                        children: [
                                                                            tier.tier_name === 'silver' && dealer.tier_silver_desc,
                                                                            tier.tier_name === 'gold' && dealer.tier_gold_desc,
                                                                            tier.tier_name === 'platinum' && dealer.tier_platinum_desc
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 291,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: [
                                                                            dealer.requirements_list,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 296,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                        className: "text-xs text-gray-600 mt-1 space-y-1",
                                                                        children: (()=>{
                                                                            try {
                                                                                const reqs = JSON.parse(tier.requirements || '[]');
                                                                                return reqs.map((req, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                        className: "flex items-start",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "mr-1",
                                                                                                children: "•"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                                                lineNumber: 305,
                                                                                                columnNumber: 35
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                children: req
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                                                lineNumber: 306,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, idx, true, {
                                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                                        lineNumber: 304,
                                                                                        columnNumber: 33
                                                                                    }, this));
                                                                            } catch (error) {
                                                                                console.error('Failed to parse requirements:', error);
                                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                    className: "text-red-600",
                                                                                    children: "Requirements unavailable"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                                    lineNumber: 311,
                                                                                    columnNumber: 38
                                                                                }, this);
                                                                            }
                                                                        })()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 299,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 21
                                                    }, this)
                                                }, tier.id, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold text-gray-900 mb-4 pb-2 border-b",
                                            children: dealer.dealer_requirements
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 324,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: [
                                                                dealer.storage_facility,
                                                                " *"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 331,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            required: true,
                                                            rows: 3,
                                                            value: formData.storageFacility,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    storageFacility: e.target.value
                                                                }),
                                                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400",
                                                            placeholder: dealer.storage_facility_placeholder
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: [
                                                                dealer.delivery_vehicles,
                                                                " *"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            required: true,
                                                            rows: 3,
                                                            value: formData.deliveryVehicles,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    deliveryVehicles: e.target.value
                                                                }),
                                                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400",
                                                            placeholder: dealer.delivery_vehicles_placeholder
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 349,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: [
                                                                dealer.sales_capacity,
                                                                " *"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            required: true,
                                                            value: formData.salesCapacity,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    salesCapacity: e.target.value
                                                                }),
                                                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: dealer.sales_capacity_placeholder
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "10k",
                                                                    children: dealer.capacity_10k
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 371,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "50k",
                                                                    children: dealer.capacity_50k
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 372,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "100k",
                                                                    children: dealer.capacity_100k
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 373,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "500k",
                                                                    children: dealer.capacity_500k
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 374,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "1m",
                                                                    children: dealer.capacity_1m
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: [
                                                                dealer.dealer_experience,
                                                                " *"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            required: true,
                                                            rows: 4,
                                                            value: formData.dealerExperience,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    dealerExperience: e.target.value
                                                                }),
                                                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400",
                                                            placeholder: dealer.dealer_experience_placeholder
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 328,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold text-gray-900 mb-4 pb-2 border-b",
                                            children: dealer.territory_request
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600 mb-2",
                                                    children: dealer.select_provinces
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border p-4 rounded",
                                                    children: provinces.map((province)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center space-x-2 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: formData.requestedTerritories.includes(province),
                                                                    onChange: (e)=>{
                                                                        if (e.target.checked) {
                                                                            setFormData({
                                                                                ...formData,
                                                                                requestedTerritories: [
                                                                                    ...formData.requestedTerritories,
                                                                                    province
                                                                                ]
                                                                            });
                                                                        } else {
                                                                            setFormData({
                                                                                ...formData,
                                                                                requestedTerritories: formData.requestedTerritories.filter((p)=>p !== province)
                                                                            });
                                                                        }
                                                                    },
                                                                    className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 410,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-900",
                                                                    children: province
                                                                }, void 0, false, {
                                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                    lineNumber: 428,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, province, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500",
                                                    children: [
                                                        "Selected: ",
                                                        formData.requestedTerritories.length,
                                                        " provinces"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 433,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 402,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this),
                                formData.requestedTier && parseInt(formData.requestedTier) >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-semibold text-gray-900 mb-4 pb-2 border-b",
                                            children: dealer.references
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 442,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700",
                                                            children: dealer.trade_references
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: addTradeReference,
                                                            className: "text-sm text-blue-600 hover:text-blue-800",
                                                            children: dealer.add_reference
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 448,
                                                    columnNumber: 19
                                                }, this),
                                                formData.tradeReferences.map((ref, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border p-4 rounded mb-2 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-gray-700",
                                                                        children: [
                                                                            dealer.references,
                                                                            " ",
                                                                            index + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 464,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>removeTradeReference(index),
                                                                        className: "text-red-600 hover:text-red-800 text-sm",
                                                                        children: dealer.remove_reference
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 467,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: ref.company,
                                                                onChange: (e)=>updateTradeReference(index, 'company', e.target.value),
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900",
                                                                placeholder: dealer.company
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: ref.contact,
                                                                onChange: (e)=>updateTradeReference(index, 'contact', e.target.value),
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900",
                                                                placeholder: dealer.contact
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: ref.relationship,
                                                                onChange: (e)=>updateTradeReference(index, 'relationship', e.target.value),
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900",
                                                                placeholder: dealer.relationship
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 490,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 447,
                                            columnNumber: 17
                                        }, this),
                                        formData.requestedTier === '3' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700",
                                                            children: dealer.business_references
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 505,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: addBusinessReference,
                                                            className: "text-sm text-blue-600 hover:text-blue-800",
                                                            children: dealer.add_reference
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                            lineNumber: 508,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 21
                                                }, this),
                                                formData.businessReferences.map((ref, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border p-4 rounded mb-2 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-gray-700",
                                                                        children: [
                                                                            dealer.references,
                                                                            " ",
                                                                            index + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>removeBusinessReference(index),
                                                                        className: "text-red-600 hover:text-red-800 text-sm",
                                                                        children: dealer.remove_reference
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                        lineNumber: 523,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 519,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: ref.company,
                                                                onChange: (e)=>updateBusinessReference(index, 'company', e.target.value),
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900",
                                                                placeholder: dealer.company
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 532,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: ref.contact,
                                                                onChange: (e)=>updateBusinessReference(index, 'contact', e.target.value),
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900",
                                                                placeholder: dealer.contact
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: ref.accountValue,
                                                                onChange: (e)=>updateBusinessReference(index, 'accountValue', e.target.value),
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900",
                                                                placeholder: dealer.account_value
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                                lineNumber: 546,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 503,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "primary",
                                            size: "lg",
                                            type: "submit",
                                            disabled: isLoading,
                                            className: "flex-1",
                                            children: isLoading ? dealer.submitting : dealer.submit_application
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 562,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${lang}/account`,
                                            className: "flex-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                size: "lg",
                                                type: "button",
                                                disabled: isLoading,
                                                className: "w-full",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                                lineNumber: 572,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                            lineNumber: 571,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                                    lineNumber: 561,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                    lineNumber: 239,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/app/[lang]/dealer/apply/DealerApplyForm.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(DealerApplyForm, "ArPcrmGimTydpPlIeeUZ5ITU1JU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DealerApplyForm;
var _c;
__turbopack_context__.k.register(_c, "DealerApplyForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sakwood-wp_frontend_9638bee6._.js.map