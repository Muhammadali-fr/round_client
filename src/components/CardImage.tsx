import Image from "next/image";
import { useState } from "react";

export default function CardImage({ image }: { image: { url: string, productId: string } }) {
    const [imageLoader, setImageLoader] = useState(true);

    return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden">
            {/* image loader  */}
            {imageLoader && (
                <div className="absolute inset-0 flex items-center justify-center bg-violet-200/40 backdrop-blur-md">
                    <div className="w-[22px] h-[22px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <Image
                src={image.url}
                alt="product"
                width={200}
                height={200}
                loading="lazy"
                className="h-full w-full object-contain"
                onLoad={() => setImageLoader(false)}
            />
        </div>
    );
}
