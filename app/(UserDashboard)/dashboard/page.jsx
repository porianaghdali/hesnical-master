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
  const { UserData, UserActivities } = useUser();

  const activities = UserActivities?.data.$values || [];
  const datesArray = activities.map((item) => new Date(item.time * 1000));


  const profitsArray = activities.map(
    (item) => item.profit 
  );
  const commissionsArray = activities.map(
    (item) => item.commission 
  );


  const Gross_Profit = profitsArray?.reduce((total, number) =>number>=0? total + number:total, 0);
  const Gross__Loss = profitsArray?.reduce((total, number) =>number<0? total + number:total, 0);



  const feesArray = activities.map(
    (item) => item.fee
  );
  const totalFee = feesArray?.reduce((total, number) => total + number, 0);
  const totalCommission = commissionsArray?.reduce((total, number) => total + number, 0);







  const symbolsArray = activities.map((item) => item.symbol);
  const typesArray = activities.map((item) => item.type);
  const symbolsCount = useMemo(() => {
    return symbolsArray.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  }, [symbolsArray]);
  const symbolsVolume = useMemo(() => {
    return activities.reduce((acc, item) => {
      acc[item.symbol] = (acc[item.symbol] || 0) + item.volume;
      return acc;
    }, {});
  }, [activities]);
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
  const symbolsProfit = useMemo(() => {
    return activities.reduce((acc, item) => {
      acc[item.symbol] = (acc[item.symbol] || 0) + item.profit;
      return acc;
    }, {});
  }, [activities]);
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
  const averageProfitPerTrade = useMemo(() => {
    const totalProfit = profitsArray.reduce((acc, profit) => acc + profit, 0);
    return (totalProfit / profitsArray.length).toFixed(2);
  }, [profitsArray]);
  const maxProfitTrade = useMemo(
    () => Math.max(...profitsArray),
    [profitsArray]
  );
  const minProfitTrade = useMemo(
    () => Math.min(...profitsArray),
    [profitsArray]
  );
  const tradeHours = useMemo(() => {
    return activities.reduce((acc, item) => {
      const hour = new Date(item.time * 1000).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
  }, [activities]);
  const winRate = useMemo(() => {
    const winningTrades = profitsArray.filter((profit) => profit > 0).length;
    return ((winningTrades / profitsArray.length) * 100).toFixed(2);
  }, [profitsArray]);
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
  const tradeHoursData = {
    labels: Object.keys(tradeHours).map((hour) => `${hour}:00`),
    datasets: [
      {
        label: "تعداد معاملات بر اساس ساعت",
        data: Object.values(tradeHours),
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
        data: [winRate, 100 - winRate],
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
  const [filterType, setFilterType] = useState("none");
  const filterDataByType = useMemo(() => {
    if (filterType === "none") {
      // اگر فیلتر none باشد، تمام داده‌ها را به صورت لحظه‌ای برگردان
      return {
        labels: datesArray.map((date) => date.toLocaleString()),
        profits: profitsArray,
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
      filteredData[key] += profitsArray[index];
    });

    return filteredData;
  }, [datesArray, profitsArray, filterType]);

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
            ? profitsArray // نمایش تمام سود و زیان‌ها
            : Object.values(filterDataByType),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const trades = activities?.map((trade) => ({
    time: trade.time,
    profit: trade.profit,
  }));

  if (!UserData) {
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
        <div  className="col-span-6 lg:col-span-6">
          <div className="grid grid-cols-4 gap-4">
            <Card
              backgroundColor="rgba(13, 110, 253, 1)"
              title="سود یا زیان خالص"
              value={Math.round(Gross_Profit+Gross__Loss-totalFee-totalCommission*100)/100} 
            />
            <Card
              backgroundColor="rgba(255, 193, 7, 1)"
              title="ضریب برد معاملات"
              value={winRate}
            />
            <Card
              backgroundColor="rgba(220, 53, 69, 1)"
              title="نسبت سود به زیان"
              value={Math.abs(Math.round(Gross_Profit*100/Gross__Loss)/100)}
            />
            <Card
              backgroundColor="rgba(220, 53, 69, 1)"
              title="بیشترین سود در یک معامله"
              value={maxProfitTrade} 
            />
            <Card
              backgroundColor="rgba(13, 202, 240, 1)"
              title="بیشترین ضرر در یک معامله"
              value={minProfitTrade} 
            />
          </div>
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-3">
          <LineChart data={filteredChartData} options={options} />
        </div>

        <div dir="ltr" className="col-span-6 lg:col-span-3">
          <BarChart data={tradeHoursData} options={options} />
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
