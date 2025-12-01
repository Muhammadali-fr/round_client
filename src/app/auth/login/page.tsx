

import Image from "next/image";
import backgroundImage from "@/public/auth/background-image.png";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="w-full md:w-1/2 flex items-center justify-center px-10">
            <div className="w-full max-w-sm space-y-8">

                {/* TEXT */}
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome back
                    </h1>
                    <p className="text-gray-600">
                        Login to continue shopping
                    </p>
                </div>

                {/* FORM */}
                <form className="space-y-5">

                    {/* EMAIL */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-3 rounded-2xl border border-gray-300 
                                    focus:ring-2 focus:ring-violet-700 focus:outline-none
                                    bg-white/80 backdrop-blur-sm"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full p-3 rounded-2xl bg-violet-700 text-white font-medium 
                                hover:bg-violet-900 transition"
                    >
                        Sign in
                    </button>
                </form>

                {/* REGISTER LINK */}
                <p className="text-sm text-gray-600 text-center">
                    Don’t have an account?{" "}
                    <Link href={"/auth/register"} className="text-black font-medium cursor-pointer hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}
