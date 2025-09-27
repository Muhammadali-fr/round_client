
// next 
import Image from "next/image";
import Link from "next/link";

// assets 
import backgroundImage from "@/public/auth/background-image.png";
import logoImage from '@/public/assets/logo.svg';

export default function authLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-between">
            {/* logo  */}
                <Link href={"/"}>
                    <Image className="absolute top-5 left-5 w-[50px] h-[50px] rounded-full" src={logoImage} alt="logo" />
                </Link>
            {children}
            <Image src={backgroundImage} alt="auth background image" sizes="100vh" className="w-1/3 h-screen hidden md:block object-cover" />
        </div>
    )
}
