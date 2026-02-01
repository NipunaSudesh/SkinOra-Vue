<script setup>
import { RouterLink } from "vue-router";

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
  // { label: "Contact Us", slug: "/contact" },
];
</script>

<template>
  <nav class="hidden lg:block fixed top-12 left-0 right-0 bg-primary border-t border-gray-200 z-40">
    <div class="container-card py-3 mt-2">
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-base justify-center items-center">
        <RouterLink
          v-for="item in categories"
          :key="item.label"
          :to="item.slug"
          class="text-white hover:text-secondary transition"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
