<template>
  <div class="mt-10 flex flex-col items-center">
    <!-- Header -->
    <Header
      title="Featured Products"
      description="Premium Skincare And Beauty, Chosen Just For You"
    />

    <!-- Product Cards -->
    <div class="flex gap-2 mt-8 justify-center flex-wrap">
      <ProductCart
        v-for="product in products.slice(0, 15)"
        :key="product._id"
        :id="product._id"
        :slug="product.slug"
        :img-url="product.imageUrl"
        :product-name="product.name"
        :product-desc="product.shortDescription"
        :rating="product.rating"
        :o-price="product.oldPrice"
        :n-price="product.price"
        :review-count="product.reviewCount"
      />
    </div>

    <!-- View All Button -->
    <div class="mt-6 flex items-center justify-center">
      <button
        @click="handleAllProductsClick"
        class="bg-primary text-white hover:bg-secondary mx-auto block px-5 py-2 rounded-lg font-semibold transition duration-200"
      >
        View All Products
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ProductCart from "../../Components/cart/ProductCart.vue";
import Header from "../../Components/Theme/Header.vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

const router = useRouter();
const products = ref([]);

// Fetch products from API
const fetchProducts = async () => {
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/products`);
    const data = await res.json();
    products.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Navigate to all products page
const handleAllProductsClick = () => {
  router.push("/all-products");
};

onMounted(() => {
  fetchProducts();
});
</script>
