"use client"

import { X, Trash2, Upload, ImagePlus } from "lucide-react";
import { useState } from "react";

export default function AddProductPage() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImage = (e: any) => {

    const fileArray = Array.from(e);
    setImages((prev) => [...prev, ...fileArray]);
  }

  console.log(images);


  return (
    <div className="p-5">
      <div className="max-w-[990px] w-[95%] border mx-auto bg-white rounded-xl p-5">
        <h1 className="text-xl font-bold text-gray-600 mb-2">Add Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Upload */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="border-2 border-dashed border-violet-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-violet-500 transition">

              <ImagePlus className="h-12 w-12 text-gray-400 mb-3" />

              <p className="text-gray-500">
                Drop your files here. or{" "}
                <span className="text-violet-500 cursor-pointer">Browse</span>
              </p>

              {/* upload input  */}
              <input
                multiple
                onChange={(e) => handleImage(e.target.files)}
                className="hidden"
                type="file"
              />

            </label>

            {/* Uploaded Files */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className="w-full h-[100px]"
                >
                  <img className="w-full h-full object-cover rounded" src={URL.createObjectURL(file)} alt={file.name} />

                  {/* delete 
                  <button className="p-2 text-red-600 cursor-pointer rounded-full border hover:bg-gray-100">
                    <Trash2 size={18} />
                  </button> */}
                </div>
              ))}
            </div>

            {/* Cancel */}
            <button className="text-red-600 text-sm underline hover:text-red-500">
              clear
            </button>
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
                type="text"
                placeholder="140 000 so'm"
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

            <button className="text-sm bg-violet-700 text-white px-5 py-2 rounded-lg hover:bg-violet-500 transition cursor-pointer">
              Publish Product
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
