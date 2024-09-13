'use client';
import store from '@/store/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

interface providerProps {
  children: ReactNode;
}

const MainProvider: React.FC<providerProps> = (props) => {
  return (
    <Provider store={store}>
      {props.children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
};

export default MainProvider;
