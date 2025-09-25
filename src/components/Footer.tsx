
// link 
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-3 border-t border-gray-300">
            <div className="max-w-[990px] w-[90%] mx-auto flex items-center justify-between text-sm">
                <p className="text-gray-600">© 2025 E-commerce. All rights reserved.</p>
                <p className="text-gray-500 flex gap-1">Made with by 
                    <Link className="text-violet-700" target="_blank" href={"https://github.com/Muhammadali-fr"}>
                        muhammadali
                    </Link> 
                </p>
            </div>
        </footer>
    );
}