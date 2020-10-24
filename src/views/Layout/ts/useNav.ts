import server from "@/utils/axios";
import { getStorage } from "@/utils/storage.ts";
import { onMounted, reactive } from "vue";
import { useStore } from 'vuex';
import { NavList } from './types'

export default function useNav() {
  const store = useStore()
  let navList: NavList[]|[] = reactive([]);
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
    (navList as NavList[]).push(...res.data.data.reverse());
  };
  onMounted(() => {
    getNav();
  });
  return { navList };
}
