"use client";
import axios from "axios";

import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import JournalCard from "@/utiles/journalCard";
const Journal = ({}) => {
  const { UserData, token, UserActivities,UserDailyProfit } = useUser();
  const activities = UserActivities?.data.$values || [];
  const DailyProfit = UserDailyProfit?.data?.balanceList?.$values || [];
 
  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000); // تبدیل تایم‌استمپ UNIX به میلی‌ثانیه
    return date.toISOString().split("T")[0]; // فرمت تاریخ YYYY-MM-DD
  }

  function mergeData() {
    // گروه‌بندی معاملات براساس تاریخ
    const groupedTrades = activities?.reduce((acc, trade) => {
      const date = convertTimestampToDate(trade.time);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(trade);
      return acc;
    }, {});

    // ادغام داده‌ها
    return DailyProfit.map((item) => {
      const itemDate = item.date; // فرض شده که تاریخ در data1 در فیلد "date" است

      if (groupedTrades[itemDate.split("T")[0]]) {
        // اضافه کردن معاملات به هر ابجکت در data1
        item.trades = groupedTrades[itemDate.split("T")[0]];
      } else {
        item.trades = []; // در صورتی که هیچ معامله‌ای در آن تاریخ نباشد
      }
      return item;
    });
  }
  const mergedData = mergeData();
  if (!UserDailyProfit ) {
    return <div>در حال بارگذاری...</div>; // می‌توانید این را به کامپوننت لودینگ سفارشی تغییر دهید
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">trades</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>
      <div className="grid gap-2">
        {mergedData.map((item, key) => {
          return (
            <div className="border p-4 rounded-lg shadow-lg" key={key}>
              <JournalCard
                date={item.date}
                netProfit={item.netProfit}
                balance={item.balance}
                swap={item.swap}
                totalProfit={item.totalProfit}
                totalLoss={item.totalLoss}
                commission={item.commission}
                groupedTrades={item.trades}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Journal;
