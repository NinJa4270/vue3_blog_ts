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
      <Menu
        v-for="nav in navList.list"
        :key="nav.id"
        class="menu"
        :title="nav.name"
        :list="nav.children"
      />
      <div class="login-btns" v-if="!store.state.userInfo.user">
        <a-button type="link" size="large" ghost @click="login">
          登录
        </a-button>
      </div>
      <div class="user-info" v-else>
        <a-popover class="user-box">
          <template v-slot:content>
            <span @click="goCenter" style="cursor: pointer;">个人中心</span>
          </template>
          <img
            class="avatar"
            src="../../assets/img/avatar.png"
            alt="用户头像"
            srcset=""
          />
          <div class="user-name">
            {{ store.state.userInfo.user }}
          </div>
        </a-popover>
        <LogoutOutlined :style="{ fontSize: '30px' }" @click="logout" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { LogoutOutlined } from "@ant-design/icons-vue";
import useNav from "./ts/useNav";
import useBtn from "./ts/useBtn";
import Menu from "@/components/Menu.vue";

export default defineComponent({
  name: "Header",
  components: {
    Menu,
    LogoutOutlined,
  },
  setup() {
    const { navList } = useNav();
    const { login, logout, goCenter, store } = useBtn();
    const logo = ref(require("../../assets/img/logo.jpg"));
    return {
      navList,
      store,
      logo,
      login,
      logout,
      goCenter,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>
