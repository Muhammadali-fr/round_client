'use client'

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// services 
import { ProductProp, SingleProductProp } from "@/src/types/product";

// react and next
import { useRef } from "react";
import Link from "next/link";

// icons 
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";


export default function ProductView({ product, related }: { product: SingleProductProp, related: ProductProp[] }) {

    // Swiper: thumbs + custom nav refs
    const swiperRef: any = useRef(null);

    return (
        <div>
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
                            product.images?.map((img, i) => (
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
                <div className="space-y-3">
                    <h1 className="text-3xl font-semibold">{product.name}</h1>

                    <div className="flex items-center gap-6 justify-between">
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
                        <p className="text-gray-600 text-sm line-clamp-15 leading-snug">{product.description}</p>
                    </div>
                </div>
            </div>

            {/* realted products  */}
            <section className="space-y-5">
                <h2 className="text-2xl font-semibold">Related products</h2>
                <ul className="grid grid-cols-4 gap-2">
                    {
                        related.map((product: ProductProp) => (
                            <li key={product.id} className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-between flex-col p-1 gap-2 relative" >
                                <Link className="h-[90%]" href={`/product/${product.id}`}>

                                    {/* image  */}
                                    <img className="w-full h-[90%] rounded-lg object-cover mb-2" src={product.image} alt={product.name} />

                                    {/* name  */}
                                    <p className="line-clamp-2 text-sm">{product.name}</p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>

    );
};