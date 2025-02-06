import { useState } from "react";
import LineChart from "@/utiles/charts/lineChart";
import { Line } from "react-chartjs-2";
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
}) => {
  //       const [filterType, setFilterType] = useState("none");
  //       const datesArray = activities.map((item) => new Date(item.time * 1000));

  //   const filteredChartData = {
  //     labels:
  //       filterType === "none"
  //         ? datesArray.map((date) => date.toLocaleString()) // نمایش تمام تاریخ‌ها
  //         : Object.keys(filterDataByType).map((key) => {
  //             if (filterType === "daily") {
  //               return key;
  //             } else if (filterType === "weekly") {
  //               return `هفته ${key}`;
  //             } else if (filterType === "monthly") {
  //               return `ماه ${key}`;
  //             }
  //           }),
  //     datasets: [
  //       {
  //         label:
  //           filterType === "none"
  //             ? "سود و زیان لحظه‌ای"
  //             : `سود و زیان ${
  //                 filterType === "daily"
  //                   ? "روزانه"
  //                   : filterType === "weekly"
  //                   ? "هفتگی"
  //                   : "ماهانه"
  //               }`,
  //         data:
  //           filterType === "none"
  //             ? profitsArray // نمایش تمام سود و زیان‌ها
  //             : Object.values(filterDataByType),
  //         backgroundColor: "rgba(54, 162, 235, 0.2)",
  //         borderColor: "rgba(54, 162, 235, 1)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "Raavi",
            size: 10,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Raavi",
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "Raavi",
            size: 10,
          },
        },
      },
    },
  };

  const data = {
    labels: [0, 1],
    datasets: [
      {
        backgroundColor: "transparent",
        color: "transparent",
        label: "My First Dataset",
        data: [0, netProfit],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div className="grid gap-4">
      <div className="flex justify-between py-4">
        <div>{date}</div>
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
          <Line data={data} options={options} />
        </div>
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
