"use client"

// Link
import Link from "next/link"

// lucide 
import { Search, ShoppingCart } from "lucide-react"

// navigation 
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

// types 
import { UserProp } from "../types/user";

export default function Header() {
    const pathname = usePathname();

    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="py-2 border-b border-[#e8e7e5] bg-gray-100">
            <div className="max-w-[990px] w-[90%] mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href={"/"} className="flex items-center gap-2">
                        <img
                            className="w-[35px] h-[35px] select-none"
                            src="/assets/logo.svg"
                            alt="logo"
                        />
                        <p className="text-2xl text-black font-semibold">Round</p>
                    </Link>
                </div>

                {/* Nav links */}
                <ul className="flex items-center">
                    <li className={`font-semibold cursor-pointer ${pathname === "/" ? "text-violet-700" : "text-gray-600"}`}>
                        <Link className="px-2" href={"/"}>home</Link>
                    </li>

                    <li className={`font-semibold cursor-pointer ${pathname === "/shop" ? "text-violet-700" : "text-gray-600"}`}>
                        <Link className="px-2" href={"/shop"}>shop</Link>
                    </li>

                    {/* login link  */}
                    {!user &&
                        <li className={`font-semibold cursor-pointer ${pathname === "/login" ? "text-violet-700" : "text-gray-600"}`}>
                            <Link className="px-2" href={"/auth/login"}>login</Link>
                        </li>
                    }

                </ul>

                {/* Right icons */}
                <ul className="flex items-center gap-3 text-sm text-gray-500">
                    <li><Search /></li>
                    <Link href={"/cart"}>
                        <li className="relative">
                            <ShoppingCart />
                            <span className="text-xs text-white bg-violet-600 w-[15px] h-[15px] rounded-full flex items-center justify-center font-semibold absolute top-0 left-3">2</span>
                        </li>
                    </Link>


                </ul>
            </div>
        </div>
    )
}
