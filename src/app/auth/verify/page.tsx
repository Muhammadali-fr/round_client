"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { verifyUser } from "@/src/api/services/auth";

export default function Verify() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const runVerify = async () => {
            try {
                const res: { tokens: { accessToken: string, refreshToken: string }, success: Boolean, message: string } = await verifyUser(token);

                if (res.success) {
                    // saving tokens 
                    localStorage.setItem('accessToken', res.tokens.accessToken);

                    // messages 
                    toast(res.message);
                    router.replace("/");
                    return window.location.reload();
                };

                // if token epired 
                toast('The link has expired. Please request a new one.');
                router.replace("/auth/login");
            } catch (err) {
                toast.error("Something went wrong");
                router.replace("/auth/login");
                console.log(err);
            };
        };

        runVerify();
    }, [token, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[400px] bg-white rounded-xl shadow-lg p-8 text-center space-y-5 border border-gray-200">
                <div className="flex justify-center">
                    <HashLoader color="#6D28D9" />
                </div>
                <h1 className="text-xl font-semibold text-gray-800">
                    Verifying your account
                </h1>
                <p className="text-gray-500 text-sm">
                    Please wait, you will be redirected shortly.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-violet-500 animate-progress" />
                </div>
            </div>
        </div>
    );
}
