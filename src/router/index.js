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
import Profile from "../views/Profile.vue";
import SearchPage from "../views/SearchPage.vue";
import SingleProduct from "../views/singleProduct/SingleProduct.vue";
import AllProducts from "../views/AllProducts.vue";
import AllCategories from "../views/AllCategories.vue";
import CategoryPage from "../views/singleCategory/CategoryPage.vue";

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
      { path: "profile", name: "Profile", component: Profile },

      { path: "all-products", name: "AllProducts", component: AllProducts },
      { path: "all-categories", name: "AllCategories", component:AllCategories },
      { path: "search", name: "Search", component: SearchPage },

        {
    path: "/product/slug/:slug",  
    name: "SingleProduct",
    component: SingleProduct,
    props: true  
  },
      {
        path: "product-category/:slug",
        name: "ProductCategory",
        component: CategoryPage,
        props: true,
      },
    ],
  },
 
  { path: "/all-categories", component: Banner },

  // add 404 later
   { path: "/:pathMatch(.*)*", component: () => import("../views/ErrorPage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;