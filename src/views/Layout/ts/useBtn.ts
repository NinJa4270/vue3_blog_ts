import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

export default function useBtn(getNav:Function) {
  const router = useRouter();
  const store = useStore();
  const login = () => {
    router.push("./login");
  };
  const logout = () => {
    message.success("登出成功");
    store.dispatch('SET_USERINFO')
    // 调用登出接口
    getNav()
    router.push("./main");
  };
  const goCenter = () => {
    router.push("./center");
  };
  return { login, logout, goCenter, store}
}
