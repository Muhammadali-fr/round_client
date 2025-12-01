import Image from "next/image";
import backgroundImage from "@/public/auth/background-image.png";
import Link from "next/link";

export default function RegisterPage() {

    

    return (
        <div className="w-full md:w-1/2 flex items-center justify-center px-10">
            <div className="w-full max-w-sm space-y-8">

                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome
                    </h1>
                    <p className="text-gray-600">
                        Register account to continue shopping
                    </p>
                </div>

                <form className="space-y-5">

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="David"
                            className="w-full p-3 rounded-2xl border border-gray-300 
                                    focus:ring-2 focus:ring-violet-700 focus:outline-none
                                    bg-white/80 backdrop-blur-sm"
                        />
                    </div>

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

                    <button
                        type="submit"
                        className="w-full p-3 rounded-2xl bg-violet-700 text-white font-medium 
                                hover:bg-violet-900 transition"
                    >
                        Sign in
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link href={"/auth/login"} className="text-black font-medium cursor-pointer hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
