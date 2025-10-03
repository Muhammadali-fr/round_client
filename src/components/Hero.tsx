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
    const swiperRef = useRef(null);

    return (
        <div className="relative w-full">
            {/* Custom arrows */}
            <button
                className="absolute top-1/2 left-5 z-10 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-200"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ChevronLeft size={20} />
            </button>

            <button
                className="absolute top-1/2 right-5 z-10 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-200"
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ChevronRight size={20} />
            </button>

            {/* Swiper */}
            <Swiper
                className="w-full h-[400px] rounded-lg bg-gray-200"
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                loop={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
            >
                <SwiperSlide>
                    <Image width={1200} height={400} className="h-full w-full object-top-left object-cover" src={'https://images.uzum.uz/d2mklsr4eu2h0tmov5o0/main_page_banner.jpg'} alt="swiper image 1"/>
                </SwiperSlide>

                <SwiperSlide>
                    <Image width={1200} height={400} className="h-full w-full object-top-left object-cover" src={'https://images.uzum.uz/d2m6l0fiub35i07hpvq0/main_page_banner.jpg'} alt="swiper image 2"/>
                </SwiperSlide>

                <SwiperSlide>
                    <Image width={1200} height={400} className="h-full w-full object-top-left object-cover" src={'https://images.uzum.uz/d3f66oa1146soq7cmfd0/main_page_banner.jpg'} alt="swiper image 3"/>
                </SwiperSlide>
            </Swiper>

        </div>
    )
}