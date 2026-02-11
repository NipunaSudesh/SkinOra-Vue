<template>
  <div class="container-card mt-16 px-4 py-8">

    <h2 class="text-2xl font-bold mb-6">
      Search Results for "{{ query }}"
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCart
        v-for="product in filteredProducts"
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

      <p
        v-if="filteredProducts.length === 0"
        class="text-gray-500 col-span-full text-center mt-10"
      >
        No products found
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ProductCart from "../components/cart/ProductCart.vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

const products = ref([]);
const filteredProducts = ref([]);
const route = useRoute();

// get query param
const query = ref(route.query.query || "");

// fetch products from API
const fetchProducts = async () => {
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/products`);
    const data = await res.json();
    products.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// filter products based on query
const filterProducts = () => {
  filteredProducts.value = products.value.filter(
    (product) =>
      product.name?.toLowerCase().includes(query.value.toLowerCase()) ||
      product.shortDescription?.toLowerCase().includes(query.value.toLowerCase())
  );
};

// fetch products on mounted
onMounted(async () => {
  await fetchProducts();
  filterProducts();
});

// watch query or products changes
watch([query, products], () => {
  filterProducts();
});
</script>
