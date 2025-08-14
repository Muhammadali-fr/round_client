
import { X, Trash2, Upload } from "lucide-react";

export default function AddProductPage() {
  return (
    <div className="p-5">
      <div className="max-w-[990px] w-[90%] border mx-auto bg-white rounded-xl p-5">
        <h1 className="text-xl font-bold text-gray-600 mb-2">Add Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Upload */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="border-2 border-dashed border-violet-300 rounded-lg flex flex-col items-center justify-center p-10 cursor-pointer hover:border-violet-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0L9.75 12m2.25-2.25l2.25 2.25M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0L12 3l9 5.25"
                />
              </svg>
              <p className="text-gray-500">
                Drop your files here. or{" "}
                <span className="text-violet-500 cursor-pointer">Browse</span>
              </p>
            </div>

            {/* Uploaded Files */}
            <div className="mt-4 space-y-3">
              {[
                { name: "Navy Blue Shoe 01.png", size: "482 KB" },
                { name: "Navy Blue Shoe 02.png", size: "512 KB" },
                { name: "Navy Blue Shoe 03.png", size: "478 KB" },
              ].map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border border-gray-200 rounded-lg p-3"
                >
                  <div>
                    <p className="text-gray-800 text-sm">{file.name}</p>
                    <p className="text-gray-400 text-xs">{file.size}</p>
                  </div>

                  {/* delete  */}
                  <button className="p-2 text-red-600 cursor-pointer rounded-full border hover:bg-gray-100">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cancel */}
            <button className="text-red-600 text-sm underline hover:text-red-500">
              Cancel
            </button>
          </div>

          {/* Right Side - Form */}
          <div className="space-y-5">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
              <input
                type="text"
                placeholder="Professional butsi va sorokonojka..."
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Price
              <input
                type="text"
                placeholder="140 000 so'm"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
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

            <button className="bg-violet-700 text-white px-5 py-2 rounded-lg hover:bg-violet-500 transition cursor-pointer">
              Publish Product
            </button>

          </div>
          
        </div>
      </div>
    </div>
  );
}
