import server from "@/utils/axios";
import { User, Pagination, UserList } from "./types";
import { onMounted, reactive } from "vue";
import { formatDate } from "@/utils/utils";
import api from '@/utils/api'
export default function useGetData() {
  let userList: UserList = reactive({ list: [], pagination: {} });

  const getData = async (pageNum: number) => {
    userList.list = [];
    let res = await server.request({
      url: api.userList,
      method: "post",
      data: {
        pageNum,
        pageSize: 10,
      },
    });
    let list = res.data.data.list;
    list.map((item: User) => {
      item.create_time = formatDate(item.create_time);
      item.update_time = formatDate(item.update_time);
      return item;
    });
    (userList.list as User[]).push(...list);
    (userList.pagination as Pagination) = {
      total: res.data.data.total || 0,
      hasNextPage: res.data.data.hasNextPage || false,
      totalPage: res.data.data.totalPage || 0,
    };
  };

  onMounted(() => {
    getData(1);
  });
  return { userList, getData };
}
