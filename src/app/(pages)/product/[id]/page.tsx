
// next 
import Link from "next/link";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";


// services 
import { getOneProduct } from "@/src/api/services/products"

export default async function Product({ params }: { params: { id: string } }) {

    const { id } = await params;

    const { product, related } = await getOneProduct(id);
    console.log(product, related)

    return (
        <div className="custom-width space-y-5 py-5">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 flex gap-1">
                <Link href="/">Home</Link> / <Link href="/">products</Link> / <p className="line-clamp-1">{product.name}</p>
            </nav>

        </div>
    )
}