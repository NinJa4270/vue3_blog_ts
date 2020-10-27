import server from "@/utils/axios";
import { getStorage } from "@/utils/storage.ts";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { NavList, NavListArr } from "./types";

export default function useNav() {
  const store = useStore();
  let navList: NavList = reactive({list:[]});
  const getNav = async () => {
    let data = {};
    if (store.state.status == 1 && getStorage("userInfo")) {
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
