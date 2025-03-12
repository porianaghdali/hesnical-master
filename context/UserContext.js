// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [UserData, setUserData] = useState({
//     $id: "1",
//     data: {
//       $id: "2",
//       id: "13d43bc3-b494-43b6-8f9e-48c28fc20fb1",
//       userName: "61300615",
//       firstName: "poria",
//       lastName: "naghdali",
//       email: "porianaghdali@gmail.com",
//       isActive: true,
//       emailConfirmed: true,
//       phoneNumber: "09385311023",
//       profilePictureDataUrl: null,
//       account: "10211327",
//       investmentPassword: "6g1a8R_)C*yK",
//       server: "CapitalxtendLLC-MU",
//       metaTraderVersion: 5,
//     },
//     messages: {
//       $id: "3",
//       $values: [],
//     },
//     succeeded: true,
//   });
//   const [UserActivities, setUserActivities] = useState({
//     $id: "1",
//     data: {
//       $id: "2",
//       $values: [
//         {
//           $id: "3",
//           id: 450,
//           userId: "13d43bc3-b494-43b6-8f9e-48c28fc20fb1",
//           ticketId: 20670812,
//           orderId: 23037733,
//           time: 1739182717,
//           timeMsc: 1739182717684,
//           type: 0,
//           entry: 0,
//           magic: 0,
//           positionId: 23037733,
//           reason: 0,
//           volume: 0.12,
//           price: 1.77748,
//           commission: 0,
//           swap: 0,
//           profit: -68.42,
//           fee: 0,
//           symbol: "GBPCAD!",
//           comment: "",
//           externalId: "",
//           duration: 42313,
//         },
//         {
//           $id: "4",
//           id: 451 ,
//           userId: "13d43bc3-b494-43b6-8f9e-48c28fc20fb1",
//           ticketId: 20670812,
//           orderId: 23037733,
//           time: 1739182717,
//           timeMsc: 1739182717684,
//           type: 0,
//           entry: 0,
//           magic: 0,
//           positionId: 23037733,
//           reason: 0,
//           volume: 0.12,
//           price: 1.77748,
//           commission: 0,
//           swap: 0,
//           profit: -68.42,
//           fee: 0,
//           symbol: "GBPCAD!",
//           comment: "",
//           externalId: "",
//           duration: 42313,
//         },
//       ],
//     },
//     messages: {
//       $id: "785",
//       $values: [],
//     },
//     succeeded: true,
//   });
//   const [UserDailyProfit, setUserDailyProfit] = useState({
//     $id: "1",
//     balanceList: {
//       $id: "2",
//       $values: [
//         {
//           $id: "3",
//           totalTrade: 250,
//           profitTradeCount: 0,
//           lossTradeCount: 100,
//           date: "2025-02-10T00:00:00",
//           totalProfit: 0,
//           totalLoss: -3769.0000000000036,
//           netProfit: -3769.0000000000036,
//           balance: 91693.16,
//           swap: 0,
//           commission: 0,
//           rawItems: {
//             $id: "4",
//             $values: [
//               {
//                 $id: "5",
//                 id: 450,
//                 userId: "13d43bc3-b494-43b6-8f9e-48c28fc20fb1",
//                 ticketId: 20670812,
//                 orderId: 23037733,
//                 time: 1739182717,
//                 timeMsc: 1739182717684,
//                 type: 0,
//                 entry: 0,
//                 magic: 0,
//                 positionId: 23037733,
//                 reason: 0,
//                 volume: 0.12,
//                 price: 1.77748,
//                 commission: 0,
//                 swap: 0,
//                 profit: -68.42,
//                 fee: 0,
//                 symbol: "GBPCAD!",
//                 comment: "",
//                 externalId: "",
//                 duration: 42313,
//               },
//             ],
//           },
//         },
//         {
//           $id: "4",
//           totalTrade: 250,
//           profitTradeCount: 0,
//           lossTradeCount: 100,
//           date: "2025-02-14T00:00:00",
//           totalProfit: 37,
//           totalLoss: 0,
//           netProfit: 37,
//           balance: 91693.16,
//           swap: 0,
//           commission: 0,
//           rawItems: {
//             $id: "4",
//             $values: [
//               {
//                 $id: "5",
//                 id: 450,
//                 userId: "13d43bc3-b494-43b6-8f9e-48c28fc20fb1",
//                 ticketId: 20670812,
//                 orderId: 23037733,
//                 time: 1739182717,
//                 timeMsc: 1739182717684,
//                 type: 0,
//                 entry: 0,
//                 magic: 0,
//                 positionId: 23037733,
//                 reason: 0,
//                 volume: 0.12,
//                 price: 1.77748,
//                 commission: 0,
//                 swap: 0,
//                 profit: -68.42,
//                 fee: 0,
//                 symbol: "GBPCAD!",
//                 comment: "",
//                 externalId: "",
//                 duration: 42313,
//               },
//             ],
//           },
//         },
//       ],
//     },
//     maxBalance: 91693.16,
//     minBalance: 9924.62000000001,
//     maxDrawdown: 89.17627007292582,
//     balanceDrawdownMaximal: 81768.54,
//     startBalance: 91693.16,
//     endingBalance: 9924.62000000001,
//     profit: -81768.54,
//     profitToLossRatio: 0.3333333333333333,
//     mostProfitableDay: {
//       $id: "793",
//       date: "2025-02-13T00:00:00",
//       netProfit: 21239.820000000007,
//     },
//     mostLossDay: {
//       $id: "794",
//       date: "2025-02-14T00:00:00",
//       netProfit: -73960.31999999999,
//     },
//     dateRange: {
//       $id: "795",
//       start: "2025-02-10T00:00:00",
//       end: "2025-02-14T00:00:00",
//     },
//   });
//   const [step, setStep] = useState(1); // مراحل فرم (مرحله 1 یا 2)

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [fetched, setFetched] = useState(false); // برای جلوگیری از فراخوانی‌های مکرر

//   const token = Cookies.get("access_token");
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     if (!token || fetched) return; // جلوگیری از اجرای دوباره‌ی درخواست‌ها

//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [accountRes, tradeRes, profitRes] = await Promise.all([
//           axios.get(apiUrl + "/api/identity/account/GetAccountDetail", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(apiUrl + "/api/v1/TradeDeal/GetAll", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(apiUrl + "/api/v1/TradeDeal/NetDailyPprfitAndLoss", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         setUserData(accountRes.data);
//         setUserActivities(tradeRes.data);
//         setUserDailyProfit(profitRes.data);
//         setFetched(true); // یکبار دیتا را گرفتیم، دیگر نگیریم
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Error fetching user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token, apiUrl, fetched]);

//   if (typeof window === "undefined") return null;
//   if (loading) return <div>در حال بارگذاری...</div>;

//   return (
//     <UserContext.Provider
//       value={{
//         UserData,
//         loading,
//         UserActivities,
//         error,
//         token,
//         UserDailyProfit,setStep,step
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [UserData, setUserData] = useState(null);
  const [UserActivities, setUserActivities] = useState(null);
  const [UserDailyProfit, setUserDailyProfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // مراحل فرم

  const token = Cookies.get("access_token");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    const worker = new Worker("/worker.js"); // فراخوانی Web Worker

    worker.postMessage({ apiUrl, token });

    worker.onmessage = function (event) {
      const { success, userData, userActivities, userDailyProfit, error } = event.data;
      
      if (error) {
        setError(error);
      } else if (success) {
        setUserData(userData);
        setUserActivities(userActivities);
        setUserDailyProfit(userDailyProfit);
      }

      setLoading(false);
      worker.terminate(); // بستن Worker پس از دریافت داده
    };

    return () => worker.terminate(); // پاکسازی Worker هنگام خروج از کامپوننت
  }, [token, apiUrl]);

  if (typeof window === "undefined") return null;
  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <UserContext.Provider value={{ UserData, UserActivities, UserDailyProfit, error, step, setStep }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
