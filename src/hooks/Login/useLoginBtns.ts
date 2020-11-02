import { Ref } from "vue";
import { Router, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import api from "@/utils/api";
import server from "@/utils/axios";
import { message } from "ant-design-vue";
import { ILoginForm } from "@/types/login";
interface IUseLoginBtns {
  submit: (formData: ILoginForm) => void;
  reset: () => void;
}

export default function useLoginBtns(ruleForm: Ref): IUseLoginBtns {
  const store: Store<any> = useStore();
  const router: Router = useRouter();

  function submit(formData: ILoginForm): void {
    ruleForm.value
      .validate()
      .then(async () => {
        let res = await server.request({
          url: api.login,
          method: "post",
          data: { ...formData },
        });
        if (res.data.code == 1000) {
          message.success("登陆成功");
          // 储存到vuex
          store.dispatch("SET_USERINFO", res.data.data);
          store.dispatch("SET_TOKEN", res.data.data.token);
          router.push("/main");
        }
      })
      .catch((err: Error) => {
        console.log("error", err);
      });
  }
  const reset = () => {
    (ruleForm as Ref).value.resetFields();
  };
  return { submit, reset };
}
