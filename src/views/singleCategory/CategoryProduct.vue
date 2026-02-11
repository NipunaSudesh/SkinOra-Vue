<template>
  <section class="my-10 flex gap-6">
    <!-- DESKTOP FILTER -->
    <div class="hidden lg:block w-1/5">
      <ProductFilter :filters="filters" @update:filters="setFilters" :hide-category="true" />
    </div>

    <!-- PRODUCTS -->
    <div class="w-full lg:w-4/5">
      <!-- HEADER -->
      <Header :title="title" description="Premium Skincare And Beauty, Chosen Just For You" />

      <!-- MOBILE FILTER BUTTON -->
      <div class="lg:hidden flex justify-center px-3 mb-3 w-full">
        <button
          @click="openFilter = true"
          class="px-4 py-2 border rounded-lg text-sm bg-primary hover:bg-secondary text-white font-medium w-full"
        >
          Filters
        </button>
      </div>

      <!-- MOBILE FILTER DRAWER -->
      <MobileFilterDrawer
        :is-open="openFilter"
        @close="openFilter = false"
        :filters="filters"
        @update:filters="setFilters"
        :hide-category="true"
      />

      <!-- COUNT -->
      <p v-if="!loading" class="text-gray-600 mx-2">
        Showing
        <span class="text-secondary">{{ startIndex + 1 }}–{{ Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length) }}</span>
        of
        <span class="text-secondary">{{ filteredProducts.length }}</span>
        products
      </p>

      <!-- LOADING -->
      <div v-if="loading" class="text-center mt-10 text-gray-500">
        Loading products...
      </div>

      <!-- PRODUCTS GRID -->
      <div v-else class="flex flex-wrap justify-center mt-6 gap-2">
        <ProductCart
          v-for="product in currentProducts"
          :key="product.slug"
          :id="product.slug"
          :slug="product.slug"
          :img-url="product.imageUrl"
          :product-name="product.name"
          :product-desc="product.shortDescription"
          :rating="product.rating"
          :OPrice="product.oldPrice"
          :NPrice="product.price"
          :review-count="product.reviewCount"
        />
        <p v-if="!currentProducts.length" class="text-gray-500 mt-10">No products found</p>
      </div>

      <!-- PAGINATION -->
      <div v-if="!loading && totalPages > 1" class="flex justify-center gap-2 mt-10">
        <button :disabled="currentPage === 1" @click="currentPage--" class="px-4 py-2 bg-primary text-white rounded disabled:opacity-40">
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

        <button :disabled="currentPage === totalPages" @click="currentPage++" class="px-4 py-2 bg-primary text-white rounded disabled:opacity-40">
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

import ProductCart from "../../components/cart/ProductCart.vue";
import ProductFilter from "../singleCategory/ProductFilter.vue";
import MobileFilterDrawer from "../singleCategory/MobileFilterDrawer.vue";
import Header from "../../components/theme/Header.vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;
const PRODUCTS_PER_PAGE = 8;

const route = useRoute();
const slug = ref(route.params.slug);

const loading = ref(true);
const products = ref([]);
const currentPage = ref(1);
const openFilter = ref(false);

const filters = ref({
  brands: [],
  country: "",
  inStock: false,
  minPrice: "",
  maxPrice: "",
});

// Fetch products for category
const fetchProducts = async (categorySlug) => {
  if (!categorySlug) return;

  loading.value = true;
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/products`);
    const data = await res.json();
    if (Array.isArray(data)) {
      products.value = data.filter((p) => p.categorySlug === categorySlug);
      currentPage.value = 1;
    }
  } catch (err) {
    console.error(err);
    products.value = [];
  } finally {
    loading.value = false;
  }
};

// Watch route change
watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = newSlug;
    fetchProducts(newSlug);
  },
  { immediate: true }
);

// Computed
const filteredProducts = computed(() =>
  products.value.filter((p) => {
    if (filters.value.brands.length && !filters.value.brands.includes(p.brand)) return false;
    if (filters.value.country && p.country !== filters.value.country) return false;
    if (filters.value.inStock && p.stockStatus !== "IN_STOCK") return false;
    if (filters.value.minPrice && p.price < Number(filters.value.minPrice)) return false;
    if (filters.value.maxPrice && p.price > Number(filters.value.maxPrice)) return false;
    return true;
  })
);

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / PRODUCTS_PER_PAGE));
const startIndex = computed(() => (currentPage.value - 1) * PRODUCTS_PER_PAGE);
const currentProducts = computed(() =>
  filteredProducts.value.slice(startIndex.value, startIndex.value + PRODUCTS_PER_PAGE)
);

watch(filters, () => {
  currentPage.value = 1;
});

const setFilters = (newFilters) => {
  filters.value = newFilters;
};

// Header title
const title = computed(() => (slug.value ? slug.value.replace(/-/g, " ").toUpperCase() : "Loading..."));
</script>
