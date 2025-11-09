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

export default function EditUser() {
  // states 
  const [profileImage, setProfileImage] = useState<null | File>(null);
  const [switchState, setSwitchState] = useState(false);
  const [name, setName] = useState('');

  // redux 
  const user = useSelector((state: RootState) => state.user.data);

  // image preview 
  const previewImage = profileImage ? URL.createObjectURL(profileImage) : user?.profile || defaultUserImage;

  // functions 
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // your function here 
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[400px] mx-auto border rounded-xl p-5 my-5">
        <h1 className="text-xl font-bold text-gray-600 mb-2">Edit User</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* image*/}
          <label className="flex flex-col items-center">
            <div className="w-[200px] h-[200px] rounded-full bg-red-300 relative">
              <Image className="w-full h-full rounded-full object-cover" width={200} height={200} src={previewImage} alt="user's image" />
              <span className="w-[40px] h-[40px] bg-violet-100 absolute bottom-2 right-2 flex items-center justify-center rounded-full border border-violet-300 hover:bg-violet-200 cursor-pointer"><Camera color="#8B5CF6" /></span>
            </div>
            <Input onChange={(e) => setProfileImage(e.target.files?.[0] || null)} className="hidden" type="file" />
          </label>
          {/* name  */}
          <label>
            <span>Enter your name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="outline-violet-700" placeholder="Name..." />
          </label>
          {/* role */}
          <label className="select-none">
            <span>Choose your role</span>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg border border-gray-300">
              <span>{switchState ? 'SELLER' : 'CUSTOMER'}</span>
              <Switch checked={switchState} onCheckedChange={setSwitchState} className="bg-violet-700" />
            </div>
          </label>

          <div className="flex justify-end">
            <Button type="submit" className="w-[200px] bg-violet-700 hover:bg-violet-500 cursor-pointer">save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};