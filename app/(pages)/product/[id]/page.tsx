"use client"

import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { get_product } from "@/app/api/services/products";

// next and react 
import { useRouter } from "next/navigation";

// Product page simplified
// - White theme
// - Removed color picker + specifications/reviews tabs
// - Max width 990px

type Product = {
  id: string,
  image: string,
  name: string,
  description: string,
  price: number,
  stock: number,
  createdAt: Date,
  updatedAt: Date,
  userId: string,
  images: string[]
};

export default function ProductPage() {

  // react 
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // states 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  // functions 
  const handle_get_product = async () => {
    setLoading(true);

    if (!id) {
      return router.push('/');
    };

    try {
      const res: Product | any = await get_product(id);
      setProduct(res);
    } catch (error) {
      console.log(error);
    } finally { setLoading(false) };
  };

  // useEffects 
  useEffect(() => {
    handle_get_product();
  }, []);


  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const images = [
    "/images/product-1.jpg",
    "/images/product-2.jpg",
    "/images/product-3.jpg",
  ];

  function prev() {
    setActiveImage((s) => (s === 0 ? images.length - 1 : s - 1));
  }
  function next() {
    setActiveImage((s) => (s === images.length - 1 ? 0 : s + 1));
  }

  if (loading) {
    return <p>loading</p>
  }

  if (!product) {
    return <p>product not found</p>
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-[990px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">Home / Bags / Backpacks / {product.title}</nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-md">
              <img
                src={images[activeImage]}
                alt={`product ${activeImage}`}
                className="w-full h-[420px] object-cover"
              />

              {/* Prev/Next */}
              <button
                onClick={prev}
                aria-label="previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="next"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border ${activeImage === i ? "border-violet-500" : "border-gray-200"
                    }`}
                >
                  <img src={src} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="pt-2">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

            <div className="flex items-center gap-6 mb-6">
              <div>
                <div className="text-sm text-gray-500">{product.price.toLocaleString()} so'm</div>
              </div>

              {/* quantity  */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2"
                    aria-label="decrease"
                  >
                    -
                  </button>
                  <div className="px-4 py-2 font-medium">{qty}</div>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2"
                    aria-label="increase"
                  >
                    +
                  </button>
                </div>



                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white font-semibold shadow-md">
                    <ShoppingCart size={16} /> Add to cart
                  </button>

                  <button className="p-2 rounded-lg border border-gray-300 bg-white" aria-label="wishlist">
                    <Heart />
                  </button>
                </div>
              </div>


            </div>

            {/* description  */}
            <p className="text-gray-600 mb-4">{product.description}</p>

          </div>
        </div>

        {/* Related products */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                <div className="h-40 rounded-md overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
                  <img src={`/images/related-${i + 1}.jpg`} alt={`related ${i}`} className="object-cover w-full h-full" />
                </div>
                <div className="text-sm font-medium">Product {i + 1}</div>
                <div className="text-gray-500 text-xs">$49.00</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="mt-12 bg-violet-50 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Need help choosing?</div>
            <div className="font-semibold">Contact our product specialists</div>
          </div>
          <div>
            <button className="px-4 py-2 rounded-lg bg-violet-600 text-white font-semibold">Contact us</button>
          </div>
        </div>
      </div>
    </div>
  );
}
