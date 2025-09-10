"use client"

import { create_product, upload_image_product } from "@/app/api/services/products";
import ButtonLoader from "@/app/components/ButtonLoader";
import { X, ImagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// router 
import { useRouter } from "next/navigation";
import { get_categories } from "@/app/api/services/category";

// types 
import { CategoryType } from "@/app/types/category";
import Loader from "@/app/components/Loader";

export default function AddProductPage() {
  // states 
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [numberPrice, setNumberPrice] = useState<number>(0);
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [categoryArray, setCategoryArray] = useState<CategoryType[]>([]);

  // loader states 
  const [loader, setLoader] = useState<Boolean>(false);
  const [categoryLoader, setCategoryLoader] = useState<Boolean>(false);

  // router 
  const router = useRouter()

  const handleImage = (e: any) => {
    setImages([...e.target.files]);
  };

  // get categories array 
  const handle_get_categories = async () => {
    setCategoryLoader(true);
    try {
      const res: CategoryType[] = await get_categories();
      setCategoryArray(res);
    } catch (r) {
      console.log(r);
      toast('pls reload page');
    } finally { setCategoryLoader(false) };
  };

  useEffect(() => {
    handle_get_categories();
  }, []);

  // main function 
  const handle_upload = async () => {
    if (images.length < 1) {
      toast('upload at least 1 image');
      return;
    };

    if (!category) {
      toast('choose category');
      return;
    };

    setLoader(true);

    try {
      const image_array = await upload_image_product(images);

      if (!image_array) {
        toast('something went wrong.');
      };

      // main image 
      const { url } = image_array[0];

      const data = {
        name,
        image: url,
        description,
        price: numberPrice,
        stock: Number(stock),
        images: image_array,
        category,
      };

      const res = await create_product(data);
      console.log(res);

      toast('uploaded successfully');
      router.push('/user/products');
      window.location.reload();
    } catch (error: any) {
      toast(error.response.data.message || 'error while creating');
    } finally { setLoader(false) };
  };

  const handle_remove = (id: number) => {
    setImages(images.filter((_, i) => i !== id));
  };

  const handle_clear = () => {
    setImages([]);
  };

  const handle_price_change = (e: any) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    setPrice(formatted);

    const numeric = Number(raw);
    setNumberPrice(numeric);
  }

  const handleCategory = (e: string) => {
    if (e === category) {
      setCategory(null);
    } else {
      setCategory(e);
    }
  }

  return (
    <div className="p-5">
      <div className="max-w-[990px] w-[95%] border mx-auto bg-white rounded-xl p-5">
        <h1 className="text-xl font-bold text-gray-600 mb-2">Add Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Upload */}
          <div>
            <label className={`${images.length === 0 ? "h-full" : "h-auto"} border-2 border-dashed border-violet-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-violet-500 transition`}>

              <ImagePlus className="h-12 w-12 text-gray-400 mb-3" />

              <p className="text-gray-500">
                Drop your files here. or{" "}
                <span className="text-violet-500 cursor-pointer">Browse</span>
              </p>

              {/* upload input  */}
              <input
                multiple
                onChange={handleImage}
                className="hidden"
                type="file"
                id="imagesInput"
              />

            </label>

            {/* Uploaded Files */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className="w-full h-[200px] relative"
                >
                  <img className="w-full h-full object-cover rounded-lg bg-gray-200 border" src={URL.createObjectURL(file)} alt={file.name} />

                  <button onClick={() => handle_remove(idx)} className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-300 rounded-full p-1 cursor-pointer">
                    <X size={15} color="red" />
                  </button>

                  {idx === 0 &&
                    <div className="absolute top-2 left-2 bg-violet-700 text-white text-sm px-3 rounded">main</div>
                  }
                </div>
              ))}
            </div>

            {/* Cancel */}
            {images.length > 1 &&
              <button onClick={handle_clear} className="text-red-600 text-sm underline hover:text-red-500">
                clear
              </button>
            }

          </div>

          {/* Right Side - Form */}
          <div className="space-y-5">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Professional butsi va sorokonojka..."
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Price
              <div className="relative mt-1">
                <input
                  value={price}
                  onChange={handle_price_change}
                  type="text"
                  placeholder="140 000"
                  className="w-full border border-gray-300 rounded-lg py-2 pr-12 pl-3 focus:ring-2 focus:ring-violet-500 outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                  so'm
                </span>
              </div>
            </label>


            {/* stock */}
            <label className="block text-sm font-medium text-gray-700">
              stock
              <input
                min={0}
                value={stock}
                onChange={e => setStock(e.target.value)}
                type="number"
                placeholder="6"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Yengil va bardoshli: Uzoq muddatli foydalanish uchun mos."
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
              ></textarea>
            </label>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                categories
              </label>
              <div className="flex flex-wrap gap-1 border border-gray-300 rounded-lg p-3">
                {categoryLoader ?
                  <div className="p-2 w-full flex items-center justify-center bg-violet-100 rounded-lg">
                     <Loader />
                  </div>
                :
                  categoryArray.map((tag) => (
                    <span
                      key={tag.id}
                      onClick={() => handleCategory(tag.name)}
                      className={`${category === tag.name ? "bg-violet-700 text-white" : "bg-violet-100 text-violet-600"}  px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer select-none`}
                    >
                      {tag.name}

                      {
                        category === tag.name &&
                        <X size={14} className="cursor-pointer" />
                      }
                    </span>
                  ))
                }
              </div>
            </div>

            <button onClick={handle_upload} className="w-[200px] h-[40px] text-sm bg-violet-700 text-white rounded-lg hover:bg-violet-500 transition cursor-pointer flex items-center justify-center">
              {loader ? <ButtonLoader /> : "Upload product"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
