"use client";

// react-router-dom 
import Link from "next/link";

// lucide 
import { Pencil, Trash2 } from "lucide-react";

// redux
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

// animations 
import EmptyAnimations from "@/public/animations/empty.json";
import LottieAnimation from "@/app/components/LottieAnimation";

// types
type Product = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  images?: string[];
};

export default function Products() {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user || !user.products || user.products.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <LottieAnimation
          animationData={EmptyAnimations}
          loop={true}
          className="w-[320px] h-[320px]"
        />
        <Link href={'/upload'}><p className="text-lg">No Products yet</p></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-violet-800 flex items-top gap-2">Your Products <p className="text-sm">({user.products.length})</p></h1>

      <div className="grid grid-cols-5 gap-3">
        {/* card  */}
        {
          user.products.map((product) => (
            < div className="w-full h-[400px] bg-white rounded-lg flex items-center justify-between flex-col p-1 gap-2 relative" >

              {/* image  */}
              <img className="w-full h-[80%] rounded-lg" src={product.image} alt="product image" />

              {/* name  */}
              <p className="line-clamp-2 text-sm">{product.name}</p>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-1 rounded-lg cursor-pointer hover:bg-blue-500"><Pencil size={14} />edit</button>

              {/* delete button  */}
              < div title="delete" className="bg-white p-2 border rounded-full text-red-500 cursor-pointer hover:bg-red-100 absolute top-3 right-3" >
                <Trash2 size={20} />
              </div>
            </div>
          ))
        }


      </div >
    </div >
  );
}
