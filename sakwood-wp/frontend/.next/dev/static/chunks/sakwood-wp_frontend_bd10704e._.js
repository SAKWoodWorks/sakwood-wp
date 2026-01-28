(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sakwood-wp/frontend/lib/graphql/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "graphqlRequest",
    ()=>graphqlRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/config/constants.ts [app-client] (ecmascript)");
;
async function graphqlRequest(query, variables) {
    try {
        const res = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            }),
            cache: __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].cache
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        if (json.errors) {
            console.error('GraphQL Errors:', json.errors.map((e)=>e.message));
            console.error('Full error details:', json.errors);
            return null;
        }
        return json.data;
    } catch (error) {
        console.error('GraphQL request failed:', error);
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/graphql/queries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET_BLOG_POSTS_QUERY",
    ()=>GET_BLOG_POSTS_QUERY,
    "GET_BLOG_POST_QUERY",
    ()=>GET_BLOG_POST_QUERY,
    "GET_HERO_SLIDES_QUERY",
    ()=>GET_HERO_SLIDES_QUERY,
    "GET_MENU_QUERY",
    ()=>GET_MENU_QUERY,
    "GET_PRODUCTS_QUERY",
    ()=>GET_PRODUCTS_QUERY,
    "GET_PRODUCT_CATEGORIES_QUERY",
    ()=>GET_PRODUCT_CATEGORIES_QUERY,
    "GET_PRODUCT_QUERY",
    ()=>GET_PRODUCT_QUERY,
    "GET_PROMO_BANNERS_QUERY",
    ()=>GET_PROMO_BANNERS_QUERY
]);
const GET_PRODUCT_CATEGORIES_QUERY = `
  query GetProductCategories {
    productCategories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
        description
      }
    }
  }
`;
const GET_HERO_SLIDES_QUERY = `
  query GetHeroSlides {
    heroSlides(first: 10, where: {status: PUBLISH}) {
      nodes {
        id
        title
        slug
        status
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        slideSubtitle
        slideDescription
        slideCtaText
        slideCtaLink
        slideTextColor
        slideOverlay
        slidePosition
        slideVideo
      }
    }
  }
`;
const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int) {
    products(first: $first) {
      nodes {
        id
        databaseId
        name
        slug
        image {
          sourceUrl
        }
        width
        length
        thickness
        volume
        productCategories {
          nodes {
            id
            name
            slug
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
        }
      }
    }
  }
`;
const GET_PRODUCT_QUERY = `
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      image {
        sourceUrl
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      width
      length
      thickness
      volume
      ... on SimpleProduct {
        price
        regularPrice
      }
    }
  }
`;
const GET_MENU_QUERY = `
  query GetMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        path
        url
        target
        description
        parentId
        order
      }
    }
  }
`;
const GET_BLOG_POSTS_QUERY = `
  query GetBlogPosts($first: Int) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;
const GET_BLOG_POST_QUERY = `
  query GetBlogPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;
const GET_PROMO_BANNERS_QUERY = `
  query GetPromoBanners {
    promoBanners(first: 20, where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        databaseId
        title
        slug
        date
        bannerType
        bannerContentTh
        bannerContentEn
        bannerLink
        buttonTextTh
        buttonTextEn
        backgroundColor
        textColor
        bannerImage {
          sourceUrl
          altText
          mediaItemId
        }
        scheduleStart
        scheduleEnd
        targeting {
          deviceTypes
          showOnPages
          visitorType
          maxImpressions
          displayDelay
        }
        abTestGroup
        isActive
      }
    }
  }
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/lib/services/productService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductCategories",
    ()=>getProductCategories,
    "getProducts",
    ()=>getProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/graphql/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/graphql/queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/config/constants.ts [app-client] (ecmascript)");
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
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphqlRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GET_PRODUCT_CATEGORIES_QUERY"]);
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
        let url = `${baseUrl}/wp-json/sakwood/v1/products?language=${language}&per_page=${__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].productsPerPage}`;
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
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphqlRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GET_PRODUCTS_QUERY"], {
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
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphqlRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$graphql$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GET_PRODUCT_QUERY"], {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShopPage",
    ()=>ShopPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/components/ui/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/lib/services/productService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ShopPage({ lang, dictionary, initialProducts, initialCategories }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort');
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialProducts);
    const [categories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCategories);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(categoryParam);
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(sortParam);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Update products when category or sort changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": ()=>{
            async function loadProducts() {
                setIsLoading(true);
                const fetchedProducts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProducts"])(lang, selectedCategory || undefined, sortBy || undefined);
                setProducts(fetchedProducts);
                setIsLoading(false);
            }
            loadProducts();
        }
    }["ShopPage.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-gray-50 to-white py-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-5xl font-bold text-gray-900 mb-4",
                            children: dictionary.shop.title
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-12 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-4 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleCategoryChange(null),
                                                className: `px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === null ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                                children: dictionary.shop.all_categories
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleCategoryChange(category.slug),
                                                    className: `px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.slug ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                                    children: [
                                                        category.name,
                                                        category.count !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSortChange('name'),
                                            className: `px-4 py-2 rounded-lg font-medium transition-all ${sortBy === 'name' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                            children: dictionary.shop.sort_name || 'Name'
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSortChange('price'),
                                            className: `px-4 py-2 rounded-lg font-medium transition-all ${sortBy === 'price' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`,
                                            children: dictionary.shop.sort_price || 'Price'
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                }, this) : products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
                    children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$components$2f$ui$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
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
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-400 text-6xl mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-24 h-24 mx-auto",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-gray-700 mb-2",
                            children: dictionary.shop.no_products
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 mb-6",
                            children: dictionary.shop.no_products_desc
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/app/[lang]/shop/ShopPage.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(ShopPage, "Jaiv+3YWFf2Oxo+lYPXqVySeNl4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ShopPage;
var _c;
__turbopack_context__.k.register(_c, "ShopPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sakwood-wp_frontend_bd10704e._.js.map