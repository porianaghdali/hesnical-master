"use client"

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const KilometerChart = () => {
  const data = {
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ], // داده‌ها برای قسمت باقی‌مانده و استفاده‌شده
    datasets: [
      {
        data: [50,20, 30], // درصد کیلومتر باقی‌مانده و استفاده‌شده
        backgroundColor: ["#00FF00", "#FF0000","blue"], // رنگ‌های مختلف برای باقی‌مانده و استفاده‌شده
        borderWidth: 1,
        cutout: "80%", // ایجاد فضای خالی در وسط برای شبیه‌سازی کیلومتر
        rotation: -90, // شروع چارت از بالا (برای قرار گرفتن از بالا)
        circumference: 180, // نیم‌دایره
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // مخفی کردن legend
      },
      title: {
        display: true,
        text: "Kilometer Gauge", // عنوان نمودار
      },
    },
    animation: {
      animateRotate: true, // فعال کردن انیمیشن چرخش
      animateScale: true, // فعال کردن انیمیشن مقیاس
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default KilometerChart;
