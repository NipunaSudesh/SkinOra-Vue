import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "../components/layout/PublicLayout.vue";
import Banner from "../views/home/Banner.vue";
import index from "../views/home/index.vue";

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      { path: "", component: index }, 
    ],
  },
    {
    path: '/all-products',
    name: 'AllProducts',
    component: Banner,
  },
  {
    path: '/about',
    name: 'About',
    component: Banner,
  },
  {
    path: '/product-category/:category',
    name: 'ProductCategory',
    component: Banner,
  },
    { path: "/profile", component: Banner },
  { path: "/all-categories", component: Banner },
  { path: "/contact", component: Banner },
  { path: "/privacy-policy", component: Banner },
  { path: "/terms", component: Banner },
  // add 404 later
  // { path: "/:pathMatch(.*)*", component: () => import("../views/ErrorPage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;