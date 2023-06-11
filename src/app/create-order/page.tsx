"use client";
import { Product, productConverter } from "@/components/organism/ProductItem";
import { getData } from "@/firebase/firestore/getData";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { formatVNDCurrency } from "@/utils";
import moment from "moment";
import { useEffect, useState } from "react";

export default function CreateOrder() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [productOptions, setProductOptions] = useState([] as Product[]);
  const [selectedProducts, setSelectedProducts] = useState([] as Product[]);

  useEffect(() => {
    const products = [] as Product[];
    getData("product").then(({ result }) => {
      result?.forEach((item) =>
        products.push(productConverter.fromFirestore(item))
      );
      setProductOptions(products);
    });
  }, []);

  function addProductRow() {
    const newProduct = new Product();
    const newSelectedProduct = [...selectedProducts, newProduct];
    setSelectedProducts(newSelectedProduct);
  }

  return (
    <div className="w-full flex flex-col text-black p-4 bg-white">
      {/* page title */}
      <p className="text-black font-bold text-2xl">Đơn hàng</p>
      {/* date information */}
      <div className="bg-blue-200 w-full rounded-lg p-3 mt-4">
        <div className="flex items-center">
          <p className="text-black font-medium text-lg">Ngày bán:</p>
          <p className="font-semibold text-lg ml-3">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <p className="text-black font-medium text-lg">Tổng số tiền:</p>
            <p className="font-semibold text-lg ml-3">
              {formatVNDCurrency(totalAmount)}
            </p>
          </div>
        </div>
      </div>
      {/* Data input row */}
      {selectedProducts.map((selectedProduct, index) => (
        <div key={index} className="bg-indigo-200 w-full rounded-lg p-3 mt-3">
          {/* select product field */}
          <label
            htmlFor="product"
            className="block mb-2 text-md font-semibold text-gray-900"
          >
            Tên hàng
          </label>
          <div className="relative">
            <select
              id="product"
              className="bg-white-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  w-full appearance-none"
              placeholder="Chọn loại hàng"
              onChange={(event) => console.log(event.target.value)}
            >
              {productOptions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.productName}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute bottom-3 right-3 w-5 h-5" />
          </div>
          {/* input quantity field */}
          <label
            htmlFor="quantity"
            className="block mb-2 text-md font-semibold text-gray-900 mt-3"
          >
            Số lượng
          </label>

          <div className="flex gap-2 items-center justify-center w-full flex-1">
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="bg-white-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full  appearance-none"
              required
              max={100}
            />

            <div className="relative w-28">
              <select
                id="unit"
                className="bg-white-50 border border-gray-300 text-gray-900 text-md font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  w-full appearance-none"
                defaultValue="kg"
              >
                {selectedProduct.unit.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute bottom-3 right-3 w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
      {/* Add product button */}
      <button
        className="rounded-full px-3 py-4 mt-3 w-full text-white bg-black font-semibold flex items-center justify-center"
        onClick={() => addProductRow()}
      >
        <PlusIcon className="w-6 h-6" />
        <p className="ml-3">Thêm sản phẩm</p>
      </button>
    </div>
  );
}
