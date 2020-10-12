<!--
* @description
* @fileName login
* @directory C:\Users\Administrator\Desktop\blog\src\views\Login\components
* @author yq
* @date 2020/10/11 16:39:25
!-->
<template>
  <div class="login-component">
    <a-form class="form" 
    :label-col="formStyle.labelCol" 
    :wrapper-col="formStyle.wrapperCol"
    :rules="rules"
    >
      <a-form-item label="用户名" has-feedback name="user">
        <a-input v-model:value="formData.user" placeholder="Username" autocomplete="off">
        </a-input>
      </a-form-item>
      <a-form-item label="密码" has-feedback name="password">
        <a-input v-model:value="formData.password" type="password" placeholder="Password" autocomplete="off">
        </a-input>
      </a-form-item>
    </a-form>
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
  (rule: [], value: any, callback: () => any): any;
}
interface rulesObj {
  user:any[],
  password:any[]
}
export default defineComponent({
  setup() {
    // 表单数据
    const formData:loginForm = reactive({
      user: "",
      password: "",
    });
    // 自定义表单验证 
    /**
     * @bug value无法正确获取  需要手动赋值
     * @example value = formData.user
     */
    let validateUsername:ruleFn = (rule, value, callback) => {
      value = formData.user
      if (value === '') {
        return Promise.reject('用户名不能为空')
      } else {
        if (valUsername(value)) {
          return Promise.reject('用户名格式不正确')
        }
        return Promise.resolve();
      }
    }
    let validatePassword:ruleFn = (rule, value, callback) => {
      // 过滤特殊字符
      formData.password = stripscript(formData.password)
      value = formData.password
      if (value === '') {
        return Promise.reject('密码不能为空')
      } else if (valPassword(value)) {
        return Promise.reject('请输入6-20位数字+字母')
      } else {
        return Promise.resolve();
      }
    }
    const rules:rulesObj = reactive({
      user: [{ validator: validateUsername, trigger: 'change' }],
      password: [{ validator: validatePassword, trigger: 'change' }],
    });
    return {
      // 表单样式
      formStyle:{
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      },
      formData,
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>
