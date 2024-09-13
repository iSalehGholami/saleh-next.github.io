import { LoginBody, SignupBody } from '@/types/authTypes';
import baseRepository from '../baseRepository';

const authRepository = {
  Signup(body: SignupBody) {
    return baseRepository.post('/signup', body);
  },
  Login(body: LoginBody) {
    return baseRepository.post('/login', body);
  },
};

export default authRepository;
