"use client";

// react and next 
import Image from "next/image";
import { useState } from "react";

// services 
import { getUser, authRefreshToken } from "../api/services/auth";

// redux 
import { useDispatch } from "react-redux";
import { setUser } from "../lib/features/userSlice";
import { setUserProducts } from "../lib/features/userProducts";

// assets 
import LogoImage from '@/public/assets/logo.svg';

// tanstack query 
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function StoreUser() {
  // redux 
  const dispatch = useDispatch();

  // states 
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // tokens 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem("accessToken"));
      setRefreshToken(localStorage.getItem("refreshToken"));
    };
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser({ token: accessToken }),
    enabled: !!accessToken,
    retry: false
  });

  if (isPending) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
        <span />
        <Image src={LogoImage} alt="logo" width={120} height={120} className="rounded-full" />
        <p className="text-black">Loading your account...</p>
      </div>
    );
  };

  useEffect(() => {
    if (data?.success) {
      dispatch(setUser(data.user));
      dispatch(setUserProducts(data.user.products));
      return;
    };
  }, [data]);

  const { data: refreshData, isPending: refreshPending } = useQuery({
    queryKey: ['reUser'],
    queryFn: () => authRefreshToken(refreshToken),
  });
  console.log(refreshData);



  // // console.log(data);
  // if (data?.success) {
  //   dispatch(setUser(data?.user));
  //   dispatch(setUserProducts(data?.user?.products));
  // } else {

  //   const { data: refreshData, isPending: refreshPending, error: refreshError } = useQuery({
  //     queryKey: ['reUser'],
  //     queryFn: () => authRefreshToken(refreshToken),
  //   });

  //   if (refreshData?.success) {
  //     localStorage.setItem('accessToken', refreshData?.accessToken);
  //   };
  // };

  // returns 
  if (isPending) {
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
