import LoginForm from '@/components/base/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ورود',
};

export default function Login() {
  return <LoginForm />;
}
