"use client";
import { formatVNDCurrency } from "@/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { CubeIcon } from "@heroicons/react/24/solid";
import { getDataRecord } from "@/firebase/firestore/getData";
import { Product } from "@/components/organism/ProductItem";
import { SubmitButton } from "@/components/organism/SubmitButton";
import addData from "@/firebase/firestore/addData";
import { useRouter } from "next/navigation";
export default function OrderDetail({ params }: any) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { id } = params;
  useLayoutEffect(() => {
    getDataRecord("product", id).then((value) => {
      const { error, result } = value;
      if (error || !result?.exists()) {
        setError(true);
      }
      const productData = result?.data();
      setProduct(productData as any);
    });
  }, [id]);

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
      router.push("/product-list");
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  function setFieldProduct(value: any, fieldName: keyof Product) {
    if (!product) return;
    let tempProduct = { ...product };
    tempProduct[fieldName] = value as never;
    setProduct(tempProduct);
  }

  if (!id || error)
    return (
      <div className="w-full flex items-center justify-center bg-white">
        <p className="text-black font-bold">Sản phẩm không tồn tại</p>
      </div>
    );
  return (
    <main className="flex min-h-screen flex-col items-start justify-start w-full py-4 bg-white ">
      <div className="flex flex-row items-center justify-between w-full px-4">
        <p className="text-2xl text-black font-bold">Thông tin sản phẩm</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="text-black flex flex-col mt-5 w-full px-4"
      >
        <label htmlFor="productName" className="text-lg font-bold mt-3">
          Tên sản phẩm
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          className="border rounded p-2 border-gray-500 hover:border-yellow-300"
          value={product?.productName || ""}
          onChange={(event) =>
            setFieldProduct(
              event.target.value,
              event.target.name as keyof Product
            )
          }
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
          value={product?.price || 0}
          onChange={(event) =>
            setFieldProduct(
              event.target.value,
              event.target.name as keyof Product
            )
          }
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
          value={product?.quantity || 0}
          onChange={(event) =>
            setFieldProduct(
              event.target.value,
              event.target.name as keyof Product
            )
          }
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
          value={product?.unit || ""}
          onChange={(event) =>
            setFieldProduct(
              event.target.value,
              event.target.name as keyof Product
            )
          }
          defaultValue="Kg"
        />

        <SubmitButton type="submit" loading={loading} text="Chỉnh sửa" />
      </form>
    </main>
  );
}
