import { createStore } from "vuex";
import { setStorage, getStorage } from "@/utils/storage.ts";
interface State {
  userInfo: UserInfo;
  token: string;
  isLogin: boolean;
}
interface UserInfo {
  user?: string;
  role_name?: string;
  role?: string;
  role_id?: number;
}

export default createStore({
  state: {
    userInfo: {
      user: "",
      role_name: "",
      role: "",
      role_id: 0,
    },
    token: "",
    isLogin: false,
  },
  getters: {
    GET_USERINFO: (state: State) => {
      return state.userInfo.user ? state.userInfo : getStorage("userInfo");
    },
    GET_TOKEN: (state: State) => state.token,
    GET_ISLOGING: (state: State) => {
      return state.isLogin ? state.isLogin : getStorage("isLogin");
    },
  },
  mutations: {
    SET_USERINFO: (state: State, val: any): void => {
      if (val) {
        state.userInfo = val;
        state.isLogin = true;
        setStorage("userInfo", val);
        setStorage("isLogin", true);
      } else {
        let userInfo = { user: "", role_name: "", role: "", role_id: 0 };
        state.userInfo = userInfo;
        state.isLogin = false;
        setStorage("userInfo", userInfo);
        setStorage("isLogin", false);
      }
    },
    SET_TOKEN: (state: State, val: string): void => {
      state.token = val;
    },
  },
  actions: {},
  modules: {},
});
