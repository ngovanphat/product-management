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
import { AddItemContainer } from "./AddItemContainer";

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

  function submitOrder() {
    const order = {
      itemList: [] as Array<Product>,
      totalAmount: totalAmount,
      createdAt: moment().format("DD/MM/YYYY"),
    };

    const itemList = [] as Array<Product>;

    selectedProducts.forEach((item) => {
      const idx = itemList.findIndex((e) => (e.id = item.id));

      if (idx !== -1) {
        itemList[idx].quantity += item.quantity;
      } else itemList.push(item);
    });

    order.itemList = itemList;
  }

  function calculateTotalAmount(items: Array<Product>): number {
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
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = {
      ...product,
      quantity: 0,
    };
    setSelectedProducts(newSelectedProducts);
  }

  function handleUpdateProductField(
    index: number,
    value: string,
    fieldName: keyof Product
  ) {
    const newSelectedProducts = [...selectedProducts];
    const item = newSelectedProducts[index];
    item[fieldName] = Number.parseInt(value) as never;
    setSelectedProducts(newSelectedProducts);
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
          <AddItemContainer
            key={index}
            index={index}
            productOptions={productOptions}
            selectedProduct={selectedProduct}
            handleSelectProduct={handleSelectProduct}
            updateProductField={handleUpdateProductField}
          />
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
          onClick={() => submitOrder()}
        >
          <DocumentPlusIcon className="w-6 h-6" />
          <p className="ml-3">Lưu đơn hàng</p>
        </button>
      </div>
    </div>
  );
}
