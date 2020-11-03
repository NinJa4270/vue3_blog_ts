import server from "@/utils/axios";
import api from "@/utils/api";
import { getStorage } from "@/utils/storage.ts";
import { onMounted, reactive } from "vue";
import { INavItem, INav } from "@/types/getData";

interface IUseGetNav {
  navList: INav;
  getNavData: () => Promise<void>;
}

export default function UseGetNav(): IUseGetNav {
  let navList: INav = reactive({ list: [] });

  async function getNavData(): Promise<void> {
    navList.list = [];
    let data = {};
    if (getStorage("userInfo")) {
      data = getStorage("userInfo");
    }
    let res = await server.request({
      url: api.nav,
      method: "post",
      data,
    });
    if (res.data.code === 1000) {
      (navList.list as Array<INavItem>).push(...res.data.data.reverse());
    }
  }

  onMounted(() => {
    getNavData();
  });

  return { navList, getNavData };
}
