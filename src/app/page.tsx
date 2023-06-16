"use client";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";

import { Order } from "./order-list/Order";
import { getData } from "@/firebase/firestore/getData";
import { formatVNDCurrency } from "@/utils";
import moment from "moment";

export default function Dashboard() {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [error, setError] = useState();

  const revenue = useMemo(
    () => orders.reduce((a, b) => a + b.totalAmount, 0),
    [orders]
  );
  useLayoutEffect(() => {
    Chart.register(...registerables);

    getData("histories").then((value) => {
      const { error, result } = value;
      if (error) setError(error as any);
      const orderList = [] as Array<Order>;
      result?.forEach((item) => {
        const { createdAt, itemList, totalAmount } = item.data();
        const id = item.id;
        const order = new Order(id, createdAt, itemList, totalAmount);
        orderList.push(order);
      });
      orderList.sort((a, b) => a.createdAt - b.createdAt);
      setOrders(orderList);
    });
    drawBarChart();
    drawLineChart();
  }, [error]);

  function drawLineChart() {
    let lineChartContext = (
      document.getElementById("line-chart") as HTMLCanvasElement
    ).getContext("2d");
    new Chart(lineChartContext!, {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Doanh thu theo ngày",
            data: [10, 12, 5, 17, 8],
            fill: false,
            borderColor: "#818CF8",
            backgroundColor: "#818CF8",
            tension: 0.1,
          },
        ],
      },
    });
  }
  function drawBarChart() {
    let context = (
      document.getElementById("bar-chart") as HTMLCanvasElement
    ).getContext("2d");
    const bar = new Chart(context!, {
      type: "bar",
      data: {
        labels: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        datasets: [
          {
            label: "Nhập",
            backgroundColor: "#60A5FA",
            borderColor: "#60A5FA",
            data: [12, 22, 11, 13, 14, 5, 13],
            barThickness: 8,
          },
          {
            label: "Xuất",
            backgroundColor: "#818CF8",
            borderColor: "#818CF8",
            data: [13, 14, 5, 13, 12, 22, 11],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
          mode: "nearest",
          intersect: false,
        },
      },
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 bg-white">
      <p className="text-black text-xl font-bold mt-3 w-full">Tổng quan</p>

      <div className="w-full mt-8">
        <p className="text-slate-400 mb-2 font-bold">Doanh thu</p>
        <p className="text-stone-950 my-2 font-bold text-2xl">
          {formatVNDCurrency(revenue)}
        </p>

        <div className="w-full max-h-80">
          <canvas id="line-chart"></canvas>
        </div>
      </div>

      <div className="w-full mt-8">
        <p className="text-slate-400 mb-2 font-bold">
          Số lượng hàng hóa nhập và xuất
        </p>
        <div className="w-full max-h-max">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
    </main>
  );
}
