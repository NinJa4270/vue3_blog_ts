import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { ArtCategories, ArtCategoryArr } from "./types";
export default function useGetData() {
  let articlesList: ArtCategories = reactive({ list: [] });
  const getData = async () => {
    articlesList.list = [];
    let res = await server.request({
      url: "/api/articleCategories",
      method: "post",
    });
    (articlesList.list as ArtCategoryArr[]).push(...res.data.data);
  };
  onMounted(() => {
    getData();
  });
  return { articlesList, getData };
}
