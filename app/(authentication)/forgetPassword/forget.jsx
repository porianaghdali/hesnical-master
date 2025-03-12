"use client";
import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { back } from "./svg";
export default function Forget() {
  const router = useRouter();
  const [formData, setFormData] = useState({

    email: "",
   

  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState(1); // مراحل فرم (مرحله 1 یا 2)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/identity/user/forgot-password`,
        formData
      );
      // setSuccess("ثبت‌نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.");
      setFormData({
    
        email: "",
       
      });
    } catch (err) {
      setError(err.response?.data?.message || "مشکلی پیش آمده است!");
    }
    setStep(2)
  };

  const renderStep1 = () => (
    <div className=" p-6 ">
      <p className="text-4xl mb-3 font-semibold leading-10 text-#181D27 ">
        {" "}
        فراموشی رمز عبور{" "}
      </p>
      <p className="text-[16px] leading-6 text-[#535862] mb-8">
        نگران نباشید، راهنمای عوض کردن رمز عبور را می‌میفرستیم.{" "}
      </p>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          ایمیل
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="ایمیل خود را وارد کنید"
          value={formData.email}
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          boxShadow:
            "0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))",
        }}
        className="w-full mb-8 bg-[#F5F5F5] text-[#A4A7AE] px-4 py-2.5 text-[16px] font-semibold  rounded-lg border-[1px] border-[#E9EAEB]  hover:bg-[#8658D7] hover:text-white"
      >
        مرحله بعد
      </button>
      <p className=" leading-5 text-sm text-[#535862] font-semibold flex gap-1">
        <Link href="/login" className="flex gap-1">
          {" "}
          {back}
          بازگشت به صفحه ورود{" "}
        </Link>
      </p>
    </div>
  );
  const renderStep2 = () => (
    <>
      <div className=" p-6 ">
        <p className="text-4xl mb-3 font-semibold leading-10 text-#181D27 ">
          {" "}
          ایمیل خود را بررسی کنید{" "}
        </p>
        <p className="text-[16px] leading-6 text-[#535862] mb-8">
          یک لینک برای عوض کردن رمز عبور به {formData.email} فرستادیم.{" "}
        </p>

        <button
          onClick={handleSubmit}
          style={{
            boxShadow:
              "0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))",
          }}
          className="w-full mb-8 bg-[#F5F5F5] text-[#A4A7AE] px-4 py-2.5 text-[16px] font-semibold  rounded-lg border-[1px] border-[#E9EAEB]  hover:bg-[#8658D7] hover:text-white"
        >
          تایید{" "}
        </button>
        <p className=" leading-5 text-sm text-[#535862] flex gap-1">
          کد تایید را دریافت نکردید؟{" "}
          <Link
            href="/"
            className="text-sm leading-5 font-semibold text-[#713FC2]"
          >
            ارسال مجدد{" "}
          </Link>
        </p>
      </div>
    </>
  );
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          {step === 1 ? renderStep1() : step === 2 ? renderStep2() : null}{" "}
        </div>
      </div>
    </>
  );
}
