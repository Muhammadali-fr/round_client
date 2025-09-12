"use client"

// react 
import { FormEvent, useState } from "react";

// alert and laoader
import ButtonLoader from "@/app/components/ButtonLoader";
import toast from "react-hot-toast";

// services 
import { create_category } from "@/app/api/services/category";

// types 
import { CategoryType } from "@/app/types/category";

const page = () => {
  // states 
  const [category, setCategory] = useState<string>('');

  // loaders 
  const [loader, setLoader] = useState<boolean>(false);

  // functions 
  const handle_create_category = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    try {
      const res: CategoryType = await create_category(category);
      toast(`${res.name} created successfuly`);
      setCategory('');
    } catch (r) {
      console.log(r);
      toast(r?.response?.data.message || 'something went wrong');
    } finally { setLoader(false) };
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-[500px] w-[90%] bg-white p-5 rounded-lg space-y-3">
        <h1 className="text-2xl font-bold text-violet-800">Create Category</h1>

        <form onSubmit={handle_create_category} className="flex flex-col gap-3">
          <input value={category} onChange={e => setCategory(e.target.value)} className="p-1.5 rounded-lg border border-gray-400 outline-violet-700" placeholder="e.g shoes" type="text" />
          <button className="w-[200px] h-[35px] bg-violet-700 text-white rounded-lg cursor-pointer hover:bg-violet-500 flex items-center justify-center">{loader ? <ButtonLoader /> : 'create'}</button>
        </form>
      </div>
    </div>
  )
}

export default page