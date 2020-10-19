<!--
* @description scss
* @fileName index
* @author yq
* @date 2020/10/19 13:05:12
!-->
<template>
  <div class="articles-wrap">
    <div class="title">文章列表</div>
    <div class="info">
      <div class="sort">
        <div class="sort-item">
          <CaretDownOutlined />
            时间最近
          </div>
        <div class="sort-item"><CaretUpOutlined />点赞最多</div>
        <div class="sort-item"><CaretUpOutlined />观看最多</div>
        <div class="sort-item"><CaretUpOutlined />评论最多</div>
      </div>
      <div class="total">
        <FolderOutlined />
        <span>文章总数</span>
        <span>12 篇</span>
      </div>
    </div>
    <a-divider />
    <Article v-for="(n, index) in 10" :key="index" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Article from "./components/Article.vue";
import {
  FolderOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "Articles",
  components: {
    Article,
    FolderOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "index.scss";
</style>
