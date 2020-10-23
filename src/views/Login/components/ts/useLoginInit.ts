import { LoginForm } from "@/types/login.ts";
import { reactive, ref, onMounted } from "vue";
import { getStorage } from "@/utils/storage.ts";

export default function useLoginInit() {
  const formData: LoginForm = reactive({
    user: "",
    password: "",
  });
  const checked = ref(false);
  onMounted(() => {
    if (getStorage("userInfo")) {
      formData.user = getStorage("userInfo").user;
      formData.password = getStorage("userInfo").password;
    }
  });
  return { formData, checked };
}
