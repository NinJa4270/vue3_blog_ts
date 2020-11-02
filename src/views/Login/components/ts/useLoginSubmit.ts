import { useForm } from "@ant-design-vue/use";
import { LoginForm, RulesObj } from "./types";
import server from "@/utils/axios";
import { message } from "ant-design-vue";
import { Ref } from "vue";
import { Store, useStore } from "vuex";
import { Router, useRouter } from "vue-router";
import api from '@/utils/api'
export default function useLoginSubmit(
  formData: LoginForm,
  rules: RulesObj,
  checked: Ref<boolean>
) {
  const { resetFields, validate, validateInfos } = useForm(formData, rules);
  const store:Store<any> = useStore();
  const router:Router = useRouter();
  
  const onSubmit = (e: Event) => {
    e.preventDefault();
    validate()
      .then(async () => {
        let res = await server.request({
          url: api.login,
          method: "post",
          data: { ...formData },
        });
        if (res.data.code == 1000) {
          message.success("登陆成功");
          // 储存到vuex
          store.dispatch('SET_USERINFO',res.data.data)
          store.dispatch('SET_TOKEN',res.data.data.token)
          router.push("/main");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const resetForm = () => {
    resetFields();
  };

  return { onSubmit, resetForm, validateInfos };
}


