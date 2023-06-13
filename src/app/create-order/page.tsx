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
import addData from "@/firebase/firestore/addData";
import { useRouter } from "next/navigation";

export default function CreateOrder() {
  const [productOptions, setProductOptions] = useState([] as Product[]);
  const [selectedProducts, setSelectedProducts] = useState([] as Product[]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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

  async function submitOrder() {
    try {
      setLoading(true);

      const order = {
        itemList: [] as Array<Product>,
        totalAmount: totalAmount,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      const itemList = [] as Array<Product>;

      selectedProducts.forEach((item) => {
        const idx = itemList.findIndex((e) => e.id === item.id);

        if (idx !== -1) {
          itemList[idx].quantity += item.quantity;
        } else itemList.push(item);
      });

      order.itemList = itemList;
      const { error } = await addData("histories", order.createdAt, order);

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

  function removeProductRow(index: number) {
    selectedProducts.splice(index, 1);
    const newSelectedProducts = [...selectedProducts];
    setSelectedProducts(newSelectedProducts);
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
            onRemove={removeProductRow}
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
          disabled={loading}
          onClick={() => submitOrder()}
        >
          {loading ? (
            <div role="status" className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <>
              <DocumentPlusIcon className="w-6 h-6" />
              <p className="ml-3">Lưu đơn hàng</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
