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
      <Menu class="menu" :list="list" />
      <div class="login-btns" v-if="store.state.status !== 1">
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
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { LogoutOutlined } from "@ant-design/icons-vue";
import Menu from "@/components/Menu.vue";

export default defineComponent({
  name: "Header",
  components: {
    Menu,
    LogoutOutlined,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    // 未来根据接口显示
    const logo = ref(require("../../assets/img/logo.jpg"));
    const login = () => {
      router.push("./login");
    };
    const logout = () => {
      message.success("登出成功");
      store.commit("SET_USERINFO", { user: "", password: "" });
      store.commit("SET_STATUS", 0);
      // 调用登出接口
      router.push("./main");
    };
    const goCenter = () => {
      router.push("./center");
    };
    return {
      list: [
        {
          id: "menu1",
          label: "首页",
          path:'/main'
        },
        {
          id: "menu2",
          label: "文章列表",
          path:'/list'
        },
        {
          id: "menu3",
          label: "个人中心",
          path:'/center'
        },
      ],
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
