"use client";
import { Save, Camera, Store } from "lucide-react";
import { useState } from "react";

export default function UserSettings() {
  const [profileImage, setProfileImage] = useState("/assets/default-user.png");
  const [isSeller, setIsSeller] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleBecomeSeller = () => {
    setIsSeller(true);
    // TODO: send request to backend
    console.log("User became a seller!");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12 space-y-12">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-violet-800">Profile Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your personal information and account preferences
        </p>
      </div>

      {/* Profile Info */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Profile Info</h3>

        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-violet-300 shadow-sm"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-violet-600 p-2 rounded-full shadow hover:bg-violet-500 cursor-pointer transition"
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
          <div>
            <p className="font-medium text-gray-700">Profile Photo</p>
            <p className="text-xs text-gray-500">
              Click the camera to upload a new profile image
            </p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
          />
        </div>
      </section>

      {/* Role Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Account Role</h3>

        {!isSeller ? (
          <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-start gap-3">
            <p className="text-sm text-gray-600">
              You are currently a <span className="font-medium">Buyer</span>.  
              Become a seller to list products, manage your store, and start selling.
            </p>
            <button
              onClick={handleBecomeSeller}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-violet-700 transition"
            >
              <Store size={16} />
              Become a Seller
            </button>
          </div>
        ) : (
          <div className="p-4 border border-green-300 rounded-lg bg-green-50">
            <p className="text-sm text-green-700 font-medium">
              ✅ You are registered as a Seller. You can now manage and sell products.
            </p>
          </div>
        )}
      </section>

      {/* Save Button */}
      <div>
        <button className="px-6 py-2.5 bg-violet-600 text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-violet-700 transition shadow">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
