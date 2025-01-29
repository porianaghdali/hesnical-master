import React from "react"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "../styles/calendar.css"
export default function PersianCalendar() {
  return (
    <Calendar
    //   calendar={english}
    //   locale={persian_fa}
    onChange={()=>{console.log("test calendar")}}
    />
  )
}