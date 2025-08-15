"use client"

import { X, ImagePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductPage() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImage = (e: any) => {
    const fileArray = Array.from(e);

    if (images.length + fileArray.length > 6) {
      toast("You can't upload more than 6 images");
      return;
    }

    setImages((prev) => [...prev, ...fileArray]);
  }

  const handle_remove = (id: number) => {
    setImages(images.filter((_, i) => i !== id))
  }

  const handle_upload = () => {
    if (images.length === 0) {
      toast('please upload at least 1 image')
      return
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append('image', images[0]);
    images.forEach(img => formData.append('images', img))
    console.log(formData);
  }

  const handle_clear = () => {
    setImages([])
  }

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
            <button onClick={handle_clear} className="text-red-600 text-sm underline hover:text-red-500">
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

            <button onClick={handle_upload} className="text-sm bg-violet-700 text-white px-5 py-2 rounded-lg hover:bg-violet-500 transition cursor-pointer">
              Publish Product
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
