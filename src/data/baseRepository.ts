import axios from 'axios';
import store from '@/store/store';
import { userActions } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const baseRepository = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
  },
  validateStatus(status) {
    return status < 500;
  },
});

baseRepository.interceptors.request.use(
  (config) => {
    let token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('access_token')
        : '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseRepository.interceptors.response.use(
  (response) => {
    if (response.data.message == 'Invalid token.') {
      store.dispatch(userActions.logout());
      toast.info('تاریخ انقضا توکن شما گذشته است !\n لطفا مجددا لاگین کنید');
      redirect('/login');
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseRepository;
