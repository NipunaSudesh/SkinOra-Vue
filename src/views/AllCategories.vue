<template>
  <div class="flex flex-col items-center justify-center gap-4 container-card px-4">
    <!-- Header -->
    <Header
      title="Shop by Categories"
      description="Explore our curated selection of beauty categories tailored to your needs."
    />

    <!-- Categories Grid -->
    <div class="flex flex-wrap justify-center items-center gap-4 w-full">
      <CategoryCart
        v-for="category in categories"
        :key="category.id"
        :category="category.categoriesName"
        :description="category.description"
        :img="category.imageUrl"
        :slug="category.slug"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/theme/Header.vue";
import CategoryCart from "../components/cart/CategoryCart.vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

const categories = ref([]);

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/categories`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    categories.value = data;
    console.log("Categories data:", data);
  } catch (error) {
    console.log("Error fetching categories:", error.message);
  }
};

onMounted(fetchCategories);
</script>
