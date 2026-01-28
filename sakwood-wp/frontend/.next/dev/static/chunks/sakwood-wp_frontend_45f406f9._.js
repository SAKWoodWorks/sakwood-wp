(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductImageGallery",
    ()=>ProductImageGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ProductImageGallery({ product }) {
    _s();
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Combine main image with gallery images
    // Main image is the cover/first image, followed by gallery images
    const images = [];
    // Add main image as cover/first image
    if (product.image?.sourceUrl) {
        images.push(product.image.sourceUrl);
    }
    // Add gallery images
    if (product.galleryImages?.nodes) {
        product.galleryImages.nodes.forEach((img)=>{
            if (img.sourceUrl && !images.includes(img.sourceUrl)) {
                images.push(img.sourceUrl);
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg",
                children: images[selectedImage] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: images[selectedImage],
                    alt: product.name,
                    className: "w-full h-full object-cover transition-all duration-300"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full flex items-center justify-center text-gray-400",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-24 h-24",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 1,
                            d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                            lineNumber: 44,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-2",
                children: images.map((img, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedImage(index),
                        className: `aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer transition-all ${selectedImage === index ? 'ring-2 ring-blue-900 ring-offset-2' : 'hover:ring-2 hover:ring-blue-600'}`,
                        "aria-label": `View ${index + 1}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: img,
                            alt: `${product.name} - View ${index + 1}`,
                            className: `w-full h-full object-cover transition-opacity ${selectedImage === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                            lineNumber: 64,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(ProductImageGallery, "Xy3J1kSE5E5uHEIhOUL7Fipn/Mg=");
_c = ProductImageGallery;
var _c;
__turbopack_context__.k.register(_c, "ProductImageGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductInfo",
    ()=>ProductInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$products$2f$AddToCompareButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/products/AddToCompareButton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProductInfo({ product, lang, dictionary }) {
    _s();
    const { product: dict } = dictionary;
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [messageType, setMessageType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const hasPrice = product.price && product.price !== '';
    const handleAddToCart = ()=>{
        addToCart(product);
        setMessage(dict.added_to_cart);
        setMessageType('success');
        setTimeout(()=>setMessage(''), 3000);
    };
    const handleAddToQuote = ()=>{
        addToCart(product);
        setMessage(dict.added_to_quote);
        setMessageType('info');
        setTimeout(()=>{
            router.push(`/${lang}/quote`);
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold text-blue-900 mb-3",
                        children: product.name || product.slug || 'Product'
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 text-sm text-gray-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: [
                                "SKU: ",
                                product.id
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-gray-200 pb-6",
                children: hasPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-baseline gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-3xl font-bold text-blue-900",
                            children: product.price
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        product.regularPrice && product.regularPrice !== product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg text-gray-400 line-through",
                            children: product.regularPrice
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                            lineNumber: 80,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-2xl font-semibold text-blue-600",
                    children: dict.contact_for_price
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-blue-900 mb-3",
                        children: dict.description_title
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prose prose-sm text-gray-600 leading-relaxed",
                        dangerouslySetInnerHTML: {
                            __html: product.description || '<p>No description available.</p>'
                        }
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`,
                children: message
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAddToCart,
                        className: "w-full px-8 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none",
                        children: hasPrice ? dict.add_to_cart : dict.add_to_quote
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAddToQuote,
                        className: "w-full px-8 py-4 border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all uppercase tracking-wide rounded-none",
                        children: dict.add_to_quote
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$products$2f$AddToCompareButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddToCompareButton"], {
                            product: product,
                            variant: "default",
                            dictionary: {
                                compare: dictionary.compare
                            }
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 pt-4 border-t border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-500",
                            children: [
                                dict.availability_label,
                                ":"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-green-600",
                            children: dict.in_stock
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(ProductInfo, "PWvMfFJNj85zX61pBDGpDFKvPHI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProductInfo;
var _c;
__turbopack_context__.k.register(_c, "ProductInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/popupService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPopupSettings",
    ()=>getPopupSettings
]);
async function getPopupSettings() {
    try {
        // Use Next.js API route as proxy to WordPress
        // This avoids CORS issues and works in both dev and production
        console.log('[PopupService] Fetching popup settings from /api/popup');
        const response = await fetch('/api/popup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        console.log('[PopupService] Response status:', response.status, response.statusText);
        if (!response.ok) {
            console.error('[PopupService] Failed to fetch popup settings:', response.status, response.statusText);
            return null;
        }
        const data = await response.json();
        console.log('[PopupService] Popup settings loaded:', data);
        return data;
    } catch (error) {
        console.error('[PopupService] Error fetching popup settings:', error);
        // Return null silently to not break the page
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PromotionalPopup",
    ()=>PromotionalPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$popupService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/popupService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PromotionalPopup({ defaultTitle = 'Special Offer!', defaultSubtitle = 'Check out our latest promotions', defaultCtaText = 'Learn More' }) {
    _s();
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dontShowAgain, setDontShowAgain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PromotionalPopup.useEffect": ()=>{
            // Only run on client side
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const loadSettings = {
                "PromotionalPopup.useEffect.loadSettings": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$popupService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPopupSettings"])();
                        console.log('[PromotionalPopup] Settings loaded:', data);
                        if (data) {
                            if (!data.enabled) {
                                console.log('[PromotionalPopup] Popup is disabled in WordPress');
                            } else {
                                console.log('[PromotionalPopup] Popup is ENABLED, will show after delay');
                            }
                            setSettings(data);
                        }
                    } catch (error) {
                        console.error('[PromotionalPopup] Error loading settings:', error);
                    }
                }
            }["PromotionalPopup.useEffect.loadSettings"];
            loadSettings();
        }
    }["PromotionalPopup.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PromotionalPopup.useEffect": ()=>{
            if (!settings) return;
            setMounted(true);
            // Check if user has dismissed the popup before
            const hasDismissed = localStorage.getItem('promo-popup-dismissed');
            console.log('[PromotionalPopup] hasDismissed:', hasDismissed);
            if (hasDismissed) {
                console.log('[PromotionalPopup] Popup was dismissed before, not showing');
                return;
            }
            // Show popup after delay (convert seconds to milliseconds)
            const delay = (settings.delay || 5) * 1000;
            console.log('[PromotionalPopup] Setting timer for', delay, 'ms');
            const timer = setTimeout({
                "PromotionalPopup.useEffect.timer": ()=>{
                    console.log('[PromotionalPopup] Timer triggered, setting isVisible to true');
                    setIsVisible(true);
                }
            }["PromotionalPopup.useEffect.timer"], delay);
            return ({
                "PromotionalPopup.useEffect": ()=>clearTimeout(timer)
            })["PromotionalPopup.useEffect"];
        }
    }["PromotionalPopup.useEffect"], [
        settings
    ]);
    const handleClose = ()=>{
        if (dontShowAgain) {
            localStorage.setItem('promo-popup-dismissed', 'true');
        }
        setIsVisible(false);
    };
    // Don't render anything on server or if not visible
    if (!mounted || !isVisible) {
        return null;
    }
    // Use settings or fall back to defaults
    const title = settings?.title || defaultTitle;
    const subtitle = settings?.subtitle || defaultSubtitle;
    const ctaText = settings?.cta_text || defaultCtaText;
    const ctaLink = settings?.cta_link || '/shop';
    const imageUrl = settings?.image_url;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300",
                onClick: handleClose
            }, void 0, false, {
                fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-3xl shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-300 slide-in-from-bottom-4 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClose,
                        className: "absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-colors",
                        "aria-label": "Close popup",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-5 h-5 text-gray-600"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-96 md:h-[500px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: imageUrl,
                                alt: "Promotion",
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg md:text-xl mb-8 max-w-lg drop-shadow-md",
                                        children: subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: ctaLink,
                                        onClick: handleClose,
                                        className: "inline-block bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 mb-4",
                                        children: ctaText
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center justify-center gap-3 cursor-pointer group mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: dontShowAgain,
                                                onChange: (e)=>setDontShowAgain(e.target.checked),
                                                className: "w-5 h-5 rounded border-white/50 text-white focus:ring-white/50 cursor-pointer bg-white/20"
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-white/90 group-hover:text-white transition-colors",
                                                children: "Don't show this again"
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this) : /* Fallback with gradient if no image */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-96 md:h-[500px] bg-gradient-to-br from-blue-600 to-indigo-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-6xl mb-4",
                                    children: "🎉"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                    lineNumber: 164,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg md:text-xl mb-8 max-w-lg drop-shadow-md",
                                    children: subtitle
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: ctaLink,
                                    onClick: handleClose,
                                    className: "inline-block bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 mb-4",
                                    children: ctaText
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center justify-center gap-3 cursor-pointer group mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: dontShowAgain,
                                            onChange: (e)=>setDontShowAgain(e.target.checked),
                                            className: "w-5 h-5 rounded border-white/50 text-white focus:ring-white/50 cursor-pointer bg-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-white/90 group-hover:text-white transition-colors",
                                            children: "Don't show this again"
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/ui/PromotionalPopup.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(PromotionalPopup, "6gO6VnRP73cRcSEWOLO/67G9OjU=");
_c = PromotionalPopup;
var _c;
__turbopack_context__.k.register(_c, "PromotionalPopup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/sakwood-wp/frontend/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=sakwood-wp_frontend_45f406f9._.js.map