"use client";
import BarChart from "@/utiles/charts/barChart";
import DoughnutChart from "@/utiles/charts/doughnutChart";
import LineChart from "@/utiles/charts/lineChart";
import PieChart from "@/utiles/charts/pieChart";
import PolarAreaChart from "@/utiles/charts/polarAreaChart";
import RadarChart from "@/utiles/charts/radarChart";
import GaugeChart from "@/utiles/charts/gaugeChart";
import PersianCalendar from "@/utiles/calendar";
import Card from "@/utiles/card";
import { useUser } from "@/context/UserContext";
import { useMemo, useState } from "react";

const Dashboard = () => {
  const { UserData, UserActivities, UserDailyProfit,WinRate,AverageWin } = useUser();
const activities = UserActivities?.data.$values || [];
const DailyProfit = UserDailyProfit?.data?.balanceList?.$values || [];
const profitToLossRatio = UserDailyProfit?.data?.profitToLossRatio || [];


console.log('%capp\(UserDashboard)\dashboard\page.jsx:18 WinRate', 'color: #007acc;', AverageWin);
// محاسبات مشترک
const trades = activities.map((trade) => ({
  time: new Date(trade.time * 1000),
  profit: trade.profit,
}));
const datesArray = trades.map((item) => item.time);
const tradsArray = trades.map((item) => item.profit);
const profitsArray = activities.map((item) => item.profit).filter((profit) => profit > 0);
const LosssArray = activities.map((item) => item.profit).filter((profit) => profit < 0);
const feesArray = activities.map((item) => item.fee);
const commissionsArray = activities.map((item) => item.commission);
const NetProfitDaysArray = DailyProfit.map((item) => item.netProfit);
const WinningDaysArray = NetProfitDaysArray.filter((netProfit) => netProfit > 0);
const LosingDaysArray = NetProfitDaysArray.filter((netProfit) => netProfit < 0);
const symbolsArray = activities.map((item) => item.symbol);
const typesArray = activities.map((item) => item.type);



const Gross_Profit = useMemo(() => profitsArray.reduce((total, number) => total + number, 0), [profitsArray]);
const Gross__Loss = useMemo(() => LosssArray.reduce((total, number) => total + number, 0), [LosssArray]);
const totalFee = useMemo(() => feesArray.reduce((total, number) => total + number, 0), [feesArray]);
const totalCommission = useMemo(() => commissionsArray.reduce((total, number) => total + number, 0), [commissionsArray]);
const totalNetProfit = useMemo(() => UserDailyProfit?.data?.profit, [UserDailyProfit]);
const totalWinningDays = useMemo(() => WinningDaysArray.reduce((total, number) => total + number, 0), [WinningDaysArray]);
const totalLosingDays = useMemo(() => LosingDaysArray.reduce((total, number) => total + number, 0), [LosingDaysArray]);

const calculateSymbolsCount = (symbolsArray) => {
  return symbolsArray.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
};

const calculateSymbolsVolume = (activities) => {
  return activities.reduce((acc, item) => {
    acc[item.symbol] = (acc[item.symbol] || 0) + item.volume;
    return acc;
  }, {});
};

const calculateSymbolsProfit = (activities) => {
  return activities.reduce((acc, item) => {
    acc[item.symbol] = (acc[item.symbol] || 0) + item.profit;
    return acc;
  }, {});
};

const symbolsCount = useMemo(() => calculateSymbolsCount(symbolsArray), [symbolsArray]);
const symbolsVolume = useMemo(() => calculateSymbolsVolume(activities), [activities]);
const symbolsProfit = useMemo(() => calculateSymbolsProfit(activities), [activities]);



 const [filterType, setFilterType] = useState("none");



const filterDataByType = useMemo(() => {
  if (filterType === "none") {
    return {
      labels: trades.map((date) => date.toLocaleString()),
      profits: tradsArray,
    };
  }

  const filteredData = {};
  datesArray.forEach((date, index) => {
    let key;
    if (filterType === "daily") {
      key = date.toLocaleDateString();
    } else if (filterType === "weekly") {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = `${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`;
    } else if (filterType === "monthly") {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    }

    if (!filteredData[key]) {
      filteredData[key] = 0;
    }
    filteredData[key] += tradsArray[index];
  });

  return filteredData;
}, [datesArray, tradsArray, filterType]);








  const tradeTypes = useMemo(() => {
    return typesArray.reduce(
      (acc, type) => {
        if (type === 0) acc.Buy++;
        else acc.Sell++;
        return acc;
      },
      { Buy: 0, Sell: 0 }
    );
  }, [typesArray]);

  const volumeBySymbolData = {
    labels: Object.keys(symbolsVolume),
    datasets: [
      {
        label: "حجم معاملات هر نماد",
        data: Object.values(symbolsVolume),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const profitBySymbolData = {
    labels: Object.keys(symbolsProfit),
    datasets: [
      {
        label: "سودآوری هر نماد",
        data: Object.values(symbolsProfit),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const symbols_Count_data = {
    labels: Object.keys(symbolsCount),
    datasets: [
      {
        label: "تعداد معاملات هر نماد",
        data: Object.values(symbolsCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const tradeTypeData = {
    labels: ["خرید", "فروش"],
    datasets: [
      {
        label: "نوع معاملات",
        data: [tradeTypes.Buy, tradeTypes.Sell],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const tradeDayssData = {
    labels: DailyProfit.map((item) => item.date.split("T")[0]),
    datasets: [
      {
        label: "تعداد معاملات بر اساس ساعت",
        data: NetProfitDaysArray,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  const volumeByTradeType = useMemo(() => {
    const volumeData = activities.reduce(
      (acc, item) => {
        if (item.type === 0) acc.Buy += item.volume;
        else acc.Sell += item.volume;
        return acc;
      },
      { Buy: 0, Sell: 0 }
    );

    return {
      labels: ["خرید", "فروش"],
      datasets: [
        {
          label: "حجم معاملات",
          data: [volumeData.Buy, volumeData.Sell],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
  }, [activities]);
  const buySellPerSymbol = useMemo(() => {
    const buySellCount = activities.reduce((acc, item) => {
      if (!acc[item.symbol]) acc[item.symbol] = { Buy: 0, Sell: 0 };
      if (item.type === 0) acc[item.symbol].Buy++;
      else acc[item.symbol].Sell++;
      return acc;
    }, {});

    const labels = Object.keys(buySellCount);
    const buyData = labels.map((label) => buySellCount[label].Buy);
    const sellData = labels.map((label) => buySellCount[label].Sell);

    return {
      labels,
      datasets: [
        {
          label: "خرید",
          data: buyData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "فروش",
          data: sellData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [activities]);
  const gaugeData = {
    labels: ["درصد سود", "درصد ضرر"],
    datasets: [
      {
        label: ["ضریب برد معاملات"],
        data: [WinRate, 100 - WinRate],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const polarData = {
    labels: Object.keys(symbolsCount),
    datasets: [
      {
        label: "تعداد معاملات هر نماد",
        data: Object.values(symbolsCount),
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
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

 
  const filteredChartData = {
    labels:
      filterType === "none"
        ? datesArray.map((date) => date.toLocaleString()) // نمایش تمام تاریخ‌ها
        : Object.keys(filterDataByType).map((key) => {
            if (filterType === "daily") {
              return key;
            } else if (filterType === "weekly") {
              return `هفته ${key}`;
            } else if (filterType === "monthly") {
              return `ماه ${key}`;
            }
          }),
    datasets: [
      {
        label:
          filterType === "none"
            ? "سود و زیان لحظه‌ای"
            : `سود و زیان ${
                filterType === "daily"
                  ? "روزانه"
                  : filterType === "weekly"
                  ? "هفتگی"
                  : "ماهانه"
              }`,
        data:
          filterType === "none"
            ? tradsArray // نمایش تمام سود و زیان‌ها
            : Object.values(filterDataByType),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (!UserActivities || !activities||!DailyProfit) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold">داشبورد</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilterType("none")}
          className={`px-4 py-2 rounded ${
            filterType === "none" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          بدون فیلتر
        </button>
        <button
          onClick={() => setFilterType("daily")}
          className={`px-4 py-2 rounded ${
            filterType === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          روزانه
        </button>
        <button
          onClick={() => setFilterType("weekly")}
          className={`px-4 py-2 rounded ${
            filterType === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          هفتگی
        </button>
        <button
          onClick={() => setFilterType("monthly")}
          className={`px-4 py-2 rounded ${
            filterType === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          ماهانه
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4 p-10">
        <div className="col-span-6 lg:col-span-6">
          <div className="grid grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Net P&L */}
            <Card
              backgroundColor="rgba(13, 110, 253, 1)"
              title="سود یا زیان خالص"
              value={
                Math.round(
                  (Gross_Profit + Gross__Loss - totalFee - totalCommission) *
                    100
                ) / 100
              }
            />
            {/* Trade Win % */}
            <Card
              backgroundColor="rgba(255, 193, 7, 1)"
              title="ضریب برد معاملات"
              value={WinRate?.data}
            />
            {/* Profit Factor */}
            <Card
              backgroundColor="rgba(220, 53, 69, 1)"
              title="نسبت سود به زیان"
              value={Math.abs(
                ((profitToLossRatio)) 
              )}
            />

            {/* Day Win % */}
            <Card
              backgroundColor="rgba(220, 53, 69, 1)"
              title="بیشترین سود در یک معامله"
              value={(WinningDaysArray.length * 100) / DailyProfit.length}
            />
            {/* Avg Win Trades */}
            <Card
              backgroundColor="rgba(13, 202, 240, 1)"
              title="میانگین سود   "
              value={
                Math.round((totalWinningDays / WinningDaysArray.length) * 100) /
                100
              }
            />
            {/* Avg Loss Trades */}
            <Card
              backgroundColor="rgba(13, 202, 240, 1)"
              title="میانگین ضرر   "
              value={
                Math.round((totalLosingDays / LosingDaysArray.length) * 100) /
                100
              }
            />
          </div>
        </div>
        {/* Daily Net Cumulative P&L Linear Chart */}
        <div dir="ltr" className="col-span-6 lg:col-span-3">
          <LineChart data={filteredChartData} options={options} />
        </div>
        {/* Net Daily P&L Column Chart */}
        <div dir="ltr" className="col-span-6 lg:col-span-3">
          <BarChart data={tradeDayssData} options={options} />
        </div>
     
        <div dir="ltr" className="col-span-6 lg:col-span-3">
          <BarChart data={buySellPerSymbol} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-3">
          <BarChart data={profitBySymbolData} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-2">
          <DoughnutChart data={volumeBySymbolData} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-2">
          <PieChart data={volumeByTradeType} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-2">
          <DoughnutChart data={symbols_Count_data} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-2">
          <PolarAreaChart data={polarData} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-2">
          <GaugeChart data={gaugeData} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-2">
          <PieChart data={tradeTypeData} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-6 grid justify-center">
          <PersianCalendar trades={trades} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
