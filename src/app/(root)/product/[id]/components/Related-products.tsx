import { ProductProp } from "@/src/types/product";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AddToCartButton from "@/src/components/AddToCartButton";

export default function RelatedProducts({ product }: { product: ProductProp }) {
    const [imageLoader, setImageLoader] = useState(true);

    return (
        <li className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-between flex-col p-1 gap-2 relative" >
            <Link className="h-[90%]" href={`/product/${product.id}`}>

                {/* loading animation  */}
                {imageLoader &&
                    <div className="bg-violet-200 absolute w-full h-[80%] flex items-center justify-center backdrop-blur-md rounded-lg">
                        <div className="w-[20px] h-[20px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }

                <Image width={400} height={400} className="w-full h-[90%] rounded-lg object-cover mb-2" onLoad={() => setImageLoader(false)} src={product.image} alt={product.name}></Image>

                {/* name  */}
                <p className="line-clamp-2 text-sm">{product.name}</p>

                <AddToCartButton productId={product.id}/>
            </Link>
        </li>
    );
};