
'use client'

// react 
import { ChangeEvent, FormEvent, useState } from "react"

// next 
import Link from "next/link";
import Image from "next/image";

// toast and loader 
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

// images 
import mailImage from '@/public/auth/mail.png';

// services 
import { registerUser } from "@/src/api/services/auth";
import toast from "react-hot-toast";

export default function page() {

    // states 
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);

    // functions 
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            return toast('Please enter name.')
        }

        if (!email) {
            return toast('Please enter email.');
        }

        setLoader(true);
        try {
            const res: { statusCode: number, message: string } = await registerUser({ email, name });
            toast(res.message);
        } catch (error: any) {
            toast(error.response.data.message || "Error while creating account.");
        } finally { setLoader(false) };
    };

    return (
        <div className="w-full md:w-[80%] h-screen flex items-center justify-center ">
            <div className="w-[90%] max-w-[400px] text-gray-700 space-y-3">

                <h1 className="text-4xl md:text-5xl font-bold text-black">Welcome</h1>
                <p>Sign up to your account</p>
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

                <form onSubmit={handleRegister} className="flex flex-col gap-3">

                    {/* name  */}
                    <label className="flex flex-col gap-0.5">
                        <p className="text-sm">Name</p>
                        <input name="name" value={name} onChange={e => setName(e.target.value)} autoFocus className="p-2 border border-gray-400 rounded-lg" type="text" />
                    </label>

                    {/* email  */}
                    <label className="flex flex-col gap-0.5">
                        <p className="text-sm">Email</p>
                        <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border border-gray-400 rounded-lg" type="text" />
                    </label>

                    <button type="submit" className="w-full h-[42px] bg-[#4c64d9] hover:bg-[#4c80d9] text-white text-center rounded-lg cursor-pointer flex items-center justify-center">{loader ? <ButtonLoader /> : "create account"}</button>
                </form>

                <p className="text-sm">Have an account? <Link className="text-blue-700 underline" href={"/auth/login"}>Login</Link></p>

                <div className="w-full h-[1px] bg-gray-400"></div>

                <p className="text-sm">By signing up you agree to our <Link className="text-blue-700 underline" href={"/terms"}>terms</Link> and have read the <Link className="text-blue-700 underline" href={"/privacy"}>privacy policy</Link></p>

            </div>
        </div>
    )
}