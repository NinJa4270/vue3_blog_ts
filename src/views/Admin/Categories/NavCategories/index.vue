<!--
* @fileName NavCategories
* @author yq
* @date 2020/10/26 19:01:50
!-->
<template>
  <div class="nav-categories-wrap">
    <div class="table">
      <a-table :data-source="navList" rowKey="id" bordered>
        <a-table-column key="id" title="id" data-index="id" :width="200" />
        <a-table-column
          key="name"
          title="分类名"
          data-index="name"
          :width="200"
        />
        <a-table-column
          key="path"
          title="路由"
          data-index="path"
          :width="200"
        />
        <a-table-column key="action" title="Action">
          <template v-slot="{ record }">
            <a-button
              class="btn"
              type="primary"
              size="small"
              v-if="record.pid === 0"
              @click="add(record)"
            >
              增加
            </a-button>
            <a-button
              class="btn"
              type="danger"
              size="small"
              v-if="record.pid !== 0"
              @click="remove(record)"
            >
              删除
            </a-button>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import useGetData from "./ts/useGetData";
import { NavList } from "@/views/Layout/ts/types";
import server from "@/utils/axios";
export default defineComponent({
  name: "NavCategories",
  setup() {
    let { navList, getNav } = useGetData();

    const add = async (item: NavList) => {
      let { data:res } = await server.request({
        url: "/api/addNav",
        method: "post",
        data: { id: item.id },
      });
      console.log(res);
    };

    const remove = async (item: NavList) => {
      let { data:res } = await server.request({
        url: "/api/deleteNav",
        method: "post",
        data: { id: item.id },
      });
    };

    const edit = (item: NavList) => {};

    return {
      navList,
      add,
      remove,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
