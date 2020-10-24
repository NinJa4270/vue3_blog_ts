import { LoginForm } from "./types";
import server from "@/utils/axios";
import { ref, Ref } from 'vue';
export default function useCode(formData: LoginForm, btnStatus: any) {
  const timer: Ref = ref(null);

  const getCode = async () => {
    if (!formData.user) {
      return;
    }
    updateStatus({
      loading: true,
      disabled: true,
      text: "发送中",
    });
    let res = await server.request({
      url: "/api/nodemailer",
      method: "post",
      data: { user: formData.user },
    });
    countDown(60);
  };

  const updateStatus = (data: typeof btnStatus) => {
    btnStatus.loading = data.loading;
    btnStatus.disabled = data.disabled;
    btnStatus.text = data.text;
  };
  const countDown = (number: number) => {
    // 预防多次点击 判断定时器是否存在
    if (timer.value) {
      clearCountDown(timer.value);
    }
    timer.value = setInterval(() => {
      number--;
      if (number === 0) {
        // 清除定时器
        clearCountDown(timer);
        // 修改验证码按钮状态
        updateStatus({
          loading: false,
          disabled: false,
          text: "再次获取",
        });
      } else {
        btnStatus.text = `${number}S`;
      }
    }, 1000);
  };
  const clearCountDown = (timer: Ref) => {
    clearInterval(timer.value);
  };

  return { getCode };
}
