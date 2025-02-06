import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AreaChart = ({data}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // ذخیره‌ی نمونه‌ی نمودار

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // بررسی اگر نمودار قبلاً ساخته شده است، آن را حذف کنیم
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // ساخت نمودار جدید و ذخیره‌ی آن در chartInstanceRef
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data,
      
      options: {
        plugins: {
          legend: {
              display: false  // مخفی کردن عنوان (legend)
          }
      },
        responsive: true,
        scales: {
          x: {
            ticks: {
              font: {
                family: "Raavi",
                size: 10,
              },
            },
          },
          y: {
            ticks: {
              font: {
                family: "Raavi",
                size: 10,
              },
            },
          },
        },      
      }
    });

    return () => {
      // هنگام خروج از کامپوننت، نمودار را پاک کنیم
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default AreaChart;
