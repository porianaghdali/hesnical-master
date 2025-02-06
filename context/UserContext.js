"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [UserData, setUserData] = useState(null);
  const [UserActivities, setUserActivities] = useState(null);
  const [loading, setLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // وضعیت خطا
  const token = Cookies.get("access_token");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    // بررسی و دریافت اطلاعات کاربر فقط بعد از رندر شدن در سمت کلاینت
    if (token) {
      axios
        .get(apiUrl + "/api/identity/account/GetAccountDetail", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserData(res.data);
          setLoading(false); // بارگذاری تکمیل شد
        })
        .catch((err) => {
          setError("Error fetching user data");
          setLoading(false); // بارگذاری تکمیل شد
          console.error("Error fetching user data:", err);
        });
    } else {
      setLoading(false); // بارگذاری تکمیل شد حتی اگر توکن نباشد
    }
    if (token) {
      axios
        .get(apiUrl + "/api/v1/TradeDeal/GetAll", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
            setUserActivities(res.data);
          setLoading(false); // بارگذاری تکمیل شد
        })
        .catch((err) => {
          setError("Error fetching user data");
          setLoading(false); // بارگذاری تکمیل شد
          console.error("Error fetching user data:", err);
        });
    } else {
      setLoading(false); // بارگذاری تکمیل شد حتی اگر توکن نباشد
    }
  }, [token]);

  // از رندر شدن در سرور جلوگیری می‌کنیم
  if (typeof window === "undefined") {
    return null;
  }

  if (loading) {
    return <div>در حال بارگذاری...</div>; // نمایش لودینگ
  }

  return (
    <UserContext.Provider value={{ UserData, loading, UserActivities,error,token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
