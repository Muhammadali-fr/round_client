
// react 
import { useEffect, useState } from "react";

// lucide 
import { ChevronRight } from "lucide-react";

// link 
import Link from "next/link";

// api 
import { get_products } from "../api/services/products";

// toast 
import toast from "react-hot-toast";

// animation 
import ConnectionError from "@/public/animations/connectionError.json";
import ProductSkeleton from "./ProductSkeleton";
import LottieAnimation from "./LottieAnimation";

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

export default function Famous() {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [tryAgain, setTryAgain] = useState(false)

    const get_products_function = async () => {
        setLoader(true);

        try {
            setTryAgain(false)
            const res:any = await get_products();
            setProducts(res);
        } catch (error) {
            setTryAgain(true);
            console.error("Login error:", error);
            toast('something went wrong while getting products')
        } finally { setLoader(false)};
    };

    useEffect(() => {
        get_products_function()
    }, [])

    return (
        <div className="max-w-[990px] w-[90%] mx-auto space-y-3 pb-5">
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold">Popular</h1>
                <ChevronRight />
            </div>

            {/* Loaing   */}
            {
                loader &&
                <ProductSkeleton />
            }

            {/* item here  */}
            <ul className="grid grid-cols-4 gap-5">
                {
                    products.map((item: Product) => (
                        <li key={item.id} className="w-full h-[415px] rounded-lg overflow-hidden bg-[#e8e7e5] p-2">
                            <Link href={`/product/${item.id}`} className="flex items-center justify-between flex-col">
                                <img className="h-[70%] w-full object-cover object-center rounded-lg" src={item.image} alt={item.description} />
                                <div className="py-2">
                                    <p className="font-semibold"><span className="text-violet-950">{item.price}</span> so'm</p>
                                    <p className="text-sm text-gray-800 line-clamp-2 leading-snug">{item.name}</p>
                                </div>
                            </Link>
                            <button className="w-full py-1.5 bg-violet-700 text-white rounded-lg hover:bg-violet-600 cursor-pointer">Add to Cart</button>
                        </li>
                    ))
                }

            </ul>

            {
                tryAgain && (
                    <div className="w-full flex flex-col items-center justify-center gap-6 relative">

                        {/* Title */}
                        <p className="text-lg font-medium text-gray-700 absolute top-5">
                            Oops! Check your connection
                        </p>

                        {/* Animation */}
                        <LottieAnimation
                            animationData={ConnectionError}
                            loop={true}
                            className="w-[220px] h-[220px]"
                        />

                        {/* Try Again Button */}
                        <button
                            onClick={get_products_function}
                            className="rounded-xl py-2 px-8 text-white bg-violet-600 hover:bg-violet-700 active:scale-95 transition-all z-10 cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                )
            }


        </div>
    )
}