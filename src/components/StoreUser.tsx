"use client";

// react and next 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// services 
import { getUser } from "../api/services/auth";

// redux 
import { useDispatch } from "react-redux";
import { setUser } from "../lib/features/userSlice";

// loader and toast 
import toast from "react-hot-toast";

export default function StoreUser() {
  // states 
  const [loading, setLoading] = useState(false);

  // redux 
  const dispatch = useDispatch();

  // veriables 
  const router = useRouter();

  // functions 
  const getUserFunction = async () => {
    try {
      setLoading(true);
      const { user, success } = await getUser();
      if (success) {
        dispatch(setUser(user));
      } else {
        toast('something went wrong login again')
        router.replace('/auth/login');
      }
    } catch (error) {
      console.log(error);
      toast('something went wrong login again')
      router.replace('/auth/login');
    } finally { setLoading(false) };
  };

  // useEffects 
  useEffect(() => {
    getUserFunction();
  }, []);

  // returns 
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-10">
        <span />
        <img
          className="w-[120px] h-[120px] rounded-full"
          src="/assets/logo.svg"
          alt="logo"
        />
        <p className="text-black">Loading your account...</p>
      </div>
    );
  }

  return null;
}
