"use client";
import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getData } from "@/firebase/firestore/getData";
import { Product } from "@/components/organism/ProductItem";
import { formatVNDCurrency } from "@/utils";

export class Order {
  createdAt: string;
  itemList: Array<Product>;
  totalAmount: number;

  constructor(createdAt = "", itemList = [], totalAmount = 0) {
    this.createdAt = createdAt;
    this.itemList = itemList;
    this.totalAmount = totalAmount;
  }
}

export default function OrderList() {
  const [orders, setOrders] = useState([] as Order[]);

  useEffect(() => {
    getData("histories").then((val) => {
      const { result, error } = val;
      if (error) {
        alert("Tải danh sách đơn hàng thất bại!");
      } else {
        const items = [] as Order[];
        result?.forEach((item) => {
          const { createdAt, itemList, totalAmount } = item.data();
          const element = new Order(createdAt, itemList, totalAmount);
          items.push(element);
        });
        setOrders(items);
      }
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start w-full px-4 py-4 bg-white ">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-2xl text-black font-bold">Lịch sử bán hàng</p>
      </div>

      <Link
        href="/create-order"
        className="flex rounded-full bg-blue-500 mt-5 w-full justify-center items-center py-2"
      >
        <PlusIcon className="w-7 h-7 mr-2" color="white" />
        <p className="font-medium text-white text-xl">Thêm đơn hàng</p>
      </Link>

      <div className="w-full">
        <div className="mt-5">
          {orders.map((item, index) => (
            <Link
              href={`/order-list/${encodeURIComponent(item.createdAt)}`}
              key={index}
            >
              <div className="py-3">
                <div className="flex rounded-lg drop-shadow-2xl bg-blue-200  text-black p-4 items-center  justify-between">
                  <div>
                    <p className="font-semibold text-lg">{item.createdAt}</p>
                    <p className="font-medium text-md">
                      Số tiền: {formatVNDCurrency(item.totalAmount)}
                    </p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5" color="black" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
