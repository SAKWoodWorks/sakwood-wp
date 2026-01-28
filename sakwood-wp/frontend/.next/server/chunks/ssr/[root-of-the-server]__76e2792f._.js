module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},27313,a=>{a.n(a.i(63556))},2161,a=>{a.n(a.i(81191))},33506,a=>{a.n(a.i(18483))},87731,a=>{a.n(a.i(30807))},81605,a=>{a.n(a.i(89365))},68066,a=>{a.n(a.i(11024))},3915,a=>{a.n(a.i(16224))},3986,a=>{a.n(a.i(90933))},90059,a=>{"use strict";a.s(["SearchResults",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call SearchResults() from the server but SearchResults is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/search/SearchResults.tsx <module evaluation>","SearchResults")},92656,a=>{"use strict";a.s(["SearchResults",()=>b]);let b=(0,a.i(30733).registerClientReference)(function(){throw Error("Attempted to call SearchResults() from the server but SearchResults is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/sakwood-wp/frontend/components/search/SearchResults.tsx","SearchResults")},23458,a=>{"use strict";a.i(90059);var b=a.i(92656);a.n(b)},8763,a=>{"use strict";var b=a.i(91854);a.i(87236);var c=a.i(97790),d=a.i(90132),e=a.i(31641);async function f(a,b="th"){if(!a||0===a.trim().length)return{products:[],total:0};try{let c=a.trim();"th"===b&&(c=c.replace(/\s+/g,""));let d=`
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
    `,f=await fetch(e.API_CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:d,variables:{search:c}}),next:{revalidate:30}});if(!f.ok)return console.error("[SearchService] Failed to fetch:",f.statusText),{products:[],total:0};let g=await f.json(),h=(g.data?.products?.nodes||[]).map(a=>({id:String(a.id),name:a.name,slug:a.slug,price:a.price||void 0,regularPrice:a.regularPrice||void 0,description:a.description||void 0,image:a.image||void 0,shortDescription:a.shortDescription||void 0,type:a.type||"simple"}));return{products:h,total:h.length}}catch(a){return console.error("[SearchService] Error searching products:",a),{products:[],total:0}}}var g=a.i(23458);async function h({params:a}){let{lang:b}=await a,c="th"===b;return{title:c?"ค้นหาสินค้า | Sakwood":"Search Products | Sakwood",description:c?"ค้นหาสินค้าไม้คุณภาพจาก Sakwood":"Search for premium wood products from Sakwood"}}async function i({params:a,searchParams:e}){let{lang:h}=await a,{q:i}=await e;i||(0,c.redirect)(`/${h}`);let j=await (0,d.getDictionary)(h),k=await f(i,h);return(0,b.jsx)(g.SearchResults,{lang:h,dictionary:j,searchQuery:i,initialResults:k})}a.s(["default",()=>i,"generateMetadata",()=>h],8763)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__76e2792f._.js.map