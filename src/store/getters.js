const getters = {
  currentRoute: (state) => {
    return state.permission.currentRoute;
  },
  routers: (state) => {
    return state.permission.routers;
  },
};
export default getters;
