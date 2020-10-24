import server from "@/utils/axios";
import { getStorage } from "@/utils/storage.ts";
import { onMounted, reactive } from "vue";
import { NavList } from './types'
export default function useNav() {
  let navList: NavList[]|[] = reactive([]);
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
    (navList as NavList[]).push(...res.data.data);
  };
  onMounted(() => {
    getNav();
  });
  return { navList };
}
