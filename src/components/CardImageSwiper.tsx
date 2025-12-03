'use client'

// react 
import { useRef } from "react"

// next 
import Image from "next/image"

// swiper 
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"



// icons 
import { ChevronLeft, ChevronRight } from "lucide-react"
import CardImage from "./CardImage"

export default function CardImagesSwiper({ images }: { images: { url: string, productId: string }[] }) {
    // useref 
    const swiperRef = useRef<any>(null);

    return (
        <div className="relative w-full h-full">
            {/* Custom arrows */}
            <button
                className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white/40 backdrop-blur-xs text-gray-600 p-2 rounded-full cursor-pointer hover:bg-white/50 transition-all duration-500 hover:p-2.5"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ChevronLeft size={20} />
            </button>

            <button
                className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white/40 backdrop-blur-xs text-gray-600 p-2 rounded-full cursor-pointer hover:bg-white/50 transition-all duration-500 hover:p-2.5"
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ChevronRight size={20} />
            </button>

            {/* Swiper */}
            <Swiper
                className="w-full h-full rounded-3xl bg-gray-200 overflow-hidden"
                modules={[Pagination, Navigation]}
                pagination={
                    {
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} custom-bullet"></span>`;
                        }
                    }
                }
                loop={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
            >
                {images.map((image) => (
                    <SwiperSlide>
                        <CardImage image={image} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}