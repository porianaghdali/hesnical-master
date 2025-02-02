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
import { useMemo } from "react";

const Dashboard = () => {
  const { UserData, UserActivities } = useUser();

  const activities = UserActivities?.data.$values || [];
  console.log(
    "%capp(UserDashboard)dashboardpage.jsx:291 activities",
    "color: #007acc;",
    activities
  );

  // پردازش داده‌ها
  const datesArray = activities.map((item) => new Date(item.time * 1000));
  const pricesArray = activities.map(
    (item) => Math.round(item.price * 100) / 100
  );
  const volumesArray = activities.map(
    (item) => Math.round(item.volume * 10000) / 10000
  );
  const profitsArray = activities.map(
    (item) => Math.round(item.profit * 100) / 100
  );
  const symbolsArray = activities.map((item) => item.symbol);
  const typesArray = activities.map((item) => item.type);

  // گروه‌بندی سود و زیان بر اساس ماه
  const monthlyProfitData = useMemo(() => {
    const monthlyData = {};

    datesArray.forEach((date, index) => {
      const monthYearKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // کلید ماه و سال (مثلاً 2023-10)
      if (!monthlyData[monthYearKey]) {
        monthlyData[monthYearKey] = 0;
      }
      monthlyData[monthYearKey] += profitsArray[index]; // جمع سود و زیان هر ماه
    });

    return monthlyData;
  }, [datesArray, profitsArray]);

  // تبدیل داده‌های ماهانه به فرمت نمودار
  const monthlyProfitChartData = {
    labels: Object.keys(monthlyProfitData).map((key) => {
      const [year, month] = key.split("-");
      return `${year}/${month}`; // فرمت تاریخ (مثلاً 2023/10)
    }),
    datasets: [
      {
        label: "سود و زیان ماهانه",
        data: Object.values(monthlyProfitData),
        backgroundColor: "rgba(54, 162, 235, .1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // تعداد معاملات هر نماد
  const symbolsCount = useMemo(() => {
    return symbolsArray.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  }, [symbolsArray]);

  // حجم معاملات هر نماد
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

  // سودآوری هر نماد
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

  // تعداد خرید و فروش
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

  // میانگین سود و زیان هر معامله
  const averageProfitPerTrade = useMemo(() => {
    const totalProfit = profitsArray.reduce((acc, profit) => acc + profit, 0);
    return (totalProfit / profitsArray.length).toFixed(2);
  }, [profitsArray]);

  // بیشترین و کمترین معامله سودده و زیان‌ده
  const maxProfitTrade = useMemo(
    () => Math.max(...profitsArray),
    [profitsArray]
  );
  const minProfitTrade = useMemo(
    () => Math.min(...profitsArray),
    [profitsArray]
  );

  // زمان‌های پرتکرار معامله
  const tradeHours = useMemo(() => {
    return activities.reduce((acc, item) => {
      const hour = new Date(item.time * 1000).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
  }, [activities]);

  // ضریب برد معاملات
  const winRate = useMemo(() => {
    const winningTrades = profitsArray.filter((profit) => profit > 0).length;
    return ((winningTrades / profitsArray.length) * 100).toFixed(2);
  }, [profitsArray]);

  // داده‌های نمودارها
  const profit_dates_data = {
    labels: datesArray.map((date) => date.toLocaleString()),
    datasets: [
      {
        label: "سود در طول زمان",
        data: profitsArray,
        backgroundColor: profitsArray.map(
          (profit) =>
            profit < 0 ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)" // Red for negative, Blue for positive
        ),
        borderColor: "rgba(54, 162, 235, 1)",
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
            family: 'Raavi',  // تغییر فونت برای legend
            size: 16,         // تغییر سایز فونت
          },
        },
      },
  },scales: {
    x: {
      ticks: {
        font: {
          family: 'Raavi',  // تغییر فونت برای محور X
          size: 14,         // تغییر سایز فونت
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: 'Raavi',  // تغییر فونت برای محور Y
          size: 14,         // تغییر سایز فونت
        },
      },
    },
  },
  }
  if (!UserData) {
    return <div>در حال بارگذاری...</div>;
  }
  const trades = activities?.map((trade) => ({
    time: trade.time,
    profit: trade.profit,
  }));
  return (
    <div className="">
      <h1 className="text-2xl font-bold">داشبورد</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>

      <div className="grid grid-cols-6 gap-4 p-10">
        <div className="col-span-6 lg:col-span-6">
          <div className="grid grid-cols-4 gap-4">
            <Card
              backgroundColor="rgba(13, 110, 253, 1)"
              title="میانگین سود و زیان معاملات"
              value={`${averageProfitPerTrade} USD`}
            />
            <Card
              backgroundColor="rgba(255, 193, 7, 1)"
              title="ضریب برد معاملات"
              value={`${winRate}%`}
            />
            <Card
              backgroundColor="rgba(220, 53, 69, 1)"
              title="بیشترین سود در یک معامله"
              value={`${maxProfitTrade} USD`}
            />
            <Card
              backgroundColor="rgba(13, 202, 240, 1)"
              title="بیشترین ضرر در یک معامله"
              value={`${minProfitTrade} USD`}
            />
          </div>
        </div>

        {/* نمودار سود و زیان در طول زمان */}
        <div className="col-span-6 lg:col-span-3">
          <LineChart data={profit_dates_data} options={options} />
        </div>

        {/* نمودار سود و زیان ماهانه */}
        <div className="col-span-6 lg:col-span-3">
          <LineChart data={monthlyProfitChartData} options={options} />
        </div>

        {/* نمودار زمان‌های پرتکرار معامله */}
        <div className="col-span-6 lg:col-span-2">
          <BarChart data={tradeHoursData} options={options} />
        </div>

        {/* نمودار خرید و فروش هر نماد */}
        <div className="col-span-6 lg:col-span-2">
          <BarChart data={buySellPerSymbol} options={options} />
        </div>

        {/* نمودار سودآوری هر نماد */}
        <div className="col-span-6 lg:col-span-2">
          <BarChart data={profitBySymbolData} options={options} />
        </div>

        {/* نمودار حجم معاملات هر نماد */}
        <div className="col-span-6 lg:col-span-2">
          <DoughnutChart data={volumeBySymbolData} options={options} />
        </div>

        {/* نمودار حجم معاملات خرید و فروش */}
        <div className="col-span-6 lg:col-span-2">
          <PieChart data={volumeByTradeType} options={options} />
        </div>

        {/* نمودار تعداد معاملات هر نماد */}
        <div className="col-span-6 lg:col-span-2">
          <DoughnutChart data={symbols_Count_data} options={options} />
        </div>

        {/* نمودار PolarArea برای تعداد معاملات هر نماد */}
        <div className="col-span-6 lg:col-span-2">
          <PolarAreaChart data={polarData} options={options} />
        </div>

        {/* نمودار Gauge برای نمایش ضریب برد معاملات */}
        <div className="col-span-6 lg:col-span-2">
          <GaugeChart data={gaugeData} options={options} />
        </div>

        {/* نمودار نسبت خرید و فروش‌ها */}
        <div className="col-span-6 lg:col-span-2">
          <PieChart data={tradeTypeData} options={options} />
        </div>

        {/* تقویم */}
        <div className="col-span-6 lg:col-span-6 grid justify-center">
          <PersianCalendar trades={trades} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
