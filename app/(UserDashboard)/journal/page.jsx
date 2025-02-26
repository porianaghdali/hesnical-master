"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import JournalCard from "@/utiles/journalCard";
const Journal = ({}) => {
  const { UserData, UserDailyProfit } = useUser();
  const DailyProfit = UserDailyProfit?.balanceList?.$values || [];
  console.log(
    "%capp(UserDashboard)journalpage.jsx:16 DailyProfit",
    "color: #007acc;",
    DailyProfit
  );

  if (!UserDailyProfit) {
    return <div>در حال بارگذاری...</div>; // می‌توانید این را به کامپوننت لودینگ سفارشی تغییر دهید
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">trades</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>
      <div className="grid gap-2">
        
        {DailyProfit.map((item, key) => {
          return (
            <div className="border p-4 rounded-lg shadow-lg" key={key}>
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
    </div>
  );
};

export default Journal;
