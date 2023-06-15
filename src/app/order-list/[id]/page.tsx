"use client";
import { formatVNDCurrency } from "@/utils";
import { useEffect, useState } from "react";
import { CubeIcon } from "@heroicons/react/24/solid";
import { Order } from "../Order";
import { getDataRecord } from "@/firebase/firestore/getData";
export default function OrderDetail({ params }: any) {
  const [order, setOrder] = useState<Order>();
  const [error, setError] = useState(false);
  const { id } = params;
  useEffect(() => {
    getDataRecord("histories", id).then((value) => {
      const { error, result } = value;
      if (error || !result?.exists()) {
        setError(true);
      }
      const orderData = result?.data();
      setOrder(orderData as any);
    });
  });

  if (!id || error)
    return (
      <div className="w-full flex items-center justify-center bg-white">
        <p className="text-black font-bold">Đơn hàng không tồn tại</p>
      </div>
    );
  return (
    <main className="flex min-h-screen flex-col items-start justify-start w-full py-4 bg-white ">
      <div className="flex flex-row items-center justify-between w-full px-4">
        <p className="text-2xl text-black font-bold">Thông tin đơn hàng</p>
      </div>

      {/* date information */}
      <div className="w-full px-4 mt-4">
        <div className="bg-blue-200 w-full rounded-lg text-black p-3">
          <div className="flex items-center">
            <p className="text-black font-medium text-lg">Ngày bán:</p>
            <p className="font-semibold text-lg ml-3">{params.id}</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="text-black font-medium text-lg">Tổng số tiền:</p>
              <p className="font-semibold text-lg ml-3">
                {formatVNDCurrency(order?.totalAmount || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 mt-4">
        <p className="text-lg text-black font-bold">Các loại hàng: </p>
        {order?.itemList.map((item, index) => (
          <div className="py-3" key={index}>
            <div className="flex rounded-lg bg-blue-200  text-black p-4 items-center  justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-300 mr-3">
                  <CubeIcon className="w-6 h-6" color="white" />
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {item.productName} {item.unit}
                  </p>
                  <p className="font-medium text-md">
                    Số lượng:{" "}
                    <b>
                      {item.quantity} {item.unit}
                    </b>
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold">
                {formatVNDCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black  w-full mt-3"></div>

      <div className="w-full px-4 mt-4 text-black flex items-center justify-between">
        <p className="font-medium text-lg">Tổng:</p>
        <p className="font-bold text-lg">
          {formatVNDCurrency(order?.totalAmount || 0)}
        </p>
      </div>
    </main>
  );
}
