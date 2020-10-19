<!--
* @fileName index
* @author yq
* @date 2020/10/19 17:00:28
!-->
<template>
  <div class="list-wrap">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <home-outlined />
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          文章列表
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="listData"
    >
      <template v-slot:renderItem="{ item }">
        <a-list-item key="item.title">
          <template v-slot:actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component v-bind:is="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <template v-slot:extra>
            <img
              width="272"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta>
            <template v-slot:title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "list",
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
    HomeOutlined
  },
  setup() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: "https://www.antdv.com/",
        title: `ant design vue part ${i}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      });
    }
    return {
      listData,
      pagination: {
        onChange: () => {},
        pageSize: 3,
      },
      actions: [
        { type: "StarOutlined", text: "156" },
        { type: "LikeOutlined", text: "156" },
        { type: "MessageOutlined", text: "2" },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
