module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},27313,a=>{a.n(a.i(63556))},2161,a=>{a.n(a.i(81191))},33506,a=>{a.n(a.i(18483))},87731,a=>{a.n(a.i(30807))},81605,a=>{a.n(a.i(89365))},68066,a=>{a.n(a.i(11024))},3915,a=>{a.n(a.i(16224))},3986,a=>{a.n(a.i(90933))},69570,a=>{"use strict";var b=a.i(91854),c=a.i(86045);function d({items:a,lang:d}){return(0,b.jsx)("nav",{className:"py-4 px-6 bg-slate-50 border-b border-slate-200","aria-label":"Breadcrumb navigation",children:(0,b.jsx)("div",{className:"max-w-7xl mx-auto",children:(0,b.jsx)("ol",{className:"flex items-center gap-2 text-sm text-slate-600",children:a.map((d,e)=>(0,b.jsxs)("li",{className:"flex items-center gap-2",children:[e>0&&(0,b.jsx)("span",{className:"text-slate-400","aria-hidden":"true",children:"/"}),e===a.length-1?(0,b.jsx)("span",{className:"font-medium text-slate-900","aria-current":"page",children:d.name}):(0,b.jsx)(c.default,{href:d.href,className:"hover:text-blue-600 transition-colors",children:d.name})]},d.href))})})})}a.s(["Breadcrumbs",()=>d])},55503,93713,a=>{"use strict";var b=a.i(31641);async function c(a,c){try{let d=await fetch(b.API_CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:a,variables:c}),cache:b.API_CONFIG.cache});if(!d.ok)throw Error(`HTTP error! status: ${d.status}`);let e=await d.json();if(e.errors)return console.error("GraphQL Errors:",e.errors.map(a=>a.message)),console.error("Full error details:",e.errors),null;return e.data}catch(a){return console.error("GraphQL request failed:",a),null}}a.s(["graphqlRequest",()=>c],55503);let d=`
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
`,e=`
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
`,f=`
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
`,g=`
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
`,h=`
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
`,i=`
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
`;a.s(["GET_BLOG_POSTS_QUERY",0,h,"GET_BLOG_POST_QUERY",0,i,"GET_HERO_SLIDES_QUERY",0,e,"GET_PRODUCTS_QUERY",0,f,"GET_PRODUCT_CATEGORIES_QUERY",0,d,"GET_PRODUCT_QUERY",0,g],93713)},77015,a=>{"use strict";var b=a.i(55503),c=a.i(93713),d=a.i(31641);function e(a){if(!a)return;let b=function(a){if(a)return a.replace("http://sak_wp:80/","http://localhost:8006/")}(a.sourceUrl);if(b)return{...a,sourceUrl:b}}async function f(){try{let a=await (0,b.graphqlRequest)(c.GET_PRODUCT_CATEGORIES_QUERY);return a?.productCategories?.nodes||[]}catch(a){return console.error("Error fetching product categories:",a),[]}}function g(a){if(!a)return 0;let b=parseFloat(a.replace(/[฿$,,\s]/g,""));return isNaN(b)?0:b}async function h(a="th",b,c){try{let e="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",f=`${e}/wp-json/sakwood/v1/products?language=${a}&per_page=${d.APP_CONFIG.productsPerPage}`;b&&(f+=`&category=${encodeURIComponent(b)}`);let h=await fetch(f);if(!h.ok)return console.error("Failed to fetch products:",h.status),i(a);let j=await h.json();if(!Array.isArray(j)||0===j.length)return[];let k=j.map(a=>({id:String(a.id),databaseId:a.databaseId,name:a.name,slug:a.slug,sku:a.sku||void 0,language:a.language||"th",price:a.price||a.prices?.piece||void 0,regularPrice:a.regularPrice||void 0,priceTypes:a.priceTypes||["piece"],prices:a.prices||{},image:a.image?{sourceUrl:a.image.sourceUrl}:void 0,description:"",galleryImages:void 0,thickness:a.thickness||void 0,width:a.width||void 0,length:a.length||void 0,categories:a.categories?a.categories.map(a=>({id:a.id,name:a.name,slug:a.slug})):void 0}));if(c){let a=[...k];switch(c){case"name":return a.sort((a,b)=>a.name.localeCompare(b.name,"th"));case"price":return a.sort((a,b)=>g(a.price)-g(b.price));case"date":return a.sort((a,b)=>b.databaseId-a.databaseId);default:return a}}return k}catch(b){return console.error("Error fetching products via REST API:",b),i(a)}}async function i(a="th"){let d=await (0,b.graphqlRequest)(c.GET_PRODUCTS_QUERY,{first:10});return(d?.products?.nodes||[]).map(a=>({...a,image:a.image?e(a.image):void 0,categories:a.productCategories?.nodes?.map(a=>({id:a.id,name:a.name,slug:a.slug}))||[]}))}async function j(a,b="th"){try{let c=encodeURIComponent(a),d="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",e=`${d}/wp-json/sakwood/v1/products/${c}?language=${b}`,f=await fetch(e);if(!f.ok){if(404===f.status)return null;return console.error("Failed to fetch product:",f.status),k(a)}let g=await f.json();if(!g||"product_not_found"===g.code)return null;return{id:String(g.id),databaseId:g.databaseId,name:g.name,slug:g.slug,sku:g.sku||void 0,language:g.language||"th",price:g.price||g.prices?.piece||void 0,regularPrice:g.regularPrice||void 0,priceTypes:g.priceTypes||["piece"],prices:g.prices||{},image:g.image?{sourceUrl:g.image.sourceUrl}:void 0,description:g.description||"",galleryImages:g.galleryImages?{nodes:g.galleryImages.nodes||[]}:void 0,thickness:g.thickness||void 0,width:g.width||void 0,length:g.length||void 0}}catch(b){return console.error("Error fetching product via REST API:",b),k(a)}}async function k(a){let d=await (0,b.graphqlRequest)(c.GET_PRODUCT_QUERY,{slug:a}),f=d?.product;return f?{...f,image:e(f.image),galleryImages:f.galleryImages?{nodes:f.galleryImages.nodes.map(e).filter(a=>void 0!==a)}:void 0}:null}a.s(["getProductBySlug",()=>j,"getProductCategories",()=>f,"getProducts",()=>h])},88873,a=>{"use strict";a.s(["ProductImageGallery",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call ProductImageGallery() from the server but ProductImageGallery is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx <module evaluation>","ProductImageGallery")},76468,a=>{"use strict";a.s(["ProductImageGallery",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call ProductImageGallery() from the server but ProductImageGallery is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/ProductImageGallery.tsx","ProductImageGallery")},17151,a=>{"use strict";a.i(88873);var b=a.i(76468);a.n(b)},82874,a=>{"use strict";a.s(["ProductInfo",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call ProductInfo() from the server but ProductInfo is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx <module evaluation>","ProductInfo")},93241,a=>{"use strict";a.s(["ProductInfo",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call ProductInfo() from the server but ProductInfo is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/ProductInfo.tsx","ProductInfo")},89601,a=>{"use strict";a.i(82874);var b=a.i(93241);a.n(b)},30991,a=>{"use strict";a.s(["RelatedProductsCarousel",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call RelatedProductsCarousel() from the server but RelatedProductsCarousel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/RelatedProductsCarousel.tsx <module evaluation>","RelatedProductsCarousel")},24204,a=>{"use strict";a.s(["RelatedProductsCarousel",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call RelatedProductsCarousel() from the server but RelatedProductsCarousel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/RelatedProductsCarousel.tsx","RelatedProductsCarousel")},97684,a=>{"use strict";a.i(30991);var b=a.i(24204);a.n(b)},35279,a=>{"use strict";var b=a.i(91854);a.i(87236);var c=a.i(97790),d=a.i(69570),e=a.i(17151),f=a.i(89601);function g({product:a,dictionary:c}){let{product:d}=c,e=[];a.thickness&&e.push(`${a.thickness}cm`),a.width&&e.push(`${a.width}cm`),a.length&&e.push(`${a.length}m`);let f=e.length>0?e.join(" × "):d.standard_size,g=[{label:d.material_label,value:d.wood_type},{label:d.dimensions_label,value:f},{label:d.weight_label,value:d.standard_weight},{label:d.grade_label,value:d.grade_a},{label:d.origin_label,value:d.imported}];return(0,b.jsxs)("section",{className:"mb-16","aria-labelledby":"product-specifications-heading",children:[(0,b.jsx)("h2",{id:"product-specifications-heading",className:"text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-blue-900",children:d.specifications_title}),(0,b.jsx)("div",{className:"bg-gray-50 rounded-lg p-6",children:(0,b.jsx)("div",{className:"grid md:grid-cols-2 gap-6",children:g.map((a,c)=>(0,b.jsxs)("div",{className:`flex justify-between items-start ${c%2==0?"md:pr-6 md:border-r md:border-gray-200":""}`,children:[(0,b.jsxs)("span",{className:"text-gray-500 font-medium",children:[a.label,":"]}),(0,b.jsx)("span",{className:"text-blue-900 font-semibold",children:a.value})]},c))})})]})}var h=a.i(97684),i=a.i(17694);function j({product:a,lang:c,siteUrl:d="https://sakwood.com"}){if(!a)return null;let e={"@context":"https://schema.org","@type":"Product",name:a.name,description:a.description||`Quality ${a.name} from Sakwood`,image:a.image?.sourceUrl||`${d}/og-image.jpg`,url:`${d}/${c}/products/${a.slug}`,sku:a.databaseId?.toString()||a.id,offers:{"@type":"Offer",availability:"https://schema.org/InStock",priceCurrency:"THB",url:`${d}/${c}/products/${a.slug}`,seller:{"@type":"Organization",name:"Sakwood",url:d}},additionalProperty:[{"@type":"PropertyValue",name:"Category",value:"Wood Products"},{"@type":"PropertyValue",name:"Material",value:"Pine Wood"}]},f={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${d}/${c}`},{"@type":"ListItem",position:2,name:"Products",item:`${d}/${c}/shop`},{"@type":"ListItem",position:3,name:a.name,item:`${d}/${c}/products/${a.slug}`}]};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(e)}}),(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(f)}})]})}var k=a.i(77015),l=a.i(90132);async function m({params:a}){let{lang:b,slug:c}=await a,d=await (0,k.getProductBySlug)(c,b),e="http://localhost:3000",f="th"===b;if(!d)return{title:"Product Not Found"};let g=d.name||"Wood Product",h=d.description?.substring(0,160)||`Quality ${g} from Sakwood - Thailand's trusted wood supplier`,i=d.image?.sourceUrl||`${e}/og-image.jpg`;return{title:g,description:h,keywords:[g,f?"ไม้":"wood",f?"ไม้สน":"pine wood",f?"เพลย์วูด":"plywood",f?"ไม้ก่อสร้าง":"construction timber","Sakwood",f?"ขายส่งไม้":"wholesale wood"],openGraph:{title:g,description:h,url:`${e}/${b}/products/${c}`,siteName:"Sakwood",images:[{url:i,width:1200,height:630,alt:g}]},twitter:{card:"summary_large_image",title:g,description:h,images:[i]},alternates:{canonical:`/${b}/products/${c}`}}}async function n({params:a}){let{lang:m,slug:n}=await a,o=await (0,l.getDictionary)(m),{common:p,product:q,popup:r}=o,s=await (0,k.getProductBySlug)(n,m),t=await (0,k.getProducts)(m);if(!s)return(0,c.notFound)();let u=[{name:p.home,href:`/${m}`},{name:p.products,href:`/${m}/shop`},{name:s.name,href:`/${m}/products/${n}`}];return(0,b.jsxs)("main",{className:"min-h-screen",children:[(0,b.jsx)(j,{product:s,lang:m,siteUrl:"http://localhost:3000"}),(0,b.jsx)(d.Breadcrumbs,{items:u,lang:m}),(0,b.jsx)("div",{className:"bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8",children:(0,b.jsx)("div",{className:"max-w-7xl mx-auto px-6",children:(0,b.jsx)("h1",{className:"text-3xl md:text-4xl font-bold",children:s.name||s.slug})})}),(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-6 py-12",children:[(0,b.jsxs)("div",{className:"grid lg:grid-cols-2 gap-12 mb-16",children:[(0,b.jsx)(e.ProductImageGallery,{product:s}),(0,b.jsx)(f.ProductInfo,{product:s,lang:m,dictionary:o})]}),(0,b.jsx)(g,{product:s,dictionary:o}),(0,b.jsx)(h.RelatedProductsCarousel,{products:t.filter(a=>a.id!==s.id).slice(0,8),lang:m,dictionary:o})]}),(0,b.jsx)(i.PromotionalPopup,{})]})}a.s(["default",()=>n,"generateMetadata",()=>m,"revalidate",0,300],35279)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__da827065._.js.map