"use client";

// react and next 
import { useEffect, useState } from "react";

// services 
import { getUser } from "../api/services/auth";

// redux 
import { useDispatch } from "react-redux";
import { setUser } from "../lib/features/userSlice";

export default function StoreUser() {
  // states 
  const [loading, setLoading] = useState(false);

  // redux 
  const dispatch = useDispatch();

  // functions 
  const getUserFunction = async () => {
    try {
      setLoading(true);
      const user = await getUser();
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
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
