module.exports = [
"[project]/sakwood-wp/frontend/components/cart/CartItems.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartItems",
    ()=>CartItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
'use client';
;
;
;
;
function CartItems({ lang, dictionary }) {
    const { cart: dict } = dictionary;
    const { items, removeFromCart, updateQuantity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    if (items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-50 rounded-lg p-6 sm:p-12 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 1,
                        d: "M3 3h2l-4 4m-4 4h2m-4 4v6m0 0h-6m0 0v6m0 0h6m-4 4h2m-4 4v6m0 0h-6m0 0v6m0 0h6m-4 4h2m-4 4v6"
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg sm:text-xl font-semibold text-gray-600 mb-2",
                    children: "Your cart is empty"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: `/${lang}/shop`,
                    className: "inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white text-sm sm:text-base font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide",
                    children: "Continue Shopping"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block bg-white rounded-lg shadow-md overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-blue-900 text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm",
                                        children: "Product"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm",
                                        children: "Price"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm",
                                        children: dict.quantity
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 sm:px-6 py-3 sm:py-4 text-right font-semibold text-xs sm:text-sm",
                                        children: "Subtotal"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 sm:px-6 py-3 sm:py-4"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: items.map((item)=>{
                                const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');
                                const subtotal = price * item.quantity;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-gray-200 hover:bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 sm:px-6 py-3 sm:py-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 sm:gap-4",
                                                children: [
                                                    item.image?.sourceUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: item.image.sourceUrl,
                                                            alt: item.name,
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                            lineNumber: 69,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/${lang}/products/${item.slug}`,
                                                                className: "font-semibold text-blue-900 hover:text-blue-700 transition-colors text-sm sm:text-base",
                                                                children: item.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                                lineNumber: 77,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs sm:text-sm text-gray-500",
                                                                children: [
                                                                    "SKU: ",
                                                                    item.id
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                                lineNumber: 83,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 66,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                            lineNumber: 65,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 sm:px-6 py-3 sm:py-4 text-blue-900 font-semibold text-sm sm:text-base",
                                            children: item.price
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                            lineNumber: 87,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 sm:px-6 py-3 sm:py-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center gap-1 sm:gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateQuantity(item.id, item.quantity - 1),
                                                        className: "w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors text-sm",
                                                        "aria-label": "Decrease quantity",
                                                        children: "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-6 sm:w-8 text-center font-semibold text-gray-900 text-sm sm:text-base",
                                                        children: item.quantity
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateQuantity(item.id, item.quantity + 1),
                                                        className: "w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors text-sm",
                                                        "aria-label": "Increase quantity",
                                                        children: "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 91,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                            lineNumber: 90,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 sm:px-6 py-3 sm:py-4 text-right font-semibold text-blue-900 text-sm sm:text-base",
                                            children: subtotal.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 sm:px-6 py-3 sm:py-4 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeFromCart(item.id),
                                                className: "p-1.5 sm:p-2 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-lg transition-all duration-200",
                                                "aria-label": dict.remove,
                                                title: dict.remove,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-4 h-4 sm:w-5 sm:h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 113,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                            lineNumber: 112,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                    lineNumber: 64,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden space-y-4",
                children: items.map((item)=>{
                    const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');
                    const subtotal = price * item.quantity;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-md p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    item.image?.sourceUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: item.image.sourceUrl,
                                            alt: item.name,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                            lineNumber: 141,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 140,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/${lang}/products/${item.slug}`,
                                                className: "font-semibold text-blue-900 hover:text-blue-700 transition-colors text-sm line-clamp-2",
                                                children: item.name
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    "SKU: ",
                                                    item.id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 155,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-blue-900 font-bold text-base mt-1",
                                                children: item.price
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 156,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateQuantity(item.id, item.quantity - 1),
                                                className: "w-9 h-9 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors",
                                                "aria-label": "Decrease quantity",
                                                children: "-"
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 163,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-8 text-center font-semibold text-gray-900 text-base",
                                                children: item.quantity
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateQuantity(item.id, item.quantity + 1),
                                                className: "w-9 h-9 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors",
                                                "aria-label": "Increase quantity",
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 171,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-blue-900 font-bold text-lg",
                                                children: subtotal.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 181,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeFromCart(item.id),
                                                className: "p-2 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-lg transition-all duration-200 flex-shrink-0",
                                                "aria-label": dict.remove,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                                lineNumber: 161,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/cart/CartItems.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/sakwood-wp/frontend/lib/services/deliveryService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Delivery rate calculation service
// Warehouse location: Pathumtani, Thailand
// Rates are loaded from DeliveryRate.csv
__turbopack_context__.s([
    "TruckType",
    ()=>TruckType,
    "calculateShippingCost",
    ()=>calculateShippingCost,
    "determineTruckType",
    ()=>determineTruckType,
    "getAllProvinces",
    ()=>getAllProvinces,
    "getShippingRate",
    ()=>getShippingRate,
    "getShippingZones",
    ()=>getShippingZones,
    "getTruckTypeName",
    ()=>getTruckTypeName,
    "getTruckTypeSurcharge",
    ()=>getTruckTypeSurcharge
]);
var TruckType = /*#__PURE__*/ function(TruckType) {
    TruckType["SMALL"] = "small";
    TruckType["MEDIUM"] = "medium";
    TruckType["LARGE"] = "large";
    return TruckType;
}({});
// Parsed delivery rates from CSV
const DELIVERY_RATES = [
    // Zone 1: Bangkok Metropolitan Area (6W)
    {
        province: 'Pathumtani',
        rate: 5000,
        estimatedDays: '1'
    },
    {
        province: 'Nonthaburi',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Samut Prakan',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Nakhon Pathom',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Samut Sakhon',
        rate: 5000,
        estimatedDays: '1-2'
    },
    {
        province: 'Phra Nakhon Si Ayutthaya',
        rate: 6500,
        estimatedDays: '2-3'
    },
    {
        province: 'Ang Thong',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Lopburi',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Saraburi',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Sing Buri',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Chai Nat',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Suphan Buri',
        rate: 2000,
        estimatedDays: '2-3'
    },
    // Zone 2: Central Region (10W)
    {
        province: 'Kanchanaburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Ratchaburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Phetchaburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Prachuap Khiri Khan',
        rate: 3000,
        estimatedDays: '3-4'
    },
    {
        province: 'Chonburi',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Rayong',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Chanthaburi',
        rate: 3000,
        estimatedDays: '3-4'
    },
    {
        province: 'Trat',
        rate: 3000,
        estimatedDays: '3-4'
    },
    {
        province: 'Chachoengsao',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Prachinburi',
        rate: 2000,
        estimatedDays: '2-3'
    },
    {
        province: 'Sa Kaeo',
        rate: 2500,
        estimatedDays: '2-3'
    },
    {
        province: 'Nakhon Nayok',
        rate: 2000,
        estimatedDays: '2-3'
    },
    // Zone 3: Northern Region (6W)
    {
        province: 'Kamphaeng Phet',
        rate: 4000,
        estimatedDays: '3-4'
    },
    {
        province: 'Tak',
        rate: 4000,
        estimatedDays: '3-4'
    },
    {
        province: 'Uthai Thani',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Nakhon Sawan',
        rate: 3000,
        estimatedDays: '2-3'
    },
    {
        province: 'Phichit',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Phitsanulok',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Phichai',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Phetchabun',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Chiang Mai',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Lamphun',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Lampang',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Uttaradit',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Phrae',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Nan',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Phayao',
        rate: 7500,
        estimatedDays: '4-5'
    },
    {
        province: 'Chiang Rai',
        rate: 9000,
        estimatedDays: '4-5'
    },
    {
        province: 'Mae Hong Son',
        rate: 10000,
        estimatedDays: '5-6'
    },
    // Zone 4: Northeastern Region (6W)
    {
        province: 'Nakhon Ratchasima',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Buri Ram',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Surin',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Sisaket',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Ubon Ratchathani',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Yasothon',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Chaiyaphum',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Amnat Charoen',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Nong Bua Lamphu',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Khon Kaen',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Udon Thani',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Loei',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Nong Khai',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Maha Sarakham',
        rate: 5000,
        estimatedDays: '4-5'
    },
    {
        province: 'Roi Et',
        rate: 3500,
        estimatedDays: '3-4'
    },
    {
        province: 'Kalasin',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Sakon Nakhon',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Nakhon Phanom',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Mukdahan',
        rate: 4000,
        estimatedDays: '4-5'
    },
    // Zone 5: Southern Region (6W)
    {
        province: 'Chumphon',
        rate: 4000,
        estimatedDays: '4-5'
    },
    {
        province: 'Ranong',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Surat Thani',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Phangnga',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Phuket',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Krabi',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Phatthalung',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Trang',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Satun',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Songkhla',
        rate: 4500,
        estimatedDays: '4-5'
    },
    {
        province: 'Yala',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Narathiwat',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Pattani',
        rate: 5000,
        estimatedDays: '5-6'
    },
    {
        province: 'Nakhon Si Thammarat',
        rate: 4500,
        estimatedDays: '4-5'
    }
];
function getShippingRate(province) {
    const normalizedProvince = province.toLowerCase().trim();
    const rate = DELIVERY_RATES.find((r)=>r.province.toLowerCase() === normalizedProvince);
    return rate || {
        province,
        rate: 6000,
        estimatedDays: '5-7'
    };
}
function getAllProvinces() {
    return DELIVERY_RATES.map((rate)=>rate.province).sort();
}
function determineTruckType(items) {
    let totalLength = 0;
    let totalVolume = 0;
    items.forEach((item)=>{
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
        const volume = item.volume || 0;
        totalLength += length * item.quantity;
        totalVolume += volume * item.quantity;
    });
    // Large truck needed if:
    // - Any single item is 6 meters or longer, OR
    // - Total length exceeds 12 meters, OR
    // - Total volume exceeds 5 cubic meters
    const hasLongItem = items.some((item)=>{
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
        return length >= 6;
    });
    const totalLengthExceedsLimit = totalLength > 12;
    const totalVolumeExceedsLimit = totalVolume > 5;
    if (hasLongItem || totalLengthExceedsLimit || totalVolumeExceedsLimit) {
        return "large";
    }
    // Medium truck needed if:
    // - Any single item is 3-6 meters, OR
    // - Total length exceeds 6 meters, OR
    // - Total volume exceeds 2 cubic meters
    const hasMediumItem = items.some((item)=>{
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
        return length >= 3 && length < 6;
    });
    const totalLengthExceedsMedium = totalLength > 6;
    const totalVolumeExceedsMedium = totalVolume > 2;
    if (hasMediumItem || totalLengthExceedsMedium || totalVolumeExceedsMedium) {
        return "medium";
    }
    return "small";
}
function getTruckTypeSurcharge(truckType) {
    switch(truckType){
        case "small":
            return 0;
        case "medium":
            return 500;
        case "large":
            return 1500;
        default:
            return 0;
    }
}
function getTruckTypeName(truckType) {
    switch(truckType){
        case "small":
            return 'Small Truck (6-wheel)';
        case "medium":
            return 'Medium Truck (10-wheel)';
        case "large":
            return 'Large Truck (10-wheel)';
        default:
            return 'Standard Truck';
    }
}
/**
 * Get price tier based on order value
 * @param cartTotal - Total cart value
 * @returns Price tier multiplier
 */ function getPriceTier(cartTotal) {
    if (cartTotal >= 250000) return 0.9; // 250k-300k: 10% discount
    if (cartTotal >= 200000) return 0.95; // 200k-250k: 5% discount
    if (cartTotal >= 150000) return 1.0; // 150k-200k: no discount
    if (cartTotal >= 100000) return 1.05; // 100k-150k: 5% surcharge
    if (cartTotal >= 75000) return 1.1; // 75k-100k: 10% surcharge
    if (cartTotal >= 50000) return 1.15; // 50k-75k: 15% surcharge
    if (cartTotal >= 25000) return 1.2; // 25k-50k: 20% surcharge
    if (cartTotal >= 10000) return 1.25; // 10k-25k: 25% surcharge
    return 1.0; // 0-10k: 25% surcharge
}
function calculateShippingCost(province, cartTotal, items) {
    const rate = getShippingRate(province);
    const truckType = items ? determineTruckType(items) : "small";
    const truckSurcharge = getTruckTypeSurcharge(truckType);
    const priceTier = cartTotal ? getPriceTier(cartTotal) : 1.0;
    // Free shipping for orders over 10,000 THB
    if (cartTotal && cartTotal >= 10000) {
        return {
            cost: 0,
            truckType,
            truckTypeName: getTruckTypeName(truckType),
            priceTier: 'Free'
        };
    }
    const baseCost = rate.rate + truckSurcharge;
    const totalCost = baseCost * priceTier;
    return {
        cost: totalCost,
        truckType,
        truckTypeName: getTruckTypeName(truckType),
        priceTier: priceTier === 1.0 ? 'Standard' : `${Math.round((1 - priceTier) * 100)}% ${priceTier < 1 ? 'Discount' : 'Surcharge'}`
    };
}
function getShippingZones() {
    const zones = [
        {
            name: 'Bangkok Metropolitan Area',
            rate: 5000,
            days: '1-2'
        },
        {
            name: 'Central Region',
            rate: 2500,
            days: '2-3'
        },
        {
            name: 'Northern Region',
            rate: 7500,
            days: '4-5'
        },
        {
            name: 'Northeastern Region',
            rate: 4000,
            days: '4-5'
        },
        {
            name: 'Southern Region',
            rate: 5000,
            days: '5-6'
        }
    ];
    return zones.map((zone)=>({
            zone: zone.name,
            provinces: DELIVERY_RATES.filter((r)=>r.rate === zone.rate).map((r)=>r.province),
            rate: zone.rate,
            estimatedDays: zone.days
        }));
}
}),
"[project]/sakwood-wp/frontend/lib/utils/lineMessage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * LINE Message Generator
 * Generates LINE URLs with pre-filled messages for cart and product inquiries
 */ __turbopack_context__.s([
    "generateCartLineMessage",
    ()=>generateCartLineMessage,
    "generateProductLineMessage",
    ()=>generateProductLineMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$chatConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/config/chatConfig.ts [app-ssr] (ecmascript)");
;
/**
 * Format price for display in LINE message
 */ function formatPrice(priceStr, locale) {
    // Remove currency symbol and format
    const price = priceStr.replace(/[^\d.,]/g, '');
    if (locale === 'th') {
        return `${price} บาท`;
    }
    return `฿${price}`;
}
/**
 * Build cart items list for LINE message
 */ function buildCartItemsList(items, maxItems = 10) {
    const visibleItems = items.slice(0, maxItems);
    const itemList = visibleItems.map((item)=>{
        const price = formatPrice(item.price, 'th'); // Use TH format for both
        return `- ${item.name} (x${item.quantity}) - ${price}`;
    });
    let result = itemList.join('\n');
    // Add "and X more items" if there are more items
    if (items.length > maxItems) {
        result += `\n- ...and ${items.length - maxItems} more items`;
    }
    return result;
}
function generateCartLineMessage(items, total, lang) {
    if (!items || items.length === 0) {
        // No items, just open LINE chat
        const lineId = __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$chatConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultChatConfig"].platforms.line.url.replace('@', '');
        return `https://line.me/R/ti/p/@${lineId}`;
    }
    // Build message based on language
    let message;
    if (lang === 'th') {
        // Thai message
        message = `สวัสดีครับ/ค่ะ ทาง SAK WoodWorks,

สนใจสั่งซื้อสินค้าดังนี้:
${buildCartItemsList(items)}

ยอดรวม: ${formatPrice(total.toFixed(2), 'th')}

กรุณาแจ้งราคาที่แม่นยำและค่าจัดส่งด้วยครับ/ค่ะ
ขอบคุณครับ/ค่ะ`;
    } else {
        // English message
        message = `Hello SAK WoodWorks,

I'm interested in ordering:
${buildCartItemsList(items)}

Cart Total: ${formatPrice(total.toFixed(2), 'en')}

Please provide a quote with current pricing and delivery information.
Thank you!`;
    }
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    // Generate LINE URL for Official Account
    const lineId = __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$chatConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultChatConfig"].platforms.line.url.replace('@', '');
    return `https://line.me/R/ti/p/@${lineId}?text=${encodedMessage}`;
}
function generateProductLineMessage(product, lang) {
    const price = product.price ? formatPrice(product.price, 'th') : 'ราคาพิเศษ (Price on request)';
    let message;
    if (lang === 'th') {
        // Thai message
        message = `สวัสดีครับ/ค่ะ ทาง SAK WoodWorks,

สนใจสินค้า: ${product.name}
${price}

กรุณาแจ้งรายละเอียดและราคาด้วยครับ/ค่ะ
ขอบคุณครับ/ค่ะ`;
    } else {
        // English message
        message = `Hello SAK WoodWorks,

I'm interested in: ${product.name}
Price: ${price}

Please provide more information about this product.
Thank you!`;
    }
    const encodedMessage = encodeURIComponent(message);
    // Generate LINE URL for Official Account
    const lineId = __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$chatConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultChatConfig"].platforms.line.url.replace('@', '');
    return `https://line.me/R/ti/p/@${lineId}?text=${encodedMessage}`;
}
}),
"[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartSummary",
    ()=>CartSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$deliveryService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/deliveryService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$utils$2f$lineMessage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/utils/lineMessage.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function CartSummary({ lang, dictionary }) {
    const { cart: dict, common } = dictionary;
    const { items, getCartTotal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const [selectedProvince, setSelectedProvince] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const subtotal = getCartTotal();
    // Generate LINE URL with cart details
    const lineUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (items.length === 0) return '';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$utils$2f$lineMessage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateCartLineMessage"])(items, subtotal, lang);
    }, [
        items,
        subtotal,
        lang
    ]);
    // Calculate detailed shipping breakdown
    const shippingBreakdown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedProvince) return null;
        // Free shipping for orders over 10,000 THB
        if (subtotal >= 10000) {
            return {
                baseRate: 0,
                truckSurcharge: 0,
                truckType: 'Standard',
                priceTierMultiplier: 1,
                priceTierLabel: 'Free Shipping',
                finalCost: 0,
                estimatedDays: '1-2'
            };
        }
        // Get province base rate
        const getProvinceRate = (province)=>{
            const rates = {
                'Pathumtani': 5000,
                'Nonthaburi': 5000,
                'Samut Prakan': 5000,
                'Nakhon Pathom': 5000,
                'Samut Sakhon': 5000,
                'Phra Nakhon Si Ayutthaya': 6500,
                'Ang Thong': 2000,
                'Lopburi': 2000,
                'Saraburi': 2000,
                'Sing Buri': 2000,
                'Chai Nat': 2000,
                'Suphan Buri': 2000,
                'Kanchanaburi': 2500,
                'Ratchaburi': 2500,
                'Phetchaburi': 2500,
                'Prachuap Khiri Khan': 3000,
                'Chonburi': 2500,
                'Rayong': 2500,
                'Chanthaburi': 3000,
                'Trat': 3000,
                'Chachoengsao': 2000,
                'Prachinburi': 2000,
                'Sa Kaeo': 2500,
                'Nakhon Nayok': 2000,
                'Kamphaeng Phet': 4000,
                'Tak': 4000,
                'Uthai Thani': 3500,
                'Nakhon Sawan': 3000,
                'Phichit': 3500,
                'Phitsanulok': 3500,
                'Phichai': 3500,
                'Phetchabun': 3500,
                'Chiang Mai': 7500,
                'Lamphun': 7500,
                'Lampang': 7500,
                'Uttaradit': 4500,
                'Phrae': 4500,
                'Nan': 7500,
                'Phayao': 7500,
                'Chiang Rai': 9000,
                'Mae Hong Son': 10000,
                'Nakhon Ratchasima': 3500,
                'Buri Ram': 3500,
                'Surin': 3500,
                'Sisaket': 3500,
                'Ubon Ratchathani': 4000,
                'Yasothon': 3500,
                'Chaiyaphum': 3500,
                'Amnat Charoen': 4000,
                'Nong Bua Lamphu': 4000,
                'Khon Kaen': 4000,
                'Udon Thani': 4000,
                'Loei': 4000,
                'Nong Khai': 4000,
                'Maha Sarakham': 5000,
                'Roi Et': 3500,
                'Kalasin': 4000,
                'Sakon Nakhon': 4000,
                'Nakhon Phanom': 4000,
                'Mukdahan': 4000,
                'Chumphon': 4000,
                'Ranong': 4500,
                'Surat Thani': 4500,
                'Phangnga': 5000,
                'Phuket': 5000,
                'Krabi': 5000,
                'Phatthalung': 4500,
                'Trang': 4500,
                'Satun': 5000,
                'Songkhla': 4500,
                'Yala': 5000,
                'Narathiwat': 5000,
                'Pattani': 5000,
                'Nakhon Si Thammarat': 4500
            };
            return rates[province] || 6000;
        };
        const baseRate = getProvinceRate(selectedProvince);
        // Determine truck type and surcharge
        const determineTruckType = ()=>{
            let totalLength = 0;
            let totalVolume = 0;
            items.forEach((item)=>{
                const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
                const volume = item.volume || 0;
                totalLength += length * item.quantity;
                totalVolume += volume * item.quantity;
            });
            const hasLongItem = items.some((item)=>{
                const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
                return length >= 6;
            });
            const totalLengthExceedsLimit = totalLength > 12;
            const totalVolumeExceedsLimit = totalVolume > 5;
            if (hasLongItem || totalLengthExceedsLimit || totalVolumeExceedsLimit) {
                return {
                    type: 'Large Truck (10-wheel)',
                    surcharge: 1500
                };
            }
            const hasMediumItem = items.some((item)=>{
                const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : item.length || 0;
                return length >= 3 && length < 6;
            });
            const totalLengthExceedsMedium = totalLength > 6;
            const totalVolumeExceedsMedium = totalVolume > 2;
            if (hasMediumItem || totalLengthExceedsMedium || totalVolumeExceedsMedium) {
                return {
                    type: 'Medium Truck (10-wheel)',
                    surcharge: 500
                };
            }
            return {
                type: 'Small Truck (6-wheel)',
                surcharge: 0
            };
        };
        const { type: truckType, surcharge: truckSurcharge } = determineTruckType();
        // Determine price tier
        const getPriceTier = ()=>{
            if (subtotal >= 250000) return {
                multiplier: 0.9,
                label: '10% Discount'
            };
            if (subtotal >= 200000) return {
                multiplier: 0.95,
                label: '5% Discount'
            };
            if (subtotal >= 150000) return {
                multiplier: 1.0,
                label: 'Standard Rate'
            };
            if (subtotal >= 100000) return {
                multiplier: 1.05,
                label: '5% Surcharge'
            };
            if (subtotal >= 75000) return {
                multiplier: 1.1,
                label: '10% Surcharge'
            };
            if (subtotal >= 50000) return {
                multiplier: 1.15,
                label: '15% Surcharge'
            };
            if (subtotal >= 25000) return {
                multiplier: 1.2,
                label: '20% Surcharge'
            };
            if (subtotal >= 10000) return {
                multiplier: 1.25,
                label: '25% Surcharge'
            };
            return {
                multiplier: 1.0,
                label: 'Standard Rate'
            };
        };
        const { multiplier: priceTierMultiplier, label: priceTierLabel } = getPriceTier();
        const finalCost = (baseRate + truckSurcharge) * priceTierMultiplier;
        return {
            baseRate,
            truckSurcharge,
            truckType,
            priceTierMultiplier,
            priceTierLabel,
            finalCost,
            estimatedDays: '3-5'
        };
    }, [
        selectedProvince,
        subtotal,
        items
    ]);
    const shippingCost = shippingBreakdown?.finalCost || 0;
    const total = subtotal + shippingCost;
    const provinces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$deliveryService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllProvinces"])();
    if (items.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold text-blue-900 mb-4",
                children: dict.order_summary
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "province",
                        className: "block text-sm font-semibold text-gray-700 mb-2",
                        children: dict.select_province
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "province",
                        value: selectedProvince,
                        onChange: (e)=>setSelectedProvince(e.target.value),
                        className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select Province"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            provinces.map((province)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: province,
                                    children: province
                                }, province, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: [
                                    dict.subtotal,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-blue-900",
                                children: subtotal.toFixed(2)
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    shippingBreakdown && shippingBreakdown.finalCost > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 rounded-lg p-4 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-gray-700 mb-2",
                                children: "Shipping Cost Breakdown:"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600",
                                        children: [
                                            "Base Rate (",
                                            selectedProvince,
                                            "):"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-blue-900",
                                        children: shippingBreakdown.baseRate.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600",
                                        children: [
                                            "Truck Type (",
                                            shippingBreakdown.truckType,
                                            "):"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-medium ${shippingBreakdown.truckSurcharge > 0 ? 'text-yellow-600' : 'text-green-600'}`,
                                        children: shippingBreakdown.truckSurcharge > 0 ? `+${shippingBreakdown.truckSurcharge.toFixed(2)}` : 'No surcharge'
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600",
                                        children: [
                                            "Price Tier (",
                                            shippingBreakdown.priceTierLabel,
                                            "):"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-medium ${shippingBreakdown.priceTierMultiplier < 1 ? 'text-green-600' : shippingBreakdown.priceTierMultiplier > 1 ? 'text-yellow-600' : 'text-gray-700'}`,
                                        children: shippingBreakdown.priceTierMultiplier < 0.95 ? '(-10%)' : shippingBreakdown.priceTierMultiplier < 1 ? '(-5%)' : shippingBreakdown.priceTierMultiplier > 1.2 ? '(+25%)' : shippingBreakdown.priceTierMultiplier > 1.15 ? '(+20%)' : shippingBreakdown.priceTierMultiplier > 1.1 ? '(+15%)' : shippingBreakdown.priceTierMultiplier > 1.05 ? '(+10%)' : shippingBreakdown.priceTierMultiplier > 1 ? '(+5%)' : '(Standard)'
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-300 pt-2 mt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-700 font-semibold",
                                            children: [
                                                dict.shipping,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                            lineNumber: 246,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-blue-900 text-lg",
                                            children: shippingBreakdown.finalCost.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-2",
                                children: [
                                    "Estimated delivery: ",
                                    shippingBreakdown.estimatedDays,
                                    " days"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    shippingBreakdown && shippingBreakdown.finalCost === 0 && subtotal >= 10000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-green-600 bg-green-50 p-3 rounded border border-green-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold",
                                children: [
                                    "🎉 ",
                                    dict.free_shipping,
                                    "!"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs mt-1",
                                children: "Your order qualifies for free shipping"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this),
                    !shippingBreakdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: [
                                    dict.shipping,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400 italic text-sm",
                                children: "Select province to calculate"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-gray-200 pt-3 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-bold text-blue-900",
                                children: [
                                    dict.total,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl font-bold text-blue-900",
                                children: total.toFixed(2)
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-gray-700 mb-2",
                                children: [
                                    dict.cart_contents || 'Cart Contents',
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "text-sm space-y-1",
                                children: [
                                    items.slice(0, 5).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "text-gray-600",
                                            children: [
                                                "• ",
                                                item.name,
                                                " (x",
                                                item.quantity,
                                                ") - ",
                                                item.price
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                            lineNumber: 303,
                                            columnNumber: 17
                                        }, this)),
                                    items.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-gray-500 italic",
                                        children: [
                                            "...and ",
                                            items.length - 5,
                                            " more items"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: dict.checkout_disabled || 'Checkout Disabled'
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs mt-1",
                                children: dict.line_notice || 'Please contact us via LINE for orders.'
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    lineUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: lineUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "block w-full px-6 py-4 bg-[#00B900] text-white font-bold hover:bg-[#00a300] transition-all uppercase tracking-wide rounded-none text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/line-logo.png",
                                        alt: "LINE",
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 335,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: dict.order_via_line || 'Order via LINE'
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 329,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 text-center",
                                children: dict.order_via_line_desc || 'Click to contact us via LINE for personalized service'
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `/${lang}/shop`,
                        className: "block text-center text-blue-600 hover:text-blue-800 font-semibold transition-colors",
                        children: dict.continue_shopping
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/cart/CartSummary.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
}),
"[project]/sakwood-wp/frontend/components/cart/CartActions.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartActions",
    ()=>CartActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/CartContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function CartActions({ lang, dictionary }) {
    const { cart: dict } = dictionary;
    const { items, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    if (items.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold text-blue-900 mb-4",
                children: dict.update_cart
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartActions.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clearCart,
                        className: "w-full px-6 py-3 border-2 border-red-600 text-red-600 font-bold hover:bg-red-50 transition-all uppercase tracking-wide rounded-none",
                        children: dict.clear_cart
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartActions.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `/${lang}/quote`,
                        className: "block w-full px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none text-center",
                        children: dict.request_quote
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartActions.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `/${lang}/about#contact`,
                        className: "block w-full px-6 py-3 border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all uppercase tracking-wide rounded-none text-center",
                        children: dict.contact_us
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/cart/CartActions.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/cart/CartActions.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/cart/CartActions.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=sakwood-wp_frontend_1984856e._.js.map