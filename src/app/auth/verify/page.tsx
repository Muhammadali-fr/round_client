"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
        <div className="w-full md:w-1/2 flex items-center justify-center px-6">
            <div className="w-full max-w-sm text-center">

                {/* Loader */}
                <div className="w-12 h-12 border-3 border-gray-300 border-t-violet-900 rounded-full animate-spin mx-auto mb-8" />

                <h1 className="text-2xl font-semibold text-violet-900">Verifying...</h1>

                <p className="text-gray-500 mt-3 leading-relaxed">
                    Please wait a moment while we confirm your magic link and sign you in.
                </p>

                {/* Hint UI */}
                <div className="mt-8 p-4 bg-gray-100 border border-gray-200 rounded-2xl text-gray-700">
                    If this takes too long, you can close this page and try again.
                </div>

            </div>
        </div>
    );
}
