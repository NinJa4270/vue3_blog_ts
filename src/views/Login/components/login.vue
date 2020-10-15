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
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { stripscript, valUsername, valPassword } from "@/utils/validator.ts";
import { useRouter } from "vue-router";
import { setStorage, getStorage } from "@/utils/storage.ts";
import store from "@/store";
import { LoginForm, RuleFn, RulesObj } from "@/types/login.ts";
import { useForm } from '@ant-design-vue/use';

export default defineComponent({
  setup(props, ctx) {
    const router = useRouter();
    const checked = ref(false);
    // 表单数据// 判断是否存在登陆记录
    const formData: LoginForm = reactive(
      {
        user: "",
        password: "",
      }
    );
    // 自定义表单验证
    /**
     * @bug value无法正确获取  需要手动赋值
     * @example value = formData.user
     */
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
    const rules: RulesObj = reactive({
      user: [{ validator: validateUsername, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
    });

    const { resetFields, validate, validateInfos } = useForm(formData, rules);

    const onSubmit = (e:any) => {
        e.preventDefault();
        validate().then(() => {
          if (checked.value) {
          // 储存到localStorage中
            setStorage("userInfo", formData);
          }
          // 储存到vuex
          store.commit("SET_USERINFO", formData);
          router.push("/");
        }).catch(err => {
          console.log('error', err);
        });
    };
    const resetForm = () => {
      resetFields()
    };
    onMounted:{
      if(getStorage("userInfo")){
        formData.user = getStorage("userInfo").user
        formData.password = getStorage("userInfo").password
      }
    }
    return {
      checked,
      // 表单样式
      formStyle: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
      formData,
      rules,
      onSubmit,
      resetForm,
      validateInfos
    };
  },
});
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>
