
// react 
import { useEffect, useState } from "react";

// lucide 
import { ChevronRight } from "lucide-react";

// data 
import famousItems from "../../data/data";

// link 
import Link from "next/link";

// api 
import { get_products } from "../api/services/products";
import toast from "react-hot-toast";

export default function Famous() {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const get_products_function = async () => {
            setLoader(true);

            try {
                const res = await get_products();
                console.log(res);
            } catch (error) {
                console.error("Login error:", error);
            } finally { setLoader(false) }
        }
        get_products_function()
    }, [])

    return (
        <div className="max-w-[990px] w-[90%] mx-auto space-y-3 pb-5">
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold">Popular</h1>
                <ChevronRight />
            </div>

            {/* item here  */}
            <ul className="grid grid-cols-4 gap-5">
                {
                    products.map((item, id) => (
                        <li key={id} className="w-full h-[415px] rounded-lg overflow-hidden bg-[#e8e7e5] ">
                            <Link href={`/product/${item.id}`} className="p-2 h-full flex items-center justify-between flex-col">
                                <img className="h-[70%] w-full object-cover object-center rounded-lg" src={item.image} alt={item.description} />
                                <div className="py-2">
                                    <p className="font-semibold"><span className="text-violet-950">{item.price}</span> so'm</p>
                                    <p className="text-sm text-gray-800 line-clamp-2 leading-snug">{item.name}</p>
                                </div>
                                <button className="w-full py-1.5 bg-violet-700 text-white rounded-lg hover:bg-violet-600 cursor-pointer">Add to Cart</button>
                            </Link>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}