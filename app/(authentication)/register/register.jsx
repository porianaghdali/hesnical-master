'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Register() {
  const router = useRouter()
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">اطلاعات شخصی</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">نام</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">نام خانوادگی</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">کد ملی</label>
        <input
          type="text"
          id="nationalCode"
          name="nationalCode"
          value={formData.nationalCode}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">حساب کاربری</label>
        <input
          type="text"
          id="account"
          name="account"
          value={formData.account}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">کلمه عبور سرمایه گذاری</label>
        <input
          type="text"
          id="investmentPassword"
          name="investmentPassword"
          value={formData.investmentPassword}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">سرور</label>
        <input
          type="text"
          id="server"
          name="server"
          value={formData.server}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        onClick={() => setStep(2)}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-4"
      >
        مرحله بعد
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">اطلاعات حساب</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ایمیل</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">نام کاربری</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">رمز عبور</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">تایید رمز عبور</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">شماره تلفن</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition mt-4"
      >
        ثبت‌نام
      </button>
      <button
        onClick={() => setStep(1)}
        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition mt-4"
      >
        بازگشت به مرحله قبلی
      </button>
      <div className="text-center mt-4">
        <p>
          قبلاً حساب کاربری دارید؟{" "}
          <a
            href="/login" // لینک به صفحه ورود
            className="text-blue-500 hover:text-blue-700"
          >
            ورود به حساب
          </a>
        </p>
      </div>
    </div>
  );

  return (
   <><div className="min-h-screen flex items-center justify-center bg-gray-100">
   <div className="w-full max-w-md">
     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
     {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
     {step === 1 ? renderStep1() : renderStep2()}
   </div>
 </div></>
  )
}
