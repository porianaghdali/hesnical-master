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
const Dashboard = ({}) => {
  const { UserData,token,UserActivities } = useUser()
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales 2025 ($)",
        data: [70, 70, 70, 70, 70, 60],
        backgroundColor: "rgba(54, 162, 235, .1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
  };
  if (!UserData) {
    return <div>در حال بارگذاری...</div>; // می‌توانید این را به کامپوننت لودینگ سفارشی تغییر دهید
  }
  return (
    <div>
      <h1  className="text-2xl font-bold">داشبورد</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-2">
          <BarChart data={data} options={options} />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <DoughnutChart data={data} options={options} />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <LineChart data={data} options={options} />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <PieChart data={data} options={options} />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <PolarAreaChart data={data} options={options} />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <RadarChart data={data} options={options} />
        </div>
        <div className="col-span-4 lg:col-span-2">
          <GaugeChart data={data} options={options} />
        </div>
        <div className="col-span-4 lg:col-span-4">
          <PersianCalendar />
        </div>
        <div className="col-span-4 lg:col-span-4">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;