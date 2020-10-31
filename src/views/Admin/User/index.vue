<!--
* @fileName User
* @author yq
* @date 2020/10/28 17:23:48
!-->
<template>
  <div class="user-wrap">
    <div class="table">
      <div class="add-btn">
        <a-button type="primary" @click="add">添加用户</a-button>
      </div>
      <a-table
        :data-source="userList.list"
        rowKey="id"
        bordered
        :pagination="false"
      >
        <a-table-column key="id" title="id" data-index="id" :width="60" />
        <a-table-column key="user" title="用户名" data-index="user" />
        <a-table-column
          key="create_time"
          title="创建日期"
          data-index="create_time"
          :width="200"
        />
        <a-table-column
          key="update_time"
          title="更新日期"
          data-index="update_time"
          :width="200"
        />
        <a-table-column
          key="role_name"
          title="权限"
          data-index="role_name"
          :width="80"
        />
        <a-table-column key="action" title="操作">
          <template v-slot="{ record }">
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
      <div class="paging">
        <a-pagination
          :total="userList.pagination.total"
          :showTotal="() => `Total ${userList.pagination.total}`"
          show-quick-jumper
          @change="jump"
        />
      </div>
    </div>
    <a-modal
      :title="dialogConfig.title"
      v-model:visible="dialogConfig.visible"
      @ok="submit"
    >
      <a-form>
        <a-form-item label="用户名" required>
          <a-input v-model:value="form.user" />
        </a-form-item>
        <a-form-item label="密码" required>
          <a-input type="password" v-model:value="form.password" />
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
import { defineComponent, reactive, ref } from "vue";
import useGetData from "./ts/useGetData";
import { User } from "./ts/types";
import server from "@/utils/axios";
import api from '@/utils/api'
export default defineComponent({
  name: "User",
  setup() {
    const { userList, getData } = useGetData();

    const dialogConfig = reactive({
      title: "",
      visible: false,
      type: "",
      id: 0,
    });
    const form = reactive({
      user: "",
      password: "",
      role_id: 0,
    });
    const roleSelect = [
      { value: 0, label: "user" },
      { value: 1, label: "admin" },
    ];
    const init = () => {
      dialogConfig.visible = false;
      dialogConfig.title = "";
      dialogConfig.type = "";
      dialogConfig.id = 0;
      form.user = "";
      form.password = "";
      form.role_id = 0;
    };
    const jump = (curr: number) => {
      getData(curr);
    };
    const add = async (item: User) => {
      dialogConfig.visible = true;
      dialogConfig.title = "添加用户";
      dialogConfig.type = "add";
    };
    const edit = async (item: User) => {
      dialogConfig.visible = true;
      dialogConfig.title = "修改用户";
      dialogConfig.type = "edit";
      dialogConfig.id = item.id;
      form.user = item.user;
      form.role_id = item.role_id;
    };
    const remove = async (item: User) => {
      await server.request({
        url: api.deleteUser,
        method: "post",
        data: { id: item.id },
      });
      jump(1);
    };
    const submit = async (type: string) => {
      if (dialogConfig.type === "add") {
        await server.request({
          url: api.addUser,
          method: "post",
          data: { ...form },
        });
      } else if (dialogConfig.type === "edit") {
        if (dialogConfig.id !== 0) {
          await server.request({
            url: api.editUser,
            method: "post",
            data: { id: dialogConfig.id, ...form },
          });
        }
      }
      init()
      jump(1);
    };
    return {
      userList,
      dialogConfig,
      roleSelect,
      form,
      jump,
      add,
      edit,
      remove,
      submit,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
