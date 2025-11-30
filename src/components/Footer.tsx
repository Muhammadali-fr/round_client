
// link 
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white py-3">
            <div className="custom-width flex items-center justify-between text-sm">
                <p className="text-gray-600">© 2025 E-commerce. All rights reserved.</p>
                <p className="text-gray-500 flex gap-1">Made with by 
                    <Link className="text-violet-700" target="_blank" href={"https://github.com/Muhammadali-fr"}>
                        Muhammadali
                    </Link> 
                </p>
            </div>
        </footer>
    );
}