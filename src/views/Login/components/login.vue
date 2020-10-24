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
      :label-col="formStyle.labelCol"
      :wrapper-col="formStyle.wrapperCol"
      :rules="loginRules"
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
      <a-form-item :wrapper-col="{ offset: 5, span: 18 }">
        <div style="display:flex;justify-content: space-between;">
          <a-checkbox v-model:checked="checked">
            记住密码
          </a-checkbox>
          <a>
            忘记密码
          </a>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 5, span: 18 }">
        <div style="display:flex;justify-content: space-between;">
          <a-button type="primary" @click="onSubmit">
            登 陆
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
import { defineComponent } from "vue";
import useValidator from "./ts/useValidator";
import useLoginSubmit from "./ts/useLoginSubmit";
import useLoginInit from './ts/useLoginInit'
export default defineComponent({
  name: "Login",
  setup(props, ctx) {
    const { formData,checked } = useLoginInit()
    const { loginRules } = useValidator(formData);
    const { onSubmit, resetForm, validateInfos } = useLoginSubmit(formData,loginRules,checked); 
    console.log(validateInfos)
    return {
      checked,
      // 表单样式
      formStyle: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
      formData,
      loginRules,
      onSubmit,
      resetForm,
      validateInfos,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./Login.scss";
</style>
