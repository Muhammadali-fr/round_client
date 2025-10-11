'use client';

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

// services
import { getProducts } from "@/src/api/services/products";

// components
import Card from "@/src/components/Card";

// types
import { ProductProp } from "@/src/types/user";

export default function Shop() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductProp[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // UseMemo for performance (avoid recalculating on every render)
  const filteredProducts = useMemo(() => {
    const lower = query.toLowerCase();
    return products.filter((item) => item.name.toLowerCase().includes(lower));
  }, [query, products]);

  if (loading) {
    return (
      <div className="custom-width py-10 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="custom-width py-8 space-y-6">
      {/* Search Section */}
      <div className="space-y-2">
        <p className="text-2xl font-semibold">Search</p>
        <div className="relative">
          <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search for products..."
            className="border border-violet-400 w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
        </div>
      </div>

      {/* Product Section */}
      <div className="space-y-2">
        <p className="text-2xl font-semibold">Products</p>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">
            No products found.
          </p>
        ) : (
          <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
