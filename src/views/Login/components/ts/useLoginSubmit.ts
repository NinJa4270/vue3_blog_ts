import { useForm } from "@ant-design-vue/use";
import { LoginForm, RulesObj } from "@/types/login.ts";
import server from "@/utils/axios";
import { message } from "ant-design-vue";
import { Ref } from "vue";
import { useStore } from "vuex";
import { setStorage } from "@/utils/storage.ts";
import { useRouter } from "vue-router";

export default function useLoginSubmit(
  formData: LoginForm,
  rules: RulesObj,
  checked: Ref<boolean>
) {
  const { resetFields, validate, validateInfos } = useForm(formData, rules);
  const store = useStore();
  const router = useRouter();
  
  const onSubmit = (e: Event) => {
    e.preventDefault();
    validate()
      .then(async () => {
        let res = await server.request({
          url: "/api/login",
          method: "post",
          data: { ...formData },
        });
        if (res.data.code == 1000) {
          message.success("登陆成功");
          if (checked.value) {
            // 储存到localStorage中
            setStorage("userInfo", formData);
          }
          // 储存到vuex
          store.commit("SET_USERINFO", formData);
          store.commit("SET_STATUS", 1);
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


