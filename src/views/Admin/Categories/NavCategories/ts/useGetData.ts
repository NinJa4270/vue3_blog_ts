import server from "@/utils/axios";
import { onMounted, reactive } from "vue";
import { INav, INavItem } from "@/types/getData";

import api from '@/utils/api'
export default function useGetData() {
  let navList: INav = reactive({list:[]});
  const getNav = async () => {
    navList.list = []
    let res = await server.request({
      url: api.nav,
      method: "post",
      data: { role_id: 1 },
    });
    (navList.list as Array<INavItem>).push(...res.data.data);
  };
  onMounted(() => {
    getNav();
  });
  return { navList, getNav };
}
