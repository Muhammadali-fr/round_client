"use client"
// Link
import Link from "next/link"

// lucide 
import { Search, Settings, ShoppingCart, User } from "lucide-react"

// navigation 
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// popover 
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"

export default function Header() {
    const user = useSelector((state: RootState) => state.user.user);
    const pathname = usePathname();

    return (
        <div className="py-2 border-b border-[#e8e7e5] bg-gray-100">
            <div className="max-w-[990px] w-[90%] mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link href={"/"} className="flex items-center gap-2">
                        <img className="w-[35px] h-[35px] select-none" src="/assets/logo.svg" alt="logo" />
                        <p className="text-2xl text-black font-semibold">Round</p>
                    </Link>
                </div>

                <ul className="flex items-center">
                    <li className={`font-semibold  cursor-pointer ${pathname === "/" ? "text-violet-700" : "text-gray-600"}`}>
                        <Link className="px-2" href={"/"}>home</Link>
                    </li>

                    <li className={`font-semibold  cursor-pointer ${pathname === "/shop" ? "text-violet-700" : "text-gray-600"}`}>
                        <Link className="px-2" href={"/shop"}>shop</Link>
                    </li>

                    {!user &&
                        <li className={`font-semibold  cursor-pointer ${pathname === "/login" ? "text-violet-700" : "text-gray-600"}`}>
                            <Link className="px-2" href={"/auth/login"}>login</Link>
                        </li>
                    }

                    {!user &&
                        <li className={`font-semibold  cursor-pointer ${pathname === "/upload" ? "text-violet-700" : "text-gray-600"}`}>
                            <Link className="px-2" href={"/upload"}>new</Link>
                        </li>
                    }

                </ul>

                <ul className="flex items-center gap-3  text-sm text-gray-500">
                    <li><Search /></li>
                    <Link href={"/cart"}>
                        <li className="relative"><ShoppingCart /> <span className="text-xs text-white bg-violet-600 w-[15px] h-[15px] rounded-full flex items-center justify-center font-semibold absolute top-0 left-3">2</span></li>
                    </Link>

                    {/* user icon  */}
                    {user && <li>
                        <Popover>
                            <PopoverTrigger className="flex items-center-justify-center cursor-pointer">
                                {/* user icon here  */}
                                {/* <User /> */}
                                <div className="w-[25px] h-[25px] rounded-full bg-white">
                                    <img className="w-full h-full rounded-full" src={user ? user.profile : "/assets/bg.png"} alt="user" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="mx-5 w-[200px] p-1 rounded-lg">
                                <ul className="flex flex-col m-1 text-[#7a7c7d]">
                                    <li className="flex items-center gap-2 p-2 select-none">
                                        <div className="w-[25px] h-[25px] rounded-full bg-gray-200">
                                            <img className="w-full h-full rounded-full" src={user ? user.profile : "/assets/bg.png"} alt="user" />
                                        </div>
                                        {user ? user?.name : "username"}
                                    </li>

                                    {/* line  */}
                                    <div className="bg-gray-200 w-full h-[1px] my-1"></div>

                                    <Link href={"/user/settings"}>
                                        <li className="flex items center gap-2 p-2 hover:bg-[#f5f7f9] rounded-lg cursor-pointer select-none">
                                            <Settings size={22} />
                                            Settings
                                        </li>
                                    </Link>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </li>}
                </ul>
            </div>
        </div>
    )
}