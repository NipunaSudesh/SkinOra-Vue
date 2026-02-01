import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "../components/layout/PublicLayout.vue";
import HelloWorld from "../components/HelloWorld.vue"; // ← use this one if it still exists

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      { path: "", component: HelloWorld }, // or your real Home component
    ],
  },
  // add 404 later
  // { path: "/:pathMatch(.*)*", component: () => import("../views/ErrorPage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;