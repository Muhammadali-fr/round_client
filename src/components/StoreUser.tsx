"use client";

// react and next 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// services 
import { getUser } from "../api/services/auth";

// redux 
import { useDispatch } from "react-redux";
import { setUser } from "../lib/features/userSlice";

// loader and toast 
import toast from "react-hot-toast";

// assets 
import LogoImage from '@/public/assets/logo.svg';

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
      <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
        <span />
        <Image src={LogoImage} alt="logo" width={120} height={120} className="rounded-full"/>
        <p className="text-black">Loading your account...</p>
      </div>
    );
  }

  return null;
}
