"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {accounts,
  dashboard,
  journal,
  trades,
  reports}from "../utiles/sideBarSvg"
const Sidebar = () => {
  const { UserData, token } = useUser();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const Svg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
    </svg>
  );
  const Demo = (
    <svg
      fill="#ffffff"
      height="24px"
      width="24px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          id="XMLID_222_"
          d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
        ></path>
      </g>
    </svg>
  );
  const menuItems = [
    { title: "حساب های معاملاتی", href: "/accounts",svg:accounts },
    { title: "داشبورد", href: "/dashboard",svg:dashboard },
    { title: "دیلی ژورنال", href: "/journal" ,svg:journal},
    { title: "معاملات", href: "/trades" ,svg:trades},
    { title: "گزارشات", href: "/reports" ,svg:dashboard},
    { title: "تنظیمات", href: "/setting" ,svg:reports},
  ];
  return (
    <>
      <div
        className={` bg-white text-white h-screen p-4 transition-all duration-300  z-30 relative ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`absolute hidden lg:block bg-white text-black p-1 rounded-full left-[-12px] transition-all duration-300  top-10 ${
            isOpen ? "" : "rotate-180"
          }`}
        >
          {Svg}
        </button>
        <div className="mb-16">
          <Link href="/dashboard" className=" text-xl font-bold mb-16    ">
            {isOpen ? (
              <Image
                src="/img/sideBarLog.png"
                width={32}
                height={32}
                alt="hesnical-logo"
              />
            ) : (
              Demo
            )}
          </Link>
        </div>
        <ul>
          {menuItems.map((item, key) => {
            return (
              <li key={key}>
                <Link
                  href={item.href}
                  className={
                    pathname == item.href
                      ? "flex gap-2 bg-[#FAFAFA]  py-2 px-4 rounded"
                      : "flex gap-2  py-2 px-4 over:bg-gray-700 rounded"
                  }
                ><span>{item.svg}</span>
                  {isOpen ? (
                    <p className="text-[#414651] leading-6 text-[16px] font-semibold">
                      {item.title}
                    </p>
                  ) : (
                    Demo
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="absolute w-full right-0 p-4   bottom-0">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-center  hover:bg-gray-700"
          >
            <img src={UserData?.data.profilePictureDataUrl} alt="" />
            {isOpen ? <p>{UserData?.data.firstName}</p> : Demo}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
