'use client';

import { useEffect, useState } from "react";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch products (initial + on search)
  const fetchProducts = async (search: string = "") => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/product?search=${search}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // debounce search typing
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(query);
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search input */}
      <div className="flex justify-center mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full md:w-1/2 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length ? (
            products.map((p) => (
              <div
                key={p.id}
                className="p-4 border rounded-xl hover:shadow-lg transition bg-white"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-gray-600">${p.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
