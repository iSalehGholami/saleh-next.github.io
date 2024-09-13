'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, LogoutCurve } from 'iconsax-react';
import { toast } from 'react-toastify';
import usersRepository from '@/data/repository/usersRepository';
import BaseListTile from '@/components/base/BaseListTile';
import { ClipLoader } from 'react-spinners';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@/store/userSlice';

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);

  const [UsersList, setUsersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('access_token')
      : '';

  const handleLogout = () => {
    dispatch(userActions.logout());
    toast.error('با موفقیت از حساب خود خارج شدید');
    router.push('/login');
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await usersRepository.getUsers();
      setUsersList(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      // Only fetch users if the UsersList is empty
      if (UsersList.length === 0) {
        fetchUsers();
      }
    }
  }, [token, UsersList]);

  const GuestView = () => {
    return (
      <div className="text-center">
        <h1 className="text-3xl text-primary">سلام !</h1>
        <p className="my-4 text-gray-600">
          به وب سرویس آزمایشی اسمارت وست خوش آمدید
          <br />
          برای ادامه لطفا وارد شوید
        </p>
        <div className="flex space-x-4 justify-center gap-1">
          <button
            onClick={handleLoginClick}
            className="py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none transition-colors duration-300"
          >
            ورود
          </button>
          <button
            onClick={handleSignupClick}
            className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors duration-300"
          >
            ثبت نام
          </button>
        </div>
      </div>
    );
  };

  const UserView = () => {
    return (
      <div className="bg-box-bg p-8 rounded-md shadow-custom-light text-center">
        <MessageCircle className="text-primary w-16 h-16 mx-auto" />
        <h1 className="text-2xl text-primary mt-4">
          {state.user.emailAddress}
        </h1>
        <p className="mt-4">به پنل کاربری خود خوش آمدید.</p>

        <button
          onClick={handleLogout}
          className="mt-6 py-2 px-4 flex items-center justify-center mx-auto gap-2 bg-logout-red text-white rounded-md hover:bg-red-600 transition-all"
        >
          خروج
          <LogoutCurve className="" />
        </button>

        <div className="my-4 bg-body-bg p-4">
          {isLoading ? (
            <div className="flex items-center text-lg font-medium text-center gap-1">
              <ClipLoader
                color={'#0097e6'}
                loading={isLoading}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              در حال لود لیست کاربران
            </div>
          ) : UsersList.length > 0 ? (
            <div className="text-2xl font-extrabold text-center mb-4">
              لیست کاربران
            </div>
          ) : (
            <div className="text-xl font-bold text-center">
              کاربری وجود ندارد !
            </div>
          )}
          {UsersList.length > 0 &&
            UsersList.map((item, index) => (
              <BaseListTile
                key={index}
                firstName={item['name']}
                lastName={item['family']}
                phoneNumber={item['phoneNumber']}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-body-bg flex items-center justify-center my-8">
      {token ? <UserView /> : <GuestView />}
    </div>
  );
};

export default Home;
