import { onMounted, reactive } from "vue";
import server from "@/utils/axios";
import { Categories } from "./types";
import api from '@/utils/api'
export default function useGetCates() {
  const categories: Categories = reactive({
    list: [],
    pagination: {},
  });
  const getCates = async (pageNum: number) => {
    let res = await server.request({
      url: api.artList,
      method: "post",
      data: {
        pageNum,
        pageSize: 999,
      },
    });
    let list = res.data.data.list;
    categories.list.push(...list);
    categories.pagination.total = res.data.data.total;
    categories.pagination.hasNextPage = res.data.data.hasNextPage;
    categories.pagination.totalPage = res.data.data.totalPage;
  };
  onMounted(() => {
    getCates(1);
  });
  return { categories };
}
