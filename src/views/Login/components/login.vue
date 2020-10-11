<!--
* @description
* @fileName login
* @directory C:\Users\Administrator\Desktop\blog\src\views\Login\components
* @author yq
* @date 2020/10/11 16:39:25
!-->
<template>
  <div class="login-component">
    <a-form
      class="form"
      ref="formData"
      :model="formData"
      :rules="rules"
      :label-col="formStyle.labelCol"
      :wrapper-col="formStyle.wrapperCol"
    >
      <a-form-item required has-feedback label="用户名" name="user">
        <a-input v-model:value="formData.user" placeholder="Username" autocomplete="off">
        </a-input>
      </a-form-item>
      <a-form-item required has-feedback label="密码" name="password" autocomplete="off">
        <a-input
          v-model:value="formData.password"
          type="password"
          placeholder="Password"
        >
        </a-input>
      </a-form-item>
    </a-form>
    <button @change="changeV"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, watchEffect } from "vue";
import { stripscript, valUsername, valPassword } from "@/utils/validator.ts";
interface loginForm {
  user: string | undefined;
  password: string | undefined;
}
interface ruleFn {
  (rule: object, value: string, callback: () => any): any;
}
export default defineComponent({
  setup() {
    // 表单样式
    const formStyle = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    // 表单数据
    const formData:loginForm = reactive({
      user: "17398081021@163.com",
      password: "",
    });
    // 表单验证
    // 自定义验证规则
    let validateUser: ruleFn = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject("用户名不能为空");
      } else {
        if (valUsername(value)) {
          return Promise.reject("用户名格式不正确");
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePassword: ruleFn = async (rule, value, callback) => {
      formData.password = stripscript(value);
      value = formData.password;
      if (!value) {
        return Promise.reject("密码不能为空");
      } else if (valPassword(value)) {
        return Promise.reject("请输入6-20位数字+字母");
      } else {
        return Promise.resolve();
      }
    };
    const rules = reactive({
      userRule: [{ validator: validateUser, trigger: "change" }],
      passwordRule: [{ validator: validatePassword, trigger: "change" }],
    });
    watchEffect(()=>console.log(formData.user))
    return {
      formStyle,
      formData,
      rules
    };
  },
});
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>
