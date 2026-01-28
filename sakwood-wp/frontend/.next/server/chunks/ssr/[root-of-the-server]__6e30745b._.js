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
`;a.s(["GET_BLOG_POSTS_QUERY",0,h,"GET_BLOG_POST_QUERY",0,i,"GET_HERO_SLIDES_QUERY",0,e,"GET_PRODUCTS_QUERY",0,f,"GET_PRODUCT_CATEGORIES_QUERY",0,d,"GET_PRODUCT_QUERY",0,g],93713)},86852,(a,b,c)=>{"use strict";c._=function(a){return a&&a.__esModule?a:{default:a}}},38008,(a,b,c)=>{b.exports=a.x("jsdom-f1e0fc037e6ac353",()=>require("jsdom-f1e0fc037e6ac353"))},5624,a=>{"use strict";var b=a.i(91854);function c({cssSelectors:a=[".article-content",".kb-content",".prose"],xpaths:c}){let d=function a(b){if(null!=b){if(Array.isArray(b))return b.map(a).filter(a=>void 0!==a);if("object"==typeof b){let c={};for(let d in b){let e=a(b[d]);void 0!==e&&(c[d]=e)}return c}return b}}({"@context":"https://schema.org","@type":"Article",speakable:{"@type":"SpeakableSpecification",...a.length>0&&{cssSelector:a},...c&&c.length>0&&{xpath:c}}});return(0,b.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(d)}})}a.s(["SpeakableStructuredData",()=>c])},58180,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"warnOnce",{enumerable:!0,get:function(){return d}});let d=a=>{}},35814,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={getDeploymentId:function(){return f},getDeploymentIdQueryOrEmptyString:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(){return!1}function g(){return""}},86492,(a,b,c)=>{"use strict";function d({widthInt:a,heightInt:b,blurWidth:c,blurHeight:d,blurDataURL:e,objectFit:f}){let g=c?40*c:a,h=d?40*d:b,i=g&&h?`viewBox='0 0 ${g} ${h}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${i}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${i?"none":"contain"===f?"xMidYMid":"cover"===f?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${e}'/%3E%3C/svg%3E`}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImageBlurSvg",{enumerable:!0,get:function(){return d}})},95253,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={VALID_LOADERS:function(){return f},imageConfigDefault:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=["default","imgix","cloudinary","akamai","custom"],g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},69438,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImgProps",{enumerable:!0,get:function(){return j}}),a.r(58180);let d=a.r(35814),e=a.r(86492),f=a.r(95253),g=["-moz-initial","fill","none","scale-down",void 0];function h(a){return void 0!==a.default}function i(a){return void 0===a?a:"number"==typeof a?Number.isFinite(a)?a:NaN:"string"==typeof a&&/^[0-9]+$/.test(a)?parseInt(a,10):NaN}function j({src:a,sizes:b,unoptimized:c=!1,priority:j=!1,preload:k=!1,loading:l,className:m,quality:n,width:o,height:p,fill:q=!1,style:r,overrideSrc:s,onLoad:t,onLoadingComplete:u,placeholder:v="empty",blurDataURL:w,fetchPriority:x,decoding:y="async",layout:z,objectFit:A,objectPosition:B,lazyBoundary:C,lazyRoot:D,...E},F){var G;let H,I,J,{imgConf:K,showAltText:L,blurComplete:M,defaultLoader:N}=F,O=K||f.imageConfigDefault;if("allSizes"in O)H=O;else{let a=[...O.deviceSizes,...O.imageSizes].sort((a,b)=>a-b),b=O.deviceSizes.sort((a,b)=>a-b),c=O.qualities?.sort((a,b)=>a-b);H={...O,allSizes:a,deviceSizes:b,qualities:c}}if(void 0===N)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let P=E.loader||N;delete E.loader,delete E.srcSet;let Q="__next_img_default"in P;if(Q){if("custom"===H.loader)throw Object.defineProperty(Error(`Image with src "${a}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let a=P;P=b=>{let{config:c,...d}=b;return a(d)}}if(z){"fill"===z&&(q=!0);let a={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[z];a&&(r={...r,...a});let c={responsive:"100vw",fill:"100vw"}[z];c&&!b&&(b=c)}let R="",S=i(o),T=i(p);if((G=a)&&"object"==typeof G&&(h(G)||void 0!==G.src)){let b=h(a)?a.default:a;if(!b.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!b.height||!b.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(I=b.blurWidth,J=b.blurHeight,w=w||b.blurDataURL,R=b.src,!q)if(S||T){if(S&&!T){let a=S/b.width;T=Math.round(b.height*a)}else if(!S&&T){let a=T/b.height;S=Math.round(b.width*a)}}else S=b.width,T=b.height}let U=!j&&!k&&("lazy"===l||void 0===l);(!(a="string"==typeof a?a:R)||a.startsWith("data:")||a.startsWith("blob:"))&&(c=!0,U=!1),H.unoptimized&&(c=!0),Q&&!H.dangerouslyAllowSVG&&a.split("?",1)[0].endsWith(".svg")&&(c=!0);let V=i(n),W=Object.assign(q?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:A,objectPosition:B}:{},L?{}:{color:"transparent"},r),X=M||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,e.getImageBlurSvg)({widthInt:S,heightInt:T,blurWidth:I,blurHeight:J,blurDataURL:w||"",objectFit:W.objectFit})}")`:`url("${v}")`,Y=g.includes(W.objectFit)?"fill"===W.objectFit?"100% 100%":"cover":W.objectFit,Z=X?{backgroundSize:Y,backgroundPosition:W.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},$=function({config:a,src:b,unoptimized:c,width:e,quality:f,sizes:g,loader:h}){if(c){let a=(0,d.getDeploymentId)();if(b.startsWith("/")&&!b.startsWith("//")&&a){let c=b.includes("?")?"&":"?";b=`${b}${c}dpl=${a}`}return{src:b,srcSet:void 0,sizes:void 0}}let{widths:i,kind:j}=function({deviceSizes:a,allSizes:b},c,d){if(d){let c=/(^|\s)(1?\d?\d)vw/g,e=[];for(let a;a=c.exec(d);)e.push(parseInt(a[2]));if(e.length){let c=.01*Math.min(...e);return{widths:b.filter(b=>b>=a[0]*c),kind:"w"}}return{widths:b,kind:"w"}}return"number"!=typeof c?{widths:a,kind:"w"}:{widths:[...new Set([c,2*c].map(a=>b.find(b=>b>=a)||b[b.length-1]))],kind:"x"}}(a,e,g),k=i.length-1;return{sizes:g||"w"!==j?g:"100vw",srcSet:i.map((c,d)=>`${h({config:a,src:b,quality:f,width:c})} ${"w"===j?c:d+1}${j}`).join(", "),src:h({config:a,src:b,quality:f,width:i[k]})}}({config:H,src:a,unoptimized:c,width:S,quality:V,sizes:b,loader:P}),_=U?"lazy":l;return{props:{...E,loading:_,fetchPriority:x,width:S,height:T,decoding:y,className:m,style:{...W,...Z},sizes:$.sizes,srcSet:$.srcSet,src:s||$.src},meta:{unoptimized:c,preload:k||j,placeholder:v,fill:q}}}},6701,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(30733);a.n(d("[project]/sakwood-wp/frontend/node_modules/next/dist/client/image-component.js <module evaluation>"))},91620,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(30733);a.n(d("[project]/sakwood-wp/frontend/node_modules/next/dist/client/image-component.js"))},59994,a=>{"use strict";a.i(6701);var b=a.i(91620);a.n(b)},30918,(a,b,c)=>{"use strict";function d(a,b){let c=a||75;return b?.qualities?.length?b.qualities.reduce((a,b)=>Math.abs(b-c)<Math.abs(a-c)?b:a,0):c}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"findClosestQuality",{enumerable:!0,get:function(){return d}})},20837,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return g}});let d=a.r(30918),e=a.r(35814);function f({config:a,src:b,width:c,quality:f}){if(b.startsWith("/")&&b.includes("?")&&a.localPatterns?.length===1&&"**"===a.localPatterns[0].pathname&&""===a.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${b}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let g=(0,d.findClosestQuality)(f,a),h=(0,e.getDeploymentId)();return`${a.path}?url=${encodeURIComponent(b)}&w=${c}&q=${g}${b.startsWith("/")&&h?`&dpl=${h}`:""}`}f.__next_img_default=!0;let g=f},2521,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return k},getImageProps:function(){return j}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(86852),g=a.r(69438),h=a.r(59994),i=f._(a.r(20837));function j(a){let{props:b}=(0,g.getImgProps)(a,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[a,c]of Object.entries(b))void 0===c&&delete b[a];return{props:b}}let k=h.Image},11397,(a,b,c)=>{b.exports=a.r(2521)},56472,a=>{"use strict";var b=a.i(55503),c=a.i(93713),d=a.i(31641);function e(a){if(!a)return;let b=function(a){if(a)return a.replace("http://sak_wp:80/","http://localhost:8006/")}(a.node.sourceUrl);if(b)return{node:{...a.node,sourceUrl:b}}}let f=[{id:"1",title:"Choosing the Right Plywood for Your Project",slug:"choosing-right-plywood",excerpt:"Learn about the different types of plywood and how to select the best one for your construction needs.",date:new Date().toISOString(),featuredImage:{node:{sourceUrl:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",altText:"Plywood sheets stacked"}},author:{node:{name:"SAK WoodWorks Team"}},categories:{nodes:[{name:"Tips & Guides",slug:"tips-guides"}]},tags:{nodes:[]}},{id:"2",title:"Understanding Wood Grades and Specifications",slug:"understanding-wood-grades",excerpt:"A comprehensive guide to wood grades, what they mean, and how they affect your construction projects.",date:new Date(Date.now()-6048e5).toISOString(),featuredImage:{node:{sourceUrl:"https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&auto=format&fit=crop",altText:"Wood texture close-up"}},author:{node:{name:"SAK WoodWorks Team"}},categories:{nodes:[{name:"Education",slug:"education"}]},tags:{nodes:[]}},{id:"3",title:"Sustainable Sourcing in the Timber Industry",slug:"sustainable-sourcing-timber",excerpt:"How the timber industry is embracing sustainable practices and what it means for your projects.",date:new Date(Date.now()-12096e5).toISOString(),featuredImage:{node:{sourceUrl:"https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&auto=format&fit=crop",altText:"Forest with trees"}},author:{node:{name:"SAK WoodWorks Team"}},categories:{nodes:[{name:"Sustainability",slug:"sustainability"}]},tags:{nodes:[]}}];async function g(a="th"){try{let b="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",c=`${b}/wp-json/sakwood/v1/posts?language=${a}&per_page=${d.APP_CONFIG.blogPerPage}`,f=await fetch(c);if(!f.ok)return console.error("Failed to fetch blog posts:",f.status),h();let g=await f.json();if(!Array.isArray(g)||0===g.length)return[];return g.map(a=>({...a,featuredImage:e(a.featuredImage)}))}catch(a){return console.error("Error fetching blog posts via REST API:",a),h()}}async function h(){try{let a=await (0,b.graphqlRequest)(c.GET_BLOG_POSTS_QUERY,{first:10});return(a?.posts?.nodes||[]).map(a=>({...a,featuredImage:e(a.featuredImage)}))}catch(a){return console.error("Failed to fetch blog posts via GraphQL:",a),f}}async function i(a,b="th"){try{let c=encodeURIComponent(a),d="http://localhost:8006/graphql".replace("/graphql","")||"http://localhost:8006",f=`${d}/wp-json/sakwood/v1/posts/${c}?language=${b}`,g=await fetch(f);if(!g.ok){if(404===g.status)return null;return console.error("Failed to fetch blog post:",g.status),j(a)}let h=await g.json();if(!h||"post_not_found"===h.code)return null;return{...h,featuredImage:e(h.featuredImage)}}catch(b){return console.error("Error fetching blog post via REST API:",b),j(a)}}async function j(a){try{let d=await (0,b.graphqlRequest)(c.GET_BLOG_POST_QUERY,{slug:a}),f=d?.post;if(!f)return null;return{...f,featuredImage:e(f.featuredImage)}}catch(a){return console.error("Failed to fetch blog post via GraphQL:",a),null}}a.s(["getBlogPostBySlug",()=>i,"getBlogPosts",()=>g])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__6e30745b._.js.map