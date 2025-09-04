"use client";

// react 
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// lucide 
import { ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";

// services 
import { get_product } from "@/app/api/services/products";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// ui 
import Loader from "@/app/components/Loader";

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

export default function ProductPage() {
  // react 
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // states 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState(1);

  // Swiper: thumbs + custom nav refs
  const swiperRef: any = useRef(null)

  // main function 
  const handle_get_product = async () => {
    setLoading(true);
    if (!id) return router.push("/");
    try {
      const res: Product | any = await get_product(id);
      setProduct(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handle_get_product();
  }, [id]);

  // laoding 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Loader />
      </div>
    )
  }

  if (!product) return <p>Product not found</p>;

  console.log(product.images);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-[990px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/">Home</Link> / <Link href="/">products</Link> / {product.name}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Images */}
          <div className="relative">
            <Swiper
              className="w-full h-[500px] rounded-lg bg-gray-200"
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{ delay: 3000 }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
            >
              {
                product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img className="w-full h-full object-cover" src={img.url} alt="swiper1" />
                  </SwiperSlide>
                ))
              }

            </Swiper>

            {/* Custom arrows */}
            <button
              className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-200"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-200"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Right: Details */}
          <div className="pt-2">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

            <div className="flex items-center gap-6 mb-6 justify-between">
              <div className="text-sm text-gray-500">
                <span className="text-lg text-violet-600 font-semibold">{product.price.toLocaleString()}</span> so'm
              </div>

              {/* Quantity + Actions */}
              {/* cart quantity buttons */}
              <div className="flex items-center justify-center gap-3 ">
                <button className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Minus size={18} className="text-gray-600" /></button>
                <p className="text-[16px] text-gray-600">1</p>
                <button title="add one same product" className="p-2 cursor-pointer rounded-full border hover:bg-gray-200"><Plus size={18} className="text-gray-600" /></button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white font-semibold cursor-pointer">
                <ShoppingCart size={16} /> Add to cart
              </button>
            </div>

            {/* description  */}
            <div>
              <p className="text-lg font-semibold">description</p>
              <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm"
              >
                <div className="h-40 rounded-md overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
                  <img
                    src={`/images/related-${i + 1}.jpg`}
                    alt={`related ${i}`}
                    className="object-cover w-full h-full"
                  />
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
          <button className="px-4 py-2 rounded-lg bg-violet-600 text-white font-semibold">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
}
