"use client";
// react 
import { useState } from "react";
import { useRouter } from "next/navigation";

// lucide 
import { Camera, Upload } from "lucide-react";

// shadcn 
import { Switch } from "@/components/ui/switch";

// redux 
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

// toast and components
import toast from "react-hot-toast";
import ButtonLoader from "@/app/components/ButtonLoader";

// services 
import { update_user } from "@/app/api/services/user";

export default function UserSettings() {
  // redux 
  const user = useSelector((state: RootState) => state.user.user);

  // states 
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();

  // formdata 
  const [name, setName] = useState<string>(user ? user.name : "name");
  const [file, setProfileImage] = useState<File | null>(null);
  const [isSeller, setIsSeller] = useState<Boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    };
  };

  // main function 
  const handle_update = async () => {
    setLoading(true);
    const role = isSeller ? "SELLER" : "CUSTOMER";

    try {
      const res: any = await update_user({ name, role, file });
      toast(res.message || 'updated successfully');
      router.push("/");
      window.location.reload();
    } catch (err: any) {
      console.log(err);
      toast(err.response.data.message || 'something went wrong updating account');
    } finally { setLoading(false) };
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[600px] mx-auto p-6 space-y-5 bg-white rounded-2xl">
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
                src={preview ? preview : user?.profile}
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
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </section>

        {/* Role Section */}
        <section className="space-y-4">
          <h3 className="block text-sm font-medium text-gray-700">Account Role</h3>

          <div className="flex items-center space-x-3">
            <Switch
              id="seller-mode"
              checked={isSeller}
              onCheckedChange={setIsSeller}
              className="data-[state=checked]:bg-violet-700 data-[state=unchecked]:bg-gray-400 cursor-pointer"
            />
            <label htmlFor="seller-mode" className="cursor-pointer">
              {isSeller ? "Seller Mode Enabled" : "Click to Become a Seller"}
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div>
          <button onClick={handle_update} className="flex items-center justify-center w-[200px] h-[40px] bg-violet-600 text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-violet-700 transition shadow cursor-pointer">

            {loading ?
              <ButtonLoader />
              :
              <p className="flex items-center gap-3">
                <Upload size={16} />
                save changes
              </p>}
          </button>
        </div>
      </div>
    </div>
  );
}
