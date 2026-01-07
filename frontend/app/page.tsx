import Image from "next/image";

async function getProducts() {
  // Fetch data from the internal WordPress container (sak_wp)
  const query = `
    query GetProducts {
      products(first: 6) {
        nodes {
          id
          name
          slug
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price
            regularPrice
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('http://sak_wp:80/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      cache: 'no-store', // Always fetch fresh data
    });
    const json = await res.json();
    return json.data?.products?.nodes || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-[#5C4033] text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">SAK WoodWorks</h1>
        <p className="text-xl text-amber-100 mb-8">Premium Quality Timber & Plywood</p>
        <button className="bg-amber-500 text-white px-8 py-3 rounded hover:bg-amber-600 transition">
          View Catalog
        </button>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Products</h2>
        
        {products.length === 0 ? (
          <div className="p-8 bg-white rounded shadow text-center text-gray-500">
            <p>No products found.</p>
            <p className="text-sm mt-2">Go to WordPress Admin (Port 8006) and add some products!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 relative flex items-center justify-center">
                  {product.image?.sourceUrl ? (
                    <img src={product.image.sourceUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-amber-700 font-bold mt-2">{product.price || "Contact for Price"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
