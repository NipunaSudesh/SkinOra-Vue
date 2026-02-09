import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "../components/layout/PublicLayout.vue";
import Banner from "../views/home/Banner.vue";
import index from "../views/home/index.vue";
import About from "../views/About.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import Terms from "../views/Terms.vue";
import ThankYou from "../views/ThankYou.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Contact from "../views/Contact.vue";

const routes = [
    {
    path: "/",
    component: PublicLayout,
    children: [
      { path: "", name: "Home", component: index },
      { path: "about", name: "About", component: About },
      { path: "contact", name: "Contact", component: Contact },
      { path: "login", name: "Login", component: Login },
      { path: "register", name: "Register", component: Register },
      { path: "thank-you", name: "ThankYou", component: ThankYou },
      { path: "privacy-policy", name: "PrivacyPolicy", component: PrivacyPolicy },
      { path: "terms", name: "Terms", component: Terms },

      { path: "all-products", name: "AllProducts", component: Banner },
      { path: "all-categories", name: "AllCategories", component: Banner },
      {
        path: "product-category/:category",
        name: "ProductCategory",
        component: Banner,
        props: true,
      },
    ],
  },
    { path: "/profile", component: Banner },
  { path: "/all-categories", component: Banner },

  // add 404 later
   { path: "/:pathMatch(.*)*", component: () => import("../views/ErrorPage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;