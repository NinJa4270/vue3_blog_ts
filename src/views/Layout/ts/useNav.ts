import server from "@/utils/axios";
import { getStorage } from "@/utils/storage.ts";
import { onMounted, reactive } from "vue";
import { NavList, NavListArr } from "./types";

export default function useNav() {
  let navList: NavList = reactive({list:[]});
  const getNav = async () => {
    let data = {};
    if (getStorage("userInfo")) {
      data = getStorage("userInfo");
    }
    let res = await server.request({
      url: "/api/nav",
      method: "post",
      data,
    });
    (navList.list as NavListArr[]).push(...res.data.data.reverse());
  };
  onMounted(() => {
    getNav();
  });
  return { navList };
}
