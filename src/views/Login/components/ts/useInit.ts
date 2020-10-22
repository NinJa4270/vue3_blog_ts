import { LoginForm, RulesObj } from "@/types/login.ts";
import { reactive, ref } from "vue";
import { getStorage } from "@/utils/storage.ts";
function useInit() {
  const formData: LoginForm = reactive({
    user: "",
    password: "",
  });
  const checked = ref(false);
  onMounted: {
    if (getStorage("userInfo")) {
      formData.user = getStorage("userInfo").user;
      formData.password = getStorage("userInfo").password;
    }
  }
  return { formData, checked };
}
export default useInit;
