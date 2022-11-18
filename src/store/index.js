import { createStore } from "vuex";

import permission from "@/store/modules/permission";
import getters from "@/store/getters";

export default createStore({
  modules: {
    permission,
  },
  getters,
});
