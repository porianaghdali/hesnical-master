"use client";
import React from "react"; 
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { UserProvider } from "@/context/UserContext";




export default function DashboardLayout({ children }) {

  const token = Cookies.get("access_token");
  const [ShowMenu, setshowMenu] = useState(false);


  const router = useRouter();
  useEffect(() => {
    // اگر توکن وجود ندارد، هدایت به صفحه ورود
    if (!token ) {
      router.push("/login");
    }
  }, [router, token]);

  // نمایش لودینگ تا زمانی که اطلاعات کاربر بارگذاری شود
  if (!token) {
    return <div>در حال بارگذاری...</div>; // می‌توانید این را به کامپوننت لودینگ سفارشی تغییر دهید
  }
return (<UserProvider>
    <div className="flex h-screen bg-gray-100">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-[#4D3C8E] text-white p-4 grid grid-cols-12 top-0 left-0 w-full z-10">
          <div
            className={`lg:hidden absolute top-0 right-0  z-40 transition-all duration-300 ease-out bg-gray-3000 ${
              ShowMenu ? " translate-x-0" : "translate-x-64"
            }`}
          >
            <Sidebar />
          </div>

          <button
            onClick={() => {
              setshowMenu(!ShowMenu);
            }}
            className="lg:hidden col-span-1"
          >
            show
          </button>

          <div className="col-span-11 lg:col-span-12">
            <Navbar />
          </div>
        </div>

        <main className="flex-1 overflow-auto p-4 ">
          {" "}
          {children}
        </main>
      </div>
    </div></UserProvider>
    
  )
};
