 <template>
  <div class="fixed top-0 left-0 right-0 bg-[#f2f2cd] z-50 shadow-md">
    <div class="container-card flex items-center justify-between h-[60px] relative">

      <!-- Logo -->
      <router-link to="/" class="flex items-center shrink-0 ">
        <img :src="logo" alt="Skinora Logo" class="h-10 w-auto" />
        <Typography variant="h2" class="text-lg font-bold text-primary">
          Skin<span class="text-secondary">Ora</span>
        </Typography>
      </router-link>

      <!-- Desktop Search -->
      <div class="hidden sm:flex flex-1 justify-center">
        <div class="flex w-full max-w-sm mx-4">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            v-model="searchTerm"
            @keydown.enter="handleSearch"
            class="w-full h-9 px-4 border border-gray-300 rounded-l-full focus:outline-none"
          />
          <button
            @click="handleSearch"
            class="bg-primary text-white h-9 px-4 rounded-r-full hover:bg-secondary flex items-center justify-center"
          >
            <Icon :icon="searchIcon" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Right Icons -->
      <div class="flex items-center gap-4">
        <!-- Mobile Search Toggle -->
        <button class="sm:hidden text-lg" @click="toggleMobileSearch">
          <Icon :icon="showMobileSearch ? closeIcon : searchIcon" class="w-5 h-5" />
        </button>

        <!-- Cart & User -->
        <Icon :icon="cartIcon" class="w-5 h-5 cursor-pointer" @click="handleCart" />
        <Icon :icon="userIcon" class="w-5 h-5 cursor-pointer" @click="handleUser" />

        <!-- Mobile Menu Toggle -->
        <button class="lg:hidden text-xl" @click="toggleMobileMenu">
          <Icon :icon="showMobileMenu ? closeIcon : menuIcon" class="w-5 h-5" />
        </button>
      </div>

      <!-- Mobile Search -->
      <div v-if="showMobileSearch" class="absolute left-0 right-0 top-full mt-1 lg:hidden">
        <div class="container-card">
          <div class="flex bg-white rounded-full shadow">
            <input
              type="text"
              placeholder="Search products..."
              v-model="searchTerm"
              @keydown.enter="handleSearch"
              class="w-full h-9 px-4 rounded-l-full focus:outline-none"
              autofocus
            />
            <button
              @click="handleSearch"
              class="bg-primary text-white h-9 px-4 rounded-r-full flex items-center justify-center"
            >
              <Icon :icon="searchIcon" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="absolute left-0 right-0 top-full lg:hidden">
        <div class="container-card">
          <div class="bg-white shadow rounded-lg py-4">
            <ul class="flex flex-col divide-y">
              <li v-for="item in categories" :key="item.slug">
                <router-link
                  :to="item.slug"
                  class="block px-4 py-3 hover:text-secondary"
                  @click="showMobileMenu = false"
                >
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logo } from "../../assets/images/index.js";
import { Icon } from '@iconify/vue';
import Typography from '../theme/Typography.vue';
// Icons
const searchIcon = 'fe:search';
const menuIcon = 'fe:menu';
const closeIcon = 'fe:x';
const cartIcon = 'fa-solid:shopping-cart';
const userIcon = 'fa-solid:user';

// State
const categories = [
  { label: "All Products", slug: "all-products" },
  { label: "Baby Care", slug: "product-category/baby-care" },
  { label: "Body Care", slug: "product-category/body-care" },
  { label: "Face Care", slug: "product-category/face-care" },
  { label: "Hair Care", slug: "product-category/hair-care" },
  { label: "Sunscreens", slug: "product-category/sunscreens" },
  { label: "Serums", slug: "product-category/serums" },
  { label: "Mens Grooming", slug: "product-category/mens-grooming" },
  { label: "About Us", slug: "/about" },
];

const router = useRouter();
const showMobileSearch = ref(false);
const showMobileMenu = ref(false);
const searchTerm = ref("");

// Methods
const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
  showMobileMenu.value = false;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  showMobileSearch.value = false;
};

const handleSearch = () => {
  if (!searchTerm.value.trim()) return;
  router.push(`/search?query=${encodeURIComponent(searchTerm.value)}`);
  showMobileSearch.value = false;
};

const handleCart = () => router.push("/cart");
const handleUser = () => {
  const user = localStorage.getItem("user");
  router.push(user ? "/profile" : "/login");
};
</script>

<style scoped>
/* Optional: add smooth transition for mobile menus */
</style>
