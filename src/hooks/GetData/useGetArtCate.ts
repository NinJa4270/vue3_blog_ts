import { IArtCate, IArtCateItem, Pagination } from "@/types/getData";
import api from "@/utils/api";
import server from "@/utils/axios";
import { formatDate } from "@/utils/utils";
import { onMounted, reactive } from "vue";
interface IuseGetArtCate {
  articlesList: IArtCate;
  getArtCateData: (pageNum:number) => Promise<void>;
}
export default function useGetArtCate(): IuseGetArtCate {
  let articlesList: IArtCate = reactive({ list: [], pagination: {} });
  async function getArtCateData(pageNum: number):Promise<void> {
    let res = await server.request({
      url: api.artList,
      method: "post",
      data: {
        pageNum,
        pageSize: 10,
      },
    });
    let list = res.data.data.list;
    list.map((item: IArtCateItem) => {
      item.create_time = formatDate(item.create_time as string);
      item.update_time = formatDate(item.update_time as string);
      return item;
    });
    (articlesList.list as Array<IArtCateItem>) = res.data.data.list || [];
    (articlesList.pagination as Pagination) = {
      total: res.data.data.total || 0,
      hasNextPage: res.data.data.hasNextPage || false,
      totalPage: res.data.data.totalPage || 0,
    };
  }
  onMounted(() => {
    getArtCateData(1);
  });
  return { articlesList, getArtCateData };
}
