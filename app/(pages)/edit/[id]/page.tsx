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

    return (
        <div className="max-w-[990px] w-[95%] border mx-auto bg-white rounded-xl p-5 my-5">

        </div>
    )
}