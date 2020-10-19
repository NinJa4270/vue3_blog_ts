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
        <!-- <Sort class="sort-item" v-model:active="active" label="时间最近" />
        <Sort class="sort-item" abel="点赞最多" />
        <Sort class="sort-item" label="观看最多" />
        <Sort class="sort-item" label="评论最多" /> -->
        <Sort class="sort-item" v-for="item in sortList" :key="item.id" :label="item.label" v-model:active="item.active" />
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
import Sort from "@/components/Sort.vue";
import {
  FolderOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "Articles",
  components: {
    Article,
    Sort,
    FolderOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
  },
  setup() {
    const sortList = reactive([
      {id:'sort0',label:'时间最近',active:0},
      {id:'sort1',label:'点赞最多',active:1},
      {id:'sort2',label:'观看最多',active:1},
      {id:'sort3',label:'评论最多',active:1},
    ])
    return {
      sortList
    };
  },
});
</script>

<style scoped lang="scss">
@import "index.scss";
</style>
