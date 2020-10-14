import { createStore } from "vuex";

interface State{
  userInfo:object
}

export default createStore({
  state: {
    userInfo: {
      user: "",
      password: "",
    },
  },
  getters: {
    GET_USERINFO: (state:State) => state.userInfo,
  },
  mutations: {
    SET_USERINFO: (state:State, val:any):void => {
      state.userInfo = val;
    },
  },
  actions: {},
  modules: {},
});
