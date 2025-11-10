'use client'

// next and react 
import Image from "next/image";
import { useEffect, useState } from "react";

// redux 
import { useSelector } from "react-redux";
import { RootState } from "@/src/lib/store";

// assets
import defaultUserImage from '@/public/assets/default-user.jpeg';

// lucide 
import { Camera } from "lucide-react";

// components 
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

// tanstack 
import { useForm } from '@tanstack/react-form';

// interface and types 
interface IForm {
  image: File | null;
  name: string;
  role: 'SELLER' | 'CUSTOMER';
};

export default function EditUser() {

  // redux 
  const user = useSelector((state: RootState) => state.user.data);

  const form = useForm({
    defaultValues: {
      image: null,
      name: user?.name || '',
      role: user?.role || 'CUSTOMER',
    } as IForm,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const previewImage = form.state.values.image ?
    URL.createObjectURL(form.state.values.image) : user?.profile || defaultUserImage;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[400px] mx-auto border rounded-xl p-5 my-5">
        <h1 className="text-xl font-bold text-gray-600 mb-2">Edit User</h1>
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="flex flex-col gap-5">

          {/* image*/}
          <form.Field name="image">
            {(field) => (
              <label className="flex flex-col items-center">
                <div className="w-[200px] h-[200px] rounded-full bg-red-300 relative">
                  <Image className="w-full h-full rounded-full object-cover" width={200} height={200} src={previewImage} alt="user's image" />
                  <span className="w-[40px] h-[40px] bg-violet-100 absolute bottom-2 right-2 flex items-center justify-center rounded-full border border-violet-300 hover:bg-violet-200 cursor-pointer"><Camera color="#8B5CF6" /></span>
                </div>
                <Input onChange={(e) => field.handleChange(e.target.files[0])} className="hidden" type="file" />
              </label>
            )}
          </form.Field>

          {/* name  */}
          <form.Field name="name">
            {(field) => (
              <label>
                <span>Enter your name</span>
                <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="outline-violet-700" placeholder="Name..." />
              </label>
            )}
          </form.Field>

          {/* role */}
          <form.Field name="role">
            {(field) => (
              <label className="select-none">
                <span>Choose your role</span>
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg border border-gray-300">
                  <span>{field.state.value}</span>
                  <Switch checked={field.state.value === 'SELLER'} onCheckedChange={(checked) => { field.handleChange(checked ? 'SELLER' : 'CUSTOMER') }} className="bg-violet-700" />
                </div>
              </label>
            )}
          </form.Field>

          <div className="flex justify-end">
            <Button type="submit" className="w-[200px] bg-violet-700 hover:bg-violet-500 cursor-pointer">save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};