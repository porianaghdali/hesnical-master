"use client";
import BarChart from "@/utiles/charts/barChart";
import DoughnutChart from "@/utiles/charts/doughnutChart";
import LineChart from "@/utiles/charts/lineChart";
import PieChart from "@/utiles/charts/pieChart";
import PolarAreaChart from "@/utiles/charts/polarAreaChart";
import GaugeChart from "@/utiles/charts/gaugeChart";
import PersianCalendar from "@/app/(UserDashboard)/dashboard/calendar/calendar";
import Card from "@/utiles/card";
import { useUser } from "@/context/UserContext";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {calendar} from "../../../utiles/dummy"
const Dashboard = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { UserData, UserActivities, UserDailyProfit, token } = useUser();
  useEffect(() => {}, [token]);

  const [avgWin, setAvgWin] = useState({
    $id: "1",
    avgWin: 309.10952380952347,
    avgLoss: -625.5877304964544,
    tradeCount: 782,
    winCount: 294,
    lossCount: 282,
    lossSumValue: -176415.74000000014,
    winSumValue: 90878.1999999999,
  });

  // useEffect(() => {
  //   axios
  //     .get(apiUrl + "/api/v1/TradeDeal/averageWin", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAvgWin(res.data);
  //     })
  //     .catch((err) => {

  //     });
  // }, [token]);
  const activities = UserActivities?.data.$values || [];
  // محاسبات مشترک
  const trades = activities.map((trade) => ({
    time: new Date(trade.time * 1000),
    profit: trade.profit,
  }));
  const datesArray = trades.map((item) => item.time);
  const tradsArray = trades.map((item) => item.profit);

  const NetProfitDaysArray = UserDailyProfit?.balanceList?.$values.map(
    (item) => item.netProfit
  );

  const symbolsArray = activities.map((item) => item.symbol);
  const typesArray = activities.map((item) => item.type);
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

  const symbolsCount = useMemo(
    () => calculateSymbolsCount(symbolsArray),
    [symbolsArray]
  );
  const symbolsVolume = useMemo(
    () => calculateSymbolsVolume(activities),
    [activities]
  );
  const symbolsProfit = useMemo(
    () => calculateSymbolsProfit(activities),
    [activities]
  );
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
        key = `${weekStart.getFullYear()}-${
          weekStart.getMonth() + 1
        }-${weekStart.getDate()}`;
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
    labels: UserDailyProfit?.balanceList?.$values.map(
      (item) => item.date.split("T")[0]
    ),
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
        data: [
          Math.round((avgWin.winCount * 100) / avgWin.tradeCount),
          100 - Math.round((avgWin.winCount * 100) / avgWin.tradeCount),
        ],
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


const headerCardList=[
  {
    title:"سود یا زیان خالص",value:Math.round(UserDailyProfit?.profit * 100) / 100,des:"سود یا زیان نهایی پس از کسر کارمزد معاملات و هزینه‌های مالی است."
  },
  {
    title:"درصد معاملات سودآور",value:Math.round((avgWin.winCount * 100) / avgWin.tradeCount) / 100,des:"درصد تریدهایی که در آن‌ها سود به‌دست آمده است."
  },
  {
    title:"سود روزانه",value:Math.round(UserDailyProfit?.profit * 100) / 100,des:"میزان سود حاصل از معاملات در طول یک روز است."
  },
  {
    title:"نسبت سود به زیان",value: Math.round(Math.abs(UserDailyProfit?.profitToLossRatio) * 100) /
    100,des:"مقایسه سود و زیان برای ارزیابی عملکرد است"
  },
]

  if (!UserActivities || !activities || avgWin.length == 0) {
    return <div>در حال بارگذاری...</div>;
  }
  return (
    <div className="p-10">
      <p className="text-2xl font-semibold  leading-8 text-[#181D27] py-4 border-b-[1px] border-[#E9EAEB] mb-6 ">داشبورد</p>
<div>
  <button
  style={
    {
      boxShadow: "0px 0px 0px 1px var(--Colors-Effects-Shadows-shadow-skeumorphic-inner-border, rgba(10, 13, 18, 0.18)) inset, 0px -2px 0px 0px var(--Colors-Effects-Shadows-shadow-skeumorphic-inner, rgba(10, 13, 18, 0.05)) inset, 0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05)), 0px 0px 0px 2px var(--Colors-Background-bg-primary, #FFF), 0px 0px 0px 4px var(--Colors-Effects-Focus-rings-focus-ring, #9270E2)"
    }
  }
  className="flex mb-8 gap-1 items-center mr-auto px-[14px] py-2.5 rounded-lg border-[1px] border-[#D5D7DA] ">
  {calendar}
  <p className="font-semibold text-sm text-[#717680]">
  انتخاب تاریخ
 </p> </button>
 
</div>
      {/* <div className="flex gap-4 mb-4">
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
      </div> */}

      <div className="grid grid-cols-6 gap-4 ">
        <div className="col-span-6 lg:col-span-6">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {headerCardList.map((item,key)=>{
          return <div key={key}><Card
          
              backgroundColor="rgba(13, 110, 253, 1)"
              title={item.title}
              value={item.value}
              des={item.des}
            />
      </div>
        })}
           
           
        
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

        <div
          dir="ltr"
          className="col-span-6 lg:col-span-6 grid justify-center styledcal"
        >
          <PersianCalendar
            trades={
              UserDailyProfit?.balanceList?.$values
                ? UserDailyProfit?.balanceList?.$values
                : []
            }
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
