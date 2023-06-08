"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Chart, registerables } from "chart.js";
import { useEffect } from "react";

type StatisticTimeFilter = {
  label: string;
  isSelected: boolean;
};

export default function Dashboard() {
  const filterStaticTimes: StatisticTimeFilter[] = [
    {
      label: "1D",
      isSelected: true,
    },
    {
      label: "1W",
      isSelected: false,
    },
    {
      label: "1M",
      isSelected: false,
    },
    {
      label: "3M",
      isSelected: false,
    },
    {
      label: "6M",
      isSelected: false,
    },
    {
      label: "1Y",
      isSelected: false,
    },
  ];
  useEffect(() => {
    Chart.register(...registerables);
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

    let lineChartContext = (
      document.getElementById("line-chart") as HTMLCanvasElement
    ).getContext("2d");
    const lineChart = new Chart(lineChartContext!, {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Lợi nhuận theo ngày",
            data: [10, 12, 5, 17, 8],
            fill: false,
            borderColor: "#818CF8",
            backgroundColor: "#818CF8",
            tension: 0.1,
          },
        ],
      },
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center px-4 bg-white">
      <div className="flex justify-between gap-4 w-full ">
        <div className="rounded-xl w-1/2 bg-blue-400 p-5 mt-2.5">
          <PlusCircleIcon className="w-6 h-6" />
          <p className="text-lg pt-1">3027</p>
          <p className="text-slate-300 text-xs">Sản phẩm nhập vào</p>
        </div>

        <div className="rounded-xl w-1/2 bg-indigo-400 p-5 mt-2.5">
          <MinusCircleIcon className="w-6 h-6" />
          <p className="text-lg pt-1">3027</p>
          <p className="text-slate-300 text-xs">Sản phẩm bán ra</p>
        </div>
      </div>

      {/* <div className="flex justify-between w-full px-2 pt-4 text-black">
        {filterStaticTimes.map((time, index) => (
          <div
            key={index}
            className={classNames({
              "rounded-full px-3 py-1": true,
              "bg-blue-400 text-white": time.isSelected,
              "font-medium": !time.isSelected,
            })}
          >
            {time.label}
          </div>
        ))}
      </div> */}

      <div className="w-full mt-8">
        <p className="text-slate-400 mb-2 font-bold">Lợi nhuận</p>
        <p className="text-stone-950 my-2 font-bold text-2xl">$27,003.98</p>

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
