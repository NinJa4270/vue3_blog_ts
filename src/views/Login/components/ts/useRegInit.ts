import { reactive } from 'vue'
import { LoginForm } from './types'
// import { LoginForm, RuleFn, RulesObj } from "@/types/login.ts";
export default function useRegInit (){
  const formData: LoginForm = reactive({
    user: "",
    password: "",
    password2: "",
    code: "",
  });
  const btnStatus = reactive({
    loading: false,
    disabled: false,
    text: "验证码",
  });
  return { formData, btnStatus }
}