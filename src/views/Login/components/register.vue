<!--
* @description
* @fileName register
* @directory C:\Users\Administrator\Desktop\blog\src\views\Login\components
* @author yq
* @date 2020/10/11 16:36:50
!-->
<template>
  <div class="register-component">
    <a-form
      class="form"
      :label-col="formStyle.labelCol"
      :wrapper-col="formStyle.wrapperCol"
      :rules="rules"
    >
      <a-form-item label="用户名" has-feedback v-bind="validateInfos.user">
        <a-input
          v-model:value="formData.user"
          placeholder="Username"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="密码" has-feedback v-bind="validateInfos.password">
        <a-input
          v-model:value="formData.password"
          type="password"
          placeholder="Password"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="确认密码"
        has-feedback
        v-bind="validateInfos.password2"
      >
        <a-input
          v-model:value="formData.password2"
          type="password"
          placeholder="Password"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="验证码" v-bind="validateInfos.code">
        <div class="code">
          <a-input
            class="code-content"
            :maxlength="6"
            v-model:value="formData.code"
            placeholder="Code"
            autocomplete="off"
          >
          </a-input>
          <a-button
            type="danger"
            class="code-btn"
            :loading="btnStatus.loading"
            :disabled="btnStatus.disabled"
            @click="getCode"
          >
            {{ btnStatus.text }}
          </a-button>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 5, span: 18 }">
        <div style="display:flex;justify-content: space-between;">
          <a-button type="primary" @click="onSubmit">
            注 册
          </a-button>
          <a-button @click="resetForm">
            重 置
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import {
  stripscript,
  valUsername,
  valPassword,
  valCode,
} from "@/utils/validator.ts";
import { LoginForm, RuleFn, RulesObj } from "@/types/login.ts";
import { useForm } from "@ant-design-vue/use";
import server from '@/utils/axios'

export default defineComponent({
  setup() {
    const formData: LoginForm = reactive({
      user: "17398081021@163.com",
      password: "12345678yq",
      password2: "12345678yq",
      code: "123456",
    });
    const router = useRouter();
    const btnStatus = reactive({
      loading: false,
      disabled: false,
      text: "验证码",
    });
    let validateUsername: RuleFn = (rule, callback) => {
      let value = formData.user;
      if (value === "") {
        return Promise.reject("用户名不能为空");
      } else {
        if (valUsername(value)) {
          return Promise.reject("用户名格式不正确");
        }
        return Promise.resolve();
      }
    };
    let validatePassword: RuleFn = (rule, callback) => {
      // 过滤特殊字符
      formData.password = stripscript(formData.password as string);
      let value = formData.password;
      if (value === "") {
        return Promise.reject("密码不能为空");
      } else if (valPassword(value)) {
        return Promise.reject("请输入6-20位数字+字母");
      } else {
        return Promise.resolve();
      }
    };

    let validatePassword2: RuleFn = (rule, callback) => {
      formData.password2 = stripscript(formData.password2 as string);
      let value = formData.password2;
      if (value === "") {
        return Promise.reject("密码不能为空");
      } else if (valPassword(value)) {
        return Promise.reject("请输入6-20位数字+字母");
      } else if (value != formData.password) {
        return Promise.reject("两次输入的密码不一致");
      } else {
        return Promise.resolve();
      }
    };

    let validateCode: RuleFn = (rule, callback) => {
      let value = formData.code;
      if (value === "") {
        return Promise.reject("验证码不能为空");
      } else if (valCode(value as string)) {
        return Promise.reject("验证码格式不正确");
      } else {
        return Promise.resolve();
      }
    };

    const rules = reactive({
      user: [{ validator: validateUsername, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
      password2: [{ validator: validatePassword2, trigger: "change" }],
      code: [{ validator: validateCode, trigger: "change" }],
    });
    const { resetFields, validate, validateInfos } = useForm(formData, rules);

    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then(async() => {
          let res = await server.request({url:'/api/register',method: 'post',data:{...formData}})
          console.log(res)
          router.push("/");
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    const resetForm = () => {
      resetFields();
    };

    const getCode = () => {
      updateStatus({
        loading: true,
        disabled: true,
        text: "发送中",
      });
      countDown(60);
    };
    const updateStatus = (data: typeof btnStatus) => {
      btnStatus.loading = data.loading;
      btnStatus.disabled = data.disabled;
      btnStatus.text = data.text;
    };
    const timer: Ref = ref(null);
    // 验证码倒计时
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
    // 清除定时器
    const clearCountDown = (timer:Ref) => {
      clearInterval(timer.value);
    };
    return {
      formStyle: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
      formData,
      rules,
      btnStatus,
      onSubmit,
      resetForm,
      getCode,
      validateInfos,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./register.scss";
</style>
