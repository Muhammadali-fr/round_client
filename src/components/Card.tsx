'use client'

// next and react stuff 
import Image from "next/image";
import Link from "next/link";

// types 
import { ProductProp } from "../types/product";

// huks
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export default function Card({ item }: { item: ProductProp }) {
    const [imageLoader, setImageLoader] = useState(true);

    return (
        <li className="w-full h-[400px] bg-white rounded-3xl overflow-hidden group border-1 border-gray-200 p-1">
            <Link href={`/product/${item.id}`}>
                {/* card image  */}
                <div className="h-7/10 overflow-hidden relative rounded-3xl">

                    {/* image loader  */}
                    {imageLoader &&
                        <div className="bg-violet-200 absolute inset-0 flex items-center justify-center backdrop-blur-md">
                            <div className="w-[20px] h-[20px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    }

                    {/* image  */}
                    <Image className={`w-full h-full group-hover:scale-105 transition-all duration-500 object-cover ${imageLoader ? 'opacity-0' : 'opacity-100'}`} width={300} height={400} src={item.image} alt={item.name} onLoad={() => setImageLoader(false)} />
                </div>
            </Link>

            {/* card details  */}
            <div className="h-3/10 p-1 flex flex-col justify-between">

                <Link href={`/product/${item.id}`}>
                    {/* card name  */}
                    <p className="line-clamp-2 text-lg font-[500] text-black">{item.name}</p>

                    <p>{item.price} so'm</p>
                </Link>

                {/* add button  */}
                <AddToCartButton productId={item.id} />
            </div>
        </li>
    )
};