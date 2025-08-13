"use client"
import { Save, Camera } from "lucide-react";
import { useState } from "react";

export default function UserSettings() {
  const [isSeller, setIsSeller] = useState(false);
  const [profileImage, setProfileImage] = useState("/assets/default-user.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="text-sm text-gray-500">Update your info and role</p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-28 h-28">
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-violet-600 p-2 rounded-full shadow-md hover:bg-violet-500 cursor-pointer"
            >
              <Camera size={16} className="text-white" />
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">Click camera to change image</p>
        </div>

        {/* Name Field */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-800"
          />
        </div>

        {/* Role Switch */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
          <span className="text-gray-700 font-medium">
            {isSeller ? "Seller" : "Buyer"}
          </span>
          <button
            onClick={() => setIsSeller(!isSeller)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
              isSeller ? "bg-violet-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isSeller ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        {/* Save Button */}
        <button className="w-full py-3 bg-violet-600 text-white rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-violet-500 transition">
          <Save size={18} />
          Save
        </button>
      </div>
    </div>
  );
}
