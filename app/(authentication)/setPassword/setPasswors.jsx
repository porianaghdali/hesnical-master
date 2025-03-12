"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { back } from "./svg";
export default function SetPassword() {
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
        رمز عبور جدید{" "}
      </p>
      <p className="text-[16px] leading-6 text-[#535862] mb-8">
        رمز عبور جدید شما باید با رمزهای عبور قبلی متفاوت باشد.{" "}
      </p>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="password"
          className=" text-sm font-medium flex gap-1 text-gray-700"
        >
          <span className="text-[#8658D7]">*</span>
          رمز عبور{" "}
        </label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="ایمیل خود را وارد کنید"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          required
        />
        <label
          htmlFor="password"
          className=" text-sm font-medium flex gap-1 text-gray-700"
        >
          رمز عبور بهتر است ترکیبی از حروف انگلیسی (بزرگ و کوچک)، اعداد و
          کاراکترهای خاص (نمادها) باشد.{" "}
        </label>
      </div>
      <div className=" grid gap-1.5 mb-8">
        <label
          htmlFor="confirmpassword"
          className=" text-sm font-medium flex gap-1 text-gray-700"
        >
          <span className="text-[#8658D7]">*</span>
          تکرار رمز عبور{" "}
        </label>
        <input
          type="text"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="تایید رمز عبور را وارد کنید."
          value={formData.firstName}
          onChange={handleChange}
          className="w-full py-2.5 px-3.5 border-[1px] border-[#D5D7DA] rounded-lg outline-[#9270E2]"
          required
        />
      </div>

      <button
        onClick={() => setStep(2)}
        style={{
          boxShadow:
            "0px 1px 2px 0px var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))",
        }}
        className="w-full mb-8 bg-[#F5F5F5] text-[#A4A7AE] px-4 py-2.5 text-[16px] font-semibold  rounded-lg border-[1px] border-[#E9EAEB]  hover:bg-[#8658D7] hover:text-white"
      >
        تایید{" "}
      </button>
    </div>
  );
  const renderStep2 = () => (
    <>
      <div className=" p-6 ">
        <p className="text-4xl mb-3 font-semibold leading-10 text-#181D27 ">
          {" "}
          عوض کردن رمز عبور{" "}
        </p>
        <p className="text-[16px] leading-6 text-[#535862] mb-8">
          رمز عبور شما با موفقیت عوض شد.{" "}
        </p>

        <button
          onClick={() => {}}
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
            href="/login"
            className="text-sm leading-5 font-semibold text-[#713FC2]"
          >
            بازگشت به صفحه ورود{" "}
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
