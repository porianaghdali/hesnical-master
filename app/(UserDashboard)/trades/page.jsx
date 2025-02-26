"use client";

import { useUser } from "@/context/UserContext";
import { Details } from "@/utiles/dummy";
import { useState } from "react";
import Link from "next/link";
import LineChart from "@/utiles/charts/lineChart";
import { note } from "@/utiles/dummy";
import NoteModal from "./noteModal";
const Dashboard = ({}) => {
  const { UserData, token, UserActivities } = useUser();
  const [showType, setShowType] = useState("table");
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Raavi",
            size: 16,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Raavi",
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "Raavi",
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels: ["2025-02-01", "2025-02-05", "2025-02-10", "2025-02-20"],
    datasets: [
      {
        label: "سود",
        data: [1000, 1200, 900, 1100],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        tension: 0.3, // برای نرم‌تر شدن خط
      },
    ],
  };
  const table = [
    { title: "symbol", id: 1 },
    { title: "side", id: 11 },
    { title: "Volume", id: 2 },
    { title: "Entry Time", id: 3 },
    { title: "Stoploss", id: 4 },
    { title: "Take profit", id: 5 },
    { title: "Exit Time", id: 6 },
    { title: "P&L", id: 7 },
    { title: "Note", id: 8 },
    { title: "Tag", id: 10 },

    { title: "Details", id: 12 },
  ];
  const renderType1 = () => (
    <>
      <div className="">
        <div className="grid grid-cols-11 gap-2 p-2 border">
          {table.map((item, key) => {
            return (
              <div className="text-center border-r-2" key={key}>
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="grid  p-2  gap-2 border">
          {UserActivities?.data.$values.map((item, key, array) => {
            return (
              <div key={key}>
                <div className="text-center grid grid-cols-11">
                  <div className="text-center font-bold">
                    {item.symbol.replace(/'/g, "")}
                  </div>
                  <div className="text-center">
                    {item.comment.replace(/'/g, "")}
                  </div>
                  <div className="text-center">
                    {Math.round(item.volume * 100) / 100}
                  </div>
                  <div className="text-center" dir="ltr">
                    {item.entry}
                  </div>
                  <div className="text-center" dir="ltr">
                    {item.commission}
                  </div>

                  <div className="text-center" dir="ltr">
                    {item.externalId.replace(/'/g, "")}
                  </div>
                  <div className="text-center" dir="ltr">
                    {item.magic}
                  </div>
                  <div className="text-center">
                    {new Date(item.time * 1000).toLocaleString()}
                  </div>

                  <div
                    className="text-center flex justify-center items-center"
                    dir="ltr"
                  >
                    <NoteModal />{" "}
                  </div>
                  <div className="text-center" dir="ltr">
                    {Math.round(item.profit * 100) / 100}
                  </div>
                  <Link
                    href={`/trades/${item.id}`}
                    className="text-center flex justify-center"
                    dir="ltr"
                  >
                    {Details}
                  </Link>
                </div>
                {array.length != key + 1 ? <hr /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
  const renderType2 = () => (
    <>
      <div className="grid grid-cols-3 gap-4 ">
        {UserActivities.data.$values.map((item, key) => {
          return (
            <div key={key}>
              <LineChart options={options} data={data} />
            </div>
          );
        })}
      </div>
    </>
  );
  if (!UserActivities) {
    return <div>در حال بارگذاری...</div>; // می‌توانید این را به کامپوننت لودینگ سفارشی تغییر دهید
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">trades</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>
      <div className="mb-4">
        <p className=" text-2xl font-normal leading-[37px]">معاملات </p>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-1 grid gap-1">
            <label htmlFor="Symbole" className="text-[8px]">
              نماد معاملاتی
            </label>
            <input
              type="text"
              id="Symbole"
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
            />
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              برچسب
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="1"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              سود و زیان
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="2"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              خرید و فروش
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="3"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1">
            <label htmlFor="" className="text-[8px]">
              مدت معامله
            </label>
            <select
              className="bg-[#F7F7F7] w-full py-1 px-2 outline-none border-[1px] border-[#9F9F9F] rounded"
              defaultValue="4"
            ></select>
          </div>
          <div className="col-span-1 grid gap-1"></div>
        </div>
      </div>
      <div className="p-4 border-[1px] border-[#E0E0E0] rounded-lg ">
        <div className="flex gap-2 mb-8 ">
          <button
            className={
              showType == "table"
                ? "bg-[#D9D9D9] px-3 py-1 rounded"
                : " px-3 py-1 rounded"
            }
            onClick={() => {
              setShowType("table");
            }}
          >
            جدول
          </button>
          <button
            className={
              showType == "chart"
                ? "bg-[#D9D9D9] px-3 py-1 rounded"
                : " px-3 py-1 rounded"
            }
            onClick={() => {
              setShowType("chart");
            }}
          >
            چارت
          </button>
        </div>
        {showType == "table" ? renderType1() : renderType2()}
      </div>
    </div>
  );
};

export default Dashboard;
