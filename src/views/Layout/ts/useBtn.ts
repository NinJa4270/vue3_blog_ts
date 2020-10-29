import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

export default function useBtn() {
  const router = useRouter();
  const store = useStore();
  const login = () => {
    router.push("./login");
  };
  const logout = () => {
    message.success("登出成功");
    store.commit("SET_USERINFO", { user: "", password: "" });
    // 调用登出接口
    router.push("./main");
  };
  const goCenter = () => {
    router.push("./center");
  };
  return { login, logout, goCenter, store}
}
