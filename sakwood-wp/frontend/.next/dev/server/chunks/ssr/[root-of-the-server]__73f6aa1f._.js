module.exports = [
"[project]/sakwood-wp/frontend/app/favicon.ico.mjs { IMAGE => \"[project]/sakwood-wp/frontend/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/favicon.ico.mjs { IMAGE => \"[project]/sakwood-wp/frontend/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/sakwood-wp/frontend/app/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/sakwood-wp/frontend/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/sakwood-wp/frontend/app/[lang]/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/sakwood-wp/frontend/app/[lang]/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/sakwood-wp/frontend/app/[lang]/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/sakwood-wp/frontend/lib/services/productService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductCategories",
    ()=>getProductCategories,
    "getProducts",
    ()=>getProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/graphql/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/graphql/queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/config/constants.ts [app-rsc] (ecmascript)");
;
;
;
/**
 * Transform internal Docker URLs to publicly accessible URLs
 * Replaces http://sak_wp:80/ with http://localhost:8006/
 */ function transformImageUrl(url) {
    if (!url) return undefined;
    return url.replace('http://sak_wp:80/', 'http://localhost:8006/');
}
/**
 * Transform product image URLs
 */ function transformProductImage(image) {
    if (!image) return undefined;
    const transformedUrl = transformImageUrl(image.sourceUrl);
    if (!transformedUrl) return undefined;
    return {
        ...image,
        sourceUrl: transformedUrl
    };
}
async function getProductCategories() {
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GET_PRODUCT_CATEGORIES_QUERY"]);
        return data?.productCategories?.nodes || [];
    } catch (error) {
        console.error('Error fetching product categories:', error);
        return [];
    }
}
/**
 * Helper function to parse price string to number
 * Handles Thai currency format (฿) and commas
 */ function parsePrice(priceStr) {
    if (!priceStr) return 0;
    // Remove currency symbol, commas, and whitespace
    const numericStr = priceStr.replace(/[฿$,,\s]/g, '');
    const parsed = parseFloat(numericStr);
    return isNaN(parsed) ? 0 : parsed;
}
/**
 * Sort products by specified field
 */ function sortProducts(products, sortBy) {
    const sorted = [
        ...products
    ];
    switch(sortBy){
        case 'name':
            return sorted.sort((a, b)=>a.name.localeCompare(b.name, 'th'));
        case 'price':
            return sorted.sort((a, b)=>{
                const priceA = parsePrice(a.price);
                const priceB = parsePrice(b.price);
                return priceA - priceB;
            });
        case 'date':
            // For now, sort by database ID as a proxy for date
            // You may want to add a date field to the Product type in the future
            return sorted.sort((a, b)=>b.databaseId - a.databaseId);
        default:
            return sorted;
    }
}
async function getProducts(language = 'th', categorySlug, sortBy) {
    try {
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:8006/graphql")?.replace('/graphql', '') || 'http://localhost:8006';
        let url = `${baseUrl}/wp-json/sakwood/v1/products?language=${language}&per_page=${__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APP_CONFIG"].productsPerPage}`;
        // Add category filter if provided
        if (categorySlug) {
            url += `&category=${encodeURIComponent(categorySlug)}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch products:', response.status);
            // Fall back to GraphQL
            return getProductsViaGraphQL(language);
        }
        const data = await response.json();
        // Handle empty array
        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }
        // Transform data to match Product interface
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
                image: product.image ? {
                    sourceUrl: product.image.sourceUrl
                } : undefined,
                description: '',
                galleryImages: undefined,
                // Include dimensions
                thickness: product.thickness || undefined,
                width: product.width || undefined,
                length: product.length || undefined,
                // Include categories if available
                categories: product.categories ? product.categories.map((cat)=>({
                        id: cat.id,
                        name: cat.name,
                        slug: cat.slug
                    })) : undefined
            }));
        // Sort products if sortBy is provided
        if (sortBy) {
            return sortProducts(products, sortBy);
        }
        return products;
    } catch (error) {
        console.error('Error fetching products via REST API:', error);
        // Fall back to GraphQL
        return getProductsViaGraphQL(language);
    }
}
/**
 * Fallback: Get products via GraphQL (no language filtering)
 */ async function getProductsViaGraphQL(language = 'th') {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GET_PRODUCTS_QUERY"], {
        first: 10
    });
    const products = data?.products?.nodes || [];
    // Transform image URLs
    return products.map((product)=>({
            ...product,
            image: product.image ? transformProductImage(product.image) : undefined,
            categories: product.productCategories?.nodes?.map((cat)=>({
                    id: cat.id,
                    name: cat.name,
                    slug: cat.slug
                })) || []
        }));
}
async function getProductBySlug(slug, language = 'th') {
    try {
        // The slug from Next.js is already decoded, but we need to URL-encode it for the API request
        // This ensures Thai characters are properly encoded for the HTTP request
        const encodedSlug = encodeURIComponent(slug);
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:8006/graphql")?.replace('/graphql', '') || 'http://localhost:8006';
        const url = `${baseUrl}/wp-json/sakwood/v1/products/${encodedSlug}?language=${language}`;
        const response = await fetch(url);
        if (!response.ok) {
            // If 404, product not found in this language
            if (response.status === 404) {
                return null;
            }
            console.error('Failed to fetch product:', response.status);
            // Fall back to GraphQL
            return getProductBySlugViaGraphQL(slug);
        }
        const product = await response.json();
        if (!product || product.code === 'product_not_found') {
            return null;
        }
        // Transform data to match Product interface
        return {
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
            image: product.image ? {
                sourceUrl: product.image.sourceUrl
            } : undefined,
            description: product.description || '',
            galleryImages: product.galleryImages ? {
                nodes: product.galleryImages.nodes || []
            } : undefined,
            thickness: product.thickness || undefined,
            width: product.width || undefined,
            length: product.length || undefined
        };
    } catch (error) {
        console.error('Error fetching product via REST API:', error);
        // Fall back to GraphQL
        return getProductBySlugViaGraphQL(slug);
    }
}
/**
 * Fallback: Get product by slug via GraphQL (no language filtering)
 */ async function getProductBySlugViaGraphQL(slug) {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["graphqlRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GET_PRODUCT_QUERY"], {
        slug
    });
    const product = data?.product;
    if (!product) return null;
    // Transform image URLs
    return {
        ...product,
        image: transformProductImage(product.image),
        galleryImages: product.galleryImages ? {
            nodes: product.galleryImages.nodes.map(transformProductImage).filter((img)=>img !== undefined)
        } : undefined
    };
}
}),
"[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShopPage",
    ()=>ShopPage
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ShopPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ShopPage() from the server but ShopPage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx <module evaluation>", "ShopPage");
}),
"[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShopPage",
    ()=>ShopPage
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ShopPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ShopPage() from the server but ShopPage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx", "ShopPage");
}),
"[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$app$2f5b$lang$5d2f$shop$2f$ShopPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$app$2f5b$lang$5d2f$shop$2f$ShopPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$app$2f5b$lang$5d2f$shop$2f$ShopPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/sakwood-wp/frontend/app/[lang]/shop/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShopPage,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/productService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$get$2d$dictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/get-dictionary.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$app$2f5b$lang$5d2f$shop$2f$ShopPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-rsc] (ecmascript)");
;
;
;
;
const revalidate = 180;
async function ShopPage({ params, searchParams }) {
    const { lang } = await params;
    const { category: categorySlug, sort: sortParam } = await searchParams;
    const [products, categories, dictionary] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"])(lang, categorySlug, sortParam),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductCategories"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$get$2d$dictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDictionary"])(lang)
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$app$2f5b$lang$5d2f$shop$2f$ShopPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ShopPage"], {
        lang: lang,
        dictionary: dictionary,
        initialProducts: products,
        initialCategories: categories
    }, void 0, false, {
        fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/page.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/sakwood-wp/frontend/app/[lang]/shop/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/shop/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__73f6aa1f._.js.map