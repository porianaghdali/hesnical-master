// import React from "react"
// import { Calendar } from "react-multi-date-picker"
// import persian from "react-date-object/calendars/persian"
// import persian_fa from "react-date-object/locales/persian_fa"
// import "../styles/calendar.css"
// export default function PersianCalendar() {
//   return (
//     <Calendar
//       calendar={persian}
//       locale={persian_fa}
//     onChange={()=>{console.log("test calendar")}}
//     />
//   )
// }
import React from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "../styles/calendar.css";

export default function PersianCalendar({ trades }) {
  // پردازش داده‌ها: محاسبه سود/ضرر هر روز
  const dailyProfit = React.useMemo(() => {
    const result = {};

    trades.forEach((trade) => {
      const date = new Date(trade.time * 1000).toLocaleDateString("fa-IR"); // تاریخ به فرمت شمسی
      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += trade.profit; // جمع سود/ضرر هر روز
    });

    return result;
  }, [trades]);
console.log('%cutiles\calendar.jsx:36 trades', 'color: #007acc;', dailyProfit);
  // تابع برای رنگ‌آمیززملی روزها
  const mapDays = ({ date }) => {
    const persianDate = date.toLocaleString("fa-IR"); // تاریخ به فرمت شمسی
    const profit = dailyProfit[persianDate];

    if (profit > 0) {
      return { style: { backgroundColor: "#4CAF50", color: "white" } }; // سبز برای سود
    } else if (profit < 0) {
      return { style: { backgroundColor: "#F44336", color: "white" } }; // قرمز برای ضرر
    }
    return {}; // بدون تغییر برای روزهای بدون معامله
  };

  // تابع برای نمایش مقدار سود/ضرر در هر روز
  const renderDay = ({ date }) => {
    const persianDate = date.toLocaleString("fa-IR"); // تاریخ به فرمت شمسی
    const profit = dailyProfit[persianDate];

    if (profit) {
      return (
        <div>
          <span>{date.day}</span>
          <br />
          <span style={{ fontSize: "10px" }}>{profit.toFixed(2)}</span>
        </div>
      );
    }
    return date.day;
  };

  return (
    <Calendar
      calendar={persian}
      locale={persian_fa}
      mapDays={mapDays} // رنگ‌آمیزی روزها
      renderDay={renderDay} // نمایش مقدار سود/ضرر
    />
  );
}