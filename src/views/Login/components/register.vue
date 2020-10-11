<!--
* @description
* @fileName register
* @directory C:\Users\Administrator\Desktop\blog\src\views\Login\components
* @author yq
* @date 2020/10/11 16:36:50
!-->
<template>
  <div>
    <div>{{ book.title }}</div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { Options, Vue } from "vue-class-component";

export default {
  setup() {
    const book = reactive({ title: "Vue 3 Guide" });

    return {
      book,
    };
  }
}
</script>

<style scoped lang="scss">
</style>
