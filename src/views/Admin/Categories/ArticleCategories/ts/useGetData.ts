import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { ArtCategories, ArtCategoryArr, Pagination } from "./types";
import { formatDate } from '@/utils/utils'
export default function useGetData() {
  let articlesList: ArtCategories = reactive({ list: [], pagination: {} });
  const getData = async (pageNum: number) => {
    articlesList.list = [];
    let res = await server.request({
      url: "/api/artList",
      method: "post",
      data: {
        pageNum,
        pageSize: 10,
      },
    });
    let list = res.data.data.list
    list.map((item:ArtCategoryArr)=>{
      item.create_time = formatDate((item.create_time as string))
      item.update_time = formatDate((item.update_time as string))
      return item
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
