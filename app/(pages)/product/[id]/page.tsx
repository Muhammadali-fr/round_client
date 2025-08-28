"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { get_product } from "@/app/api/services/products";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

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
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [qty, setQty] = useState(1);

  // Swiper: thumbs + custom nav refs
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const fallbackImages = [
    "/images/product-1.jpg",
    "/images/product-2.jpg",
    "/images/product-3.jpg",
  ];

  const handle_get_product = async () => {
    setLoading(true);
    if (!id) return router.push("/");
    try {
      const res: Product | any = await get_product(id);
      setProduct(res);
      console.log(product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handle_get_product();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const images = product.images?.length ? product.images : fallbackImages;

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-[990px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          Home / Bags / Backpacks / {product.name}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Swiper with custom buttons */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                loop={images.length > 1}
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation = {
                    ...(typeof swiper.params.navigation === "boolean"
                      ? {}
                      : swiper.params.navigation),
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  };
                }}
                onSwiper={(swiper) => {
                  // Delay to ensure refs are set
                  setTimeout(() => {
                    if (!prevRef.current || !nextRef.current) return;
                    // @ts-expect-error - navigation is object here
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-expect-error - navigation is object here
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  });
                }}
                className="rounded-2xl"
              >
                {images.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={src}
                      alt={`product ${i}`}
                      className="w-full h-[420px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Prev/Next */}
              <button
                ref={prevRef}
                aria-label="previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full hover:bg-white shadow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                ref={nextRef}
                aria-label="next"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full hover:bg-white shadow"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={12}
              freeMode
              watchSlidesProgress
              className="rounded-lg"
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={src}
                    alt={`thumb ${i}`}
                    className="w-full h-20 object-cover rounded-lg border border-gray-200 cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Details */}
          <div className="pt-2">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

            <div className="flex items-center gap-6 mb-6">
              <div className="text-sm text-gray-500">
                {product.price.toLocaleString()} so&apos;m
              </div>

              {/* Quantity + Actions */}
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
                  <button
                    className="p-2 rounded-lg border border-gray-300 bg-white"
                    aria-label="wishlist"
                  >
                    <Heart />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{product.description}</p>
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
