import Image from "next/image";
import { useState } from "react";

export default function ProductViewImage({ img }: { img: { url: string } }) {
    const [imageLoader, setImageLoader] = useState(true);

    return (
        <div>
            {/* loading animation  */}
            {imageLoader &&
                <div className="bg-violet-200 absolute inset-0 flex items-center justify-center backdrop-blur-md rounded-lg">
                    <div className="w-[20px] h-[20px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            <Image width={400} height={400} className="w-full h-full object-cover" onLoad={() => setImageLoader(false)} src={img.url} alt="swiper1"></Image>
        </div>
    );
};