"use client";

import { useState } from "react";
import axios from "axios";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [images, setImages] = useState<string[]>([]);

  const handleAddImage = () => {
    setImages((prev) => [...prev, ""]); // add empty slot for URL input
  };

  const handleImageChange = (index: number, value: string) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      image,
      description,
      price: Number(price),
      stock: Number(stock),
      images: images.map((url) => ({ url })),
    };

    try {
      // await axios.post("http://localhost:8000/product", productData, {
      //   headers: { "Content-Type": "application/json" },
      //   withCredentials: true,
      // });
      console.log(productData);

      alert("Product created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full space-y-4"
      >
        <h1 className="text-xl font-bold">Add Product (URLs)</h1>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          placeholder="Main Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          rows={4}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border p-2 w-full rounded"
          required
        />

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Image URLs</label>
            <button
              type="button"
              onClick={handleAddImage}
              className="text-blue-500 hover:underline"
            >
              + Add URL
            </button>
          </div>
          {images.map((url, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Image URL ${index + 1}`}
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="border p-2 w-full rounded mb-2"
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
