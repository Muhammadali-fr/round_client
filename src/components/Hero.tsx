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

export default function Hero() {
    // useref 
    const swiperRef = useRef<any>(null);

    return (
        <div className="relative w-full">
            {/* Custom arrows */}
            <button
                className="absolute top-1/2 left-5 z-10 transform -translate-y-1/2 bg-white/40 backdrop-blur-xs text-gray-600 p-3.5 rounded-full cursor-pointer hover:bg-white/50 transition-all duration-500 hover:p-4"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ChevronLeft size={20} />
            </button>

            <button
                className="absolute top-1/2 right-5 z-10 transform -translate-y-1/2 bg-white/40 backdrop-blur-xs text-gray-600 p-3.5 rounded-full cursor-pointer hover:bg-white/50 transition-all duration-500 hover:p-4"
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ChevronRight size={20} />
            </button>

            {/* Swiper */}
            <Swiper
                className="w-full h-[400px] rounded-3xl bg-gray-200"
                modules={[Pagination, Navigation]}
                pagination={
                    { clickable: true, 
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
                <SwiperSlide>
                    <Image fill loading="eager" priority className="h-full w-full object-top-left object-cover" src={'https://images.uzum.uz/d4dolldv2sjnqk4haqt0/main_page_banner.jpg'} alt="swiper image 1"/>
                </SwiperSlide>
                
                

                <SwiperSlide>
                    <Image fill className="h-full w-full object-top-left object-cover" src={'https://images.uzum.uz/d2m6l0fiub35i07hpvq0/main_page_banner.jpg'} alt="swiper image 2"/>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}