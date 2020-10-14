<template>
  <div class="home">
    <a-button type="primary" @click="login"> 登录跳转 </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const login = function() {
      router.push("/login");
    };
    return {
      login,
    };
  }
})
</script>
