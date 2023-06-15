"use client";

import { useState, useId } from "react";
import addData from "@/firebase/firestore/addData";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/organism/Loading";
import { SubmitButton } from "@/components/organism/SubmitButton";

export default function CreateProductPage() {
  const [loading, setLoading] = useState(false);

  const id = Date.now().toString();
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    try {
      setLoading(true);
      const data = {
        id: id,
        productName: event.target.productName.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value,
        unit: event.target.unit.value,
      };

      const { error } = await addData("product", id, data);

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

  return (
    <div className="w-[calc(100%_-_20px)] bg-white flex items-center flex-col mx-auto">
      <p className="text-black font-semibold text-2xl mt-3">Thêm sản phẩm</p>

      <form
        onSubmit={handleSubmit}
        className="text-black flex flex-col mt-5 w-full"
      >
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

        <label htmlFor="unit" className="text-lg font-bold mt-3">
          Đơn vị
        </label>
        <input
          type="text"
          id="unit"
          name="unit"
          className="border rounded p-2 border-gray-500 hover:border-yellow-300"
          defaultValue="Kg"
        />

        <SubmitButton type="submit" loading={loading} text="Thêm" />
      </form>
    </div>
  );
}
