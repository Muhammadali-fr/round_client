
// next 
import Image from "next/image";
import Link from "next/link";

// assets 
import backgroundImage from "@/public/auth/background-image.png";
import logoImage from '@/public/assets/logo.svg';

export default function authLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex justify-between p-2 h-screen">
            <div className="hidden md:block w-1/2 relative ">
                <Image
                    width={500}
                    height={500}
                    src={backgroundImage}
                    alt="Login background"
                    className="w-full h-full object-cover rounded-3xl"
                />

                {/* optional overlay */}
                <div className="absolute inset-0 bg-black/10 rounded-3xl" />
            </div>
            {children}
        </div>
    );
};
