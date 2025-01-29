"use client";

import { useUser } from "@/context/UserContext";
const Dashboard = ({}) => {
  const { UserData, token, UserActivities } = useUser();
  const table = [
    { title: "symbol", id: 1 },
    { title: "comment", id: 11 },
    { title: "commission", id: 2 },
    { title: "entry", id: 3 },
    { title: "externalId", id: 4 },
    { title: "fee", id: 5 },
    { title: "magic", id: 6 },
    { title: "price", id: 7 },
    { title: "profit", id: 8 },
    { title: "swap", id: 10 },

    { title: "time", id: 12 },
    { title: "volume", id: 13 },
  ];
  if (!UserActivities) {
    return <div>در حال بارگذاری...</div>; // می‌توانید این را به کامپوننت لودینگ سفارشی تغییر دهید
  }
  console.log(UserActivities?.data.$values, "UserActivities");
  return (
    <div>
      <h1 className="text-2xl font-bold">trades</h1>
      <h1 className="text-2xl font-bold">{UserData?.data.firstName}</h1>
      <div className="grid grid-cols-12 gap-2 p-2 border">
        {table.map((item, key) => {
          return (
            <div className="text-center border-r-2" key={key}>
              {item.title} 
            </div>
          );
        })}
      </div>
      <div className="grid  p-2  gap-2 border">
        {UserActivities?.data.$values.map((item, key) => {
          return (
            <>
              <div className="text-center grid grid-cols-12" key={key}>
                <div className=" font-bold">
                  {item.symbol.replace(/'/g, "")}
                </div>
                <div>{item.comment.replace(/'/g, "")}</div>
                <div>{item.commission}</div>
                <div>{item.entry}</div>
                <div>{item.externalId.replace(/'/g, "")}</div>
                <div>{item.fee}</div>
                <div>{item.magic}</div>
                <div>{Math.round(item.price * 100) / 100}</div>
                <div>{Math.round(item.profit * 100) / 100}</div>
                <div>{Math.round(item.swap * 100) / 100}</div>

                <div>{new Date(item.time * 1000).toLocaleString()}</div>
                <div>{Math.round(item.volume * 100) / 100}</div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
