import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { ArtCategories, ArtCategoryArr, Pagination } from "./types";
export default function useGetData() {
  let articlesList: ArtCategories = reactive({ list: [], pagination: {} });
  const getData = async (pageNum: number) => {
    articlesList.list = [];
    let res = await server.request({
      url: "/api/articleCategories",
      method: "post",
      data: {
        pageNum,
        pageSize: 10,
      },
    });
    (articlesList.list as ArtCategoryArr[]).push(...res.data.data.list);
    (articlesList.pagination as Pagination) = {
      total: res.data.data.total || 0,
      hasNextPage: res.data.data.hasNextPage || false,
      totalPage: res.data.data.totalPage || 0,
    };
  };
  onMounted(() => {
    getData(1);
  });
  return { articlesList, getData };
}
