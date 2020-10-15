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
      <a-form-item label="用户名" has-feedback name="user">
        <a-input
          v-model:value="formData.user"
          placeholder="Username"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="密码" has-feedback name="password">
        <a-input
          v-model:value="formData.password"
          type="password"
          placeholder="Password"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="确认密码" has-feedback name="password2">
        <a-input
          v-model:value="formData.password2"
          type="password"
          placeholder="Password"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="验证码" has-feedback name="code">
        <a-input
          v-model:value="formData.code"
          placeholder="Code"
          autocomplete="off"
        >
        </a-input>
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
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { stripscript, valUsername, valPassword,valCode } from "@/utils/validator.ts";
import { LoginForm, RuleFn, RulesObj } from "@/types/login.ts";

export default defineComponent({
  setup() {
    const formData: LoginForm = reactive({
      user: "",
      password: "",
      password2: "",
      code: "",
    });
    const router = useRouter();
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
      if (value === '') {
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
      if (value === '') {
        return Promise.reject("验证码不能为空");
      } else if (valCode(value as string)) {
        return Promise.reject("验证码格式不正确");
      } else {
        return Promise.resolve();
      }
    }

    const rules = reactive({
      user: [{ validator: validateUsername, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
      password2: [{ validator: validatePassword2, trigger: "change" }],
      code: [{ validator: validateCode, trigger: "change" }],
    });
    const onSubmit = () => {
      router.push("/");
    };
    const resetForm = () => {
      formData.user = ""
      formData.password = ""
      formData.password2 = ""
      formData.code = ""
    }
    return {
      formStyle: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
      formData,
      rules,
      onSubmit,
      resetForm
    };
  },
});
</script>

<style scoped lang="scss">
@import "./register.scss";
</style>
