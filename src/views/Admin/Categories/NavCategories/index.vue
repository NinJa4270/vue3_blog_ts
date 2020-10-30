<!--
* @fileName NavCategories
* @author yq
* @date 2020/10/26 19:01:50
!-->
<template>
  <div class="nav-categories-wrap">
    <div class="table">
      <a-table :data-source="navList.list" rowKey="id" bordered>
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
        <a-table-column key="action" title="操作">
          <template v-slot="{ record }">
            <a-button
              class="btn"
              type="primary"
              size="small"
              v-if="record.pid === 0"
              @click="add(record, 1)"
            >
              增加一级分类
            </a-button>
            <a-button class="btn" size="small" @click="add(record, 2)">
              增加二级分类
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
              v-if="record.pid !== 0"
              @click="remove(record)"
            >
              删除
            </a-button>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <a-modal
      :title="dialogConfig.title"
      v-model:visible="dialogConfig.visible"
      @ok="submit"
    >
      <a-form>
        <a-form-item label="导航名称" required>
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="导航级别" required>
          <a-select v-model:value="form.pid">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in pidSelect"
              :key="index"
              disabled
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="导航路由" required>
          <a-input v-model:value="form.path" :disabled="disabled" />
        </a-form-item>
        <a-form-item label="权限等级" required>
          <a-select v-model:value="form.role_id">
            <a-select-option
              :value="item.value"
              v-for="(item, index) in roleSelect"
              :key="index"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from "vue";
import useGetData from "./ts/useGetData";
import { NavList, NavListArr } from "@/views/Layout/ts/types";
import server from "@/utils/axios";
import { useForm } from "@ant-design-vue/use";
export default defineComponent({
  name: "NavCategories",
  setup() {
    let { navList, getNav } = useGetData();
    const dialogConfig = reactive({
      visible: false,
      title: "",
      id: 0,
    });
    const form = reactive({
      name: "",
      pid: 0,
      path: "",
      role_id: 0,
    });
    const rulesRef = reactive({});
    const { resetFields, validate, validateInfos } = useForm(form, rulesRef);
    const disabled = ref(false);
    const pidSelect = reactive([
      { value: 0, label: "一级导航" },
      { value: 1, label: "二级导航" },
    ]);
    const roleSelect = reactive([
      { value: 0, label: "普通权限" },
      { value: 1, label: "Admin权限" },
    ]);
    const add = (item: NavListArr, type: number) => {
      resetFields();
      dialogConfig.title = "增加导航分类";
      dialogConfig.visible = true;
      if (type === 1) {
        form.path = "-";
        disabled.value = true;
      } else if (type === 2) {
        if (item.pid === 0) {
          pidSelect[1].value = item.id;
          form.pid = item.id;
        } else {
          pidSelect[1].value = item.pid;
          form.pid = item.pid;
        }
        disabled.value = false;
      }
    };

    const remove = async (item: NavListArr) => {
      let { data: res } = await server.request({
        url: "/api/deleteNav",
        method: "post",
        data: { id: item.id },
      });
      getNav();
    };

    const edit = (item: NavListArr) => {
      resetFields();
      dialogConfig.title = "修改导航分类";
      dialogConfig.visible = true;
      dialogConfig.id = item.id;
      if (item.pid !== 0) {
        pidSelect[1].value = item.pid;
      }
      form.pid = item.pid;
      form.name = item.name;
      form.path = item.path;
      form.role_id = item.role_id;
    };

    const submit = async () => {
      if (dialogConfig.title === "修改导航分类") {
        let { data: res } = await server.request({
          url: "/api/editNav",
          method: "post",
          data: { id: dialogConfig.id, ...form },
        });
      } else if (dialogConfig.title === "增加导航分类") {
        let { data: res } = await server.request({
          url: "/api/addNav",
          method: "post",
          data: { ...form },
        });
      }
      getNav();
      dialogConfig.visible = false;
    };

    return {
      navList,
      add,
      remove,
      dialogConfig,
      form,
      pidSelect,
      roleSelect,
      submit,
      disabled,
      edit,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
