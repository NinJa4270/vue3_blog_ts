import server from "@/utils/axios";
import { User, UserArr, Pagination } from "./types";
import { onMounted, reactive } from "vue";
export default function useGetData(){
  let userList: User = reactive({ list: [], pagination: {} });

  const getData = async (pageNum: number) => {
    userList.list = [];
    let res = await server.request({
      url: "/api/users",
      method: "post",
      data: {
        pageNum,
        pageSize: 10,
      },
    });
    (userList.list as UserArr[]).push(...res.data.data.list);
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

