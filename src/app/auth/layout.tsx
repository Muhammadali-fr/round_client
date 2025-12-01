
// next 
import Image from "next/image";
import Link from "next/link";

// assets 
import backgroundImage from "@/public/auth/background-image.png";
import logoImage from '@/public/assets/logo.svg';
import { X } from "lucide-react";

export default function authLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex justify-between p-2 h-screen">
            <div className="hidden md:block w-1/2">
                <Image
                    width={500}
                    height={500}
                    src={backgroundImage}
                    alt="background image"
                    className="w-full h-full object-cover rounded-3xl"
                />
                
                {/* close button  */}
                <Link href={"/"} className="bg-black/10 backdrop-blur-xs text-gray-600 p-3 rounded-full cursor-pointer hover:bg-black/15 transition-all duration-500 absolute top-5 left-5">
                    <X size={20} />
                </Link>
            </div>
            {children}
        </div>
    );
};
