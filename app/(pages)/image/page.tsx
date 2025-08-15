"use client";

import { upload_image_product } from "@/app/api/services/products";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState(null)

  const handleImage = (e: any) => {
      setFile(e.target.files[0]);
  };

  const upload_image = async () => {
    if (!file) return alert("Please select a file first");
    try {
      const res = await upload_image_product(file);
      console.log("Upload success", res);
      setImage(res.url)
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImage} />
      <button onClick={upload_image}>Upload</button>

      <img src={image} alt="asdasd" />
    </div>
  );
}
