<template>
  <el-container>
    <sidebar></sidebar>
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Navbar from "@/layouts/Navbar.vue";
import Sidebar from "@/layouts/Sidebar.vue";
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.expand-aside {
  width: 200px;
}
</style>
