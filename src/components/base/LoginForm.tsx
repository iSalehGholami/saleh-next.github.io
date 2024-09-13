'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userActions } from '@/store/userSlice';
import { LoginBody } from '@/types/authTypes';
import { RepoFactory } from '@/data/factory';
import { AxiosResponse } from 'axios';
import { Eye, EyeSlash } from 'iconsax-react';

function LoginForm() {
  const [formData, setFormData] = useState<LoginBody>({
    phoneNumber: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();

  const router = useRouter();

  const authRepository = RepoFactory.get('auth');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    authRepository
      .Login(formData)
      .then((response: AxiosResponse) => {
        const { token, message } = response.data;

        if (token) {
          {
            dispatch(userActions.login(token));
            toast.success('ورود موفقیت آمیز بود !');

            setTimeout(() => {
              router.push('/');
            }, 2000);
            return;
          }
        }

        switch (message) {
          case 'Phone number and password are required':
            toast.error('شماره موبایل و کلمه عبور الزامی است', {
              autoClose: 4000,
            });
            break;
          case 'Invalid phone number or password':
            toast.error('شماره موبایل یا کلمه عبور نادرست است', {
              autoClose: 4000,
            });
            break;
          default:
            toast.error('خطای نامشخص: ' + message, { autoClose: 4000 });
            break;
        }
      })
      .catch(() => {
        toast.error('خطا در سرور ! لطفا با پشتیبانی ارتباط بگیرید');
      });
  };

  return (
    <div
      className="bg-gray-200 min-h-screen flex flex-col items-center justify-center"
      dir="rtl"
    >
      <div className="bg-white px-8 py-12 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">ورود به حساب</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
            شماره تلفن
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="block border border-gray-300 w-full p-3 rounded mb-4"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="شماره تلفن خود را وارد کنید"
          />

          <label htmlFor="password" className="block text-gray-700 mb-2">
            رمز عبور
          </label>
          <div className="relative flex items-center mb-8">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="رمز عبور"
              className="block border border-gray-300 w-full p-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
            {showPassword ? (
              <EyeSlash className="absolute left-2" onClick={togglePassword} />
            ) : (
              <Eye className="absolute left-2" onClick={togglePassword} />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors duration-300"
          >
            ورود
          </button>
        </form>

        <div className="text-gray-600 mt-6 flex gap-1 items-center justify-center">
          حساب کاربری ندارید؟
          <a
            className="no-underline border-blue-600 transition hover:underline text-blue-600 visited:text-blue-600"
            href="../signup/"
          >
            ثبت نام
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;