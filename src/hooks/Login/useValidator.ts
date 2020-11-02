import {
  stripscript,
  valUsername,
  valPassword,
  valCode,
} from "@/utils/validator.ts";
interface IUseValidator {
  validateUsername: (_rule: [], value: string) => Promise<void>;
  validatePassword: (_rule: [], value: string) => Promise<void>;
}

export default function useValidator(): IUseValidator {
  async function validateUsername(_rule: [], value: string): Promise<void> {
    if (value === "") {
      return Promise.reject("用户名不能为空");
    } else {
      if (valUsername(value)) {
        return Promise.reject("用户名格式不正确");
      }
      return Promise.resolve();
    }
  }
  async function validatePassword(_rule: [], value: string): Promise<void> {
    value = stripscript(value);
    if (value === "") {
      return Promise.reject("密码不能为空");
    } else if (valPassword(value)) {
      return Promise.reject("请输入6-20位数字+字母");
    } else {
      return Promise.resolve();
    }
  }

  return { validateUsername, validatePassword };
}
