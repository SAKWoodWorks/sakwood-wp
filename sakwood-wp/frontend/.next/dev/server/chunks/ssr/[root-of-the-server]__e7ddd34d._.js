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
"[project]/sakwood-wp/frontend/lib/services/searchService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchProducts",
    ()=>searchProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/config/constants.ts [app-rsc] (ecmascript)");
;
async function searchProducts(query, lang = 'th') {
    if (!query || query.trim().length === 0) {
        return {
            products: [],
            total: 0
        };
    }
    try {
        let searchTerm = query.trim();
        // Remove spaces for Thai searches to improve matching
        // Thai product names often don't need spaces between characters
        if (lang === 'th') {
            searchTerm = searchTerm.replace(/\s+/g, '');
        }
        // GraphQL query to search products by name, description, or short description
        const graphqlQuery = `
      query SearchProducts($search: String!) {
        products(where: { search: $search }) {
          nodes {
            id: databaseId
            slug
            name
            type
            description
            shortDescription(format: RENDERED)
            ... on SimpleProduct {
              price
              regularPrice
            }
            ... on VariableProduct {
              price
              regularPrice
            }
            image {
              sourceUrl
              altText
            }
          }
        }
      }
    `;
        const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_CONFIG"].endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: graphqlQuery,
                variables: {
                    search: searchTerm
                }
            }),
            next: {
                revalidate: 30
            }
        });
        if (!response.ok) {
            console.error('[SearchService] Failed to fetch:', response.statusText);
            return {
                products: [],
                total: 0
            };
        }
        const data = await response.json();
        const products = data.data?.products?.nodes || [];
        // Transform data to match our Product type
        const transformedProducts = products.map((product)=>({
                id: String(product.id),
                name: product.name,
                slug: product.slug,
                price: product.price || undefined,
                regularPrice: product.regularPrice || undefined,
                description: product.description || undefined,
                image: product.image || undefined,
                shortDescription: product.shortDescription || undefined,
                type: product.type || 'simple'
            }));
        return {
            products: transformedProducts,
            total: transformedProducts.length
        };
    } catch (error) {
        console.error('[SearchService] Error searching products:', error);
        return {
            products: [],
            total: 0
        };
    }
}
}),
"[project]/sakwood-wp/frontend/components/search/SearchResults.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchResults",
    ()=>SearchResults
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SearchResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SearchResults() from the server but SearchResults is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/sakwood-wp/frontend/components/search/SearchResults.tsx <module evaluation>", "SearchResults");
}),
"[project]/sakwood-wp/frontend/components/search/SearchResults.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchResults",
    ()=>SearchResults
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SearchResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SearchResults() from the server but SearchResults is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/sakwood-wp/frontend/components/search/SearchResults.tsx", "SearchResults");
}),
"[project]/sakwood-wp/frontend/components/search/SearchResults.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$search$2f$SearchResults$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/search/SearchResults.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$search$2f$SearchResults$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/search/SearchResults.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$search$2f$SearchResults$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/sakwood-wp/frontend/app/[lang]/search/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchPage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$get$2d$dictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/get-dictionary.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$searchService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/searchService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$search$2f$SearchResults$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/search/SearchResults.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function generateMetadata({ params }) {
    const { lang } = await params;
    const isThai = lang === 'th';
    return {
        title: isThai ? 'ค้นหาสินค้า | Sakwood' : 'Search Products | Sakwood',
        description: isThai ? 'ค้นหาสินค้าไม้คุณภาพจาก Sakwood' : 'Search for premium wood products from Sakwood'
    };
}
async function SearchPage({ params, searchParams }) {
    const { lang } = await params;
    const { q: searchQuery } = await searchParams;
    // Redirect if no search query
    if (!searchQuery) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/${lang}`);
    }
    const dictionary = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$get$2d$dictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDictionary"])(lang);
    // Search for products
    const searchResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$searchService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchProducts"])(searchQuery, lang);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$search$2f$SearchResults$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SearchResults"], {
        lang: lang,
        dictionary: dictionary,
        searchQuery: searchQuery,
        initialResults: searchResults
    }, void 0, false, {
        fileName: "[project]/sakwood-wp/frontend/app/[lang]/search/page.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/sakwood-wp/frontend/app/[lang]/search/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sakwood-wp/frontend/app/[lang]/search/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e7ddd34d._.js.map