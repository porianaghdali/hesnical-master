"use client";
import React from "react";

import { useState } from "react";

import Image from "next/image";
export default function DashboardLayout({ children }) {
  const [ShowMenu, setshowMenu] = useState(false);
  const[step,setStep]=useState(1)
   
  const progress = (
    <div className="p-[9px] rounded-full border-[3px] w-fit  bg-[#713FC2] ">
      <div className="w-[10px] h-[10px] bg-white rounded-full "></div>
    </div>
  );
  const wait = (
    <div className="p-[9px] border-[3px] w-fit rounded-full border-[#E9EAEB]">
      <div className="w-[10px] h-[10px] bg-[#D5D7DA] rounded-full "></div>
    </div>
  );
  const progressList = [
    {
      title: "اطلاعات کاربری",
      des: "ایمیل را وارد کنید.",
      id: 1,
    },
    {
      title: "ارسال کد تایید ",
      des: "کد تایید ارسال شده به ایمیل را وارد کنید.",
      id: 2,
    },
    {
      title: "اطلاعات فردی",
      des: "لطفا اطلاعات فردی را وارد کنید.",
      id: 3,
    },
  ];
  return (
    <div className="bg-white grid grid-cols-4">
      <div className="py-20 px-10 bg-[#FAFAFA]">
        <div>
          <Image
            src="/img/Logo.png"
            width={48}
            height={49}
            className="mb-12"
            alt=""
          />
        </div>
        <div className="grid w-fit ">
          {/* اولین مرحله */}
          {progressList.map((item, key, array) => {
            return (
              <div key={key} className="flex gap-4">
                <div className="p-[4px] transition-all duration-300  justify-center h-fit grid gap-2">
                  {step === item.id ? progress : wait}
                  {array.length != key + 1 ? (
                    <hr className="w-[2px] h-12 bg-[#E9EAEB] mx-auto transition-all duration-300" />
                  ) : null}
                </div>
                <div>
                  <p
                    className={
                      item.id == step
                        ? `text-[16px] text-[#713FC2] font-semibold`
                        : "text-[16px] font-semibold text-[#414651]"
                    }
                  >
                    {item.title}
                  </p>
                  <p
                    className={
                      item.id == step
                        ? `text-[16px] text-[#8658D7] font-normal`
                        : "text-[16px] font-normal text-[#535862]"
                    }
                  >
                    {item.des}
                  </p>
                </div>
              </div>
            );
          })}

          {/* خط اول */}

          {/* دومین مرحله */}
        </div>
        <button
          onClick={() => {
            setStep(step + 1);
          }}
        >
          ok
        </button>
      </div>
      <main className="flex-1 overflow-auto p-4 col-span-3 "> {children}</main>
    </div>
  );
}
