
// next 
import Image from "next/image";

// assets 
import backgroundImage from "@/public/auth/background-image.png";

export default function authLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-between">
            {children}
            <Image src={backgroundImage} alt="auth background image" sizes="100vh" className="w-1/3 h-screen hidden md:block object-cover" />
        </div>
    )
}
