"use client"

// react router dom 
import { useParams } from "next/navigation";

// services 
import { get_product } from "@/app/api/services/products"
import { useEffect, useState } from "react";

// toast 
import toast from "react-hot-toast";

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


export default function page() {
    // params 
    const { id } = useParams<{ id: string }>()

    // states 
    const [product, setProduct] = useState(null);

    const handle_get_products = async () => {
        try {
            const res: Product = await get_product(id);
            setProduct(res);
        } catch (r) {
            toast(r?.response?.data.message || "deleting failed.");
            console.log(r);
        }
    }

    useEffect(() => {
        handle_get_products()
    }, [id])

    console.log(product);


    return (
        <div className="max-w-[990px] w-[95%] flex border mx-auto bg-white rounded-xl p-5 my-5">

            {/* left  */}
            <div>

            </div>

            {/* right  */}
            <div className="w-[50%] flex flex-col gap-3">
                {/* name  */}
                <label className="text-sm font-medium text-gray-700">
                    Product Name
                    <input
                        type="text"
                        placeholder="Professional butsi va sorokonojka..."
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                </label>

                {/* price  */}
                <label className="text-sm font-medium text-gray-700">
                    price
                    <input
                        type="text"
                        placeholder="120 000 so'm"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                </label>

                {/* stock  */}
                <label className="text-sm font-medium text-gray-700">
                    stock
                    <input
                        min={0}
                        type="number"
                        placeholder="20"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                </label>

                {/* desc  */}
                <label className="text-sm font-medium text-gray-700">
                    description
                    <textarea
                        rows={3}
                        placeholder="Yengil va bardoshli: Uzoq muddatli foydalanish uchun mos."
                        className="w-full max-h-[100px] min-h-[100px] border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                </label>

                {/* update button  */}
                <button className="w-[150px] h-[35px] flex items-center justify-center text-white bg-violet-700 rounded-lg cursor-pointer hover:bg-violet-600 transition-all duration-300">update</button>

            </div>
        </div>
    )
}