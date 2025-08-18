"use client"

import { create_product, upload_image_product } from "@/app/api/services/products";
import ButtonLoader from "@/app/components/ButtonLoader";
import { X, ImagePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

// animation 
import LottieAnimation from "@/app/components/LottieAnimation";
import UploadImageAnimation from "@/public/animations/uploadImage.json";

export default function AddProductPage() {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImage = (e: any) => {
    setImages([...e.target.files])
  };

  // main function 
  const handle_upload = async () => {
    if (images.length < 1) {
      toast('upload at least 1 image');
      return;
    }

    setLoader(true);

    try {
      const image_array = await upload_image_product(images);

      if (!image_array) {
        toast('something wen wrong.')
      }

      // main image 
      const { url } = image_array[0];

      const data = {
        name,
        image: url,
        description,
        price: Number(price),
        stock: Number(stock),
        images: image_array
      }

      const res = await create_product(data)
      console.log(res);

      toast('uploaded successfully')
    } catch (error) {
      toast(error.message || 'error while creating');
    } finally { setLoader(false) }
  }

  const handle_remove = (id: number) => {
    setImages(images.filter((_, i) => i !== id));
  };

  const handle_clear = () => {
    setImages([])
  }

  return (
    <div className="p-5">
      <div className="max-w-[990px] w-[95%] border mx-auto bg-white rounded-xl p-5">
        <h1 className="text-xl font-bold text-gray-600 mb-2">Add Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Upload */}
          <div>
            <label className="border-2 border-dashed border-violet-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-violet-500 transition">

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

            {images.length === 0 &&
              <label htmlFor="imagesInput" className="w-full flex items-center justify-center flex-col">
                <LottieAnimation
                  animationData={UploadImageAnimation}
                  loop={true}
                  className="w-[200px] h-[200px]"
                />
                <p className="text-xl text-gray-800">Upload at least 1 image</p>
              </label>
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
              <input
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="number"
                placeholder="140 000 so'm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </label>

            {/* stock */}
            <label className="block text-sm font-medium text-gray-700">
              stock
              <input
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
                Tags
              </label>
              <div className="flex flex-wrap gap-1 border border-gray-300 rounded-lg p-3">
                {[
                  "Sneaker",
                  "Shoe",
                  "Footwear",
                  "Fashion",
                  "Blue",
                  "Stylish",
                  "Nike",
                  "Menshoes",
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag} <X size={14} className="cursor-pointer" />
                  </span>
                ))}
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
