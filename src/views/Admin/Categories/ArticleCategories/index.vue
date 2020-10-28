<!--
* @fileName ArticleCategories
* @author yq
* @date 2020/10/27 19:45:40
!-->
<template>
  <div class="article-categories-wrap">
    <div class="table">
      <a-table
        :data-source="articlesList.list"
        rowKey="id"
        bordered
        :pagination="false"
      >
        <a-table-column key="id" title="id" data-index="id" :width="200" />
        <a-table-column
          key="name"
          title="分类名"
          data-index="name"
          :width="200"
        />
        <a-table-column key="action" title="操作">
          <template v-slot="{ record }">
            <a-button
              class="btn"
              type="primary"
              size="small"
              @click="add(record)"
            >
              增加分类
            </a-button>
            <a-button
              class="btn"
              type="dashed"
              size="small"
              @click="edit(record)"
            >
              修改
            </a-button>
            <a-button
              class="btn"
              type="danger"
              size="small"
              @click="remove(record)"
            >
              删除
            </a-button>
          </template>
        </a-table-column>
      </a-table>
      <a-pagination
        class="paging"
        :total="articlesList.pagination.total"
        :showTotal="() => `Total ${articlesList.pagination.total}`"
        show-quick-jumper
        @change="jump"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { NavList, NavListArr } from "@/views/Layout/ts/types";
import server from "@/utils/axios";
import { useForm } from "@ant-design-vue/use";
import useGetData from "./ts/useGetData";
export default defineComponent({
  name: "ArticleCategories",
  setup() {
    const { articlesList, getData } = useGetData();
    const jump = (curr: number) => {
      getData(curr);
    };
    return {
      articlesList,
      jump,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
