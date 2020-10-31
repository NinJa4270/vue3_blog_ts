import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { ArticleList,Article,Tag } from "./types";
import { formatDate } from '@/utils/utils'
import api from '@/utils/api'
export default function useGetData() {
  let articleList: ArticleList = reactive({ list: [], pagination: {} });
  const getData = async (pageNum: number) => {
    articleList.list = []
    let res = await server.request({
      url: api.articleList,
      method: "post",
      data: {
        pageNum,
        pageSize: 10,
      },
    });
    let list = res.data.data.list;
    list.map((item:Article) => {
      item.create_time = formatDate(item.create_time)
      item.update_time = formatDate(item.update_time)
      item.content = item.content
      item.tags = JSON.parse((item.tags as string))
      return item
    });
    articleList.list.push(...list);
    articleList.pagination.total = res.data.data.total;
    articleList.pagination.hasNextPage = res.data.data.hasNextPage;
    articleList.pagination.totalPage = res.data.data.totalPage;
  };
  onMounted(() => {
    getData(1);
  });
  return { articleList, getData };
}
