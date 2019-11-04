import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let user = localStorage.getItem("user");
if (user) {
  user = JSON.parse(user);
} else {
  user = null;
}

let accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  accessToken = accessToken;
} else {
  accessToken = null;
}

const store = new Vuex.Store({
  state: {
    user: user,
    accessToken: accessToken,
    orderPageNum: 1,
    orderParams: {}
  },
  mutations: {
    setUser(state, { user, accessToken }) {
      state.user = user;
      state.accessToken = accessToken;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
      } else {
        localStorage.setItem("user", null);
        localStorage.setItem("accessToken", null);
      }
    },
    setOrderPageNum(state, val) {
      state.orderPageNum = val;
    },
    setOrderParams(state, val) {
      state.orderParams = val;
    }
  },
  getters: {
    orderPageNum: (state) => state.orderPageNum,
    orderParams: (state) => state.orderParams,
    user: (state) => state.user
  }
});
export default store;
