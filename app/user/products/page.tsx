"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

// types
type Product = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  images?: string[];
};

export default function Products() {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user || !user.products || user.products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        No products yet 🚀
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-violet-800">Your Products</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {user.products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={product.image || product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Button */}
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white text-gray-600 hover:text-red-500 transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-violet-600">
                  ${product.price}
                </span>
                <button className="p-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
