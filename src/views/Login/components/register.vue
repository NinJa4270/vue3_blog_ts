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
      :rules="regRules"
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
import { defineComponent } from "vue";
import useValidator from "./ts/useValidator";
import useRegSubmit from "./ts/useRegSubmit";
import useCode from "./ts/useCode";
import useRegInit from "./ts/useRegInit";
export default defineComponent({
  name: "Register",
  emits: ["update:activeIndex"],
  props: {
    activeIndex: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const { formData, btnStatus } = useRegInit();
    const { regRules } = useValidator(formData);
    const { onSubmit, resetForm, validateInfos } = useRegSubmit(
      formData,
      regRules,
      emit
    );
    const { getCode } = useCode(formData, btnStatus);

    return {
      formStyle: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
      formData,
      regRules,
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
@import "./Register.scss";
</style>
