export interface SignupBody {
  name: string;
  family: string;
  phoneNumber: string;
  nationalCode: string;
  emailAddress: string;
  password: string;
  passwordConfirm: string;
  rules: boolean;
}
export interface LoginBody {
  phoneNumber: string;
  password: string;
}
