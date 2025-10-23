'use client'

// next and react stuff 
import Image from "next/image";
import Link from "next/link";

// types 
import { ProductProp } from "../types/product";

// huks
import { useState } from "react";

export default function Card({ item }: { item: ProductProp }) {
    const [imageLoader, setImageLoader] = useState(true);

    return (
        <li className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden group border-1 border-gray-200">
            <Link href={`/product/${item.id}`}>
                {/* card image  */}
                <div className="h-3/4 overflow-hidden relative">

                    {/* image loader  */}
                    {imageLoader &&
                        <div className="bg-violet-200 absolute inset-0 flex items-center justify-center backdrop-blur-md">
                            <div className="w-[20px] h-[20px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    }

                    {/* image  */}
                    <Image className={`w-full h-full group-hover:scale-105 transition-all duration-500 ${imageLoader ? 'opacity-0' : 'opacity-100'}`} width={300} height={400} src={item.image} alt={item.name} onLoad={() => setImageLoader(false)} />
                </div>
            </Link>

            {/* card details  */}
            <div className="h-1/4 p-1 flex flex-col justify-between">

                <Link href={`/product/${item.id}`}>
                    {/* card name  */}
                    <p className="line-clamp-2">{item.name}</p>
                </Link>

                {/* add button  */}
                <button className="w-full py-1 bg-violet-700 text-white rounded-lg cursor-pointer hover:bg-violet-600 active:bg-violet-800">add to cart</button>
            </div>
        </li>
    )
};