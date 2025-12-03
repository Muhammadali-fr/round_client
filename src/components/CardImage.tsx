import Image from "next/image";
import { useState } from "react";


export default function CardImage({ image }: { image: { url: string, productId: string } }) {
    const [imageLoader, setImageLoader] = useState(true);

    return (
        <div className="w-full h-full">
            {/* image loader  */}
            {imageLoader &&
                <div className="bg-violet-200 absolute inset-0 flex items-center justify-center backdrop-blur-md w-full h-full rounded-3xl">
                    <div className="w-[20px] h-[20px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            <Image loading="lazy" height={200} width={200} className="h-full w-full  object-contain rounded-3xl" src={image.url} alt="swiper image 2" onLoad={() => setImageLoader(false)} />
        </div>
    )
}