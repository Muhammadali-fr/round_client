"use client"

// router dom 
import { usePathname } from "next/navigation"
import Link from "next/link"

// link 
import {
  CircleUserRound,
  PackageSearch,
  ChartLine,
  LogOut,
  ArrowLeftToLine,
  SquarePlus
} from "lucide-react"

// react and next
import { useState } from "react"
import { useRouter } from "next/navigation"

// components 
import Modal from "@/src/components/Modal";

// loader 
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

// redux 
import { logout } from "@/src/lib/features/userSlice";
import { useDispatch } from "react-redux"

const navItems = [
  { label: "Edit Profile", href: "/user/settings", icon: CircleUserRound },
  { label: "Products", href: "/user/products", icon: PackageSearch },
  { label: "create category", href: "/user/category", icon: SquarePlus },
  { label: "Charts", href: "/user/charts", icon: ChartLine },
  { label: "Home", href: "/", icon: ArrowLeftToLine },
]

export default function Sidebar() {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const [logoutLoader, setLogoutLoader] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()

  const handleLogout = () => {
    setLogoutLoader(true);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout())
    setTimeout(() => {
      router.push("/");
      setLogoutLoader(false);
      window.location.reload();
    }, 1000)
  }

  return (
    <aside className="sticky top-0 w-[330px] h-screen bg-white border-r flex flex-col justify-between px-4 py-6 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-6">
        <img src="/assets/logo.svg" alt="logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-gray-800">Round</span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all
                ${isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-violet-600"
                }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <button onClick={() => setOpenModal(true)} className="flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-md transition cursor-pointer">
        <LogOut size={18} />
        Log Out
      </button>


      {/* modal  */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Ready to leave?</h2>
          <p className="text-sm text-gray-600">
            You’re about to log out of your account. Are you sure you want to continue?
          </p>
          <div className="flex justify-center gap-2">
            <button
              className="w-[50%] h-[40px] rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="w-[50%] h-[40px] rounded-lg bg-red-600 hover:bg-red-500 text-white cursor-pointer flex items-center justify-center"
            >
              {logoutLoader ? <ButtonLoader /> : "Log Out"}
            </button>
          </div>
        </div>
      </Modal>

    </aside>
  )
}
