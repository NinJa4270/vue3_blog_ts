export interface LoginForm {
  user?: string;
  password?: string;
  password2?: string;
  code?:string;
}
export interface RuleFn {
  (rule: [], callback: () => Promise<void>): Promise<void>;
}
export interface RulesObj {
  user: any[];
  password: any[];
}
