import { createApp } from "vue";
import App from "./App";
import { router } from "@/router";
import store from "@/store";

// 提示框局部引入无样式
import "element-plus/es/components/message-box/style/index";
import "element-plus/es/components/message/style/index";

const app = createApp(App);

app.use(router).use(store).mount("#app");
