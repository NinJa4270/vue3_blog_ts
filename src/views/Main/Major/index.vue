<!--
* @fileName index
* @author yq
* @date 2020/10/19 13:56:04
!-->
<template>
  <div class="major-wrap">
    <a-tooltip placement="bottom">
      <template v-slot:title>
        <span>
          模拟 第一篇文章 JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟
          第一篇文章 JavaScript基础 模拟 第一篇文章 JavaScript基础
        </span>
      </template>
      <div class="title">
        模拟 第一篇文章 JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟
        第一篇文章 JavaScript基础 模拟 第一篇文章 JavaScript基础
      </div>
    </a-tooltip>
    <div class="major-info">
      <a-tag color="#c01a20">置顶</a-tag>
      <div class="major-date">
        <CalendarOutlined />
        <span>2020年10月19日</span>
      </div>
      <div class="major-cate">
        <AppstoreOutlined />
        <span>JavaScript基础</span>
      </div>
      <div class="major-view">
        <EyeOutlined />
        <span>94811</span>
      </div>
    </div>
    <a-divider />
    <p class="content">
      内容 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟
      第一篇文章 JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础 模拟 第一篇文章
      JavaScript基础 模拟 第一篇文章 JavaScript基础
    </p>
    <a-divider />
    <div class="all">
      查看全部
      <MoreOutlined />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  CalendarOutlined,
  AppstoreOutlined,
  EyeOutlined,
  MoreOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "Major",
  components: { CalendarOutlined, AppstoreOutlined, EyeOutlined,MoreOutlined },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
