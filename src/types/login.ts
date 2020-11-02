// login-register
export interface ILoginForm {
  user: string;
  password: string;
}
export interface IRegisterForm extends ILoginForm {
  password2?: string;
  code?: string;
}
