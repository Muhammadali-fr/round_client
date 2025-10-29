import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Image from "next/image"
import { useState } from "react";

export default function UploadPageImagePreview({ image, id, removePreviewImage }: { image: string, id: number, removePreviewImage: any }) {
    const [imageLoader, setImageLoader] = useState(true);

    return (
        <li className="w-full h-[250px] relative" key={id}>
            <Image className={`w-full h-full object-cover rounded-lg bg-gray-700 ${imageLoader ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setImageLoader(false)} width={48} height={48} src={image} alt="image alt" />

            {/* image loader  */}
            {imageLoader &&
                <div className="rounded-lg bg-violet-200 absolute inset-0 flex items-center justify-center backdrop-blur-md">
                    <div className="w-[20px] h-[20px] border-2 border-violet-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }

            {/* remove btn  */}
            <button
                type="button"
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-100"
                onClick={() => removePreviewImage(id)}
            >
                <X size={14} color="red" />
            </button>
        </li >
    )
}