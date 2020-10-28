<!--
* @fileName User
* @author yq
* @date 2020/10/28 17:23:48
!-->
<template>
  <div class="user-wrap">
    <div class="table">
      <a-table
        :data-source="userList.list"
        rowKey="id"
        bordered
        :pagination="false"
      >
        <a-table-column key="id" title="id" data-index="id" :width="200" />
      </a-table>
      <div class="paging">
        <a-pagination
          :total="userList.pagination.total"
          :showTotal="() => `Total ${userList.pagination.total}`"
          show-quick-jumper
          @change="jump"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import useGetData from "./ts/useGetData";
export default defineComponent({
  name: "User",
  setup() {
    const { userList, getData } = useGetData();
    return {
      userList
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
