"use client"

import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [extraImages, setExtraImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setMainImage(e.target.files[0]);
  };

  const handleExtraImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setExtraImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append text fields
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);

    // Append main image
    if (mainImage) formData.append("image", mainImage);

    // Append extra images
    extraImages.forEach((file) => {
      formData.append("images", file); // same key for array
    });

    console.log(formData);

    alert("Product uploaded!");
  };

  return (
    <div>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="stock" placeholder="Stock" onChange={handleChange} />

      <p>Main Image</p>
      <input type="file" onChange={handleMainImage} />

      <p>Extra Images</p>
      <input type="file" multiple onChange={handleExtraImages} />

      <button onClick={handleSubmit}>Upload Product</button>
    </div>
  );
}
