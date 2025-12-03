'use client'

// next and react stuff 
import Link from "next/link";

// types 
import { ProductProp } from "../types/product";

// huks
import AddToCartButton from "./AddToCartButton";
import CardImagesSwiper from "./CardImageSwiper";

export default function Card({ item }: { item: ProductProp }) {

    return (
        <li className="w-full h-[380px] bg-white rounded-3xl overflow-hidden group border-1 border-gray-200 p-1">
            {/* card image  */}
            <div className="h-6/10 overflow-hidden relative rounded-3xl">

                {/* image  */}
                {/* <Image className={`w-full h-full group-hover:scale-105 transition-all duration-500 object-cover ${imageLoader ? 'opacity-0' : 'opacity-100'}`} width={300} height={400} src={item.image} alt={item.name} onLoad={() => setImageLoader(false)} /> */}
                <CardImagesSwiper images={item.images} />
            </div>

            {/* card details  */}
            <div className="h-4/10 p-1 pt-2 flex flex-col justify-between ">

                <Link href={`/product/${item.id}`}>
                    {/* card name  */}
                    <p className="text-gray-600 font-bold text-lg bg-gray-100 inline py-1 px-2 rounded-3xl">
                        {new Intl.NumberFormat('ru-RU').format(item.price)}<span className="text-violet-700 font-normal text-sm"> so'm</span>
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm font-[500] text-gray-700 leading-5">{item.name}</p>

                </Link>

                {/* add button  */}
                <AddToCartButton productId={item.id} />
            </div>
        </li>
    )
};