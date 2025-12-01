"use client"

//next stuff
import Link from "next/link"
import Image from "next/image";

// lucide 
import { LogOut, Search, Settings, ShoppingCart } from "lucide-react"

// navigation 
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

// ui 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// assets 
import LogoImage from '@/public/assets/logo.svg';
import { Button } from "@/components/ui/button";

export default function Header() {
    const pathname = usePathname();
    const user = useSelector((state: RootState) => state.user.data);

    return (
        <div className="bg-white/80 sticky top-0 z-11 backdrop-blur-xl">
            <div className="custom-width flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href={"/"} className="flex items-center gap-2">
                        <Image loading="eager" priority className="select-none" src={LogoImage} alt="logo" width={35} height={35} />
                        <p className="text-2xl text-black font-semibold">Round</p>
                    </Link>
                </div>

                {/* Nav links */}
                <ul className="flex items-center h-full">
                    <li className={`font-semibold cursor-pointer  py-3 ${pathname === "/" ? "text-violet-700 border-b border-violet-700 h-full" : "text-gray-600"}`}>
                        <Link className="px-2" href={"/"}>home</Link>
                    </li>

                    <li className={`font-semibold cursor-pointer  py-3 ${pathname === "/shop" ? "text-violet-700 border-b border-violet-700 h-full" : "text-gray-600"}`}>
                        <Link className="px-2" href={"/shop"}>shop</Link>
                    </li>

                    {/* login link  */}
                    {!user ?
                        <li className={`font-semibold cursor-pointer  py-3 ${pathname === "/login" ? "text-violet-700 border-b border-violet-700 h-full" : "text-gray-600"}`}>
                            <Link className="px-2" href={"/auth/login"}>login</Link>
                        </li>
                        :
                        <li className={`font-semibold  cursor-pointer  py-3 ${pathname === "/upload" ? "text-violet-700 border-b border-violet-700 h-full" : "text-gray-600"}`}>
                            <Link className="px-2" href={"/upload"}>new</Link>
                        </li>
                    }

                </ul>

                {/* Right icons */}
                <ul className="flex items-center gap-3 text-sm text-gray-500">
                    <Link href={'/shop'}><li><Search /></li></Link>
                    <Link href={"/cart"}>
                        <li className="relative">
                            <ShoppingCart />
                            <span className="text-xs text-white bg-violet-600 w-[15px] h-[15px] rounded-full flex items-center justify-center font-semibold absolute top-0 left-3">2</span>
                        </li>
                    </Link>

                    {/* user icon  */}
                    {user && <li>
                        <Popover>
                            <PopoverTrigger className="flex items-center-justify-center cursor-pointer">
                                {/* user icon here  */}
                                {/* <User /> */}
                                <div className="w-[25px] h-[25px] rounded-full bg-white">
                                    <Image className="rounded-full" src={user.profile} width={25} height={25} alt="user image" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="mx-5 w-[250px] rounded-3xl bg-white/90 text-black border border-gray-200 shadow-xl p-4 space-y-2 backdrop-blur-sm">
                                <ul className="p-1">
                                    <li><p className="text-lg font-semibold">{user.name}</p></li>
                                    <li><p className="text-sm text-gray-600">{user.email}</p></li>
                                    <li>
                                        <Button className="w-full rounded-3xl mt-2 bg-gray-100 hover:bg-gray-200 text-black cursor-pointer">
                                            View profile
                                        </Button>
                                    </li>
                                </ul>

                                <div className="w-full h-[1px] bg-gray-300"></div>

                                <ul>
                                    <Link href={"user/settings"} className="flex items-center gap-2 font-semibold text-lg hover:bg-white/50 p-2 rounded-xl cursor-pointer">
                                        <Settings className="text-gray-700" />
                                        <p>Settings</p>
                                    </Link>

                                    <Link href={"user/settings"} className="flex items-center gap-2 font-semibold text-lg hover:bg-white/50 p-2 rounded-xl cursor-pointer">
                                        <LogOut className="text-gray-700" />
                                        <p>Log out</p>
                                    </Link>
                                </ul>
                            </PopoverContent>

                        </Popover>
                    </li>}

                </ul>
            </div>
        </div>
    )
};
