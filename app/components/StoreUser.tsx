"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile, refresh_token } from "../api/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/feature/userSlice";
import { RootState } from "../store/store";

export default function StoreUser() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const storeUserInfo = async () => {
      let accessToken = localStorage.getItem("accessToken");

      
      if (!user) {
        setLoader(true);
        try {
          
          if (accessToken) {
            const profile = await getProfile({ token: accessToken });
            dispatch(setUser(profile));
            return; 
          }

          throw new Error("No access token found"); 
        } catch (error) {
          console.log("Access token invalid or missing → refreshing...");
          try {
            const refreshed = await refresh_token();
            accessToken = refreshed.accessToken;

            localStorage.setItem("accessToken", accessToken);

            const profile = await getProfile({ token: accessToken });
            dispatch(setUser(profile));
          } catch (e) {
            console.error("Refresh failed → redirecting to login");
            router.push("/auth/login");
          }
        } finally {
          setLoader(false);
        }
      }
    };

    storeUserInfo();
  }, [dispatch, router, user]);

  if (loader) {
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
