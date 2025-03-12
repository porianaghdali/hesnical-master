"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { menuArrow, notification } from "../utiles/dummy";
const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // حذف توکن‌ها از کوکی
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user_role");
    Cookies.remove("refresh_token_expiry");

    // هدایت به صفحه ورود
    router.push("/login");
  };

  return (
    <div className="flex w-full items-center justify-end gap-4 px-8 ">
      <button
        style={{
          boxShadow:
            "0px 0px 0px 1px var(--Colors-Effects-Shadows-shadow-skeumorphic-inner-border, rgba(10, 13, 18, 0.18)) inset, 0px -2px 0px 0px var(--Colors-Effects-Shadows-shadow-skeumorphic-inner, rgba(10, 13, 18, 0.05)) inset, 0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))",
        }}
        // onClick={handleLogout}
        className="text-[#414651] px-[14px] py-[10px] rounded-lg border-[1px] border-[#D5D7DA] flex gap-1.5 items-center"
      >
        CTrade
        {menuArrow}
      </button>
      <button>{notification}</button>
    </div>
  );
};

export default Navbar;
