import { LoginForm, RulesObj } from './types';
import { useForm } from "@ant-design-vue/use";
import server from "@/utils/axios";
import { message } from "ant-design-vue";
import api from '@/utils/api'
export default  function useRegSubmit(formData:LoginForm,rules:RulesObj,emit:any) {
  const { resetFields, validate, validateInfos } = useForm(formData, rules);
  const onSubmit = (e: Event) => {
    e.preventDefault();
    validate()
      .then(async () => {
        let res = await server.request({
          url: api.register,
          method: "post",
          data: { ...formData },
        });
        message.success("注册成功");
        emit("update:activeIndex", 0);
      })
      .catch((err) => {
        message.error("发生异常");
        console.log("error", err);
      });
  };
  const resetForm = () => {
    resetFields();
  };
  return { onSubmit, resetForm, validateInfos };
}

