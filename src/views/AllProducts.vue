<template>
  <div>

    <!-- Banner -->
    <section class="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div
        class="relative py-20 bg-cover bg-center bg-no-repeat h-96"
        :style="{ backgroundImage: `url(${banner})` }"
      >
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative container-card">
          <h2 class="text-lg text-white">All Products</h2>
          <h1 class="text-4xl md:text-5xl font-bold text-white mt-2">
            Premium Skincare & Beauty
          </h1>
          <p class="text-white mt-1 max-w-xl">
            Explore our complete collection of authentic skincare, haircare,
            baby care, and wellness products.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Component -->
    <Features />

    <!-- Layout -->
    <section class="my-10 flex gap-6">
      <!-- Filters -->
      <div class="hidden lg:block w-1/5">
        <ProductFilter :filters="filters" @update:filters="updateFilters" />
      </div>

      <!-- Products -->
      <div class="w-full lg:w-4/5">
        <Header
          title="All Products"
          description="Shop our full range of trusted skincare, haircare, baby care, and wellness products."
        />

        <!-- Mobile Filter Button -->
        <div class="lg:hidden flex justify-center px-3 mb-3 w-full">
          <button
            @click="openFilter = true"
            class="px-4 py-2 border rounded-lg text-sm bg-primary hover:bg-secondary text-white font-medium w-full"
          >
            Filters
          </button>
        </div>

        <!-- Mobile Filter Drawer -->
        <MobileFilterDrawer
          :is-open="openFilter"
          @close="openFilter = false"
          :filters="filters"
          @update:filters="updateFilters"
        />

        <!-- Showing Products Info -->
        <p class="text-gray-600 mx-2">
          Showing
          <span class="text-secondary">{{ startIndex + 1 }}–{{ Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length) }}</span>
          of
          <span class="text-secondary">{{ filteredProducts.length }}</span>
          products
        </p>

        <!-- Products Grid -->
        <div class="flex flex-wrap justify-center mt-6 gap-4">
          <ProductCart
            v-for="product in currentProducts"
            :key="product.slug"
            :slug="product.slug"
            :img-url="product.imageUrl"
            :product-name="product.name"
            :product-desc="product.shortDescription"
            :rating="product.rating"
            :o-price="product.oldPrice"
            :n-price="product.price"
            :review-count="product.reviewCount"
          />
          <p v-if="currentProducts.length === 0" class="text-gray-500 mt-10">
            No products found
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-10">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="px-4 py-2 bg-primary text-white rounded disabled:opacity-40"
          >
            Previous
          </button>

          <button
            v-for="i in totalPages"
            :key="i"
            @click="currentPage = i"
            :class="['w-10 h-10 rounded-full border', currentPage === i ? 'bg-secondary text-white' : 'bg-white']"
          >
            {{ i }}
          </button>

          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="px-4 py-2 bg-primary text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Features from "../views/home/Features.vue";
import { banner } from "../assets/images";
import Header from "../components/theme/Header.vue";
import ProductCart from "../components/cart/ProductCart.vue";
import ProductFilter from "./singleCategory/ProductFilter.vue";
import MobileFilterDrawer from "./singleCategory/MobileFilterDrawer.vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;
const PRODUCTS_PER_PAGE = 8;

const products = ref([]);
const currentPage = ref(1);
const openFilter = ref(false);
const filters = ref({
  category: "",
  brands: [],
  inStock: false,
  minPrice: "",
  maxPrice: "",
  country: "", // added if needed like in React code
});

// FETCH PRODUCTS
const fetchProducts = async () => {
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/products`);
    const data = await res.json();
    products.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(fetchProducts);

// FILTERED PRODUCTS
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    if (filters.value.category && p.categorySlug !== filters.value.category) return false;
    if (filters.value.country && p.country !== filters.value.country) return false;
    if (filters.value.brands.length && !filters.value.brands.includes(p.brand)) return false;
    if (filters.value.inStock && p.stockStatus !== "IN_STOCK") return false;
    if (filters.value.minPrice && p.price < Number(filters.value.minPrice)) return false;
    if (filters.value.maxPrice && p.price > Number(filters.value.maxPrice)) return false;
    return true;
  });
});

// PAGINATION
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / PRODUCTS_PER_PAGE));
const startIndex = computed(() => (currentPage.value - 1) * PRODUCTS_PER_PAGE);
const currentProducts = computed(() =>
  filteredProducts.value.slice(startIndex.value, startIndex.value + PRODUCTS_PER_PAGE)
);

// RESET PAGE WHEN FILTERS CHANGE
watch(filters, () => {
  currentPage.value = 1;
});

// UPDATE FILTERS FROM CHILD COMPONENT
const updateFilters = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters };
};
</script>
