<template>
  <div class="fixed top-0 left-0 right-0 bg-[#f2f2cd] z-50">
    <div class="container-card">
      <div class="flex items-center justify-between h-[60px] relative">
        <!-- Logo -->
        <router-link to="/" class="flex items-center shrink-0">
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
              class="w-full h-9 px-4 border border-gray-300 rounded-l-full"
            />
            <button
              @click="handleSearch"
              class="bg-primary text-white h-9 px-4 rounded-r-full hover:bg-secondary"
            >
              <Icon icon="fe:search" />
            </button>
          </div>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4 relative">
          <!-- Mobile Search Toggle -->
          <button class="sm:hidden text-lg" @click="toggleMobileSearch">
            <Icon :icon="showMobileSearch ? 'fe:x' : 'fe:search'" />
          </button>

          <!-- Cart Icon with dynamic badge -->
          <div class="relative cursor-pointer" @click="handleCart">
            <Icon icon="fa-solid:shopping-cart" class="text-xl" />
            <span
              class="absolute -top-2 -right-2 bg-white text-primary text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              {{ cartCount }}
            </span>
          </div>

          <!-- User -->
          <Icon icon="fa-solid:user" class="cursor-pointer" @click="handleUser" />

          <!-- Mobile Menu Toggle -->
          <button class="lg:hidden text-xl" @click="toggleMobileMenu">
            <Icon :icon="showMobileMenu ? 'fe:x' : 'fe:menu'" />
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
                autofocus
                class="w-full h-9 px-4 rounded-l-full"
              />
              <button @click="handleSearch" class="bg-primary text-white h-9 px-4 rounded-r-full">
                <Icon icon="fe:search" />
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
                    @click="showMobileMenu = false"
                    class="block px-4 py-3 hover:text-secondary"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { logo } from "../../assets/images/index.js";
import { Icon } from '@iconify/vue';
import Typography from "../theme/Typography.vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

// Categories
const categories = [
  { label: "All Products", slug: "/all-products" },
  { label: "Baby Care", slug: "/product-category/baby-care" },
  { label: "Body Care", slug: "/product-category/body-care" },
  { label: "Face Care", slug: "/product-category/face-care" },
  { label: "Hair Care", slug: "/product-category/hair-care" },
  { label: "Sunscreens", slug: "/product-category/sunscreens" },
  { label: "Serums", slug: "/product-category/serums" },
  { label: "Mens Grooming", slug: "/product-category/mens-grooming" },
  { label: "About Us", slug: "/about" },
];

// Router
const router = useRouter();

// State
const showMobileSearch = ref(false);
const showMobileMenu = ref(false);
const searchTerm = ref("");
const cartCount = ref(0);

// Toggle mobile menus
const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
  showMobileMenu.value = false;
};
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  showMobileSearch.value = false;
};

// Search
const handleSearch = () => {
  if (!searchTerm.value.trim()) return;
  router.push(`/search?query=${encodeURIComponent(searchTerm.value)}`);
  showMobileSearch.value = false;
};

// Cart
const handleCart = () => router.push("/cart");

// User
const handleUser = () => {
  const user = localStorage.getItem("user");
  router.push(user ? "/profile" : "/login");
};

// Fetch cart items count from backend
const fetchCartCount = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${SKINORA_API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch cart");

    const data = await res.json();
    cartCount.value = data.length;
  } catch (error) {
    console.log("Error fetching cart count:", error.message);
  }
};

// On mount
onMounted(() => {
  fetchCartCount();
});
</script>
