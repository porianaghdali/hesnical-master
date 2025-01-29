"use client";
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";
import axios from "axios";

import { useState } from "react";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        "http://82.99.195.99:4003/api/identity/token",
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
          console.log("User role saved:", role);
        } else {
          console.warn("Role not found in token.");
        }

        // هدایت به صفحه داشبورد
        router.push("/dashboard");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl mb-4">ورود به حساب</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <a href="/register">ثبت نام</a>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          // type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onSubmit={handleLogin}
        >
          ورود
        </button>
      </form>
    </div>
  );
}
