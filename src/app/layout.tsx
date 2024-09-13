import { ReactNode } from 'react';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import favicon from '../../public/favicon.ico';

const MainProvider = dynamic(() => import('../providers/index'), {
  ssr: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(`http://localhost:3000`),
  title: {
    template: '%s | اسمارت وست',
    default: ` اسمارت وست`,
  },
  icons: {
    icon: favicon.src,
  },
  description:
    'اسمارت وست، پلتفرمی امن برای خرید‌، فروش و سرمایه گذاری در املاک است',
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <MainProvider children={children} />
      </body>
    </html>
  );
}
