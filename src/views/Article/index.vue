<!--
* @fileName Article
* @author yq
* @date 2020/10/20 15:34:33
!-->
<template>
  <div>文章{{ id }}</div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Article",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.query.id || '';   
    const processingError = () => {
      if (!id) {
        message.error("数据出错");
        router.go(-1);
        return;
      }
    };
    processingError()
    // 请求接口 获取文章信息
    return {
      id,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
