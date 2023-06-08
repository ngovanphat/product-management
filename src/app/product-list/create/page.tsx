"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreateProductPage() {
  const [imageUpload, setImageUpload] = useState("");

  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    console.log(event.target.image.value);
  };

  const handleUploadImage = (event: any) => {
    const file = event.target.files[0] || null;

    setImageUpload(window.URL.createObjectURL(file));
  };

  return (
    <div className="w-full bg-white flex items-center flex-col px-4">
      <p className="text-black font-semibold text-2xl mt-3">Thêm sản phẩm</p>

      <form onSubmit={handleSubmit} className="text-black flex flex-col mt-5">
        <label htmlFor="productName" className="text-lg font-bold mt-3">
          Tên sản phẩm
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          className="border rounded p-2 border-gray-500 hover:border-yellow-300"
          required
        />

        <label htmlFor="price" className="text-lg font-bold mt-3">
          Giá
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="border rounded p-2 border-gray-500 hover:border-yellow-300"
          required
        />

        <label htmlFor="quantity" className="text-lg font-bold mt-3">
          Số lượng
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="border rounded p-2 border-gray-500 hover:border-yellow-300"
          required
        />

        <label htmlFor="image" className="text-lg font-bold mt-3">
          Ảnh bìa
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="border rounded p-2 border-gray-500 hover:border-yellow-300"
          onChange={(event) => handleUploadImage(event)}
          required
          accept="image/*"
        />
        {imageUpload && (
          <Image
            src={imageUpload}
            alt="upload image"
            width={30}
            height={20}
            className="w-full mt-3"
          />
        )}

        <button
          type="submit"
          className="bg-blue-400 font-medium text-lg rounded-full mt-3 p-3 text-white"
        >
          Thêm
        </button>
      </form>
    </div>
  );
}
