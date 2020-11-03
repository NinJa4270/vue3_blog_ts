import { IUsers, IUsersItem, Pagination } from "@/types/getData";
import api from "@/utils/api";
import server from "@/utils/axios";
import { formatDate } from "@/utils/utils";
import { onMounted, reactive } from "vue";

export default function useGetUsers() {
  let users: IUsers = reactive({ list: [], pagination: {} });
  
  async function getUsersData(pageNum: number) {
    let res = await server.request({
      url: api.userList,
      method: "post",
      data: {
        pageNum,
        pageSize: 10,
      },
    });
    let list = res.data.data.list;
    list.map((item: IUsersItem) => {
      item.create_time = formatDate(item.create_time);
      item.update_time = formatDate(item.update_time);
      return item;
    });
    (users.list as Array<IUsersItem>) = list;
    (users.pagination as Pagination) = {
      total: res.data.data.total || 0,
      hasNextPage: res.data.data.hasNextPage || false,
      totalPage: res.data.data.totalPage || 0,
    };
  }

  onMounted(() => {
    getUsersData(1);
  });
  return { users, getUsersData };
}
