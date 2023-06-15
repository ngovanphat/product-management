"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChipIncrease } from "../../components/organism/IncreaseChip";
import { Product, ProductItem } from "../../components/organism/ProductItem";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getData } from "@/firebase/firestore/getData";

export default function ProductList() {
  const [products, setProducts] = useState([] as Product[]);

  const numberOfProducts = useMemo(() => products.length, [products]);
  const numberOfQuantity = useMemo(
    () => products.reduce((a, b) => a + b.quantity, 0),
    [products]
  );

  useEffect(() => {
    getData("product").then((val) => {
      const { result, error } = val;
      if (error) {
        alert("Thêm sản phẩm thất bại");
      } else {
        const items = [] as Product[];
        result?.forEach((item) => {
          const { id, productName, quantity, price, unit } = item.data();
          const element = new Product(id, productName, price, quantity, unit);
          items.push(element);
        });
        setProducts(items);
      }
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start w-full px-4 py-4 bg-white ">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-2xl text-black font-bold">Danh sách hàng hóa</p>
      </div>

      <div className="flex justify-between mt-5 w-full gap-3">
        <div className="w-1/2">
          <p className="text-slate-500 text-lg font-medium">Số sản phẩm</p>
          <p className="text-black text-3xl font-semibold py-3">
            {numberOfProducts}
          </p>
        </div>

        <div className="w-1/2">
          <p className="text-slate-500 text-lg font-medium">Hàng trong kho</p>
          <p className="text-black text-3xl font-semibold py-3">
            {numberOfQuantity}
          </p>
        </div>
      </div>

      <Link
        href="/product-list/create"
        className="flex rounded-full bg-blue-500 mt-5 w-full justify-center items-center py-2"
      >
        <PlusIcon className="w-7 h-7 mr-2" color="white" />
        <p className="font-medium text-white text-xl">Thêm sản phẩm </p>
      </Link>

      <div className="w-full">
        <p className="text-slate-500 font-semibold text-lg mt-5">
          Các sản phẩm
        </p>
        <div className="mt-5">
          {products.map((item, index) => (
            <Link
              href={`/product-list/${encodeURIComponent(item.id)}`}
              key={index}
            >
              <div className="py-3">
                <ProductItem {...item} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
