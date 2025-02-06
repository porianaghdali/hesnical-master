import { useState } from "react";
import LineChart from "@/utiles/charts/lineChart";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AreaChart from "./charts/AreaChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const JournalCard = ({
  date,
  netProfit,
  balance,
  swap,
  totalProfit,
  totalLoss,
  commission,
  groupedTrades,
}) => {
  const data = {
    labels: groupedTrades.map((item) => {
      return new Date(item.time * 1000)
        .toISOString()
        .split("T")[1]
        .split(".000Z")[0];
    }),
    datasets: [
      {
        data: groupedTrades.map((item) => {
          return item.profit;
        }),
         fill: {
            target: 'origin',
            above: 'rgba(75, 192, 192, 0.2)',   // Area will be red above the origin
            below: 'rgba(192, 75, 192, 0.2)'    // And blue below the origin
          },
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid gap-4">
      <div className="flex justify-between py-4">
        <div>{date.split("T")[0]}</div>
        <div className={netProfit > 0 ? "text-green-500" : "text-red-500"}>
          NET P/L: {Math.round(netProfit * 100) / 100}
        </div>
        <button
          className="
"
        >
          view note
        </button>
      </div>
      <hr />
      <div className=" grid grid-cols-6 gap-2">
        <div className="">
          {" "}
          <AreaChart data={data} />{" "}
        </div>
        <div>تعداد معاملات: {groupedTrades.length}</div>
        <div className="">
          <p className="">
            سود کلی:
            <span className="text-green-500">
              {Math.round(totalProfit * 100) / 100}
            </span>
          </p>
          <p className="">
            ضرر کلی:
            <span className="text-red-500">
              {Math.round(totalLoss * 100) / 100}
            </span>
          </p>
        </div>
        <div className={balance > 0 ? "text-green-500" : "text-red-500"}>
          بالانس: {Math.round(balance * 100) / 100}
        </div>

        <div className={swap > 0 ? "text-green-500" : "text-red-500"}>
          سواپ: {Math.round(swap * 100) / 100}
        </div>
        <div className="">کمیسیون:{commission}</div>
      </div>
    </div>
  );
};
export default JournalCard;
