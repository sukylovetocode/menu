<template>
  <el-sub-menu
    :index="menus2.path"
    v-if="menus.children && menus.children.length"
  >
    <template #title>
      <span>{{ menus2.meta.name }}</span>
    </template>
    <my-sub-menu
      v-for="(item, key) in menus2.children"
      :key="key"
      :menus="item"
    ></my-sub-menu>
  </el-sub-menu>

  <el-menu-item v-else :index="menus2.path" @click="handleClick">
    <span>{{ menus2.meta.name }}</span>
  </el-menu-item>

  <!-- <div
    v-if="menus2.children && menus2.children.length"
    :index="menus2.path"
    class="my-parent"
  >
    <div>{{ menus2.meta.name }}</div>
    <my-sub-menu
      v-for="(item, key) in menus2.children"
      :key="key"
      :menus="item"
    ></my-sub-menu>
  </div>
  <div v-else @click="handleClick(menus2.path)" class="my-item">
    {{ menus2.meta.name }}
  </div> -->
</template>

<script setup>
import { onMounted, watch, reactive, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  menus: Object,
});

watch(
  () => props.menus,
  (newVal, oldVal) => {
    console.log("submenus:", newVal, oldVal);
  }
);

const menus2 = computed(() => {
  return props.menus;
});

const handleClick = (item) => {
  console.log("router:", item);
  router.push(item.index);
};
</script>

<script>
export default {
  name: "MySubMenu",
};
</script>

<style>
.my-parent {
  /* height: 50px; */
}
.my-parent div {
  height: 50px;
}
.my-item {
  height: 50px;
  text-align: center;
}
</style>
