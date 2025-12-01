'use client'
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/src/api/services/auth";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import ButtonLoader from "@/src/components/loaders/ButtonLoader";
import Image from "next/image";
import MailLogo from "@/public/auth/mail.png";

export default function LoginPage() {

    const loginMutation = useMutation({
        mutationFn: async (data: { email: string }) => {
            return await loginUser(data);
        },
        onSuccess: (data: { message: string }) => {
            toast(data.message);
        },
        onError: (error: { message: string }) => {
            toast.error(error.message)
        },
    });

    const loginForm = useForm({
        defaultValues: {
            email: "",
        },
        onSubmit: async ({ value }) => {
            await loginMutation.mutateAsync(value);
        },
    });

    return (
        <div className="w-full md:w-1/2 flex items-center justify-center px-10">
            <div className="w-full max-w-sm space-y-8">

                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome back
                    </h1>
                    <p className="text-gray-600">
                        Login to continue shopping
                    </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); loginForm.handleSubmit(); }} className="flex flex-col gap-5">
                    <loginForm.Field name="email">
                        {(field) => (
                            <label className="space-y-1">
                                <p className="text-sm font-medium text-gray-700">Email</p>
                                <input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full p-3 rounded-2xl border border-gray-300 
                            focus:ring-2 focus:ring-violet-700 focus:outline-none
                            bg-white/80 backdrop-blur-sm"
                                />
                            </label>
                        )}
                    </loginForm.Field>

                    {/* submit button     */}
                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className={`w-full h-[48px] rounded-2xl  text-white font-medium 
                                 transition flex items-center justify-center ${loginMutation.isPending ? "bg-violet-950" : "bg-violet-700 hover:bg-violet-900"}`}
                    >
                        {loginMutation.isPending ? <ButtonLoader /> : "Sign in"}
                    </button>

                    {/* email button  */}
                    <button
                        type="button"
                        onClick={() => (window.location.href = "https://mail.google.com")}
                        className="w-full h-[48px] rounded-2xl bg-gray-100 text-gray-900 font-medium 
                        border border-gray-300 hover:bg-gray-200 transition
                        flex items-center justify-center gap-2"
                    >
                        <Image
                            width={20}
                            height={20}
                            src={MailLogo}
                            alt="mail logo"
                            className="opacity-80"
                        />
                        <span>Open Mail App</span>
                    </button>
                </form>

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
