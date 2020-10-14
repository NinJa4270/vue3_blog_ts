<!--
* @description 登录模块
* @fileName index
* @directory C:\Users\Administrator\Desktop\blog\src\views\login
* @author yq
* @date 2020/10/11 16:29:46
!-->
<template>
  <div class="wrap center">
    <div class="form-wrap">
      <div class="form-box">
        <div class="form-box-left">
          占位
        </div>
        <div class="form-box-right">
          <Tabs />
          <login class="login" />
          <!-- <register class="register" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import login from "./components/login.vue";
import register from "./components/register.vue";
import Tabs from '@/components/Tabs.vue';
@Options({
  components: {
    login,
    register,
    Tabs
  },
})
export default class Login extends Vue {
  setup() {
    const changeTab = (key:string)=>{
      console.log(key)
    }
    return {
      changeTab
    };
  }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
