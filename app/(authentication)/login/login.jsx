"use client";
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";
import axios from "axios";

import { useState } from "react";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        apiUrl + "/api/identity/token",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (response.status === 200) {
        const { token, refreshToken, refreshTokenExpiryTime } =
          response.data.data;

        // دیکد کردن توکن برای استخراج اطلاعات
        const decodedToken = jwtDecode(token);

        // استخراج نقش از توکن
        const role =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        // ذخیره‌سازی توکن‌ها و نقش در کوکی‌ها
        Cookie.set("access_token", token, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookie.set("refresh_token", refreshToken, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookie.set("refresh_token_expiry", refreshTokenExpiryTime, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        // ذخیره نقش در کوکی
        if (role) {
          Cookie.set("user_role", role, {
            expires: 7,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
        } else {
        }

        // هدایت به صفحه داشبورد
        router.push("/dashboard");
      } else {
      }
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-2 justify-center items-center h-screen bg-white p-6">
      <form
        onSubmit={handleLogin}
        className=" w-[360px] mx-auto"
      >
              <Image src="/img/Logo.png" width={48} height={49} className="mb-12" alt=""/>

        <p className=" text-4xl font-semibold leading-[44px] text-[#181D27] mb-3 ">
          ورود{" "}
        </p>
        <p className="text-[16px] text-[#535862] leading-6 mb-8">
          خوش آمدید! لطفا مشخصات خود را وارد کنید.
        </p>
        <div className="mb-4 grid gap-1.5">
          <label
            htmlFor="username"
            className="block text-[#414651] text-sm font-medium"
          >
            ایمیل{" "}
          </label>
          <input 
            id="username"
            type="text"
            placeholder="ایمیل خود را وارد کنید"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          />
        </div>
        <div className="mb-6 grid gap-1.5 relative">
          <label
            htmlFor="password"
            className="block text-[#414651] text-sm font-medium"
          >
            رمز عبور
          </label>

          <input
            placeholder="رمزعبور را وارد کنید"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          />
           
         
          <span  className=" absolute top-10 left-3.5">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2534_1886)">
                <path
                  d="M2.44642 9.43701C2.35563 9.29325 2.31024 9.22137 2.28482 9.1105C2.26574 9.02722 2.26574 8.89589 2.28482 8.81261C2.31024 8.70175 2.35563 8.62987 2.44642 8.48611C3.19669 7.29812 5.42994 4.29489 8.83328 4.29489C12.2366 4.29489 14.4699 7.29812 15.2201 8.48611C15.3109 8.62987 15.3563 8.70175 15.3817 8.81261C15.4008 8.89589 15.4008 9.02722 15.3817 9.1105C15.3563 9.22137 15.3109 9.29325 15.2201 9.43701C14.4699 10.625 12.2366 13.6282 8.83328 13.6282C5.42994 13.6282 3.19669 10.625 2.44642 9.43701Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.83328 10.9616C9.93785 10.9616 10.8333 10.0661 10.8333 8.96156C10.8333 7.85699 9.93785 6.96156 8.83328 6.96156C7.72871 6.96156 6.83328 7.85699 6.83328 8.96156C6.83328 10.0661 7.72871 10.9616 8.83328 10.9616Z"
                  stroke="#A4A7AE"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2534_1886">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.833008 0.961548)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
        <div className="mb-4">
          <Link href="/forgetPassword"  className="text-sm text-[#713FC2] font-semibold">رمز عبور را فراموش کرده اید؟</Link>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
        style={{
          boxShadow: "0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))"
        }}
          // type="submit"
          className="w-full bg-[#F5F5F5] text-[#A4A7AE] px-4 py-2.5 text-[16px] font-semibold  rounded-lg border-[1px] border-[#E9EAEB] mb-8 hover:bg-[#8658D7] hover:text-white"
          onSubmit={handleLogin}
        >
          ورود
        </button>
        <p className="text-sm text-[#535862] leading-5">حساب کاربری ندارید؟ <Link href="/register" className="text-[#713FC2] text-sm font-semibold">ثبت نام</Link></p>
      </form>
      <Image src="/img/login.png" width={12000} height={9000} alt="" className="w-full h-full"/>
    </div>
  );
}
