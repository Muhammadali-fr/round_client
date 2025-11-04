'use client'

// next and react
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// lucide 
import { Pencil, Trash2 } from 'lucide-react';

// types or interfaces 
import { ProductProp } from "@/src/types/product";

export default function UserCard({ product, setOpenModal, setSelectedProduct }: { product: ProductProp, setOpenModal: any, setSelectedProduct: any }) {
    const [imageLoader, setImageLoader] = useState(true);
    return (
        <div className="w-full h-[400px] bg-white rounded-lg flex items-center justify-between flex-col p-1 gap-2 relative" >
            <Link className="h-[90%]" href={`/product/${product.id}`}>

                {/* loading animation  */}
                {imageLoader &&
                    <div className="bg-violet-200 absolute inset-0 flex items-center justify-center backdrop-blur-md rounded-lg">
                        <div className="w-[20px] h-[20px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }


                {/* image  */}
                <Image onLoad={() => setImageLoader(false)} width={200} height={200} className="w-full h-[90%] rounded-lg" src={product.image} alt={product.name} />

                {/* name  */}
                <p className="line-clamp-2 text-sm">{product.name}</p>
            </Link>

            {/* edit button  */}
            <Link className="w-full" href={`/edit/${product.id}`}><button className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-1 rounded-lg cursor-pointer hover:bg-blue-500"><Pencil size={14} />edit</button> </Link>

            {/* delete button  */}
            <div onClick={() => { setOpenModal(true); setSelectedProduct(product.id) }
            } title="delete" className="bg-white p-2 border rounded-full text-red-500 cursor-pointer hover:bg-red-100 absolute top-3 right-3" >
                <Trash2 size={20} />
            </div>
        </div>
    )
}