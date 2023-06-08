"use client";

import { useState, useId } from "react";
import Image from "next/image";
import addFile from "@/firebase/storage/addFile";
import addData from "@/firebase/firestore/addData";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const [imageUpload, setImageUpload] = useState("");
  const [loading, setLoading] = useState(false);

  const id = Date.now().toString();
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    try {
      setLoading(true);
      const file = event.target.image.files[0];
      const { result: uploadResult, error: uploadError } = await addFile(
        file,
        `image-${id}`
      );
      if (uploadError) {
        throw uploadError;
      }
      const data = {
        id: id,
        productName: event.target.productName.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value,
        imageUrl: uploadResult,
      };

      const { result, error } = await addData("product", id, data);

      if (error) {
        throw error;
      }

      setLoading(false);
      router.back();
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          {loading ? (
            <div role="status" className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="text-white">Loading...</span>
            </div>
          ) : (
            "Thêm"
          )}
        </button>
      </form>
    </div>
  );
}
