import { onMounted, reactive } from "vue";
import server from "@/utils/axios";
import { Article } from "./types";
export default function useGetArticle(id: string) {
  const form: Article = reactive({
    title: "",
    category: undefined,
    tags: [],
    source: ``,
  });
  const getArticle = async () => {
    let res = await server.request({
      url: "/api/article",
      method: "post",
      data: {
        id,
      },
    });
    let data = res.data.data;
    form.title = data.title
    form.category = data.category
    form.tags = JSON.parse(data.tags)
    form.source = data.source
  };
  onMounted(() => {
    id && getArticle();
    console.log(form)
  });
  return { form };
}
