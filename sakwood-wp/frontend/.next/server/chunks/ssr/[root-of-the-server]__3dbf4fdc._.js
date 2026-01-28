module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},27313,a=>{a.n(a.i(63556))},2161,a=>{a.n(a.i(81191))},33506,a=>{a.n(a.i(18483))},87731,a=>{a.n(a.i(30807))},81605,a=>{a.n(a.i(89365))},68066,a=>{a.n(a.i(11024))},3915,a=>{a.n(a.i(16224))},3986,a=>{a.n(a.i(90933))},55503,93713,a=>{"use strict";var b=a.i(31641);async function c(a,c){try{let d=await fetch(b.API_CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:a,variables:c}),cache:b.API_CONFIG.cache});if(!d.ok)throw Error(`HTTP error! status: ${d.status}`);let e=await d.json();if(e.errors)return console.error("GraphQL Errors:",e.errors.map(a=>a.message)),console.error("Full error details:",e.errors),null;return e.data}catch(a){return console.error("GraphQL request failed:",a),null}}a.s(["graphqlRequest",()=>c],55503);let d=`
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
`;a.s(["GET_BLOG_POSTS_QUERY",0,h,"GET_BLOG_POST_QUERY",0,i,"GET_HERO_SLIDES_QUERY",0,e,"GET_PRODUCTS_QUERY",0,f,"GET_PRODUCT_CATEGORIES_QUERY",0,d,"GET_PRODUCT_QUERY",0,g],93713)},77015,a=>{"use strict";var b=a.i(55503),c=a.i(93713),d=a.i(31641);function e(a){if(!a)return;let b=function(a){if(a)return a.replace("http://sak_wp:80/","http://localhost:8006/")}(a.sourceUrl);if(b)return{...a,sourceUrl:b}}async function f(){try{let a=await (0,b.graphqlRequest)(c.GET_PRODUCT_CATEGORIES_QUERY);return a?.productCategories?.nodes||[]}catch(a){return console.error("Error fetching product categories:",a),[]}}function g(a){if(!a)return 0;let b=parseFloat(a.replace(/[฿$,,\s]/g,""));return isNaN(b)?0:b}async function h(a="th",b,c){try{let e="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",f=`${e}/wp-json/sakwood/v1/products?language=${a}&per_page=${d.APP_CONFIG.productsPerPage}`;b&&(f+=`&category=${encodeURIComponent(b)}`);let h=await fetch(f);if(!h.ok)return console.error("Failed to fetch products:",h.status),i(a);let j=await h.json();if(!Array.isArray(j)||0===j.length)return[];let k=j.map(a=>({id:String(a.id),databaseId:a.databaseId,name:a.name,slug:a.slug,sku:a.sku||void 0,language:a.language||"th",price:a.price||a.prices?.piece||void 0,regularPrice:a.regularPrice||void 0,priceTypes:a.priceTypes||["piece"],prices:a.prices||{},image:a.image?{sourceUrl:a.image.sourceUrl}:void 0,description:"",galleryImages:void 0,thickness:a.thickness||void 0,width:a.width||void 0,length:a.length||void 0,categories:a.categories?a.categories.map(a=>({id:a.id,name:a.name,slug:a.slug})):void 0}));if(c){let a=[...k];switch(c){case"name":return a.sort((a,b)=>a.name.localeCompare(b.name,"th"));case"price":return a.sort((a,b)=>g(a.price)-g(b.price));case"date":return a.sort((a,b)=>b.databaseId-a.databaseId);default:return a}}return k}catch(b){return console.error("Error fetching products via REST API:",b),i(a)}}async function i(a="th"){let d=await (0,b.graphqlRequest)(c.GET_PRODUCTS_QUERY,{first:10});return(d?.products?.nodes||[]).map(a=>({...a,image:a.image?e(a.image):void 0,categories:a.productCategories?.nodes?.map(a=>({id:a.id,name:a.name,slug:a.slug}))||[]}))}async function j(a,b="th"){try{let c=encodeURIComponent(a),d="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",e=`${d}/wp-json/sakwood/v1/products/${c}?language=${b}`,f=await fetch(e);if(!f.ok){if(404===f.status)return null;return console.error("Failed to fetch product:",f.status),k(a)}let g=await f.json();if(!g||"product_not_found"===g.code)return null;return{id:String(g.id),databaseId:g.databaseId,name:g.name,slug:g.slug,sku:g.sku||void 0,language:g.language||"th",price:g.price||g.prices?.piece||void 0,regularPrice:g.regularPrice||void 0,priceTypes:g.priceTypes||["piece"],prices:g.prices||{},image:g.image?{sourceUrl:g.image.sourceUrl}:void 0,description:g.description||"",galleryImages:g.galleryImages?{nodes:g.galleryImages.nodes||[]}:void 0,thickness:g.thickness||void 0,width:g.width||void 0,length:g.length||void 0}}catch(b){return console.error("Error fetching product via REST API:",b),k(a)}}async function k(a){let d=await (0,b.graphqlRequest)(c.GET_PRODUCT_QUERY,{slug:a}),f=d?.product;return f?{...f,image:e(f.image),galleryImages:f.galleryImages?{nodes:f.galleryImages.nodes.map(e).filter(a=>void 0!==a)}:void 0}:null}a.s(["getProductBySlug",()=>j,"getProductCategories",()=>f,"getProducts",()=>h])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__3dbf4fdc._.js.map