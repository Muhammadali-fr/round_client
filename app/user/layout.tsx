
// react 
import React from "react";

// components 
import Sidebar from "./components/Sidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center">
            <Sidebar />
            <div className="bg-[#f6f6f6] w-full min-h-screen">
                {children}
            </div>
        </div>
    )
}