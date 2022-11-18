<template>
  <el-menu
    :default-active="activeRoute"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :ellipsis="false"
  >
    <!-- 渲染普通菜单 -->
    <el-menu-item
      :index="item.path"
      @click="handleRedirect"
      v-for="(item, key) in menu"
      :key="key"
      >{{ item.meta.name }}</el-menu-item
    >

    <div class="flex-grow"></div>
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const menu = computed(() =>
  store.getters["routers"].filter((v) => {
    return !v.hidden ? v : false;
  })
);

const activeRoute = computed(() => router.currentRoute.value.matched[0].path);

const getDefaultPath = (route) => {
  if (!route.length) return;
  return route[0].children ? getDefaultPath(route[0].children) : route[0].path;
};
const initRoutes = () => {
  let subMenu = store.getters["routers"].find(
    (item) => item.path === router.currentRoute.value.matched[0].path
  );
  // 储存子路由
  store.dispatch("set_cur_routes", subMenu);
};
initRoutes();
const handleRedirect = (route) => {
  let path = "/";
  let subMenu = store.getters["routers"].find(
    (item) => item.path === route.index
  );
  console.log("Navbar:", subMenu);
  // 储存子路由
  store.dispatch("set_cur_routes", subMenu);
  let menus = store.getters["routers"].map((item) => item.path);
  if (menus.includes(route.index) && route.index !== "/") {
    path = getDefaultPath(subMenu.children);
  }
  router.push(path);
};
</script>

<style>
.el-menu {
  height: 100%;
}
.flex-grow {
  flex-grow: 1;
}
.m-navbar__collaspe {
  line-height: var(--el-menu-item-height);
  padding: 0 10px;
}
</style>
