module.exports = [
"[project]/sakwood-wp/frontend/lib/services/productServiceClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ============================================================================
 * CLIENT-SIDE PRODUCT SERVICE
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * - Fetches products from WordPress using Next.js API routes as a proxy
 * - Handles image URL transformation for mobile compatibility
 * - Sorts products by name, price, or date
 *
 * WHY WE CREATED THIS:
 * - Mobile browsers can't access localhost:8006 (WordPress Docker container)
 * - Server-side product fetching doesn't work when user changes filters/sorts
 * - This service runs in the browser and uses Next.js API routes as middleware
 *
 * HOW IT WORKS:
 * Browser → Next.js API Route (/api/products) → WordPress (localhost:8006)
 * The Next.js server can reach WordPress, but the browser can't directly
 *
 * CHANGES MADE (2025-01-28):
 * - Created this new client-side service
 * - Added image URL transformation (localhost:8006 → /wp-content/)
 * - Updated ShopPage.tsx to use this instead of server-side function
 * ============================================================================
 */ __turbopack_context__.s([
    "getProductCategoriesClient",
    ()=>getProductCategoriesClient,
    "getProductsClient",
    ()=>getProductsClient
]);
/**
 * Transform WordPress image URLs to work on mobile
 *
 * PROBLEM:
 * - WordPress serves images from http://localhost:8006/wp-content/uploads/...
 * - Mobile devices can't access localhost:8006
 * - This causes broken images on mobile
 *
 * SOLUTION:
 * - Transform URLs to use Next.js proxy path: /wp-content/uploads/...
 * - Next.js rewrites (in next.config.ts) proxy these to WordPress server-side
 * - Browser requests /wp-content/x.jpg → Next.js → http://localhost:8006/wp-content/x.jpg
 *
 * @param url - Original image URL from WordPress
 * @returns Transformed URL that works on all devices
 */ function transformImageUrl(url) {
    if (!url) return undefined;
    // Check if URL contains localhost:8006 or sak_wp:80 (Docker internal URL)
    if (url.includes('sak_wp:80') || url.includes('localhost:8006')) {
        try {
            const urlObj = new URL(url);
            // Extract the path after /wp-content/
            // Example: /wp-content/uploads/2026/01/image.jpg → uploads/2026/01/image.jpg
            const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);
            if (wpContentMatch) {
                // Return proxy path: /wp-content/uploads/2026/01/image.jpg
                // Next.js rewrite rule will forward this to WordPress
                return `/wp-content/${wpContentMatch[1]}`;
            }
        } catch (e) {
            console.error('Error transforming image URL:', e);
            return url;
        }
    }
    return url; // Return original URL if no transformation needed
}
async function getProductsClient(language = 'th', categorySlug, sortBy) {
    try {
        // Step 1: Build query parameters for API request
        const params = new URLSearchParams({
            language,
            per_page: '50'
        });
        if (categorySlug) {
            params.set('category', categorySlug);
        }
        // Step 2: Fetch from Next.js API route (not WordPress directly)
        // Browser → /api/products → Next.js server → WordPress
        const response = await fetch(`/api/products?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            console.error('Failed to fetch products:', response.status);
            return [];
        }
        const data = await response.json();
        // Handle error response from API
        if (data.error) {
            console.error('Products API error:', data.error);
            return [];
        }
        // Handle empty response
        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }
        // Step 3: Transform WordPress data to match Product interface
        const products = data.map((product)=>({
                id: String(product.id),
                databaseId: product.databaseId,
                name: product.name,
                slug: product.slug,
                sku: product.sku || undefined,
                language: product.language || 'th',
                price: product.price || product.prices?.piece || undefined,
                regularPrice: product.regularPrice || undefined,
                priceTypes: product.priceTypes || [
                    'piece'
                ],
                prices: product.prices || {},
                // Transform image URL to work on mobile
                image: product.image ? {
                    sourceUrl: transformImageUrl(product.image.sourceUrl)
                } : undefined,
                description: '',
                galleryImages: undefined,
                // Product dimensions
                thickness: product.thickness || undefined,
                width: product.width || undefined,
                length: product.length || undefined,
                // Product categories
                categories: product.categories ? product.categories.map((cat)=>({
                        id: cat.id,
                        name: cat.name,
                        slug: cat.slug
                    })) : undefined
            }));
        // Step 4: Sort products if requested
        if (sortBy) {
            return sortProducts(products, sortBy);
        }
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
async function getProductCategoriesClient() {
    try {
        const response = await fetch('/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            console.error('Failed to fetch categories:', response.status);
            return [];
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
/**
 * Helper: Parse price string to number
 *
 * Handles Thai currency format: "1,200฿", "฿1,200", "1,200.00"
 * Removes currency symbols and commas, then converts to number
 */ function parsePrice(priceStr) {
    if (!priceStr) return 0;
    const numericStr = priceStr.replace(/[฿$,,\s]/g, '');
    const parsed = parseFloat(numericStr);
    return isNaN(parsed) ? 0 : parsed;
}
/**
 * Sort products by specified field
 *
 * @param products - Array of products to sort
 * @param sortBy - Field to sort by ('name', 'price', 'date')
 * @returns Sorted array of products
 */ function sortProducts(products, sortBy) {
    const sorted = [
        ...products
    ];
    switch(sortBy){
        case 'name':
            // Sort alphabetically (Thai language aware)
            return sorted.sort((a, b)=>a.name.localeCompare(b.name, 'th'));
        case 'price':
            // Sort by price (low to high)
            return sorted.sort((a, b)=>{
                const priceA = parsePrice(a.price);
                const priceB = parsePrice(b.price);
                return priceA - priceB;
            });
        case 'date':
            // Sort by database ID as proxy for date (newest first)
            return sorted.sort((a, b)=>b.databaseId - a.databaseId);
        default:
            return sorted;
    }
}
}),
"[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShopPage",
    ()=>ShopPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$ProductCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/ProductCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$productServiceClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/productServiceClient.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function ShopPage({ lang, dictionary, initialProducts, initialCategories }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort');
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialProducts);
    const [categories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCategories);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(categoryParam);
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(sortParam);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Update products when category or sort changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function loadProducts() {
            setIsLoading(true);
            const fetchedProducts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$productServiceClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductsClient"])(lang, selectedCategory || undefined, sortBy || undefined);
            setProducts(fetchedProducts);
            setIsLoading(false);
        }
        loadProducts();
    }, [
        selectedCategory,
        sortBy,
        lang
    ]);
    const handleCategoryChange = (categorySlug)=>{
        setSelectedCategory(categorySlug);
        // Update URL
        const params = new URLSearchParams();
        if (categorySlug) params.set('category', categorySlug);
        if (sortBy) params.set('sort', sortBy);
        router.push(`/${lang}/shop${params.toString() ? '?' + params.toString() : ''}`);
    };
    const handleSortChange = (newSortBy)=>{
        setSortBy(newSortBy);
        // Update URL
        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedCategory);
        params.set('sort', newSortBy);
        router.push(`/${lang}/shop${params.toString() ? '?' + params.toString() : ''}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-gray-50 to-white py-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-5xl font-bold text-gray-900 mb-4",
                            children: dictionary.shop.title
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-gray-600 max-w-2xl mx-auto",
                            children: dictionary.shop.subtitle
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-12 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-4 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-gray-700 uppercase tracking-wide",
                                        children: [
                                            dictionary.shop.filter_by,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleCategoryChange(null),
                                                className: `px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === null ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                                children: dictionary.shop.all_categories
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleCategoryChange(category.slug),
                                                    className: `px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.slug ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                                    children: [
                                                        category.name,
                                                        category.count !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-2 text-sm opacity-75",
                                                            children: [
                                                                "(",
                                                                category.count,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, category.id, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold text-gray-700 uppercase tracking-wide",
                                    children: [
                                        dictionary.shop.sort_by || 'Sort by',
                                        ":"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSortChange('name'),
                                            className: `px-4 py-2 rounded-lg font-medium transition-all ${sortBy === 'name' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                            children: dictionary.shop.sort_name || 'Name'
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSortChange('price'),
                                            className: `px-4 py-2 rounded-lg font-medium transition-all ${sortBy === 'price' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                            children: dictionary.shop.sort_price || 'Price'
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSortChange('date'),
                                            className: `px-4 py-2 rounded-lg font-medium transition-all ${sortBy === 'date' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                            children: dictionary.shop.sort_newest || 'Newest'
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-gray-600",
                            children: dictionary.shop.loading
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this) : products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
                    children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$ProductCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductCard"], {
                            product: product,
                            lang: lang,
                            dictionary: dictionary
                        }, product.id, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 171,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                    lineNumber: 169,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-400 text-6xl mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-24 h-24 mx-auto",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                    lineNumber: 178,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                lineNumber: 177,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-gray-700 mb-2",
                            children: dictionary.shop.no_products
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 mb-6",
                            children: dictionary.shop.no_products_desc
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/${lang === 'th' ? 'en' : 'th'}/shop`,
                            className: "inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors",
                            children: dictionary.shop.view_other_lang
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                    lineNumber: 175,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=sakwood-wp_frontend_727998ad._.js.map