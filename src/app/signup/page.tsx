"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import authRepository, { SignupBody } from "@/data/repository/authRepository";

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupBody>({
    name: "",
    family: "",
    phoneNumber: "",
    nationalCode: "",
    emailAddress: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.emailAddress ||
      !formData.family ||
      !formData.name ||
      !formData.nationalCode ||
      !formData.password ||
      !formData.phoneNumber
    ) {
      toast.error("یک یا چند فیلد خالی است");
      return;
    }

    authRepository
      .Signup(formData)
      .then((response) => {
        const message = response.data.message;

        switch (message) {
          case "User created successfully":
            toast.success(
              "ثبت نام با موفقیت انجام شد! به صفحه منتقل می شوید.",
              {
                autoClose: 3500,
              }
            );
            setTimeout(() => {
              router.push("/login");
            }, 3000);
            break;

          case "User with this phone number, national code, or email address already exists":
            toast.error(
              "حساب کاربری با این شماره موبایل ، کد ملی یا ایمیل از قبل وجود دارد !",
              {
                autoClose: 5000,
              }
            );
            break;

          case "National code must be a 10-digit number":
            toast.error("فرمت کد ملی نادرست است !", { autoClose: 4000 });
            break;

          case "Phone number must be an 11-digit number starting with 09":
            toast.error(
              "فرمت شماره تلفن غلط است.\n شماره تلفن باید یک عدد ۱۱ رقمی و شروع آن با ۰۹ باشد"
            );
            break;

          case "All fields are required":
            toast.error("وارد کردن تمام فیلد ها اجباری است");
            break;

          default:
            toast.error("خطای ناشناخته رخ داده است.");
            break;
        }
      })
      .catch((error) => {
        toast.error("ثبت نام با خطا مواجه شد. لطفا دوباره تلاش کنید.");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded-lg shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center font-semibold">ثبت نام</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                نام
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="نام"
                className="block border border-gray-300 w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="family"
                className="block text-sm font-medium text-gray-700"
              >
                نام خانوادگی
              </label>
              <input
                type="text"
                name="family"
                id="family"
                value={formData.family}
                onChange={handleChange}
                placeholder="نام خانوادگی"
                className="block border border-gray-300 w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                شماره تلفن
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="شماره تلفن"
                className="block border border-gray-300 w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nationalCode"
                className="block text-sm font-medium text-gray-700"
              >
                کد ملی
              </label>
              <input
                type="text"
                name="nationalCode"
                id="nationalCode"
                value={formData.nationalCode}
                onChange={handleChange}
                placeholder="کد ملی"
                className="block border border-gray-300 w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700"
              >
                آدرس ایمیل
              </label>
              <input
                type="email"
                name="emailAddress"
                id="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="آدرس ایمیل"
                className="block border border-gray-300 w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                رمز عبور
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="رمز عبور"
                className="block border border-gray-300 w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ایجاد حساب
            </button>
          </form>
          <div className="text-right text-sm text-gray-600 mt-4">
            با ثبت‌نام، شما با شرایط استفاده سیاست‌های حریم خصوصی موافقت
            می‌کنید.
          </div>
          <div className="text-gray-600 mt-6 flex gap-1 items-center justify-center">
            قبلاً حساب کاربری دارید؟
            <a
              className="no-underline border-blue-600 text-blue-600 visited:text-blue-600"
              href="../login/"
            >
              ورود به سیستم
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
