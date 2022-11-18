<template>
  <div v-if="subMenu">
    <el-menu
      unique-opened
      :default-active="activeRoute"
      v-if="subMenu"
      class="el-menu-vertical-demo"
    >
      <div class="m-siderbar__title">cms</div>
      <my-sub-menu
        v-for="(item, key) in subMenu"
        :key="key"
        :menus="item"
      ></my-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MySubMenu from "./submenu.vue";

const store = useStore();
const router = useRouter();
const subItems = ref([]);
watch(
  () => store.state.permission.curRoutes,
  (newVal, oldVal) => {
    console.log("Sidebar:", newVal, oldVal);
  }
);

const subMenu = computed(() => {
  return store.state.permission.curRoutes.children;
});

const activeRoute = computed(() => {
  return router.currentRoute.value.path;
});
</script>

<style>
.m-siderbar__title {
  background-color: #545c64;
  color: #fff;
  font-size: 20px;
  height: 59px;
  text-align: center;
  line-height: 59px;
  box-sizing: border-box;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) span {
  margin-left: 10px;
}
</style>
