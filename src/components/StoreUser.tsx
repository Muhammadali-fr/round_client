"use client";

// react and next 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// services 
import { getUser, authRefreshToken } from "../api/services/auth";

// redux 
import { useDispatch } from "react-redux";
import { setUser } from "../lib/features/userSlice";
import { setUserProducts } from "../lib/features/userProducts";

// loader and toast 
import toast from "react-hot-toast";

// assets 
import LogoImage from '@/public/assets/logo.svg';
import { UserProp } from "../types/user";

export default function StoreUser() {
  // states 
  const [loading, setLoading] = useState(false);

  // redux 
  const dispatch = useDispatch();

  // veriables 
  const router = useRouter();

  // functions 
  const getUserFunction = async () => {
    // tokens 
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      return router.push('/auth/login');
    };

    try {
      setLoading(true);
      const { user, success }: {user: UserProp, success: boolean} = await getUser({ token: accessToken });
      if (success) {
        dispatch(setUser(user));
        dispatch(setUserProducts(user.products));
      } else {
        const { accessToken, success } = await authRefreshToken({ token: refreshToken });
        if (success) {
          toast('wait we are logging again into your account...');
          localStorage.setItem('accessToken', accessToken);
          return window.location.reload();
        };
        router.push('auth/login');
      };
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
        <Image src={LogoImage} alt="logo" width={120} height={120} className="rounded-full" />
        <p className="text-black">Loading your account...</p>
      </div>
    );
  }

  return null;
}
