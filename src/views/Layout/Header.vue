<!--
* @description
* @fileName Header
* @directory C:\Users\Administrator\Desktop\vue3.0-type-script-antd\src\components\Layout
* @author yq
* @date 2020/10/18 18:51:49
!-->
<template>
  <div class="header-wrap">
    <div class="logo">
      <img class="logo-img" :src="logo" alt="logo" />
      <div class="logo-text">
        Ninja的博客
      </div>
    </div>
    <div class="info">
      <div class="menu">
        <a-dropdown>
          <span class="menu-item"  @click="(e) => e.preventDefault()">
            Hover me <DownOutlined />
          </span>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">1st menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">2nd menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">3rd menu item</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="login-btns">
        <a-button type="link" size="large" ghost>
          登录
        </a-button>
        <a-button type="link" size="large" ghost>
          注册
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { DownOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: "Header",
  components:{
    DownOutlined
  },
  setup() {
    // 未来根据接口显示
    const logo = ref(require("../../assets/img/logo.jpg"));
    return {
      logo,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>
