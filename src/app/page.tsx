"use client";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";

import { Order } from "./order-list/Order";
import { getData, getDataWithQuery } from "@/firebase/firestore/getData";
import { formatVNDCurrency } from "@/utils";
import { CubeIcon } from "@heroicons/react/24/solid";
import { Product } from "@/components/organism/ProductItem";

export default function Dashboard() {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [error, setError] = useState();

  const revenue = useMemo(() => {
    if (orders.length !== 0) return orders[0].totalAmount;
    return 0;
  }, [orders]);
  const topProduct = useMemo(() => {
    const products = [] as Array<Product>;
    orders.forEach((order) => {
      order.itemList.forEach((item) => {
        const idx = products.findIndex((p) => p.id === item.id);
        if (idx === -1) products.push(item);
        else products[idx].quantity += item.quantity;
      });
    });
    const result = products.sort((a, b) => b.quantity - a.quantity);
    return result.slice(0, 5);
  }, [orders]);

  useLayoutEffect(() => {
    Chart.register(...registerables);

    getDataWithQuery("histories", {
      fieldName: "createdAt",
      order: "desc",
      limit: 7,
    }).then((value) => {
      const { error, result } = value;
      if (error) setError(error as any);

      const orderList = [] as Array<Order>;
      result?.forEach((item) => {
        const { createdAt, itemList, totalAmount } = item.data();
        const id = item.id;
        const order = new Order(id, createdAt, itemList, totalAmount);
        orderList.push(order);
      });
      setOrders(orderList);
      drawLineChart(orderList);
    });
  }, [error]);

  function drawLineChart(orderList: Array<Order>) {
    let lineChartContext = (
      document.getElementById("line-chart") as HTMLCanvasElement
    ).getContext("2d");

    const data = [0, 0, 0, 0, 0, 0, 0];
    orderList.forEach((order) => {
      const date = new Date(order.createdAt);
      const dayOfWeek = date.getDay();
      data[dayOfWeek] = order.totalAmount;
    });

    new Chart(lineChartContext!, {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Doanh thu theo ngày",
            data: data,
            fill: false,
            borderColor: "#818CF8",
            backgroundColor: "#818CF8",
            tension: 0.1,
          },
        ],
      },
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 bg-white">
      <p className="text-black text-xl font-bold mt-3 w-full">Tổng quan</p>

      <div className="w-full mt-8">
        <p className="text-slate-400 mb-2 font-bold">Doanh thu hôm nay</p>
        <p className="text-stone-950 my-2 font-bold text-2xl">
          {formatVNDCurrency(revenue)}
        </p>

        <div className="w-full max-h-80">
          <canvas id="line-chart"></canvas>
        </div>

        <div className="w-full mt-4">
          <p className="text-lg text-black font-bold">Hàng bán chạy</p>
          {topProduct.map((item, index) => (
            <div className="py-3" key={index}>
              <div className="flex rounded-lg bg-blue-200  text-black p-4 items-center  justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-300 mr-3">
                    <CubeIcon className="w-6 h-6" color="white" />
                  </div>
                  <div>
                    <p className="font-semibold text-md">{item.productName}</p>
                    <p className="font-medium text-sm">
                      Số lượng:{" "}
                      <b>
                        {item.quantity} {item.unit}
                      </b>
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold">
                  {formatVNDCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
