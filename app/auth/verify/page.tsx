"use client";

// loaders
import { HashLoader } from "react-spinners";

// next/navigation
import { useSearchParams, useRouter } from "next/navigation";

// fetcher
import { verifyMagicLink } from "@/app/api/services/auth";

// hooks
import { useEffect } from "react";

// next/image
import Image from "next/image";

// toast 
import toast from "react-hot-toast";

export default function VerifyAccount() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    const handleVerify = async () => {
      try {
        const res = await verifyMagicLink({ token });

        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        toast("logged to account successfully")
        router.push("/");
        window.location.reload()
      } catch (err) {
        console.error("Verification failed:", err);
        toast("Verification failed. Please try again.");
        router.push("/auth/login");
      }
    };

    handleVerify();
  }, [token, router]);

  return (
    <div className="w-full h-screen flex items-center">
      {/* left */}
      <div className="w-full md:w-[50%] h-screen flex items-center justify-center">
        <div className="w-[90%] max-w-[420px] bg-white border border-gray-200 text-gray-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="text-2xl font-semibold">Round</p>
          </div>
          <h1 className="text-2xl font-semibold">
            Verifying your account...
          </h1>
          {/* Loader */}
          <HashLoader color="#6D28D9" size={50} />
          <p className="text-sm text-gray-500">
            Please don’t close this window until loading ends.
          </p>
        </div>
      </div>

      {/* right */}
      <div className="hidden md:block w-[50%] h-screen bg-gray-300">
        <Image
          src="/assets/bg.png"
          alt="background-image"
          fill
          className="object-top object-cover"
        />
      </div>
    </div>
  );
}
