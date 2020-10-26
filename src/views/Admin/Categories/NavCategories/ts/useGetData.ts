import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { NavList } from "@/views/Layout/ts/types";

export default function useGetData() {
  let navList: NavList[] | [] = reactive([]);
  const getNav = async () => {
    let res = await server.request({
      url: "/api/nav",
      method: "post",
      data: { role_id: 1 },
    });
    (navList as NavList[]).push(...res.data.data);
  };
  onMounted(() => {
    getNav();
  });
  return { navList, getNav };
}
