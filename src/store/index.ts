import { createStore } from "vuex";
import { setStorage, getStorage } from "@/utils/storage.ts";
interface State {
  userInfo: object;
  token: string;
  isLogin: boolean;
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
    GET_USERINFO: (state: State) => state.userInfo,
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
        setStorage("isLogin", true);
      } else {
        state.userInfo = { user: "", role_name: "", role: "", role_id: 0 };
        state.isLogin = false;
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
