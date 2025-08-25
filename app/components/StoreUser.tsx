'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setUser } from "../store/feature/userSlice";
import { useDispatch } from 'react-redux'

import { getProfile, refresh_token } from '../api/services/auth';

export default function StoreUser() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storeuserinfo = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken) {
        router.push('/auth/login');
        return
      }

      try {
        setLoading(true)
        let res = await getProfile({ token: accessToken });
        console.log(res);
        dispatch(setUser(res));
      } catch (error: any) {
        if (error.status === 401 && refreshToken) {
          const res = await refresh_token({ token: refreshToken });

          localStorage.setItem('accessToken', res.accessToken);

          const newRes = await getProfile({ token: res.accessToken });
          dispatch(setUser(newRes));
        } else {
          router.push('/auth/login');
        }
      } finally { setLoading(false) };
    }
    storeuserinfo();

  }, [router, dispatch])

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

  return null
}