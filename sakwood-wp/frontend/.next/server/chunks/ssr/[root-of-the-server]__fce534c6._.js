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
`;a.s(["GET_BLOG_POSTS_QUERY",0,h,"GET_BLOG_POST_QUERY",0,i,"GET_HERO_SLIDES_QUERY",0,e,"GET_PRODUCTS_QUERY",0,f,"GET_PRODUCT_CATEGORIES_QUERY",0,d,"GET_PRODUCT_QUERY",0,g],93713)},77015,a=>{"use strict";var b=a.i(55503),c=a.i(93713),d=a.i(31641);function e(a){if(!a)return;let b=function(a){if(a)return a.replace("http://sak_wp:80/","http://localhost:8006/")}(a.sourceUrl);if(b)return{...a,sourceUrl:b}}async function f(){try{let a=await (0,b.graphqlRequest)(c.GET_PRODUCT_CATEGORIES_QUERY);return a?.productCategories?.nodes||[]}catch(a){return console.error("Error fetching product categories:",a),[]}}function g(a){if(!a)return 0;let b=parseFloat(a.replace(/[฿$,,\s]/g,""));return isNaN(b)?0:b}async function h(a="th",b,c){try{let e="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",f=`${e}/wp-json/sakwood/v1/products?language=${a}&per_page=${d.APP_CONFIG.productsPerPage}`;b&&(f+=`&category=${encodeURIComponent(b)}`);let h=await fetch(f);if(!h.ok)return console.error("Failed to fetch products:",h.status),i(a);let j=await h.json();if(!Array.isArray(j)||0===j.length)return[];let k=j.map(a=>({id:String(a.id),databaseId:a.databaseId,name:a.name,slug:a.slug,sku:a.sku||void 0,language:a.language||"th",price:a.price||a.prices?.piece||void 0,regularPrice:a.regularPrice||void 0,priceTypes:a.priceTypes||["piece"],prices:a.prices||{},image:a.image?{sourceUrl:a.image.sourceUrl}:void 0,description:"",galleryImages:void 0,thickness:a.thickness||void 0,width:a.width||void 0,length:a.length||void 0,categories:a.categories?a.categories.map(a=>({id:a.id,name:a.name,slug:a.slug})):void 0}));if(c){let a=[...k];switch(c){case"name":return a.sort((a,b)=>a.name.localeCompare(b.name,"th"));case"price":return a.sort((a,b)=>g(a.price)-g(b.price));case"date":return a.sort((a,b)=>b.databaseId-a.databaseId);default:return a}}return k}catch(b){return console.error("Error fetching products via REST API:",b),i(a)}}async function i(a="th"){let d=await (0,b.graphqlRequest)(c.GET_PRODUCTS_QUERY,{first:10});return(d?.products?.nodes||[]).map(a=>({...a,image:a.image?e(a.image):void 0,categories:a.productCategories?.nodes?.map(a=>({id:a.id,name:a.name,slug:a.slug}))||[]}))}async function j(a,b="th"){try{let c=encodeURIComponent(a),d="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",e=`${d}/wp-json/sakwood/v1/products/${c}?language=${b}`,f=await fetch(e);if(!f.ok){if(404===f.status)return null;return console.error("Failed to fetch product:",f.status),k(a)}let g=await f.json();if(!g||"product_not_found"===g.code)return null;return{id:String(g.id),databaseId:g.databaseId,name:g.name,slug:g.slug,sku:g.sku||void 0,language:g.language||"th",price:g.price||g.prices?.piece||void 0,regularPrice:g.regularPrice||void 0,priceTypes:g.priceTypes||["piece"],prices:g.prices||{},image:g.image?{sourceUrl:g.image.sourceUrl}:void 0,description:g.description||"",galleryImages:g.galleryImages?{nodes:g.galleryImages.nodes||[]}:void 0,thickness:g.thickness||void 0,width:g.width||void 0,length:g.length||void 0}}catch(b){return console.error("Error fetching product via REST API:",b),k(a)}}async function k(a){let d=await (0,b.graphqlRequest)(c.GET_PRODUCT_QUERY,{slug:a}),f=d?.product;return f?{...f,image:e(f.image),galleryImages:f.galleryImages?{nodes:f.galleryImages.nodes.map(e).filter(a=>void 0!==a)}:void 0}:null}a.s(["getProductBySlug",()=>j,"getProductCategories",()=>f,"getProducts",()=>h])},26147,a=>{"use strict";a.s(["PriceTable",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call PriceTable() from the server but PriceTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/PriceTable.tsx <module evaluation>","PriceTable")},67590,a=>{"use strict";a.s(["PriceTable",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call PriceTable() from the server but PriceTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/products/PriceTable.tsx","PriceTable")},10077,a=>{"use strict";a.i(26147);var b=a.i(67590);a.n(b)},7544,a=>{"use strict";var b=a.i(91854),c=a.i(10077),d=a.i(77015),e=a.i(90132),f=a.i(69570);async function g({params:a}){let{lang:b}=await a,c="th"===b;return{title:c?"ราคาสินค้า | Sakwood":"Price List | Sakwood",description:c?"ตารางราคาสินค้าไม้ทั้งหมด เปรียบเทียบราคาและสเปกสินค้าได้ที่นี่ Sakwood":"Complete product price list. Compare prices and specifications at Sakwood"}}async function h({params:a}){let{lang:g}=await a,h=await (0,e.getDictionary)(g),i=await (0,d.getProducts)(g),j=[{name:h.common.home,href:`/${g}`},{name:"th"===g?"ราคาสินค้า":"Price List",href:`/${g}/price-list`}];return(0,b.jsx)("main",{className:"min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-12",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-6",children:[(0,b.jsx)(f.Breadcrumbs,{items:j,lang:g}),(0,b.jsxs)("div",{className:"mb-8 text-center",children:[(0,b.jsx)("h1",{className:"text-4xl font-bold text-gray-900 mb-4",children:"th"===g?"ราคาสินค้าทั้งหมด":"Complete Price List"}),(0,b.jsx)("p",{className:"text-lg text-gray-600 max-w-3xl mx-auto",children:"th"===g?"เปรียบเทียบราคาและคุณสมบัติสินค้าไม้ทั้งหมดของเรา สำหรับโครงการก่อสร้างและอุตสาหกรรม":"Compare prices and specifications of all our wood products for construction and industrial projects"})]}),(0,b.jsx)(c.PriceTable,{products:i,lang:g,dictionary:h}),(0,b.jsxs)("div",{className:"mt-12 bg-blue-900 text-white rounded-xl p-8 text-center",children:[(0,b.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"th"===g?"ต้องการคำปรึกษาเรื่องราคาสำหรับโครงการใหญ่?":"Need Pricing for Large Projects?"}),(0,b.jsx)("p",{className:"text-blue-100 mb-6 max-w-2xl mx-auto",children:"th"===g?"เราให้ราคาพิเศษสำหรับโครงการก่อสร้างและการสั่งซื้อจำนวนมาก ติดต่อเราเพื่อรับใบเสนอราคา":"We offer special pricing for construction projects and bulk orders. Contact us for a custom quote."}),(0,b.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[(0,b.jsx)("a",{href:`/${g}/quote`,className:"inline-block px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors",children:"th"===g?"ขอใบเสนอราคา":"Get a Quote"}),(0,b.jsx)("a",{href:`/${g}/contact`,className:"inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-colors",children:"th"===g?"ติดต่อเรา":"Contact Us"})]})]})]})})}a.s(["default",()=>h,"generateMetadata",()=>g])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__fce534c6._.js.map