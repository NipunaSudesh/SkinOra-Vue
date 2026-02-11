<template>
  <RouterLink :to="`/product-category/${slug}`" class="group w-72">
    <div class="relative flex flex-col items-center cursor-pointer">
      <!-- Image Container -->
      <div class="relative w-full h-60 overflow-hidden rounded-lg">
        <img
          :src="img"
          :alt="category"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <!-- Hover Overlay -->
        <div
          class="absolute inset-0 flex items-center justify-center
                 bg-black/50 opacity-0 group-hover:opacity-100
                 transition-opacity duration-300"
        >
          <p class="text-sm text-gray-200 p-4 text-center">
            {{ description }}
          </p>
        </div>
      </div>
      <!-- Title -->
      <h4
        class="mt-3 font-bold text-primary transition-colors duration-300 group-hover:text-secondary"
      >
        {{ category }}
      </h4>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  img: String,
  category: String,
  description: String,
  slug: String,
});

console.log("CategoryCart slug:", props.slug); 

</script>
