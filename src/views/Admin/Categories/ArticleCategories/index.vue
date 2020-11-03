<!--
* @fileName ArticleCategories
* @author yq
* @date 2020/10/27 19:45:40
!-->
<template>
  <div class="article-categories-wrap">
    <div class="addBtn">
      <a-input
        class="ipt"
        v-model:value="newValue"
        placeholder="输入分类"
      />
      <a-button type="primary" :disabled="disabled" @click="add"
        >添加分类</a-button
      >
    </div>
    <div class="table">
      <a-table
        :data-source="articlesList.list"
        rowKey="id"
        bordered
        :pagination="false"
      >
        <a-table-column key="id" title="id" data-index="id" :width="80" />
        <a-table-column key="name" title="分类名" :width="200">
          <template v-slot="{ record }">
            <div class="editable-cell" :key="record.id">
              <div v-if="record.editable" class="editable-cell-input-wrapper">
                <a-input
                  v-model:value="record.name"
                  @pressEnter="check(record)"
                />
                <check-outlined
                  class="editable-cell-icon-check"
                  @click="check(record)"
                />
              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ record.name || " " }}
                <edit-outlined
                  class="editable-cell-icon"
                  @click="edit(record)"
                />
              </div>
            </div>
          </template>
        </a-table-column>
        <a-table-column key="create_time" title="添加时间" data-index="create_time" />
        <a-table-column key="update_time" title="更新时间" data-index="update_time" />
        <a-table-column key="action" title="操作" :width="200">
          <template v-slot="{ record }">
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
      <div class="paging">
        <a-pagination
          :total="articlesList.pagination.total"
          :showTotal="() => `Total ${articlesList.pagination.total}`"
          show-quick-jumper
          @change="jump"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch, watchEffect } from "vue";
import server from "@/utils/axios";
import { useForm } from "@ant-design-vue/use";
import { IArtCateItem } from "@/types/getData";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import useGetArtCate from '@/hooks/GetData/useGetArtCate'
import api from '@/utils/api'
export default defineComponent({
  name: "ArticleCategories",
  components: {
    CheckOutlined,
    EditOutlined,
  },
  setup() {
    const { articlesList, getArtCateData  } = useGetArtCate()
    const addData = reactive({
      newValue: "",
      disabled: true,
    });
    watch(()=>{
      return addData.newValue
      },()=>{
      if(addData.newValue){
        addData.disabled = false
      }
    })
    const add = async () => {
      await server.request({
        url: api.addArt,
        method: "post",
        data: {
          name: addData.newValue,
        },
      });
      jump(1)
    };
    const jump = (curr: number) => {
      getArtCateData(curr);
    };
    const edit = (record: IArtCateItem) => {
      record.editable = true;
    };
    const check = async (record: IArtCateItem) => {
      record.editable = false;
      await server.request({
        url: "/api/editArt",
        method: "post",
        data: {
          id: record.id,
          name: record.name,
        },
      });
      jump(1);
    };
    const remove = async (record: IArtCateItem) => {
      await server.request({
        url: api.deleteArt,
        method: "post",
        data: {
          id: record.id,
        },
      });
      jump(1);
    };

    return {
      articlesList,
      jump,
      edit,
      check,
      remove,
      ...toRefs(addData),
      add,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
