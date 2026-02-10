<template>
  <div class="container-card mt-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

      <!-- Feature 1 -->
      <div class="flex gap-3 p-4 border rounded-lg items-center bg-white">
        <Icon icon="mdi:truck-delivery" class="w-10 h-10 text-primary" />
        <div>
          <h3 class="font-semibold text-gray-800">Fast Delivery</h3>
          <p class="text-sm text-gray-500">Island-wide next-day delivery</p>
        </div>
      </div>

      <!-- Feature 2 -->
      <div class="flex gap-3 p-4 border rounded-lg items-center bg-white">
        <Icon icon="mdi:verified" class="w-10 h-10 text-primary" />
        <div>
          <h3 class="font-semibold text-gray-800">100% Authentic</h3>
          <p class="text-sm text-gray-500">Dermatologist approved products</p>
        </div>
      </div>

      <!-- Feature 3 -->
      <div class="flex gap-3 p-4 border rounded-lg items-center bg-white">
        <Icon icon="fa6-solid:leaf" class="w-10 h-10 text-primary" />
        <div>
          <h3 class="font-semibold text-gray-800">Natural Ingredients</h3>
          <p class="text-sm text-gray-500">Safe & skin-friendly formulas</p>
        </div>
      </div>

      <!-- Feature 4 -->
      <div class="flex gap-3 p-4 border rounded-lg items-center bg-white">
        <Icon icon="ri:customer-service-2-line" class="w-10 h-10 text-primary" />
        <div>
          <h3 class="font-semibold text-gray-800">Expert Support</h3>
          <p class="text-sm text-gray-500">Beauty advice when you need it</p>
        </div>
      </div>

      <!-- Feature 5 -->
      <div class="flex gap-3 p-4 border rounded-lg items-center bg-white">
        <Icon icon="fa:usd" class="w-10 h-10 text-primary" />
        <div>
          <h3 class="font-semibold text-gray-800">Easy Payments</h3>
          <p class="text-sm text-gray-500">Cash on delivery & cards</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
