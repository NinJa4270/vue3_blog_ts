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
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="用户名">
        <a-input v-model:value="formData.user" placeholder="Username">
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
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
import { defineComponent, reactive } from "vue";
interface loginForm {
  user?: string;
  password?: string;
}
export default defineComponent({
  setup() {
    const labelCol = { span: 6 }
    const wrapperCol = { span: 16 }
    const formData = reactive<loginForm>({
      user: "",
      password: "",
    });
    return {
      labelCol,
      wrapperCol,
      formData,
    };
  },
});
</script>

<style scoped lang="scss">
@import './login.scss';
</style>
