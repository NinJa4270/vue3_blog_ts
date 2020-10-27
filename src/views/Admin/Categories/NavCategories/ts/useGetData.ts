import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { NavList, NavListArr } from "@/views/Layout/ts/types";

export default function useGetData() {
  let navList: NavList = reactive({list:[]});
  const getNav = async () => {
    navList.list = []
    let res = await server.request({
      url: "/api/nav",
      method: "post",
      data: { role_id: 1 },
    });
    (navList.list as NavListArr[]).push(...res.data.data);
  };
  onMounted(() => {
    getNav();
  });
  return { navList, getNav };
}
