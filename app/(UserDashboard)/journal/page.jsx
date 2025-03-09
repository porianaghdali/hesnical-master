"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import JournalCard from "@/utiles/journalCard";
import HeaderFilter from "@/components/headerFilter";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const Journal = ({}) => {
  const { UserData, UserDailyProfit } = useUser();
  const DailyProfit = UserDailyProfit?.balanceList?.$values || [];

  if (!UserDailyProfit) {
    return <div>در حال بارگذاری...</div>; // می‌توانید این را به کامپوننت لودینگ سفارشی تغییر دهید
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Journal</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>
      <div className="mb-4  ">
        <p className=" text-2xl font-normal leading-[37px]">دیلی ژورنال </p>
        <HeaderFilter />
      </div>
      <div className="grid  grid-cols-10 gap-8">
        <div className="col-span-7  scroll h-[68vh] overflow-auto scrollbar-hide p-2">
          {DailyProfit.map((item, key) => {
            return (
              <div className="border p-4 rounded-lg shadow-lg " key={key}>
                <JournalCard
                  date={item.date}
                  id={item.$id}
                  netProfit={item.netProfit}
                  balance={item.balance}
                  swap={item.swap}
                  totalProfit={item.totalProfit}
                  totalLoss={item.totalLoss}
                  commission={item.commission}
                  groupedTrades={item.rawItems.$values}
                />
              </div>
            );
          })}
       
        </div>
        <div className="col-span-3 ">
          <Calendar calendar={persian} locale={persian_fa} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Journal;
