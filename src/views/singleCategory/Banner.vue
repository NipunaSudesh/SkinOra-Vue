<template>
  <section class="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
    <div
      class="relative py-20 bg-cover bg-center bg-no-repeat h-96"
      :style="{ backgroundImage: `url(${banner})` }"
    >
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- content -->
      <div class="relative container-card text-start">
        <h2 class="text-lg text-white tracking-wide">Category</h2>

        <h1 class="text-4xl md:text-5xl font-bold text-white mt-2">
          {{ category?.categoriesName || "Loading..." }}
        </h1>

        <p class="text-white mt-1 max-w-xl">
          {{ category?.longDescription || "Discover premium skincare products selected just for you." }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { banner } from "../../assets/images";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;
const route = useRoute();

const category = ref(null);

const fetchCategory = async (slug) => {
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/categories`);
    const data = await res.json();

    if (Array.isArray(data)) {
      category.value = data.find((cat) => cat.slug === slug);
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    category.value = null;
  }
};

// Fetch on mount and watch slug changes
onMounted(() => fetchCategory(route.params.slug));
watch(() => route.params.slug, (newSlug) => {
  console.log("Route slug changed:", newSlug);
  fetchCategory(newSlug);
});
</script>
