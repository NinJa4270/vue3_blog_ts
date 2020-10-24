import { LoginForm, RuleFn, RulesObj } from "./types";
import { stripscript, valUsername, valPassword, valCode } from "@/utils/validator.ts";
import { reactive } from 'vue'
export default function useValidator(formData:LoginForm) {
  
  // 自定义表单验证
  /**
   * @bug value无法正确获取  需要手动赋值
   * @example value = formData.user
   */
  let validateUsername: RuleFn = (rule, callback) => {
    let value = formData.user;
    if (value === "") {
      return Promise.reject("用户名不能为空");
    } else {
      if (valUsername(value)) {
        return Promise.reject("用户名格式不正确");
      }
      return Promise.resolve();
    }
  };
  let validatePassword: RuleFn = (rule, callback) => {
    // 过滤特殊字符
    formData.password = stripscript(formData.password as string);
    let value = formData.password;
    if (value === "") {
      return Promise.reject("密码不能为空");
    } else if (valPassword(value)) {
      return Promise.reject("请输入6-20位数字+字母");
    } else {
      return Promise.resolve();
    }
  };
  let validatePassword2: RuleFn = (rule, callback) => {
    formData.password2 = stripscript(formData.password2 as string);
    let value = formData.password2;
    if (value === "") {
      return Promise.reject("密码不能为空");
    } else if (valPassword(value)) {
      return Promise.reject("请输入6-20位数字+字母");
    } else if (value != formData.password) {
      return Promise.reject("两次输入的密码不一致");
    } else {
      return Promise.resolve();
    }
  };

  let validateCode: RuleFn = (rule, callback) => {
    let value = formData.code;
    if (value === "") {
      return Promise.reject("验证码不能为空");
    } else if (valCode(value as string)) {
      return Promise.reject("验证码格式不正确");
    } else {
      return Promise.resolve();
    }
  };
  const loginRules: RulesObj = reactive({
    user: [{ validator: validateUsername, trigger: "change" }],
    password: [{ validator: validatePassword, trigger: "change" }],
  });

  const regRules: RulesObj = reactive({
    user: [{ validator: validateUsername, trigger: "change" }],
    password: [{ validator: validatePassword, trigger: "change" }],
    password2: [{ validator: validatePassword2, trigger: "change" }],
    code: [{ validator: validateCode, trigger: "change" }],
  });

  return { loginRules, regRules }
}
