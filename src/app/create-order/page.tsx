"use client";
import { Product, productConverter } from "@/components/organism/ProductItem";
import { getData } from "@/firebase/firestore/getData";
import {
  ChevronDownIcon,
  PlusIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import { formatVNDCurrency } from "@/utils";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

export default function CreateOrder() {
  const [productOptions, setProductOptions] = useState([] as Product[]);
  const [selectedProducts, setSelectedProducts] = useState([] as Product[]);

  const totalAmount = useMemo(
    () => calculateTotalAmount(selectedProducts),
    [selectedProducts]
  );

  useEffect(() => {
    const products = [] as Product[];
    getData("product").then(({ result }) => {
      result?.forEach((item) =>
        products.push(productConverter.fromFirestore(item))
      );
      setProductOptions(products);
    });
  }, []);

  function calculateTotalAmount(items: Array<Product>): number {
    console.log(items);
    const values = items.map((item) => item.price * item.quantity);
    const sumValue = values.reduce((a, b) => a + b, 0);
    return sumValue;
  }

  function addProductRow() {
    const newProduct = new Product();
    const newSelectedProduct = [...selectedProducts, newProduct];
    setSelectedProducts(newSelectedProduct);
  }

  function handleSelectProduct(index: number, productId: string) {
    const product = productOptions.filter(
      (options) => options.id === productId
    )[0];
    if (!product) return;
    selectedProducts[index] = {
      ...product,
      quantity: 0,
    };
  }

  return (
    <div className="w-full flex flex-col text-black bg-white py-5">
      <div className="w-full p-2">
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
                onChange={(event) =>
                  handleSelectProduct(index, event.target.value)
                }
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
                value={selectedProducts[index].quantity}
                onChange={(event) => {
                  const newSelectedProducts = [...selectedProducts];
                  newSelectedProducts[index] = {
                    ...newSelectedProducts[index],
                    quantity: Number.parseInt(event.target.value),
                  };
                  setSelectedProducts(newSelectedProducts);
                }}
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
            {/* input amount of money */}
            <label
              htmlFor="quantity"
              className="block mb-2 text-md font-semibold text-gray-900 mt-3"
            >
              Đơn giá
            </label>

            <div className="flex gap-2 items-center justify-center w-full flex-1">
              <input
                type="number"
                id="amount"
                name="amount"
                className="bg-white-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full  appearance-none"
                required
                value={selectedProducts[index].price}
                onChange={(event) => {
                  const newSelectedProducts = [...selectedProducts];
                  newSelectedProducts[index] = {
                    ...newSelectedProducts[index],
                    price: Number.parseInt(event.target.value),
                  };
                  setSelectedProducts(newSelectedProducts);
                }}
              />

              <div className="w-28 flex justify-center">
                <p className="text-lg font-medium text-black">VND</p>
              </div>
            </div>
          </div>
        ))}
        {/* Add product button */}
        <button
          className="rounded-full px-3 py-4 mt-3 max-w-max text-white bg-black font-semibold flex items-center justify-center m-auto"
          onClick={() => addProductRow()}
        >
          <PlusIcon className="w-6 h-6" />
          <p className="ml-3">Thêm sản phẩm</p>
        </button>
      </div>

      <div className="w-full border-t mt-3 border-black"></div>
      <div className="w-full py-2 px-4 mt-2 bg-white text-black flex justify-between">
        <p className="text-lg font-semibold">Tổng:</p>
        <p className="text-lg font-bold">{formatVNDCurrency(totalAmount)}</p>
      </div>

      <div className="w-full px-2">
        <button
          className="rounded-full px-3 py-4 mt-3 text-white bg-blue-500 font-semibold flex items-center justify-center w-full"
          onClick={() => addProductRow()}
        >
          <DocumentPlusIcon className="w-6 h-6" />
          <p className="ml-3">Lưu đơn hàng</p>
        </button>
      </div>
    </div>
  );
}
