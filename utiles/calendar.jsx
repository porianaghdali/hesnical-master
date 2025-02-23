import React from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import "../styles/calendar.css";

const MyCalendar = ({ trades }) => {
  const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const persianDatesTranslate = (item) => {
    // تبدیل تاریخ میلادی به شمسی
    const date = new Date(item);
    const persianDate = new DateObject({ date, calendar: persian });

    // فرمت تاریخ شمسی
    const shamsiDate = persianDate.format("YYYY/MM/DD");
    return toPersianDigits(shamsiDate);
  };

  const Days = trades.map((trade) => ({
    time: persianDatesTranslate(trade.date),
    profit: trade.netProfit,
  }));

  const dailyProfit = React.useMemo(() => {
    const result = {};

    Days.forEach((trade) => {
      const date = trade.time;

      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += trade.profit;
    });

    return result;
  }, [trades]);

  const persianDates = Days.map((date) => date.time);

  
  return (
    <Calendar
      calendar={persian}
      locale={persian_fa}
      mapDays={({ date }) => {
        const formattedDate = new DateObject(date)
          // .convert(persian)
          .format("YYYY/MM/DD");
        // اگر این روز در data داریم، سود/ضرر را نمایش بدهیم
        if (persianDates.includes(formattedDate)) {
          const profit = Math.round(dailyProfit[formattedDate] * 10) / 10;
          const profitText = toPersianDigits(profit.toString()); // تبدیل سود/ضرر به اعداد فارسی
          const color =
            profit > 0 ? "rgb(86, 201, 86,.15)" : "rgb(255, 82, 82, .15)"; // سبز برای سود، قرمز برای ضرر
          const border =
            profit > 0 ? "1px solid rgb(18 ,135 ,18)" : "1px solid #ff89aa"; // سبز برای سود، قرمز برای ضرر
          return {
            className: `special-day `,
            style: {
              color: profit > 0 ? "green" : "#FF5252",
              fontWeight: "bold", // برای برجسته کردن متن
            },
            title: `${toPersianDigits(profit)} تومان`, // نمایش سود یا ضرر در تکست
            children: (
              <div
                className="w-full"
                style={{
                  backgroundColor: color,
                  color: "#FFF",
                  borderRadius: "4px",
                  border: border,
                  height: "100% ",
                }}
              >
                <p
                  className="text-end w-full p-2 text-black"
                  style={{ fontSize: "10px" }}
                >
                  {toPersianDigits(date.day)}
                </p>
                <p
                  dir="ltr"
                  className=" px-2 text-black font-bold "
                  style={{ fontSize: "12px", textAlign: "right" }}
                >
                  {profitText}
                </p>
              </div>
            ),
          };
        } else if (!persianDates.includes(formattedDate)) {
          return {
            children: (
              <div
                className="w-full"
                style={{
                  color: "#FFF",
                  borderRadius: "4px",
                  fontSize: "12px",
                  textAlign: "center",
                  height: "100% ",
                }}
              >
                <p
                  className="text-end w-full p-2 text-black"
                  style={{ fontSize: "10px", width: "100%" }}
                >
                  {toPersianDigits(date.day)}
                </p>
              </div>
            ),
          };
        }
      }}
    />
  );
};

export default MyCalendar;
