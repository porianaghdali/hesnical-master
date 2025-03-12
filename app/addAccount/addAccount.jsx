"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { back } from "./svg";

export default function Register() {
  const brokerList = [
    {
      title: "alpari",
      id: 1,
    },
    {
      title: "AMarkets",
      id: 2,
    },
    {
      title: "Otet Markets",
      id: 3,
    },
    {
      title: "trendo",
      id: 4,
    },
    {
      title: "Delta",
      id: 5,
    },
    {
      title: "FiboGroup",
      id: 6,
    },
  ];
  const platform = [
    {
      title: "MetaTrader5",
      id: 1,
    },
    {
      title: "MetaTrader4",
      id: 2,
    },
  ];
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    account: "",
    investmentPassword: "",
    server: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    activateUser: true,
    autoConfirmEmail: true,
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

    if (formData.password !== formData.confirmPassword) {
      setError("رمز عبور با تایید رمز عبور همخوانی ندارد!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/identity/user`,
        formData
      );
      setSuccess("ثبت‌نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.");
      setFormData({
        firstName: "",
        lastName: "",
        nationalCode: "",
        account: "",
        investmentPassword: "",
        server: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        activateUser: true,
        autoConfirmEmail: true,
      });
      setStep(1); // بازگشت به مرحله 1 بعد از موفقیت
    } catch (err) {
      setError(err.response?.data?.message || "مشکلی پیش آمده است!");
    }
  };

  const renderStep1 = () => (
    <div className=" p-6 ">
      <p className="text-4xl mb-3 font-semibold leading-10 text-#181D27 ">
        {" "}
        اطلاعات حساب{" "}
      </p>
      <p className="text-[16px] leading-6 text-[#535862] mb-8">
        اطلاعات حساب را تکمیل کنید.{" "}
      </p>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="accountName"
          className="block text-sm font-medium text-gray-700"
        >
          ایمیل
        </label>
        <input
          type="text"
          id="accountName"
          name="accountName"
          placeholder="ایمیل خود را وارد کنید"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          required
        />
      </div>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="broker"
          className="flex gap-1 text-sm font-medium text-gray-700"
        >
          <span className="text-[#8658D7] font-medium">*</span>
          بروکر
        </label>
        <select
          type="text"
          id="broker"
          name="broker"
          placeholder="ایمیل خود را وارد کنید"
          defaultValue="انتخاب کنید"
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] bg-white border-[#D5D7DA] rounded-lg outline-[#9270E2] text-[#717680] text-[16px]"
          required
        >
          <option value="انتخاب کنید" disabled hidden className="">
            انتخاب کنید
          </option>
          {brokerList.map((item, key) => {
            return (
              <option
                className="text-[#181D27] font-medium text-[16px]  leading-6"
                key={key}
                value={item.id}
              >
                {item.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="broker"
          className="flex gap-1 text-sm font-medium text-gray-700"
        >
          {" "}
          <span className="text-[#8658D7] font-medium">*</span>
          پلتفرم
        </label>
        <select
          type="text"
          id="broker"
          name="broker"
          placeholder="ایمیل خود را وارد کنید"
          defaultValue="انتخاب کنید"
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] bg-white border-[#D5D7DA] rounded-lg outline-[#9270E2] text-[#717680] text-[16px]"
          required
        >
          <option
            value="انتخاب کنید"
            disabled
            hidden
            className="text-[#717680] text-[16px]"
          >
            انتخاب کنید
          </option>
          {platform.map((item, key) => {
            return (
              <option
                className="text-[#181D27] font-medium text-[16px]  leading-6"
                key={key}
                value={item.id}
              >
                {item.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="accountNum"
          className="flex gap-1 text-sm font-medium text-gray-700"
        >
          {" "}
          <span className="text-[#8658D7] font-medium">*</span>
          شماره حساب معاملاتی{" "}
        </label>
        <input
          type="text"
          id="accountNum"
          name="accountNum"
          placeholder="شماره حساب را وارد کنید"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          required
        />
      </div>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="password"
          className="flex gap-1 text-sm font-medium text-gray-700"
        >
          {" "}
          <span className="text-[#8658D7] font-medium">*</span>
          رمز عبور سرمایه گذار{" "}
        </label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="رمزعبور را وارد کنید"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          required
        />
      </div>
      <Link className="w-full h-full" href="/dashboard">
        <button
          onClick={() => setStep(2)}
          style={{
            boxShadow:
              "0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))",
          }}
          className="w-full mb-8 bg-[#F5F5F5] text-[#A4A7AE] px-4 py-2.5 text-[16px] font-semibold  rounded-lg border-[1px] border-[#E9EAEB]  hover:bg-[#8658D7] hover:text-white"
        >
          ایجاد حساب معاملاتی{" "}
        </button>
      </Link>
    </div>
  );

  return (
    <div className="">
      {" "}
      <p className="w-full p-4 border-b-[1px] border-[#E9EAEB] text-[#181D27] text-2xl leading-8 font-semibold mb-16">
        افزودن حساب معاملاتی{" "}
      </p>
      <div className=" flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {renderStep1()}
        </div>
      </div>
    </div>
  );
}
