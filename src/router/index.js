import { createWebHistory, createRouter } from "vue-router";

/* layout */
const Layout = () => import("@/layouts/Layout.vue");

export const DefaultRoutes = [
  {
    path: "/",
    component: Layout,
    meta: {
      name: "首页",
      jump: true,
    },
  },
  {
    path: "/a",
    component: Layout,
    meta: { name: "A页面" },
    children: [
      {
        path: "/a/a1",
        component: () => import("@/views/A1.vue"),
        meta: { name: "A1页面" },
      },
      {
        path: "/a/a2",
        component: () => import("@/views/A2.vue"),
        meta: { name: "A2页面" },
      },
    ],
  },
  {
    path: "/b",
    component: Layout,
    meta: { name: "B页面" },
    children: [
      {
        path: "/b/b1",
        component: () => import("@/layouts/Container.vue"),
        meta: { name: "B1页面" },
        children: [
          {
            path: "/b/b1/1-1",
            component: () => import("@/views/B1-1.vue"),
            meta: { name: "B1-1页面" },
          },
          {
            path: "/b/b1/1-2",
            component: () => import("@/views/B1-2.vue"),
            meta: { name: "B1-2页面" },
          },
          {
            path: "/b/b1/1-3",
            component: () => import("@/views/B1-3.vue"),
            meta: { name: "B1-3页面" },
          },
        ],
      },
    ],
  },
  {
    path: "/c",
    component: Layout,
    meta: { name: "C页面" },
    children: [
      {
        path: "/c/c1",
        component: () => import("@/layouts/Container.vue"),
        meta: { name: "C1页面" },
        children: [
          {
            path: "/c/c1/1-1",
            component: () => import("@/views/C1-1.vue"),
            meta: { name: "C1-1页面" },
          },
          {
            path: "/c/c1/1-2",
            component: () => import("@/views/C1-2.vue"),
            meta: { name: "C1-2页面" },
          },
          {
            path: "/c/c1/1-3",
            component: () => import("@/views/C1-3.vue"),
            meta: { name: "C1-3页面" },
          },
        ],
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/404.vue"),
    hidden: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: DefaultRoutes,
});
