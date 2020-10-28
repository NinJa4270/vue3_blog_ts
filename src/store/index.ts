import { createStore } from "vuex";
import { setStorage, getStorage } from "@/utils/storage.ts";
interface State {
  userInfo: object;
  status: number;
  token: string;
}

export default createStore({
  state: {
    userInfo: {
      user: "",
      role_name: "",
      role: "",
      role_id: 0,
    },
    status: 0,
    token: "",
  },
  getters: {
    GET_USERINFO: (state: State) => state.userInfo,
    GET_TOKEN: (state: State) => state.token,
    GET_STATUS: (state: State) => {
      return typeof state.status === "number"
        ? state.status
        : getStorage("status");
    },
  },
  mutations: {
    SET_USERINFO: (state: State, val: any): void => {
      state.userInfo = val;
    },
    SET_TOKEN: (state: State, val: string): void => {
      state.token = val;
    },
    SET_STATUS: (state: State, val: number): void => {
      state.status = val;
      setStorage("status", val + "");
    },
  },
  actions: {},
  modules: {},
});
