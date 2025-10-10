'use client'

// next 
import Link from "next/link"
import Image from "next/image";

// react 
import { useState } from "react"

// images 
import mailImage from '@/public/auth/mail.png';

// loaders and toasts 
import toast from "react-hot-toast";
import ButtonLoader from "@/src/components/ButtonLoader";

// services 
import { loginUser } from "@/src/api/services/auth";

export default function page() {
    // states 
    const [email, setEmail] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);

    // functions 
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.length < 1) {
            return toast('Please enter email.');
        };

        try {
            setLoader(true);
            const res: { message: string } = await loginUser({ email });
            toast(res.message);
        } catch (error:any) {
            // toast(error.response.data.message || "Error while loging in.");
            console.log(error)
        } finally { setLoader(false) };
    };

    return (
        <div className="w-full md:w-[70%] h-screen flex items-center justify-center ">
            <div className="w-[90%] max-w-[400px] text-gray-700 space-y-3">

                <h1 className="text-4xl md:text-5xl font-bold text-black">Welcome back</h1>

                <p>Log in to your acconct</p>

                {/* mail  */}
                <a href="https://mail.google.com/">
                    <button type="button" className="flex items-center justify-center w-full gap-2 text-gray-700 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 py-2 mb-3">
                        <Image className="w-[20px] h-[20px]" src={mailImage} alt="mail image" />
                        Open Mail
                    </button>
                </a>

                <div className="w-full flex items-center justify-between gap-2">
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <p>OR</p>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    {/* email  */}
                    <label className="flex flex-col gap-0.5">
                        <p className="text-sm">Email</p>
                        <input value={email} onChange={e => setEmail(e.target.value)} autoFocus className="p-2 border border-gray-400 rounded-lg outline-blue-700" type="email" />
                    </label>

                    <button className="w-full h-[42px] bg-[#4c64d9] hover:bg-[#4c80d9] text-white text-center rounded-lg cursor-pointer flex items-center justify-center">{loader ? <ButtonLoader /> : "Log in"}</button>
                </form>

                <p className="text-sm">Don't have an account? <Link className="text-blue-700 underline" href={"/auth/register"}>Sign up</Link></p>

                <div className="w-full h-[1px] bg-gray-400"></div>

                <p className="text-sm">By logging in you agree to our <Link className="text-blue-700 underline" href={"/terms"}>terms</Link> and have read the <Link className="text-blue-700 underline" href={"/privacy"}>privacy policy</Link></p>

            </div>
        </div>
    )
}