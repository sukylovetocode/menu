import { DefaultRoutes } from "@/router";

const permission = {
  state: {
    routers: DefaultRoutes, // 用于菜单调用! 拼成完整router
    curRoutes: [], // 目前所有的子路由
  },

  mutations: {
    SET_CUR_ROUTES: (state, routers) => {
      state.curRoutes = routers;
    },
  },
  actions: {
    set_cur_routes({ commit }, routes) {
      commit("SET_CUR_ROUTES", routes);
    },
  },
};

export default permission;
