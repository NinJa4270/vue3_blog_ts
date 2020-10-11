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
    >
      <a-form-item
        label="用户名"
        v-bind="validateInfos.user"
      >
        <a-input
          v-model:value="formData.user"
          placeholder="Username"
          autocomplete="off"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        v-bind="validateInfos.password"
        autocomplete="off"
      >
        <a-input
          v-model:value="formData.password"
          type="password"
          placeholder="Password"
        >
        </a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, watchEffect } from "vue";
import { stripscript, valUsername, valPassword } from "@/utils/validator.ts";
import { useForm } from "@ant-design-vue/use";
interface loginForm {
  user: string | undefined;
  password: string | undefined;
}
interface ruleFn {
  (rule: object, value: string, callback: () => any): any;
}
export default defineComponent({
  setup(props, ctx) {
    // 表单样式
    const formStyle = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    // 表单数据
    const formData = reactive({
      user: "",
      password: "",
    });
    const rules = reactive({
      user: [
        {
          required: true,
          message: "Please input name",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input name",
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(formData, rules);
    return {
      validateInfos,
      formStyle,
      formData,
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>
